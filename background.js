// background.js
console.log('🔧 Background service worker carregado!');

// ============================================================
// CONFIGURAÇÃO DO GITHUB
// ============================================================
const GITHUB_CONFIG = {
  owner: 'wandersonlt',
  repo: 'huntera-bot',
  branch: 'main',
  get rawUrl() {
    return `https://raw.githubusercontent.com/${this.owner}/${this.repo}/${this.branch}/`;
  }
};

console.log(`📦 GitHub: ${GITHUB_CONFIG.rawUrl}`);

// ============================================================
// ESTADO DO BOT - INICIAR DESATIVADO POR PADRÃO
// ============================================================
let botActive = false;  // ← MUDADO PARA false (desativado por padrão)
let isRunning = false;

// ============================================================
// SALVAR ESTADO DO BOT
// ============================================================
function saveBotState() {
  chrome.storage.local.set({ botActive: botActive });
  console.log(`📊 Estado do bot salvo: ${botActive ? 'ATIVO' : 'INATIVO'}`);
}

// ============================================================
// CARREGAR ESTADO DO BOT
// ============================================================
function loadBotState() {
  chrome.storage.local.get(['botActive'], (result) => {
    if (result.botActive !== undefined) {
      botActive = result.botActive;
    } else {
      // Se não tiver configuração salva, mantém desativado
      botActive = false;
      saveBotState();
    }
    console.log(`📊 Estado do bot carregado: ${botActive ? 'ATIVO' : 'INATIVO'}`);
  });
}

// ============================================================
// DETECTAR PÁGINA DO JOGO
// ============================================================
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('huntera.com.br/game')) {
    console.log('🎯 Página do jogo detectada!');
  }
});

// ============================================================
// ABRIR DASHBOARD
// ============================================================
function openDashboardPopup() {
  console.log('🪟 Abrindo dashboard...');
  const dashboardUrl = chrome.runtime.getURL('dashboard/dashboard.html');
  
  chrome.windows.create({
    url: dashboardUrl,
    type: 'popup',
    width: 500,
    height: 650,
    focused: true
  }, (newWindow) => {
    if (newWindow) {
      console.log('✅ Dashboard aberto como popup! ID:', newWindow.id);
    } else {
      console.log('❌ Falha ao abrir popup, tentando como aba...');
      chrome.tabs.create({
        url: dashboardUrl,
        active: true
      });
    }
  });
}

// ============================================================
// RECARREGAR SCRIPTS
// ============================================================
async function reloadAllScripts() {
  const tabs = await chrome.tabs.query({ url: 'https://huntera.com.br/game' });
  if (tabs.length === 0) {
    console.log('❌ Nenhuma aba do jogo encontrada');
    return false;
  }
  
  for (const tab of tabs) {
    console.log(`🔄 Recarregando página ${tab.id}...`);
    await chrome.tabs.reload(tab.id);
  }
  return true;
}

// ============================================================
// ESCUTAR MENSAGENS
// ============================================================
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('📨 Mensagem recebida:', message);

  switch (message.action) {
    case 'getStatus':
      sendResponse({ 
        isRunning: botActive,  // ← Usa botActive em vez de isRunning
        selectedHunt: 'folda-hunt', 
        selectedPull: 'Agressivo',
        blockedItems: [],
        huntEnabled: true,
        sellEnabled: true,
        partyEnabled: true,
        partyMode: 'solo'
      });
      break;

    case 'startBot':
      botActive = true;
      isRunning = true;
      saveBotState();
      sendToContent({ action: 'startBot' });
      console.log('▶️ Bot iniciado');
      sendResponse({ success: true });
      break;

    case 'stopBot':
      botActive = false;
      isRunning = false;
      saveBotState();
      sendToContent({ action: 'stopBot' });
      console.log('⏹️ Bot parado');
      sendResponse({ success: true });
      break;

    case 'openDashboardPopup':
      openDashboardPopup();
      sendResponse({ success: true });
      break;

    case 'reloadScripts':
      reloadAllScripts().then((result) => {
        sendResponse({ success: result });
      });
      return true;

    case 'getHunts':
    case 'updateConfig':
    case 'toggleModule':
    case 'setBlockedItems':
    case 'forceSell':
    case 'startHunt':
      // Encaminha para o content script
      chrome.tabs.query({ url: 'https://huntera.com.br/game' }, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, message);
        } else {
          console.warn('⚠️ Nenhuma aba do jogo encontrada');
        }
      });
      sendResponse({ success: true });
      break;

    default:
      console.warn('⚠️ Ação desconhecida:', message.action);
      sendResponse({ error: 'Ação desconhecida' });
  }

  return true;
});

// ============================================================
// ENVIAR MENSAGEM PARA CONTENT
// ============================================================
function sendToContent(message) {
  chrome.tabs.query({ url: 'https://huntera.com.br/game' }, (tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    } else {
      console.warn('⚠️ Nenhuma aba do jogo encontrada');
    }
  });
}

// ============================================================
// CARREGAR ESTADO AO INICIAR
// ============================================================
loadBotState();

console.log('✅ Background service worker pronto!');
console.log(`📊 Bot iniciará ${botActive ? 'ATIVO' : 'DESATIVADO'} por padrão`);
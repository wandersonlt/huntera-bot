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
// ESTADO DO BOT
// ============================================================
let botActive = false;
let isRunning = false;

const BOT_STATE = {
  isRunning: false,
  selectedHunt: 'rat-hunt',
  selectedPull: 'Cauteloso',
  huntEnabled: true,
  sellEnabled: true,
  partyEnabled: true,
  blockedItems: [],
  autoStart: true,
  retryOnFail: true,
  ignoreEquipped: true,
  autoSell: true,
  sellCooldown: 10000,
  acceptInvite: true,
  acceptHunt: true,
  acceptCostShare: true,
  followLeader: true,
  partyMode: 'solo'
};

// ============================================================
// SALVAR/ CARREGAR ESTADO
// ============================================================
function saveBotState() {
  chrome.storage.local.set({ botActive: botActive });
  console.log(`📊 Estado salvo: ${botActive ? 'ATIVO' : 'INATIVO'}`);
}

function loadBotState() {
  chrome.storage.local.get(['botActive'], (result) => {
    if (result.botActive !== undefined) {
      botActive = result.botActive;
    } else {
      botActive = false;
      saveBotState();
    }
    console.log(`📊 Estado carregado: ${botActive ? 'ATIVO' : 'INATIVO'}`);
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
      console.log('❌ Falha ao abrir popup');
      chrome.tabs.create({ url: dashboardUrl, active: true });
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
        ...BOT_STATE,
        isRunning: botActive
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

    case 'toggleModule':
      const moduleKey = `${message.module}Enabled`;
      BOT_STATE[moduleKey] = !BOT_STATE[moduleKey];
      const isEnabled = BOT_STATE[moduleKey];
      console.log(`🔄 ${message.module} agora está ${isEnabled ? 'ATIVO' : 'INATIVO'}`);
      sendToContent({ action: 'toggleModule', module: message.module, enabled: isEnabled });
      sendResponse({ success: true, enabled: isEnabled });
      break;

    case 'updateConfig':
      Object.assign(BOT_STATE, message.config);
      sendToContent({ action: 'updateConfig', config: message.config });
      sendResponse({ success: true });
      break;

    case 'setBlockedItems':
      BOT_STATE.blockedItems = message.items;
      sendToContent({ action: 'setBlockedItems', items: message.items });
      sendResponse({ success: true });
      break;

    case 'forceSell':
      sendToContent({ action: 'forceSell' });
      sendResponse({ success: true });
      break;

    case 'startHunt':
      sendToContent({ action: 'startHunt' });
      sendResponse({ success: true });
      break;

    default:
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
// INICIALIZAR
// ============================================================
loadBotState();
console.log('✅ Background service worker pronto!');
console.log(`📊 Bot iniciará ${botActive ? 'ATIVO' : 'DESATIVADO'} por padrão`);
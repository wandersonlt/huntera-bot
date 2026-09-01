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
// DETECTAR PÁGINA DO JOGO - APENAS RECARREGAR A PÁGINA
// ============================================================
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('huntera.com.br/game')) {
    console.log('🎯 Página do jogo detectada!');
    // NÃO injeta nada aqui - o content script já faz isso!
    // Só recarrega a página se necessário
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
  });
}

// ============================================================
// RECARREGAR SCRIPTS - APENAS RECARREGA A PÁGINA
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
  console.log('📨 Mensagem:', message);

  switch (message.action) {
    case 'getStatus':
      sendResponse({ 
        isRunning: false, 
        selectedHunt: 'rat-hunt', 
        selectedPull: 'Cauteloso',
        blockedItems: [],
        huntEnabled: true,
        sellEnabled: true,
        partyEnabled: true
      });
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

    case 'startBot':
    case 'stopBot':
    case 'updateConfig':
    case 'toggleModule':
    case 'setBlockedItems':
    case 'forceSell':
    case 'startHunt':
      // Encaminha para o content script
      chrome.tabs.query({ url: 'https://huntera.com.br/game' }, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, message);
        }
      });
      sendResponse({ success: true });
      break;

    default:
      sendResponse({ error: 'Ação desconhecida' });
  }

  return true;
});

console.log('✅ Background service worker pronto!');
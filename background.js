// background.js - VERIFIQUE SE ESTÁ ASSIM
console.log('🔧 Background service worker carregado!');

// ============================================================
// CONFIGURAÇÃO DO GITHUB
// ============================================================
const GITHUB_CONFIG = {
  owner: 'wandersonlt',
  repo: 'huntera-bot',
  branch: 'main'
};

// ============================================================
// DETECTAR PÁGINA DO JOGO - APENAS LOG
// ============================================================
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('huntera.com.br/game')) {
    console.log('🎯 Página do jogo detectada!');
    // NÃO INJETA NADA AQUI - O CONTENT SCRIPT FAZ ISSO!
  }
});

// ============================================================
// ABRIR DASHBOARD
// ============================================================
function openDashboardPopup() {
  console.log('🪟 Abrindo dashboard...');
  chrome.windows.create({
    url: chrome.runtime.getURL('dashboard/dashboard.html'),
    type: 'popup',
    width: 500,
    height: 650,
    focused: true
  });
}

// ============================================================
// ESCUTAR MENSAGENS
// ============================================================
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('📨 Mensagem:', message);

  switch (message.action) {
    case 'getStatus':
      sendResponse({ isRunning: false, selectedHunt: 'rat-hunt', selectedPull: 'Cauteloso' });
      break;

    case 'openDashboardPopup':
      openDashboardPopup();
      sendResponse({ success: true });
      break;

    case 'startBot':
    case 'stopBot':
    case 'updateConfig':
    case 'toggleModule':
    case 'setBlockedItems':
    case 'forceSell':
    case 'startHunt':
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
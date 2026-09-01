// background.js
const BOT_STATE = {
  isRunning: false,
  isHunting: false,
  isSelling: false,
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

console.log('🔧 Background service worker carregado!');

// Injeta scripts na página
async function injectScripts(tabId) {
  try {
    const scripts = [
      'data/items.js',
      'modules/base.js',
      'modules/hunt.js',
      'modules/sell.js',
      'modules/party.js',
      'inject.js'
    ];

    for (const script of scripts) {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [script]
      });
    }

    console.log('✅ Scripts injetados com sucesso!');
    return true;
  } catch (error) {
    console.error('❌ Erro ao injetar scripts:', error);
    return false;
  }
}

// Detecta página do jogo
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('huntera.com.br/game')) {
    console.log('🎯 Página do jogo detectada!');
    await injectScripts(tabId);
  }
});

// ============ ABRIR POPUP (VERSÃO QUE FUNCIONOU NO TESTE) ============
function openDashboardPopup() {
  console.log('🪟 Abrindo dashboard como POPUP...');
  
  const dashboardUrl = chrome.runtime.getURL('dashboard/dashboard.html');
  
  // VERIFICA SE JÁ EXISTE UM POPUP ABERTO
  chrome.windows.getAll({ populate: true }, (windows) => {
    for (const win of windows) {
      if (win.type === 'popup') {
        for (const tab of win.tabs) {
          if (tab.url && tab.url.includes('dashboard/dashboard.html')) {
            // Popup já existe, foca nele
            chrome.windows.update(win.id, { focused: true });
            console.log('✅ Popup já existente, focado!');
            return;
          }
        }
      }
    }
    
    // CRIA NOVO POPUP (SEM USAR screen)
    chrome.windows.create({
      url: dashboardUrl,
      type: 'popup',
      width: 500,
      height: 650,
      focused: true
    }, (newWindow) => {
      if (newWindow) {
        console.log('✅ POPUP CRIADO COM SUCESSO! ID:', newWindow.id);
      } else {
        console.error('❌ FALHA AO CRIAR POPUP!');
        console.log('Último erro:', chrome.runtime.lastError);
      }
    });
  });
}

// ============ ESCUTA MENSAGENS ============
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('📨 Mensagem recebida no background:', message);

  switch (message.action) {
    case 'ping':
      sendResponse({ status: 'ok' });
      break;

    case 'getStatus':
      sendResponse({ ...BOT_STATE });
      break;

    case 'startBot':
      BOT_STATE.isRunning = true;
      sendToContent({ action: 'startBot' });
      sendResponse({ success: true });
      break;

    case 'stopBot':
      BOT_STATE.isRunning = false;
      sendToContent({ action: 'stopBot' });
      sendResponse({ success: true });
      break;

    case 'getHunts':
      sendToContent({ action: 'getHunts' });
      sendResponse({ success: true });
      break;

    case 'updateConfig':
      Object.assign(BOT_STATE, message.config);
      sendToContent({ action: 'updateConfig', config: message.config });
      sendResponse({ success: true });
      break;

    case 'toggleModule':
      const key = `${message.module}Enabled`;
      BOT_STATE[key] = !BOT_STATE[key];
      sendToContent({ action: 'toggleModule', module: message.module, enabled: BOT_STATE[key] });
      sendResponse({ success: true, enabled: BOT_STATE[key] });
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

    // ============ ABRIR DASHBOARD ============
    case 'openDashboardPopup':
      openDashboardPopup();
      sendResponse({ success: true });
      break;

    default:
      console.log('⚠️ Ação desconhecida:', message.action);
      sendResponse({ error: 'Ação desconhecida' });
  }

  return true;
});

// Envia mensagem para o content script
function sendToContent(message) {
  chrome.tabs.query({ url: 'https://huntera.com.br/game' }, (tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, message);
    } else {
      console.warn('⚠️ Nenhuma aba do jogo encontrada');
    }
  });
}

// Escuta mensagens do content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.from === 'content') {
    chrome.runtime.sendMessage(message);
  }
  return true;
});

console.log('✅ Background service worker pronto!');
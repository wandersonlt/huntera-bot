// ============================================================
// BACKGROUND.JS - HUNTERA BOT
// ============================================================

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

console.log('🔧 Background service worker carregado!');
console.log(`📦 GitHub: ${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}`);

// ============================================================
// CARREGAR SCRIPTS DO GITHUB
// ============================================================
async function loadScriptFromGitHub(filePath) {
  const url = GITHUB_CONFIG.rawUrl + filePath;
  console.log(`📥 Baixando: ${url}`);
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const code = await response.text();
    console.log(`✅ Carregado: ${filePath} (${code.length} bytes)`);
    return code;
  } catch (error) {
    console.error(`❌ Erro ao carregar ${filePath}:`, error);
    return null;
  }
}

// ============================================================
// INJETAR SCRIPTS
// ============================================================
async function injectScripts(tabId) {
  try {
    console.log('📦 Carregando scripts do GitHub...');
    
    const files = [
      'data/items.js',
      'modules/base.js',
      'modules/hunt.js',
      'modules/sell.js',
      'modules/party.js',
      'inject.js'
    ];
    
    const scripts = [];
    for (const file of files) {
      const code = await loadScriptFromGitHub(file);
      if (code) {
        scripts.push(code);
      }
    }
    
    if (scripts.length === 0) {
      console.error('❌ Nenhum script carregado!');
      return false;
    }
    
    for (const code of scripts) {
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: (codeToExecute) => {
          try {
            eval(codeToExecute);
          } catch (e) {
            console.error('Erro ao executar script:', e);
          }
        },
        args: [code]
      });
    }
    
    console.log(`✅ ${scripts.length} scripts injetados do GitHub!`);
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao injetar scripts:', error);
    return false;
  }
}

// ============================================================
// RECARREGAR SCRIPTS
// ============================================================
async function reloadScripts(tabId) {
  console.log('🔄 Recarregando scripts do GitHub...');
  return await injectScripts(tabId);
}

// ============================================================
// DETECTAR PÁGINA DO JOGO
// ============================================================
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('huntera.com.br/game')) {
    console.log('🎯 Página do jogo detectada!');
    await injectScripts(tabId);
  }
});

// ============================================================
// ABRIR DASHBOARD COMO POPUP
// ============================================================
function openDashboardPopup() {
  console.log('🪟 Abrindo dashboard como POPUP...');
  
  const dashboardUrl = chrome.runtime.getURL('dashboard/dashboard.html');
  
  chrome.windows.getAll({ populate: true }, (windows) => {
    for (const win of windows) {
      if (win.type === 'popup') {
        for (const tab of win.tabs) {
          if (tab.url && tab.url.includes('dashboard/dashboard.html')) {
            chrome.windows.update(win.id, { focused: true });
            console.log('✅ Popup já existente, focado!');
            return;
          }
        }
      }
    }
    
    chrome.windows.create({
      url: dashboardUrl,
      type: 'popup',
      width: 500,
      height: 650,
      focused: true
    }, (newWindow) => {
      if (newWindow) {
        console.log('✅ POPUP CRIADO! ID:', newWindow.id);
      } else {
        console.error('❌ FALHA AO CRIAR POPUP!');
      }
    });
  });
}

// ============================================================
// ESCUTAR MENSAGENS
// ============================================================
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('📨 Mensagem recebida:', message);

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

    case 'openDashboardPopup':
      openDashboardPopup();
      sendResponse({ success: true });
      break;

    case 'reloadScripts':
      chrome.tabs.query({ url: 'https://huntera.com.br/game' }, async (tabs) => {
        if (tabs.length > 0) {
          const result = await reloadScripts(tabs[0].id);
          sendResponse({ success: result });
        } else {
          sendResponse({ success: false, error: 'Página do jogo não encontrada' });
        }
      });
      return true;

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
// CARREGAR CONFIGURAÇÃO SALVA
// ============================================================
chrome.storage.local.get(['githubConfig'], (result) => {
  if (result.githubConfig) {
    Object.assign(GITHUB_CONFIG, result.githubConfig);
    console.log('📦 Configuração do GitHub carregada:', GITHUB_CONFIG);
  }
});

console.log('✅ Background service worker pronto!');
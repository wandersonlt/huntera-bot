// ============================================================
// BACKGROUND.JS - VERSÃO DEFINITIVA (sem inline scripts)
// ============================================================

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
// INJETAR SCRIPTS - USANDO ARQUIVOS LOCAIS (MAIS SEGURO)
// ============================================================
async function injectScripts(tabId) {
  console.log(`📦 Injetando scripts na aba ${tabId}...`);
  
  try {
    // Lista de arquivos locais para injetar
    const files = [
      'data/items.js',
      'modules/base.js',
      'modules/hunt.js',
      'modules/sell.js',
      'modules/party.js',
      'inject.js'
    ];
    
    // Injeta cada arquivo diretamente
    for (const file of files) {
      console.log(`📤 Injetando: ${file}`);
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: [file]
        });
        console.log(`✅ Injetado: ${file}`);
      } catch (e) {
        console.error(`❌ Erro ao injetar ${file}:`, e);
      }
    }
    
    console.log(`✅ Todos os scripts locais injetados!`);
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao injetar scripts:', error);
    return false;
  }
}

// ============================================================
// INJETAR SCRIPTS DO GITHUB (VIA download + executeScript com função)
// ============================================================
async function injectScriptsFromGitHub(tabId) {
  console.log(`📦 Injetando scripts do GitHub na aba ${tabId}...`);
  
  try {
    const files = [
      'data/items.js',
      'modules/base.js',
      'modules/hunt.js',
      'modules/sell.js',
      'modules/party.js',
      'inject.js'
    ];
    
    // Baixa os scripts do GitHub
    const scripts = [];
    for (const file of files) {
      const url = GITHUB_CONFIG.rawUrl + file;
      console.log(`📥 Baixando: ${url}`);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const code = await response.text();
        scripts.push({ file, code });
        console.log(`✅ Baixado: ${file} (${code.length} bytes)`);
      } catch (e) {
        console.error(`❌ Erro ao baixar ${file}:`, e);
      }
    }
    
    if (scripts.length === 0) {
      console.error('❌ Nenhum script baixado!');
      return false;
    }
    
    // Injeta cada script usando executeScript com função
    for (const { file, code } of scripts) {
      console.log(`📤 Injetando: ${file}`);
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: (codeToExecute) => {
          // Cria um script element com o código
          const script = document.createElement('script');
          script.textContent = codeToExecute;
          document.head.appendChild(script);
          console.log(`✅ Script injetado: ${file}`);
        },
        args: [code]
      });
    }
    
    console.log(`✅ ${scripts.length} scripts do GitHub injetados!`);
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao injetar scripts do GitHub:', error);
    return false;
  }
}

// ============================================================
// DETECTAR PÁGINA DO JOGO
// ============================================================
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('huntera.com.br/game')) {
    console.log('🎯 Página do jogo detectada!');
    // Usa scripts locais (mais confiável)
    await injectScripts(tabId);
  }
});

// Verificar abas existentes
chrome.tabs.query({ url: 'https://huntera.com.br/game' }, async (tabs) => {
  if (tabs.length > 0) {
    console.log(`🎯 ${tabs.length} aba(s) do jogo encontrada(s)!`);
    for (const tab of tabs) {
      await injectScripts(tab.id);
    }
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
// RECARREGAR SCRIPTS
// ============================================================
async function reloadAllScripts() {
  const tabs = await chrome.tabs.query({ url: 'https://huntera.com.br/game' });
  if (tabs.length === 0) {
    console.log('❌ Nenhuma aba do jogo encontrada');
    return false;
  }
  
  for (const tab of tabs) {
    console.log(`🔄 Recarregando scripts na aba ${tab.id}...`);
    await injectScripts(tab.id);
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
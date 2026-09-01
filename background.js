// ============================================================
// BACKGROUND.JS - CORRIGIDO (sem eval)
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
// INJETAR SCRIPTS - MÉTODO 1: Usando script tags (RECOMENDADO)
// ============================================================
async function injectScripts(tabId) {
  console.log(`📦 Injetando scripts na aba ${tabId}...`);
  
  try {
    const files = [
      'data/items.js',
      'modules/base.js',
      'modules/hunt.js',
      'modules/sell.js',
      'modules/party.js',
      'inject.js'
    ];
    
    // MÉTODO 1: Injetar via script tags (evita CSP)
    // Primeiro, injetamos um script que vai carregar os outros via fetch + script tag
    const loaderCode = `
      (function() {
        console.log('📦 Loader: Carregando scripts do GitHub...');
        
        const GITHUB_BASE = '${GITHUB_CONFIG.rawUrl}';
        const files = ${JSON.stringify(files)};
        let loaded = 0;
        
        function loadScript(url, callback) {
          console.log('📥 Carregando:', url);
          const script = document.createElement('script');
          script.src = url;
          script.onload = function() {
            console.log('✅ Carregado:', url);
            loaded++;
            if (callback) callback();
          };
          script.onerror = function() {
            console.error('❌ Erro ao carregar:', url);
            loaded++;
            if (callback) callback();
          };
          document.head.appendChild(script);
        }
        
        function loadNext(index) {
          if (index >= files.length) {
            console.log('✅ Todos os ${files.length} scripts carregados!');
            return;
          }
          const url = GITHUB_BASE + files[index];
          loadScript(url, function() {
            loadNext(index + 1);
          });
        }
        
        loadNext(0);
      })();
    `;
    
    // Injeta o loader como uma função (não usa eval)
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: (code) => {
        // Cria um script element com o código
        const script = document.createElement('script');
        script.textContent = code;
        document.head.appendChild(script);
        console.log('✅ Loader injetado!');
      },
      args: [loaderCode]
    });
    
    console.log('✅ Loader injetado com sucesso!');
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao injetar scripts:', error);
    return false;
  }
}

// ============================================================
// MÉTODO 2: Injetar via chrome.scripting.executeScript com código
// ============================================================
async function injectScriptsDirect(tabId) {
  console.log(`📦 Injetando scripts diretamente na aba ${tabId}...`);
  
  try {
    const files = [
      'data/items.js',
      'modules/base.js',
      'modules/hunt.js',
      'modules/sell.js',
      'modules/party.js',
      'inject.js'
    ];
    
    // Baixa todos os scripts
    const scripts = [];
    for (const file of files) {
      const url = GITHUB_CONFIG.rawUrl + file;
      console.log(`📥 Baixando: ${url}`);
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`❌ Erro ao baixar ${file}: ${response.status}`);
        continue;
      }
      const code = await response.text();
      scripts.push({ file, code });
      console.log(`✅ Baixado: ${file} (${code.length} bytes)`);
    }
    
    if (scripts.length === 0) {
      console.error('❌ Nenhum script baixado!');
      return false;
    }
    
    // Injeta cada script como uma função (não usa eval)
    for (let i = 0; i < scripts.length; i++) {
      const { file, code } = scripts[i];
      console.log(`📤 Injetando: ${file}`);
      
      // Cria um blob URL para o script
      const blob = new Blob([code], { type: 'application/javascript' });
      const blobUrl = URL.createObjectURL(blob);
      
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: (url) => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = url;
            script.onload = () => {
              console.log(`✅ Script carregado: ${url}`);
              URL.revokeObjectURL(url);
              resolve();
            };
            script.onerror = () => {
              console.error(`❌ Erro ao carregar script: ${url}`);
              reject();
            };
            document.head.appendChild(script);
          });
        },
        args: [blobUrl]
      });
      
      // Pequena pausa entre scripts
      await new Promise(r => setTimeout(r, 100));
    }
    
    console.log(`✅ ${scripts.length} scripts injetados!`);
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao injetar scripts:', error);
    return false;
  }
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
        blockedItems: []
      });
      break;

    case 'openDashboardPopup':
      openDashboardPopup();
      sendResponse({ success: true });
      break;

    case 'reloadScripts':
      chrome.tabs.query({ url: 'https://huntera.com.br/game' }, async (tabs) => {
        if (tabs.length > 0) {
          const result = await injectScripts(tabs[0].id);
          sendResponse({ success: result });
        } else {
          sendResponse({ success: false, error: 'Página do jogo não encontrada' });
        }
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
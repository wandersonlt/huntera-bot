// ============================================================
// BACKGROUND.JS - VERSÃO DEFINITIVA (sem eval, sem blob)
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
// INJETAR SCRIPTS VIA SCRIPT TAGS (NÃO USA eval)
// ============================================================
async function injectScripts(tabId) {
  console.log(`📦 Injetando scripts na aba ${tabId}...`);
  
  try {
    // PRIMEIRO: injeta um script loader que vai carregar os outros via <script> tags
    const loaderCode = `
      (function() {
        console.log('📦 Loader: Carregando scripts do GitHub...');
        
        const GITHUB_BASE = '${GITHUB_CONFIG.rawUrl}';
        const files = [
          'data/items.js',
          'modules/base.js',
          'modules/hunt.js',
          'modules/sell.js',
          'modules/party.js',
          'inject.js'
        ];
        let loaded = 0;
        let errors = 0;
        
        function loadScript(url, index) {
          console.log(\`📥 [\${index+1}/\${files.length}] Carregando: \${url}\`);
          const script = document.createElement('script');
          script.src = url;
          script.onload = function() {
            loaded++;
            console.log(\`✅ [\${index+1}/\${files.length}] Carregado: \${url.split('/').pop()}\`);
            checkComplete();
          };
          script.onerror = function() {
            errors++;
            console.error(\`❌ [\${index+1}/\${files.length}] Erro ao carregar: \${url}\`);
            checkComplete();
          };
          document.head.appendChild(script);
        }
        
        function checkComplete() {
          if (loaded + errors >= files.length) {
            console.log(\`✅ Todos os scripts carregados! (\${loaded} OK, \${errors} erros)\`);
            if (typeof window.__hunteraBot !== 'undefined') {
              console.log('✅ Huntera Bot disponível! Use window.__hunteraBot');
            }
          }
        }
        
        // Carrega todos os scripts
        files.forEach((file, index) => {
          const url = GITHUB_BASE + file;
          loadScript(url, index);
        });
      })();
    `;
    
    // Injeta o loader como uma função (não usa eval)
    await chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: (code) => {
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
// INJETAR SCRIPTS LOCAIS (FALLBACK)
// ============================================================
async function injectScriptsLocal(tabId) {
  console.log(`📦 Injetando scripts LOCAIS na aba ${tabId}...`);
  
  try {
    const files = [
      'data/items.js',
      'modules/base.js',
      'modules/hunt.js',
      'modules/sell.js',
      'modules/party.js',
      'inject.js'
    ];
    
    for (const file of files) {
      console.log(`📤 Injetando: ${file}`);
      await chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: [file]
      });
    }
    
    console.log(`✅ ${files.length} scripts locais injetados!`);
    return true;
    
  } catch (error) {
    console.error('❌ Erro ao injetar scripts locais:', error);
    return false;
  }
}

// ============================================================
// DETECTAR PÁGINA DO JOGO
// ============================================================
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('huntera.com.br/game')) {
    console.log('🎯 Página do jogo detectada!');
    // Tenta carregar do GitHub primeiro
    const result = await injectScripts(tabId);
    if (!result) {
      console.log('⚠️ Falha no GitHub, usando fallback local...');
      await injectScriptsLocal(tabId);
    }
  }
});

// Verificar abas existentes
chrome.tabs.query({ url: 'https://huntera.com.br/game' }, async (tabs) => {
  if (tabs.length > 0) {
    console.log(`🎯 ${tabs.length} aba(s) do jogo encontrada(s)!`);
    for (const tab of tabs) {
      const result = await injectScripts(tab.id);
      if (!result) {
        await injectScriptsLocal(tab.id);
      }
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
    // Primeiro tenta GitHub
    let result = await injectScripts(tab.id);
    if (!result) {
      // Fallback local
      result = await injectScriptsLocal(tab.id);
    }
    if (!result) {
      console.error(`❌ Falha ao recarregar scripts na aba ${tab.id}`);
    }
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
        } else {
          console.warn('⚠️ Nenhuma aba do jogo encontrada');
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
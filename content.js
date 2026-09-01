// content.js
console.log('🔌 Content script carregado!');

// ============================================================
// VERIFICAR SE OS SCRIPTS JÁ FORAM CARREGADOS
// ============================================================
if (window.__hunteraBotLoaded) {
  console.log('⏭️ Scripts já carregados, ignorando...');
} else {
  window.__hunteraBotLoaded = true;
  
  // ============================================================
  // LISTA DE SCRIPTS PARA CARREGAR (ORDEM CORRETA)
  // ============================================================
  const scriptsToLoad = [
    'data/items.js',
    'modules/base.js',
    'modules/hunt.js',
    'modules/sell.js',
    'modules/party.js',
    'inject.js'
  ];
  
  let loadedCount = 0;
  const totalScripts = scriptsToLoad.length;
  
  console.log(`📦 Carregando ${totalScripts} scripts...`);
  
  // ============================================================
  // FUNÇÃO PARA CARREGAR UM SCRIPT
  // ============================================================
  function loadScript(src, callback) {
    console.log(`📥 Carregando: ${src}`);
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(src);
    script.onload = () => {
      loadedCount++;
      console.log(`✅ [${loadedCount}/${totalScripts}] Carregado: ${src}`);
      if (callback) callback();
    };
    script.onerror = (err) => {
      loadedCount++;
      console.error(`❌ [${loadedCount}/${totalScripts}] Erro ao carregar: ${src}`, err);
      if (callback) callback();
    };
    document.documentElement.appendChild(script);
  }
  
  // ============================================================
  // CARREGAR TODOS OS SCRIPTS EM SEQUÊNCIA
  // ============================================================
  function loadNextScript(index) {
    if (index >= totalScripts) {
      console.log(`✅ Todos os ${totalScripts} scripts carregados!`);
      console.log('📦 Verificando classes:');
      console.log('  HuntModule:', typeof window.HuntModule);
      console.log('  SellModule:', typeof window.SellModule);
      console.log('  PartyModule:', typeof window.PartyModule);
      console.log('  ALL_ITEMS:', window.ALL_ITEMS?.length || 0);
      return;
    }
    
    loadScript(scriptsToLoad[index], () => {
      setTimeout(() => {
        loadNextScript(index + 1);
      }, 200);
    });
  }
  
  // ============================================================
  // INICIAR CARREGAMENTO
  // ============================================================
  loadNextScript(0);
}

// ============================================================
// ESCUTA MENSAGENS DO BACKGROUND
// ============================================================
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('📨 Content recebeu do background:', message);
  
  window.postMessage({
    source: 'huntera-bot-extension',
    action: message.action,
    data: message
  }, '*');

  sendResponse({ received: true });
  return true;
});

// ============================================================
// ESCUTA MENSAGENS DO INJECT
// ============================================================
window.addEventListener('message', (event) => {
  if (event.data.source === 'huntera-bot-inject') {
    console.log('📤 Content enviando para background:', event.data);
    
    chrome.runtime.sendMessage({
      from: 'content',
      action: event.data.action,
      data: event.data.data
    });
  }
});

console.log('✅ Content script pronto!');
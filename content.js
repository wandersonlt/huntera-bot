// content.js
console.log('🔌 Content script carregado!');

// ============================================================
// VERIFICAR SE O INJECT JÁ FOI CARREGADO
// ============================================================
if (!window.__hunteraBotLoaded) {
  window.__hunteraBotLoaded = true;
  
  // Injeta o script principal
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('inject.js');
  script.onload = () => {
    console.log('✅ Inject script carregado via content!');
  };
  document.documentElement.appendChild(script);
} else {
  console.log('⏭️ Inject script já carregado, ignorando...');
}

// ============================================================
// ESCUTA MENSAGENS
// ============================================================
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('📨 Content recebeu:', message);
  
  window.postMessage({
    source: 'huntera-bot-extension',
    action: message.action,
    data: message
  }, '*');

  sendResponse({ received: true });
  return true;
});

window.addEventListener('message', (event) => {
  if (event.data.source === 'huntera-bot-inject') {
    chrome.runtime.sendMessage({
      from: 'content',
      action: event.data.action,
      data: event.data.data
    });
  }
});

console.log('✅ Content script pronto!');
// content.js
console.log('🔌 Content script carregado!');

// ============================================================
// VERIFICAR SE O INJECT JÁ FOI CARREGADO
// ============================================================
if (!window.__hunteraBotLoaded) {
  window.__hunteraBotLoaded = true;
  
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
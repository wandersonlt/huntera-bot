// content.js
console.log('🔌 Content script carregado!');

// Escuta mensagens do background
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

// Escuta mensagens do inject
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

// Injeta o script principal
const script = document.createElement('script');
script.src = chrome.runtime.getURL('inject.js');
script.onload = () => script.remove();
document.documentElement.appendChild(script);

console.log('✅ Content script pronto!');
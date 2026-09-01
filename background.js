// background.js - Adicione estas funções

// ============================================================
// ESTADO DO BOT
// ============================================================
let botActive = true;

// ============================================================
// SALVAR ESTADO DO BOT
// ============================================================
function saveBotState() {
  chrome.storage.local.set({ botActive: botActive });
}

// ============================================================
// CARREGAR ESTADO DO BOT
// ============================================================
function loadBotState() {
  chrome.storage.local.get(['botActive'], (result) => {
    if (result.botActive !== undefined) {
      botActive = result.botActive;
    }
    console.log('📊 Estado do bot:', botActive ? 'ATIVO' : 'INATIVO');
  });
}

// ============================================================
// INICIAR BOT
// ============================================================
function startBot() {
  botActive = true;
  saveBotState();
  sendToContent({ action: 'startBot' });
  console.log('▶️ Bot iniciado');
}

// ============================================================
// PARAR BOT
// ============================================================
function stopBot() {
  botActive = false;
  saveBotState();
  sendToContent({ action: 'stopBot' });
  console.log('⏹️ Bot parado');
}

// ============================================================
// ESCUTAR MENSAGENS (atualizado)
// ============================================================
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('📨 Mensagem:', message);

  switch (message.action) {
    case 'getStatus':
      sendResponse({ 
        isRunning: botActive,
        selectedHunt: 'folda-hunt', 
        selectedPull: 'Agressivo',
        blockedItems: [],
        huntEnabled: true,
        sellEnabled: true,
        partyEnabled: true
      });
      break;

    case 'startBot':
      startBot();
      sendResponse({ success: true });
      break;

    case 'stopBot':
      stopBot();
      sendResponse({ success: true });
      break;

    case 'toggleModule':
      // Envia para o content
      chrome.tabs.query({ url: 'https://huntera.com.br/game' }, (tabs) => {
        if (tabs.length > 0) {
          chrome.tabs.sendMessage(tabs[0].id, message);
        }
      });
      sendResponse({ success: true });
      break;

    // ... resto das ações
  }

  return true;
});

// Carrega estado ao iniciar
loadBotState();
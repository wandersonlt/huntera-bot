// inject.js
console.log('💉 Inject script carregado!');

const BOT_STATE = {
  isRunning: false,
  isHunting: false,
  isSelling: false
};

// Envia mensagem para o content
function sendToExtension(action, data = {}) {
  window.postMessage({
    source: 'huntera-bot-inject',
    action: action,
    data: data
  }, '*');
}

// Escuta mensagens da extensão
window.addEventListener('message', async (event) => {
  if (event.data.source === 'huntera-bot-extension') {
    console.log('📨 Inject recebeu:', event.data);
    
    const { action, data } = event.data;
    
    switch (action) {
      case 'startBot':
        await startBot();
        break;
      case 'stopBot':
        await stopBot();
        break;
      case 'getStatus':
        sendToExtension('status', getStatus());
        break;
      case 'getHunts':
        await scanHunts();
        break;
      case 'updateConfig':
        await updateConfig(data.config);
        break;
      case 'toggleModule':
        await toggleModule(data.module, data.enabled);
        break;
      case 'setBlockedItems':
        await setBlockedItems(data.items);
        break;
      case 'forceSell':
        await forceSell();
        break;
      case 'startHunt':
        await startHunt();
        break;
    }
  }
});

// ============ Funções do Bot ============

async function startBot() {
  console.log('▶️ Iniciando bot...');
  BOT_STATE.isRunning = true;
  
  if (window.huntModule) window.huntModule.start();
  if (window.sellModule) window.sellModule.start();
  if (window.partyModule) window.partyModule.start();
  
  sendToExtension('botStarted', { success: true });
  startLoop();
}

async function stopBot() {
  console.log('⏹️ Parando bot...');
  BOT_STATE.isRunning = false;
  
  if (window.huntModule) window.huntModule.stop();
  if (window.sellModule) window.sellModule.stop();
  if (window.partyModule) window.partyModule.stop();
  
  sendToExtension('botStopped', { success: true });
}

function getStatus() {
  return {
    isRunning: BOT_STATE.isRunning,
    isHunting: BOT_STATE.isHunting,
    isSelling: BOT_STATE.isSelling,
    selectedHunt: localStorage.getItem('huntera_selectedHunt') || 'rat-hunt',
    selectedPull: localStorage.getItem('huntera_selectedPull') || 'Cauteloso'
  };
}

async function scanHunts() {
  console.log('🔍 Escaneando caçadas...');
  if (window.huntModule) {
    const hunts = await window.huntModule.scanHunts();
    sendToExtension('huntsScanned', { hunts });
  }
}

async function updateConfig(config) {
  console.log('⚙️ Atualizando config:', config);
  
  if (config.selectedHunt) {
    localStorage.setItem('huntera_selectedHunt', config.selectedHunt);
  }
  if (config.selectedPull) {
    localStorage.setItem('huntera_selectedPull', config.selectedPull);
  }
  if (config.partyMode) {
    localStorage.setItem('huntera_partyMode', config.partyMode);
  }
  
  if (window.huntModule) window.huntModule.updateConfig(config);
  if (window.sellModule) window.sellModule.updateConfig(config);
  if (window.partyModule) window.partyModule.updateConfig(config);
}

async function toggleModule(moduleName, enabled) {
  console.log(`🔄 Toggling ${moduleName}: ${enabled}`);
  const modules = {
    hunt: window.huntModule,
    sell: window.sellModule,
    party: window.partyModule
  };
  
  const module = modules[moduleName];
  if (module) {
    if (enabled) {
      module.start();
    } else {
      module.stop();
    }
  }
}

async function setBlockedItems(items) {
  console.log('📦 Itens bloqueados:', items);
  if (window.sellModule) {
    window.sellModule.updateBlockedItems(items);
    localStorage.setItem('huntera_blockedItems', JSON.stringify(items));
  }
}

async function forceSell() {
  console.log('💰 Forçando venda...');
  if (window.sellModule) {
    const result = await window.sellModule.forceSell();
    sendToExtension('sellCompleted', { success: result });
  }
}

async function startHunt() {
  console.log('🏹 Iniciando caçada...');
  if (window.huntModule) {
    const result = await window.huntModule.startHunt();
    sendToExtension('huntStarted', { success: result });
  }
}

// ============ Loop Principal ============

function startLoop() {
  if (!BOT_STATE.isRunning) return;
  
  if (window.huntModule && window.huntModule.isRunning()) {
    window.huntModule.loop();
  }
  if (window.sellModule && window.sellModule.isRunning()) {
    window.sellModule.loop();
  }
  if (window.partyModule && window.partyModule.isRunning()) {
    window.partyModule.loop();
  }
  
  setTimeout(startLoop, 2000);
}

// ============ Inicialização ============

function initModules() {
  console.log('🔧 Inicializando módulos...');
  
  if (window.HuntModule) {
    window.huntModule = new window.HuntModule();
    window.huntModule.init();
  }
  if (window.SellModule) {
    window.sellModule = new window.SellModule();
    window.sellModule.init();
  }
  if (window.PartyModule) {
    window.partyModule = new window.PartyModule();
    window.partyModule.init();
  }
  
  console.log('✅ Módulos inicializados!');
}

// Expõe para debug
window.__hunteraBot = {
  start: startBot,
  stop: stopBot,
  status: getStatus,
  modules: {
    hunt: () => window.huntModule,
    sell: () => window.sellModule,
    party: () => window.partyModule
  }
};

console.log('✅ Inject script pronto! Use window.__hunteraBot para debug.');

if (document.readyState === 'complete') {
  initModules();
} else {
  window.addEventListener('load', initModules);
}
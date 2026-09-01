// inject.js
console.log('💉 Inject script carregado!');

// ============================================================
// VERIFICAR SE JÁ FOI CARREGADO
// ============================================================
if (window.__hunteraInjectLoaded) {
  console.log('⏭️ Inject já carregado, ignorando...');
} else {
  window.__hunteraInjectLoaded = true;
  
  // ============================================================
  // RESTANTE DO CÓDIGO DO INJECT.JS AQUI
  // ============================================================
  
  let isRunning = false;

  // Envia mensagem para a extensão
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
          isRunning = true;
          if (window.huntModule) window.huntModule.start();
          if (window.sellModule) window.sellModule.start();
          if (window.partyModule) window.partyModule.start();
          sendToExtension('botStarted', { success: true });
          startLoop();
          break;

        case 'stopBot':
          isRunning = false;
          if (window.huntModule) window.huntModule.stop();
          if (window.sellModule) window.sellModule.stop();
          if (window.partyModule) window.partyModule.stop();
          sendToExtension('botStopped', { success: true });
          break;

        case 'getStatus':
          sendToExtension('status', getStatus());
          break;

        case 'getHunts':
          if (window.huntModule) {
            const hunts = window.huntModule.getHunts();
            sendToExtension('huntsScanned', { hunts });
          }
          break;

        case 'startHunt':
          if (window.huntModule) {
            const result = await window.huntModule.startHunt();
            sendToExtension('huntStarted', { success: result });
          }
          break;

        case 'forceSell':
          if (window.sellModule) {
            const result = await window.sellModule.forceSell();
            sendToExtension('sellCompleted', { success: result });
          }
          break;

        case 'updateConfig':
          if (window.huntModule) window.huntModule.updateConfig(data.config);
          if (window.sellModule) window.sellModule.updateConfig(data.config);
          if (window.partyModule) window.partyModule.updateConfig(data.config);
          break;

        case 'setBlockedItems':
          if (window.sellModule) {
            window.sellModule.updateBlockedItems(data.items);
          }
          break;

        case 'toggleModule':
          const modules = {
            hunt: window.huntModule,
            sell: window.sellModule,
            party: window.partyModule
          };
          const module = modules[data.module];
          if (module) {
            if (data.enabled) {
              module.start();
            } else {
              module.stop();
            }
          }
          break;
      }
    }
  });

  function getStatus() {
    return {
      isRunning: isRunning,
      selectedHunt: localStorage.getItem('huntera_selectedHunt') || 'rat-hunt',
      selectedPull: localStorage.getItem('huntera_selectedPull') || 'Cauteloso'
    };
  }

  // Loop principal
  function startLoop() {
    if (!isRunning) return;
    
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

  // Inicializa módulos
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
    start: () => { isRunning = true; startLoop(); },
    stop: () => { isRunning = false; },
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
}
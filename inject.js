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
  // ESTADO DO BOT
  // ============================================================
  let isRunning = false;
  
  // ============================================================
  // FUNÇÕES DE COMUNICAÇÃO
  // ============================================================
  function sendToExtension(action, data = {}) {
    window.postMessage({
      source: 'huntera-bot-inject',
      action: action,
      data: data
    }, '*');
  }

  // ============================================================
  // ESCUTAR MENSAGENS DA EXTENSÃO
  // ============================================================
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

  // ============================================================
  // FUNÇÕES DO BOT
  // ============================================================
  function getStatus() {
    return {
      isRunning: isRunning,
      selectedHunt: localStorage.getItem('huntera_selectedHunt') || 'rat-hunt',
      selectedPull: localStorage.getItem('huntera_selectedPull') || 'Cauteloso'
    };
  }

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

  // ============================================================
  // INICIALIZAR MÓDULOS (com verificação e retry)
  // ============================================================
  function initModules() {
    console.log('🔧 Inicializando módulos...');
    
    // Verifica se as classes existem
    const hasHunt = typeof window.HuntModule !== 'undefined';
    const hasSell = typeof window.SellModule !== 'undefined';
    const hasParty = typeof window.PartyModule !== 'undefined';
    const hasItems = window.ALL_ITEMS && window.ALL_ITEMS.length > 0;
    
    console.log('📦 Classes disponíveis:');
    console.log('  HuntModule:', hasHunt ? '✅' : '❌');
    console.log('  SellModule:', hasSell ? '✅' : '❌');
    console.log('  PartyModule:', hasParty ? '✅' : '❌');
    console.log('  ALL_ITEMS:', hasItems ? `${window.ALL_ITEMS.length} itens` : '❌');
    
    // Se os módulos não estiverem disponíveis, tenta novamente depois
    if (!hasHunt || !hasSell || !hasParty || !hasItems) {
      console.log('⏳ Aguardando scripts carregarem... tentando novamente em 2s');
      setTimeout(initModules, 2000);
      return;
    }
    
    // Inicializa os módulos
    if (hasHunt) {
      window.huntModule = new window.HuntModule();
      window.huntModule.init();
      console.log('✅ HuntModule inicializado');
    }
    
    if (hasSell) {
      window.sellModule = new window.SellModule();
      window.sellModule.init();
      console.log('✅ SellModule inicializado');
    }
    
    if (hasParty) {
      window.partyModule = new window.PartyModule();
      window.partyModule.init();
      console.log('✅ PartyModule inicializado');
    }
    
    console.log('✅ Módulos inicializados!');
    console.log('📦 Instâncias:');
    console.log('  huntModule:', typeof window.huntModule);
    console.log('  sellModule:', typeof window.sellModule);
    console.log('  partyModule:', typeof window.partyModule);
  }

  // ============================================================
  // EXPORTA O BOT PARA DEBUG
  // ============================================================
  window.__hunteraBot = {
    start: () => { 
      console.log('▶️ Iniciando bot...');
      isRunning = true; 
      startLoop(); 
    },
    stop: () => { 
      console.log('⏹️ Parando bot...');
      isRunning = false; 
    },
    status: getStatus,
    modules: {
      hunt: () => window.huntModule,
      sell: () => window.sellModule,
      party: () => window.partyModule
    },
    // EXPORTA AS CLASSES PARA ACESSO DIRETO
    HuntModule: window.HuntModule,
    SellModule: window.SellModule,
    PartyModule: window.PartyModule,
    ALL_ITEMS: window.ALL_ITEMS,
    searchItems: function(query) {
      if (!query || query.length < 2) return [];
      const q = query.toLowerCase();
      return (window.ALL_ITEMS || []).filter(item => item.toLowerCase().includes(q));
    }
  };

  console.log('✅ Inject script pronto! Use window.__hunteraBot para debug.');
  console.log('📦 Comandos disponíveis:');
  console.log('  window.__hunteraBot.start() - Iniciar bot');
  console.log('  window.__hunteraBot.stop() - Parar bot');
  console.log('  window.__hunteraBot.status() - Ver status');
  console.log('  window.__hunteraBot.searchItems("termo") - Buscar itens');

  // ============================================================
  // AGUARDAR SCRIPTS E INICIALIZAR
  // ============================================================
  // Aguarda 1 segundo para os scripts serem carregados
  setTimeout(initModules, 1500);
}
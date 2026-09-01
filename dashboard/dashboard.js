// dashboard/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
  // ============ REFERÊNCIAS ============
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const logContainer = document.getElementById('logContainer');
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const statusValue = document.getElementById('statusValue');
  const modeValue = document.getElementById('modeValue');
  const huntValue = document.getElementById('huntValue');
  const pullValue = document.getElementById('pullValue');

  const huntSelect = document.getElementById('huntSelect');
  const pullSelect = document.getElementById('pullSelect');
  const partyModeSelect = document.getElementById('partyModeSelect');
  const startHuntBtn = document.getElementById('startHuntBtn');
  const forceSellBtn = document.getElementById('forceSellBtn');
  const toggleHuntBtn = document.getElementById('toggleHuntBtn');
  const toggleSellBtn = document.getElementById('toggleSellBtn');
  const togglePartyBtn = document.getElementById('togglePartyBtn');
  const itemSearch = document.getElementById('itemSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  const addItemBtn = document.getElementById('addItemBtn');
  const clearItemsBtn = document.getElementById('clearItemsBtn');
  const exportItemsBtn = document.getElementById('exportItemsBtn');
  const importItemsBtn = document.getElementById('importItemsBtn');
  const blockedItemsList = document.getElementById('blockedItemsList');
  const itemCount = document.getElementById('itemCount');
  const itemSearchResults = document.getElementById('itemSearchResults');

  // ============ DADOS ============
  let ALL_ITEMS = [];
  let BLOCKED_ITEMS = [];
  let CATEGORIES = [];

  // ============ HUNTS (52) ============
  const HUNTS = [
    { id: 'rat-hunt', title: 'Rat Cellars', monster: 'Rat' },
    { id: 'spider-hunt', title: 'Spider Nest', monster: 'Spider' },
    { id: 'troll-hunt', title: 'Troll Hills', monster: 'Troll' },
    { id: 'swamp-troll-hunt', title: 'Swamp Troll Cave', monster: 'Swamp Troll' },
    { id: 'orc-hunt', title: 'Orc Camp', monster: 'Orc' },
    { id: 'folda-hunt', title: 'Folda Icefields', monster: 'Frost Troll, Winter Wolf, Polar Bear' },
    { id: 'skeleton-hunt', title: 'Bone Crypt', monster: 'Skeleton' },
    { id: 'rotworm-hunt', title: 'Rotworm Caves', monster: 'Rotworm' },
    { id: 'dwarf-hunt', title: 'Dwarf Mines', monster: 'Dwarf' },
    { id: 'minotaur-hunt', title: 'Minotaur Maze', monster: 'Minotaur' },
    { id: 'amazon-hunt', title: 'Amazon Camp', monster: 'Amazon, Valkyrie' },
    { id: 'dark-cathedral-hunt', title: 'Dark Cathedral', monster: 'Smuggler, Wild Warrior, Bandit, Assassin, Dark Monk' },
    { id: 'ghoul-hunt', title: 'Ghoul Graveyard', monster: 'Ghoul' },
    { id: 'yalahar-elf-hunt', title: 'Yalahar Elf Quarter', monster: 'Elf, Elf Scout, Elf Arcanist' },
    { id: 'tarantula-hunt', title: 'Tarantula Burrows', monster: 'Tarantula' },
    { id: 'scarab-hunt', title: 'Scarab Tombs', monster: 'Scarab' },
    { id: 'tortoise-hunt', title: 'Tortoise Shore', monster: 'Tortoise, Thornback Tortoise, Blood Crab' },
    { id: 'mutated-human-hunt', title: 'Plagued Quarter', monster: 'Mutated Human' },
    { id: 'cyclops-hunt', title: 'Cyclop Hills', monster: 'Cyclops' },
    { id: 'mummy-hunt', title: 'Burial Chambers', monster: 'Mummy' },
    { id: 'bonelord-hunt', title: 'Ancient Temple', monster: 'Bonelord' },
    { id: 'orc-fortress-hunt', title: 'Orc Fortress', monster: 'Orc, Orc Spearman, Orc Warrior, Orc Shaman, Orc Rider, Orc Berserker, Orc Leader, Orc Warlord' },
    { id: 'green-djinn-hunt', title: 'Yalahar Green Djinn Fortress', monster: 'Green Djinn' },
    { id: 'blue-djinn-hunt', title: 'Yalahar Blue Djinn Fortress', monster: 'Blue Djinn' },
    { id: 'cult-hunt', title: 'Magician Cults', monster: 'Novice of the Cult, Acolyte of the Cult, Adept of the Cult' },
    { id: 'ice-golem-hunt', title: 'Frost Mines', monster: 'Ice Golem' },
    { id: 'carlin-corym-hunt', title: 'Carlin Corym Cave', monster: 'Corym Charlatan, Corym Skirmisher, Corym Vanguard' },
    { id: 'ab-bonelord-hunt', title: 'Hell Gate', monster: 'Bonelord, Elder Bonelord, Braindeath' },
    { id: 'dragon-hunt', title: 'Dragon Lair', monster: 'Dragon' },
    { id: 'vampire-hunt', title: 'Vampire Crypt', monster: 'Vampire, Vampire Viscount, Vampire Bride' },
    { id: 'mutated-cave-hunt', title: 'Mutated Cave', monster: 'Mutated Bat, Mutated Tiger' },
    { id: 'bog-raider-hunt', title: 'Yalahar Bog', monster: 'Bog Raider' },
    { id: 'giant-spider-hunt', title: 'Giant Spider Cavern', monster: 'Giant Spider' },
    { id: 'hero-hunt', title: 'Hero Fortress', monster: 'Hero' },
    { id: 'wyrm-hunt', title: 'Wyrm Caverns', monster: 'Wyrm' },
    { id: 'zao-stronghold-hunt', title: 'Zao Stronghold', monster: 'Lizard Legionnaire, Lizard Dragon Priest, Lizard High Guard' },
    { id: 'grimvale-warrens-hunt', title: 'Grimvale Warrens', monster: 'Werebadger' },
    { id: 'grimvale-dens-hunt', title: 'Grimvale Dens', monster: 'Wereboar, Werebear' },
    { id: 'dragon-lord-hunt', title: 'Dragon Lord Peak', monster: 'Dragon Lord' },
    { id: 'lizard-chosen-hunt', title: 'Corrupted Terraces', monster: 'Lizard Chosen' },
    { id: 'behemoth-hunt', title: 'Behemoth Quarry', monster: 'Behemoth' },
    { id: 'hellspawn-hunt', title: 'Magician Quarter', monster: 'Hellspawn' },
    { id: 'hydra-hunt', title: 'Banuta Ruins', monster: 'Hydra, Eternal Guardian, Medusa' },
    { id: 'seacrest-serpent-hunt', title: 'Seacrest Caves', monster: 'Seacrest Serpent' },
    { id: 'ripper-spectre-hunt', title: 'Haunted Cellar', monster: 'Ripper Spectre' },
    { id: 'gazer-spectre-hunt', title: 'Haunted Temple', monster: 'Gazer Spectre' },
    { id: 'roshamuul-lower-hunt', title: 'Lower Roshamuul', monster: 'Frazzlemaw, Silencer' },
    { id: 'grim-reaper-hunt', title: 'Halls of the Reaper', monster: 'Grim Reaper' },
    { id: 'burster-spectre-hunt', title: 'Haunted Tomb', monster: 'Burster Spectre' },
    { id: 'demon-hunt', title: 'Infernal Gate', monster: 'Demon' },
    { id: 'falcon-hunt', title: 'Falcon Bastion', monster: 'Falcon Knight, Falcon Paladin' },
    { id: 'hell-hub-hunt', title: 'Hell Hub', monster: 'Demon, Vexclaw, Grimeleech, Hellflayer' }
  ];

  // ============ FUNÇÕES DE LOG ============
  function addLog(message, type = 'info') {
    const div = document.createElement('div');
    div.className = type;
    div.textContent = message;
    logContainer.appendChild(div);
    logContainer.scrollTop = logContainer.scrollHeight;
    while (logContainer.children.length > 50) {
      logContainer.removeChild(logContainer.firstChild);
    }
  }

  // ============ FUNÇÕES DE STATUS ============
  function updateStatus() {
    chrome.runtime.sendMessage({ action: 'getStatus' }, (response) => {
      if (response) {
        const isRunning = response.isRunning;
        statusDot.className = `status-dot ${isRunning ? 'online' : 'offline'}`;
        statusText.textContent = isRunning ? 'Online' : 'Offline';
        statusValue.textContent = isRunning ? '🟢 Online' : '🔴 Offline';
        
        const selectedHunt = response.selectedHunt || 'rat-hunt';
        const hunt = HUNTS.find(h => h.id === selectedHunt);
        huntValue.textContent = hunt ? hunt.title : 'Nenhuma';
        pullValue.textContent = response.selectedPull || 'Cauteloso';
        
        const mode = response.partyMode || 'solo';
        modeValue.textContent = mode === 'leader' ? 'Líder' : mode === 'member' ? 'Membro' : 'Solo';
        
        if (partyModeSelect.value !== mode) {
          partyModeSelect.value = mode;
        }
      }
    });
  }

  // ============ FUNÇÕES DE ITENS ============
  function loadItems() {
    if (window.ALL_ITEMS && window.ALL_ITEMS.length) {
      ALL_ITEMS = window.ALL_ITEMS;
      CATEGORIES = window.getCategories ? window.getCategories() : [];
      populateCategories();
      return true;
    }

    // Fallback
    ALL_ITEMS = [
      'Espada Curta', 'Espada Longa', 'Espada de Ferro', 'Espada de Aço',
      'Machado Curto', 'Machado Longo', 'Machado de Ferro', 'Machado de Aço',
      'Arco Curto', 'Arco Longo', 'Arco de Ferro', 'Arco de Aço',
      'Besta', 'Besta de Ferro', 'Besta de Aço',
      'Bastão', 'Bastão de Ferro', 'Bastão de Aço',
      'Adaga', 'Adaga de Ferro', 'Adaga de Aço',
      'Lança', 'Lança de Ferro', 'Lança de Aço',
      'Maça', 'Maça de Ferro', 'Maça de Aço',
      'Martelo', 'Martelo de Ferro', 'Martelo de Aço',
      'Cajado', 'Cajado de Ferro', 'Cajado de Aço',
      'Escudo de Ferro', 'Escudo de Aço', 'Escudo de Mithril',
      'Armadura de Ferro', 'Armadura de Aço', 'Armadura de Mithril',
      'Capacete de Ferro', 'Capacete de Aço', 'Capacete de Mithril',
      'Botas de Ferro', 'Botas de Aço', 'Botas de Mithril',
      'Anel de Vida', 'Anel de Mana', 'Anel de Força',
      'Amuleto de Proteção', 'Amuleto de Vida', 'Amuleto de Mana',
      'Poção de Vida Pequena', 'Poção de Vida Média', 'Poção de Vida Grande',
      'Poção de Mana Pequena', 'Poção de Mana Média', 'Poção de Mana Grande',
      'Poção de Energia', 'Poção de Força', 'Poção de Regeneração',
      'Runa de Fogo', 'Runa de Gelo', 'Runa de Energia', 'Runa de Cura',
      'Flecha', 'Flecha de Fogo', 'Flecha de Gelo',
      'Bolt', 'Bolt de Fogo', 'Bolt de Gelo',
      'Machado de Madeira', 'Picareta', 'Enxada', 'Pá', 'Corda', 'Lanterna', 'Tocha',
      'Bolsa', 'Bolsa de Couro', 'Mochila', 'Mochila Grande', 'Baú',
      'Carne', 'Carne Assada', 'Pão', 'Queijo', 'Leite', 'Mel', 'Peixe',
      'Minério de Ferro', 'Minério de Aço', 'Minério de Mithril',
      'Moeda de Ouro', 'Moeda de Prata', 'Moeda de Cobre'
    ];
    CATEGORIES = ['armas', 'escudos', 'armaduras', 'capacetes', 'botas', 'aneis', 'amuletos', 'pocoes', 'runas', 'municao', 'ferramentas', 'containers', 'comida', 'mineiros', 'moedas'];
    populateCategories();
    return true;
  }

  function populateCategories() {
    categoryFilter.innerHTML = '<option value="">Todas</option>';
    CATEGORIES.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      categoryFilter.appendChild(opt);
    });
  }

  function renderBlockedItems(items) {
    BLOCKED_ITEMS = items || [];
    blockedItemsList.innerHTML = '';
    BLOCKED_ITEMS.forEach(item => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <span>❌ ${item}</span>
        <span class="remove" data-item="${item}">✕</span>
      `;
      blockedItemsList.appendChild(div);
    });
    itemCount.textContent = `Total: ${BLOCKED_ITEMS.length} itens bloqueados`;

    blockedItemsList.querySelectorAll('.remove').forEach(el => {
      el.addEventListener('click', () => {
        const item = el.dataset.item;
        removeBlockedItem(item);
      });
    });
  }

  function removeBlockedItem(item) {
    const newItems = BLOCKED_ITEMS.filter(i => i !== item);
    chrome.runtime.sendMessage({ action: 'setBlockedItems', items: newItems }, () => {
      renderBlockedItems(newItems);
      addLog(`🗑️ Item removido: ${item}`, 'warn');
    });
  }

  function searchItems(query) {
    if (!query || query.length < 2) {
      itemSearchResults.textContent = '';
      return [];
    }
    const q = query.toLowerCase();
    const results = ALL_ITEMS.filter(item => item.toLowerCase().includes(q));
    itemSearchResults.textContent = `🔍 ${results.length} resultados encontrados`;
    return results.slice(0, 20);
  }

  // ============ POPULAR HUNTS ============
  function populateHunts() {
    huntSelect.innerHTML = '';
    HUNTS.forEach(hunt => {
      const option = document.createElement('option');
      option.value = hunt.id;
      option.textContent = `${hunt.title} (${hunt.monster})`;
      huntSelect.appendChild(option);
    });
    addLog(`🏹 ${HUNTS.length} caçadas carregadas`);
  }

  // ============ EVENT LISTENERS ============

  // Tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
    });
  });

  // ============ HUNT SELECT ============
  huntSelect.addEventListener('change', () => {
    const huntId = huntSelect.value;
    const hunt = HUNTS.find(h => h.id === huntId);
    
    // ⭐ Envia a mudança para o bot
    chrome.runtime.sendMessage({
      action: 'updateConfig',
      config: { 
        selectedHunt: huntId,
        selectedHuntName: hunt ? hunt.title : huntId
      }
    }, () => {
      addLog(`🏹 Caçada alterada para: ${hunt ? hunt.title : huntId}`);
      // Atualiza o valor exibido
      const hunt = HUNTS.find(h => h.id === huntId);
      huntValue.textContent = hunt ? hunt.title : 'Nenhuma';
    });
  });

  // ============ PULL SELECT ============
  pullSelect.addEventListener('change', () => {
    const pull = pullSelect.value;
    
    // ⭐ Envia a mudança para o bot
    chrome.runtime.sendMessage({
      action: 'updateConfig',
      config: { selectedPull: pull }
    }, () => {
      addLog(`🎯 Pull alterado para: ${pull}`);
      pullValue.textContent = pull;
    });
  });

  // ============ PARTY MODE ============
  partyModeSelect.addEventListener('change', () => {
    const mode = partyModeSelect.value;
    
    // ⭐ Envia a mudança para o bot
    chrome.runtime.sendMessage({
      action: 'updateConfig',
      config: { partyMode: mode }
    }, () => {
      addLog(`👥 Modo Party alterado para: ${mode === 'leader' ? 'Líder' : mode === 'member' ? 'Membro' : 'Solo'}`);
      modeValue.textContent = mode === 'leader' ? 'Líder' : mode === 'member' ? 'Membro' : 'Solo';
    });
  });

  // Party Mode
  partyModeSelect.addEventListener('change', () => {
    const mode = partyModeSelect.value;
    chrome.runtime.sendMessage({
      action: 'updateConfig',
      config: { partyMode: mode }
    }, () => {
      addLog(`👥 Modo Party: ${mode === 'leader' ? 'Líder' : mode === 'member' ? 'Membro' : 'Solo'}`);
      modeValue.textContent = mode === 'leader' ? 'Líder' : mode === 'member' ? 'Membro' : 'Solo';
    });
  });

  // Start Hunt
  startHuntBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'startHunt' }, () => {
      addLog('▶️ Iniciando caçada...');
    });
  });

  // Force Sell
  forceSellBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'forceSell' }, () => {
      addLog('💰 Forçando venda...');
    });
  });

  // Toggle Modules
  toggleHuntBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'toggleModule', module: 'hunt' }, (response) => {
      const enabled = response?.enabled;
      toggleHuntBtn.textContent = enabled ? '🟢 Ativo' : '🔴 Desativado';
      toggleHuntBtn.style.background = enabled ? '' : '#da3633';
      addLog(`🏹 Módulo Hunt ${enabled ? 'ativado' : 'desativado'}`);
    });
  });

  toggleSellBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'toggleModule', module: 'sell' }, (response) => {
      const enabled = response?.enabled;
      toggleSellBtn.textContent = enabled ? '🟢 Ativo' : '🔴 Desativado';
      toggleSellBtn.style.background = enabled ? '' : '#da3633';
      addLog(`💰 Módulo Venda ${enabled ? 'ativado' : 'desativado'}`);
    });
  });

  togglePartyBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'toggleModule', module: 'party' }, (response) => {
      const enabled = response?.enabled;
      togglePartyBtn.textContent = enabled ? '🟢 Ativo' : '🔴 Desativado';
      togglePartyBtn.style.background = enabled ? '' : '#da3633';
      addLog(`👥 Módulo Party ${enabled ? 'ativado' : 'desativado'}`);
    });
  });

  // Items - Busca
  itemSearch.addEventListener('input', function() {
    const query = this.value.trim();
    if (query.length >= 2) {
      const results = searchItems(query);
      if (results.length > 0) {
        itemSearchResults.innerHTML = results.map(item => 
          `<span style="display:inline-block;padding:2px 8px;margin:2px;background:#21262d;border-radius:4px;cursor:pointer;" data-item="${item}">${item}</span>`
        ).join(' ');
        itemSearchResults.querySelectorAll('[data-item]').forEach(el => {
          el.addEventListener('click', () => {
            itemSearch.value = el.dataset.item;
            itemSearchResults.innerHTML = '';
          });
        });
      } else {
        itemSearchResults.textContent = '🔍 Nenhum item encontrado';
      }
    } else {
      itemSearchResults.textContent = '';
    }
  });

  // Add Item
  addItemBtn.addEventListener('click', () => {
    const item = itemSearch.value.trim();
    if (item && !BLOCKED_ITEMS.includes(item)) {
      const newItems = [...BLOCKED_ITEMS, item];
      chrome.runtime.sendMessage({ action: 'setBlockedItems', items: newItems }, () => {
        renderBlockedItems(newItems);
        itemSearch.value = '';
        itemSearchResults.textContent = '';
        addLog(`📦 Item bloqueado: ${item}`);
      });
    } else if (item && BLOCKED_ITEMS.includes(item)) {
      addLog(`⚠️ Item já está bloqueado: ${item}`, 'warn');
    } else {
      addLog('⚠️ Digite um nome de item', 'warn');
    }
  });

  // Enter key
  itemSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addItemBtn.click();
    }
  });

  // Clear Items
  clearItemsBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'setBlockedItems', items: [] }, () => {
      renderBlockedItems([]);
      addLog('🗑️ Lista de itens bloqueados limpa');
    });
  });

  // Export Items
  exportItemsBtn.addEventListener('click', () => {
    const data = JSON.stringify(BLOCKED_ITEMS, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blocked_items.json';
    a.click();
    URL.revokeObjectURL(url);
    addLog(`📤 Itens exportados: ${BLOCKED_ITEMS.length} itens`);
  });

  // Import Items
  importItemsBtn.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const items = JSON.parse(ev.target.result);
            if (Array.isArray(items)) {
              chrome.runtime.sendMessage({ action: 'setBlockedItems', items }, () => {
                renderBlockedItems(items);
                addLog(`📥 Itens importados: ${items.length} itens`);
              });
            } else {
              addLog('❌ Formato inválido!', 'error');
            }
          } catch (err) {
            addLog(`❌ Erro ao importar: ${err.message}`, 'error');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  });

  // Close
  document.getElementById('closeBtn').addEventListener('click', () => {
    window.close();
  });

  // Checkboxes
  ['autoStart', 'retryOnFail', 'ignoreEquipped', 'autoSell', 'acceptInvite', 'acceptHunt', 'acceptCostShare', 'followLeader'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('change', () => {
        const config = {};
        config[id] = el.checked;
        chrome.runtime.sendMessage({ action: 'updateConfig', config });
      });
    }
  });

  // Cooldown
  document.getElementById('cooldownSelect').addEventListener('change', function() {
    chrome.runtime.sendMessage({
      action: 'updateConfig',
      config: { sellCooldown: parseInt(this.value) }
    });
  });

  // ============ INICIALIZAÇÃO ============

  // Carrega itens
  loadItems();

  // Popula hunts
  populateHunts();

  // Carrega configurações
  chrome.runtime.sendMessage({ action: 'getStatus' }, (response) => {
    if (response) {
      huntSelect.value = response.selectedHunt || 'rat-hunt';
      pullSelect.value = response.selectedPull || 'Cauteloso';
      partyModeSelect.value = response.partyMode || 'solo';
      
      document.getElementById('autoStart').checked = response.autoStart !== false;
      document.getElementById('retryOnFail').checked = response.retryOnFail !== false;
      document.getElementById('ignoreEquipped').checked = response.ignoreEquipped !== false;
      document.getElementById('autoSell').checked = response.autoSell !== false;
      document.getElementById('acceptInvite').checked = response.acceptInvite !== false;
      document.getElementById('acceptHunt').checked = response.acceptHunt !== false;
      document.getElementById('acceptCostShare').checked = response.acceptCostShare !== false;
      document.getElementById('followLeader').checked = response.followLeader !== false;
      
      document.getElementById('cooldownSelect').value = response.sellCooldown || 10000;
      
      toggleHuntBtn.textContent = response.huntEnabled !== false ? '🟢 Ativo' : '🔴 Desativado';
      toggleHuntBtn.style.background = response.huntEnabled !== false ? '' : '#da3633';
      
      toggleSellBtn.textContent = response.sellEnabled !== false ? '🟢 Ativo' : '🔴 Desativado';
      toggleSellBtn.style.background = response.sellEnabled !== false ? '' : '#da3633';
      
      togglePartyBtn.textContent = response.partyEnabled !== false ? '🟢 Ativo' : '🔴 Desativado';
      togglePartyBtn.style.background = response.partyEnabled !== false ? '' : '#da3633';
      
      renderBlockedItems(response.blockedItems || []);
    }
  });

  // Atualiza status
  updateStatus();
  setInterval(updateStatus, 3000);

  addLog('✅ Dashboard carregado!');
  addLog(`📦 ${ALL_ITEMS.length} itens disponíveis`);
  addLog(`🏹 ${HUNTS.length} caçadas disponíveis`);

  // Debug
  window.__hunteraDebug = {
    items: ALL_ITEMS,
    blocked: BLOCKED_ITEMS,
    hunts: HUNTS,
    searchItems: searchItems
  };
});
// dashboard/dashboard.js
document.addEventListener('DOMContentLoaded', () => {
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
  const forceSellBtn = document.getElementById('forceSellBtn');
  const toggleHuntBtn = document.getElementById('toggleHuntBtn');
  const toggleSellBtn = document.getElementById('toggleSellBtn');
  const togglePartyBtn = document.getElementById('togglePartyBtn');
  const reloadBtn = document.getElementById('reloadBtn');
  const itemSearch = document.getElementById('itemSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  const addItemBtn = document.getElementById('addItemBtn');
  const clearItemsBtn = document.getElementById('clearItemsBtn');
  const exportItemsBtn = document.getElementById('exportItemsBtn');
  const importItemsBtn = document.getElementById('importItemsBtn');
  const blockedItemsList = document.getElementById('blockedItemsList');
  const itemCount = document.getElementById('itemCount');
  const itemSearchResults = document.getElementById('itemSearchResults');

  let ALL_ITEMS = [];
  let BLOCKED_ITEMS = [];
  let CATEGORIES = [];

  const HUNTS_LIST = [
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

  // ============================================================
  // STATUS
  // ============================================================
  function updateStatus() {
    chrome.runtime.sendMessage({ action: 'getStatus' }, (response) => {
      if (response) {
        const isRunning = response.isRunning;
        statusDot.className = `status-dot ${isRunning ? 'online' : 'offline'}`;
        statusText.textContent = isRunning ? 'Online' : 'Offline';
        statusValue.textContent = isRunning ? '🟢 Online' : '🔴 Offline';
        
        const selectedHunt = response.selectedHunt || 'rat-hunt';
        const hunt = HUNTS_LIST.find(h => h.id === selectedHunt);
        huntValue.textContent = hunt ? hunt.title : 'Nenhuma';
        pullValue.textContent = response.selectedPull || 'Cauteloso';
        
        const mode = response.partyMode || 'solo';
        modeValue.textContent = mode === 'leader' ? 'Líder' : mode === 'member' ? 'Membro' : 'Solo';
      }
    });
  }

  // ============================================================
  // HUNTS
  // ============================================================
  function populateHunts() {
    huntSelect.innerHTML = '';
    HUNTS_LIST.forEach(hunt => {
      const option = document.createElement('option');
      option.value = hunt.id;
      option.textContent = `${hunt.title} (${hunt.monster})`;
      huntSelect.appendChild(option);
    });
    addLog(`🏹 ${HUNTS_LIST.length} caçadas carregadas`);
  }

  // ============================================================
  // ITEMS
  // ============================================================
  function loadItems() {
    if (window.ALL_ITEMS && window.ALL_ITEMS.length) {
      ALL_ITEMS = window.ALL_ITEMS;
      CATEGORIES = window.getCategories ? window.getCategories() : [];
      populateCategories();
      addLog(`📦 ${ALL_ITEMS.length} itens carregados`);
      return true;
    }
    ALL_ITEMS = [
      'Espada Curta', 'Espada Longa', 'Machado Curto', 'Machado Longo',
      'Arco Curto', 'Arco Longo', 'Besta', 'Bastão', 'Adaga', 'Lança',
      'Maça', 'Martelo', 'Cajado', 'Escudo de Ferro', 'Escudo de Aço',
      'Armadura de Ferro', 'Armadura de Aço', 'Capacete de Ferro', 'Capacete de Aço',
      'Botas de Ferro', 'Botas de Aço', 'Anel de Vida', 'Anel de Mana',
      'Amuleto de Proteção', 'Poção de Vida Pequena', 'Poção de Mana Pequena',
      'Runa de Fogo', 'Flecha', 'Bolt', 'Machado de Madeira', 'Picareta',
      'Pá', 'Corda', 'Lanterna', 'Tocha', 'Bolsa', 'Mochila', 'Baú',
      'Carne', 'Pão', 'Queijo', 'Leite', 'Mel', 'Peixe', 'Maçã', 'Pêra',
      'Minério de Ferro', 'Minério de Aço', 'Moeda de Ouro', 'Moeda de Prata'
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

  // ============================================================
  // ITENS BLOQUEADOS
  // ============================================================
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

  // ============================================================
  // BUSCA DE ITENS
  // ============================================================
  function searchItems(query) {
    if (!query || query.length === 0) {
      itemSearchResults.innerHTML = '';
      return [];
    }
    const searchTerm = query.trim();
    if (window.searchItems) {
      return window.searchItems(searchTerm);
    }
    const q = searchTerm.toLowerCase();
    return ALL_ITEMS.filter(item => item.toLowerCase().includes(q));
  }

  function showAutocompleteSuggestions(query) {
    if (!query || query.length === 0) {
      itemSearchResults.innerHTML = '';
      return;
    }
    const searchTerm = query.trim();
    let results = [];
    if (window.autocompleteItems) {
      results = window.autocompleteItems(searchTerm, 100);
    } else {
      results = searchItems(searchTerm);
    }
    if (!results || results.length === 0) {
      itemSearchResults.innerHTML = '<span style="color: #8b949e;font-size:12px;">🔍 Nenhum item encontrado</span>';
      return;
    }
    const displayResults = results.slice(0, 100);
    const html = displayResults.map(item => 
      `<span style="display:inline-block;padding:4px 10px;margin:3px;background:#21262d;border:1px solid #30363d;border-radius:4px;cursor:pointer;font-size:12px;" data-item="${item}">${item}</span>`
    ).join(' ');
    itemSearchResults.innerHTML = html;
    if (results.length > 100) {
      itemSearchResults.innerHTML += `<div style="margin-top:4px;font-size:11px;color:#8b949e;">${results.length} resultados encontrados (mostrando 100)</div>`;
    } else {
      itemSearchResults.innerHTML += `<div style="margin-top:4px;font-size:11px;color:#8b949e;">${results.length} resultados encontrados</div>`;
    }
    itemSearchResults.querySelectorAll('[data-item]').forEach(el => {
      el.addEventListener('click', () => {
        const itemName = el.dataset.item;
        itemSearch.value = itemName;
        itemSearchResults.innerHTML = '';
        addBlockedItem(itemName);
      });
    });
  }

  function addBlockedItem(itemName) {
    if (!itemName || itemName.trim() === '') {
      addLog('⚠️ Digite um nome de item', 'warn');
      return;
    }
    const item = itemName.trim();
    const exists = BLOCKED_ITEMS.some(b => b.toLowerCase() === item.toLowerCase());
    if (exists) {
      addLog(`⚠️ Item já está bloqueado: ${item}`, 'warn');
      return;
    }
    const newItems = [...BLOCKED_ITEMS, item];
    chrome.runtime.sendMessage({ action: 'setBlockedItems', items: newItems }, () => {
      renderBlockedItems(newItems);
      itemSearch.value = '';
      itemSearchResults.innerHTML = '';
      addLog(`📦 Item bloqueado: ${item}`);
    });
  }

  // ============================================================
  // HUNT SALVA - STATUS E BOTÃO
  // ============================================================
  const saveHuntBtn = document.getElementById('saveHuntBtn');
  const huntSavedStatus = document.getElementById('huntSavedStatus');

  function updateHuntSavedStatus() {
    const selectedHuntId = huntSelect.value;
    const selectedHunt = HUNTS_LIST.find(h => h.id === selectedHuntId);
    const savedHunt = localStorage.getItem('huntera_selectedHunt');
    const savedPull = localStorage.getItem('huntera_selectedPull');
    
    if (savedHunt && savedHunt === selectedHuntId) {
      huntSavedStatus.className = 'saved';
      huntSavedStatus.textContent = `✅ Salvo: ${selectedHunt ? selectedHunt.title : selectedHuntId} (Pull: ${savedPull || 'Cauteloso'})`;
    } else {
      huntSavedStatus.className = 'unsaved';
      huntSavedStatus.textContent = `⚠️ Não salvo - Clique em "Salvar" para confirmar`;
    }
  }

  saveHuntBtn.addEventListener('click', () => {
    const huntId = huntSelect.value;
    const hunt = HUNTS_LIST.find(h => h.id === huntId);
    const pull = pullSelect.value;
    const mode = partyModeSelect.value;
    
    if (!huntId) {
      addLog('⚠️ Selecione uma caçada antes de salvar', 'warn');
      return;
    }
    
    localStorage.setItem('huntera_selectedHunt', huntId);
    localStorage.setItem('huntera_selectedPull', pull);
    localStorage.setItem('huntera_partyMode', mode);
    
    chrome.runtime.sendMessage({
      action: 'updateConfig',
      config: { 
        selectedHunt: huntId,
        selectedPull: pull,
        partyMode: mode
      }
    }, () => {
      addLog(`💾 Hunt salva: ${hunt ? hunt.title : huntId} (Pull: ${pull})`);
      updateHuntSavedStatus();
      
      saveHuntBtn.textContent = '✅ Salvo!';
      saveHuntBtn.style.background = '#238636';
      setTimeout(() => {
        saveHuntBtn.textContent = '💾 Salvar';
        saveHuntBtn.style.background = '';
      }, 2000);
    });
  });

  huntSelect.addEventListener('change', updateHuntSavedStatus);
  pullSelect.addEventListener('change', updateHuntSavedStatus);
  partyModeSelect.addEventListener('change', updateHuntSavedStatus);

  // ============================================================
  // TABS
  // ============================================================
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`tab-${tab.dataset.tab}`).classList.add('active');
    });
  });

  // ============================================================
  // HUNT SELECT
  // ============================================================
  huntSelect.addEventListener('change', () => {
    const huntId = huntSelect.value;
    const hunt = HUNTS_LIST.find(h => h.id === huntId);
    chrome.runtime.sendMessage({
      action: 'updateConfig',
      config: { selectedHunt: huntId }
    }, () => {
      addLog(`🏹 Caçada alterada para: ${hunt ? hunt.title : huntId}`);
      huntValue.textContent = hunt ? hunt.title : 'Nenhuma';
    });
  });

  // ============================================================
  // PULL SELECT
  // ============================================================
  pullSelect.addEventListener('change', () => {
    const pull = pullSelect.value;
    chrome.runtime.sendMessage({
      action: 'updateConfig',
      config: { selectedPull: pull }
    }, () => {
      addLog(`🎯 Pull alterado para: ${pull}`);
      pullValue.textContent = pull;
    });
  });

  // ============================================================
  // PARTY MODE
  // ============================================================
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

  // ============================================================
  // FORCE SELL
  // ============================================================
  forceSellBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'forceSell' }, () => {
      addLog('💰 Forçando venda...');
    });
  });

  // ============================================================
  // RELOAD SCRIPTS
  // ============================================================
  reloadBtn.addEventListener('click', () => {
    reloadBtn.textContent = '⏳';
    reloadBtn.disabled = true;
    addLog('🔄 Recarregando scripts do GitHub...');
    chrome.runtime.sendMessage({ action: 'reloadScripts' }, (response) => {
      reloadBtn.textContent = '🔄';
      reloadBtn.disabled = false;
      if (response && response.success) {
        addLog('✅ Scripts recarregados do GitHub!');
        setTimeout(() => {
          loadItems();
          addLog(`📦 ${ALL_ITEMS.length} itens disponíveis`);
        }, 1000);
      } else {
        addLog('❌ Falha ao recarregar scripts!', 'error');
      }
    });
  });

  // ============================================================
  // TOGGLE MODULES
  // ============================================================
  toggleHuntBtn.addEventListener('click', () => {
    const isCurrentlyActive = toggleHuntBtn.textContent.includes('🟢');
    const newState = !isCurrentlyActive;
    toggleHuntBtn.textContent = newState ? '🟢 Ativo' : '🔴 Desativado';
    toggleHuntBtn.style.background = newState ? '' : '#da3633';
    
    chrome.runtime.sendMessage({ action: 'toggleModule', module: 'hunt', enabled: newState }, (response) => {
      if (response && response.success) {
        addLog(`🏹 Módulo Hunt ${newState ? 'ativado' : 'desativado'}`);
        if (newState) {
          const savedHunt = localStorage.getItem('huntera_selectedHunt');
          if (!savedHunt) {
            addLog('⚠️ Nenhuma hunt salva! Clique em "Salvar" primeiro.', 'warn');
            toggleHuntBtn.textContent = '🔴 Desativado';
            toggleHuntBtn.style.background = '#da3633';
            chrome.runtime.sendMessage({ action: 'toggleModule', module: 'hunt', enabled: false });
            return;
          }
          addLog(`🏹 Hunt salva: ${savedHunt}`);
        }
      } else {
        toggleHuntBtn.textContent = isCurrentlyActive ? '🟢 Ativo' : '🔴 Desativado';
        toggleHuntBtn.style.background = isCurrentlyActive ? '' : '#da3633';
        addLog('❌ Falha ao alternar módulo Hunt', 'error');
      }
    });
  });

  toggleSellBtn.addEventListener('click', () => {
    const isCurrentlyActive = toggleSellBtn.textContent.includes('🟢');
    const newState = !isCurrentlyActive;
    toggleSellBtn.textContent = newState ? '🟢 Ativo' : '🔴 Desativado';
    toggleSellBtn.style.background = newState ? '' : '#da3633';
    chrome.runtime.sendMessage({ action: 'toggleModule', module: 'sell', enabled: newState }, (response) => {
      if (response && response.success) {
        addLog(`💰 Módulo Venda ${newState ? 'ativado' : 'desativado'}`);
      }
    });
  });

  togglePartyBtn.addEventListener('click', () => {
    const isCurrentlyActive = togglePartyBtn.textContent.includes('🟢');
    const newState = !isCurrentlyActive;
    togglePartyBtn.textContent = newState ? '🟢 Ativo' : '🔴 Desativado';
    togglePartyBtn.style.background = newState ? '' : '#da3633';
    chrome.runtime.sendMessage({ action: 'toggleModule', module: 'party', enabled: newState }, (response) => {
      if (response && response.success) {
        addLog(`👥 Módulo Party ${newState ? 'ativado' : 'desativado'}`);
      }
    });
  });

  // ============================================================
  // ITEMS SEARCH
  // ============================================================
  let searchTimeout = null;

  itemSearch.addEventListener('input', function() {
    const query = this.value.trim();
    if (searchTimeout) clearTimeout(searchTimeout);
    if (query.length === 0) {
      itemSearchResults.innerHTML = '';
      return;
    }
    searchTimeout = setTimeout(() => {
      showAutocompleteSuggestions(query);
    }, 300);
  });

  addItemBtn.addEventListener('click', () => {
    const item = itemSearch.value.trim();
    addBlockedItem(item);
  });

  itemSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const item = itemSearch.value.trim();
      addBlockedItem(item);
    }
  });

  // ============================================================
  // CLEAR ITEMS
  // ============================================================
  clearItemsBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'setBlockedItems', items: [] }, () => {
      renderBlockedItems([]);
      addLog('🗑️ Lista de itens bloqueados limpa');
    });
  });

  // ============================================================
  // EXPORT ITEMS
  // ============================================================
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

  // ============================================================
  // IMPORT ITEMS
  // ============================================================
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

  // ============================================================
  // CLOSE
  // ============================================================
  document.getElementById('closeBtn').addEventListener('click', () => {
    window.close();
  });

  // ============================================================
  // CHECKBOXES
  // ============================================================
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

  // ============================================================
  // COOLDOWN
  // ============================================================
  document.getElementById('cooldownSelect').addEventListener('change', function() {
    chrome.runtime.sendMessage({
      action: 'updateConfig',
      config: { sellCooldown: parseInt(this.value) }
    });
  });

  // ============================================================
  // CAP THRESHOLD
  // ============================================================
  const capThreshold = document.getElementById('capThreshold');
  if (capThreshold) {
    capThreshold.addEventListener('change', () => {
      const config = { capThreshold: parseFloat(capThreshold.value) };
      chrome.runtime.sendMessage({ action: 'updateConfig', config });
      addLog(`📊 Limite de Cap: ${(parseFloat(capThreshold.value) * 100)}%`);
    });
  }

  // ============================================================
  // AUTO SELL IN HUNT
  // ============================================================
  const autoSellInHunt = document.getElementById('autoSellInHunt');
  if (autoSellInHunt) {
    autoSellInHunt.addEventListener('change', () => {
      const config = { autoSellInHunt: autoSellInHunt.checked };
      chrome.runtime.sendMessage({ action: 'updateConfig', config });
      addLog(`🏹 Vender na hunt: ${autoSellInHunt.checked ? 'ativado' : 'desativado'}`);
    });
  }

  // ============================================================
  // INITIALIZATION
  // ============================================================
  loadItems();
  populateHunts();
  updateHuntSavedStatus();

  const savedHunt = localStorage.getItem('huntera_selectedHunt');
  const savedPull = localStorage.getItem('huntera_selectedPull');
  const savedMode = localStorage.getItem('huntera_partyMode');

  if (savedHunt) {
    huntSelect.value = savedHunt;
    if (savedPull) pullSelect.value = savedPull;
    if (savedMode) partyModeSelect.value = savedMode;
    updateHuntSavedStatus();
    addLog(`📂 Hunt carregada: ${savedHunt} (Pull: ${savedPull || 'Cauteloso'})`);
  }

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
      
      if (response.capThreshold !== undefined) {
        document.getElementById('capThreshold').value = response.capThreshold;
      }
      if (response.autoSellInHunt !== undefined) {
        document.getElementById('autoSellInHunt').checked = response.autoSellInHunt;
      }
      
      const huntEnabled = response.huntEnabled !== false;
      toggleHuntBtn.textContent = huntEnabled ? '🟢 Ativo' : '🔴 Desativado';
      toggleHuntBtn.style.background = huntEnabled ? '' : '#da3633';
      
      const sellEnabled = response.sellEnabled !== false;
      toggleSellBtn.textContent = sellEnabled ? '🟢 Ativo' : '🔴 Desativado';
      toggleSellBtn.style.background = sellEnabled ? '' : '#da3633';
      
      const partyEnabled = response.partyEnabled !== false;
      togglePartyBtn.textContent = partyEnabled ? '🟢 Ativo' : '🔴 Desativado';
      togglePartyBtn.style.background = partyEnabled ? '' : '#da3633';
      
      renderBlockedItems(response.blockedItems || []);
    }
  });

  updateStatus();
  setInterval(updateStatus, 3000);

  addLog('✅ Dashboard carregado!');
  addLog(`📦 ${ALL_ITEMS.length} itens disponíveis`);
  addLog(`🏹 ${HUNTS_LIST.length} caçadas disponíveis`);
  addLog('📦 GitHub: wandersonlt/huntera-bot');

  window.__hunteraDebug = {
    items: ALL_ITEMS,
    blocked: BLOCKED_ITEMS,
    hunts: HUNTS_LIST,
    searchItems: searchItems
  };
});
// modules/hunt.js - CORRIGIDO
class HuntModule extends HunteraModule {
  constructor() {
    super('Hunt');
    
    this.config = {
      selectedHunt: localStorage.getItem('huntera_selectedHunt') || 'rat-hunt',
      selectedPull: localStorage.getItem('huntera_selectedPull') || 'Cauteloso',
      autoStart: true,
      retryOnFail: true,
      maxRetries: 3,
      partyMode: localStorage.getItem('huntera_partyMode') || 'solo'
    };

    // TODAS AS 52 HUNTS
    this.allHunts = [
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

    this._retryCount = 0;
    this._lastHuntTime = 0;
    this._cooldown = 5000;
    this._isNavigating = false;
    this._lastConfig = {};

    this.selectors = {
      huntTab: '[data-tab="hunt"]',
      huntWindow: '.hunt-window',
      huntEntry: '.hunt-entry',
      huntTitle: '.hunt-entry-copy strong',
      huntMonster: '.hunt-entry-monster',
      pullOptions: '.hunt-tier',
      pullContainer: '.hunt-tiers',
      startBtn: '#hunt-start',
      teamBtn: '#hunt-start-team',
      leaveBtn: '#nav-leave-hunt',
      awayNote: '.hunt-away-note',
      selected: '.hunt-entry.selected',
      startButton: 'button:contains("Iniciar")'
    };

    this._loadConfig();
    this._lastConfig = { ...this.config };
    this.log(`📋 ${this.allHunts.length} caçadas carregadas`, 'info');
  }

  // ⭐ NOVO: Verifica se a configuração mudou e aplica
  updateConfig(config) {
    const changed = {};
    for (const key in config) {
      if (this.config[key] !== config[key]) {
        changed[key] = config[key];
      }
    }
    
    Object.assign(this.config, config);
    this._saveConfig();
    
    // Aplica mudanças imediatamente
    if (Object.keys(changed).length > 0) {
      this.log(`⚙️ Configuração alterada: ${JSON.stringify(changed)}`);
      this._applyConfigChanges(changed);
    }
    
    return true;
  }

  // ⭐ NOVO: Aplica mudanças de configuração
  async _applyConfigChanges(changed) {
    // Se mudou a hunt ou pull, aplica imediatamente
    if (changed.selectedHunt || changed.selectedPull) {
      this.log('🔄 Aplicando nova configuração...');
      
      // Se está em uma hunt, não faz nada (espera voltar pra cidade)
      if (this.isInHunt()) {
        this.log('⏳ Em hunt, aguardando retorno para aplicar configuração');
        return;
      }
      
      // Se está na cidade, aplica
      if (this.isInCity()) {
        this.log('🏙️ Na cidade, aplicando nova configuração');
        await this.openHuntWindow();
        await this.delay(500);
        
        if (changed.selectedHunt) {
          await this.selectHunt(changed.selectedHunt);
        }
        if (changed.selectedPull) {
          await this.applyPull(changed.selectedPull);
        }
        
        // Se autoStart estiver ativo, inicia a hunt
        if (this.config.autoStart) {
          this.log('🚀 AutoStart ativo, iniciando caçada...');
          await this.startHunt();
        }
      }
    }
  }

  async openHuntWindow() {
    if (this._isNavigating) {
      this.log('Já está navegando...', 'warn');
      return false;
    }

    this._isNavigating = true;
    this.log('Abrindo janela de caçadas...');

    try {
      // Verifica se a janela já está aberta
      const windowEl = this.findElement(this.selectors.huntWindow);
      if (windowEl && windowEl.offsetParent !== null) {
        this.log('Janela já está aberta');
        this._isNavigating = false;
        return true;
      }

      // Tenta clicar na aba Hunt
      let huntTab = this.findElement(this.selectors.huntTab);
      if (huntTab) {
        this.log('Clicando na aba Hunt');
        if (this.safeClick(huntTab)) {
          await this.delay(800);
          this._isNavigating = false;
          return true;
        }
      }

      // Tenta encontrar por texto
      this.log('Procurando aba por texto...');
      const allButtons = document.querySelectorAll('button, a, [role="tab"]');
      for (const btn of allButtons) {
        const text = btn.textContent?.trim() || '';
        if (text.includes('Caçada') || text.includes('Hunt') || text.includes('Caçadas')) {
          this.log(`Clicando em: ${text}`);
          if (this.safeClick(btn)) {
            await this.delay(800);
            this._isNavigating = false;
            return true;
          }
        }
      }

      this.log('Não foi possível abrir a janela de caçadas', 'warn');
      this._isNavigating = false;
      return false;

    } catch (e) {
      this.log(`Erro ao abrir janela: ${e.message}`, 'error');
      this._isNavigating = false;
      return false;
    }
  }

  async scanHunts() {
    this.log('Escaneando caçadas...');
    
    if (!await this.openHuntWindow()) {
      this.log('Não foi possível abrir a janela', 'warn');
      return this.allHunts;
    }

    await this.delay(500);

    const entries = this.findElements(this.selectors.huntEntry);
    if (!entries || !entries.length) {
      this.log('Nenhuma caçada encontrada, usando lista padrão', 'warn');
      return this.allHunts;
    }

    this.log(`Encontradas ${entries.length} caçadas`);

    const hunts = [];
    for (const entry of entries) {
      try {
        const huntId = entry.getAttribute('data-hunt-id') || '';
        const titleEl = entry.querySelector(this.selectors.huntTitle);
        const monsterEl = entry.querySelector(this.selectors.huntMonster);
        const title = titleEl ? titleEl.textContent.trim() : '';
        const monster = monsterEl ? monsterEl.textContent.trim() : '';
        const selected = entry.classList.contains('selected');

        if (title) {
          hunts.push({
            id: huntId || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, ''),
            title: title,
            monster: monster || 'Desconhecido',
            selected: selected
          });
        }
      } catch (e) {
        console.debug('Erro ao processar entrada:', e);
      }
    }

    if (hunts.length) {
      this.allHunts = hunts;
      this.emit('huntsUpdated', hunts);
      this.log(`${hunts.length} caçadas encontradas`);
    }

    return this.allHunts;
  }

  async selectHunt(huntId) {
    this.log(`Selecionando caçada: ${huntId}`);
    
    if (!await this.openHuntWindow()) {
      this.log('Não foi possível abrir a janela', 'warn');
      return false;
    }

    await this.delay(300);

    // Tenta encontrar pelo data-hunt-id
    const entries = this.findElements(this.selectors.huntEntry);
    for (const entry of entries) {
      const id = entry.getAttribute('data-hunt-id');
      if (id === huntId) {
        if (entry.classList.contains('selected')) {
          this.log(`Caçada já selecionada: ${huntId}`);
          return true;
        }
        if (this.safeClick(entry)) {
          await this.delay(500);
          this.config.selectedHunt = huntId;
          this._saveConfig();
          localStorage.setItem('huntera_selectedHunt', huntId);
          this.emit('huntSelected', huntId);
          this.log(`✅ Caçada selecionada: ${huntId}`);
          return true;
        }
      }
    }

    // Tenta encontrar pelo título
    const hunt = this.allHunts.find(h => h.id === huntId);
    if (hunt) {
      this.log(`Procurando por título: ${hunt.title}`);
      for (const entry of entries) {
        const titleEl = entry.querySelector(this.selectors.huntTitle);
        if (titleEl && titleEl.textContent.trim() === hunt.title) {
          if (this.safeClick(entry)) {
            await this.delay(500);
            this.config.selectedHunt = huntId;
            this._saveConfig();
            localStorage.setItem('huntera_selectedHunt', huntId);
            this.emit('huntSelected', huntId);
            this.log(`✅ Caçada selecionada por título: ${hunt.title}`);
            return true;
          }
        }
      }
    }

    this.log(`❌ Caçada não encontrada: ${huntId}`, 'warn');
    return false;
  }

  async applyPull(pullName) {
    this.log(`Aplicando pull: ${pullName}`);
    
    const container = this.findElement(this.selectors.pullContainer);
    if (!container) {
      this.log('Container de pulls não encontrado', 'warn');
      return false;
    }

    const buttons = container.querySelectorAll(this.selectors.pullOptions);
    if (!buttons || !buttons.length) {
      this.log('Botões de pull não encontrados', 'warn');
      return false;
    }

    for (const btn of buttons) {
      const text = btn.textContent.trim();
      if (text.toLowerCase() === pullName.toLowerCase()) {
        if (btn.classList.contains('selected')) {
          this.log(`Pull já selecionado: ${pullName}`);
          return true;
        }
        if (this.safeClick(btn)) {
          await this.delay(300);
          this.config.selectedPull = pullName;
          this._saveConfig();
          localStorage.setItem('huntera_selectedPull', pullName);
          this.emit('pullApplied', pullName);
          this.log(`✅ Pull aplicado: ${pullName}`);
          return true;
        }
      }
    }

    this.log(`❌ Pull não encontrado: ${pullName}`, 'warn');
    return false;
  }

  // ⭐ CORRIGIDO: Iniciar hunt com mais tentativas
  async startHunt() {
    this.log('🚀 Iniciando caçada...');
    
    if (this.isInHunt()) {
      this.log('⏳ Já está em uma caçada');
      return true;
    }

    if (!await this.openHuntWindow()) {
      this.log('❌ Não foi possível abrir a janela', 'warn');
      return false;
    }

    await this.delay(500);

    if (!await this.selectHunt(this.config.selectedHunt)) {
      this.log('❌ Não foi possível selecionar a caçada', 'warn');
      return false;
    }

    await this.delay(300);
    await this.applyPull(this.config.selectedPull);
    await this.delay(300);

    // ⭐ Múltiplas tentativas de encontrar o botão de iniciar
    let startBtn = null;
    let teamBtn = null;
    
    // Tenta encontrar pelos seletores específicos
    startBtn = this.findElement(this.selectors.startBtn);
    teamBtn = this.findElement(this.selectors.teamBtn);
    
    // Se não encontrou, tenta por texto
    if (!startBtn && !teamBtn) {
      this.log('Procurando botões por texto...');
      const allBtns = document.querySelectorAll('button');
      for (const btn of allBtns) {
        const text = btn.textContent?.trim() || '';
        if (text.includes('Iniciar caçada') && btn.offsetParent !== null) {
          startBtn = btn;
          break;
        }
        if (text.includes('Iniciar com o time') && btn.offsetParent !== null) {
          teamBtn = btn;
          break;
        }
        if (text.includes('Iniciar') && btn.offsetParent !== null && btn.dataset?.tab !== 'hunt') {
          if (!startBtn) startBtn = btn;
        }
      }
    }

    // Tenta iniciar solo
    if (startBtn && !startBtn.disabled && startBtn.offsetParent !== null) {
      this.log('Clicando em "Iniciar caçada"');
      if (this.safeClick(startBtn)) {
        await this.delay(2000);
        this._retryCount = 0;
        this.emit('huntStarted', this.config.selectedHunt);
        this.log('✅ Caçada iniciada!');
        return true;
      }
    }

    // Tenta iniciar com time
    if (teamBtn && !teamBtn.disabled && teamBtn.offsetParent !== null) {
      this.log('Clicando em "Iniciar com o time"');
      if (this.safeClick(teamBtn)) {
        await this.delay(2000);
        this._retryCount = 0;
        this.emit('huntStartedTeam', this.config.selectedHunt);
        this.log('✅ Caçada iniciada com o time!');
        return true;
      }
    }

    // ⭐ Última tentativa: clicar em qualquer botão que contenha "Iniciar"
    this.log('Tentando qualquer botão de iniciar...');
    const allBtns = document.querySelectorAll('button');
    for (const btn of allBtns) {
      const text = btn.textContent?.trim() || '';
      if (text.includes('Iniciar') && !btn.disabled && btn.offsetParent !== null) {
        if (this.safeClick(btn)) {
          await this.delay(2000);
          this._retryCount = 0;
          this.log(`✅ Caçada iniciada via: ${text}`);
          return true;
        }
      }
    }

    this.log('❌ Não foi possível iniciar a caçada', 'warn');

    if (this.config.retryOnFail && this._retryCount < this.config.maxRetries) {
      this._retryCount++;
      this.log(`🔄 Tentando novamente (${this._retryCount}/${this.config.maxRetries})...`);
      await this.delay(2000);
      return this.startHunt();
    }

    return false;
  }

  isInHunt() {
    const leaveBtn = this.findElement(this.selectors.leaveBtn);
    if (leaveBtn && leaveBtn.offsetParent !== null && !leaveBtn.hidden) {
      return true;
    }

    const awayNote = this.findElement(this.selectors.awayNote);
    if (awayNote && awayNote.offsetParent !== null && !awayNote.hidden) {
      return true;
    }

    return false;
  }

  isInCity() {
    return !this.isInHunt();
  }

  async leaveHunt() {
    this.log('Saindo da caçada...');
    
    const leaveBtn = this.findElement(this.selectors.leaveBtn);
    if (leaveBtn && this.safeClick(leaveBtn)) {
      await this.delay(1000);
      this.emit('huntLeft');
      return true;
    }

    return false;
  }

  async loop() {
    if (!this.isRunning()) return;

    try {
      // Verifica se está na cidade e autoStart ativado
      if (this.isInCity() && this.config.autoStart) {
        if (this.config.selectedHunt) {
          this.log('🏙️ Na cidade, retornando para caçada...');
          await this.startHunt();
        }
      }

      // Verifica se a config mudou enquanto está em hunt
      if (this.isInHunt()) {
        // Se mudou a hunt ou pull, aplica quando voltar
        const currentHunt = this.config.selectedHunt;
        const currentPull = this.config.selectedPull;
        // Apenas loga que está em hunt com as configs atuais
      }

    } catch (e) {
      this.log(`Erro no loop: ${e.message}`, 'error');
    }

    await this.delay(2000);
  }

  setPartyMode(mode) {
    if (['solo', 'leader', 'member'].includes(mode)) {
      this.config.partyMode = mode;
      this._saveConfig();
      localStorage.setItem('huntera_partyMode', mode);
      this.log(`Modo Party alterado para: ${mode}`);
      return true;
    }
    return false;
  }

  getPartyMode() {
    return this.config.partyMode;
  }

  getHunts() {
    return this.allHunts;
  }

  getSelectedHunt() {
    return this.config.selectedHunt;
  }

  getSelectedPull() {
    return this.config.selectedPull;
  }

  getHuntById(id) {
    return this.allHunts.find(h => h.id === id);
  }

  getHuntByName(name) {
    return this.allHunts.find(h => h.title === name);
  }
}

window.HuntModule = HuntModule;
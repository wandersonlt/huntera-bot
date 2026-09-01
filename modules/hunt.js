// modules/hunt.js
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
    this._huntFound = false;

    this.selectors = {
      navHunt: '#nav-start-hunt',
      huntTab: '.hunt-tab[data-tab="hunts"]',
      huntWindow: '.hunt-window',
      huntBrowser: '.hunt-browser',
      huntList: '.hunt-list',
      huntEntry: '.hunt-entry',
      huntSelected: '.hunt-entry.selected',
      huntPicked: '.hunt-entry.player-picked',
      huntId: 'data-hunt-id',
      huntTitle: '.hunt-entry-copy strong',
      huntMonster: '.hunt-entry-monster',
      pullContainer: '.hunt-tiers',
      pullOptions: '.hunt-tier',
      pullSelected: '.hunt-tier.selected',
      startBtn: '#hunt-start',
      teamBtn: '#hunt-start-team',
      findTeamBtn: '#hunt-find-team',
      cancelBtn: '#hunt-cancel',
      leaveBtn: '#nav-leave-hunt',
      awayNote: '.hunt-away-note',
      inHuntIndicator: '.hud-hunt-action',
      inviteCard: '.party-invite.invite-card',
      inviteTitle: '.invite-title',
      inviteActions: '.invite-actions',
      inviteBtn: '.invite-actions button',
    };

    this._loadConfig();
    this.log(`📋 ${this.allHunts.length} caçadas carregadas`, 'info');
  }

  async openHuntWindow() {
    if (this._isNavigating) {
      this.log('Já está navegando...', 'warn');
      return false;
    }

    this._isNavigating = true;
    this.log('Abrindo janela de caçadas...');

    try {
      const windowEl = this.findElement(this.selectors.huntWindow);
      if (windowEl && windowEl.offsetParent !== null) {
        this.log('Janela já está aberta');
        this._isNavigating = false;
        return true;
      }

      let navHunt = this.findElement(this.selectors.navHunt);
      if (navHunt && this.safeClick(navHunt)) {
        await this.delay(800);
        this._isNavigating = false;
        return true;
      }

      let huntTab = this.findElement(this.selectors.huntTab);
      if (huntTab && this.safeClick(huntTab)) {
        await this.delay(800);
        this._isNavigating = false;
        return true;
      }

      const allButtons = document.querySelectorAll('button, a, [role="tab"]');
      for (const btn of allButtons) {
        const text = btn.textContent?.trim() || '';
        if (text.includes('Caçada') || text.includes('Hunt') || text.includes('Caçar')) {
          if (this.safeClick(btn)) {
            await this.delay(800);
            this._isNavigating = false;
            return true;
          }
        }
      }

      this.log('Não foi possível abrir a janela', 'warn');
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
      this.log('Nenhuma caçada encontrada', 'warn');
      return this.allHunts;
    }
    this.log(`Encontradas ${entries.length} caçadas`);
    const hunts = [];
    for (const entry of entries) {
      try {
        const huntId = entry.getAttribute(this.selectors.huntId) || '';
        const titleEl = entry.querySelector(this.selectors.huntTitle);
        const monsterEl = entry.querySelector(this.selectors.huntMonster);
        const title = titleEl ? titleEl.textContent.trim() : '';
        const monster = monsterEl ? monsterEl.textContent.trim() : '';
        const selected = entry.classList.contains('selected') || entry.classList.contains('player-picked');
        if (title) {
          hunts.push({
            id: huntId || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, ''),
            title: title,
            monster: monster || 'Desconhecido',
            selected: selected,
            element: entry
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
    const entries = this.findElements(this.selectors.huntEntry);
    for (const entry of entries) {
      const id = entry.getAttribute(this.selectors.huntId);
      if (id === huntId) {
        if (entry.classList.contains('selected') || entry.classList.contains('player-picked')) {
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
    const hunt = this.allHunts.find(h => h.id === huntId);
    if (hunt) {
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

  async startHunt() {
    this.log('🚀 Iniciando caçada...');
    
    if (this.isInHunt()) {
      this.log('⏳ Já está em uma caçada');
      this._huntFound = true;
      return true;
    }

    if (!await this.openHuntWindow()) {
      this.log('❌ Não foi possível abrir a janela', 'warn');
      this._huntFound = false;
      return false;
    }

    await this.delay(500);

    if (!await this.selectHunt(this.config.selectedHunt)) {
      this.log('❌ Não foi possível selecionar a caçada', 'warn');
      this._huntFound = false;
      return false;
    }

    await this.delay(300);
    await this.applyPull(this.config.selectedPull);
    await this.delay(500);

    this.log('🔍 Verificando visibilidade da janela e botões...');
    
    const huntWindow = document.querySelector('.hunt-window');
    if (huntWindow && (huntWindow.offsetParent === null || huntWindow.hidden)) {
      this.log('⚠️ Janela não está visível, corrigindo...');
      huntWindow.style.display = '';
      huntWindow.style.visibility = '';
      huntWindow.style.opacity = '';
      huntWindow.removeAttribute('hidden');
      huntWindow.removeAttribute('aria-hidden');
    }
    
    const huntFooter = document.querySelector('.hunt-window footer');
    if (huntFooter && (huntFooter.offsetParent === null || huntFooter.hidden)) {
      this.log('⚠️ Footer não está visível, corrigindo...');
      huntFooter.style.display = '';
      huntFooter.style.visibility = '';
      huntFooter.style.opacity = '';
      huntFooter.removeAttribute('hidden');
    }
    
    const startBtn = document.querySelector('#hunt-start');
    if (!startBtn) {
      this.log('❌ Botão #hunt-start não encontrado!', 'error');
      this._huntFound = false;
      return false;
    }
    
    this.log('✅ Botão encontrado, verificando visibilidade...');
    
    if (startBtn.offsetParent === null || startBtn.hidden) {
      this.log('⚠️ Botão não está visível, corrigindo...');
      startBtn.style.display = '';
      startBtn.style.visibility = '';
      startBtn.style.opacity = '';
      startBtn.removeAttribute('hidden');
      startBtn.removeAttribute('aria-hidden');
      startBtn.disabled = false;
    }
    
    let parent = startBtn.parentElement;
    while (parent && parent !== document.body) {
      if (parent.offsetParent === null || parent.hidden) {
        parent.style.display = '';
        parent.style.visibility = '';
        parent.style.opacity = '';
        parent.removeAttribute('hidden');
        parent.removeAttribute('aria-hidden');
      }
      parent = parent.parentElement;
    }
    
    await this.delay(300);
    
    const rect = startBtn.getBoundingClientRect();
    const isVisible = rect.width > 0 && rect.height > 0;
    this.log(`📊 Botão visível: ${isVisible}, tamanho: ${rect.width}x${rect.height}`);
    
    if (!isVisible) {
      this.log('⚠️ Botão ainda não está visível, tentando scroll...');
      startBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      await this.delay(500);
      const rect2 = startBtn.getBoundingClientRect();
      this.log(`📊 Após scroll: ${rect2.width}x${rect2.height}`);
    }
    
    const finalRect = startBtn.getBoundingClientRect();
    const isFinalVisible = finalRect.width > 0 && finalRect.height > 0;
    this.log(`📊 Status final: visível=${isFinalVisible}`);
    
    if (isFinalVisible && !startBtn.disabled) {
      this.log('✅ Botão visível e habilitado, clicando...');
      
      try {
        startBtn.click();
        this.log('✅ Clique nativo executado!');
        await this.delay(2000);
        this._retryCount = 0;
        this._huntFound = true;
        this.emit('huntStarted', this.config.selectedHunt);
        this.log('✅ Caçada iniciada!');
        return true;
      } catch (e) {
        this.log(`⚠️ Clique nativo falhou: ${e.message}`);
      }
      
      try {
        const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        startBtn.dispatchEvent(clickEvent);
        this.log('✅ Evento dispatchado!');
        await this.delay(2000);
        this._retryCount = 0;
        this._huntFound = true;
        this.emit('huntStarted', this.config.selectedHunt);
        this.log('✅ Caçada iniciada!');
        return true;
      } catch (e) {
        this.log(`⚠️ Evento dispatch falhou: ${e.message}`);
      }
      
      if (this.safeClick(startBtn)) {
        this.log('✅ safeClick executado!');
        await this.delay(2000);
        this._retryCount = 0;
        this._huntFound = true;
        this.emit('huntStarted', this.config.selectedHunt);
        this.log('✅ Caçada iniciada!');
        return true;
      }
    } else {
      this.log(`⚠️ Botão não está clicável: visível=${isFinalVisible}, disabled=${startBtn.disabled}`, 'warn');
    }

    this.log('🔍 Tentando botão #hunt-find-team...');
    let findTeamBtn = document.querySelector('#hunt-find-team');
    if (findTeamBtn) {
      if (findTeamBtn.offsetParent === null || findTeamBtn.hidden) {
        findTeamBtn.style.display = '';
        findTeamBtn.style.visibility = '';
        findTeamBtn.removeAttribute('hidden');
        findTeamBtn.disabled = false;
      }
      
      if (findTeamBtn.offsetParent !== null) {
        this.log('✅ Clicando em "Encontrar time"');
        findTeamBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await this.delay(300);
        try {
          findTeamBtn.click();
          await this.delay(2000);
          this._retryCount = 0;
          this._huntFound = true;
          this.emit('huntStarted', this.config.selectedHunt);
          this.log('✅ Caçada iniciada via "Encontrar time"!');
          return true;
        } catch (e) {
          this.log(`⚠️ Falha ao clicar no botão team: ${e.message}`);
        }
      }
    }

    this.log('🔍 Tentando botão #hunt-start-team...');
    let teamBtn = document.querySelector('#hunt-start-team');
    if (teamBtn) {
      if (teamBtn.offsetParent === null || teamBtn.hidden) {
        teamBtn.style.display = '';
        teamBtn.style.visibility = '';
        teamBtn.removeAttribute('hidden');
        teamBtn.disabled = false;
      }
      
      if (teamBtn.offsetParent !== null) {
        this.log('✅ Clicando em "Iniciar com o time"');
        teamBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await this.delay(300);
        try {
          teamBtn.click();
          await this.delay(2000);
          this._retryCount = 0;
          this._huntFound = true;
          this.emit('huntStartedTeam', this.config.selectedHunt);
          this.log('✅ Caçada iniciada com o time!');
          return true;
        } catch (e) {
          this.log(`⚠️ Falha ao clicar no botão team: ${e.message}`);
        }
      }
    }

    this.log('❌ Não foi possível iniciar a caçada', 'warn');
    this._huntFound = false;

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
    const indicator = this.findElement(this.selectors.inHuntIndicator);
    if (indicator && indicator.offsetParent !== null) {
      const classes = indicator.className || '';
      if (classes.includes('hud-leave-hunt') || classes.includes('hud-hunt-action')) {
        return true;
      }
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
      this.log('✅ Saiu da caçada');
      this._huntFound = false;
      return true;
    }
    return false;
  }

// modules/hunt.js - Substitua a função loop()

  async loop() {
    if (!this.isRunning()) return;

    try {
      // Se já está em uma caçada, não faz nada
      if (this.isInHunt()) {
        if (this._huntFound) {
          this._huntFound = false;
          this.log('✅ Caçada encontrada, parando busca...');
        }
        await this.delay(2000);
        return;
      }

      // ============================================================
      // 🔧 CORREÇÃO: Se for MEMBRO, NÃO inicia a hunt
      // ============================================================
      if (this.config.partyMode === 'member') {
        this.log('👥 Modo Membro: aguardando líder iniciar a caçada...');
        await this.delay(5000);
        return;
      }

      // Se está na cidade e autoStart está ativo (apenas SOLO ou LÍDER)
      if (this.isInCity() && this.config.autoStart && this.config.selectedHunt) {
        // Modo Líder ou Solo podem iniciar
        if (this.config.partyMode === 'leader' || this.config.partyMode === 'solo') {
          if (this._huntFound) {
            this.log('⏳ Caçada já encontrada, aguardando...');
            await this.delay(5000);
            return;
          }
          
          this.log(`🏙️ [${this.config.partyMode === 'leader' ? 'Líder' : 'Solo'}] Na cidade, retornando para caçada...`);
          const result = await this.startHunt();
          
          if (result) {
            this._huntFound = true;
            this.log('✅ Caçada iniciada, parando busca...');
            await this.delay(2000);
          } else {
            this._huntFound = false;
            this.log('⚠️ Falha ao iniciar, tentando novamente...');
            await this.delay(3000);
          }
        }
      } else {
        this._huntFound = false;
        await this.delay(2000);
      }
    } catch (e) {
      this.log(`Erro no loop: ${e.message}`, 'error');
      await this.delay(2000);
    }
  }

  getHunts() { return this.allHunts; }
  getSelectedHunt() { return this.config.selectedHunt; }
  getSelectedPull() { return this.config.selectedPull; }
  getHuntById(id) { return this.allHunts.find(h => h.id === id); }
  getHuntByName(name) { return this.allHunts.find(h => h.title === name); }

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

  getPartyMode() { return this.config.partyMode; }
}

window.HuntModule = HuntModule;
// modules/party.js
class PartyModule extends HunteraModule {
  constructor() {
    super('Party');
    
    this.config = {
      acceptInvite: true,
      acceptHunt: true,
      acceptCostShare: true,
      followLeader: true,
      autoAcceptDelay: 500
    };

    this.selectors = {
      inviteCard: '.party-invite.invite-card',
      inviteTitle: '.invite-title',
      inviteActions: '.invite-actions',
      inviteBtn: '.invite-actions button'
    };

    this._processedInvites = new Set();
    this._monitoring = false;
    this._loadConfig();
    this.log('Módulo Party inicializado', 'info');
  }

  scanInvites() {
    const invites = [];
    const cards = this.findElements(this.selectors.inviteCard);

    for (const card of cards) {
      if (card.offsetParent === null) continue;

      try {
        const titleEl = card.querySelector(this.selectors.inviteTitle);
        const title = titleEl ? titleEl.textContent.trim() : '';
        const buttons = card.querySelectorAll(this.selectors.inviteBtn);
        const inviteId = `${title}_${Date.now()}`;

        invites.push({
          element: card,
          title: title,
          buttons: buttons,
          id: inviteId
        });
      } catch (e) {
        console.debug('Erro ao processar convite:', e);
      }
    }

    if (invites.length) {
      this.emit('inviteCount', invites.length);
      this.log(`${invites.length} convites encontrados`);
    }

    return invites;
  }

  acceptPartyInvite(invite) {
    this.log(`Aceitando convite de party: ${invite.title}`);
    
    for (const btn of invite.buttons) {
      const text = btn.textContent.toLowerCase();
      if (text.includes('entrar') || text.includes('aceitar')) {
        if (this.safeClick(btn)) {
          this.emit('partyJoined', invite.title);
          return true;
        }
      }
    }
    return false;
  }

  acceptHuntInvite(invite) {
    this.log(`Aceitando convite de caçada: ${invite.title}`);
    
    for (const btn of invite.buttons) {
      const text = btn.textContent.toLowerCase();
      if (text.includes('aceitar') && text.includes('caçada')) {
        if (this.safeClick(btn)) {
          this.emit('huntInviteAccepted', invite.title);
          return true;
        }
      }
    }
    return false;
  }

  acceptHuntCostShare(invite) {
    this.log(`Aceitando rateio: ${invite.title}`);
    
    for (const btn of invite.buttons) {
      const text = btn.textContent.toLowerCase();
      if (text.includes('rateio') || text.includes('compartilhar')) {
        if (this.safeClick(btn)) {
          this.emit('costShareAccepted', invite.title);
          return true;
        }
      }
    }
    return false;
  }

  followPartyLeader(invite) {
    this.log(`Seguindo líder: ${invite.title}`);
    
    for (const btn of invite.buttons) {
      const text = btn.textContent.toLowerCase();
      if (text.includes('seguir')) {
        if (this.safeClick(btn)) {
          this.emit('followingLeader', invite.title);
          return true;
        }
      }
    }
    return false;
  }

  processAllInvites() {
    const invites = this.scanInvites();
    let processed = 0;

    for (const invite of invites) {
      if (this._processedInvites.has(invite.id)) continue;

      if (this.config.acceptInvite && invite.title.toLowerCase().includes('convite')) {
        if (this.acceptPartyInvite(invite)) {
          this._processedInvites.add(invite.id);
          processed++;
          continue;
        }
      }

      if (this.config.acceptHunt && invite.title.toLowerCase().includes('caçada')) {
        if (this.acceptHuntInvite(invite)) {
          this._processedInvites.add(invite.id);
          processed++;
          continue;
        }
      }

      if (this.config.acceptCostShare && invite.title.toLowerCase().includes('rateio')) {
        if (this.acceptHuntCostShare(invite)) {
          this._processedInvites.add(invite.id);
          processed++;
          continue;
        }
      }

      if (this.config.followLeader) {
        if (this.followPartyLeader(invite)) {
          this._processedInvites.add(invite.id);
          processed++;
          continue;
        }
      }
    }

    return processed;
  }

  startMonitoring() {
    if (this._monitoring) return;
    this._monitoring = true;
    this.log('Monitoramento de convites iniciado');
  }

  stopMonitoring() {
    this._monitoring = false;
    this.log('Monitoramento de convites parado');
  }

  clearProcessedInvites() {
    this._processedInvites.clear();
  }

  async loop() {
    if (!this.isRunning()) return;

    if (this._monitoring) {
      this.processAllInvites();
    }

    await this.delay(1500);
  }
}

window.PartyModule = PartyModule;
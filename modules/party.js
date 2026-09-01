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
      inviteMsg: '.invite-msg',
      inviteActions: '.invite-actions',
      inviteBtn: '.invite-actions button',
      inviteRoster: '.invite-roster',
      inviteTimer: '.invite-timer',
      costShareBtn: '.party-costs-offer',
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
        const msgEl = card.querySelector(this.selectors.inviteMsg);
        const title = titleEl ? titleEl.textContent.trim() : '';
        const msg = msgEl ? msgEl.textContent.trim() : '';
        const buttons = card.querySelectorAll(this.selectors.inviteBtn);
        let type = 'unknown';
        const lowerTitle = title.toLowerCase();
        const lowerMsg = msg.toLowerCase();
        if (lowerTitle.includes('party') || lowerMsg.includes('convidou você para a party')) {
          type = 'party';
        } else if (lowerTitle.includes('rateio') || lowerMsg.includes('dividir os custos')) {
          type = 'cost_share';
        } else if (lowerTitle.includes('seguir') || lowerMsg.includes('seguir o líder')) {
          type = 'follow_leader';
        } else if (lowerTitle.includes('caçada') || lowerMsg.includes('convite para caçada')) {
          type = 'hunt';
        }
        const inviteId = `${type}_${Date.now()}_${Math.random()}`;
        invites.push({
          element: card,
          title: title,
          msg: msg,
          type: type,
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
          this.log(`✅ Convite de party aceito!`);
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
      if (text.includes('aceitar')) {
        if (this.safeClick(btn)) {
          this.emit('huntInviteAccepted', invite.title);
          this.log(`✅ Convite de caçada aceito!`);
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
      if (text.includes('aceitar')) {
        if (this.safeClick(btn)) {
          this.emit('costShareAccepted', invite.title);
          this.log(`✅ Rateio aceito!`);
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
          this.log(`✅ Seguindo líder!`);
          return true;
        }
      }
    }
    return false;
  }

  async requestCostShare() {
    this.log('Solicitando rateio de custos...');
    const btn = this.findElement(this.selectors.costShareBtn);
    if (btn && this.safeClick(btn)) {
      await this.delay(500);
      this.log('✅ Rateio solicitado!');
      return true;
    }
    this.log('❌ Não foi possível solicitar rateio', 'warn');
    return false;
  }

  processAllInvites() {
    const invites = this.scanInvites();
    let processed = 0;
    for (const invite of invites) {
      if (this._processedInvites.has(invite.id)) continue;
      let accepted = false;
      switch (invite.type) {
        case 'party':
          if (this.config.acceptInvite) {
            accepted = this.acceptPartyInvite(invite);
          }
          break;
        case 'hunt':
          if (this.config.acceptHunt) {
            accepted = this.acceptHuntInvite(invite);
          }
          break;
        case 'cost_share':
          if (this.config.acceptCostShare) {
            accepted = this.acceptHuntCostShare(invite);
          }
          break;
        case 'follow_leader':
          if (this.config.followLeader) {
            accepted = this.followPartyLeader(invite);
          }
          break;
        default:
          if (this.config.acceptInvite) {
            accepted = this.acceptPartyInvite(invite);
          }
      }
      if (accepted) {
        this._processedInvites.add(invite.id);
        processed++;
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
    this.log('Convites processados limpos');
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
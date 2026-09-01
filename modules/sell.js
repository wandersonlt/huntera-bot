// modules/sell.js - CORRIGIDO
class SellModule extends HunteraModule {
  constructor() {
    super('Sell');
    
    this.config = {
      ignoreEquipped: true,
      autoSellOnCity: true,
      cooldown: 10000,
      blockedItems: JSON.parse(localStorage.getItem('huntera_blockedItems') || '[]')
    };

    this.selectors = {
      sellBtn: '.hud-quick-sell',
      sellWindow: '.quick-sell-window',
      sellRow: '.quick-sell-row',
      sellItem: '.quick-sell-item',
      sellName: '.quick-sell-name, strong, .item-name',
      sellMarked: '.marked',
      sellEquipped: '.equipped',
      sellConfirm: '.quick-sell-confirm',
      sellClose: '.quick-sell-close, .close',
      hasItems: '.has-items'
    };

    this._lastSellTime = 0;
    this._isSelling = false;
    this._loadConfig();
    this.log('Módulo Venda inicializado', 'info');
  }

  async openSellWindow() {
    this.log('Abrindo janela de venda...');
    
    let sellBtn = this.findElement(this.selectors.sellBtn);
    if (!sellBtn) {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent?.includes('VENDA RÁPIDA') || btn.textContent?.includes('Venda')) {
          sellBtn = btn;
          break;
        }
      }
    }

    if (!sellBtn) {
      this.log('Botão de venda não encontrado', 'warn');
      return false;
    }

    if (!sellBtn.classList.contains('has-items')) {
      this.log('Nenhum item para vender');
      return false;
    }

    if (this.safeClick(sellBtn)) {
      await this.delay(800);
      return true;
    }

    return false;
  }

  async closeSellWindow() {
    const closeBtn = this.findElement(this.selectors.sellClose);
    if (closeBtn && this.safeClick(closeBtn)) {
      await this.delay(300);
      return true;
    }

    const closeX = document.querySelector('.quick-sell-window .close, .modal-close, [aria-label="Fechar"]');
    if (closeX && this.safeClick(closeX)) {
      await this.delay(300);
      return true;
    }

    return false;
  }

  getItems() {
    const items = [];
    const rows = this.findElements(this.selectors.sellRow);

    for (const row of rows) {
      if (row.offsetParent === null) continue;

      try {
        const nameEl = row.querySelector(this.selectors.sellName);
        const name = nameEl ? nameEl.textContent.trim() : '';
        const classes = row.className || '';
        
        // ⭐ CORREÇÃO: Verificar se está marcado ou equipado
        const marked = classes.includes('marked');
        const equipped = classes.includes('equipped');

        if (name) {
          items.push({ 
            element: row, 
            name: name, 
            marked: marked, 
            equipped: equipped,
            isBlocked: this.isItemBlocked(name)
          });
        }
      } catch (e) {
        console.debug('Erro ao processar item:', e);
      }
    }

    this.log(`📦 ${items.length} itens encontrados`);
    return items;
  }

  isItemBlocked(itemName) {
    if (!itemName) return false;
    return this.config.blockedItems.some(b => 
      b.toLowerCase() === itemName.toLowerCase()
    );
  }

  markItem(item, mark = true) {
    try {
      const isMarked = item.classList.contains('marked');
      if (mark && !isMarked) {
        this.safeClick(item);
        return true;
      }
      if (!mark && isMarked) {
        this.safeClick(item);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  // ⭐ CORREÇÃO: Lógica invertida - vender itens NÃO bloqueados e NÃO equipados
  async quickSell() {
    if (this._isSelling) {
      this.log('Já está vendendo...', 'warn');
      return false;
    }

    this._isSelling = true;

    try {
      this.log('🔄 Iniciando venda rápida...');

      if (!await this.openSellWindow()) {
        this._isSelling = false;
        return false;
      }

      await this.delay(500);

      const items = this.getItems();
      if (!items.length) {
        this.log('Nenhum item encontrado');
        await this.closeSellWindow();
        this._isSelling = false;
        return true;
      }

      let markedCount = 0;
      let blockedCount = 0;
      let equippedCount = 0;

      for (const item of items) {
        // ⭐ Se for bloqueado → DESMARCAR (não vender)
        if (item.isBlocked) {
          if (item.marked) {
            this.markItem(item.element, false);
            this.log(`🚫 Desmarcando (bloqueado): ${item.name}`);
          }
          blockedCount++;
          continue;
        }

        // ⭐ Se for equipado → DESMARCAR (não vender)
        if (this.config.ignoreEquipped && item.equipped) {
          if (item.marked) {
            this.markItem(item.element, false);
            this.log(`🛡️ Desmarcando (equipado): ${item.name}`);
          }
          equippedCount++;
          continue;
        }

        // ⭐ Se NÃO estiver marcado → MARCAR PARA VENDER
        if (!item.marked) {
          this.markItem(item.element, true);
          markedCount++;
          this.log(`✅ Marcando para vender: ${item.name}`);
          await this.delay(100);
        } else {
          // Já está marcado, manter
          markedCount++;
        }
      }

      this.log(`📊 Resumo: ${markedCount} itens para vender, ${blockedCount} bloqueados, ${equippedCount} equipados`);

      if (markedCount === 0) {
        this.log('Nenhum item para vender');
        await this.closeSellWindow();
        this._isSelling = false;
        return true;
      }

      // Confirma a venda
      let confirmBtn = this.findElement(this.selectors.sellConfirm);
      if (!confirmBtn) {
        const buttons = document.querySelectorAll('.quick-sell-confirm, button');
        for (const btn of buttons) {
          if (btn.textContent?.includes('Confirmar') || btn.textContent?.includes('Vender')) {
            confirmBtn = btn;
            break;
          }
        }
      }

      if (!confirmBtn || confirmBtn.offsetParent === null) {
        this.log('Botão de confirmar não encontrado', 'warn');
        await this.closeSellWindow();
        this._isSelling = false;
        return false;
      }

      this.log('Confirmando venda...');
      if (this.safeClick(confirmBtn)) {
        await this.delay(1500);
        this._lastSellTime = Date.now();
        this.emit('itemsSold', markedCount);
        this.log(`✅ Venda concluída! ${markedCount} itens vendidos`);
      } else {
        this.log('❌ Falha ao confirmar venda', 'warn');
      }

      await this.closeSellWindow();
      this._isSelling = false;
      return true;

    } catch (e) {
      this.log(`❌ Erro na venda: ${e.message}`, 'error');
      this._isSelling = false;
      return false;
    }
  }

  async forceSell() {
    this.log('💪 Forçando venda imediata...');
    return await this.quickSell();
  }

  addBlockedItem(itemName) {
    if (!itemName) return false;
    const normalized = itemName.trim();
    if (!this.config.blockedItems.includes(normalized)) {
      this.config.blockedItems.push(normalized);
      this._saveConfig();
      localStorage.setItem('huntera_blockedItems', JSON.stringify(this.config.blockedItems));
      this.emit('blockedItemsUpdated', this.config.blockedItems);
      this.log(`📦 Item bloqueado: ${normalized}`);
      return true;
    }
    return false;
  }

  removeBlockedItem(itemName) {
    const index = this.config.blockedItems.indexOf(itemName);
    if (index > -1) {
      this.config.blockedItems.splice(index, 1);
      this._saveConfig();
      localStorage.setItem('huntera_blockedItems', JSON.stringify(this.config.blockedItems));
      this.emit('blockedItemsUpdated', this.config.blockedItems);
      this.log(`🗑️ Item desbloqueado: ${itemName}`);
      return true;
    }
    return false;
  }

  updateBlockedItems(items) {
    this.config.blockedItems = [...items];
    this._saveConfig();
    localStorage.setItem('huntera_blockedItems', JSON.stringify(items));
    this.emit('blockedItemsUpdated', items);
    return true;
  }

  getBlockedItems() {
    return this.config.blockedItems || [];
  }

  async loop() {
    if (!this.isRunning()) return;

    const now = Date.now();
    if (now - this._lastSellTime < this.config.cooldown) return;

    if (this.config.autoSellOnCity) {
      const huntModule = window.huntModule;
      if (huntModule && huntModule.isInCity()) {
        this.log('🏙️ Na cidade, verificando itens para vender...');
        await this.quickSell();
      }
    }
  }
}

window.SellModule = SellModule;
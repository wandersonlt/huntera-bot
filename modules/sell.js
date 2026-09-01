// modules/sell.js
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
      sellList: '.quick-sell-list',
      sellRow: '.quick-sell-row',
      sellName: 'strong',
      sellCount: '.quick-sell-count',
      sellValue: '.quick-sell-value',
      sellMarked: '.marked',
      sellEquipped: '.equipped',
      sellConfirm: '.quick-sell-confirm',
      sellCancel: '.quick-sell-cancel',
      sellTotal: '.quick-sell-total',
      hasItems: '.has-items'
    };

    this._lastSellTime = 0;
    this._isSelling = false;
    this._loadConfig();
    this.log('Módulo Venda inicializado', 'info');
  }

  // ============================================================
  // ABRIR JANELA DE VENDA
  // ============================================================
  async openSellWindow() {
    this.log('Abrindo janela de venda...');
    
    let sellBtn = this.findElement(this.selectors.sellBtn);
    if (!sellBtn) {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        if (btn.textContent?.includes('VENDA RÁPIDA') || btn.textContent?.includes('Venda rápida')) {
          sellBtn = btn;
          break;
        }
      }
    }

    if (!sellBtn) {
      this.log('Botão de venda não encontrado', 'warn');
      return false;
    }

    // Verifica se tem itens
    if (!sellBtn.classList.contains('has-items')) {
      this.log('Nenhum item para vender');
      return false;
    }

    if (this.safeClick(sellBtn)) {
      await this.delay(800);
      this.log('✅ Janela de venda aberta');
      return true;
    }

    return false;
  }

  // ============================================================
  // FECHAR JANELA DE VENDA
  // ============================================================
  async closeSellWindow() {
    this.log('Fechando janela de venda...');
    
    // Tenta fechar pelo botão Cancelar
    const cancelBtn = this.findElement(this.selectors.sellCancel);
    if (cancelBtn && cancelBtn.offsetParent !== null) {
      if (this.safeClick(cancelBtn)) {
        await this.delay(300);
        return true;
      }
    }

    // Tenta fechar pelo X
    const closeBtns = document.querySelectorAll('.quick-sell-close, .close, [aria-label="Fechar"]');
    for (const btn of closeBtns) {
      if (btn.offsetParent !== null) {
        if (this.safeClick(btn)) {
          await this.delay(300);
          return true;
        }
      }
    }

    return false;
  }

  // ============================================================
  // OBTER ITENS DA JANELA
  // ============================================================
  getItems() {
    const items = [];
    const rows = this.findElements(this.selectors.sellRow);

    for (const row of rows) {
      if (row.offsetParent === null) continue;

      try {
        const nameEl = row.querySelector(this.selectors.sellName);
        const name = nameEl ? nameEl.textContent.trim() : '';
        const classes = row.className || '';
        
        // Verifica se está marcado (para venda)
        const marked = classes.includes('marked');
        // Verifica se está equipado
        const equipped = classes.includes('equipped');
        // Pega o ID do item
        const itemId = row.getAttribute('data-item-id') || '';

        if (name) {
          items.push({ 
            element: row, 
            name: name, 
            marked: marked, 
            equipped: equipped,
            itemId: itemId,
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

  // ============================================================
  // VERIFICAR SE ITEM ESTÁ BLOQUEADO
  // ============================================================
  isItemBlocked(itemName) {
    if (!itemName) return false;
    return this.config.blockedItems.some(b => 
      b.toLowerCase() === itemName.toLowerCase()
    );
  }

  // ============================================================
  // MARCAR/DESMARCAR ITEM
  // ============================================================
  markItem(item, mark = true) {
    try {
      const isMarked = item.classList.contains('marked');
      if (mark && !isMarked) {
        this.safeClick(item);
        this.log(`✅ Marcado para venda: ${item.textContent?.trim() || 'item'}`);
        return true;
      }
      if (!mark && isMarked) {
        this.safeClick(item);
        this.log(`⛔ Desmarcado (não será vendido): ${item.textContent?.trim() || 'item'}`);
        return true;
      }
      return false;
    } catch (e) {
      this.log(`Erro ao marcar item: ${e.message}`, 'warn');
      return false;
    }
  }

  // ============================================================
  // VENDA RÁPIDA (LÓGICA CORRETA)
  // ============================================================
  async quickSell() {
    if (this._isSelling) {
      this.log('Já está vendendo...', 'warn');
      return false;
    }

    this._isSelling = true;

    try {
      this.log('🔄 Iniciando venda rápida...');

      // Abre a janela
      if (!await this.openSellWindow()) {
        this._isSelling = false;
        return false;
      }

      await this.delay(500);

      // Obtém os itens
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

      // ============================================================
      // LÓGICA DE MARCAÇÃO:
      // - Itens BLOQUEADOS → DESMARCAR (não vender)
      // - Itens EQUIPADOS → DESMARCAR (não vender)
      // - Itens NÃO bloqueados e NÃO equipados → MARCAR (vender)
      // ============================================================
      
      for (const item of items) {
        // Se for bloqueado → DESMARCAR
        if (this.isItemBlocked(item.name)) {
          if (item.marked) {
            this.markItem(item.element, false);
          }
          blockedCount++;
          continue;
        }

        // Se for equipado → DESMARCAR
        if (this.config.ignoreEquipped && item.equipped) {
          if (item.marked) {
            this.markItem(item.element, false);
          }
          equippedCount++;
          continue;
        }

        // Se NÃO estiver marcado → MARCAR (vender)
        if (!item.marked) {
          this.markItem(item.element, true);
          markedCount++;
          await this.delay(100);
        } else {
          // Já está marcado, manter
          markedCount++;
        }
      }

      this.log(`📊 Resumo: ${markedCount} para vender, ${blockedCount} bloqueados, ${equippedCount} equipados`);

      // Se não tem itens para vender
      if (markedCount === 0) {
        this.log('Nenhum item para vender');
        await this.closeSellWindow();
        this._isSelling = false;
        return true;
      }

      // Procura botão de confirmar
      let confirmBtn = this.findElement(this.selectors.sellConfirm);
      if (!confirmBtn) {
        const buttons = document.querySelectorAll('.quick-sell-confirm, button');
        for (const btn of buttons) {
          if (btn.textContent?.includes('Vender') || btn.textContent?.includes('Confirmar')) {
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

      // Confirma a venda
      this.log(`💰 Confirmando venda de ${markedCount} itens...`);
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

  // ============================================================
  // FORÇAR VENDA
  // ============================================================
  async forceSell() {
    this.log('💪 Forçando venda imediata...');
    return await this.quickSell();
  }

  // ============================================================
  // GERENCIAR ITENS BLOQUEADOS
  // ============================================================
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

  // ============================================================
  // LOOP PRINCIPAL
  // ============================================================
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
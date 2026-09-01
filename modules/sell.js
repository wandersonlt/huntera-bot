// modules/sell.js
class SellModule extends HunteraModule {
  constructor() {
    super('Sell');
    
    this.config = {
      ignoreEquipped: true,
      autoSellOnCity: true,
      autoSellInHunt: false,
      capThreshold: 0.85,
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
  // FUNÇÕES DE CAPACIDADE
  // ============================================================
  getCapacity() {
    try {
      const capEl = document.querySelector('.inventory-capacity');
      if (!capEl) {
        this.log('⚠️ Elemento de capacidade não encontrado', 'warn');
        return null;
      }
      
      const strongEl = capEl.querySelector('strong');
      if (strongEl) {
        const text = strongEl.textContent || '';
        const match = text.match(/([\d.]+)\s*oz/);
        if (match) {
          const value = parseFloat(match[1]);
          this.log(`📊 Capacidade atual: ${value} oz`);
          return value;
        }
      }
      
      const text = capEl.textContent || '';
      const match = text.match(/([\d.]+)\s*oz/);
      if (match) {
        const value = parseFloat(match[1]);
        this.log(`📊 Capacidade atual: ${value} oz`);
        return value;
      }
      
      return null;
    } catch (e) {
      this.log(`⚠️ Erro ao ler capacidade: ${e.message}`, 'warn');
      return null;
    }
  }

  getMaxCapacity() {
    try {
      const capEl = document.querySelector('.inventory-capacity');
      if (!capEl) return null;
      
      const strongEl = capEl.querySelector('strong');
      if (strongEl) {
        const title = strongEl.getAttribute('title') || '';
        const match = title.match(/de\s+([\d.]+)\s*oz/);
        if (match) {
          const value = parseFloat(match[1]);
          this.log(`📊 Capacidade máxima: ${value} oz`);
          return value;
        }
      }
      
      return null;
    } catch (e) {
      this.log(`⚠️ Erro ao ler capacidade máxima: ${e.message}`, 'warn');
      return null;
    }
  }

  isCapacityFull(threshold = null) {
    const t = threshold || this.config.capThreshold || 0.85;
    const current = this.getCapacity();
    const max = this.getMaxCapacity();
    
    if (current === null || max === null || max === 0) {
      return false;
    }
    
    const ratio = current / max;
    this.log(`📊 Cap: ${current.toFixed(2)} / ${max.toFixed(2)} oz (${(ratio * 100).toFixed(1)}%)`);
    return ratio >= t;
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
      this.log('❌ Botão de venda não encontrado', 'warn');
      return false;
    }

    if (!sellBtn.classList.contains('has-items')) {
      this.log('📭 Nenhum item para vender');
      return false;
    }

    if (sellBtn.offsetParent === null) {
      this.log('⚠️ Botão não está visível, forçando...');
      sellBtn.style.display = '';
      sellBtn.style.visibility = '';
      sellBtn.style.opacity = '';
      sellBtn.removeAttribute('hidden');
      sellBtn.removeAttribute('aria-hidden');
      
      let parent = sellBtn.parentElement;
      while (parent && parent !== document.body) {
        if (parent.offsetParent === null || parent.hidden) {
          parent.style.display = '';
          parent.style.visibility = '';
          parent.style.opacity = '';
          parent.removeAttribute('hidden');
        }
        parent = parent.parentElement;
      }
    }

    sellBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
    await this.delay(300);

    try {
      sellBtn.click();
      this.log('✅ Clique no botão de venda executado!');
      await this.delay(800);
      
      const windowEl = this.findElement(this.selectors.sellWindow);
      if (windowEl && windowEl.offsetParent !== null) {
        this.log('✅ Janela de venda aberta com sucesso!');
        return true;
      }
      
      if (windowEl) {
        this.log('⚠️ Janela existe mas não está visível, forçando...');
        windowEl.style.display = '';
        windowEl.style.visibility = '';
        windowEl.style.opacity = '';
        windowEl.removeAttribute('hidden');
        return true;
      }
      
      return true;
    } catch (e) {
      this.log(`⚠️ Falha ao clicar no botão de venda: ${e.message}`);
      return false;
    }
  }

  async closeSellWindow() {
    this.log('Fechando janela de venda...');
    
    const cancelBtn = this.findElement(this.selectors.sellCancel);
    if (cancelBtn && cancelBtn.offsetParent !== null) {
      if (this.safeClick(cancelBtn)) {
        await this.delay(300);
        return true;
      }
    }
    
    const closeBtns = document.querySelectorAll('.quick-sell-close, .close, [aria-label="Fechar"]');
    for (const btn of closeBtns) {
      if (btn.offsetParent !== null) {
        if (this.safeClick(btn)) {
          await this.delay(300);
          return true;
        }
      }
    }
    
    const windowEl = this.findElement(this.selectors.sellWindow);
    if (windowEl) {
      windowEl.style.display = 'none';
      windowEl.style.visibility = 'hidden';
      windowEl.setAttribute('hidden', 'true');
      this.log('✅ Janela de venda forçada a fechar');
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
        const marked = classes.includes('marked');
        const equipped = classes.includes('equipped');
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

  async quickSell() {
    if (this._isSelling) {
      this.log('Já está vendendo...', 'warn');
      return false;
    }
    
    this._isSelling = true;
    try {
      this.log('🔄 Iniciando venda rápida...');
      
      // Verificar cap
      const isFull = this.isCapacityFull();
      if (!isFull) {
        this.log('📊 Cap ainda não está cheio, aguardando...');
        this._isSelling = false;
        return false;
      }
      
      this.log('💼 Cap cheio, iniciando venda...');
      
      if (!await this.openSellWindow()) {
        this.log('❌ Não foi possível abrir a janela de venda', 'warn');
        this._isSelling = false;
        return false;
      }
      
      await this.delay(500);
      const items = this.getItems();
      
      if (!items.length) {
        this.log('📭 Nenhum item encontrado');
        await this.closeSellWindow();
        this._isSelling = false;
        return true;
      }
      
      let markedCount = 0;
      let blockedCount = 0;
      let equippedCount = 0;
      
      for (const item of items) {
        if (this.isItemBlocked(item.name)) {
          if (item.marked) this.markItem(item.element, false);
          blockedCount++;
          continue;
        }
        if (this.config.ignoreEquipped && item.equipped) {
          if (item.marked) this.markItem(item.element, false);
          equippedCount++;
          continue;
        }
        if (!item.marked) {
          this.markItem(item.element, true);
          markedCount++;
          await this.delay(100);
        } else {
          markedCount++;
        }
      }
      
      this.log(`📊 Resumo: ${markedCount} para vender, ${blockedCount} bloqueados, ${equippedCount} equipados`);
      
      if (markedCount === 0) {
        this.log('📭 Nenhum item para vender');
        await this.closeSellWindow();
        this._isSelling = false;
        return true;
      }
      
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
        this.log('❌ Botão de confirmar não encontrado', 'warn');
        await this.closeSellWindow();
        this._isSelling = false;
        return false;
      }
      
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

  async forceSell() {
    this.log('💪 Forçando venda imediata...');
    this._isSelling = false; // Reset para permitir venda forçada
    const result = await this.quickSell();
    return result;
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

    const huntModule = window.huntModule;
    const isInHunt = huntModule ? huntModule.isInHunt() : false;
    const isInCity = huntModule ? huntModule.isInCity() : true;

    const isFull = this.isCapacityFull();

    if (isFull) {
      this.log('💼 Cap está cheio!');
      
      if (isInCity) {
        this.log('🏙️ Na cidade, vendendo itens...');
        await this.quickSell();
        return;
      }
      
      if (isInHunt && this.config.autoSellInHunt) {
        this.log('🏹 Dentro da hunt, vendendo itens...');
        await this.quickSell();
        return;
      }
      
      if (isInHunt && !this.config.autoSellInHunt) {
        this.log('⚠️ Cap cheio na hunt, mas venda dentro da hunt está desativada');
        this.emit('capacityFull', { 
          current: this.getCapacity(), 
          max: this.getMaxCapacity() 
        });
      }
    } else {
      if (this.config.autoSellOnCity && isInCity) {
        this.log('🏙️ Na cidade, verificando itens para vender...');
        await this.quickSell();
      }
    }
  }
}

window.SellModule = SellModule;
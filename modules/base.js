// modules/base.js
class HunteraModule {
  constructor(name) {
    this.name = name;
    this._isRunning = false;
    this._isActive = true;
    this._events = {};
    this._lastRun = 0;
    this._cooldown = 1000;
    console.log(`🔧 Módulo ${name} criado`);
  }

  init() {
    console.log(`📦 Inicializando ${this.name}...`);
    this._loadConfig();
    return true;
  }

  start() {
    this._isRunning = true;
    console.log(`▶️ ${this.name} iniciado`);
  }

  stop() {
    this._isRunning = false;
    console.log(`⏹️ ${this.name} parado`);
  }

  loop() {
    throw new Error('loop() deve ser implementado');
  }

  isRunning() { return this._isRunning; }
  isActive() { return this._isActive; }

  updateConfig(config) {
    Object.assign(this.config, config);
    this._saveConfig();
    return true;
  }

  getConfig() { return this.config; }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  safeClick(element) {
    if (!element) return false;
    try {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      element.click();
      return true;
    } catch (e) {
      console.warn(`⚠️ Erro ao clicar: ${e.message}`);
      return false;
    }
  }

  findElement(selector) {
    return document.querySelector(selector);
  }

  findElements(selector) {
    return document.querySelectorAll(selector);
  }

  isElementVisible(selector) {
    const el = this.findElement(selector);
    return el && el.offsetParent !== null;
  }

  waitForElement(selector, timeout = 5000) {
    return new Promise((resolve) => {
      const start = Date.now();
      const check = () => {
        const el = this.findElement(selector);
        if (el) {
          resolve(el);
          return;
        }
        if (Date.now() - start > timeout) {
          resolve(null);
          return;
        }
        setTimeout(check, 100);
      };
      check();
    });
  }

  on(event, callback) {
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(callback);
  }

  emit(event, ...args) {
    if (this._events[event]) {
      this._events[event].forEach(cb => {
        try { cb(...args); } catch (e) { console.error(e); }
      });
    }
  }

  _loadConfig() {
    try {
      const key = `huntera_${this.name.toLowerCase()}_config`;
      const saved = localStorage.getItem(key);
      if (saved) {
        this.config = { ...this.config, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn(`⚠️ Erro ao carregar config de ${this.name}:`, e);
    }
  }

  _saveConfig() {
    try {
      const key = `huntera_${this.name.toLowerCase()}_config`;
      localStorage.setItem(key, JSON.stringify(this.config));
    } catch (e) {
      console.warn(`⚠️ Erro ao salvar config de ${this.name}:`, e);
    }
  }

  log(message, type = 'info') {
    const prefix = `[${this.name}]`;
    const styles = {
      info: 'color: #3fb950',
      warn: 'color: #d29922',
      error: 'color: #f85149'
    };
    console.log(`%c${prefix} ${message}`, styles[type] || styles.info);
  }
}

window.HunteraModule = HunteraModule;
// popup/popup.js
document.addEventListener('DOMContentLoaded', () => {
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const startBtn = document.getElementById('startBtn');
  const dashboardBtn = document.getElementById('dashboardBtn');
  const errorMsg = document.getElementById('errorMsg');

  console.log('🔵 Popup carregado!');

  // ============================================================
  // FUNÇÃO PARA ATUALIZAR STATUS
  // ============================================================
  function updateStatus() {
    chrome.runtime.sendMessage({ action: 'getStatus' }, (response) => {
      console.log('📊 Status recebido:', response);
      if (response) {
        const isRunning = response.isRunning;
        statusDot.className = `status-dot ${isRunning ? 'online' : 'offline'}`;
        statusText.textContent = isRunning ? 'Online' : 'Offline';
        startBtn.textContent = isRunning ? '⏹️ Parar Bot' : '▶️ Iniciar Bot';
        startBtn.className = `btn ${isRunning ? 'btn-danger' : 'btn-primary'}`;
      }
    });
  }

  // ============================================================
  // INICIAR/PARAR BOT
  // ============================================================
  startBtn.addEventListener('click', () => {
    console.log('🔘 Botão Start/Stop clicado');
    chrome.runtime.sendMessage({ action: 'getStatus' }, (response) => {
      if (response) {
        const action = response.isRunning ? 'stopBot' : 'startBot';
        console.log(`📤 Enviando ação: ${action}`);
        chrome.runtime.sendMessage({ action }, () => {
          updateStatus();
        });
      }
    });
  });

  // ============================================================
  // ABRIR DASHBOARD COMO POPUP - MÚLTIPLAS TENTATIVAS
  // ============================================================
  dashboardBtn.addEventListener('click', () => {
    console.log('🔘 Botão Configuração clicado!');
    
    if (errorMsg) errorMsg.style.display = 'none';
    
    dashboardBtn.textContent = '⏳ Abrindo...';
    dashboardBtn.disabled = true;

    // Tentativa 1: Abrir via background
    chrome.runtime.sendMessage({ action: 'openDashboardPopup' }, (response) => {
      console.log('📨 Resposta do background:', response);
      
      if (response && response.success) {
        // Fecha o popup atual
        setTimeout(() => {
          window.close();
        }, 300);
        return;
      }

      // Tentativa 2: Abrir diretamente com chrome.windows.create
      console.log('🔄 Tentando abrir diretamente...');
      chrome.windows.create({
        url: chrome.runtime.getURL('dashboard/dashboard.html'),
        type: 'popup',
        width: 500,
        height: 650,
        focused: true
      }, (newWindow) => {
        dashboardBtn.textContent = '⚙️ Abrir Configuração';
        dashboardBtn.disabled = false;
        
        if (newWindow) {
          console.log('✅ Dashboard aberto como popup!');
          setTimeout(() => {
            window.close();
          }, 300);
        } else {
          // Tentativa 3: Abrir em nova aba (fallback)
          console.log('🔄 Fallback: abrindo em nova aba...');
          chrome.tabs.create({
            url: chrome.runtime.getURL('dashboard/dashboard.html'),
            active: true
          }, () => {
            console.log('✅ Dashboard aberto em nova aba!');
            window.close();
          });
        }
      });
    });
  });

  // ============================================================
  // ATUALIZA STATUS A CADA 3 SEGUNDOS
  // ============================================================
  updateStatus();
  setInterval(updateStatus, 3000);
});
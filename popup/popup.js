// popup/popup.js
document.addEventListener('DOMContentLoaded', () => {
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const startBtn = document.getElementById('startBtn');
  const dashboardBtn = document.getElementById('dashboardBtn');

  console.log('🔵 Popup carregado!');

  function updateStatus() {
    chrome.runtime.sendMessage({ action: 'getStatus' }, (response) => {
      if (response) {
        const isRunning = response.isRunning;
        statusDot.className = `status-dot ${isRunning ? 'online' : 'offline'}`;
        statusText.textContent = isRunning ? 'Online' : 'Offline';
        startBtn.textContent = isRunning ? '⏹️ Parar Bot' : '▶️ Iniciar Bot';
        startBtn.className = `btn ${isRunning ? 'btn-danger' : 'btn-primary'}`;
      }
    });
  }

  // Iniciar/Parar Bot
  startBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'getStatus' }, (response) => {
      if (response) {
        const action = response.isRunning ? 'stopBot' : 'startBot';
        chrome.runtime.sendMessage({ action }, () => {
          updateStatus();
        });
      }
    });
  });

  // ============ ABRIR DASHBOARD ============
  dashboardBtn.addEventListener('click', () => {
    console.log('🔘 Abrindo configuração...');
    
    chrome.runtime.sendMessage({ action: 'openDashboardPopup' }, (response) => {
      console.log('📨 Resposta:', response);
      if (response && response.success) {
        // Fecha o popup atual
        setTimeout(() => window.close(), 300);
      }
    });
  });

  // Atualiza status
  updateStatus();
  setInterval(updateStatus, 3000);
});
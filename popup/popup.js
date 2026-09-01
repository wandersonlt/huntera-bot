// popup/popup.js
document.addEventListener('DOMContentLoaded', () => {
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const startBtn = document.getElementById('startBtn');
  const dashboardBtn = document.getElementById('dashboardBtn');
  const errorMsg = document.getElementById('errorMsg');

  console.log('🔵 Popup carregado!');

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

  dashboardBtn.addEventListener('click', () => {
    console.log('🔘 Botão Configuração clicado!');
    
    if (errorMsg) errorMsg.style.display = 'none';
    
    dashboardBtn.textContent = '⏳ Abrindo...';
    dashboardBtn.disabled = true;
    
    chrome.runtime.sendMessage({ action: 'openDashboardPopup' }, (response) => {
      console.log('📨 Resposta do background:', response);
      
      dashboardBtn.textContent = '⚙️ Abrir Configuração';
      dashboardBtn.disabled = false;
      
      if (response && response.success) {
        setTimeout(() => {
          window.close();
        }, 300);
      } else {
        if (errorMsg) {
          errorMsg.style.display = 'block';
          errorMsg.textContent = '❌ Erro ao abrir! Clique novamente.';
        }
        setTimeout(() => {
          if (errorMsg) errorMsg.style.display = 'none';
        }, 3000);
      }
    });
  });

  updateStatus();
  setInterval(updateStatus, 3000);
});
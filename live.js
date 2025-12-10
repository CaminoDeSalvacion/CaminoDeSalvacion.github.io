// live.js
const Live = (() => {
  const workerURL = 'https://youtube-live-proxy.iglesia-4e5.workers.dev';
  const inicioTab = document.querySelector('.navbar a[href="/"]');

  // Apply pulsing glow effect (red)
  const applyGlow = () => {
    inicioTab.classList.add('live');
  };

  // Remove glow
  const removeGlow = () => {
    inicioTab.classList.remove('live');
  };

  // Update glow based on worker data
  const updateTabGlow = async (forceLive = false) => {
    try {
      const res = await fetch(workerURL);
      const data = await res.json();

      // Force live mode for testing if desired
      const isLive = forceLive || data.isLive;

      if (isLive) applyGlow();
      else removeGlow();
    } catch (err) {
      console.error('Live worker fetch error:', err);
      // Optionally glow for testing even if worker fails
      if (forceLive) applyGlow();
      else removeGlow();
    }
  };

  // Automatically add CSS for pulsing animation if not already present
  const addGlowStyle = () => {
    if (!document.getElementById('live-glow-style')) {
      const style = document.createElement('style');
      style.id = 'live-glow-style';
      style.innerHTML = `
        @keyframes pulse-red {
          0% { box-shadow: 0 0 5px red, 0 0 10px red; }
          50% { box-shadow: 0 0 20px red, 0 0 40px red; }
          100% { box-shadow: 0 0 5px red, 0 0 10px red; }
        }
        .navbar a.live {
          background: red !important;
          color: white !important;
          font-weight: bold;
          animation: pulse-red 1.5s infinite;
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Initialize
  const init = (forceLive = false) => {
    if (!inicioTab) return;
    addGlowStyle();
    updateTabGlow(forceLive);
  };

  return { init, updateTabGlow };
})();

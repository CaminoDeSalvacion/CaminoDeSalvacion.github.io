// live.js
const Live = (() => {
  const workerURL = 'https://youtube-live-proxy.iglesia-4e5.workers.dev';
  const inicioTab = document.querySelector('.navbar a[href="/"]');

  // Apply pulsing glow effect
  const applyGlow = () => {
    if (inicioTab) inicioTab.classList.add('live');
  };

  // Remove glow
  const removeGlow = () => {
    if (inicioTab) inicioTab.classList.remove('live');
  };

  // Fetch worker and update glow
  const updateTabGlow = async () => {
    try {
      const res = await fetch(workerURL);
      const data = await res.json();
      if (data.isLive) applyGlow();
      else removeGlow();
    } catch (err) {
      console.error('Live worker fetch error:', err);
      removeGlow();
    }
  };

  // Add CSS for pulsing animation (once)
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

  // Initialize live glow (dynamic)
  const init = () => {
    if (!inicioTab) return;
    addGlowStyle();
    updateTabGlow();
    // Optional: check every 30s for live status updates
    setInterval(updateTabGlow, 30000);
  };

  return { init, updateTabGlow };
})();

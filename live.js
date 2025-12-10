// live.js
const Live = (() => {
  // const workerURL = 'https://youtube-live-proxy.iglesia-4e5.workers.dev';
  // Find Inicio tab by text content
  const inicioTab = [...document.querySelectorAll('.navbar a')]
    .find(a => a.textContent.trim() === 'Inicio');

  const applyGlow = () => {
    if (inicioTab) inicioTab.classList.add('live');
  };

  const removeGlow = () => {
    if (inicioTab) inicioTab.classList.remove('live');
  };

  const updateTabGlow = async (forceLive = false) => {
    try {
      // Only fetch worker if not forcing live
      let isLive = forceLive;
      if (!forceLive) {
        const res = await fetch('https://youtube-live-proxy.iglesia-4e5.workers.dev');
        const data = await res.json();
        isLive = data.isLive;
      }

      if (isLive) applyGlow();
      else removeGlow();
    } catch (err) {
      console.error('Live worker fetch error:', err);
      if (forceLive) applyGlow();
      else removeGlow();
    }
  };

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

  const init = (forceLive = false) => {
    addGlowStyle();
    updateTabGlow(forceLive);
  };

  return { init, updateTabGlow };
})();

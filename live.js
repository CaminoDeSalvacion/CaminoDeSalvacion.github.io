// live.js — centralized live status for all pages
const workerURL = 'https://youtube-live-proxy.iglesia-4e5.workers.dev';

/**
 * Fetch live video status from worker and update glow effect on Inicio tab
 */
async function updateLiveStatus(forceLive = false) {
  const inicioTab = document.querySelector('.navbar a[href="/"]');
  if (!inicioTab) return;

  try {
    let isLive = false;

    if (forceLive) {
      // For testing purposes — glow red even if not live
      isLive = true;
    } else {
      const res = await fetch(workerURL);
      const data = await res.json();
      if (data && data.isLive) {
        isLive = true;
      }
    }

    if (isLive) {
      inicioTab.classList.add('live');
    } else {
      inicioTab.classList.remove('live');
    }

    return isLive;
  } catch (err) {
    console.error('Error fetching live status:', err);
    inicioTab.classList.remove('live');
    return false;
  }
}

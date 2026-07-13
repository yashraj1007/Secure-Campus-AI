/**
 * Secure Campus AI - Utility Functions
 */
const Utils = {
  formatTime(date = new Date()) {
    return date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  },

  formatDate(date = new Date()) {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  },

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  animateCounter(el, target, duration = 1500) {
    if (!el) return;
    const start = 0;
    const startTime = performance.now();
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(start + (target - start) * eased).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  },

  initSidebar() {
    const toggle = document.querySelector('.mobile-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
      document.addEventListener('click', (e) => {
        if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
          sidebar.classList.remove('open');
        }
      });
    }

    const currentPath = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-item').forEach(item => {
      const href = item.getAttribute('href');
      if (href && href.includes(currentPath)) {
        item.classList.add('active');
      }
    });
  },

  getRiskColor(score) {
    if (score < 30) return { color: '#00FF99', label: 'Safe', class: 'safe' };
    if (score < 60) return { color: '#FFA500', label: 'Suspicious', class: 'suspicious' };
    return { color: '#FF4D4D', label: 'Dangerous', class: 'dangerous' };
  },

  updateGauge(gaugeEl, score) {
    const fill = gaugeEl?.querySelector('.risk-gauge__fill');
    const number = gaugeEl?.querySelector('.risk-gauge__number');
    const label = gaugeEl?.querySelector('.risk-gauge__label');
    if (!fill || !number) return;

    const offset = 283 - (283 * score / 100);
    const risk = this.getRiskColor(score);
    fill.style.strokeDashoffset = offset;
    fill.style.stroke = risk.color;
    number.textContent = score;
    number.style.color = risk.color;
    if (label) label.textContent = risk.label;
  },

  initCounters() {
    document.querySelectorAll('[data-counter]').forEach(el => {
      const target = parseInt(el.dataset.counter, 10);
      Utils.animateCounter(el, target);
    });
  },

  initLiveCounters() {
    document.querySelectorAll('[data-live-counter]').forEach(el => {
      const base = parseInt(el.dataset.liveCounter, 10);
      el.textContent = base.toLocaleString();
    });
  },

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

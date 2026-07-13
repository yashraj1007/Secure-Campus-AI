/**
 * SOC Live Feed Generator
 */
const LiveFeed = {
  events: [
    { level: 'crit', msg: 'Brute force attack detected on admin portal — 847 attempts blocked' },
    { level: 'warn', msg: 'Phishing email campaign targeting faculty accounts identified' },
    { level: 'info', msg: 'Threat intelligence feed updated — 1,247 new IOCs ingested' },
    { level: 'ok', msg: 'Automated patch deployment completed on 342 endpoints' },
    { level: 'crit', msg: 'Ransomware signature detected and quarantined on LAB-204' },
    { level: 'warn', msg: 'Unusual outbound traffic from 192.168.45.112 flagged for review' },
    { level: 'info', msg: 'SOC analyst Sarah Mitchell assigned to incident INC-2026-0847' },
    { level: 'ok', msg: 'MFA enrollment rate reached 94% across campus' },
    { level: 'crit', msg: 'Credential stuffing attack mitigated — 23 accounts protected' },
    { level: 'warn', msg: 'New CVE-2026-4892 vulnerability scan initiated' },
    { level: 'info', msg: 'Security awareness training completion: 78% campus-wide' },
    { level: 'ok', msg: 'Firewall rule update deployed — 15 malicious IPs blocked' }
  ],

  levelLabels: { crit: 'CRIT', warn: 'WARN', info: 'INFO', ok: 'OK' },

  init(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const lines = [...this.events, ...this.events].map((e, i) => {
      const time = new Date(Date.now() - i * 45000);
      return `
        <div class="live-feed__line">
          <span class="live-feed__timestamp">${Utils.formatTime(time)}</span>
          <span class="live-feed__level live-feed__level--${e.level === 'crit' ? 'crit' : e.level === 'warn' ? 'warn' : e.level === 'ok' ? 'ok' : 'info'}">${this.levelLabels[e.level]}</span>
          <span>${e.msg}</span>
        </div>
      `;
    }).join('');

    container.innerHTML = `<div class="live-feed__inner">${lines}</div>`;
  },

  updateCounters() {
    const counters = document.querySelectorAll('[data-live-counter]');
    counters.forEach(el => {
      const base = parseInt(el.dataset.liveCounter, 10);
      const variance = Utils.randomInt(-3, 5);
      el.textContent = Math.max(0, base + variance).toLocaleString();
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  LiveFeed.init('soc-live-feed');
  LiveFeed.init('soc-live-feed-secondary');
  setInterval(() => LiveFeed.updateCounters(), 4000);
});

/**
 * Threat Intelligence Map Module
 */
const ThreatMap = {
  markers: [
    { type: 'phishing', x: 22, y: 35, label: 'Phishing Campaign — Dorm Block A', severity: 'warning' },
    { type: 'malware', x: 45, y: 28, label: 'Malware Detected — Lab 204', severity: 'critical' },
    { type: 'login', x: 68, y: 42, label: 'Brute Force — Admin Portal', severity: 'medium' },
    { type: 'credential', x: 35, y: 55, label: 'Credential Theft — Library WiFi', severity: 'critical' },
    { type: 'phishing', x: 78, y: 62, label: 'Phishing — Student Email', severity: 'warning' },
    { type: 'login', x: 55, y: 72, label: 'Suspicious Login — VPN Gateway', severity: 'medium' },
    { type: 'malware', x: 15, y: 68, label: 'Ransomware Attempt — Blocked', severity: 'critical' },
    { type: 'phishing', x: 88, y: 30, label: 'Spear Phishing — Faculty', severity: 'warning' },
    { type: 'login', x: 42, y: 18, label: 'Failed Auth — 47 attempts', severity: 'medium' },
    { type: 'credential', x: 62, y: 48, label: 'Session Hijack — Prevented', severity: 'critical' }
  ],

  typeColors: {
    phishing: '#FFA500',
    malware: '#FF4D4D',
    login: '#FFD700',
    credential: '#FF4D4D'
  },

  init() {
    const container = document.getElementById('threat-map');
    if (!container) return;

    this.renderMap(container);
    this.startLiveUpdates();
  },

  renderMap(container) {
    container.innerHTML = `
      <div class="threat-map__grid"></div>
      <div class="threat-map__radar"></div>
      <svg class="threat-map__canvas" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="campusGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="rgba(0,191,255,0.08)"/>
            <stop offset="100%" stop-color="transparent"/>
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill="url(#campusGlow)"/>
        ${this.drawCampusOutline()}
        ${this.drawConnections()}
      </svg>
      ${this.markers.map((m, i) => `
        <div class="threat-marker threat-marker--${m.type}" style="left:${m.x}%;top:${m.y}%;background:${this.typeColors[m.type]};color:${this.typeColors[m.type]};animation-delay:${i * 0.3}s">
          <div class="threat-marker__tooltip">${m.label}</div>
        </div>
      `).join('')}
      <div class="threat-map__legend">
        <div class="threat-map__legend-title">Threat Severity</div>
        <div class="legend-item"><span class="legend-dot legend-dot--safe"></span> Low / Resolved</div>
        <div class="legend-item"><span class="legend-dot legend-dot--medium"></span> Medium</div>
        <div class="legend-item"><span class="legend-dot legend-dot--warning"></span> Warning</div>
        <div class="legend-item"><span class="legend-dot legend-dot--critical"></span> Critical</div>
      </div>
      <div class="threat-map__stats">
        <div class="map-stat-pill"><span style="color:#FF4D4D">●</span> Critical: <strong id="map-critical">3</strong></div>
        <div class="map-stat-pill"><span style="color:#FFA500">●</span> Active: <strong id="map-active">7</strong></div>
        <div class="map-stat-pill"><span style="color:#00FF99">●</span> Neutralized: <strong id="map-neutral">24</strong></div>
      </div>
    `;
  },

  drawCampusOutline() {
    return `
      <rect x="10" y="15" width="35" height="25" rx="2" fill="none" stroke="rgba(0,191,255,0.2)" stroke-width="0.3"/>
      <text x="27" y="28" text-anchor="middle" fill="rgba(139,156,184,0.6)" font-size="2.5">Academic Block</text>
      <rect x="50" y="12" width="30" height="20" rx="2" fill="none" stroke="rgba(0,191,255,0.2)" stroke-width="0.3"/>
      <text x="65" y="24" text-anchor="middle" fill="rgba(139,156,184,0.6)" font-size="2.5">Admin Center</text>
      <rect x="15" y="50" width="25" height="30" rx="2" fill="none" stroke="rgba(0,191,255,0.2)" stroke-width="0.3"/>
      <text x="27" y="66" text-anchor="middle" fill="rgba(139,156,184,0.6)" font-size="2.5">Dormitories</text>
      <rect x="45" y="45" width="40" height="35" rx="2" fill="none" stroke="rgba(0,191,255,0.2)" stroke-width="0.3"/>
      <text x="65" y="64" text-anchor="middle" fill="rgba(139,156,184,0.6)" font-size="2.5">Research Labs</text>
      <rect x="70" y="55" width="20" height="18" rx="2" fill="none" stroke="rgba(0,191,255,0.2)" stroke-width="0.3"/>
      <text x="80" y="66" text-anchor="middle" fill="rgba(139,156,184,0.6)" font-size="2">Library</text>
    `;
  },

  drawConnections() {
    const lines = [
      [27, 40, 65, 32], [27, 50, 27, 65], [65, 32, 65, 64],
      [27, 40, 65, 64], [80, 64, 65, 64]
    ];
    return lines.map(([x1, y1, x2, y2]) =>
      `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(0,191,255,0.08)" stroke-width="0.2" stroke-dasharray="1,1"/>`
    ).join('');
  },

  startLiveUpdates() {
    setInterval(() => {
      const critical = document.getElementById('map-critical');
      const active = document.getElementById('map-active');
      const neutral = document.getElementById('map-neutral');
      if (critical) critical.textContent = Utils.randomInt(2, 5);
      if (active) active.textContent = Utils.randomInt(5, 12);
      if (neutral) neutral.textContent = Utils.randomInt(20, 30);
    }, 5000);
  }
};

document.addEventListener('DOMContentLoaded', () => ThreatMap.init());

/**
 * Live Attack & Defense Simulator Module
 */
const AttackSimulator = {
  currentStep: 0,
  playing: false,
  steps: [
    {
      title: 'Fake Email Received',
      desc: 'A student receives a convincing phishing email impersonating the campus IT department, requesting immediate password verification.',
      alert: null,
      danger: false
    },
    {
      title: 'User Clicks Malicious Link',
      desc: 'The student clicks the embedded link, redirecting to a credential harvesting page that mimics the official campus login portal.',
      alert: { type: 'warn', text: '[WARN] HTTP request to unverified domain: campus-login-verify.xyz' },
      danger: true
    },
    {
      title: 'Credentials Stolen',
      desc: 'Username and password are captured by the attacker. The fake page displays a "verification successful" message to avoid suspicion.',
      alert: { type: 'crit', text: '[CRITICAL] Credential submission detected to external endpoint' },
      danger: true
    },
    {
      title: 'Unauthorized Login Detected',
      desc: 'The attacker uses stolen credentials to access the student portal from an unrecognized IP address in a foreign country.',
      alert: { type: 'crit', text: '[CRITICAL] Login from 185.220.101.47 (Tor exit node) — Geo: Unknown' },
      danger: true
    },
    {
      title: 'SOC System Detects Anomaly',
      desc: 'Secure Campus AI SOC engine flags the login based on impossible travel, new device fingerprint, and behavioral analytics deviation.',
      alert: { type: 'warn', text: '[ALERT] Anomaly score: 94/100 — Automated response initiated' },
      danger: false
    },
    {
      title: 'Account Locked',
      desc: 'Automated incident response triggers account lockdown. All active sessions terminated. User notified via secure channel.',
      alert: { type: 'ok', text: '[ACTION] Account STU-2024-0847 locked. Sessions revoked. MFA reset required.' },
      danger: false
    },
    {
      title: 'Threat Neutralized',
      desc: 'SOC analyst reviews the incident, blacklists the phishing domain, updates threat intelligence feeds, and initiates user security training.',
      alert: { type: 'ok', text: '[RESOLVED] Threat neutralized. Domain blocked. Incident #INC-2026-0847 closed.' },
      danger: false
    }
  ],

  init() {
    this.renderSteps();
    document.getElementById('sim-start')?.addEventListener('click', () => this.start());
    document.getElementById('sim-reset')?.addEventListener('click', () => this.reset());
  },

  renderSteps() {
    const container = document.getElementById('sim-timeline');
    if (!container) return;

    container.innerHTML = this.steps.map((step, i) => `
      <div class="simulator-step ${step.danger ? 'simulator-step--danger' : ''}" data-step="${i}" id="sim-step-${i}">
        <div style="position:relative">
          <div class="simulator-step__indicator">${i + 1}</div>
          ${i < this.steps.length - 1 ? '<div class="simulator-step__connector"></div>' : ''}
        </div>
        <div class="simulator-step__content">
          <div class="simulator-step__title">${step.title}</div>
          <div class="simulator-step__desc">${step.desc}</div>
          ${step.alert ? `<div class="simulator-step__alert simulator-step__alert--${step.alert.type === 'crit' ? 'crit' : step.alert.type === 'warn' ? 'warn' : 'ok'}">${step.alert.text}</div>` : ''}
        </div>
      </div>
    `).join('');
  },

  async start() {
    if (this.playing) return;
    this.playing = true;
    this.currentStep = 0;
    this.resetVisuals();

    const startBtn = document.getElementById('sim-start');
    if (startBtn) { startBtn.disabled = true; startBtn.textContent = '⟳ Simulation Running...'; }

    for (let i = 0; i < this.steps.length; i++) {
      this.currentStep = i;
      this.activateStep(i);
      this.updateProgress();
      await Utils.delay(2500);
      this.completeStep(i);
    }

    this.playing = false;
    if (startBtn) { startBtn.disabled = false; startBtn.textContent = '▶ Run Simulation'; }
  },

  activateStep(index) {
    const step = document.getElementById(`sim-step-${index}`);
    step?.classList.add('active');
    step?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },

  completeStep(index) {
    const step = document.getElementById(`sim-step-${index}`);
    step?.classList.remove('active');
    step?.classList.add('completed');
  },

  updateProgress() {
    const bar = document.getElementById('sim-progress-bar');
    if (bar) bar.style.width = `${((this.currentStep + 1) / this.steps.length) * 100}%`;
  },

  reset() {
    this.playing = false;
    this.currentStep = 0;
    this.resetVisuals();
    const bar = document.getElementById('sim-progress-bar');
    if (bar) bar.style.width = '0';
    const startBtn = document.getElementById('sim-start');
    if (startBtn) { startBtn.disabled = false; startBtn.textContent = '▶ Run Simulation'; }
  },

  resetVisuals() {
    document.querySelectorAll('.simulator-step').forEach(s => {
      s.classList.remove('active', 'completed');
    });
  }
};

document.addEventListener('DOMContentLoaded', () => AttackSimulator.init());

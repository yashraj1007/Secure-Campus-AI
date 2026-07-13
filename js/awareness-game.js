/**
 * Cyber Awareness Game Module
 */
const AwarenessGame = {
  xp: 1250,
  level: 7,
  xpToNext: 1500,
  currentQuestion: 0,
  score: 0,

  questions: [
    {
      q: 'What is the most reliable way to verify a suspicious email claiming to be from your university?',
      options: ['Click the link to check', 'Reply to the email', 'Contact IT through official channels', 'Forward to friends'],
      correct: 2
    },
    {
      q: 'Which of the following is the strongest form of authentication?',
      options: ['Password only', 'Security questions', 'Multi-Factor Authentication (MFA)', 'PIN code'],
      correct: 2
    },
    {
      q: 'You receive a job offer requiring an upfront registration fee. What should you do?',
      options: ['Pay immediately to secure the spot', 'Research the company and report if suspicious', 'Share your bank details', 'Ignore all job offers'],
      correct: 1
    },
    {
      q: 'What does HTTPS in a URL indicate?',
      options: ['The site is definitely safe', 'The connection is encrypted', 'The site is government-approved', 'No ads will appear'],
      correct: 1
    },
    {
      q: 'A colleague asks for your password to "help with a project." You should:',
      options: ['Share it since they are a colleague', 'Refuse and report to security', 'Write it on a sticky note', 'Change it after sharing'],
      correct: 1
    }
  ],

  badges: [
    { name: 'Cyber Defender', icon: '🛡️', earned: true },
    { name: 'Phishing Hunter', icon: '🎣', earned: true },
    { name: 'Security Analyst', icon: '🔍', earned: true },
    { name: 'Threat Expert', icon: '⚡', earned: false },
    { name: 'SOC Champion', icon: '🏆', earned: false }
  ],

  leaderboard: [
    { rank: 1, name: 'Alex Chen', xp: 2450, level: 12 },
    { rank: 2, name: 'Jordan Lee', xp: 2180, level: 11 },
    { rank: 3, name: 'Sam Rivera', xp: 1920, level: 10 },
    { rank: 4, name: 'You', xp: 1250, level: 7 },
    { rank: 5, name: 'Casey Kim', xp: 1100, level: 6 },
    { rank: 6, name: 'Morgan Davis', xp: 980, level: 5 },
    { rank: 7, name: 'Riley Patel', xp: 870, level: 5 }
  ],

  init() {
    this.renderBadges();
    this.renderLeaderboard();
    this.renderQuestion();
    this.updateXPBar();
  },

  updateXPBar() {
    const fill = document.getElementById('xp-fill');
    const label = document.getElementById('xp-label');
    const level = document.getElementById('xp-level');
    if (fill) fill.style.width = `${(this.xp / this.xpToNext) * 100}%`;
    if (label) label.textContent = `${this.xp} / ${this.xpToNext} XP`;
    if (level) level.textContent = `Level ${this.level}`;
  },

  renderBadges() {
    const container = document.getElementById('badges-grid');
    if (!container) return;
    container.innerHTML = this.badges.map(b => `
      <div class="badge-card ${b.earned ? 'earned' : 'locked'}">
        <div class="badge-card__icon">${b.icon}</div>
        <div class="badge-card__name">${b.name}</div>
      </div>
    `).join('');
  },

  renderLeaderboard() {
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;
    tbody.innerHTML = this.leaderboard.map(p => `
      <tr${p.name === 'You' ? ' style="background:rgba(0,191,255,0.05)"' : ''}>
        <td class="leaderboard-rank">#${p.rank}</td>
        <td>${p.name}</td>
        <td>${p.xp.toLocaleString()}</td>
        <td><span class="badge badge-info">Lv. ${p.level}</span></td>
      </tr>
    `).join('');
  },

  renderQuestion() {
    const container = document.getElementById('quiz-container');
    if (!container || this.currentQuestion >= this.questions.length) {
      this.showResults();
      return;
    }

    const q = this.questions[this.currentQuestion];
    container.innerHTML = `
      <div class="quiz-card">
        <div style="font-size:0.8rem;color:var(--text-muted);margin-bottom:0.5rem;">Question ${this.currentQuestion + 1} of ${this.questions.length}</div>
        <div class="quiz-card__question">${q.q}</div>
        <div class="quiz-options" id="quiz-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-option" data-index="${i}">${opt}</button>
          `).join('')}
        </div>
      </div>
    `;

    container.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => this.answer(parseInt(btn.dataset.index)));
    });
  },

  answer(selected) {
    const q = this.questions[this.currentQuestion];
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, i) => {
      opt.disabled = true;
      if (i === q.correct) opt.classList.add('correct');
      if (i === selected && selected !== q.correct) opt.classList.add('incorrect');
    });

    if (selected === q.correct) {
      this.score++;
      this.xp += 50;
      this.updateXPBar();
    }

    setTimeout(() => {
      this.currentQuestion++;
      this.renderQuestion();
    }, 1500);
  },

  showResults() {
    const container = document.getElementById('quiz-container');
    if (!container) return;
    const pct = Math.round((this.score / this.questions.length) * 100);
    container.innerHTML = `
      <div class="quiz-card" style="text-align:center">
        <div style="font-size:3rem;margin-bottom:1rem">${pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📚'}</div>
        <h3>Quiz Complete!</h3>
        <p style="color:var(--text-secondary);margin:0.5rem 0 1.5rem">You scored ${this.score}/${this.questions.length} (${pct}%)</p>
        <button class="btn btn-primary" id="quiz-retry">Try Again</button>
      </div>
    `;
    document.getElementById('quiz-retry')?.addEventListener('click', () => {
      this.currentQuestion = 0;
      this.score = 0;
      this.renderQuestion();
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('quiz-container')) AwarenessGame.init();
});

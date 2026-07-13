/**
 * Secure Campus AI - Shared Layout System
 */
const Layout = {
  studentNav: [
    { href: 'dashboard.html', icon: 'layout-dashboard', label: 'Dashboard' },
    { href: 'email-scanner.html', icon: 'mail', label: 'Email Scanner' },
    { href: 'scam-detector.html', icon: 'alert-triangle', label: 'Scam Detector' },
    { href: 'ai-assistant.html', icon: 'bot', label: 'AI Assistant' },
    { href: 'awareness-game.html', icon: 'gamepad-2', label: 'Awareness Game' },
    { href: 'attack-simulator.html', icon: 'zap', label: 'Attack Simulator' },
    { href: 'profile.html', icon: 'user', label: 'Profile' }
  ],

  adminNav: [
    { section: 'Operations' },
    { href: 'soc-overview.html', icon: 'monitor', label: 'SOC Overview' },
    { href: 'live-threats.html', icon: 'radio', label: 'Live Threat Monitor' },
    { href: 'incidents.html', icon: 'siren', label: 'Incident Management' },
    { href: 'threat-map.html', icon: 'map', label: 'Threat Intelligence Map' },
    { section: 'Management' },
    { href: 'user-monitoring.html', icon: 'users', label: 'User Monitoring' },
    { href: 'reports.html', icon: 'bar-chart-3', label: 'Reports & Analytics' },
    { href: 'settings.html', icon: 'settings', label: 'System Settings' }
  ],

  init() {
    const body = document.body;
    const role = body.dataset.app;
    if (!role) return;

    const contentEl = document.querySelector('[data-page-content]');
    if (!contentEl) return;

    const content = contentEl.innerHTML;
    contentEl.remove();

    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    const isAdmin = role === 'admin';

    const shell = document.createElement('div');
    shell.innerHTML = this.renderShell({
      role,
      isAdmin,
      currentPage,
      title: body.dataset.title || 'Dashboard',
      breadcrumb: body.dataset.breadcrumb || '',
      status: body.dataset.status || '',
      statusType: body.dataset.statusType || '',
      topbarExtra: body.dataset.topbarExtra || '',
      showSocBadge: body.dataset.socBadge === 'true'
    });

    body.insertBefore(shell.firstElementChild, body.firstChild);
    document.querySelector('.page-content').innerHTML = content;
  },

  renderShell({ role, isAdmin, currentPage, title, breadcrumb, status, statusType, topbarExtra, showSocBadge }) {
    const navItems = isAdmin ? this.adminNav : this.studentNav;
    const subtitle = isAdmin ? 'SOC Command Center' : 'Student Portal';

    const navHtml = navItems.map(item => {
      if (item.section) {
        return `<div class="sidebar__section">${item.section}</div>`;
      }
      const active = item.href === currentPage ? ' active' : '';
      return `<a href="${item.href}" class="nav-item${active}"><span class="nav-item__icon"><i data-lucide="${item.icon}"></i></span> ${item.label}</a>`;
    }).join('');

    const statusDotClass = statusType === 'critical' ? ' status-dot--critical' : '';
    const statusHtml = status
      ? `<div class="topbar__status"><span class="status-dot${statusDotClass}"></span> ${status}</div>`
      : '';
    const socBadgeHtml = showSocBadge ? '<span class="soc-badge">LIVE</span>' : '';
    const topbarExtraHtml = topbarExtra ? `<div class="topbar__extra">${topbarExtra}</div>` : '';

    return `
      <div class="app-layout${isAdmin ? ' soc-layout' : ''}">
        <aside class="sidebar">
          <div class="sidebar__brand">
            <div class="sidebar__logo">SC</div>
            <div>
              <div class="sidebar__title">Secure Campus AI</div>
              <div class="sidebar__subtitle">${subtitle}</div>
            </div>
          </div>
          <nav class="sidebar__nav">${navHtml}
            <a href="#" class="nav-item nav-item--danger" data-logout><span class="nav-item__icon"><i data-lucide="log-out"></i></span> Logout</a>
          </nav>
          <div class="sidebar__footer">
            <div class="sidebar__user">
              <div class="sidebar__avatar" data-user-avatar></div>
              <div class="sidebar__user-info">
                <div class="sidebar__user-name" data-user-name></div>
                <div class="sidebar__user-role" data-user-role></div>
              </div>
            </div>
          </div>
        </aside>
        <main class="main-content">
          <header class="topbar">
            <div class="topbar__left">
              <button class="mobile-toggle" aria-label="Toggle menu"><i data-lucide="menu"></i></button>
              <div>
                <h1 class="topbar__title">${title}</h1>
                ${breadcrumb ? `<div class="topbar__breadcrumb">${breadcrumb}</div>` : ''}
              </div>
            </div>
            <div class="topbar__right">
              ${topbarExtraHtml}
              ${socBadgeHtml}
              ${statusHtml}
            </div>
          </header>
          <div class="page-content"></div>
        </main>
      </div>
    `;
  },

  finalize() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
    if (typeof Utils !== 'undefined') {
      Utils.initSidebar();
      Utils.initCounters();
    }
    if (typeof Auth !== 'undefined') {
      document.querySelectorAll('[data-logout]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          Auth.logout();
        });
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Layout.init();
  Layout.finalize();
});

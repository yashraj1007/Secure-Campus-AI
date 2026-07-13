# Secure Campus AI

**Intelligent Cyber Defense \& Awareness Platform for Educational Institutions**

Enterprise-style SOC dashboard frontend for campus cybersecurity education and monitoring.

\---

## Quick Start

### Option 1 — Double-click

Run `start.bat`, then open **http://localhost:8080**

### Option 2 — Manual

```bash
cd "Secure Campus AI"
python -m http.server 8080
```

### Option 3 — Direct file

Open `index.html` in your browser (use `start.bat` for best results).

\---

## Demo Credentials

|Role|Email|Password|
|-|-|-|
|**Student**|`student@campus.edu`|`student123`|
|**Admin (SOC)**|`admin@soc.campus.edu`|`admin123`|

\---

## Project Structure

```
Secure Campus AI/
├── index.html              # Landing page
├── login.html              # Role-based authentication
├── 404.html                # Not found page
├── start.bat               # Local dev server (Windows)
├── assets/
│   └── favicon.svg
├── css/
│   ├── variables.css       # Theme tokens \& colors
│   ├── base.css            # Reset \& typography
│   ├── components.css      # Reusable UI components
│   ├── animations.css      # Keyframe animations
│   ├── landing.css         # Landing page styles
│   ├── auth.css            # Login page styles
│   ├── student.css         # Student module styles
│   └── admin.css           # SOC dashboard styles
├── js/
│   ├── layout.js           # Shared sidebar \& topbar
│   ├── auth.js             # Authentication logic
│   ├── utils.js            # Helpers \& counters
│   ├── charts.js           # Chart.js configurations
│   ├── email-scanner.js    # Phishing detector
│   ├── scam-detector.js    # Scam/placement detector
│   ├── ai-assistant.js     # Security chat assistant
│   ├── threat-map.js       # Threat intelligence map
│   ├── awareness-game.js   # Gamified training
│   ├── attack-simulator.js # Attack lifecycle demo
│   ├── live-feed.js        # SOC live event feed
│   └── network-bg.js       # Landing page animation
├── student/                # Student portal pages
└── admin/                  # SOC command center pages
```

\---

## Modules

|Module|Path|Description|
|-|-|-|
|Landing Page|`/index.html`|Platform overview \& entry|
|Login|`/login.html`|Student / Admin authentication|
|Student Dashboard|`/student/dashboard.html`|Personal security overview|
|Email Scanner|`/student/email-scanner.html`|Phishing email analysis|
|Scam Detector|`/student/scam-detector.html`|Job scam detection|
|AI Assistant|`/student/ai-assistant.html`|Security Q\&A chatbot|
|Awareness Game|`/student/awareness-game.html`|Quizzes, XP \& badges|
|Attack Simulator|`/student/attack-simulator.html`|Phishing attack lifecycle|
|SOC Overview|`/admin/soc-overview.html`|Main SOC dashboard|
|Live Threats|`/admin/live-threats.html`|Real-time threat stream|
|Incidents|`/admin/incidents.html`|Incident tracking|
|Threat Map|`/admin/threat-map.html`|Campus threat visualization|
|User Monitoring|`/admin/user-monitoring.html`|User activity \& risk|
|Reports|`/admin/reports.html`|Analytics \& reports|
|Settings|`/admin/settings.html`|System configuration|

\---

## Tech Stack

* HTML5, CSS3, Vanilla JavaScript
* [Chart.js](https://www.chartjs.org/) — Analytics charts
* [Lucide Icons](https://lucide.dev/) — Professional icon set
* localStorage — Demo session management

\---

## Notes

This is a **frontend demonstration**. Authentication, threat detection, and AI responses are simulated client-side. For production deployment, integrate a backend API, database, and real security services.

\---

© 2026 Secure Campus AI


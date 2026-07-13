/**
 * Secure Campus AI - Charts Module (Chart.js)
 */
const Charts = {
  defaults: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#8B9CB8', font: { family: 'Inter', size: 11 } }
      }
    },
    scales: {
      x: {
        ticks: { color: '#5A6A85', font: { size: 10 } },
        grid: { color: 'rgba(0, 191, 255, 0.05)' }
      },
      y: {
        ticks: { color: '#5A6A85', font: { size: 10 } },
        grid: { color: 'rgba(0, 191, 255, 0.05)' }
      }
    }
  },

  createLineChart(canvasId, labels, data, label = 'Activity') {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    return new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label,
          data,
          borderColor: '#00BFFF',
          backgroundColor: 'rgba(0, 191, 255, 0.1)',
          fill: true,
          tension: 0.4,
          pointBackgroundColor: '#00BFFF',
          pointRadius: 4,
          pointHoverRadius: 6
        }]
      },
      options: { ...this.defaults }
    });
  },

  createBarChart(canvasId, labels, datasets) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    return new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets },
      options: { ...this.defaults }
    });
  },

  createPieChart(canvasId, labels, data, colors) {
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;
    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colors || ['#00BFFF', '#00FF99', '#FFA500', '#FF4D4D', '#FFD700'],
          borderColor: '#131C2E',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '65%',
        plugins: {
          legend: {
            position: 'right',
            labels: { color: '#8B9CB8', font: { family: 'Inter', size: 11 }, padding: 12 }
          }
        }
      }
    });
  },

  initStudentDashboard() {
    this.createLineChart('weeklyActivityChart',
      ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      [12, 19, 8, 15, 22, 10, 14],
      'Scans'
    );
    this.createPieChart('threatCategoriesChart',
      ['Phishing', 'Malware', 'Spam', 'Safe'],
      [35, 15, 25, 25]
    );
  },

  initAdminDashboard() {
    this.createBarChart('attackTrendChart',
      ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      [
        { label: 'Phishing', data: [12, 8, 25, 32, 18, 14], backgroundColor: 'rgba(255, 165, 0, 0.7)' },
        { label: 'Malware', data: [3, 5, 8, 12, 6, 4], backgroundColor: 'rgba(255, 77, 77, 0.7)' },
        { label: 'Login Attempts', data: [15, 10, 20, 28, 22, 16], backgroundColor: 'rgba(0, 191, 255, 0.7)' }
      ]
    );
    this.createLineChart('securityPostureChart',
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      [72, 78, 75, 82, 85, 88],
      'Security Score'
    );
    this.createPieChart('incidentTypesChart',
      ['Phishing', 'Malware', 'Unauthorized Access', 'Data Leak', 'Other'],
      [42, 18, 22, 8, 10],
      ['#FFA500', '#FF4D4D', '#00BFFF', '#FFD700', '#5A6A85']
    );
  },

  initReportsPage() {
    this.createBarChart('monthlyIncidentsChart',
      ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      [
        { label: 'Critical', data: [5, 3, 8, 4, 6, 2], backgroundColor: 'rgba(255, 77, 77, 0.7)' },
        { label: 'High', data: [12, 8, 15, 10, 14, 9], backgroundColor: 'rgba(255, 165, 0, 0.7)' },
        { label: 'Medium', data: [20, 18, 22, 25, 19, 16], backgroundColor: 'rgba(255, 215, 0, 0.7)' }
      ]
    );
    this.createPieChart('reportsPieChart',
      ['Resolved', 'In Progress', 'Open', 'Escalated'],
      [65, 15, 12, 8],
      ['#00FF99', '#00BFFF', '#FFA500', '#FF4D4D']
    );
  }
};

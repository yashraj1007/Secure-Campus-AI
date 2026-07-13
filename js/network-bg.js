/**
 * Animated Network Background for Landing Page
 */
const NetworkBg = {
  init() {
    const canvas = document.getElementById('network-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let nodes = [];
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      this.createNodes(canvas, nodes);
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const alpha = (1 - dist / 150) * 0.3;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 191, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 191, 255, ${0.3 + node.pulse * 0.4})`;
        ctx.fill();
        node.pulse = Math.sin(Date.now() * 0.002 + node.offset) * 0.5 + 0.5;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationId);
  },

  createNodes(canvas, nodes) {
    nodes.length = 0;
    const count = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        offset: Math.random() * Math.PI * 2,
        pulse: 0
      });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => NetworkBg.init());

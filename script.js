// script.js: mueve el divisor ajustando la variable CSS --divider
(() => {
  const container = document.querySelector('.contact-container');
  const handle = document.querySelector('.contact-handle');
  if (!container || !handle) return;

  let dragging = false;

  function setDividerPercent(pct) {
    // limita entre 8% y 92% para evitar que el handle salga del área
    const clamped = Math.max(8, Math.min(92, pct));
    container.style.setProperty('--divider', clamped + '%');
  }

  // mouse
  handle.addEventListener('mousedown', (e) => {
    dragging = true;
    handle.classList.add('dragging');
    e.preventDefault();
  });
  window.addEventListener('mouseup', () => {
    dragging = false;
    handle.classList.remove('dragging');
  });
  window.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const rect = container.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setDividerPercent(pct);
  });

  // touch
  handle.addEventListener('touchstart', (e) => {
    dragging = true;
    handle.classList.add('dragging');
    e.preventDefault();
  }, {passive:false});
  window.addEventListener('touchend', () => {
    dragging = false;
    handle.classList.remove('dragging');
  });
  window.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    const t = e.touches[0];
    const rect = container.getBoundingClientRect();
    const pct = ((t.clientX - rect.left) / rect.width) * 100;
    setDividerPercent(pct);
  }, {passive:false});

  // click rápido en la mitad del container para centrar (opcional)
  container.addEventListener('click', (e) => {
    // si se hizo click en el handle, ignora (ya está cubierto)
    if (e.target === handle) return;
    const rect = container.getBoundingClientRect();
    const pct = ((e.clientX - rect.left) / rect.width) * 100;
    setDividerPercent(pct);
  });
})();

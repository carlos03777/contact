// script.js — controla divisor y tema dinámico
document.querySelectorAll('.theme-compare').forEach((container) => {
  const handle = container.querySelector('.theme-handle');
  const heading = container.querySelector('.contact-heading');
  if (!handle || !heading) return;

  let dragging = false;

  function setDividerPercent(pct) {
    const clamped = Math.max(8, Math.min(92, pct));
    container.style.setProperty('--divider', clamped + '%');

    const theme = clamped > 50 ? 'dark' : 'light';
    container.setAttribute('data-theme', theme);

    const left = `polygon(0 0, ${clamped}% 0, ${clamped}% 100%, 0 100%)`;
    const right = `polygon(${clamped}% 0, 100% 0, 100% 100%, ${clamped}% 100%)`;

    const hLeft = heading.querySelector('.heading-left');
    const hRight = heading.querySelector('.heading-right');
    if (hLeft && hRight) {
      hLeft.style.clipPath = left;
      hRight.style.clipPath = right;
    }
  }

  function updateFromEvent(x) {
    const rect = container.getBoundingClientRect();
    const pct = ((x - rect.left) / rect.width) * 100;
    setDividerPercent(pct);
  }

  // Mouse
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
    if (dragging) updateFromEvent(e.clientX);
  });

  // Touch
  handle.addEventListener('touchstart', (e) => {
    dragging = true;
    handle.classList.add('dragging');
    e.preventDefault();
  }, { passive: false });
  window.addEventListener('touchend', () => {
    dragging = false;
    handle.classList.remove('dragging');
  });
  window.addEventListener('touchmove', (e) => {
    if (dragging) updateFromEvent(e.touches[0].clientX);
  }, { passive: false });

  // Click directo
  container.addEventListener('click', (e) => {
    if (e.target !== handle) updateFromEvent(e.clientX);
  });

  // Teclado
  handle.setAttribute('tabindex', '0');
  handle.addEventListener('keydown', (e) => {
    const step = 2;
    const cur = parseFloat(getComputedStyle(container).getPropertyValue('--divider')) || 50;
    if (e.key === 'ArrowLeft') setDividerPercent(cur - step);
    else if (e.key === 'ArrowRight') setDividerPercent(cur + step);
    else if (e.key === 'Home') setDividerPercent(8);
    else if (e.key === 'End') setDividerPercent(92);
  });

  // Inicializa
  setDividerPercent(50);
});

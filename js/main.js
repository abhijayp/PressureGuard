document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.mobile-toggle');
  var menu = document.querySelector('.mobile-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    menu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(function (el) {
    observer.observe(el);
  });

  animateSensorMatrix();
});

function animateSensorMatrix() {
  var cells = document.querySelectorAll('.sensor-cell');
  if (!cells.length) return;

  var states = ['', 'low', 'mid', 'high', 'critical'];
  var weights = [40, 30, 18, 9, 3];

  function pickState() {
    var r = Math.random() * 100;
    var sum = 0;
    for (var i = 0; i < weights.length; i++) {
      sum += weights[i];
      if (r < sum) return states[i];
    }
    return states[0];
  }

  function update() {
    cells.forEach(function (cell) {
      if (Math.random() < 0.15) {
        cell.className = 'sensor-cell';
        var s = pickState();
        if (s) cell.classList.add(s);
      }
    });
  }

  update();
  setInterval(update, 2000);
}

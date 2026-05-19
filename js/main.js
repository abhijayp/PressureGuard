document.addEventListener('DOMContentLoaded', function () {
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

  var sensors = document.querySelectorAll('.sensor-cell');
  if (sensors.length > 0) {
    setInterval(function () {
      var idx = Math.floor(Math.random() * sensors.length);
      var cell = sensors[idx];
      cell.classList.remove('active', 'elevated');
      var r = Math.random();
      if (r < 0.25) cell.classList.add('active');
      else if (r < 0.33) cell.classList.add('elevated');
    }, 1200);
  }

  var readings = {
    zoneA: { base: 12.4, range: 3 },
    zoneB: { base: 8.1, range: 2 },
    zoneC: { base: 22.7, range: 4 },
    peak: { base: 34.2, range: 5 }
  };

  function updateReadings() {
    Object.keys(readings).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        var r = readings[id];
        var val = r.base + (Math.random() - 0.5) * r.range;
        el.textContent = val.toFixed(1) + ' mmHg';
      }
    });
  }

  if (document.getElementById('zoneA')) {
    setInterval(updateReadings, 2500);
  }
});

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

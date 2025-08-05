function loadTemplate(id, url, callback) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (callback) callback();
    })
    .catch(error => console.error(`Error al cargar ${url}:`, error));
}

function setupThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  const body = document.body;

  if (!toggle) return;

  const icon = toggle.querySelector('i');
  const savedTheme = localStorage.getItem('theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  if (icon) icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

  toggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    if (icon) icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', newTheme);
  });
}

loadTemplate("nav-placeholder", "/partials/navbar.html", () => {
  setupThemeToggle();  // Se ejecuta solo tras cargar navbar
});
loadTemplate("footer-container", "/partials/footer.html");




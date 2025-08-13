function loadTemplate(id, url, callback) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (callback) callback();
    })
    .catch(error => console.error(`Error al cargar ${url}:`, error));
}


loadTemplate("nav-placeholder", "/partials/navbar.html", () => {
  setupThemeToggle();  // Se ejecuta solo tras cargar navbar
});
loadTemplate("footer-container", "/partials/footer.html");




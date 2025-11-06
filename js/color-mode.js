document.addEventListener("click", (e) => {
  const btn = e.target.closest("#toggle-theme");
  if (!btn) return;

  document.body.classList.toggle("dark-mode");
  btn.textContent = document.body.classList.contains("dark-mode")
    ? "☀️ Modo Claro"
    : "🌙 Modo Oscuro";

  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

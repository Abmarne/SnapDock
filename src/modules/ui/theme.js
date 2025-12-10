const THEME_KEY = "snapdock_theme";

export function initTheme({ toggleBtn }) {
  const current = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(current);
  if (toggleBtn) toggleBtn.addEventListener("click", toggleTheme);
}

export function applyTheme(theme) {
  document.body.classList.toggle("dark-theme", theme === "dark");
  document.body.classList.toggle("light-theme", theme === "light");
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const current = localStorage.getItem(THEME_KEY) || "light";
  applyTheme(current === "light" ? "dark" : "light");
}
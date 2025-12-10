const RECENT_KEY = "snapdock_recent_files";

export function saveToRecentFiles(path) {
  if (!path) return;
  const existing = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  const next = [path, ...existing.filter(p => p !== path)].slice(0, 5);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

export function getRecent() {
  return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
}

export function renderRecentFiles(container, editor) {
  const recent = getRecent();
  container.innerHTML = "";
  recent.forEach(path => {
    const li = document.createElement("li");
    li.textContent = path;
    li.addEventListener("click", async () => {
      const content = await window.electronAPI.openRecentFile(path);
      if (content !== null) editor.value = content;
      else alert("File not found: " + path);
    });
    container.appendChild(li);
  });
}
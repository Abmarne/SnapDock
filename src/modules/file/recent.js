const RECENT_KEY = "snapdock_recent_files";

export function saveToRecentFiles(filePath) {
  if (!filePath) return;
  const existing = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
  const next = [filePath, ...existing.filter(p => p !== filePath)].slice(0, 5);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

export function getRecent() {
  return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
}

function getDisplayName(filePath) {

  const parts = filePath.split(/[\\/]/);
  const base = parts[parts.length - 1];
  return base.replace(/\.[^/.]+$/, "");
}


export function renderRecentFiles(container, editor) {
  const recent = getRecent();
  container.innerHTML = "";
  recent.forEach(filePath => {
    const li = document.createElement("li");
    li.textContent = getDisplayName(filePath);   
    li.dataset.fullPath = filePath;      
    li.addEventListener("click", async () => {
      const content = await window.electronAPI.openRecentFile(filePath);
      if (content !== null) editor.value = content;
      else alert("File not found: " + filePath);
    });
    container.appendChild(li);
  });
}

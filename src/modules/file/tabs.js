// src/modules/file/tabs.js

let tabs = [];
let activeTabId = null;

const getEditor = () => document.getElementById("markdownInputMain");

/**
 * Switch to a tab by file path if it already exists
 */
export function switchToTabByPath(path) {
  if (!path) return null;
  const existing = tabs.find(t => t.filePath === path);
  if (existing) {
    switchToTab(existing.id);
    return existing;
  }
  return null;
}

/**
 * Create a new tab
 */
export function createTab({ filePath = null, content = "", title = "Untitled" } = {}) {
  const tab = {
    id: crypto.randomUUID(),
    filePath,
    title,
    content,
    isDirty: false,
    hasEverBeenSaved: !!filePath,
  };

  tabs.push(tab);
  return tab;
}

/**
 * Remove all tabs
 */
export function clearTabs() {
  tabs.length = 0;
  activeTabId = null;
  renderTabs();
}

/**
 * Switch active tab
 */
export function switchToTab(tabId) {
  const editor = getEditor();

  // Save outgoing tab content
  const current = getActiveTab();
  if (current && editor) {
    current.content = editor.value;
  }

  activeTabId = tabId;
  const next = getActiveTab();

  if (!next || !editor) return;

  editor.value = next.content;

  const filenameEl = document.getElementById("filenameDisplay");
  if (filenameEl) filenameEl.textContent = next.title;

  renderTabs();
}

/**
 * Close a tab
 */
export function closeTab(tabId) {
  const index = tabs.findIndex(t => t.id === tabId);
  if (index === -1) return;

  const tab = tabs[index];

  if (tab.isDirty) {
    const ok = window.confirm(`"${tab.title}" has unsaved changes. Close anyway?`);
    if (!ok) return;
  }

  const wasActive = tab.id === activeTabId;
  tabs.splice(index, 1);

  if (wasActive) {
    if (tabs.length) {
      const next = tabs[Math.max(0, index - 1)];
      switchToTab(next.id);
    } else {
      const newTab = createTab();
      switchToTab(newTab.id);
    }
  } else {
    renderTabs();
  }
}

/**
 * Render tab bar
 */
export function renderTabs() {
  const tabBar = document.getElementById("tabBar");
  if (!tabBar) return;

  tabBar.innerHTML = "";

  tabs.forEach(tab => {
    const isActive = tab.id === activeTabId;

    const el = document.createElement("div");
    el.className = `tab ${isActive ? "active" : ""} ${tab.isDirty ? "dirty" : ""}`;
    el.dataset.tabId = tab.id;

    // Status LED
    const led = document.createElement("div");
    led.className = "tab-led";
    led.style.background =
      !tab.hasEverBeenSaved ? "#ff4444" :
      tab.isDirty ? "#ffbb00" :
      "#4caf50";

    const title = document.createElement("span");
    title.className = "tab-title";
    title.textContent = tab.title;

    const close = document.createElement("button");
    close.className = "tab-close";
    close.innerHTML = "×";
    close.addEventListener("click", e => {
      e.stopPropagation();
      closeTab(tab.id);
    });

    el.append(led, title, close);
    el.addEventListener("click", () => switchToTab(tab.id));
    tabBar.appendChild(el);
  });
}

/**
 * Get current active tab
 */
export function getActiveTab() {
  return tabs.find(t => t.id === activeTabId) || null;
}

/**
 * Mark active tab as dirty
 */
export function markDirty() {
  const tab = getActiveTab();
  if (!tab || tab.isDirty) return;

  tab.isDirty = true;
  renderTabs();
}

export { tabs };

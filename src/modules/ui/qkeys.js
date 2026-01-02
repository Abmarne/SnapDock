/**
 * SnapDock Quick Keys Module
 * Handles global keyboard shortcuts
 */
export function initShortcuts({
  createTab,
  switchToTab,
  renderTabs,
  saveCurrentFile,
  closeTab,
  getActiveTab,
  tabs
}) {
  document.addEventListener("keydown", async (e) => {
    const modifier = e.ctrlKey || e.metaKey;
    if (!modifier) return;

    const key = e.key.toLowerCase();

    switch (key) {
      // Ctrl / Cmd + S — Save
      case "s": {
        e.preventDefault();
        const active = getActiveTab();
        if (active) await saveCurrentFile(active);
        break;
      }

      // Ctrl / Cmd + N — New tab
      case "n": {
        e.preventDefault();
        const tab = createTab();
        switchToTab(tab.id); // switchToTab handles render
        break;
      }

      // Ctrl / Cmd + W — Close tab
      case "w": {
        e.preventDefault();
        const active = getActiveTab();
        if (active) closeTab(active.id);
        break;
      }

      // Ctrl / Cmd + Tab — Cycle tabs
      case "tab": {
        e.preventDefault();
        if (tabs.length < 2) return;

        const active = getActiveTab();
        const currentIndex = active
          ? tabs.findIndex(t => t.id === active.id)
          : 0;

        const nextIndex = (currentIndex + 1) % tabs.length;
        switchToTab(tabs[nextIndex].id);
        break;
      }

      // Ctrl / Cmd + O — Open file dialog
      case "o": {
        e.preventDefault();
        document.getElementById("openFileBtnTop")?.click();
        break;
      }
    }
  });
}

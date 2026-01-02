// src/modules/system/update.js

// Helper
function byId(id) {
  return document.getElementById(id);
}

const updateBtn = byId("update");

// --- INITIALIZER ---
export function initUpdateSystem() {
  if (!updateBtn) return;

  // Check for updates on launch
  checkForUpdatesOnLaunch();

  // Manual update check
  updateBtn.addEventListener("click", async () => {
    updateBtn.disabled = true;
    updateBtn.textContent = "Checking...";

    const result = await window.electronAPI.checkForUpdates();

    if (!result.updateAvailable) {
      updateBtn.textContent = "No Updates";
      setTimeout(() => {
        updateBtn.textContent = "Update";
        updateBtn.disabled = false;
      }, 1500);
      return;
    }

    updateBtn.textContent = "Downloading...";
    await window.electronAPI.downloadUpdate();
  });

  // Update progress events
  window.electronAPI.onUpdateProgress((progress) => {
    updateBtn.textContent = `Downloading ${Math.floor(progress.percent)}%`;
  });

  // Update ready
  window.electronAPI.onUpdateReady(() => {
    updateBtn.textContent = "Restart to Update";
    updateBtn.disabled = false;
    updateBtn.onclick = () => window.electronAPI.installUpdate();
  });

  // Update error
  window.electronAPI.onUpdateError((err) => {
    updateBtn.textContent = "Update Failed";
    console.error("Update error:", err);
  });
}

// --- CHECK ON LAUNCH ---
async function checkForUpdatesOnLaunch() {
  const result = await window.electronAPI.checkForUpdates();
  if (result?.updateAvailable) {
    updateBtn.classList.add("update-available");
    updateBtn.textContent = "Update Available";
  }
}
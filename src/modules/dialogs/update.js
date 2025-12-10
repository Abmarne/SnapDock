// =========================================================
// src/modules/dialogs/update.js
//
// Handles the “Update” button and populates the version tag.
// ---------------------------------------------------------

/**
 * Show a dialog with the current build information.
 *
 * @param {Object} [opts] Optional override – useful for tests.
 * @returns {Promise<void>}
 */
export function handleUpdateClick(opts = {}) {
  const api = opts.getVersionInfo || window.snapdock.getVersionInfo;

  return api()
    .then(info =>
      alert(`SnapDock ${info.version} (${info.build})\nBuild date: ${info.date}`)
    )
    .catch(() => alert('Unable to check for updates.'));
}

/**
 * Populate the `<span id="versionTag">` element with
 * the current version/build string.
 *
 * @param {Object} info - object returned by `getVersionInfo()`
 */
export function updateVersionTag(info) {
  const el = document.getElementById('versionTag');
  if (!el) return;
  el.textContent = `v${info.version} ${info.build}`;
}

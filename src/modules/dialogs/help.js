// =========================================================
// src/modules/dialogs/help.js
//
// Opens the bundled user‑guide markdown in a new tab.
// ---------------------------------------------------------

import { openFileInTab } from '../tabs/manager.js';

/**
 * Load `user_guide.md` (bundled with the app) and display it.
 *
 * The function simply fetches the file, then delegates to the
 * tab manager so that the content appears exactly like any other
 * opened markdown file.
 */
export function showHelp() {
  fetch('assets/resources/docs/user_guide.md')
    .then(r => r.text())
    .then(text => openFileInTab('user_guide.md', text))
    .catch(err =>
      console.error('[SnapDock] Failed to load help file:', err)
    );
}

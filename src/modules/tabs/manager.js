// =========================================================
// src/modules/tabs/manager.js
//
// Simple tab manager – keeps track of opened files,
// activates a tab, and creates new tabs on demand.
// ---------------------------------------------------------

import { markdownEditor, previewPane } from '../ui/viewMode.js';
import { renderMarkdown } from '../markdown.js';

/**
 * Map of open tabs: key → file content.
 *
 * The key is either the full path (when opening via folder tree)
 * or just the display name for normal “open”/“new” files.
 */
export const openTabs = {}; // { [key:string]: string }

/**
 * Activate a tab element – show its content in the editor / preview pane.
 *
 * @param {HTMLElement} tab
 */
export function setActiveTab(tab) {
  const name   = tab.dataset.name;
  const key    = tab.dataset.key;
  const content = openTabs[key];

  if (content !== undefined) {
    markdownEditor.value = content;
    renderMarkdown(content, previewPane);
  }

  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
}

/**
 * Open a file in a new tab or activate an existing one.
 *
 * @param {string} name      - Display name shown on the tab
 * @param {string} content   - Raw markdown to show
 * @param {string|null} fullPath Optional unique key – used when opening via folder tree
 */
export function openFileInTab(name, content, fullPath = null) {
  const key = fullPath || name;

  // If we already have a tab for this file, just activate it.
  let existing = document.querySelector(`.tab[data-key="${key}"]`);
  if (existing) return setActiveTab(existing);

  // Create the tab element
  const tab = document.createElement('div');
  tab.className   = 'tab';
  tab.dataset.key = key;
  tab.dataset.name= name;
  tab.innerHTML   = `${name}<span class="closeTab">×</span>`;
  tab.addEventListener('click', () => setActiveTab(tab));

  // Append to the tabs container
  const tabsContainer = document.getElementById('tabs');
  tabsContainer.appendChild(tab);

  // Register content and activate the new tab
  openTabs[key] = content;
  setActiveTab(tab);
}

/**
 * Utility – close a tab.  Called from `scripts.js` when the user clicks the ×.
 *
 * @param {HTMLElement} tabElement
 */
export function closeTab(tabElement) {
  const key = tabElement.dataset.key;
  tabElement.remove();
  delete openTabs[key];

  // Activate the first remaining tab, if any
  const next = document.querySelector('.tab');
  if (next) setActiveTab(next);
}

// =========================================================
// src/modules/folderTree/renderer.js
//
// Builds a nested object from an array of File objects and renders it
// into the `<ul id="folderTree">` element.
//
// The functions are intentionally small so they can be unit‑tested in isolation.
// ---------------------------------------------------------

/**
 * Convert an array of File objects (with `webkitRelativePath`) into a
 * nested tree structure.
 *
 * @param {File[]} files
 * @returns {Object} – e.g. `{ src: { index: fileObj, lib: { util: fileObj } } }`
 */
export function buildFolderTree(files) {
  const root = {};

  files.forEach(file => {
    const parts = file.webkitRelativePath.split('/');
    let node = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (!node[part]) {
        node[part] = i === parts.length - 1 ? file : {};
      }
      node = node[part];
    }
  });

  return root;
}

/**
 * Render the tree object into a `<ul>` element.
 *
 * @param {Object}   tree   – result of `buildFolderTree`
 * @param {HTMLElement|undefined} parent
 *        The container where the list will be appended.  
 *        If omitted, it defaults to the global `<ul id="folderTree">`.
 */
export function renderFolderTree(tree, parent = document.getElementById('folderTree')) {
  if (!parent) return;

  parent.innerHTML = '';

  Object.entries(tree).forEach(([name, val]) => {
    const li = document.createElement('li');

    if (val instanceof File) { // file node
      li.className = 'file';
      li.textContent = `📄 ${name}`;
      li.addEventListener('click', () => {
        const reader = new FileReader();
        reader.onload = e => openFileInTab(name, e.target.result);
        reader.readAsText(val);
      });
    } else { // folder node
      li.className = 'folder';
      const label = document.createElement('span');
      label.textContent = `📁 ${name}`;
      label.style.cursor = 'pointer';

      const sub = document.createElement('ul');
      sub.style.display = 'none'; // collapsed by default

      label.addEventListener('click', () => {
        sub.style.display = sub.style.display === 'none' ? 'block' : 'none';
      });

      li.appendChild(label);
      renderFolderTree(val, sub);   // recurse
      li.appendChild(sub);
    }

    parent.appendChild(li);
  });
}

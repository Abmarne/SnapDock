import { initInitialState } from "./modules/ui/editorState.js";
import { initTheme } from "./modules/ui/theme.js";
import { initViewModeToggle } from "./modules/ui/viewMode.js";
import { loadContent, saveCurrentFile } from "./modules/file/operations.js";
import { initAutosave } from "./modules/file/autosave.js";
import { renderRecentFiles, saveToRecentFiles } from "./modules/file/recent.js";




function byId(id) { return document.getElementById(id); }

const editor = byId("markdownInputMain");
const preview = byId("previewMain");
const themeToggleBtn = byId("themeToggleBtnBottom");
const previewToggleBtn = byId("previewToggleBtn");
const versionTag = byId("versionTag");
const recentList = byId("recentFilesList");
const fileTreeList = byId("fileTreeList");

// Init
initInitialState({ editor });
initTheme({ toggleBtn: themeToggleBtn });
initViewModeToggle({ toggleBtn: previewToggleBtn, editor, preview });
initAutosave({ editor });
renderRecentFiles(recentList, editor);
renderFileTree(fileTreeList,);
setVersionTag();


// Version tag
async function setVersionTag() {
  const info = await window.electronAPI.getVersion();
  const versionTag = document.getElementById("versionTag");
  versionTag.textContent = `SnapDock ${info.version} (${info.build}) — ${info.date}`;
}


// Wire buttons (Open/Save stubs for now)
document.getElementById("newFileBtn")?.addEventListener("click", () => {
  editor.value = "";
  preview.innerHTML = "";
});

document.getElementById("saveFileBtnTop")?.addEventListener("click", () => {
  saveCurrentFile(editor);
});
// After opening a file:
document.getElementById("openFileBtnTop")?.addEventListener("click", async () => {
  const result = await loadContent(editor); // should return { content, filePath }
  if (result && result.filePath) {
    saveToRecentFiles(result.filePath);
    renderRecentFiles(recentList, editor);
  }
});

document.getElementById("openFolderBtnTop")?.addEventListener("click", async () => {
  const folderPath = await window.electronAPI.openFolder();
  if (folderPath) {
    fileTreeList.innerHTML = ""; // clear old tree
    renderFileTree(fileTreeList, folderPath);
  }
});

document.getElementById("helpBtn")?.addEventListener("click", async () => {
  const content = await window.electronAPI.openHelp();
  const md = window.markdown.render(content);

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      ${md}
      <button id="closeHelp">Close</button>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById("closeHelp").addEventListener("click", () => modal.remove());
});

async function renderFileTree(container, dirPath) {
  const files = await window.electronAPI.listFiles(dirPath);
  files.forEach(f => {
    const li = document.createElement("li");
    li.textContent = f.name;
    li.className = f.type;

    if (f.type === "folder") {
      const nested = document.createElement("ul");
      nested.style.display = "none";
      li.addEventListener("click", async () => {
        if (nested.childElementCount === 0) {
          const subFiles = await window.electronAPI.listFiles(f.fullPath);
          subFiles.forEach(sf => {
            const subLi = document.createElement("li");
            subLi.textContent = sf.name;
            subLi.className = sf.type;
            if (sf.type === "file") {
              subLi.addEventListener("click", async (e) => {
                e.stopPropagation();
                const content = await window.electronAPI.openRecentFile(sf.fullPath);
                if (content !== null) editor.value = content;
              });
            }
            nested.appendChild(subLi);
          });
        }
        nested.style.display = nested.style.display === "none" ? "block" : "none";
      });
      li.appendChild(nested);
    } else {
      li.addEventListener("click", async () => {
        const content = await window.electronAPI.openRecentFile(f.fullPath);
        if (content !== null) editor.value = content;
      });
    }

    container.appendChild(li);
  });
}

document.getElementById("update")?.addEventListener("click", async () => {
  try {
    const result = await window.electronAPI.updateApp();
    alert(result);
    location.reload(); // reload app with new files
  } catch (err) {
    alert("Update failed:\n" + err);
  }
});
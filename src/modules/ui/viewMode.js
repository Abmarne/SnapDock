import { renderMarkdown } from "../markdown.js";

export function initViewModeToggle({ toggleBtn, editor, preview }) {
  if (!toggleBtn || !editor || !preview) return;

  // NEW: get the wrapper elements
  const editorWrapper = document.querySelector(".editor-wrapper");
  const previewWrapper = document.querySelector(".preview-wrapper");

  preview.classList.remove("hidden");

  // Initial state: editor visible, preview hidden
  previewWrapper.classList.add("hidden");
  editorWrapper.classList.remove("hidden");
  toggleBtn.textContent = "Show Preview";

  const updatePreview = () => {
    preview.innerHTML = renderMarkdown(editor.value);
  };

  toggleBtn.addEventListener("click", () => {
    const showingPreview = !previewWrapper.classList.contains("hidden");

    if (showingPreview) {
      // Switch to editor mode
      previewWrapper.classList.add("hidden");
      editorWrapper.classList.remove("hidden");
      toggleBtn.textContent = "Show Preview";
    } else {
      // Switch to preview mode
      updatePreview();
      previewWrapper.classList.remove("hidden");
      editorWrapper.classList.add("hidden");
      toggleBtn.textContent = "Edit Markdown";
    }
  });

  // Live update preview while typing (only if preview is visible)
  editor.addEventListener("input", () => {
    if (!previewWrapper.classList.contains("hidden")) {
      updatePreview();
    }
  });
}
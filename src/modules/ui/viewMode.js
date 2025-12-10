import { renderMarkdown } from "../markdown.js";

export function initViewModeToggle({ toggleBtn, editor, preview }) {
  if (!toggleBtn || !editor || !preview) return;

  // Default: editor visible, preview hidden
  preview.style.display = "none";
  editor.style.display = "block";
  toggleBtn.textContent = "Show Preview";

  toggleBtn.addEventListener("click", () => {
    const showingPreview = preview.style.display !== "none";
    if (showingPreview) {
      preview.style.display = "none";
      editor.style.display = "block";
      toggleBtn.textContent = "Show Preview";
    } else {
      preview.innerHTML = renderMarkdown(editor.value);
      preview.style.display = "block";
      editor.style.display = "none";
      toggleBtn.textContent = "Edit Markdown";
    }
  });

  // Optional live render while typing (kept simple for v1.9)
  editor.addEventListener("input", () => {
    if (preview.style.display !== "none") {
      preview.innerHTML = renderMarkdown(editor.value);
    }
  });
}
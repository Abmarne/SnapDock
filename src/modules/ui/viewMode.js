import { renderMarkdown } from "../markdown.js";

export function initViewModeToggle({ toggleBtn, editor, preview }) {
  if (!toggleBtn || !editor || !preview) return;

  preview.classList.add("hidden");
  editor.style.display = "block";
  toggleBtn.textContent = "Show Preview";

  const updatePreview = () => {
    preview.innerHTML = renderMarkdown(editor.value);
  };

  toggleBtn.addEventListener("click", () => {
    const showingPreview = !preview.classList.contains("hidden");

    if (showingPreview) {
      preview.classList.add("hidden");
      editor.style.display = "block";
      toggleBtn.textContent = "Show Preview";
    } else {
      updatePreview();
      preview.classList.remove("hidden");
      editor.style.display = "none";
      toggleBtn.textContent = "Edit Markdown";
    }
  });

  editor.addEventListener("input", () => {
    if (!preview.classList.contains("hidden")) {
      updatePreview();
    }
  });
}
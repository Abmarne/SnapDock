const AUTOSAVE_KEY = "snapdock_autosave";

export function initAutosave({ editor }) {
  if (!editor) return;

  // Restore saved content if it exists
  const saved = localStorage.getItem(AUTOSAVE_KEY);
  if (saved) editor.value = saved;

  // Save after typing (debounced)
  let timer;
  editor.addEventListener("input", () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      localStorage.setItem(AUTOSAVE_KEY, editor.value || "");
    }, 500); // half-second debounce
  });
}
export function initInitialState({ editor }) {
  if (!editor) return;
  editor.value = editor.value || "# SnapDock v1.9\n\nStart typing...";
  editor.focus();
}
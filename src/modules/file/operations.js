import { saveToRecentFiles, renderRecentFiles } from "./recent.js";

export async function saveCurrentFile(editor) {
  const success = await window.electronAPI.saveFile(editor.value);
  if (success) alert("File saved successfully!");
}



export async function loadContent(editor) {
  const result = await window.electronAPI.openFile();
  if (result !== null) {
    editor.value = result.content;
    return result;
  }
  return null;
}
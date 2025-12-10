const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  openFolder: () => ipcRenderer.invoke("dialog:openFolder"),
  saveFile: (content) => ipcRenderer.invoke("dialog:saveFile", content),
  openRecentFile: (filePath) => ipcRenderer.invoke("dialog:openRecentFile", filePath),
  openHelp: () => ipcRenderer.invoke("dialog:openHelp"),
  listFiles: (dirPath) => ipcRenderer.invoke("dialog:listFiles", dirPath),
  updateApp: () => ipcRenderer.invoke("dialog:updateApp"),
  getVersion: () => ipcRenderer.invoke("dialog:getVersion"),
});
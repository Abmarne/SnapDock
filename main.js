const { app, BrowserWindow, dialog, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");
const https = require("https");
const { exec } = require("child_process");
const pkg = require("./package.json");


function createWindow() {
  const win = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "src", "preload.js"),
    },
  });
  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

ipcMain.handle("dialog:openFile", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "Markdown", extensions: ["md"] }],
  });
  if (canceled || filePaths.length === 0) return null;

  const filePath = filePaths[0];
  const content = fs.readFileSync(filePath, "utf-8");
  return { content, filePath };
});

ipcMain.handle("dialog:openFolder", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ["openDirectory"]
  });
  if (canceled || filePaths.length === 0) return null;
  return filePaths[0]; 
});

ipcMain.handle("dialog:saveFile", async (event, content) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    filters: [{ name: "Markdown", extensions: ["md"] }],
  });
  if (canceled || !filePath) return false;
  fs.writeFileSync(filePath, content, "utf-8");
  return true;
});

ipcMain.handle("dialog:openRecentFile", async (event, filePath) => {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    console.error("Failed to open recent file:", err);
    return null;
  }
});

ipcMain.handle("dialog:openHelp", async () => {
  try {
    const helpPath = path.join(__dirname, "assets", "resources", "docs", "user_guide.md");
    return fs.readFileSync(helpPath, "utf-8");
  } catch (err) {
    console.error("Failed to load help doc:", err);
    return "# Help file not found";
  }
});

ipcMain.handle("dialog:listFiles", async (event, dirPath) => {
  if (!dirPath || typeof dirPath !== "string") {
    console.error("listFiles called without a valid directory path");
    return [];
  }
  try {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });
    return files.map(f => ({
      name: f.name,
      type: f.isDirectory() ? "folder" : "file",
      fullPath: path.join(dirPath, f.name)
    }));
  } catch (err) {
    console.error("Failed to list files:", err);
    return [];
  }
});

ipcMain.handle("dialog:checkUpdate", async () => {
  return new Promise((resolve, reject) => {
    https.get("https://api.github.com/repos/ZFordDev/SnapDock/releases/latest", {
      headers: { "User-Agent": "SnapDock" }
    }, res => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          const release = JSON.parse(data);
          const latestTag = release.tag_name.replace(/^v/, "");
          const currentVersion = pkg.version;
          resolve({ latestTag, currentVersion, updateAvailable: latestTag !== currentVersion });
        } catch (err) {
          reject(err);
        }
      });
    }).on("error", reject);
  });
});

ipcMain.handle("dialog:updateApp", async () => {
  const files = [
    { url: pkg.update.assets.bundle, local: path.join(__dirname, "dist", "bundle.js") },
    { url: pkg.update.assets.html, local: path.join(__dirname, "index.html") },
    { url: pkg.update.assets.css, local: path.join(__dirname, "src", "styles.css") }
  ];

  for (const f of files) {
    await new Promise((resolve, reject) => {
      const file = fs.createWriteStream(f.local);
      https.get(f.url, res => {
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
      }).on("error", reject);
    });
  }

  return "Update complete";
});


ipcMain.handle("dialog:getVersion", async () => {
  return { version: pkg.version, stage: pkg.build, date: pkg.releaseDate };
});


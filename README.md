<p align="center">
  <img src="assets/banner.png" alt="SnapDock Banner" width="100%">
</p>

<p align="center">
   <strong>Markdown Workspace with File‑Tree Navigation</strong><br/>
   Built by <strong>ZFordDev</strong>
</p>

---

> **A Note from ZFordDev**  
SnapDock is back from its holiday break — refreshed, refocused, and ready for the next stage.

> Over the past few weeks, I’ve been quietly rebuilding core systems, cleaning up the UI, fixing long‑standing wiring issues, and preparing SnapDock for its first **Release Candidate**. This RC marks a major milestone: the app is now stable, consistent, and feature‑complete enough to stand on its own as a daily Markdown workspace.

> Thank you to everyone who tested the early builds, reported bugs, and supported the project during its Beta phase. Your feedback directly shaped this release.

> The RC build will go live on **January 5th**, and from there the final polish begins as we move toward SnapDock’s official 2026 release.

> Let’s make this the year SnapDock becomes something truly special.

> — **ZFordDev**

---

## Overview

SnapDock is a lightweight Markdown workspace with a built‑in file‑tree dock, designed for navigating and editing folders of `.md` files quickly and cleanly.  
It’s ideal for documentation, notes, and study workflows where simplicity, speed, and clarity matter — without the clutter or complexity of traditional editors.

---

# **Release Status**

**Current build:** **Release Candidate 2.2.0**

SnapDock has officially moved out of the Beta phase.  
This RC build focuses on stability, UI consistency, and finalizing the core workflow before the full 2026 release. It includes major internal clean‑ups, bug fixes, and the completion of several long‑standing refactor tasks.

---

## **What’s New in 2.2.0‑RC**

### **✔ Major Refactor Completion**
The entire UI and file‑handling system has been modernized and modularized:

- Clean separation of UI, file, system, and markdown modules  
- Removal of legacy wiring and duplicate event listeners  
- Stable, predictable behavior across all core features  
- Faster startup and cleaner internal architecture  

This RC is the first build where SnapDock’s internals match the clarity of its UI.

---

### **✔ Theme Menu Rebuild**
The theme selector has been fully rewritten:

- New drop‑up menu  
- Clean, consistent styling across all themes  
- Fixed toggle logic (no more double‑fires)  
- Smooth, reliable theme switching  

---

### **✔ Recent Files System Stabilized**
A long‑standing issue where selecting a recent file opened **two tabs** has been resolved.

- Event delegation added  
- Duplicate listeners removed  
- Recent file loading is now instant and reliable  

---

### **✔ PDF Export Restored**
PDF export is now functional again:

- Hidden off‑screen renderer  
- Clean, theme‑accurate output  
- Automatic temp file cleanup  
- No console noise or UI disruption  

This is foundational — more PDF refinements will come in the stable release.

---

### **✔ UI & Layout Fixes**
Several subtle but important UI issues have been resolved:

- Footer layout corrected  
- Theme selector positioning fixed  
- Filename display cleaned up  
- Tab behavior stabilized  
- DevTools and menu bar removed for a clean, app‑like experience  

SnapDock now feels like a polished desktop tool, not a dev build.

---

### **✔ Stability & Consistency Improvements**
- Unified event handling  
- Eliminated duplicate logic across modules  
- Improved workspace loading  
- More predictable tab switching  
- Cleaner preview rendering pipeline  

This RC is all about reliability.

---

## **Why This Matters**

2.2.0‑RC is the first version of SnapDock that is:

- Feature‑complete for the 2026 release  
- Stable enough for daily use  
- Architecturally clean  
- UI‑consistent across all themes  
- Free of the major Beta‑era wiring issues  

The next step is final polish, documentation, and packaging for the official release.

---


## Why I Made SnapDock

While studying, I kept running into Markdown tools that were overloaded, cluttered, or slow — especially when all I needed was a clean way to read and navigate folders of `.md` files.

SnapDock was created to be a **simple, fast, distraction‑free Markdown workspace** with a **file‑tree dock** that makes browsing notes effortless.  
It’s built for documentation, study materials, and project exploration where clarity and speed matter.

Moving forward, SnapDock will continue to focus on **stability**, **simplicity**, and **theme expansion** — keeping the core experience lightweight and enjoyable.  
More advanced features, including AI‑assisted tools, will be reserved for **SnapDock‑Pro** in the future.

---

```
SnapDock/
│
├── main.js                 # Electron main process
├── preload.js              # Secure API bridge
├── index.html              # App shell
├── package.json
│
├── assets/                 # Icons, banners, screenshots
│
├── src/
│   ├── modules/
│   │   ├── ui/             # UI logic (theme menu, view mode, editor sync, etc.)
│   │   ├── file/           # File handling (open, save, tabs, workspace)
│   │   ├── system/         # Updater and system utilities
│   │   └── markdown.js     # Markdown rendering engine
│   │
│   └── styles/
│       ├── base/           # Reset + layout
│       ├── components/     # Editor, tabs, sidebar, footer, etc.
│       ├── markdown/       # Highlighting + markdown styling
│       └── themes/         # Light, Dark, Solarized, Arctic
```

Here’s a clean, RC‑ready rewrite of the **Download & Install** section that:

- Prioritizes your **website** as the source of the latest stable build  
- Keeps GitHub Releases as the secondary option  
- Includes the “build from source” option  
- Leaves macOS/Linux placeholders intact  
- Reads polished and intentional  

---

# **Download & Install**

SnapDock is available as a full desktop application.  
Choose the option that best suits your workflow:

### **1. Download the Latest Stable Build (Recommended)**
Get the most up‑to‑date and stable version directly from the website:

[SnapDock official website](https://snapdock.app)

or

[ZFordDev's personal website](https://zford.dev/snapdock)

This is the preferred way to install SnapDock for most users.

---

### **2. GitHub Releases (Free Builds)**  
If you prefer downloading directly from GitHub, the latest packaged Windows installer is always available here:

**https://github.com/ZFordDev/SnapDock/releases**

---

### **3. Build From Source**  
Developers can clone the repository and build SnapDock manually:

```bash
npm install
npm run build
```

This produces a local packaged build identical to the release version.

---

### **Other Platforms**  
macOS and Linux builds are planned and will be added once cross‑platform testing is complete.

---

## Screenshots

<div align="center">
    <img src="assets/ren_v2_lite.png" alt="Live preview in light theme" width="700" />
    <br/>
    <em>Live preview — Light theme</em>
</div>

<br/>

<div align="center">
    <img src="assets/v2_dark.png" alt="Editor view in dark theme" width="700" />
    <br/>
    <em>Editor view — Dark theme</em>
</div>

<br/>

<div align="center">
    <img src="assets/OG.png" alt="Filename header editing" width="700" />
    <br/>
    <em>The Original V1 design</em>
</div>

---

# ✅ **Features (Updated for RC 2.2.0)**

- Modern Markdown rendering (tables, code blocks, callouts, footnotes, etc.)  
- Integrated file‑tree dock for navigating folders of `.md` files  
- **Four themes** with a clean drop‑up theme selector  
- Stable tabbed editing system  
- Recent files with workspace‑aware history  
- Minimal, distraction‑free interface  
- Live preview with theme‑accurate styling  
- PDF export (restored and functional in RC)  
- Automatic update checker  
- Workspace auto‑loading on startup  

---

# ✅ **Known Issues (RC 2.2.0)**

1. **PDF export:** Fully functional, but advanced layout tuning (page breaks, headers/footers) is still planned  
2. **Editor limitations:** SnapDock remains a lightweight editor — not yet a full Markdown IDE  
3. **macOS/Linux builds:** Packaging and testing are still in progress  
4. **File‑tree edge cases:** Some workflows may still override unsaved changes if switching rapidly between files  

---

# ✅ **Roadmap (2026)**

- **Stability improvements:** Continued refinement of core systems and event handling  
- **Theme expansion:** Additional themes and improved customization options  
- **PDF enhancements:** Better page layout, print presets, and cleaner formatting  
- **Editor refinements:** Smoother typing experience, spacing improvements, and quality‑of‑life upgrades  
- **Performance tuning:** Faster rendering and more responsive navigation  
- **Pro features (future):**  
  - Rust‑powered PDF engine  
  - Advanced parsing  
  - AI‑assisted tools (SnapDock‑Pro only)  

---

## **Contribute**

SnapDock is an active, evolving project — if you have ideas, improvements, or expertise to share, you’re welcome to jump in.

- **Pull Requests:** Features, fixes, refactors  
- **Issues:** Bug reports, suggestions, feedback  
- **Community:** Discuss ideas and development on Discord  

[💬 Join the Discord](https://discord.gg/4RGzagyt7C)

---

## **License**

MIT License — free to use, modify, and distribute.  
Please keep this notice.

---

## **Explore More**

See what else I'm building at:  
https://zford.dev

---

<p align="center">
  <img src="assets/banner.png" alt="SnapDock Banner" width="100%">
</p>

<p align="center">
   <strong>Markdown Workspace with File‑Tree Navigation</strong><br/>
   Built by <strong>ZFordDev</strong>
</p>

---

> **A Note from ZFordDev**  
SnapDock development is taking a short break over the Christmas and New Year period.  
Thank you to everyone who has supported the project, tested early builds, and shared feedback - it genuinely means a lot.  
I’m looking forward to diving back in after the holidays and finishing the final polish for SnapDock’s official release in the new year.  
See you in 2026.

---

## Overview

SnapDock is a lightweight Markdown workspace with a built‑in file‑tree dock, designed for navigating and editing folders of `.md` files quickly and cleanly.  
It’s ideal for documentation, notes, and study workflows where simplicity, speed, and clarity matter.

---

## Release Status

**Current build:** Beta **2.1.2**  
This update delivers SnapDock’s largest visual refinement to date — a fully unified color system, upgraded theme palettes, improved syntax highlighting, and a cleaner, more consistent UI across the entire workspace.

###  What’s new in 2.1.2

#### **Complete Theme Palette Overhaul (All 4 Themes Updated)**  
Every theme has been rebuilt with a **full variable set**, covering:

- Editor  
- Workspace  
- Sidebar  
- Footer  
- Markdown preview  
- Syntax highlighting  
- Notes / warnings / tips  
- Tables  
- Code blocks  

Themes now feel **cohesive**, **balanced**, and **professionally tuned**:

- **Light** — cleaner GitHub‑style palette  
- **Dark** — improved contrast and readability  
- **Solarized Light** — true Base3/Base2 palette with correct accents  
- **Arctic Dark (Nord)** — full Nord‑accurate Frost/Aurora colors  

This is the first release where SnapDock’s UI, preview, and syntax highlighting all share a **single, unified color system**.

#### **UI Polish & Layout Improvements**
2.1.2 includes several visual refinements:

- Updated **SnapDock logo** for better visibility across themes  
- Fixed **footer overlap** and improved layout spacing  
- Update button now sits correctly above the footer  
- Cleaner filename input styling (now theme‑aware)  
- More consistent padding, spacing, and typography  

The entire interface feels tighter, cleaner, and more intentional.

#### **Markdown Preview Engine v2.1**
The preview renderer now uses theme variables for:

- Headings  
- Blockquotes  
- Tables  
- Inline code  
- Code blocks  
- Callouts  
- Diff blocks (additions/deletions)  


This gives SnapDock **consistent, beautiful code rendering** across all themes.

#### **Rendering Logic Fixes**
- Removed legacy hard‑coded colors  
- Fixed preview font color logic  
- Unified all preview components under theme variables  
- Cleaned up filename input styling  
- Ensured consistent contrast across themes  

---

## Why I Made SnapDock

While studying, I noticed how many Markdown tools were overloaded with features, cluttered interfaces, or slow performance — especially for students and developers who just needed to read and navigate `.md` files quickly.

SnapDock was built to be a **simple, fast, distraction‑free Markdown workspace** with a **file‑tree dock** that makes browsing folders of notes effortless.  
It’s ideal for documentation, study materials, and project exploration.

Looking ahead, SnapDock will gain a more capable editor, refined PDF output, and eventually **AI‑assisted writing tools**.

---

## Download & Install

SnapDock is now packaged as a full desktop app:

- **GitHub Releases (free builds):**  
  [Download the latest Windows installer](https://github.com/ZFordDev/SnapDock/releases)

- **Ko‑Fi (support the project):**  
  [Pay‑what‑you‑want](https://ko-fi.com/zetolabs)

- **Other platforms:**  
  macOS and Linux builds are planned once testing is complete

> Developers can still build from source if they prefer, but most users should grab the packaged app.

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

## Features

- Modern Markdown rendering (tables, code, callouts, footnotes, etc.)
- Integrated file‑tree dock for navigating folders of `.md` files
- **Four themes** with a new drop‑up theme selector
- Minimal, distraction‑free interface
- Basic editing support for quick adjustments
- Automatic updates (2.1.x)
- PDF export (new in 2.1.1 — foundational support added)

---

## Known Issues (Beta 2.1.1)

1. **PDF export:** Functional but still early — layout tuning and page‑break logic coming soon  
2. **File‑tree behavior:** Selecting items may override unsaved changes  
3. **Saving logic:** Basic editor support only; not a full Markdown editor yet  
4. **macOS/Linux builds:** Pending testing and packaging  

---

## Roadmap

- **UI editor upgrade:** Improved text box, spacing, and writing experience  
- **PDF enhancements:** Page breaks, headers/footers, print presets  
- **Performance upgrades:** Faster rendering and smoother navigation  
- **File‑handling safety:** Reduce risk of lost work  
- **Editor enhancements:** Toward a full Markdown editor  
- **Pro features (future):** Rust‑powered PDF export and advanced parsing reserved for SnapDock Pro  

---

## Contribute

SnapDock is an active, evolving project — if you have ideas, improvements, or expertise to share, you’re welcome to jump in.

- **Pull Requests:** Features, fixes, refactors  
- **Issues:** Bug reports, suggestions, feedback  
- **Community:** Discuss ideas and development on Discord  

[💬 Join the Discord](https://discord.gg/4RGzagyt7C)

---

## License

MIT License — free to use, modify, and distribute. Please keep this notice.

---

## Explore More

See what else I'm building at:  
https://zford.dev
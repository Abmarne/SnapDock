export function initHelp() {
  const helpBtn = document.getElementById("helpBtn");
  if (!helpBtn) return;

  helpBtn.addEventListener("click", async () => {
    const content = await window.electronAPI.openHelp();
    const md = window.markdown.render(content);

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        ${md}
        <button id="closeHelp">Close</button>
      </div>
    `;

    document.body.appendChild(modal);

    document.getElementById("closeHelp").addEventListener("click", () => {
      modal.remove();
    });
  });
}
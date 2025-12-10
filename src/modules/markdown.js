import MarkdownIt from "markdown-it";
const md = new MarkdownIt();

export function renderMarkdown(text) {
  return md.render(text || "");
}
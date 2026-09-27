import { colors } from "./tokens";

const STYLE_ID = "toro-globals";

const css = `
html, body { background: ${colors.background}; color-scheme: dark; }
::selection { background: ${colors.accent}; color: ${colors.onAccent}; }
* { scrollbar-width: thin; scrollbar-color: ${colors.lineStrong} transparent; }
*::-webkit-scrollbar { width: 8px; height: 8px; }
*::-webkit-scrollbar-thumb { background: ${colors.lineStrong}; border-radius: 8px; }
*::-webkit-scrollbar-track { background: transparent; }
input { caret-color: ${colors.accent}; }
[tabindex]:focus-visible, input:focus-visible { outline: 2px solid ${colors.accent}; outline-offset: 3px; }
[tabindex]:focus:not(:focus-visible) { outline: none; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}
`;

export function installWebGlobals() {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = css;
  document.head.appendChild(style);
}

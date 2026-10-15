// Contrast of every opaque text color against #000000.
// Usage: node check-contrast.js  (exits 1 if something is unreadable or glaring)
const t = JSON.parse(require('fs').readFileSync('themes/drakkar-black-ops.json', 'utf8'));
const MIN = 4.5, MAX = 15; // WCAG AA / above this, pure black starts to glare
// intentionally dim: hints that should stay in the background
const DIM = /lineNumber\.foreground|inlayHint|codeLens|ghostText|ignoredResource|inactiveForeground|inlineValues|editorRuler|ansiBrightBlack/i;

const lum = hex => hex.slice(1, 7).match(/../g).map(h => parseInt(h, 16) / 255)
  .map(c => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  .reduce((s, c, i) => s + c * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = hex => (lum(hex) + 0.05) / 0.05;

const colors = [
  ...Object.entries(t.colors).filter(([k]) => /foreground|^terminal\.ansi|debugTokenExpression/i.test(k)),
  ...t.tokenColors.filter(r => r.settings.foreground).map(r => [[].concat(r.scope).join(', '), r.settings.foreground]),
  ...Object.entries(t.semanticTokenColors).map(([k, v]) => ['semantic ' + k, v.foreground || v]),
].filter(([k, v]) => /^#[0-9a-f]{6}$/i.test(v) && v.toLowerCase() !== '#000000' && !DIM.test(k));

let bad = 0;
for (const [k, v] of colors) {
  const r = ratio(v);
  const flag = r < MIN ? 'LOW ' : r > MAX ? 'GLARE' : '';
  if (flag) { bad++; console.log(`${flag} ${r.toFixed(1).padStart(5)}:1  ${v}  ${k}`); }
}
console.log(`${colors.length} colors checked, ${bad} flagged`);
process.exit(bad ? 1 : 0);

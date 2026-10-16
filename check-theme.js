// Theme checks: contrast against #000000 and unknown color keys.
// Usage: node check-theme.js [path/to/VSCode-or-VSCodium/resources/app]
// Exits 1 if any color is unreadable, glaring, or uses a key the editor does not know.
const fs = require('fs');
const path = require('path');
const t = JSON.parse(fs.readFileSync('themes/drakkar-black-ops.json', 'utf8'));
let bad = 0;

// --- contrast ---
const MIN = 4.5, MAX = 15; // WCAG AA / above this, pure black starts to glare
// intentionally dim: hints that should stay in the background
const DIM = /lineNumber\.foreground|inlayHint|codeLens|ghostText|ignoredResource|inactiveForeground|inlineValues|editorRuler|ansiBrightBlack|unfocusedInactiveForeground/i;

const lum = hex => hex.slice(1, 7).match(/../g).map(h => parseInt(h, 16) / 255)
  .map(c => c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  .reduce((s, c, i) => s + c * [0.2126, 0.7152, 0.0722][i], 0);
const ratio = hex => (lum(hex) + 0.05) / 0.05;

const colors = [
  ...Object.entries(t.colors).filter(([k]) => /foreground|^terminal\.ansi|debugTokenExpression/i.test(k)),
  ...t.tokenColors.filter(r => r.settings.foreground).map(r => [[].concat(r.scope).join(', '), r.settings.foreground]),
  ...Object.entries(t.semanticTokenColors).map(([k, v]) => ['semantic ' + k, v.foreground || v]),
].filter(([k, v]) => /^#[0-9a-f]{6}$/i.test(v) && v.toLowerCase() !== '#000000' && !DIM.test(k));

for (const [k, v] of colors) {
  const r = ratio(v);
  const flag = r < MIN ? 'LOW  ' : r > MAX ? 'GLARE' : '';
  if (flag) { bad++; console.log(`${flag} ${r.toFixed(1).padStart(5)}:1  ${v}  ${k}`); }
}
console.log(`contrast: ${colors.length} colors checked`);

// --- unknown keys: compare against the color ids the installed editor registers ---
const home = process.env.LOCALAPPDATA || '';
const app = [
  process.argv[2],
  path.join(home, 'Programs/VSCodium/resources/app'),
  path.join(home, 'Programs/Microsoft VS Code/resources/app'),
  '/usr/share/codium/resources/app', '/usr/share/code/resources/app',
  '/Applications/VSCodium.app/Contents/Resources/app', '/Applications/Visual Studio Code.app/Contents/Resources/app',
].find(p => p && fs.existsSync(path.join(p, 'out/vs/workbench/workbench.desktop.main.js')));

if (!app) {
  console.log('keys: skipped (no VS Code / VSCodium install found, pass its resources/app path)');
} else {
  // workbench colors live in the main bundle; git/testing etc. come from built-in extensions' package.json
  let known = fs.readFileSync(path.join(app, 'out/vs/workbench/workbench.desktop.main.js'), 'utf8');
  for (const ext of fs.readdirSync(path.join(app, 'extensions'))) {
    const pkg = path.join(app, 'extensions', ext, 'package.json');
    if (fs.existsSync(pkg)) known += fs.readFileSync(pkg, 'utf8');
  }
  const unknown = Object.keys(t.colors).filter(k => !known.includes(`"${k}"`) && !known.includes(`'${k}'`));
  unknown.forEach(k => { bad++; console.log(`UNKNOWN KEY  ${k}`); });
  console.log(`keys: ${Object.keys(t.colors).length} checked against ${app}`);
}

console.log(bad ? `${bad} problem(s)` : 'all good');
process.exit(bad ? 1 : 0);

<h1 align="center">⚔ Drakkar Black Ops</h1>
<p align="center"><i>A true full black theme. No gray pretending to be black.</i></p>

Most "dark" themes are dark gray (`#1E1E1E`, `#121212`) with a black label. **Drakkar Black Ops** is `#000000` on every surface: editor, sidebar, panels, terminal, menus, popups and notifications. Built for OLED screens, late nights and anyone who wants the darkest editor possible.

Works on **VS Code** and **VSCodium**.

## Highlights
- **Pure black everywhere.** Areas are separated by thin `#1A1A1A` borders instead of gray fills.
- **No glare.** Text is capped at `#D4D4D4`. Bright white on pure black tires your eyes.
- **Silver-ice signature.** `#9AA5B1` marks what has focus: cursor, active tab, badges and progress bar.
- **Readable syntax.** Contrast is checked against black: nothing below 4.5:1, nothing glaring above 15:1.
- **Consistent everywhere.** Semantic highlighting, terminal ANSI colors, diff, merge conflicts, debug and git decorations all use the same palette.
- **Tuned for real code.** Extra rules for HTML/JSX, Python, Rust, CSS, Markdown and shell.

## Install
**VS Code:** search for `Drakkar Black Ops` in the Extensions view, or run:
```sh
code --install-extension joaomgueiros.drakkar-black-ops
```

**VSCodium:** search for `Drakkar Black Ops` in the Extensions view (Open VSX), or run:
```sh
codium --install-extension joaomgueiros.drakkar-black-ops
```

**Activate:** press `Ctrl+K Ctrl+T` (`Cmd+K Cmd+T` on macOS) and choose **Drakkar Black Ops - Full Black**.

## Palette
| Role | Color |
|---|---|
| Background | `#000000` |
| Borders | `#1A1A1A` |
| Text | `#C5C8CC` |
| Drakkar signature | `#9AA5B1` |
| Keywords | `#F97583` |
| HTML / JSX tags | `#F97583` |
| Functions / types | `#B392F0` |
| Constants / decorators | `#79B8FF` |
| Strings | `#FFAB70` |
| Parameters | `#FF9800` |
| Comments | `#848D97` |

## Recommended settings
### Terminal
By default the terminal draws bold text in bright colors and brightens colors it thinks are too dark. To keep the theme colors as designed:
```json
"terminal.integrated.drawBoldTextInBrightColors": false,
"terminal.integrated.minimumContrastRatio": 1
```

### Indent Rainbow
The [Indent Rainbow](https://open-vsx.org/extension/oderwat/indent-rainbow) default colors are almost invisible on pure black. Palette-matched colors:
```json
"indentRainbow.colors": [
    "rgba(179,146,240,0.16)",
    "rgba(121,184,255,0.16)",
    "rgba(255,171,112,0.16)",
    "rgba(249,117,131,0.16)"
]
```

## Privacy & security
- No network access, no telemetry, no dependencies.
- The only code is a status bar label. It reads one setting (`workbench.colorTheme`) and nothing else.
- Runs only on your local machine, never on remote SSH/WSL/container hosts, and works in Restricted Mode.

## FAQ
**A file shows up with no colors at all.**
The editor turns off syntax highlighting for files over 20 MB and for lines over 20,000 characters. This happens with every theme. To force it on large files, set `"editor.largeFileOptimizations": false`. Expect the editor to be slower.

**What is the `⚔ Drakkar` in the status bar?**
It is the theme's signature. It only appears while Drakkar Black Ops is the active theme.

---
<p align="center">⚔ Made by <b>joaom.gueiros</b></p>

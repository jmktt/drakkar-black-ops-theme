# Changelog

## [0.1.1]
### Fixed
- Two color keys the editor does not recognize (`activityBar.activeForeground`, `testing.message.error.decorationForeground`) replaced with the correct ones.
- Activity bar placed at the top (`workbench.activityBar.location: "top"`) now follows the theme, with the silver-ice active border.

### Added
- Colors for input validation, error/warning peek (F8), secondary and extension buttons, status bar error/warning items, terminal search, unfocused tabs, minimap and scrollbar markers, menus, toolbars, chat and inline chat.
- `check-theme.js`: checks contrast against black and flags color keys unknown to the installed VS Code / VSCodium.

### Security
- Runs only on the local UI (`extensionKind: ["ui"]`), never on remote SSH/WSL/container hosts.
- Declares support for Restricted Mode and virtual workspaces: the theme needs no workspace trust.

## [0.1.0]
First release of **Drakkar Black Ops**.

- Pure `#000000` on every surface: editor, sidebar, panels, terminal, widgets, menus and notifications.
- Thin `#1A1A1A` borders instead of gray fills to separate areas.
- Silver-ice `#9AA5B1` signature on cursor, active tab, badges and progress bar.
- Text capped at `#D4D4D4` to avoid glare on pure black.
- Syntax palette with semantic highlighting, plus tuned rules for HTML/JSX, Python, Rust, CSS, Markdown and shell.
- Palette-matched terminal ANSI colors, diff, merge, debug, testing, notebooks, Source Control graph, Settings editor and git decorations.
- `⚔ Drakkar` signature in the status bar while the theme is active.

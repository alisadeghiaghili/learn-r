# learn-r — Design Spec

Interactive R visualizer, sandbox, and level game in the browser powered by real R in WebAssembly.
Architecturally and aesthetically aligned with `learn-dvc`.

## Style Anchor

- **Product genre**: Terminal-native learning game for statistical computing and data science.
- **Visual identity**: Dark terminal chrome paired with live environment state panels and plot stage.
- **R branding**: Uses official R brand blue (`#276DC3`) as the signature accent.

## Palette Tokens

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#0E1318` | App background, terminal log well |
| `--panel` | `#182029` | Toolbar, dock, cards |
| `--panel-2` | `#22303C` | Hover states, chips, nested panels |
| `--line` | `#2E3D4D` | Hairline borders |
| `--haze` | `#8FA0B2` | Secondary text, inactive markers |
| `--text` | `#E8EEF4` | Primary text |
| `--dvc` | `#276DC3` | Brand accent (R blue) |
| `--ok` | `#34D399` | Success, passed checks |
| `--warn` | `#FBBF24` | Hints, par indicators |
| `--err` | `#F87171` | Errors, failed checks |
| `--code` | `#60A5FA` | Variables, class/type labels |

## Typography

- **UI**: `"Segoe UI", system-ui, -apple-system, sans-serif`
- **Mono**: `"Cascadia Code", Consolas, ui-monospace, monospace`

## Layout System

```
┌──────────────────────────────────────────────────────────────┐
│ Toolbar: LearnR · Level Title · Lang · Nav Drawer            │
├──────────────────────────────────────────────┬───────────────┤
│ APP MAIN                                     │ RIGHT DOCK    │
│  [ Environment Cards ]  |  [ Plot Stage ]    │ Level Brief   │
│ ──────────────────────────────────────────── │ Target Goal   │
│  [ Optional Multi-line Script Editor ]       │ Live Checks   │
│ ──────────────────────────────────────────── │ Hint Drawer   │
│  Interactive Terminal (R > )                 │ Actions       │
└──────────────────────────────────────────────┴───────────────┘
```

- Desktop (>900px): Two-column grid (`minmax(0, 1fr) minmax(300px, 360px)`).
- Mobile (<=900px): Responsive vertical stacking; navigation collapses into hamburger drawer; dock remains accessible.

## Architecture

- **Engine**: WebR (WASM) pinned to v0.6.0. Robust execution loop using `on.exit()` to safeguard stdout/stderr redirection and graphics devices.
- **Check Evaluator**: Pure TypeScript evaluation supporting R boolean expressions, stdout matching, plot canvas verification, and code pattern AST/regex checks.
- **Build**: Vite + TypeScript 5.8+ + Vitest.
- **Localization**: Bilingual i18n support (English and Persian with automated RTL adjustments).
- **CI/CD**: GitHub Actions automated pipeline deploying `dist/` to GitHub Pages.

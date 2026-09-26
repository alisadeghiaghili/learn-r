# learn-r — Design Notes

Internal design document for the interactive R learning game.

## Product frame

learnGitBranching works because it makes an invisible graph visible and then
games the player into manipulating that graph. Porting the *shell* of LGB
(terminal + levels + golf + undo) without a matching visual subject would
produce a weaker product.

R's invisible state is the environment: vectors, lists, data frames, functions,
and the plots they produce. learn-r therefore pairs an LGB-style command loop
with a live **Environment tree** and a **Plot stage** — the analog of LGB's
commit graph.

Not a clone of RStudio. Not a video course. A sandbox game with levels.

## Style anchor

Dark terminal-game chrome (LGB) crossed with RStudio's object browser panels.
Feels like a coding bootcamp arcade, not a SaaS dashboard.

## Palette

| Token | Hex | Role |
|-------|-----|------|
| bg | `#0B0E14` | app background |
| surface | `#121722` | stage / editor well |
| panel | `#1A2233` | side panels |
| line | `#2C3750` | hairline borders |
| ink | `#E8EDF7` | primary text |
| muted | `#8B97B0` | secondary text |
| accent | `#276DC3` | R brand blue — primary actions |
| accent-2 | `#61A8E8` | focus rings, links |
| ok | `#3DDC97` | success, solved |
| warn | `#E0B44E` | hints, par markers |
| err | `#F2746B` | errors |
| golf | `#C792EA` | stroke / golf score |

No gradients as decoration. No cream, no terracotta, no acid-green terminal.

## Typography

- UI / display: `"Segoe UI Variable Text", "Segoe UI", system-ui, sans-serif`
- Mono (code, env tree, console): `"Cascadia Mono", "Cascadia Code", "JetBrains Mono", Consolas, monospace`
- Scale: 12 · 13 · 14 · 16 · 20 · 28
- Weights: 400 body, 600 headings, 700 level-clear only
- Code line-height 1.55; UI 1.45

## Layout

Desktop grid, three columns, full viewport height:

```
┌──────────────────────────────────────────────────────────────┐
│  header: learn-r · mode · strokes · undo · reset · help      │
├──────────┬───────────────────────────────────┬───────────────┤
│ levels   │  Environment  |  Plot             │  brief        │
│ rail     ├───────────────────────────────────┤  checks       │
│          │  editor (mono)                    │  hint         │
│          ├───────────────────────────────────┤               │
│          │  console                          │               │
└──────────┴───────────────────────────────────┴───────────────┘
```

- Spacing rhythm: 4 / 8 / 12 / 16 / 24
- Panel padding 12–16px; stage gaps 0 (shared hairlines)
- Max density: no nested cards. Panels are flat regions with 1px `line`.
- Mobile (< 900px): stack; tabs switch Brief / Env / Plot / Console

## Motion

- One signature: newly created environment objects pulse a soft accent glow once.
- Level-clear overlay: scrim + score (strokes vs par). No confetti.
- Hover/focus transitions 120ms. Respect `prefers-reduced-motion`.

## Signature moments

1. Env tree pulse on object creation — the "commit appeared" feeling.
2. Level clear with golf score: `3 strokes · par 2`.

## Architecture

```
index.html          shell, no build step
styles/main.css     tokens + layout
js/main.js          app bootstrap, command loop
js/runtime.js       WebR wrapper (eval, snapshot, plots, undo replay)
js/levels.js        level definitions (data only)
js/checks.js        pure check evaluation helpers
js/visualizer.js    Environment tree + Plot stage render
js/ui.js            DOM helpers, overlays, sidebar
tests/              node:test pure-logic tests
```

- 100% client-side. Real R via WebR (WebAssembly). No backend.
- Undo = reset env to setup + replay remaining strokes. Correct by construction.
- Level checks are declarative R expressions or stdout predicates.
- Golf = number of submitted strokes (Run), not characters.

## Curriculum (Foundations)

| # | Id | Teaches | Par |
|---|----|---------|-----|
| 1 | hello | `print`, strings | 1 |
| 2 | numbers | arithmetic, `sqrt` | 1 |
| 3 | vectors | `c()`, `length` | 1 |
| 4 | indexing | `[`, positions | 1 |
| 5 | logic | logical vectors, subset | 2 |
| 6 | lists | `list`, `$` | 2 |
| 7 | data-frame | `data.frame`, columns | 2 |
| 8 | functions | `function`, `return` | 2 |
| 9 | apply | `sapply` / `vapply` | 2 |
| 10 | pipe | `|>` | 2 |
| 11 | plot | base graphics | 2 |
| 12 | capstone | combined recipe | 4 |

## Writing voice

English UI copy. Short, active, imperative. No jokes, no filler.
Errors state what broke and what to do next.

## Out of scope (v1)

- Level builder UI / gist import
- Multiplayer, accounts, leaderboards
- tidyverse as default path (base R only in Foundations)
- Translated UI (Persian locale later)

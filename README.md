# learn-r

Interactive R visualizer, sandbox, and level game in the browser powered by real R in WebAssembly.
Inspired by [learnGitBranching](https://github.com/pcottle/learnGitBranching) and structured like [learn-dvc](https://github.com/alisadeghiaghili/learn-dvc):
an interactive terminal loop, a live environment and plot board, bilingual interface support, and golf-scored levels.

**Live:** https://alisadeghiaghili.github.io/learn-r/

The visualization subject is R's environment — atomic vectors, lists, data frames, functions, and graphics.

## Quick Start

```bash
npm install
npm run dev
```

GitHub Pages deploys automatically from `main` via `.github/workflows/deploy-pages.yml` (builds `dist/`, runs Vitest suite, and publishes artifact).

Production build and test:

```bash
npm run build
npm test
```

## How to play

1. Enter R expressions in the interactive terminal prompt (`R >`) or open the **Script Editor** (Ctrl/Cmd+Enter).
2. Watch the **Environment** and **Plot Canvas** tabs update after every stroke.
3. Open **Levels** from the toolbar (or type `levels`). Beat **par** with fewer strokes.

Useful commands inside the terminal:

| Command | Effect |
|---|---|
| `levels` | Open the level catalog |
| `lesson` | View detailed explanation for current level |
| `hint` | Reveal level hint |
| `show solution` | Display target solution |
| `undo` | Remove last stroke |
| `reset` | Clear the environment and restart level |
| `sandbox` | Free exploration mode |
| `clear` | Clear the console log |
| `script` | Toggle multi-line R script editor |
| `help` | Command reference |

## Curriculum (Foundations)

Base R:
1. `Hello, R` — `print()` and console output
2. `Numbers & Arithmetic` — numeric calculations and `<-` assignment
3. `Atomic Vectors` — vector creation with `c()` and `length()`
4. `1-Based Indexing` — positional subsetting (`[1]`, `[2]`)
5. `Logical Subsetting` — boolean filtering
6. `Heterogeneous Lists` — mixed-type lists and `$` access
7. `Data Frames` — 2D tabular datasets
8. `Custom Functions` — `function(x)` definitions and return values
9. `Functional Mapping` — `sapply()` iterators
10. `Native Pipe |>` — forward piping
11. `Base Graphics` — built-in `plot()` graphics
12. `Capstone Challenge` — comprehensive data workflow

## Architecture

```
src/
  engine/         # WebR runtime wrapper, declarative checks, type definitions
  levels/         # Curated level catalog and pedagogical checks
  i18n/           # English and Persian localization
  ui/             # App shell, board visualizer, terminal, script editor, modal dialogs
tests/            # Vitest unit test suite (checks, levels, i18n)
.github/
  workflows/      # Automated GitHub Actions deployment pipeline
```

## License

MIT

The R logo (`assets/Rlogo.svg`, `assets/Rlogo.png`) is © The R Foundation,
distributed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/).
Source: https://www.r-project.org/logo/

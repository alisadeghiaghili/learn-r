# learn-r

Interactive R sandbox and level game in the browser. Real R via WebAssembly.
Inspired by [learnGitBranching](https://github.com/pcottle/learnGitBranching):
a command loop, a live visualization of state, and golf-scored levels.

The visualization subject is R's environment — objects, types, and plots —
not a git graph.

## Run

Open `index.html` in a modern browser (network required once for the WebR
runtime). For local serving with correct module resolution:

```bash
python -m http.server 5177
# then http://localhost:5177/
```

## How to play

1. Write R in the editor and press **Run** (Ctrl/Cmd+Enter).
2. Watch the **Environment** tab and **Plot** tab update after each stroke.
3. Open **levels** from the rail (or type `levels`). Beat **par** with fewer strokes.

Commands (type in the editor):

| Command | Effect |
|---------|--------|
| `levels` | list lessons |
| `hint` | show the level hint |
| `undo` | remove last stroke |
| `reset` | clear the environment |
| `sandbox` | free session |
| `next` / `prev` | move between levels |
| `help` | command reference |

## Curriculum (Foundations)

Base R only: vectors, indexing, logic, lists, data frames, functions,
`apply`, native pipe `|>`, base graphics, and a capstone.

## Architecture

```
index.html      shell
styles/         tokens + layout
js/levels.js    level data
js/checks.js    pure check + golf helpers
js/runtime.js   WebR wrapper (file-based parse/eval, undo replay)
js/visualizer.js
js/ui.js
js/main.js      command loop
tests/          node:test pure-logic tests
```

Undo is replay-based: setup + remaining strokes. Correct by construction.

## Tests

```bash
node --test tests/checks.test.js
```

End-to-end smoke (needs a local server and `puppeteer-core`):

```bash
python -m http.server 5177
npm install puppeteer-core --no-save
node scripts/smoke.mjs http://127.0.0.1:5177/
```

## Share a level

`index.html?level=hello` opens that level. Optional deeper sharing (encoded
strokes) is intentionally deferred.

## License

MIT

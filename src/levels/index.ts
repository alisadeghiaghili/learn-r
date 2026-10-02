import type { LevelDef, SeriesDef } from '../engine/types';

export const SERIES: SeriesDef[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    description: 'Core concepts of R: vectors, subsetting, functions, pipelines, and graphics.',
  },
];

export const allLevels: LevelDef[] = [
  {
    id: 'hello',
    seriesId: 'foundations',
    title: 'Hello, R',
    brief: 'R prints evaluated values to the console. Create a character string and print it.',
    goal: 'print("Hello, R!")',
    setup: '',
    par: 1,
    difficulty: 1,
    checks: [
      {
        type: 'stdout',
        match: 'Hello, R!',
        label: 'Console output contains "Hello, R!"',
      },
    ],
    hint: 'Use print() with a double-quoted string: print("Hello, R!")',
    lesson: `### Welcome to R

R is a premier statistical computing and data science environment.

Expressions typed in the console are evaluated immediately and the resulting object is displayed:

\`\`\`r
print("Hello, R!")
\`\`\`

Press **Run** or use **Ctrl / Cmd + Enter** to execute.
`,
  },
  {
    id: 'numbers',
    seriesId: 'foundations',
    title: 'Numbers & Arithmetic',
    brief: 'R excels as an interactive calculator. Compute the square root of 144 and assign it to root.',
    goal: 'root <- sqrt(144)',
    setup: '',
    par: 1,
    difficulty: 1,
    checks: [
      {
        type: 'eval',
        expr: 'exists("root", envir = .GlobalEnv, inherits = FALSE)',
        label: 'Variable root exists in the environment',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(root, 12))',
        label: 'root equals 12',
      },
    ],
    hint: 'In R, the assignment operator is <-. Use root <- sqrt(144)',
    lesson: `### Assignment in R

In R, the standard idiomatic assignment operator is \`<-\` (less-than followed by a hyphen).

\`\`\`r
root <- sqrt(144)
\`\`\`

Built-in mathematical functions like \`sqrt()\`, \`log()\`, and \`abs()\` operate directly on numeric scalars and vectors.
`,
  },
  {
    id: 'vectors',
    seriesId: 'foundations',
    title: 'Atomic Vectors',
    brief: 'c() combines values into a vector. Construct nums with 2, 4, 6, 8 and store its length in n.',
    goal: 'nums <- c(2, 4, 6, 8)\nn <- length(nums)',
    setup: '',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'is.numeric(nums) && length(nums) == 4',
        label: 'nums is a numeric vector of length 4',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(nums), c(2, 4, 6, 8)))',
        label: 'nums holds 2, 4, 6, 8',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(n), 4))',
        label: 'n holds the length 4',
      },
    ],
    hint: 'Combine both lines in your editor and Run once to hit par 1.',
    lesson: `### Vectors

The vector is the basic data structure in R. Even a single number is a vector of length 1.

Use \`c()\` (combine) to create vectors:

\`\`\`r
nums <- c(2, 4, 6, 8)
n <- length(nums)
\`\`\`
`,
  },
  {
    id: 'indexing',
    seriesId: 'foundations',
    title: '1-Based Indexing',
    brief: 'R indices start at 1 (not 0). Extract the 2nd element of letters_abc into pick.',
    goal: 'pick <- letters_abc[2]',
    setup: 'letters_abc <- c("a", "b", "c")',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(pick, "b"))',
        label: 'pick holds "b"',
      },
      {
        type: 'eval',
        expr: 'length(pick) == 1',
        label: 'pick has length 1',
      },
    ],
    hint: 'Use square brackets: letters_abc[2].',
    lesson: `### 1-Based Indexing

Unlike languages with zero-based indexing (C, Python), R positions start at 1:

\`\`\`r
letters_abc[1] # "a"
letters_abc[2] # "b"
\`\`\`
`,
  },
  {
    id: 'logic',
    seriesId: 'foundations',
    title: 'Logical Subsetting',
    brief: 'Filter vectors using boolean conditions. From scores, keep values strictly greater than 80 in high.',
    goal: 'high <- scores[scores > 80]',
    setup: 'scores <- c(55, 91, 77, 88, 64)',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(high), c(91, 88)))',
        label: 'high contains 91 and 88',
      },
      {
        type: 'eval',
        expr: 'length(high) == 2',
        label: 'high has length 2',
      },
    ],
    hint: 'scores > 80 produces TRUE/FALSE values. Use it inside [ ].',
    lesson: `### Vectorized Conditions

Comparison operators in R evaluate across the entire vector at once, returning a logical vector:

\`\`\`r
scores > 80
# FALSE  TRUE FALSE  TRUE FALSE
\`\`\`

Indexing with this boolean mask selects only the elements where the condition is TRUE:

\`\`\`r
high <- scores[scores > 80]
\`\`\`
`,
  },
  {
    id: 'lists',
    seriesId: 'foundations',
    title: 'Heterogeneous Lists',
    brief: 'Lists store mixed data types. Create profile with name = "ada" and year = 1815, then extract the name into who.',
    goal: 'profile <- list(name = "ada", year = 1815)\nwho <- profile$name',
    setup: '',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'is.list(profile) && isTRUE(all.equal(profile$name, "ada"))',
        label: 'profile is a list with name "ada"',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(profile$year), 1815))',
        label: 'profile$year is 1815',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(who, "ada"))',
        label: 'who holds "ada"',
      },
    ],
    hint: 'Construct using list(...) and access components with $.',
    lesson: `### Lists

Unlike atomic vectors, lists can hold components of different classes and types:

\`\`\`r
profile <- list(name = "ada", year = 1815)
who <- profile$name
\`\`\`
`,
  },
  {
    id: 'data-frame',
    seriesId: 'foundations',
    title: 'Data Frames',
    brief: 'A data frame is a 2D table composed of equal-length columns. Create df with city and pop, then assign df$pop to pop_col.',
    goal: 'df <- data.frame(city = c("A", "B"), pop = c(10, 20))\npop_col <- df$pop',
    setup: '',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'is.data.frame(df) && nrow(df) == 2 && ncol(df) == 2',
        label: 'df is a 2 × 2 data frame',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(df$pop), c(10, 20)))',
        label: 'df$pop holds 10 and 20',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(pop_col), c(10, 20)))',
        label: 'pop_col holds 10 and 20',
      },
    ],
    hint: 'data.frame(city = c("A", "B"), pop = c(10, 20))',
    lesson: `### Data Frames

Data frames represent tabular datasets where each column can have a distinct type, but all columns must share equal row count:

\`\`\`r
df <- data.frame(city = c("A", "B"), pop = c(10, 20))
pop_col <- df$pop
\`\`\`
`,
  },
  {
    id: 'functions',
    seriesId: 'foundations',
    title: 'Custom Functions',
    brief: 'Define a function double(x) that returns 2 * x. Then call twice <- double(21).',
    goal: 'double <- function(x) {\n  2 * x\n}\ntwice <- double(21)',
    setup: '',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'is.function(double)',
        label: 'double is a function',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(double(21), 42)) && isTRUE(all.equal(double(0), 0)) && isTRUE(all.equal(double(-4), -8))',
        label: 'double(x) correctly doubles any input number',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(twice, 42))',
        label: 'twice equals 42',
      },
    ],
    hint: 'In R, the last evaluated expression inside a function is returned implicitly.',
    lesson: `### Functions

Functions are first-class citizens in R created with the \`function\` keyword:

\`\`\`r
double <- function(x) {
  2 * x
}
twice <- double(21)
\`\`\`
`,
  },
  {
    id: 'apply',
    seriesId: 'foundations',
    title: 'Functional Mapping (sapply)',
    brief: 'Use sapply to transform each element of 1:5 by squaring it into sq.',
    goal: 'sq <- sapply(1:5, function(x) x^2)',
    setup: '',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'pattern',
        pattern: /\\bsapply\\b/,
        label: 'sapply is explicitly used in your code',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(sq), c(1, 4, 9, 16, 25)))',
        label: 'sq holds 1, 4, 9, 16, 25',
      },
    ],
    hint: 'sapply(1:5, function(x) x^2)',
    lesson: `### The Apply Family

While vectorized arithmetic is standard in R, functional iterators like \`sapply\` and \`lapply\` apply a custom function across elements of a vector or list:

\`\`\`r
sq <- sapply(1:5, function(x) x^2)
\`\`\`
`,
  },
  {
    id: 'pipe',
    seriesId: 'foundations',
    title: 'Native Pipe |>',
    brief: 'Thread 1:10 directly into mean() using the native pipe operator |> and assign to total.',
    goal: 'total <- 1:10 |> mean()',
    setup: '',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'pattern',
        pattern: /\\|>/,
        label: 'Native pipe |> is used in your code',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(total), 5.5))',
        label: 'total equals 5.5',
      },
    ],
    hint: 'Use the two-character operator: 1:10 |> mean()',
    lesson: `### The Native Pipe Operator

Introduced in R 4.1.0, the native pipe \`|>\` feeds the value from the left-hand side as the first argument to the right-hand function:

\`\`\`r
1:10 |> mean()
\`\`\`
`,
  },
  {
    id: 'plot',
    seriesId: 'foundations',
    title: 'Base Graphics',
    brief: 'Draw a plot of x (1:10) against y (x^2) using base R plot().',
    goal: 'x <- 1:10\ny <- x^2\nplot(x, y)',
    setup: '',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'plot',
        label: 'A graphic plot was rendered to the canvas',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(x), 1:10)) && isTRUE(all.equal(as.numeric(y), (1:10)^2))',
        label: 'Variables x and y match 1:10 and x^2',
      },
    ],
    hint: 'Call plot(x, y) after defining vectors x and y.',
    lesson: `### Base R Graphics

R features a fast, built-in graphics engine:

\`\`\`r
x <- 1:10
y <- x^2
plot(x, y)
\`\`\`

Watch the **Plot** tab on the visualizer board update automatically!
`,
  },
  {
    id: 'capstone',
    seriesId: 'foundations',
    title: 'Capstone Challenge',
    brief: 'Combine everything: create a data frame df with columns n (1:5) and sq (n^2), compute avg_sq as the mean of sq, and draw a plot of df$n vs df$sq.',
    goal: 'n <- 1:5\nsq <- n^2\ndf <- data.frame(n = n, sq = sq)\navg_sq <- mean(df$sq)\nplot(df$n, df$sq)',
    setup: '',
    par: 1,
    difficulty: 4,
    checks: [
      {
        type: 'eval',
        expr: 'is.data.frame(df) && nrow(df) == 5',
        label: 'df is a data frame with 5 rows',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(df$sq), c(1, 4, 9, 16, 25)))',
        label: 'df$sq holds the squared numbers',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(avg_sq), 11))',
        label: 'avg_sq equals 11',
      },
      {
        type: 'plot',
        label: 'The final scatter plot was rendered',
      },
    ],
    hint: 'Structure your script sequentially and execute with Run.',
    lesson: `### Foundations Capstone

Congratulations on reaching the capstone! Combine vectors, data frames, statistical aggregation, and plotting into a cohesive data workflow.
`,
  },
];

export function getLevel(id: string): LevelDef | null {
  return allLevels.find((level) => level.id === id) ?? null;
}

export function getLevelIndex(id: string): number {
  return allLevels.findIndex((level) => level.id === id);
}

export function getNextLevel(id: string): LevelDef | null {
  const idx = getLevelIndex(id);
  if (idx >= 0 && idx < allLevels.length - 1) {
    return allLevels[idx + 1]!;
  }
  return null;
}

export interface SeriesGroup {
  id: string;
  title: string;
  levels: {
    def: LevelDef;
    displayId: string;
  }[];
}

export function seriesOf(): SeriesGroup[] {
  const groups = [
    {
      id: 'basics',
      title: 'BASICS',
      prefix: 'basics',
      ids: ['hello', 'numbers', 'vectors', 'indexing'],
    },
    {
      id: 'data',
      title: 'DATA STRUCTURES',
      prefix: 'data',
      ids: ['logic', 'lists', 'data-frame'],
    },
    {
      id: 'functions',
      title: 'FUNCTIONS & PIPES',
      prefix: 'func',
      ids: ['functions', 'apply', 'pipe'],
    },
    {
      id: 'graphics',
      title: 'GRAPHICS & CAPSTONE',
      prefix: 'viz',
      ids: ['plot', 'capstone'],
    },
  ];

  return groups.map((g) => ({
    id: g.id,
    title: g.title,
    levels: g.ids
      .map((id, idx) => {
        const def = getLevel(id);
        if (!def) return null;
        return {
          def,
          displayId: `${g.prefix}-${idx + 1}`,
        };
      })
      .filter((item): item is { def: LevelDef; displayId: string } => item !== null),
  }));
}

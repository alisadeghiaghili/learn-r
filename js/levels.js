/**
 * Level catalog for learn-r Foundations.
 *
 * Each level is data only. Checks run against the live WebR session
 * after every stroke. `par` is the golf target (minimum strokes).
 */

export const LEVELS = [
  {
    id: "hello",
    title: "Hello, R",
    brief:
      "R prints values when you evaluate them. Create a character string and print it.",
    goal: 'print("Hello, R!")',
    setup: "",
    par: 1,
    checks: [
      {
        type: "stdout",
        match: "Hello, R!",
        label: "Console shows Hello, R!",
      },
    ],
    hint: "Use print() with a double-quoted string.",
  },
  {
    id: "numbers",
    title: "Numbers",
    brief:
      "R is a calculator first. Compute the square root of 144 and store it in root.",
    goal: "root <- sqrt(144)",
    setup: "",
    par: 1,
    checks: [
      {
        type: "eval",
        expr: 'exists("root")',
        label: "Object root exists",
      },
      {
        type: "eval",
        expr: "isTRUE(all.equal(root, 12))",
        label: "root equals 12",
      },
    ],
    hint: "Assign with <-. sqrt() takes one number.",
  },
  {
    id: "vectors",
    title: "Vectors",
    brief:
      "c() concatenates values into a vector. Build nums with 2, 4, 6, 8 and store its length in n.",
    goal: "nums <- c(2, 4, 6, 8)\nn <- length(nums)",
    setup: "",
    par: 1,
    checks: [
      {
        type: "eval",
        expr: "is.numeric(nums) && length(nums) == 4",
        label: "nums is a numeric vector of length 4",
      },
      {
        type: "eval",
        expr: "isTRUE(all.equal(as.numeric(nums), c(2, 4, 6, 8)))",
        label: "nums holds 2, 4, 6, 8",
      },
      {
        type: "eval",
        expr: "isTRUE(all.equal(n, 4L)) || isTRUE(all.equal(n, 4))",
        label: "n is 4",
      },
    ],
    hint: "You can put both lines in one Run. length() returns the count.",
  },
  {
    id: "indexing",
    title: "Indexing",
    brief:
      "Positions start at 1. Subset letters_abc so pick holds only the second element.",
    goal: "letters_abc <- c(\"a\", \"b\", \"c\")\npick <- letters_abc[2]",
    setup: 'letters_abc <- c("a", "b", "c")',
    par: 1,
    checks: [
      {
        type: "eval",
        expr: 'isTRUE(all.equal(pick, "b"))',
        label: 'pick is "b"',
      },
      {
        type: "eval",
        expr: "length(pick) == 1",
        label: "pick has length 1",
      },
    ],
    hint: "Single square brackets with a position: x[2].",
  },
  {
    id: "logic",
    title: "Logical subset",
    brief:
      "A logical vector can filter. From scores, keep values greater than 80 into high.",
    goal: "scores <- c(55, 91, 77, 88, 64)\nhigh <- scores[scores > 80]",
    setup: "scores <- c(55, 91, 77, 88, 64)",
    par: 2,
    checks: [
      {
        type: "eval",
        expr: "isTRUE(all.equal(as.numeric(high), c(91, 88)))",
        label: "high holds 91 and 88",
      },
      {
        type: "eval",
        expr: "length(high) == 2",
        label: "high has length 2",
      },
    ],
    hint: "scores > 80 is a logical vector. Use it inside [ ].",
  },
  {
    id: "lists",
    title: "Lists",
    brief:
      "Lists can mix types. Build profile as a list with name = \"ada\" and year = 1815, then put the name in who.",
    goal: 'profile <- list(name = "ada", year = 1815)\nwho <- profile$name',
    setup: "",
    par: 2,
    checks: [
      {
        type: "eval",
        expr: 'is.list(profile) && isTRUE(all.equal(profile$name, "ada"))',
        label: 'profile$name is "ada"',
      },
      {
        type: "eval",
        expr: "isTRUE(all.equal(profile$year, 1815)) || isTRUE(all.equal(profile$year, 1815L))",
        label: "profile$year is 1815",
      },
      {
        type: "eval",
        expr: 'isTRUE(all.equal(who, "ada"))',
        label: 'who is "ada"',
      },
    ],
    hint: 'list(name = "ada", year = 1815). Extract with $.',
  },
  {
    id: "data-frame",
    title: "Data frames",
    brief:
      "A data frame is a list of equal-length columns. Create df with city and pop, then store the pop column in pop_col.",
    goal:
      'df <- data.frame(city = c("A", "B"), pop = c(10, 20))\npop_col <- df$pop',
    setup: "",
    par: 2,
    checks: [
      {
        type: "eval",
        expr: "is.data.frame(df) && nrow(df) == 2 && ncol(df) == 2",
        label: "df is a 2 × 2 data frame",
      },
      {
        type: "eval",
        expr: "isTRUE(all.equal(as.numeric(df$pop), c(10, 20)))",
        label: "df$pop holds 10 and 20",
      },
      {
        type: "eval",
        expr: "isTRUE(all.equal(as.numeric(pop_col), c(10, 20)))",
        label: "pop_col holds 10 and 20",
      },
    ],
    hint: "data.frame(city = ..., pop = ...). Column extract is the same as lists.",
  },
  {
    id: "functions",
    title: "Functions",
    brief:
      "Define double so double(x) returns 2 * x. Then compute twice <- double(21).",
    goal: "double <- function(x) {\n  2 * x\n}\ntwice <- double(21)",
    setup: "",
    par: 2,
    checks: [
      {
        type: "eval",
        expr: "isTRUE(all.equal(double(21), 42))",
        label: "double(21) is 42",
      },
      {
        type: "eval",
        expr: "isTRUE(all.equal(twice, 42))",
        label: "twice is 42",
      },
    ],
    hint: "function(x) { ... } is an expression. Assign it to double.",
  },
  {
    id: "apply",
    title: "Apply",
    brief:
      "Map a function over a vector with sapply. Compute squares of 1:5 into sq.",
    goal: "sq <- sapply(1:5, function(x) x^2)",
    setup: "",
    par: 2,
    checks: [
      {
        type: "eval",
        expr: "isTRUE(all.equal(as.numeric(sq), c(1, 4, 9, 16, 25)))",
        label: "sq is 1 4 9 16 25",
      },
    ],
    hint: "sapply(1:5, function(x) x^2). 1:5 is the sequence 1..5.",
  },
  {
    id: "pipe",
    title: "Pipe",
    brief:
      "The native pipe | > threads a value into the next function. Build total as the mean of 1:10 using the pipe into mean().",
    goal: "total <- 1:10 |> mean()",
    setup: "",
    par: 2,
    checks: [
      {
        type: "eval",
        expr: "isTRUE(all.equal(total, 5.5))",
        label: "total is 5.5",
      },
    ],
    hint: "Use the native pipe: 1:10 |> mean(). The operator is two characters: |>",
  },
  {
    id: "plot",
    title: "Plot",
    brief:
      "Base graphics draw to a device. Plot x = 1:10 against y = x^2 so a plot appears on the Plot tab.",
    goal: "x <- 1:10\ny <- x^2\nplot(x, y)",
    setup: "",
    par: 3,
    checks: [
      {
        type: "plot",
        label: "A plot was drawn",
      },
    ],
    hint: "plot(x, y) with x = 1:10 and y = x^2. You can pass a formula or two vectors.",
  },
  {
    id: "capstone",
    title: "Capstone",
    brief:
      "Combine the pieces. Build a data frame of squares for 1:5, compute mean of the square column as avg_sq, and draw a plot of the square column.",
    goal:
      "n <- 1:5\nsq <- n^2\ndf <- data.frame(n = n, sq = sq)\navg_sq <- mean(df$sq)\nplot(df$n, df$sq)",
    setup: "",
    par: 5,
    checks: [
      {
        type: "eval",
        expr: "is.data.frame(df) && nrow(df) == 5",
        label: "df has 5 rows",
      },
      {
        type: "eval",
        expr: "isTRUE(all.equal(as.numeric(df$sq), c(1, 4, 9, 16, 25)))",
        label: "df$sq holds 1 4 9 16 25",
      },
      {
        type: "eval",
        expr: "isTRUE(all.equal(avg_sq, 11))",
        label: "avg_sq is 11",
      },
      {
        type: "plot",
        label: "A plot was drawn",
      },
    ],
    hint: "Reuse vectors for the data frame. mean(df$sq) then plot(df$n, df$sq).",
  },
];

export function getLevel(id) {
  return LEVELS.find((level) => level.id === id) ?? null;
}

export function levelIndex(id) {
  return LEVELS.findIndex((level) => level.id === id);
}

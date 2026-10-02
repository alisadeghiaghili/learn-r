/**
 * Educational takeaways and production field notes for all R levels,
 * matching the LearnDVC dock layout ("YOU ARE LEARNING" and "IN PRODUCTION").
 */

export interface LevelGuidance {
  learning: string[];
  fieldNotes: string[];
}

export const LEVEL_GUIDANCE: Record<string, LevelGuidance> = {
  hello: {
    learning: [
      'print() displays characters and evaluated objects directly to stdout',
      'Character strings in R can be wrapped in single or double quotes',
      'Expressions typed in the R console evaluate and return immediately',
    ],
    fieldNotes: [
      'Production R scripts running non-interactively via Rscript write standard output to stdout.',
      'Shiny apps and enterprise packages prefer message() or logger packages over bare print().',
    ],
  },
  rstudio: {
    learning: [
      'ls() lists all active object names in the global workspace (.GlobalEnv)',
      'Variables persist in memory throughout the session until rm() or restart',
      'Ctrl + Enter sends code directly from scripts to the execution console',
    ],
    fieldNotes: [
      'Production data pipelines avoid saving .RData workspace images to ensure stateless, reproducible builds.',
      'Package namespaces keep helper functions isolated from the global workspace.',
    ],
  },
  numbers: {
    learning: [
      '%/% performs integer division, discarding any fractional remainder',
      '%% computes the modulo / remainder operation',
      '^ raises numbers to powers in base R',
    ],
    fieldNotes: [
      'Modulo and integer division are standard for dataset batching, pagination, and round-robin workers.',
      'Numeric precision in R follows IEEE 754; use all.equal() instead of == for floating point comparisons.',
    ],
  },
  vectors: {
    learning: [
      'c() combines values into a 1-dimensional atomic vector',
      'matrix() structures elements into a 2D array of fixed rows and columns',
      'byrow = TRUE fills values row-by-row instead of default column-major order',
    ],
    fieldNotes: [
      'Matrices enforce homogeneous data types, allowing vectorized linear algebra at compiled BLAS speeds.',
      'High-performance R routines represent image rasters and graph adjacencies as native matrices.',
    ],
  },
  'data-structures': {
    learning: [
      'factor() encodes categorical variables with discrete defined levels',
      'list() stores heterogeneous elements of mixed types and varying lengths',
      'data.frame is a list of equal-length vectors representing a 2D tabular dataset',
    ],
    fieldNotes: [
      'Statistical modeling functions (lm, glm, randomForest) automatically convert factors to contrast dummy matrices.',
      'Lists are the standard format for configuration trees, model outputs, and parsed JSON objects.',
    ],
  },
  'factors-reorder': {
    learning: [
      'reorder() alters factor levels based on a numerical summary (e.g. median or mean)',
      'levels() reflects categorical display order in base plots and ggplot2 visualizations',
      'Categorical factors govern baseline reference levels in statistical linear models',
    ],
    fieldNotes: [
      'Visualizations sorted by metric order drastically reduce cognitive load compared to arbitrary alphabetical order.',
      'In tidyverse workflows, forcats::fct_reorder() provides equivalent functionality with descending options.',
    ],
  },
  'control-flow': {
    learning: [
      'ifelse() evaluates conditional logic element-wise across entire vectors',
      'Vectorized branching eliminates the need for slow explicit for-loops',
      'Comparison operators (>=, ==, %in%) produce logical mask vectors',
    ],
    fieldNotes: [
      'Vectorized branching in R is orders of magnitude faster than iterative for-loops on large data frames.',
      'In tidyverse workflows, dplyr::case_when() or data.table::fcase() generalize ifelse() for multiple conditions.',
    ],
  },
  functions: {
    learning: [
      'function() defines reusable first-class closures with lexical scoping',
      'sapply() maps a function across vector elements and simplifies the output',
      'R functions return the value of the last evaluated expression automatically',
    ],
    fieldNotes: [
      'The apply family (lapply, sapply, vapply) is the foundation of idiomatic functional programming in R.',
      'Production packages use vapply() when strict return-type safety is required in ETL pipelines.',
    ],
  },
  'type-safe-apply': {
    learning: [
      'vapply() enforces strict type and length verification on every iteration step',
      'FUN.VALUE provides a template specifying the expected return type (e.g. numeric(1))',
      'Prevents silent type-coercion bugs caused by sapply() on empty or variable inputs',
    ],
    fieldNotes: [
      'Enterprise R packages and CRAN guidelines strongly recommend vapply() over sapply() for deterministic pipelines.',
      'In modern tidyverse development, purrr::map_dbl(), map_chr(), and map_lgl() provide similar type safety.',
    ],
  },
  'import-flat': {
    learning: [
      'read.csv() parses comma-delimited tabular text directly into a data.frame',
      'text = argument allows parsing raw in-memory character strings directly',
      'Header rows are automatically converted to column names',
    ],
    fieldNotes: [
      'For large files (>100MB), production teams prefer readr::read_csv() or data.table::fread() for multi-threaded speed.',
      'Setting stringsAsFactors = FALSE ensures character columns are not converted into factors unexpectedly.',
    ],
  },
  'import-excel': {
    learning: [
      'nrow() and ncol() inspect tabular dimensions before processing',
      'mean() and summary() compute descriptive statistics across numeric columns',
      '$ operator extracts specific columns by name as atomic vectors',
    ],
    fieldNotes: [
      'Data quality gates in automated pipelines verify nrow() > 0 and column names before running analytics.',
      'readxl and openxlsx are the industry standard for ingesting multi-sheet Excel workbooks without Java dependencies.',
    ],
  },
  'import-db': {
    learning: [
      'subset() extracts records satisfying compound boolean conditions (&, |)',
      'Relational query logic mimics SQL WHERE clauses directly in R',
      'Logical indexing selects matching rows while preserving column schema',
    ],
    fieldNotes: [
      'In database-backed workflows, dbplyr translates R subset expressions directly into SQL queries pushed down to PostgreSQL or BigQuery.',
      'Indexing and subsetting on filtered columns prevents loading unnecessary rows into RAM.',
    ],
  },
  'import-web': {
    learning: [
      'Web APIs return nested, hierarchical records (JSON or nested lists)',
      'sapply() extracts specific nested attributes across a collection of records',
      'List traversal syntax [[]] and $ extracts values from nested API payloads',
    ],
    fieldNotes: [
      'Production API pipelines use httr2 with exponential backoff retries and jsonlite to ingest remote microservice data.',
      'Nested API responses are often flattened using purrr::map_dfr() or tibble::enframe() for downstream analysis.',
    ],
  },
  rectangling: {
    learning: [
      'Data rectangling transforms hierarchical, nested JSON/lists into 2D tidy data frames',
      'do.call(rbind, lapply(...)) flattens lists of uniform records in base R',
      'Data frames provide column-oriented access for vectorized operations',
    ],
    fieldNotes: [
      'Real-world API responses are almost always nested trees; rectangling is the first step before exploratory analysis.',
      'tidyr provides unnest_wider(), unnest_longer(), and hoist() for complex ragged JSON hierarchies.',
    ],
  },
  'tidy-data': {
    learning: [
      'Missing values are formally represented by the special constant NA',
      'is.na() tests each element for missingness without breaking equality checks',
      'na.omit() removes all incomplete rows containing at least one NA',
    ],
    fieldNotes: [
      'Never use x == NA because NA indicates unknown state and always returns NA; always use is.na(x).',
      'In production ML pipelines, imputation strategies (median, KNN, MICE) are often chosen over brute-force row deletion.',
    ],
  },
  pivoting: {
    learning: [
      'reshape(direction = "long") transforms wide repeated measurement columns into tidy key-value pairs',
      'Tidy datasets require each variable in a column and each observation in a row',
      'Long-format data is mandatory for multivariate ggplot2 aesthetics and grouped summaries',
    ],
    fieldNotes: [
      'Wide tables are convenient for human data entry, but analytical engines require tidy long representations.',
      'In tidyverse code, tidyr::pivot_longer() and pivot_wider() supersede older reshape2/gather functions.',
    ],
  },
  'strings-regex': {
    learning: [
      'gsub() substitutes all pattern occurrences matching regular expressions',
      'Character manipulation operates vector-wise across all elements',
      'Regular expressions normalize dirty identifiers and formatted strings',
    ],
    fieldNotes: [
      'String standardization is the first cleaning step for postal codes, phone numbers, and SKU identifiers.',
      'The stringr package (wrapping libicu) provides UTF-8 safe regex manipulation across operating systems.',
    ],
  },
  dplyr: {
    learning: [
      'The native pipe |> passes the result of the left side as the first argument on the right',
      'Pipes transform nested function calls into readable linear transformation chains',
      'transform() and subset() combine into concise data wrangling steps',
    ],
    fieldNotes: [
      'The base R native pipe |> (introduced in R 4.1+) has zero package dependencies and runs with zero execution overhead.',
      'Chaining verbs like filter, select, and mutate makes code self-documenting and easier to code-review.',
    ],
  },
  joins: {
    learning: [
      'merge() combines two tables based on matching key columns',
      'all.x = TRUE implements a left outer join preserving all primary records',
      'Missing matches in the secondary table are populated with NA',
    ],
    fieldNotes: [
      'Dimensional data modeling relies on left joins from transactional fact tables to master lookup tables.',
      'Ensure join keys have matching data types and contain no unexpected duplicate keys that would cause cartesian explosion.',
    ],
  },
  'anti-joins': {
    learning: [
      'Filtering joins filter observations from one table based on matching keys in another table',
      'Anti-joins identify records in x that have NO matching key in y',
      'Negating %in% with !(x %in% y) provides idiomatic, high-speed anti-join filtering in base R',
    ],
    fieldNotes: [
      'Anti-joins are vital in data engineering for finding orphaned records, churned users, and missing reference codes.',
      'In dplyr, anti_join(x, y, by = "id") explicitly conveys business intent without manual set negation.',
    ],
  },
  datetime: {
    learning: [
      'as.Date() converts character dates into calendar Date objects',
      'Date arithmetic computes durations and day differences directly',
      'Calendar calculations automatically handle leap years and variable month lengths',
    ],
    fieldNotes: [
      'Always specify explicit format strings (e.g. "%Y-%m-%d") to avoid locale-dependent parsing bugs.',
      'In production, timestamps with hours/minutes/seconds should be parsed with as.POSIXct() and fixed to UTC.',
    ],
  },
  'data-table': {
    learning: [
      'aggregate() computes summary metrics grouped by categorical factors',
      'Formula syntax response ~ group specifies dependent and grouping variables',
      'FUN argument defines the aggregation reducer (sum, mean, length)',
    ],
    fieldNotes: [
      'Group aggregations form the core of feature engineering, KPI scorecards, and cohort analysis.',
      'For datasets with millions of rows, data.table syntax DT[, .(total = sum(amount)), by = dept] provides unmatched speed and low memory usage.',
    ],
  },
  'outliers-plots': {
    learning: [
      'IQR() calculates the Interquartile Range (75th percentile minus 25th percentile)',
      'boxplot() visually highlights median, quartiles, and statistical outliers (1.5 * IQR)',
      'Base graphics render instantly without requiring external graphic libraries',
    ],
    fieldNotes: [
      'Outlier detection is critical during Exploratory Data Analysis (EDA) to detect sensor errors or fraud spikes.',
      'Automated pipeline monitors generate boxplots and histograms in CI artifacts to detect data distribution drift.',
    ],
  },
  regression: {
    learning: [
      'lm() fits Ordinary Least Squares (OLS) multiple linear regression models',
      'Formula syntax y ~ x1 + x2 specifies dependent and predictor variables',
      'R-squared measures the proportion of variance in the response explained by predictors',
    ],
    fieldNotes: [
      'Linear regression serves as the foundational baseline model for econometric, financial, and causal inference modeling.',
      'Always inspect diagnostic plots (plot(fit)) in production to check for heteroscedasticity, non-linearity, and high leverage points.',
    ],
  },
  hypothesis: {
    learning: [
      't.test() evaluates statistical differences in means between two groups',
      'p-value < 0.05 indicates statistical significance under the 95% confidence threshold',
      'predict() applies trained models to unseen observation dataframes',
    ],
    fieldNotes: [
      'Hypothesis testing powers modern A/B testing platforms and clinical trial verification.',
      'In production prediction services, ensure newdata schema and factor levels strictly match training specifications.',
    ],
  },
  capstone: {
    learning: [
      'End-to-end analytical pipeline: data cleaning, correlation measurement, and regression modeling',
      'na.omit() prepares real environmental observations by purging missing measurements',
      'abline(lm()) overlays Ordinary Least Squares trendlines on scientific scatter plots',
    ],
    fieldNotes: [
      'Production analytical pipelines combine data cleaning, correlation testing, and regression trendlines into automated Quarto reports.',
      'Always visualize the raw scatter distribution before relying solely on correlation or regression coefficients (Anscombe\'s quartet).',
    ],
  },
  'pkg-anatomy': {
    learning: [
      'The DESCRIPTION file stores formal package metadata using Debian Control Format (DCF)',
      'write.dcf() and read.dcf() format tabular lists into canonical package headers',
      'Package naming rules strictly enforce letters, numbers, and periods starting with a letter',
    ],
    fieldNotes: [
      'In production, usethis::create_package() sets up a standard CRAN-compliant package scaffold in seconds.',
      'Semantic Versioning (MAJOR.MINOR.PATCH) in DESCRIPTION communicates breaking changes to enterprise consumers.',
    ],
  },
  'pkg-deps': {
    learning: [
      'Imports: defines mandatory runtime dependencies installed automatically with your package',
      'Suggests: specifies optional packages for vignettes, examples, or test suites',
      'requireNamespace() checks optional dependency availability without polluting the search path',
    ],
    fieldNotes: [
      'Never call library() or require() inside package functions — it mutates the global search path and fails R CMD check.',
      'Use the double colon operator (pkg::fun) or @importFrom in roxygen to access foreign functions safely.',
    ],
  },
  'pkg-code': {
    learning: [
      'Package functions must remain pure without modifying the user global environment',
      'on.exit(..., add = TRUE) guarantees restoration of options, par, and directories even on errors',
      'Never hardcode setwd() or source() calls inside package code files in R/',
    ],
    fieldNotes: [
      'Always include add = TRUE in on.exit() to prevent accidental overwrites of existing exit handlers.',
      'Using withr functions (like withr::with_options) provides idiomatic scoped state management in modern packages.',
    ],
  },
  'pkg-roxygen': {
    learning: [
      'roxygen2 comments start with #\' and live directly above function definitions',
      'Key tags include @param, @return, @examples, and @export',
      '@export exposes functions to the public package API; omitting it keeps them internal',
    ],
    fieldNotes: [
      'Running devtools::document() generates standardized .Rd manuals in man/ and updates NAMESPACE automatically.',
      'Internal non-exported helper functions can still be accessed for debugging using the triple colon (pkg:::helper).',
    ],
  },
  'pkg-namespace': {
    learning: [
      'The NAMESPACE file controls the public interface and external symbol imports of a package',
      'export() declares functions visible to consumers after library(pkg)',
      'importFrom(pkg, fun) imports individual symbols cleanly without full package collisions',
    ],
    fieldNotes: [
      'Avoid blind import(pkg) directives in NAMESPACE; surgical @importFrom prevents subtle masking bugs across dependencies.',
      'A well-architected NAMESPACE minimizes API surface and makes refactoring internal helpers risk-free.',
    ],
  },
  'pkg-testing': {
    learning: [
      'testthat provides structured unit testing with test_that() blocks and expect_* assertions',
      'expect_equal() tests numeric equality with tolerance for floating point representations',
      'expect_error() verifies that invalid arguments trigger clean, informative error messages',
    ],
    fieldNotes: [
      'Continuous Integration (GitHub Actions) runs devtools::test() on every pull request across Linux, macOS, and Windows.',
      'Aim for high test coverage on critical edge cases, missing data (NA), and boundary conditions.',
    ],
  },
  'pkg-data': {
    learning: [
      'Raw, non-R files (CSVs, JSON, templates) are distributed in the inst/extdata directory',
      'system.file("extdata", ..., package = "pkg") resolves filepaths portably across installed environments',
      'Clean tabular datasets are packaged as binary .rda files in data/ via usethis::use_data()',
    ],
    fieldNotes: [
      'Never rely on relative filepaths in package code; always resolve assets with system.file().',
      'All datasets in data/ must be documented in R/data.R with @docType data and @format tags.',
    ],
  },
  'pkg-check': {
    learning: [
      'R CMD check is the automated quality gate for package completeness, tests, and documentation',
      'The ultimate target for release is: 0 errors | 0 warnings | 0 notes',
      'Checks detect undeclared dependencies, missing documentation arguments, and broken examples',
    ],
    fieldNotes: [
      'Run devtools::check() frequently during development, not just before publishing to CRAN.',
      'Declare global column variables using utils::globalVariables() to satisfy R CMD check in tidyverse pipelines.',
    ],
  },
  'tidy-tibble': {
    learning: [
      'Tibbles enforce strict subsetting and never silently drop dimensions to vectors',
      'Tibbles do not perform partial string matching on column names with $',
      'Printing tibbles shows column types explicitly (<dbl>, <chr>, <int>) and limits row output',
    ],
    fieldNotes: [
      'Tibbles prevent common base R indexing bugs where df[, 1] unexpectedly drops to an atomic vector.',
      'Use as_tibble() to upgrade legacy data.frames without altering underlying column values.',
    ],
  },
  'tidy-dplyr': {
    learning: [
      'dplyr provides five core verbs: filter, select, mutate, arrange, and summarise',
      'Data manipulation pipelines use the pipe operator (|> or %>%) for readable data flows',
      'Expressions inside verbs evaluate within the data frame context using data masking',
    ],
    fieldNotes: [
      'dplyr translates your verbs to SQL behind the scenes when connected to databases via dbplyr.',
      'Always prefer .by over group_by() in modern dplyr 1.1+ for localized, stateless grouping.',
    ],
  },
  'tidy-ggplot2': {
    learning: [
      'The Grammar of Graphics decouples data from aesthetic mappings and geometric representations',
      'Plots are built incrementally using the + operator to stack geom layers and theme scales',
      'aes() maps dataset variables to visual properties like x, y, color, size, and shape',
    ],
    fieldNotes: [
      'Save reusable plot themes with theme_set(theme_minimal()) for publication consistency.',
      'Use ggsave() with explicit width, height, and dpi parameters for reproducible figures.',
    ],
  },
  'tidy-tidyr': {
    learning: [
      'pivot_longer() converts wide messy tables into long tidy datasets with explicit key-value pairs',
      'pivot_wider() reshapes normalized records into wide matrix formats for tabular reporting',
      'Tidy data requires: every variable in a column, every observation in a row, every cell a single value',
    ],
    fieldNotes: [
      'pivot_longer() supersedes legacy gather() and reshape() with clear names_to and values_to arguments.',
      'Use values_drop_na = TRUE in pivot_longer() to strip implicit missing rows during reshaping.',
    ],
  },
  'tidy-stringr': {
    learning: [
      'stringr functions share a consistent str_* prefix and always take the string vector as the first argument',
      'str_detect() returns logical masks for pattern matching without cryptic grep index handling',
      'str_replace_all() performs global regex substitutions predictably across character vectors',
    ],
    fieldNotes: [
      'All stringr functions handle NA values predictably by propagating NA rather than failing.',
      'Wrap patterns in fixed() to search for literal strings without regex interpretation overhead.',
    ],
  },
  'tidy-forcats': {
    learning: [
      'fct_reorder() sorts factor levels according to a secondary numerical variable summary',
      'fct_rev() reverses factor level order to align bar charts and legend hierarchies',
      'fct_lump() groups infrequent categorical levels into an "Other" catch-all category',
    ],
    fieldNotes: [
      'Always order factors before piping into ggplot2 to avoid default alphabetical axis ordering.',
      'Unlike base R factor(), forcats functions never silently drop unobserved levels unless explicitly told.',
    ],
  },
  'tidy-lubridate': {
    learning: [
      'Intuitive helper functions like ymd() and dmy() parse dates without cryptic format strings',
      'floor_date() and ceiling_date() snap timestamps to calendar boundaries (month, week, year)',
      'wday() extracts day-of-week labels and indices accounting for locale differences',
    ],
    fieldNotes: [
      'lubridate distinguishes between Durations (exact physical seconds) and Periods (clock time like 1 month).',
      'Always set tz = "UTC" in production parsing pipelines to avoid daylight saving shift anomalies.',
    ],
  },
  'tidy-purrr': {
    learning: [
      'map_dbl(), map_chr(), and map_lgl() provide strictly typed functional transformations',
      'Unlike sapply(), purrr functions guarantee output type and length or fail immediately',
      'Anonymous functions can be passed using modern R lambda syntax \\(x) or purrr formulas ~',
    ],
    fieldNotes: [
      'Never use sapply() in production packages or scripts; its type instability creates subtle runtime bugs.',
      'Combine purrr::map() with list-columns in tibbles to build powerful nested data modeling workflows.',
    ],
  },
  'adv-memory': {
    learning: [
      'R uses copy-on-modify semantics: objects are only copied when mutated if referenced multiple times',
      'Environments and external pointers have reference semantics and are modified in place',
      'Understanding object sizes and memory allocation prevents unnecessary performance penalties',
    ],
    fieldNotes: [
      'Use tracemem() in interactive sessions to identify exactly when large objects are duplicated.',
      'Pre-allocating vector sizes prevents continuous reallocation and copying during loops.',
    ],
  },
  'adv-environments': {
    learning: [
      'Environments bind names to values and organize scope in a hierarchical tree',
      'Functions remember their enclosing environment, creating stateful closures',
      'The <<- super-assignment operator traverses parent environments to update state in-place',
    ],
    fieldNotes: [
      'Function factories encapsulate state safely without polluting the global workspace (.GlobalEnv).',
      'Avoid parent.env() manipulation in production code; rely on lexical scoping instead.',
    ],
  },
  'adv-conditions': {
    learning: [
      'Conditions in R form an object-oriented hierarchy of messages, warnings, and errors',
      'withCallingHandlers() handles conditions in-place without unwinding the call stack',
      'tryCatch() unwinds the stack to the handling point, ideal for fallback recovery logic',
    ],
    fieldNotes: [
      'Define custom S3 condition classes by subclassing error or warning for fine-grained error catching.',
      'Always include the offending call or argument in error messages to aid debugging.',
    ],
  },
  'adv-s3': {
    learning: [
      'S3 is R’s foundational functional object-oriented programming system',
      'Generic functions use UseMethod() to dispatch to method implementations based on the first argument class',
      'Robust S3 designs use a low-level constructor (new_*), a validator, and a user-friendly helper (*)',
    ],
    fieldNotes: [
      'Never call S3 methods directly (like print.factor()); always call the generic (print()).',
      'Use NextMethod() to delegate to inherited methods along the class hierarchy.',
    ],
  },
  'adv-r6': {
    learning: [
      'R6 provides encapsulated OOP where methods belong directly to objects rather than generics',
      'R6 objects have reference semantics: modifying an object modifies all references without copying',
      'Classes support public and private members, active bindings, and inheritance',
    ],
    fieldNotes: [
      'R6 is the industry-standard OOP system for stateful services, Shiny modules, and API clients.',
      'Implement a $clone(deep = TRUE) method when you explicitly need independent copies of R6 objects.',
    ],
  },
  'adv-expressions': {
    learning: [
      'In R, code is data: expressions can be captured, inspected, and transformed as Abstract Syntax Trees',
      'Expressions consist of calls (prefix functions), symbols (names), constants, and pairlists',
      'quote() captures code without executing it, allowing programmatic code analysis',
    ],
    fieldNotes: [
      'Recursive tree traversal of ASTs powers linters, code formatting tools, and domain-specific languages.',
      'Use is.call(), is.symbol(), and as.list() to safely deconstruct captured expressions.',
    ],
  },
  'adv-quasiquote': {
    learning: [
      'Quasiquotation allows selective evaluation of parts of a captured expression (unquoting)',
      'The big-bang operator (!!!) unquotes and splices a list of expressions into arguments',
      'Data masking evaluates expressions within a data frame environment using eval() or eval_tidy()',
    ],
    fieldNotes: [
      'The curly-curly syntax {{ arg }} in rlang encapsulates enquo() and !! for intuitive user functions.',
      'Always distinguish between data-variables (columns in tables) and env-variables (variables in functions).',
    ],
  },
  'adv-profiling': {
    learning: [
      'Vectorized operations execute in compiled C code, drastically outperforming interpreted loops',
      'Repeated dynamic vector growth with c(x, val) causes quadratic O(N^2) memory reallocation',
      'High-precision benchmarking measures execution time and memory allocation across implementations',
    ],
    fieldNotes: [
      'Always pre-allocate output vectors with vector("list", n) or numeric(n) before running loops.',
      'Use profvis for interactive visualization of CPU and memory bottlenecks in large R scripts.',
    ],
  },
};

LEVEL_GUIDANCE['appendix'] = LEVEL_GUIDANCE['capstone'];

export function getLevelLearning(id: string): string[] {
  return (
    LEVEL_GUIDANCE[id]?.learning ?? [
      'Interactive evaluation: inspect workspace objects after every command',
      'Vectorized expressions and functional transformations',
      'Reproducible data analysis in R',
    ]
  );
}

export function getLevelFieldNotes(id: string): string[] {
  return (
    LEVEL_GUIDANCE[id]?.fieldNotes ?? [
      'Production R scripts automate these steps in data pipelines and analytical reports.',
    ]
  );
}

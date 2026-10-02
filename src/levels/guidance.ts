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
  capstone: {
    learning: [
      'End-to-end data workflow: clean, summarize, and visualize in one pipeline',
      'Combines table subsetting, group aggregations, and graphic generation',
      'Synthesizes core data wrangling and reporting concepts in R',
    ],
    fieldNotes: [
      'Production reporting systems compile end-to-end pipelines into automated Quarto / R Markdown PDF and HTML reports.',
      'Clean data pipelines validate data inputs, transform records, compute aggregates, and output visual artifacts seamlessly.',
    ],
  },
};

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

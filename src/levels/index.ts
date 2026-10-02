import type { LevelDef, SeriesDef } from '../engine/types';

export const SERIES: SeriesDef[] = [
  {
    id: 'foundations',
    title: 'Foundations',
    description: 'Complete R curriculum based on the r-book chapters.',
  },
];

export const allLevels: LevelDef[] = [
  // Section 1: مقدمه
  {
    id: 'hello',
    seriesId: 'foundations',
    title: '01. Introduction / Hello, R',
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
    lesson: `### فصل 1 — مقدمه

زبان R یکی از محبوب‌ترین زبان‌های برنامه‌نویسی برای تحلیل داده، محاسبات آماری و مصورسازی است.

در کنسول R، هر عبارتی که تایپ شود بلافاصله ارزیابی شده و نتیجه نمایش داده می‌شود:

\`\`\`r
print("Hello, R!")
\`\`\`

برای اجرا کافی است کلید **Enter** یا **Ctrl + Enter** را فشار دهید.
`,
  },
  {
    id: 'rstudio',
    seriesId: 'foundations',
    title: '02. RStudio & Workspace',
    brief: 'In RStudio, variables live in the global workspace. Inspect existing variables with ls().',
    goal: 'active_vars <- ls()',
    setup: 'item_a <- 10\nitem_b <- 20',
    par: 1,
    difficulty: 1,
    checks: [
      {
        type: 'eval',
        expr: 'exists("active_vars", envir = .GlobalEnv, inherits = FALSE)',
        label: 'Variable active_vars exists in the workspace',
      },
      {
        type: 'eval',
        expr: '"item_a" %in% active_vars && "item_b" %in% active_vars',
        label: 'active_vars contains workspace objects',
      },
    ],
    hint: 'Call active_vars <- ls() to capture the names of all objects in memory.',
    lesson: `### فصل 2 — آشنایی با RStudio و محیط کاری

محیط RStudio قدرتمندترین IDE برای زبان R است:
- کلید میانبر **Ctrl + Enter**: اجرای خط جاری در Console
- کلید میانبر **Ctrl + L**: پاک کردن صفحه کنسول
- کلید میانبر **Alt + -**: نوشتن خودکار عملگر تخصیص \`<-\`

تابع \`ls()\` نام تمام متغیرهای موجود در حافظه (Workspace) را به صورت بردار رشته‌ای برمی‌گرداند.
`,
  },

  // Section 2: مبانی R
  {
    id: 'numbers',
    seriesId: 'foundations',
    title: '03. Math Operations & Variables',
    brief: 'R supports integer division (%/%), modulo (%%), and powers (^). Compute quotient q, remainder r, and power p.',
    goal: 'q <- 17 %/% 5\nr <- 17 %% 5\np <- 2^4',
    setup: '',
    par: 1,
    difficulty: 1,
    checks: [
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(q, 3))',
        label: 'q equals 17 %/% 5 (3)',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(r, 2))',
        label: 'r equals 17 %% 5 (2)',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(p, 16))',
        label: 'p equals 2^4 (16)',
      },
    ],
    hint: 'Enter all three expressions in the editor: q <- 17 %/% 5, r <- 17 %% 5, p <- 2^4.',
    lesson: `### فصل 3 — عملیات ریاضی و متغیرها

علاوه بر عملگرهای جمع و ضرب، R عملگرهای اختصاصی زیر را دارد:
- تقسیم صحیح: \`%/% \` (مانند \`17 %/% 5\` که برابر 3 است)
- باقیمانده (پیمانه): \`%% \` (مانند \`17 %% 5\` که برابر 2 است)
- توان: \`^ \` (مانند \`2^4\` که برابر 16 است)
- عملگر تخصیص مقدار به متغیر: \`<-\`
`,
  },
  {
    id: 'vectors',
    seriesId: 'foundations',
    title: '04. Vectors & Matrices',
    brief: 'Vectors are created with c() and matrices with matrix(). Build a 2x3 matrix mat filled by row with numbers 1 to 6.',
    goal: 'mat <- matrix(1:6, nrow = 2, ncol = 3, byrow = TRUE)',
    setup: '',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'is.matrix(mat)',
        label: 'mat is a matrix',
      },
      {
        type: 'eval',
        expr: 'identical(dim(mat), c(2L, 3L))',
        label: 'mat has 2 rows and 3 columns',
      },
      {
        type: 'eval',
        expr: 'mat[1, 2] == 2 && mat[2, 1] == 4',
        label: 'Elements are filled byrow correctly',
      },
    ],
    hint: 'Use matrix(1:6, nrow = 2, ncol = 3, byrow = TRUE)',
    lesson: `### فصل 4 — بردارها و ماتریس‌ها

بردارها پایه داده‌ها در R هستند و با \`c()\` ساخته می‌شوند.
ماتریس‌ها آرایه‌های دوبعدی هستند که با تابع \`matrix()\` ساخته می‌شوند:

\`\`\`r
mat <- matrix(1:6, nrow = 2, ncol = 3, byrow = TRUE)
\`\`\`

اندیس‌گذاری در ماتریس با فرمت \`mat[row, col]\` انجام می‌گیرد (شروع از ۱).
`,
  },
  {
    id: 'data-structures',
    seriesId: 'foundations',
    title: '05. Factors, Data Frames & Lists',
    brief: 'Factors handle categorical labels and lists store mixed types. Create factor f and pack it into a list profile with its length.',
    goal: 'f <- factor(c("low", "medium", "high", "low"))\nprofile <- list(status = f, count = length(f))',
    setup: '',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'is.factor(f)',
        label: 'f is a factor',
      },
      {
        type: 'eval',
        expr: 'is.list(profile)',
        label: 'profile is a list',
      },
      {
        type: 'eval',
        expr: 'profile$count == 4',
        label: 'profile$count holds 4',
      },
    ],
    hint: 'Create f with factor(...) and profile with list(status = f, count = length(f)).',
    lesson: `### فصل 5 — فاکتور، data.frame و list

- **فاکتور (Factor)**: برای ذخیره متغیرهای کیفی و دسته‌بندی‌شده (\`factor(c("A", "B", "A"))\`).
- **لیست (List)**: ظرف ناهمگن چندگانه که عناصر آن با \`$\` یا \`[[ ]]\` قابل دسترسی است.
- **دیتا فریم (data.frame)**: جدول داده دوبعدی که هر ستون می‌تواند نوع متفاوتی داشته باشد.
`,
  },

  // Section 3: برنامه‌نویسی
  {
    id: 'control-flow',
    seriesId: 'foundations',
    title: '06. Control Flow & Conditions',
    brief: 'ifelse() evaluates conditions element-wise across vectors. Classify scores into status as "pass" (>= 50) or "fail".',
    goal: 'status <- ifelse(scores >= 50, "pass", "fail")',
    setup: 'scores <- c(45, 82, 60, 30, 95)',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(status, c("fail", "pass", "pass", "fail", "pass")))',
        label: 'status accurately classifies each score',
      },
    ],
    hint: 'Use status <- ifelse(scores >= 50, "pass", "fail").',
    lesson: `### فصل 6 — ساختارهای کنترلی

در R علاوه بر دستور شرطی \`if (...) { ... } else { ... }\`، تابع برداری بسیار سریع \`ifelse(condition, yes, no)\` برای ارزیابی تک‌تک عناصر بردار کاربرد دارد:

\`\`\`r
status <- ifelse(scores >= 50, "pass", "fail")
\`\`\`
`,
  },
  {
    id: 'functions',
    seriesId: 'foundations',
    title: '07. Custom Functions & Apply',
    brief: 'Define a function cube that computes x^3, and apply it over 1:4 using sapply() into res.',
    goal: 'cube <- function(x) x^3\nres <- sapply(1:4, cube)',
    setup: '',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'is.function(cube)',
        label: 'cube is a function',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(res), c(1, 8, 27, 64)))',
        label: 'res contains c(1, 8, 27, 64)',
      },
    ],
    hint: 'Write cube <- function(x) x^3 and res <- sapply(1:4, cube).',
    lesson: `### فصل 7 — توابع و پکیج‌ها

تعریف تابع با کلیدواژه \`function\` انجام می‌شود:
\`\`\`r
cube <- function(x) x^3
\`\`\`

خانواده \`apply\` (مانند \`sapply\` و \`lapply\`) به شما امکان می‌دهد یک تابع را بدون نوشتن حلقه روی تمام عناصر یک بردار یا لیست اجرا کنید.
`,
  },

  // Section 4: داده‌ها و ورود داده
  {
    id: 'import-flat',
    seriesId: 'foundations',
    title: '08. Flat Files & CSV Import',
    brief: 'read.csv() parses tabular comma-separated text into a data.frame. Import csv_text into df.',
    goal: 'csv_text <- "id,name,score\\n1,Alice,95\\n2,Bob,88\\n3,Charlie,72"\ndf <- read.csv(text = csv_text)',
    setup: '',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'is.data.frame(df) && nrow(df) == 3 && ncol(df) == 3',
        label: 'df is a 3x3 data frame',
      },
      {
        type: 'eval',
        expr: 'df$score[1] == 95',
        label: 'Score of first row is 95',
      },
    ],
    hint: 'Pass text = csv_text to read.csv().',
    lesson: `### فصل 8 — Importing: فایل‌های flat

فایل‌های متنی (مانند CSV و TSV) از رایج‌ترین فرمت‌های تبادل داده هستند.
تابع \`read.csv()\` داده‌های متنی با جداکننده کاما را خوانده و به صورت \`data.frame\` بارگذاری می‌کند.
`,
  },
  {
    id: 'import-excel',
    seriesId: 'foundations',
    title: '09. Tabular Data & Inspection',
    brief: 'Inspect imported tables. Compute avg_math as mean(student_table$math) and n_records as nrow(student_table).',
    goal: 'avg_math <- mean(student_table$math)\nn_records <- nrow(student_table)',
    setup: 'student_table <- data.frame(name = c("Sara", "Ali", "Reza"), math = c(18, 20, 16), active = c(TRUE, TRUE, FALSE))',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(avg_math), 18))',
        label: 'avg_math equals 18',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(n_records), 3))',
        label: 'n_records equals 3',
      },
    ],
    hint: 'Use mean(student_table$math) and nrow(student_table).',
    lesson: `### فصل 9 — Excel و فایل‌های جدولی

پس از ورود داده‌های جدولی (از Excel یا فایل‌های صفحه گسترده)، بررسی اولیه ساختار با توابع زیر انجام می‌شود:
- \`str(data)\`: ساختار نوع ستون‌ها
- \`summary(data)\`: خلاصه آماری ستون‌ها
- \`nrow(data)\`: تعداد ردیف‌ها
`,
  },
  {
    id: 'import-db',
    seriesId: 'foundations',
    title: '10. Relational Queries & DB',
    brief: 'Relational data query logic: filter sales_data where amount >= 150 and region == "North" into top_sales.',
    goal: 'top_sales <- subset(sales_data, amount >= 150 & region == "North")',
    setup: 'sales_data <- data.frame(item = c("A", "B", "A", "C", "B"), amount = c(100, 250, 150, 80, 300), region = c("North", "South", "North", "West", "North"))',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'is.data.frame(top_sales) && nrow(top_sales) == 2',
        label: 'top_sales contains 2 rows',
      },
      {
        type: 'eval',
        expr: 'all(top_sales$amount >= 150) && all(top_sales$region == "North")',
        label: 'Filters amount >= 150 and region == North',
      },
    ],
    hint: 'Use subset(sales_data, amount >= 150 & region == "North").',
    lesson: `### فصل 10 — ورود داده از پایگاه‌داده و کوئری

در پایگاه‌های داده، استخراج رکوردهایی که در شروط خاص صدق می‌کنند با بند WHERE در SQL صورت می‌گیرد.
در R، تابع \`subset()\` دقیقاً همان منطق فیلتر رابطه‌ای را بر اساس شروط منطقی ستون‌ها پیاده‌سازی می‌کند.
`,
  },
  {
    id: 'import-web',
    seriesId: 'foundations',
    title: '11. Web Data & Structured Records',
    brief: 'APIs return structured records (JSON/nested lists). Extract user names from api_data$items into names.',
    goal: 'names <- sapply(api_data$items, function(u) u$name)',
    setup: 'api_data <- list(status = 200, items = list(list(id = 1, name = "Ali"), list(id = 2, name = "Sara"), list(id = 3, name = "Reza")))',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(names, c("Ali", "Sara", "Reza")))',
        label: 'names contains "Ali", "Sara", "Reza"',
      },
    ],
    hint: 'Extract the name field from each item in api_data$items.',
    lesson: `### فصل 11 — خواندن داده از وب و API

داده‌های استخراج شده از وب‌سرویس‌ها و APIها در R معمولاً به صورت ساختار درختی از لیست‌ها (مانند خروجی \`jsonlite::fromJSON\`) درمی‌آیند. پیمایش این لیست‌ها با توابع برداری انجام می‌شود.
`,
  },

  // Section 5: پاکسازی و داده‌کاوی
  {
    id: 'tidy-data',
    seriesId: 'foundations',
    title: '12. Tidy Data & Missing Values',
    brief: 'Clean data by managing missing values (NA). Find NA positions with is.na() and create clean_survey with na.omit().',
    goal: 'has_na <- is.na(raw_survey$score)\nclean_survey <- na.omit(raw_survey)',
    setup: 'raw_survey <- data.frame(id = 1:5, score = c(18, NA, 15, NA, 20))',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(has_na, c(FALSE, TRUE, FALSE, TRUE, FALSE)))',
        label: 'has_na identifies missing values correctly',
      },
      {
        type: 'eval',
        expr: 'is.data.frame(clean_survey) && nrow(clean_survey) == 3',
        label: 'clean_survey contains only the 3 complete rows',
      },
    ],
    hint: 'Use has_na <- is.na(raw_survey$score) and clean_survey <- na.omit(raw_survey).',
    lesson: `### فصل 12 — دادهٔ تمیز و tidyverse

در اصول داده‌های تمیز (Tidy Data):
- داده‌های مفقوده با مقدار خاص \`NA\` مشخص می‌شوند.
- تابع \`is.na(x)\` موقعیت مقادیر گمشده را برمی‌گرداند.
- تابع \`na.omit(df)\` سطرهایی که دارای حداقل یک مقدار مفقوده هستند را حذف می‌کند.
`,
  },
  {
    id: 'strings-regex',
    seriesId: 'foundations',
    title: '13. Strings & Regular Expressions',
    brief: 'Text manipulation using regex: replace hyphens with underscores in tags using gsub() into clean_tags.',
    goal: 'clean_tags <- gsub("-", "_", tags)',
    setup: 'tags <- c("item-101", "user-admin", "order-2026")',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(clean_tags, c("item_101", "user_admin", "order_2026")))',
        label: 'clean_tags contains underscore formatted tags',
      },
    ],
    hint: 'Call clean_tags <- gsub("-", "_", tags).',
    lesson: `### فصل 13 — رشته‌ها و Regular Expression

برای کار با متن و الگوها در R:
- \`paste()\` و \`paste0()\`: چسباندن متن‌ها
- \`grep()\` و \`grepl()\`: جستجوی الگو
- \`gsub(pattern, replacement, x)\`: تعویض تمامی رخدادهای الگو در رشته
`,
  },
  {
    id: 'dplyr',
    seriesId: 'foundations',
    title: '14. Data Wrangling & Pipelines',
    brief: 'Pipe |> chains transformations. Filter inventory for price >= 15 and compute total = price * qty into valuable.',
    goal: 'valuable <- subset(inventory, price >= 15) |> transform(total = price * qty)',
    setup: 'inventory <- data.frame(sku = c("A", "B", "C", "D"), price = c(10, 25, 15, 40), qty = c(5, 2, 8, 1))',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'is.data.frame(valuable) && nrow(valuable) == 3',
        label: 'valuable has 3 filtered items',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(valuable$total, c(50, 120, 40)))',
        label: 'valuable$total holds 50, 120, 40',
      },
    ],
    hint: 'Use subset(inventory, price >= 15) |> transform(total = price * qty).',
    lesson: `### فصل 14 — دستکاری داده با dplyr و عملگر Pipe

افعال اصلی دستکاری داده (فیلتر کردن، انتخاب ستون، ایجاد متغیر جدید با mutate یا transform) را می‌توان با عملگر خط لوله \`|>\` پشت سر هم زنجیره‌وار اجرا کرد تا کد بسیار خوانا و تمیز باشد.
`,
  },
  {
    id: 'joins',
    seriesId: 'foundations',
    title: '15. Merging & Relational Joins',
    brief: 'Join tables based on a shared key. Perform a left join with merge(all.x = TRUE) into report.',
    goal: 'report <- merge(users, orders, by = "user_id", all.x = TRUE)',
    setup: 'users <- data.frame(user_id = 1:3, name = c("Ali", "Sara", "Reza"))\norders <- data.frame(user_id = c(1, 2, 4), total = c(150, 320, 90))',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'is.data.frame(report) && nrow(report) == 3',
        label: 'report contains 3 rows',
      },
      {
        type: 'eval',
        expr: 'report$name[report$user_id == 1] == "Ali"',
        label: 'report correctly matches user_id 1 to Ali',
      },
      {
        type: 'eval',
        expr: 'is.na(report$total[report$user_id == 3])',
        label: 'User without order receives NA total',
      },
    ],
    hint: 'Use report <- merge(users, orders, by = "user_id", all.x = TRUE).',
    lesson: `### فصل 15 — ترکیب داده (Join)

اتصال داده‌ها بر اساس کلید مشترک:
- اتصال درونی (Inner Join): رکوردهایی که در هر دو جدول کلید یکسان دارند.
- اتصال چپ (Left Join): همه رکوردهای جدول سمت چپ حفظ می‌شوند و در صورت نبود مقدار معادل، \`NA\` قرار می‌گیرد (\`all.x = TRUE\`).
`,
  },

  // Section 6: زمان و داده‌های پیشرفته
  {
    id: 'datetime',
    seriesId: 'foundations',
    title: '16. Dates & Times',
    brief: 'Convert character strings to Date objects using as.Date() and compute days_between as a numeric duration.',
    goal: 'start_date <- as.Date("2026-01-01")\nend_date <- as.Date("2026-01-15")\ndays_between <- as.numeric(end_date - start_date)',
    setup: '',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'inherits(start_date, "Date") && inherits(end_date, "Date")',
        label: 'start_date and end_date are Date objects',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(days_between), 14))',
        label: 'days_between equals 14',
      },
    ],
    hint: 'Convert with as.Date("YYYY-MM-DD") and subtract: as.numeric(end_date - start_date).',
    lesson: `### فصل 16 — تاریخ و زمان

در R، نوع داده \`Date\` برای تقویم و \`POSIXct\` برای زمان همراه با ساعت و ثانیه به کار می‌روند:

\`\`\`r
d <- as.Date("2026-09-17")
diff <- as.numeric(as.Date("2026-09-20") - d) # 3
\`\`\`
`,
  },
  {
    id: 'data-table',
    seriesId: 'foundations',
    title: '17. Fast Group Aggregation',
    brief: 'Aggregate data across categories. Use aggregate() to sum amount by dept in transactions into dept_totals.',
    goal: 'dept_totals <- aggregate(amount ~ dept, data = transactions, FUN = sum)',
    setup: 'transactions <- data.frame(dept = c("IT", "HR", "IT", "Sales", "HR"), amount = c(500, 200, 350, 800, 150))',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'is.data.frame(dept_totals)',
        label: 'dept_totals is a data frame',
      },
      {
        type: 'eval',
        expr: 'dept_totals$amount[dept_totals$dept == "IT"] == 850',
        label: 'IT department total is 850',
      },
      {
        type: 'eval',
        expr: 'dept_totals$amount[dept_totals$dept == "HR"] == 350',
        label: 'HR department total is 350',
      },
    ],
    hint: 'Use dept_totals <- aggregate(amount ~ dept, data = transactions, FUN = sum).',
    lesson: `### فصل 17 — data.table و داده‌های حجیم

برای خلاصه‌سازی سریع مجموعه‌های داده بر اساس دسته‌ها و گروه‌ها، از دستورات تجمیع فرمولی مانند \`aggregate(y ~ group, data, FUN)\` یا پکیج \`data.table\` استفاده می‌شود.
`,
  },
  {
    id: 'outliers-plots',
    seriesId: 'foundations',
    title: '18. Outliers & Base Plots',
    brief: 'Detect outliers and visualize distributions: compute iqr_val as IQR(vals) and render boxplot(vals).',
    goal: 'iqr_val <- IQR(vals)\nboxplot(vals, col = "#2569bb", main = "Distribution")',
    setup: 'vals <- c(10, 12, 11, 14, 12, 13, 11, 42)',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(iqr_val), IQR(vals)))',
        label: 'iqr_val matches IQR(vals)',
      },
      {
        type: 'plot',
        label: 'Boxplot is rendered on the plot canvas',
      },
    ],
    hint: 'Compute iqr_val <- IQR(vals) and call boxplot(vals, col = "#2569bb", main = "Distribution").',
    lesson: `### فصل 18 — داده پرت و نمودارهای پایه

- **داده‌های پرت (Outliers)**: مقادیری که فاصله نامتعارفی از سایر داده‌ها دارند. دامنه میان‌چارکی (\`IQR\`) یکی از معیارهای اصلی تشخیص داده‌های پرت است.
- **نمودار جعبه‌ای (\`boxplot\`)**: نمایش چارک‌ها، میانه و نقاط پرت.
`,
  },
  {
    id: 'appendix',
    seriesId: 'foundations',
    title: '19. Capstone: End-to-End Analysis',
    brief: 'Complete pipeline from the appendix: find avg_views, extract top_days (views >= avg_views), and plot the trend with plot(day, views, type = "b").',
    goal: 'avg_views <- mean(raw_log$views)\ntop_days <- subset(raw_log, views >= avg_views)\nplot(raw_log$day, raw_log$views, type = "b", pch = 19, col = "#2569bb", main = "Daily Views Trend")',
    setup: 'raw_log <- data.frame(day = 1:6, views = c(120, 95, 210, 85, 340, 190))',
    par: 1,
    difficulty: 4,
    checks: [
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(avg_views), mean(raw_log$views)))',
        label: 'avg_views holds the correct average',
      },
      {
        type: 'eval',
        expr: 'is.data.frame(top_days) && nrow(top_days) == 3',
        label: 'top_days contains days exceeding average views',
      },
      {
        type: 'plot',
        label: 'Trend plot is drawn on the plot canvas',
      },
    ],
    hint: 'Calculate avg_views <- mean(raw_log$views), filter with subset(), and draw the plot.',
    lesson: `### فصل 19 — پیوست: کدهای تکمیلی و پروژه جامع

تبریک می‌گوییم! شما تمام سرفصل‌های کتاب R مقدماتی را با موفقیت سپری کردید.
در این پروژه جامع، تمام آموخته‌های خود را از پاکسازی، فیلتر داده، محاسبات آماری تا رسم نمودار نهایی در یک زنجیره کامل به کار می‌بندید.
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
      id: 'intro',
      title: 'INTRODUCTION & RSTUDIO',
      prefix: 'intro',
      ids: ['hello', 'rstudio'],
    },
    {
      id: 'basics',
      title: 'R BASICS & DATA STRUCTURES',
      prefix: 'basic',
      ids: ['numbers', 'vectors', 'data-structures'],
    },
    {
      id: 'programming',
      title: 'PROGRAMMING & FUNCTIONS',
      prefix: 'prog',
      ids: ['control-flow', 'functions'],
    },
    {
      id: 'import',
      title: 'DATA IMPORT & APIS',
      prefix: 'data',
      ids: ['import-flat', 'import-excel', 'import-db', 'import-web'],
    },
    {
      id: 'wrangling',
      title: 'DATA WRANGLING & CLEANING',
      prefix: 'tidy',
      ids: ['tidy-data', 'strings-regex', 'dplyr', 'joins'],
    },
    {
      id: 'advanced',
      title: 'DATETIME, OUTLIERS & GRAPHICS',
      prefix: 'adv',
      ids: ['datetime', 'data-table', 'outliers-plots', 'appendix'],
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

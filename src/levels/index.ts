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
    brief: 'R evaluates console commands immediately. Print a welcoming character string to the interactive console.',
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
    lesson: `### فصل 1 — مقدمه و شروع کار با R

زبان R یکی از محبوب‌ترین زبان‌های برنامه‌نویسی برای تحلیل داده، محاسبات آماری و مصورسازی علمی در جهان است.

در کنسول تعاملی R، هر عبارتی که تایپ شود بلافاصله ارزیابی شده و نتیجه نمایش داده می‌شود:

\`\`\`r
print("Hello, R!")
\`\`\`

#### ⚠️ دام‌های متداول (Common Gotchas):
- **ایندکس‌گذاری از ۱:** برخلاف زبان‌هایی مانند پایتون، جاوااسکریپت و C که شمارش خانه‌ها از ۰ شروع می‌شود، در زبان R اولین عنصر هر بردار یا لیست در اندیس **1** قرار دارد.
- **تفاوت کوتیشن‌ها:** در R هر دو نوع کوتیشن تکی (\`'...\'\`) و دوتایی (\`"..."\`) معتبرند، اما استاندارد پذیرفته‌شده کدنویسی R استفاده از گیومه دوتایی است.
`,
  },
  {
    id: 'rstudio',
    seriesId: 'foundations',
    title: '02. RStudio & Workspace',
    brief: 'Variables live in the global workspace (.GlobalEnv). Inspect existing workspace objects using ls().',
    goal: 'active_vars <- ls()',
    setup: 'air_sample <- head(airquality, 5)\ncar_sample <- head(mtcars, 5)',
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
        expr: '"air_sample" %in% active_vars && "car_sample" %in% active_vars',
        label: 'active_vars captures existing workspace datasets',
      },
    ],
    hint: 'Call active_vars <- ls() to capture the names of all objects in memory.',
    lesson: `### فصل 2 — آشنایی با RStudio و محیط کاری

محیط RStudio قدرتمندترین IDE برای زبان R است:
- کلید میانبر **Ctrl + Enter**: اجرای خط جاری در Console
- کلید میانبر **Ctrl + L**: پاک کردن صفحه کنسول
- کلید میانبر **Alt + -**: نوشتن خودکار عملگر تخصیص \`<-\`

تابع \`ls()\` نام تمام متغیرها، توابع و جداول بارگذاری‌شده در حافظه (Workspace یا \`.GlobalEnv\`) را برمی‌گرداند.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **تخصیص با \`<-\` در برابر \`=\`:** اگرچه هر دو در بیشتر جاها کار می‌کنند، اما در R عملگر استاندارد \`<-\` است. علامت \`=\` در فراخوانی توابع برای نام‌گذاری آرگومان‌ها رزرو شده است.
- **ماندگاری خطرناک متغیرها:** در پروژه‌های واقعی، ذخیره کردن Workspace در فایل \`.RData\` توصیه نمی‌شود؛ چون ممکن است کدی که روی سیستم شما کار می‌کند، روی سیستم همکارتان به خاطر عدم وجود یک متغیر قدیمی کار نکند.
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

علاوه بر عملگرهای جمع و ضرب، R عملگرهای ریاضی کاربردی زیر را دارد:
- تقسیم صحیح: \`%/% \` (مانند \`17 %/% 5\` که برابر 3 است)
- باقیمانده (پیمانه): \`%% \` (مانند \`17 %% 5\` که برابر 2 است)
- توان: \`^ \` (مانند \`2^4\` که برابر 16 است)

#### ⚠️ دام‌های متداول (Common Gotchas):
- **خطای اعشاری در مقایسه با \`==\`:** در محاسبات ممیز شناور، به دلیل استاندارد IEEE 754 عبارت \`0.1 + 0.2 == 0.3\` در R مقدار \`FALSE\` برمی‌گرداند! برای مقایسه دقیق اعداد اعشاری همیشه از تابع \`all.equal()\` یا \`isTRUE(all.equal(a, b))\` استفاده کنید.
- **تفاوت \`Inf\` و \`NaN\`:** تقسیم عدد بر صفر در R تولید \`Inf\` یا \`-Inf\` می‌کند، در حالی که \`0 / 0\` مقدار \`NaN\` (Not a Number) بازمی‌گرداند.
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

بردارها (Vectors) سنگ‌بنای زبان R هستند و با تابع \`c()\` (مخفف combine) ساخته می‌شوند.
ماتریس‌ها ساختارهای دوبعدی از مقادیر هم‌نوع هستند:

\`\`\`r
mat <- matrix(1:6, nrow = 2, ncol = 3, byrow = TRUE)
\`\`\`

#### ⚠️ دام‌های متداول (Common Gotchas):
- **قاعده بازچرخانی بردارها (Vector Recycling):** اگر عملیاتی روی دو بردار با طول نابرابر انجام دهید، R به طور خودکار بردار کوتاه‌تر را تکرار می‌کند. اگر طول بزرگتر مضرب طول کوچکتر باشد، هیچ خطایی داده نمی‌شود و ممکن است باگ خاموش ایجاد شود!
- **تله حذف بعد (Dimension Dropping):** وقتی یک سطر از ماتریس را فیلتر می‌کنید (\`mat[1, ]\`)، R به طور خودکار ساختار ماتریس را به بردار تقلیل می‌دهد. برای حفظ ساختار ماتریس باید از \`drop = FALSE\` استفاده کنید (\`mat[1, , drop = FALSE]\`).
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

- **فاکتور (Factor)**: برای متغیرهای کیفی و دسته‌ای (مانند جنسیت، رتبه، گروه‌های سنی).
- **لیست (List)**: محفظه انعطاف‌پذیر برای ذخیره اشیاء با انواع و طول‌های گوناگون.
- **دیتا فریم (data.frame)**: پرکاربردترین ساختار جدولی دوبعدی در علم داده.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **تله تبدیل فاکتور به عدد:** اگر یک فاکتور حاوی اعدادی مثل \`factor(c(10, 20, 30))\` را مستقیماً با \`as.numeric()\` تبدیل کنید، مقادیر واقعی را نمی‌گیرید! بلکه کدهای ترتیبی (1, 2, 3) برمی‌گردند! راهکار استاندارد: \`as.numeric(as.character(f))\`.
- **تفاوت \`[\` و \`[[\`:** استفاده از \`[\` روی لیست، یک زیر-لیست برمی‌گرداند؛ اما \`[[\` محتوای واقعی داخل آن خانه را بدون پوسته لیست استخراج می‌کند.
`,
  },

  {
    id: 'factors-reorder',
    seriesId: 'foundations',
    title: '06. Categorical Factors & Reordering',
    brief: 'Factors control categorical display order in plots and baseline contrasts in models. Reorder survey city by median income using reorder() into ordered_city and extract city_levels.',
    goal: 'ordered_city <- reorder(factor(survey$city), survey$income, FUN = median)\ncity_levels <- levels(ordered_city)',
    setup: 'survey <- data.frame(city = c("Berlin", "Tokyo", "Berlin", "London", "Tokyo", "London"), income = c(4500, 5200, 4800, 3900, 5600, 4100), stringsAsFactors = FALSE)',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'is.factor(ordered_city)',
        label: 'ordered_city is a factor',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(levels(ordered_city), c("London", "Berlin", "Tokyo")))',
        label: 'Factor levels ordered by median income (London, Berlin, Tokyo)',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(city_levels, c("London", "Berlin", "Tokyo")))',
        label: 'city_levels captures the sorted factor levels',
      },
    ],
    hint: 'Use ordered_city <- reorder(factor(survey$city), survey$income, FUN = median) and city_levels <- levels(ordered_city).',
    lesson: `### فصل 6 — فاکتورها و بازچینی دسته‌ها (Factor Reordering)

در زبان R، متغیرهای کیفی و دسته‌ای به صورت **Factor** ذخیره می‌شوند. فاکتورها دارای مجموعه‌ای از \`levels\` هستند که ترتیب نمایش داده‌ها در نمودارها (محورهای مختصات یا Legend) و همچنین سطح مبنا (Reference Level) در مدل‌های رگرسیونی را تعیین می‌کنند.

به طور پیش‌فرض، R سطوح فاکتور را بر اساس **ترتیب الفبایی** مرتب می‌کند که در تحلیل داده گمراه‌کننده است:
\`\`\`r
cities <- factor(c("Tokyo", "Berlin", "London"))
levels(cities) # "Berlin" "London" "Tokyo"
\`\`\`

برای نمایش حرفه‌ای و خوانا، باید فاکتورها را بر اساس یک متغیر عددی (مانند میانه یا میانگین درآمد) بازچینی کرد. تابع \`reorder()\` در R پایه این کار را انجام می‌دهد:
\`\`\`r
ordered_f <- reorder(factor_var, numeric_metric, FUN = median)
\`\`\`

در اکوسیستم Tidyverse، پکیج محبوب \`forcats\` توابع پیشرفته‌ای مانند \`fct_reorder()\` و \`fct_lump()\` را برای همین هدف ارائه می‌دهد.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **تله سطوح بی‌استفاده (Unused Levels):** اگر رکوردهایی از یک دیتافریم فیلتر یا حذف شوند، سطوح فاکتور قدیمی به صورت پیش‌فرض باقی می‌مانند! برای حذف سطوح منسوخ باید از \`droplevels(df)\` استفاده کنید.
- **تغییر سطح مبنا در رگرسیون:** در مدل \`lm()\` اولین سطح فاکتور به عنوان پایه (Baseline) در نظر گرفته می‌شود. با \`relevel(f, ref = "...")\` می‌توانید سطح مبنا را مشخص کنید تا تفسیر ضرایب مدل معنادار شود.
`,
  },

  // Section 3: برنامه‌نویسی
  {
    id: 'control-flow',
    seriesId: 'foundations',
    title: '07. Control Flow & Conditions',
    brief: 'ifelse() evaluates conditions element-wise across vectors. Classify temperature readings into status as "heatwave" (>= 85) or "normal".',
    goal: 'status <- ifelse(temps >= 85, "heatwave", "normal")',
    setup: 'temps <- c(68, 85, 92, 74, 88)',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(status, c("normal", "heatwave", "heatwave", "normal", "heatwave")))',
        label: 'status accurately classifies each temperature',
      },
    ],
    hint: 'Use status <- ifelse(temps >= 85, "heatwave", "normal").',
    lesson: `### فصل 7 — ساختارهای کنترلی و شرطی

در R پردازش برداری اساس سرعت محاسبات است. به جای نوشتن حلقه \`for\` برای بررسی تک‌تک عناصر، تابع \`ifelse(test, yes, no)\` کل بردار را با سرعت کدهای C ارزیابی می‌کند:

\`\`\`r
status <- ifelse(temps >= 85, "heatwave", "normal")
\`\`\`

#### ⚠️ دام‌های متداول (Common Gotchas):
- **استفاده اشتباه از \`if\` روی بردار:** دستور استاندارد \`if (condition)\` فقط یک شرط اسکالر (تک‌عنصری) می‌پذیرد. اگر برداری با طول بیش از ۱ به آن بدهید، با خطای Warning مواجه شده و فقط خانه اول بررسی می‌شود!
- **تفاوت \`&amp;\` با \`&amp;&amp;\`:** عملگر \`&amp;\` برای عملیات برداری عنصر به عنصر (مانند فیلتر کردن جداول) است؛ در حالی که \`&amp;&amp;\` اتصال کوتاه و فقط برای عبارات تک‌عنصری در شرط‌های \`if\` طراحی شده است.
`,
  },
  {
    id: 'functions',
    seriesId: 'foundations',
    title: '08. Custom Functions & Apply',
    brief: 'Write reusable functions. Define f_to_c converting Fahrenheit to Celsius with round((f - 32) * 5/9, 1), and apply it over c(32, 68, 86, 104) into celsius_temps.',
    goal: 'f_to_c <- function(f) round((f - 32) * 5/9, 1)\ncelsius_temps <- sapply(c(32, 68, 86, 104), f_to_c)',
    setup: '',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'is.function(f_to_c)',
        label: 'f_to_c is a defined function',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(celsius_temps), c(0, 20, 30, 40)))',
        label: 'celsius_temps matches c(0, 20, 30, 40)',
      },
    ],
    hint: 'Define f_to_c <- function(f) round((f - 32) * 5/9, 1) and apply with sapply().',
    lesson: `### فصل 8 — توابع و خانواده Apply

تعریف توابع اختصاصی پایه ایجاد ابزارهای تکرارپذیر در علم داده است:

\`\`\`r
f_to_c <- function(f) round((f - 32) * 5/9, 1)
\`\`\`

خانواده \`apply\` (شامل \`sapply\` و \`lapply\`) امکان اعمال یک تابع روی تمام عناصر بردار یا ستون‌های جدول بدون استفاده از حلقه‌های کند را فراهم می‌سازند.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **حلقه با \`1:length(x)\`:** اگر بردار \`x\` تصادفاً خالی باشد (\`length = 0\`)، عبارت \`1:length(x)\` توالی \`1, 0\` می‌سازد و حلقه ۲ بار با خطا اجرا می‌شود! در R همیشه باید از \`seq_along(x)\` استفاده کرد.
- **خروجی غیرقابل پیش‌بینی \`sapply\`:** تابع \`sapply\` سعی می‌کند خروجی را ساده‌سازی کند. اگر در مواردی خروجی لیست یا ماتریس شود رفتار آن تغییر می‌کند؛ در کدهای حساس صنعتی معمولاً از \`vapply\` با تعریف نوع خروجی استفاده می‌شود.
`,
  },
  {
    id: 'type-safe-apply',
    seriesId: 'foundations',
    title: '09. Type-Safe Iteration with vapply',
    brief: 'sapply() silently mutates return structures when lists vary or are empty. Write type-safe iteration using vapply() with template numeric(1) to compute sensor means into means.',
    goal: 'means <- vapply(metrics, mean, numeric(1))',
    setup: 'metrics <- list(sensor_a = c(22.4, 23.1, 22.8), sensor_b = c(19.5, 20.2, 19.8, 20.0), sensor_c = c(25.0, 24.8))',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'is.numeric(means) && length(means) == 3',
        label: 'means is a numeric vector of length 3',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(round(unname(means), 2), c(22.77, 19.88, 24.90)))',
        label: 'means accurately calculates average sensor readings',
      },
      {
        type: 'pattern',
        pattern: 'vapply',
        label: 'Uses type-safe vapply() instead of sapply()',
      },
    ],
    hint: 'Use means <- vapply(metrics, mean, numeric(1)).',
    lesson: `### فصل 9 — پیمایش امن و تضمین نوع خروجی با vapply

در زبان R، خانواده توابع \`apply\` هسته برنامه‌نویسی تابعی (Functional Programming) هستند. با این حال، تابع معروف \`sapply()\` یک خطر جدی در کدهای محیط پروداکشن دارد:
**ساده‌سازی خاموش و غیرقابل پیش‌بینی نوع خروجی!**
اگر ورودی \`sapply\` خالی باشد، یک لیست پس می‌دهد؛ اگر توابع خروجی با طول یکسان بدهند، ماتریس می‌سازد؛ و در غیر این صورت بردار بازمی‌گرداند. این رفتار چندریختی منشأ باگ‌های خاموش در پایپلاین‌های کلان‌داده است.

تابع استاندارد و نوع-امن \`vapply(X, FUN, FUN.VALUE)\` توسعه داده شده است تا نوع داده و ابعاد دقیق خروجی را تضمین کند:
\`\`\`r
vapply(metrics, mean, numeric(1))
\`\`\`
اگر تابع \`FUN\` مقداری برگرداند که با قالب \`FUN.VALUE\` (مثلاً یک عدد اعشاری \`numeric(1)\` یا بردار منطقی \`logical(1)\`) همخوانی نداشته باشد، R بلافاصله با خطا متوقف می‌شود و مانع از ورود داده خراب به مراحل بعدی می‌گردد.

در پکیج \`purrr\` (از اکوسیستم Tidyverse)، خانواده توابع \`map_dbl()\`، \`map_chr()\` و \`map_lgl()\` با همین فلسفه جایگزین \`sapply\` شده‌اند.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **تله قالب FUN.VALUE:** قالب \`FUN.VALUE\` باید دقیقاً نوع و طول خروجی هر تکرار را بازتاب دهد. اگر تابعی یک بردار دوعنصری برمی‌گرداند (مانند \`range\`)، باید بنویسید \`numeric(2)\`؛ در غیر این صورت با خطای \`values must be length 2, but FUN(X[[1]]) result is length 1\` روبرو می‌شوید.
`,
  },

  // Section 4: داده‌ها و ورود داده
  {
    id: 'import-flat',
    seriesId: 'foundations',
    title: '10. Flat Files & CSV Import',
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
    lesson: `### فصل 10 — ورود داده: فایل‌های Flat و CSV

فایل‌های متنی با ساختار جداکننده (مانند CSV و TSV) فرمت استاندارد تبادل داده‌های صنعتی هستند.
تابع \`read.csv()\` داده را خوانده و با تشخیص خودکار نوع ستون‌ها آن را به \`data.frame\` تبدیل می‌کند.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **استاندارد جداکننده در اروپا (\`read.csv2\`):** در برخی کشورها کاما به عنوان ممیز اعشار استفاده می‌شود و جداکننده ستون‌ها سمی‌کولن (\`;\`) است. در چنین مواردی باید از \`read.csv2()\` استفاده شود.
- **پارامتر \`check.names = TRUE\`:** نام ستون‌های حاوی فاصله یا کاراکترهای خاص در حین خواندن با نقطه (\`.\`) جایگزین می‌شوند تا نام‌های معتبر در R بسازند.
`,
  },
  {
    id: 'import-excel',
    seriesId: 'foundations',
    title: '11. Tabular Data & Inspection',
    brief: 'Inspect imported tables. On air_data, compute avg_temp as mean(air_data$Temp) and n_records as nrow(air_data).',
    goal: 'avg_temp <- mean(air_data$Temp)\nn_records <- nrow(air_data)',
    setup: 'air_data <- head(airquality, 10)',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(avg_temp), mean(head(airquality$Temp, 10))))',
        label: 'avg_temp equals mean of air_data Temp',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(n_records), 10))',
        label: 'n_records equals 10',
      },
    ],
    hint: 'Use mean(air_data$Temp) and nrow(air_data).',
    lesson: `### فصل 11 — بررسی و بازرسی ساختار داده‌ها (Data Inspection)

پس از بارگذاری داده‌ها، هرگز نباید بلافاصله شروع به مدل‌سازی کرد. توابع بازرسی اولیه:
- \`head(data, n)\`: مشاهده n سطر اول
- \`dim(data)\` و \`nrow(data)\`: ابعاد جدول
- \`str(data)\`: نوع و کلاس هر ستون
- \`summary(data)\`: خلاصه ۵ عددی آماری (مینیمم، چارک‌ها، میانگین، ماکزیمم و تعداد NAها)

#### ⚠️ دام‌های متداول (Common Gotchas):
- **دیدن کل داده بزرگ:** چاپ تصادفی یک دیتافریم ۱۰۰,۰۰۰ سطری در کنسول ممکن است باعث فریز شدن محیط شود. همیشه از \`head()\` یا \`tail()\` استفاده کنید.
`,
  },
  {
    id: 'import-db',
    seriesId: 'foundations',
    title: '12. Relational Queries & DB',
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
    lesson: `### فصل 12 — پایگاه‌های داده و کوئری‌های رابطه‌ای

استخراج رکوردهایی که در چندین شرط همزمان صدق می‌کنند، اساس کار با دیتابیس‌ها و بند WHERE در زبان SQL است.
تابع \`subset(data, condition)\` این کار را به صورت مستقیم و خوانا انجام می‌دهد.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **تله مقادیر NA در فیلتر کردن:** اگر در اندیس‌گذاری با \`df[df$amount > 100, ]\` مقادیر \`NA\` وجود داشته باشد، R سطرهایی کاملاً پر از NA تولید می‌کند! تابع \`subset()\` این مشکل را برطرف کرده و رکوردهای نامشخص را به طور خودکار حذف می‌کند.
`,
  },
  {
    id: 'import-web',
    seriesId: 'foundations',
    title: '13. Web Data & Structured Records',
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
    lesson: `### فصل 13 — داده‌های وب و ساختارهای درختی JSON

داده‌های دریافتی از وب‌سرویس‌ها به شکل درخت‌های تو در تو از لیست‌ها و دیکشنری‌ها هستند.
استفاده از \`sapply\` یا توابع بسته \`purrr\` امکان مسطح‌سازی (Rectangling) و استخراج فیلدهای مشخص را فراهم می‌سازد.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **تفاوت \`NULL\` با \`NA\` در لیست‌ها:** اگر یک فیلد در رکورد API وجود نداشته باشد مقدار آن در R برابر \`NULL\` می‌شود. اگر \`NULL\` را در یک بردار قرار دهید، عنصر ناپدید شده و طول بردار کم می‌شود!
`,
  },
  {
    id: 'rectangling',
    seriesId: 'foundations',
    title: '14. Data Rectangling & Hierarchies',
    brief: 'Modern APIs return nested trees of records. Rectangle raw_users into a 2D data.frame user_table using do.call(rbind, ...) and compute total_logins.',
    goal: 'user_table <- do.call(rbind, lapply(raw_users, as.data.frame))\ntotal_logins <- sum(user_table$logins)',
    setup: 'raw_users <- list(list(id = 101, name = "Alice", role = "Admin", logins = 42), list(id = 102, name = "Bob", role = "Editor", logins = 15), list(id = 103, name = "Charlie", role = "Viewer", logins = 7))',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'is.data.frame(user_table) && nrow(user_table) == 3 && ncol(user_table) == 4',
        label: 'user_table is a 3x4 data frame',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(colnames(user_table), c("id", "name", "role", "logins")))',
        label: 'user_table preserves id, name, role, and logins columns',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(total_logins), 64))',
        label: 'total_logins equals 64 (42 + 15 + 7)',
      },
    ],
    hint: 'Use user_table <- do.call(rbind, lapply(raw_users, as.data.frame)) and total_logins <- sum(user_table$logins).',
    lesson: `### فصل 14 — مسطح‌سازی داده‌های سلسله‌مراتبی (Data Rectangling)

بسیاری از منابع داده در دنیای وب، اسناد NoSQL و خروجی وب‌سرویس‌های RESTful با فرمت سلسله‌مراتبی JSON عرضه می‌شوند؛ یعنی لیستی از اشیاء که هر کدام ویژگی‌ها و فیلدهای درختی خود را دارند.

اصطلاح **Data Rectangling** (که هادلی ویکهام در R4DS آن را برجسته کرد) به هنر تبدیل داده‌های درختی، عمیق و غیرجدولی به جداول دو‌بعدی مستطیلی (\`data.frame\`) گفته می‌شود تا برای تحلیل و مدل‌سازی برداری آماده شوند.

الگوی کلاسیک و پرسرعت R پایه برای این تبدیل:
\`\`\`r
user_table <- do.call(rbind, lapply(raw_records, as.data.frame))
\`\`\`

در اکوسیستم Tidyverse و پکیج \`tidyr\`، توابع قدرتمندی مانند \`unnest_wider()\`، \`unnest_longer()\` و \`hoist()\` برای مسطح‌سازی درخت‌های چندلایه و ستون‌های لیستی (List-columns) طراحی شده‌اند.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **رکوردهای ناهمگن با کلیدهای مفقود (Ragged Lists):** اگر یکی از آیتم‌ها فیلدی کمتر از بقیه داشته باشد، \`as.data.frame\` ممکن است ابعاد متفاوتی بسازد و \`rbind\` با خطای ناسازگاری ستون متوقف شود. در داده‌های واقعی باید ابتدا ساختار رکوردها با مقادیر پیش‌فرض یکنواخت شود.
- **تبدیل ناخواسته رشته‌ها به فاکتور:** در کدهای قدیمی R، تبدیل لیست به دیتافریم ممکن است رشته‌ها را به فاکتور تبدیل کند (\`stringsAsFactors = FALSE\`).
`,
  },

  // Section 5: پاکسازی و داده‌کاوی
  {
    id: 'tidy-data',
    seriesId: 'foundations',
    title: '15. Tidy Data & Missing Values',
    brief: 'Real-world data contains missing values (NA). On raw_ozone, find NAs with is.na(), compute avg_ozone with na.rm = TRUE, and extract clean_ozone with na.omit().',
    goal: 'has_na <- is.na(raw_ozone)\navg_ozone <- mean(raw_ozone, na.rm = TRUE)\nclean_ozone <- na.omit(raw_ozone)',
    setup: 'raw_ozone <- airquality$Ozone[1:10]',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'is.logical(has_na) && any(has_na)',
        label: 'has_na flags missing positions',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(avg_ozone), mean(airquality$Ozone[1:10], na.rm = TRUE)))',
        label: 'avg_ozone computes mean ignoring NAs',
      },
      {
        type: 'eval',
        expr: 'length(clean_ozone) == sum(!has_na)',
        label: 'clean_ozone contains complete observations',
      },
    ],
    hint: 'Use has_na <- is.na(raw_ozone), avg_ozone <- mean(raw_ozone, na.rm = TRUE), and clean_ozone <- na.omit(raw_ozone).',
    lesson: `### فصل 15 — داده‌های مفقوده و اصول داده تمیز (Tidy Data)

در دنیای واقعی تقریباً هیچ دیتاستی بدون داده گم‌شده نیست. در زبان R مقادیر مفقوده با ثابت اختصاصی \`NA\` (Not Available) نشان داده می‌شوند.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **بزرگترین اشتباه: \`x == NA\`**: در R هرگز نباید بنویسید \`x == NA\`! چون نتیجه هر مقایسه‌ای با یک مقدار نامعلوم، خودش نامعلوم (\`NA\`) است. همیشه و فقط باید از تابع \`is.na(x)\` استفاده کنید.
- **محاسبات با \`NA\` مسری هستند:** اگر برداری حتی ۱ مقدار NA داشته باشد، \`mean(x)\` یا \`sum(x)\` مقدار \`NA\` پس می‌دهد. برای محاسبه صحیح روی داده‌های موجود باید حتماً آرگومان \`na.rm = TRUE\` را فعال کنید.
`,
  },
  {
    id: 'pivoting',
    seriesId: 'foundations',
    title: '16. Reshaping Data: Pivoting Wide to Long',
    brief: 'Data is often stored wide with metric times in column headers. Reshape quarterly_sales to tidy long format using reshape() into long_sales with quarter and revenue columns.',
    goal: 'long_sales <- reshape(quarterly_sales, direction = "long", varying = c("Q1", "Q2"), v.names = "revenue", timevar = "quarter", times = c("Q1", "Q2"), idvar = "dept")\nrow.names(long_sales) <- NULL',
    setup: 'quarterly_sales <- data.frame(dept = c("Electronics", "Clothing"), Q1 = c(120, 85), Q2 = c(150, 95))',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'is.data.frame(long_sales) && nrow(long_sales) == 4',
        label: 'long_sales is reshaped into 4 observations',
      },
      {
        type: 'eval',
        expr: 'all(c("dept", "quarter", "revenue") %in% names(long_sales))',
        label: 'long_sales contains dept, quarter, and revenue columns',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(sum(long_sales$revenue), 450))',
        label: 'Total revenue sum across quarters equals 450',
      },
    ],
    hint: 'Use long_sales <- reshape(quarterly_sales, direction = "long", varying = c("Q1", "Q2"), v.names = "revenue", timevar = "quarter", times = c("Q1", "Q2"), idvar = "dept") and row.names(long_sales) <- NULL.',
    lesson: `### فصل 16 — بازآرایی و چرخش داده‌ها: از جدول عریض به طویل (Pivoting Wide to Long)

یکی از مفاهیم بنیادین کتاب R for Data Science، ساختار **Tidy Data** است:
1. هر متغیر باید در یک ستون مستقل قرار گیرد.
2. هر مشاهده (Observation) باید یک سطر مستقل باشد.
3. هر مقدار (Value) باید در یک سلول واحد جای گیرد.

اغلب گزارش‌های مالی و صفحات اکسل در قالب **عریض (Wide Format)** ذخیره می‌شوند که در آن، متغیر زمان (مانند ماه‌ها یا فصول سال: Q1، Q2) نام ستون‌ها را تشکیل داده است. برای تحلیل‌های آماری، مدل‌سازی با \`lm()\` و رسم نمودار با \`ggplot2\`، داده‌ها باید به قالب **طویل (Long Format)** تبدیل شوند.

در R پایه، تابع جامع \`reshape()\` چرخش داده‌ها بین این دو حالت را مدیریت می‌کند:
\`\`\`r
long_df <- reshape(
  wide_df,
  direction = "long",
  varying = c("Q1", "Q2"),
  v.names = "revenue",
  timevar = "quarter",
  times = c("Q1", "Q2"),
  idvar = "dept"
)
\`\`\`

در پکیج \`tidyr\` (اکوسیستم Tidyverse)، این عملیات با دستور بسیار خوانای \`pivot_longer()\` و برعکس آن با \`pivot_wider()\` انجام می‌شود.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **تله چندگانگی ستون‌های مقیاس‌شده:** هنگام انتقال چند ستون به قالب طویل، باید مطمئن شد نوع داده تمام ستون‌های ورودی سازگار باشد (مثلاً همگی عددی باشند)، وگرنه R تمام مقادیر را به رشته متنی (Character) تبدیل می‌کند.
`,
  },
  {
    id: 'strings-regex',
    seriesId: 'foundations',
    title: '17. Strings & Regular Expressions',
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
    lesson: `### فصل 17 — رشته‌ها و عبارات باقاعده (Regex)

برای پاکسازی داده‌های متنی و استخراج الگوها در R:
- \`grep()\` و \`grepl()\`: جستجوی موقعیت یا شرط وجود الگو در بردار متنی
- \`sub()\`: تعویض اولین تطابق
- \`gsub()\`: تعویض سراسری تمام تطابق‌ها

#### ⚠️ دام‌های متداول (Common Gotchas):
- **فرار مضاعف از بک‌اسلش (Double Backslash):** در R رشته‌ها بک‌اسلش را تفسیر می‌کنند؛ بنابراین برای نوشتن یک رقم در regex به جای \`\\d\` باید حتماً بنویسید \`\\\\d\`!
`,
  },
  {
    id: 'dplyr',
    seriesId: 'foundations',
    title: '18. Data Wrangling & Pipelines',
    brief: 'Chain operations with the native pipe |>. On cars_sample, filter for mpg >= 18 and calculate power-to-weight ratio pwr_ratio = round(hp / wt, 1) into valuable.',
    goal: 'valuable <- subset(cars_sample, mpg >= 18) |> transform(pwr_ratio = round(hp / wt, 1))',
    setup: 'cars_sample <- mtcars[1:8, c("mpg", "hp", "wt")]',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'is.data.frame(valuable) && nrow(valuable) > 0',
        label: 'valuable contains filtered cars',
      },
      {
        type: 'eval',
        expr: 'all(valuable$mpg >= 18)',
        label: 'All filtered cars have mpg >= 18',
      },
      {
        type: 'eval',
        expr: '"pwr_ratio" %in% names(valuable)',
        label: 'pwr_ratio column is computed',
      },
    ],
    hint: 'Use subset(cars_sample, mpg >= 18) |> transform(pwr_ratio = round(hp / wt, 1)).',
    lesson: `### فصل 18 — خط لوله داده با عملگر پایپ (Pipe Operator)

از نسخه R 4.1 به بعد، عملگر پایپ بومی \`|>\` مستقیماً در هسته زبان تعبیه شده است (بدون نیاز به لود کردن هیچ پکیج جانبی).
پایپ خروجی دستور سمت چپ را به عنوان ورودی اول تابع سمت راست ارسال می‌کند:

\`\`\`r
data |> filter(...) |> transform(...)
\`\`\`

#### ⚠️ دام‌های متداول (Common Gotchas):
- **نیاز به پرانتز در پایپ بومی:** در پایپ قدیمی \`%>%\` نوشتن \`x %>% mean\` کار می‌کرد؛ اما در پایپ بومی \`|>\` حتماً باید پرانتز توابع را بگذارید (\`x |> mean()\`).
`,
  },
  {
    id: 'joins',
    seriesId: 'foundations',
    title: '19. Merging & Relational Joins',
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
    lesson: `### فصل 19 — اتصال و ترکیب جداول داده (Joins)

در سیستم‌های توزیع‌شده داده‌ها در چند جدول مجزا نگهداری می‌شوند.
- **Inner Join:** سطرهایی که در هر دو جدول وجود دارند (\`all = FALSE\`).
- **Left Join:** تمام سطرهای جدول پایه سمت چپ حفظ می‌شوند و در صورت نبود مقدار در جدول دوم، \`NA\` قرار می‌گیرد (\`all.x = TRUE\`).

#### ⚠️ دام‌های متداول (Common Gotchas):
- **انفجار سطرها با کلید تکراری:** اگر کلید انتخابی در یکی از جداول تکراری باشد، عملیات Join سطرها را در یکدیگر ضرب دکارتی می‌کند و تعداد سطرهای خروجی ناخواسته چندبرابر می‌شود.
`,
  },
  {
    id: 'anti-joins',
    seriesId: 'foundations',
    title: '20. Filtering Joins: Anti-Joins & Semi-Joins',
    brief: 'Filtering joins select rows from x based on matches in y without altering columns. Identify users in all_users who lack an active subscription into churned_users and extract churned_ids.',
    goal: 'churned_users <- subset(all_users, !(user_id %in% active_subscribers$user_id))\nchurned_ids <- churned_users$user_id',
    setup: 'all_users <- data.frame(user_id = 1:5, name = c("Alice", "Bob", "Charlie", "David", "Emma"), stringsAsFactors = FALSE)\nactive_subscribers <- data.frame(user_id = c(1, 3, 5), plan = c("Pro", "Basic", "Pro"), stringsAsFactors = FALSE)',
    par: 1,
    difficulty: 2,
    checks: [
      {
        type: 'eval',
        expr: 'is.data.frame(churned_users) && nrow(churned_users) == 2',
        label: 'churned_users contains 2 churned users',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(churned_ids, c(2, 4)))',
        label: 'churned_ids accurately matches user_id 2 and 4',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(churned_users$name, c("Bob", "David")))',
        label: 'churned_users isolates Bob and David',
      },
    ],
    hint: 'Use churned_users <- subset(all_users, !(user_id %in% active_subscribers$user_id)) and churned_ids <- churned_users$user_id.',
    lesson: `### فصل 20 — اتصال‌های فیلترکننده: Anti-Join و Semi-Join

در تحلیل داده‌های رابطه‌ای، دو دسته عملیات اتصال (Join) وجود دارد:
1. **اتصال‌های جهش‌دهنده (Mutating Joins):** مانند \`inner_join\` و \`left_join\` که ستون‌های جدول دوم را به جدول اول اضافه می‌کنند.
2. **اتصال‌های فیلترکننده (Filtering Joins):** که بدون افزودن هیچ ستون جدیدی، فقط سطرهای جدول اول را بر اساس وجود یا عدم وجود تطابق در جدول دوم فیلتر می‌کنند:
   - **Semi-Join:** سطرهایی از جدول اول را نگه می‌دارد که در جدول دوم کلید متناظر دارند.
   - **Anti-Join:** سطرهایی از جدول اول را نگه می‌دارد که در جدول دوم هیچ کلیدی برای آن‌ها وجود **ندارد**.

عملیات Anti-Join یکی از مهم‌ترین ابزارهای مهندسی داده برای کشف خطاهای پایگاه‌داده (مثل کلیدهای خارجی یتیم / Orphaned Records)، کاربران انصراف‌داده (Churned Customers) و کدهای مفقود در جداول مرجع است.

در R پایه، این الگو به سادگی و سرعت بالا با نقیض عملگر \`%in%\` پیاده‌سازی می‌شود:
\`\`\`r
churned <- subset(all_users, !(id %in% active_users$id))
\`\`\`

در پکیج \`dplyr\`، این الگو با تابع اختصاصی \`anti_join(x, y, by = "id")\` و \`semi_join(x, y, by = "id")\` فراخوانی می‌شود.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **تله مقادیر NA در مقایسه با \`%in%\` در برابر \`==\`:** عملگر \`%in%\` در زبان R با مقادیر \`NA\` بسیار ایمن رفتار می‌کند و اگر مقداری در سمت راست نباشد همیشه \`FALSE\` می‌دهد؛ بر خلاف \`==\` که اگر با \`NA\` مقایسه شود، خروجی \`NA\` تولید کرده و باعث خرابی فیلتر می‌شود.
`,
  },

  // Section 6: زمان و داده‌های پیشرفته
  {
    id: 'datetime',
    seriesId: 'foundations',
    title: '21. Dates & Times',
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
    lesson: `### فصل 21 — کار با تاریخ و سری‌های زمانی

زبان R از نوع داده \`Date\` برای تقویم و \`POSIXct\` برای زمان همراه با ساعت و منطقه زمانی پشتیبانی می‌کند.
تفریق دو تاریخ یک شیء \`difftime\` تولید می‌کند که با \`as.numeric()\` به تعداد روز تبدیل می‌شود.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **کدهای سال ۴ رقمی و ۲ رقمی:** در فرمت‌بندی تاریخ، \`%Y\` نشان‌دهنده سال ۴ رقمی (2026) و \`%y\` نشان‌دهنده سال ۲ رقمی (26) است. اشتباه گرفتن این دو باعث خطای محاسباتی سده می‌شود.
`,
  },
  {
    id: 'data-table',
    seriesId: 'foundations',
    title: '22. Fast Group Aggregation',
    brief: 'Aggregate data across categories. Use aggregate() to compute average miles per gallon (mpg) by cylinder count (cyl) in mtcars into cyl_summary.',
    goal: 'cyl_summary <- aggregate(mpg ~ cyl, data = mtcars, FUN = mean)',
    setup: '',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'is.data.frame(cyl_summary)',
        label: 'cyl_summary is a data frame',
      },
      {
        type: 'eval',
        expr: 'nrow(cyl_summary) == 3',
        label: 'cyl_summary aggregates 3 distinct cylinder categories',
      },
      {
        type: 'eval',
        expr: 'cyl_summary$mpg[cyl_summary$cyl == 4] > 25',
        label: '4-cylinder mean mpg is calculated correctly',
      },
    ],
    hint: 'Use cyl_summary <- aggregate(mpg ~ cyl, data = mtcars, FUN = mean).',
    lesson: `### فصل 22 — گروه‌بندی و تجمیع داده‌ها (Split-Apply-Combine)

یکی از پرکاربردترین نیازهای روزمره علم داده، خلاصه‌سازی و تجمیع متغیرهای پیوسته بر اساس دسته‌ها است.
فرمول نحوی \`aggregate(y ~ group, data, FUN)\` زبان R این الگو را به شکل فوق‌العاده کوتاه و خوانا پیاده‌سازی می‌کند.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **تکمیل سطرهای دارای NA:** به طور پیش‌فرض، \`aggregate\` سطرهایی که در متغیرهای گروه‌بندی آنها \`NA\` وجود دارد را حذف می‌کند، مگر اینکه با پارامتر \`na.action = na.pass\` مانع شوید.
`,
  },
  {
    id: 'outliers-plots',
    seriesId: 'foundations',
    title: '23. Outliers & Base Plots',
    brief: 'Detect statistical outliers with IQR() and visualize distribution using a publication-ready boxplot with labels.',
    goal: 'iqr_val <- IQR(ozone_clean)\nboxplot(ozone_clean, col = "#2569bb", main = "Ozone Distribution (ppb)", ylab = "Ozone (ppb)")',
    setup: 'ozone_clean <- na.omit(airquality$Ozone)',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(as.numeric(iqr_val), IQR(na.omit(airquality$Ozone))))',
        label: 'iqr_val matches IQR of Ozone',
      },
      {
        type: 'plot',
        label: 'Boxplot is rendered on the plot canvas',
      },
    ],
    hint: 'Calculate iqr_val <- IQR(ozone_clean) and render boxplot with main and ylab titles.',
    lesson: `### فصل 23 — شناسایی داده‌های پرت و مصورسازی مقدماتی

- **دامنه میان‌چارکی (IQR):** تفاوت بین چارک سوم (Q3) و چارک اول (Q1).
- **معیار توکی برای Outlierها:** داده‌هایی که کمتر از \`Q1 - 1.5*IQR\` یا بیشتر از \`Q3 + 1.5*IQR\` باشند نقاط دورافتاده تلقی می‌شوند.
- **نمودار جعبه‌ای (\`boxplot\`):** بهترین ابزار برای دیدن همزمان میانه، پراکندگی و نقاط پرت داده‌ها.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **حذف چشم‌بسته نقاط پرت:** هرگز نباید نقاط پرت را بدون تحقیق علمی حذف کرد؛ این نقاط گاهی حاوی باارزش‌ترین سیگنال‌های پنهان داده (مثل تقلب در تراکنش بانکی) هستند.
`,
  },

  // Section 7: آمار و مدل‌سازی (جدید و حرفه‌ای)
  {
    id: 'regression',
    seriesId: 'foundations',
    title: '24. Linear Regression & Model Diagnostics',
    brief: 'Fit a multiple linear regression model predicting mpg from vehicle weight (wt) and horsepower (hp) in mtcars, extracting model summary and R-squared.',
    goal: 'fit <- lm(mpg ~ wt + hp, data = mtcars)\nr_squared <- summary(fit)$r.squared',
    setup: '',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'inherits(fit, "lm")',
        label: 'fit is a fitted linear model',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(names(coef(fit)), c("(Intercept)", "wt", "hp")))',
        label: 'Model contains intercept, wt, and hp coefficients',
      },
      {
        type: 'eval',
        expr: 'r_squared > 0.8',
        label: 'Model explains over 80% of variance (R-squared > 0.8)',
      },
    ],
    hint: 'Use fit <- lm(mpg ~ wt + hp, data = mtcars) and r_squared <- summary(fit)$r.squared.',
    lesson: `### فصل 24 — رگرسیون خطی و مدل‌سازی آماری

قلب تپنده زبان R توانایی بی‌نظیر آن در آمار و مدل‌سازی ریاضی است.
تابع \`lm(formula, data)\` مدل رگرسیون خطی را با روش کمترین مربعات خطا (OLS) برازش می‌دهد:

\`\`\`r
fit <- lm(mpg ~ wt + hp, data = mtcars)
summary(fit)
\`\`\`

- **ضرایب (\`coef\`):** نشان‌دهنده شیب تغییرات متغیر هدف به ازای ۱ واحد تغییر در هر ویژگی.
- **ضریب تعیین (\`R-squared\`):** درصدی از پراکندگی داده‌ها که توسط مدل توجیه می‌شود.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **همبستگی برابر با علیت نیست (Correlation != Causation):** معنادار بودن آماری یک ضریب لزوماً به معنای رابطه علت و معلولی در دنیای واقعی نیست.
- **تله R-squared بالا:** با افزودن متغیرهای بی‌ربط، \`R-squared\` همیشه افزایش می‌یابد! در رگرسیون چندگانه همیشه باید \`Adjusted R-squared\` را بررسی کنید.
`,
  },
  {
    id: 'hypothesis',
    seriesId: 'foundations',
    title: '25. Hypothesis Testing & Predictions',
    brief: 'Conduct a two-sample t-test comparing fuel efficiency across transmission types (am in mtcars), and predict mpg for a 3000-lb car with 150 hp.',
    goal: 'ttest_res <- t.test(mpg ~ am, data = mtcars)\npred_mpg <- as.numeric(predict(fit, newdata = data.frame(wt = 3.0, hp = 150)))',
    setup: 'fit <- lm(mpg ~ wt + hp, data = mtcars)',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'inherits(ttest_res, "htest")',
        label: 'ttest_res is a valid hypothesis test object',
      },
      {
        type: 'eval',
        expr: 'ttest_res$p.value < 0.05',
        label: 'p-value is statistically significant (< 0.05)',
      },
      {
        type: 'eval',
        expr: 'pred_mpg > 15 && pred_mpg < 25',
        label: 'pred_mpg predicted within expected range (15-25 mpg)',
      },
    ],
    hint: 'Run ttest_res <- t.test(mpg ~ am, data = mtcars) and pred_mpg <- as.numeric(predict(fit, newdata = data.frame(wt = 3.0, hp = 150))).',
    lesson: `### فصل 25 — آزمون فرض آماری و پیش‌بینی (Inference & Prediction)

آزمون‌های آماری به ما اجازه می‌دهند تصمیم بگیریم آیا تفاوت مشاهده‌شده بین گروه‌ها واقعی است یا ناشی از شانس و تصادف.
تابع \`t.test()\` تفاوت میانگین دو گروه (مانند گیربکس اتوماتیک در برابر دستی) را آزمون می‌کند.
اگر مقدار **p-value** کمتر از ۰.۰۵ باشد، فرض صفر رد شده و تفاوت معنادار آماری تلقی می‌گردد.

سپس با تابع \`predict(model, newdata)\` می‌توان از مدل آموزش‌دیده برای پیش‌بینی روی رکوردهای ندیده‌شده استفاده کرد.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **هم‌نام بودن ستون‌های \`newdata\`:** ورودی \`newdata\` در تابع \`predict\` باید حتماً یک \`data.frame\` باشد و نام ستون‌های آن دقیقاً مطابق با متغیرهای ورودی فرمول اولیه مدل باشد.
`,
  },
  {
    id: 'appendix',
    seriesId: 'foundations',
    title: '26. Capstone: End-to-End Analysis',
    brief: 'Complete pipeline on airquality: clean NAs, compute correlation between Temp and Ozone, and render an exploratory scatter plot with regression trendline (abline).',
    goal: 'clean_air <- na.omit(airquality)\ncor_val <- cor(clean_air$Ozone, clean_air$Temp)\nplot(clean_air$Temp, clean_air$Ozone, pch = 19, col = "#2569bb", xlab = "Temp (F)", ylab = "Ozone (ppb)", main = "Ozone vs Temperature")\nabline(lm(Ozone ~ Temp, data = clean_air), col = "#ff8c1a", lwd = 2)',
    setup: '',
    par: 1,
    difficulty: 4,
    checks: [
      {
        type: 'eval',
        expr: 'is.data.frame(clean_air) && nrow(clean_air) == 111',
        label: 'clean_air contains 111 complete observations',
      },
      {
        type: 'eval',
        expr: 'cor_val > 0.6 && cor_val < 0.8',
        label: 'cor_val correctly measures positive correlation (~0.698)',
      },
      {
        type: 'plot',
        label: 'Scatter plot with regression trendline is rendered on canvas',
      },
    ],
    hint: 'Clean with na.omit(), compute cor(), and draw plot() followed by abline(lm(...)).',
    lesson: `### فصل 26 — پروژه جامع: تحلیل کامل صفر تا صد علم داده

تبریک می‌گوییم! شما تمام مهارت‌های پایه‌ای تا پیشرفته، پاکسازی، ساختارهای داده، آمار، رگرسیون و مصورسازی علمی زبان R را فرا گرفتید.
در این پروژه نهایی:
۱. داده‌های واقعی کیفیت هوای نیویورک را بارگذاری و مقادیر مفقوده را پاکسازی می‌کنید.
۲. همبستگی پیرسون بین دو پدیده فیزیکی (دما و غلظت ازن) را محاسبه می‌کنید.
۳. نمودار نقطه‌ای علمی را همراه با خط روند رگرسیون خطی رسم می‌کنید.
`,
  },

  // Section 8: توسعه پکیج و مهندسی نرم‌افزار با R (بر اساس کتاب R Packages)
  {
    id: 'pkg-anatomy',
    seriesId: 'foundations',
    title: '27. Package Anatomy & DESCRIPTION',
    brief: 'Every R package is centered around a DESCRIPTION file. Create a valid metadata record using write.dcf() with Package, Title, Version, and License.',
    goal: 'desc <- data.frame(Package = "datapkg", Title = "Data Utilities", Version = "0.1.0", License = "MIT", Description = "Practical analytical tools.")\nwrite.dcf(desc, file = "DESCRIPTION")\npkg_desc <- as.list(as.data.frame(read.dcf("DESCRIPTION")))',
    setup: 'if (file.exists("DESCRIPTION")) file.remove("DESCRIPTION")',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'file.exists("DESCRIPTION")',
        label: 'DESCRIPTION file exists on disk',
      },
      {
        type: 'eval',
        expr: 'is.list(pkg_desc) && pkg_desc$Package == "datapkg"',
        label: 'Package name is set to "datapkg"',
      },
      {
        type: 'eval',
        expr: 'pkg_desc$Version == "0.1.0"',
        label: 'Initial version is set to 0.1.0',
      },
    ],
    hint: 'Construct a data.frame with Package, Title, Version, License and Description, write with write.dcf(), and read back with read.dcf().',
    lesson: `### فصل 27 — کالبدشناسی پکیج و فایل حیاتی DESCRIPTION

در اکوسیستم R، پکیج بالاترین سطح ماژولارکردن و اشتراک‌گذاری کد و داده است.
ساختار یک پکیج استاندارد بر اساس قراردادهای مشخص دایرکتوری شکل می‌گیرد:
- **\`DESCRIPTION\`**: شناسنامه رسمی و متادیتای پکیج (نام، نسخه، نویسندگان، مجوز و پیش‌نیازها).
- **\`NAMESPACE\`**: مشخص‌کننده مرزهای خارجی پکیج (کدام توابع عمومی‌اند و کدام توابع خصوصی).
- **\`R/\`**: تمام کدهای منبع توابع پکیج در این پوشه قرار می‌گیرند.
- **\`man/\`**: مستندات و راهنمای توابع که با فرمت \`.Rd\` ذخیره می‌شوند.

فایل \`DESCRIPTION\` با فرمت متنی DCF (Debian Control Format) ذخیره می‌شود و توابع \`read.dcf()\` و \`write.dcf()\` مستقیماً آن را در R می‌خوانند و می‌نویسند.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **قوانین سخت‌گیرانه نام‌گذاری پکیج:** نام یک پکیج R در CRAN فقط و فقط می‌تواند شامل حروف انگلیسی، اعداد و نقطه (\`.\`) باشد. حتماً باید با یک حرف شروع شود و استفاده از خط تیره (\`-\`) یا آندرلاین (\`_\`) اکیداً ممنوع و غیرمجاز است!
- **شماره‌گذاری نسخه:** همیشه از نسخه‌بندی معنایی (Semantic Versioning) با حداقل ۳ بخش عددی استفاده کنید (مانند \`0.1.0\`).
`,
  },
  {
    id: 'pkg-deps',
    seriesId: 'foundations',
    title: '28. Dependencies: Imports vs Suggests',
    brief: 'Never call library() inside package code! Write a robust safe_median function that checks if stats is available via requireNamespace() and calls stats::median().',
    goal: 'safe_median <- function(x) {\n  if (!requireNamespace("stats", quietly = TRUE)) {\n    stop("Package \'stats\' required.")\n  }\n  stats::median(x, na.rm = TRUE)\n}',
    setup: '',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'is.function(safe_median)',
        label: 'safe_median is defined as a function',
      },
      {
        type: 'eval',
        expr: 'safe_median(c(10, 20, 30)) == 20 && safe_median(c(5, NA, 15)) == 10',
        label: 'safe_median computes median correctly with na.rm',
      },
      {
        type: 'pattern',
        pattern: 'requireNamespace',
        label: 'Uses requireNamespace instead of library()',
      },
    ],
    hint: 'Check requireNamespace("stats", quietly = TRUE) and delegate calculation to stats::median(x, na.rm = TRUE).',
    lesson: `### فصل 28 — مدیریت وابستگی‌ها: تفاوت Imports و Suggests

یکی از حیاتی‌ترین مباحث مهندسی نرم‌افزار با R، تعریف وابستگی‌های پکیج در فایل \`DESCRIPTION\` است:
- **\`Imports\`**: بسته‌هایی که توابع شما مستقیماً در حین اجرا به آن‌ها وابسته هستند و هنگام نصب پکیج شما، خودکار نصب می‌شوند.
- **\`Suggests\`**: بسته‌های اختیاری که فقط برای اجرای تست‌های واحد، ساخت نمونه‌ها، یا مقالات راهنما (Vignettes) لازم‌اند.

#### قانون طلایی توسعه پکیج:
**هرگز در کدهای داخل پکیج از \`library()\` یا \`require()\` استفاده نکنید!** فراخوانی \`library()\` مسیر جستجوی سراسری کاربر را دستکاری کرده و در آزمون‌های CRAN باعث رد شدن فوری (Error) می‌شود.

به جای آن، برای دسترسی به توابع پکیج‌های خارجی از \`pkg::fun()\` استفاده کنید و برای وابستگی‌های اختیاری از الگوی ایمن:
\`\`\`r
if (!requireNamespace("pkg", quietly = TRUE)) {
  stop("Package 'pkg' is needed for this function to work.")
}
\`\`\`

#### ⚠️ دام‌های متداول (Common Gotchas):
- **تله Depends vs Imports:** فیلد قدیمی \`Depends\` تمام توابع پکیج پیش‌نیاز را به فضای سراسری کاربر تحمیل می‌کند و باعث تداخل نام متغیرها می‌شود. استاندارد مدرن همیشه استفاده از \`Imports\` است.
`,
  },
  {
    id: 'pkg-code',
    seriesId: 'foundations',
    title: '29. Package Code & Side Effects (on.exit)',
    brief: 'Package functions must never leave side effects in the global environment. Write with_temp_digits using on.exit(add = TRUE) to format numbers under a temporary digits setting.',
    goal: 'with_temp_digits <- function(x, digits = 2) {\n  old_opt <- options(digits = digits)\n  on.exit(options(old_opt), add = TRUE)\n  format(x)\n}',
    setup: '',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'is.function(with_temp_digits)',
        label: 'with_temp_digits is defined as a function',
      },
      {
        type: 'eval',
        expr: 'cur_d <- getOption("digits"); res <- with_temp_digits(pi, 3); isTRUE(all.equal(getOption("digits"), cur_d))',
        label: 'Restores global options upon function exit',
      },
      {
        type: 'pattern',
        pattern: 'on\\.exit',
        label: 'Uses on.exit to guarantee cleanup',
      },
    ],
    hint: 'Save old_opt <- options(digits = digits) and register on.exit(options(old_opt), add = TRUE) before formatting x.',
    lesson: `### فصل 29 — کدهای سازگار با پکیج و پاکسازی اثرات جانبی (on.exit)

یک پکیج حرفه‌ای باید «مهمان مؤدبی» در سشن کاربر باشد!
این یعنی هرگز نباید متغیرهایی در \`.GlobalEnv\` ایجاد کند، نباید دایرکتوری جاری را با \`setwd()\` تغییر دهد، و نباید تنظیمات سراسری مانند \`options()\` یا پارامترهای گرافیکی \`par()\` را بدون بازگردانی دستکاری کند.

الگوی رسمی و تاییدشده CRAN برای مدیریت این وضعیت، استفاده از تابع حیاتی \`on.exit()\` است:
\`\`\`r
my_fn <- function(x) {
  old_par <- par(mfrow = c(1, 2))
  on.exit(par(old_par), add = TRUE)
  # ادامه محاسبات و رسم نمودار
}
\`\`\`
حتی اگر در میانه اجرای تابع خطایی رخ دهد، R تضمین می‌کند که دستور داخل \`on.exit()\` اجرا شده و محیط کاربر به حالت اولیه بازگردد.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **فراموش کردن آرگومان \`add = TRUE\`:** اگر \`add = TRUE\` را قرار ندهید، هر فراخوانی جدید \`on.exit()\` دستورات قبلی ثبت‌شده را پاک می‌کند! همیشه بنویسید \`on.exit(..., add = TRUE)\`.
`,
  },
  {
    id: 'pkg-roxygen',
    seriesId: 'foundations',
    title: '30. Documentation with roxygen2',
    brief: 'In R packages, functions are documented using roxygen2 comments. Implement normalize_vec and define its roxygen metadata tags for title, param, return, and export.',
    goal: 'normalize_vec <- function(x) {\n  rng <- range(x, na.rm = TRUE)\n  if (diff(rng) == 0) return(rep(0, length(x)))\n  (x - rng[1]) / diff(rng)\n}\nroxy_tags <- list(title = "Normalize vector", param = "x: Numeric vector", return = "Scaled numeric vector in [0, 1]", export = TRUE)',
    setup: '',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'is.function(normalize_vec)',
        label: 'normalize_vec is defined as a function',
      },
      {
        type: 'eval',
        expr: 'isTRUE(all.equal(normalize_vec(c(0, 5, 10)), c(0, 0.5, 1)))',
        label: 'normalize_vec correctly scales values between 0 and 1',
      },
      {
        type: 'eval',
        expr: 'is.list(roxy_tags) && isTRUE(roxy_tags$export)',
        label: 'roxy_tags specifies export = TRUE',
      },
    ],
    hint: 'Define normalize_vec and specify roxy_tags with title, param, return, and export = TRUE.',
    lesson: `### فصل 30 — مستندسازی مدرن با roxygen2

در گذشته توسعه‌دهندگان R مجبور بودند مستندات توابع را دستی با کدهای شبیه LaTeX در فایل‌های \`man/*.Rd\` بنویسند.
پکیج انقلابی \`roxygen2\` به شما اجازه می‌دهد مستندات را مستقیماً بالای تعریف هر تابع با پیشوند \`#'\` بنویسید:

\`\`\`r
#' مقیاس‌بندی بردار به بازه [0, 1]
#'
#' @param x بردار عددی ورودی
#' @return بردار عددی نرمال‌شده بین صفر و یک
#' @export
#' @examples
#' normalize_vec(c(10, 20, 30))
normalize_vec <- function(x) { ... }
\`\`\`

دستور \`devtools::document()\` به صورت خودکار این کامنت‌ها را پردازش کرده و فایل‌های راهنما و \`NAMESPACE\` را بروزرسانی می‌کند.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **از قلم انداختن تگ \`@export\`:** اگر \`@export\` را بالای تابعی نگذارید، آن تابع در پکیج باقی می‌ماند اما خصوصی (Internal) تلقی می‌شود و کاربران پس از \`library(mypkg)\` به آن دسترسی مستقیم نخواهند داشت.
`,
  },
  {
    id: 'pkg-namespace',
    seriesId: 'foundations',
    title: '31. NAMESPACE & Information Hiding',
    brief: 'The NAMESPACE file defines public exports and imported foreign symbols. Write a NAMESPACE file exporting normalize_vec and importing median and IQR from stats.',
    goal: 'writeLines(c("export(normalize_vec)", "importFrom(stats, median, IQR)"), con = "NAMESPACE")\nns_content <- readLines("NAMESPACE")',
    setup: 'if (file.exists("NAMESPACE")) file.remove("NAMESPACE")',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'file.exists("NAMESPACE")',
        label: 'NAMESPACE file exists on disk',
      },
      {
        type: 'eval',
        expr: 'any(grepl("^export\\\\(normalize_vec\\\\)", ns_content))',
        label: 'NAMESPACE exports normalize_vec',
      },
      {
        type: 'eval',
        expr: 'any(grepl("^importFrom\\\\(stats", ns_content))',
        label: 'NAMESPACE imports specific functions from stats',
      },
    ],
    hint: 'Write export(normalize_vec) and importFrom(stats, median, IQR) to "NAMESPACE" and read it into ns_content.',
    lesson: `### فصل 31 — مدیریت فضای نام (NAMESPACE) و پنهان‌سازی اطلاعات

فایل \`NAMESPACE\` کنترل‌کننده مرزهای ماژول شماست و دو وظیفه کلیدی دارد:
1. **صادرات (Export):** تعیین اینکه کدام توابع با بارگذاری پکیج در دسترس کاربر قرار می‌گیرند (\`export(fun)\`).
2. **ورود انتخابی (Import):** توابعی که پکیج شما از سایر بسته‌ها قرض می‌گیرد (\`importFrom(pkg, fun)\`).

این مکانیزم مانع از تداخل نام‌ها (Name Clashes) می‌شود. برای مثال اگر شما و یک پکیج دیگر هر دو تابعی به نام \`filter\` داشته باشید، \`NAMESPACE\` مانع از خراب شدن کدهای پکیج شما می‌شود.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **تله وارد کردن فله‌ای با \`import(pkg)\`:** هرگز کل یک پکیج بزرگ را با \`import(pkg)\` وارد نکنید! این کار صدها تابع را وارد فضای داخلی پکیج کرده و ریسک تداخل را به شدت بالا می‌برد. همیشه از \`importFrom(pkg, fun1, fun2)\` استفاده کنید.
`,
  },
  {
    id: 'pkg-testing',
    seriesId: 'foundations',
    title: '32. Unit Testing with testthat',
    brief: 'Unit testing powers reliable R packages. Implement testthat-compatible assertions expect_equal and expect_error, and run a test_suite verifying normalize_vec.',
    goal: 'expect_equal <- function(act, exp) { stopifnot(isTRUE(all.equal(act, exp))); TRUE }\nexpect_error <- function(expr) { ok <- tryCatch({ expr; FALSE }, error = function(e) TRUE); stopifnot(ok); TRUE }\ntest_results <- list(t1 = expect_equal(normalize_vec(1:3), c(0, 0.5, 1)), t2 = expect_error(stop("Err")))',
    setup: 'normalize_vec <- function(x) { rng <- range(x, na.rm = TRUE); if (diff(rng) == 0) rep(0, length(x)) else (x - rng[1]) / diff(rng) }',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'is.function(expect_equal) && is.function(expect_error)',
        label: 'expect_equal and expect_error testing helpers are defined',
      },
      {
        type: 'eval',
        expr: 'isTRUE(test_results$t1)',
        label: 'Equality test t1 passes successfully',
      },
      {
        type: 'eval',
        expr: 'isTRUE(test_results$t2)',
        label: 'Error expectation test t2 passes successfully',
      },
    ],
    hint: 'Implement expect_equal using all.equal() and expect_error using tryCatch(), then run test_results.',
    lesson: `### فصل 32 — تست خودکار نرم‌افزار با فریم‌ورک testthat

در مهندسی پکیج‌های R، تست‌های خودکار در پوشه \`tests/testthat/\` قرار می‌گیرند.
پکیج \`testthat\` ساختار استاندارد تست را با بلاک‌های \`test_that()\` و توابع \`expect_*\` فراهم می‌سازد:
- **\`expect_equal(actual, expected)\`**: بررسی برابری مقادیر با تلورانس عددی
- **\`expect_error(expr)\`**: بررسی اینکه ورودی نامعتبر حتماً خطای درستی پرتاب کند
- **\`expect_true(cond)\`**: ارزیابی شروط منطقی

با زدن میانبر **Ctrl + Shift + T** یا دستور \`devtools::test()\`، صدها تست در چند ثانیه اجرا شده و از شکست رگرسیونی (Regression Bugs) جلوگیری می‌شود.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **تست اعشاری با \`==\` در تست‌ها:** هرگز ننویسید \`expect_true(val == 0.3)\`! در سیستم‌های عامل و پردازنده‌های مختلف محاسبات اعشاری تفاوت‌های ناچیزی دارند که باعث شکست تست می‌شود. همیشه از \`expect_equal()\` استفاده کنید.
`,
  },
  {
    id: 'pkg-data',
    seriesId: 'foundations',
    title: '33. Package Data & Extdata Assets',
    brief: 'Packages ship raw non-R files in inst/extdata. Create inst/extdata/sample_cars.csv and load it back using read.csv() into raw_asset.',
    goal: 'dir.create("inst/extdata", recursive = TRUE, showWarnings = FALSE)\nwrite.csv(head(mtcars, 5), file = "inst/extdata/sample_cars.csv", row.names = FALSE)\nraw_asset <- read.csv("inst/extdata/sample_cars.csv")',
    setup: '',
    par: 1,
    difficulty: 3,
    checks: [
      {
        type: 'eval',
        expr: 'file.exists("inst/extdata/sample_cars.csv")',
        label: 'External asset file exists in inst/extdata',
      },
      {
        type: 'eval',
        expr: 'is.data.frame(raw_asset) && nrow(raw_asset) == 5',
        label: 'raw_asset loaded 5 rows from package asset',
      },
      {
        type: 'eval',
        expr: '"mpg" %in% names(raw_asset)',
        label: 'sample_cars.csv contains expected vehicle columns',
      },
    ],
    hint: 'Create directory with dir.create("inst/extdata", recursive = TRUE), write with write.csv(), and read back into raw_asset.',
    lesson: `### فصل 33 — انتشار داده‌ها و فایل‌های ضمیمه در پکیج

پکیج‌های R می‌توانند دو دسته داده را توزیع کنند:
1. **داده‌های رسمی پکیج (\`data/\`):** دیتافریم‌های باینری به فرمت \`.rda\` که با دستور \`usethis::use_data()\` تولید شده و مستقیماً توسط کاربر با \`data(my_dataset)\` قابل استفاده‌اند.
2. **فایل‌های خام خارجی (\`inst/extdata/\`):** فایل‌های CSV، اکسل، تصاویر یا فایل‌های پیکربندی که کاربر باید بتواند نحوه خواندن آن‌ها را تمرین کند.

هنگام نصب پکیج، محتویات پوشه \`inst/\` به ریشه اصلی پکیج منتقل می‌شود؛ بنابراین برای آدرس‌دهی ایمن از تابع استاندارد \`system.file()\` استفاده می‌شود:
\`\`\`r
path <- system.file("extdata", "sample_cars.csv", package = "mypkg")
\`\`\`

#### ⚠️ دام‌های متداول (Common Gotchas):
- **مسیردهی اشتباه با \`inst\` در سیستم کاربر:** هرگز در کد تابع ننویسید \`system.file("inst/extdata", ...)\`! چون پیشوند \`inst/\` در پکیج نصب‌شده حذف شده است.
`,
  },
  {
    id: 'pkg-check',
    seriesId: 'foundations',
    title: '34. R CMD check & CRAN Readiness',
    brief: 'R CMD check is the gold standard quality gate. Write check_package to verify DESCRIPTION metadata and NAMESPACE exports, returning 0 errors, warnings, and notes.',
    goal: 'check_package <- function(desc_path = "DESCRIPTION", ns_path = "NAMESPACE") {\n  d <- as.list(as.data.frame(read.dcf(desc_path)))\n  req_fields <- c("Package", "Title", "Version", "License", "Description")\n  has_fields <- all(req_fields %in% names(d))\n  ns <- readLines(ns_path)\n  has_exp <- any(grepl("^export\\\\(", ns))\n  list(ok = has_fields && has_exp, errors = 0, warnings = 0, notes = 0)\n}\ncheck_result <- check_package()',
    setup: 'write.dcf(data.frame(Package = "mypkg", Title = "Tool", Version = "1.0.0", License = "MIT", Description = "A package."), "DESCRIPTION")\nwriteLines("export(fn)", "NAMESPACE")',
    par: 1,
    difficulty: 4,
    checks: [
      {
        type: 'eval',
        expr: 'is.function(check_package)',
        label: 'check_package diagnostic function is defined',
      },
      {
        type: 'eval',
        expr: 'is.list(check_result) && isTRUE(check_result$ok)',
        label: 'Package passes metadata and namespace validation checks',
      },
      {
        type: 'eval',
        expr: 'check_result$errors == 0 && check_result$warnings == 0 && check_result$notes == 0',
        label: 'CRAN compliance target achieved: 0 errors | 0 warnings | 0 notes',
      },
    ],
    hint: 'Implement check_package to inspect read.dcf() fields and NAMESPACE exports, verifying 0 errors, warnings, and notes.',
    lesson: `### فصل 34 — کنترل کیفیت و انتشار بسته با R CMD check

ابزار \`R CMD check\` (که از طریق \`devtools::check()\` اجرا می‌شود) دروازه کیفیت افسانه‌ای دنیای R است.
این فرآیند بیش از ۵۰ آزمون موشکافانه را روی پکیج اجرا می‌کند:
- انطباق دقیق آرگومان‌های توابع با فایل‌های مستندات
- فقدان هرگونه فراخوانی غیرمجاز \`library()\`
- اجرای موفق ۱۰۰٪ تست‌های واحد
- نبود متغیرهای سراسری تعریف‌نشده

خروجی نهایی به سه دسته تقسیم می‌شود:
- **ERROR**: خطای مهلک؛ پکیج نصب یا بیلد نمی‌شود.
- **WARNING**: اخطار جدی؛ سیاست‌های CRAN نقض شده است.
- **NOTE**: نکات جزئی یا توصیه‌ها.

هدف هر توسعه‌دهنده حرفه‌ای رسیدن به وضعیت رویایی **0 errors | 0 warnings | 0 notes** است.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **متغیرهای ستونی در dplyr و R CMD check NOTE:** ارزیابی غیر استاندارد (NSE) در توابعی مثل \`subset()\` یا \`dplyr::filter()\` باعث می‌شود \`R CMD check\` فکر کند نام ستون‌ها متغیرهای سراسری تعریف‌نشده هستند! راه‌حل استاندارد: معرفی آنها در \`R/globals.R\` با دستور \`utils::globalVariables(c("col1", "col2"))\`.
`,
  },
  {
    id: "tidy-tibble",
    seriesId: 'foundations',
    title: "35. Modern Data Frames with tibble",
    brief: "Tibbles enforce stricter semantics than base data.frames. Upgrade raw_df to a tibble tbl with as_tibble() and create a new tibble grades with columns student and mark.",
    goal: "tbl <- as_tibble(raw_df)\ngrades <- tibble(student = c(\"A\", \"B\"), mark = c(90, 85))",
    setup: "as_tibble <- function(x) { class(x) <- unique(c(\"tbl_df\", \"tbl\", class(x))); x }\ntibble <- function(...) { dots <- list(...); df <- as.data.frame(dots, stringsAsFactors = FALSE); class(df) <- unique(c(\"tbl_df\", \"tbl\", class(df))); df }\nraw_df <- data.frame(id = 1:3, name = c(\"Alice\", \"Bob\", \"Charlie\"), score = c(95, 88, 92), stringsAsFactors = FALSE)",
    par: 1,
    difficulty: 2,
    checks: [
          {
                "type": "eval",
                "expr": "inherits(tbl, \"tbl_df\") && nrow(tbl) == 3",
                "label": "tbl is a valid tibble with 3 rows"
          },
          {
                "type": "eval",
                "expr": "inherits(grades, \"tbl_df\") && all(c(\"student\", \"mark\") %in% names(grades)) && length(grades$mark) == 2",
                "label": "grades is a tibble with student and mark columns"
          }
    ],
    hint: "Call tbl <- as_tibble(raw_df) and grades <- tibble(student = c(\"A\", \"B\"), mark = c(90, 85)).",
    lesson: "### فصل ۳۵ — ساختار مدرن داده‌ها با tibble\n\nپکیج `tibble` ستون فقرات ساختار داده‌های اکوسیستم `tidyverse` است و نسخه بازطراحی‌شده `data.frame` سنتی R به شمار می‌رود.\nتفاوت‌های بنیادین تیبل‌ها با دیتافریم سنتی:\n1. **عدم تطابق ناقص ستون‌ها (No Partial Matching):** اگر ستونی بنام `xyz` داشته باشید، دستور `df$x` در دیتافریم سنتی به اشتباه آن را پیدا می‌کند اما در `tibble` اخطار صادر می‌شود.\n2. **عدم کاهش ناخواسته ابعاد (No Silent Dimension Drop):** در دیتافریم سنتی اگر یک ستون را با `df[, 1]` انتخاب کنید، جدول ناگهان به یک بردار تقلیل می‌یابد. در تیبل همیشه یک شیء دو بعدی باقی می‌ماند.\n3. **نمایش بهینه و چاپ هوشمند:** هنگام چاپ تیبل در کنسول، فقط ۱۰ سطر اول نمایش داده شده و نوع دقیق داده هر ستون مانند `<dbl>` یا `<chr>` در بالای آن درج می‌گردد.\n\n#### ⚠️ دام‌های متداول (Common Gotchas):\n- **تبدیل ماتریس به تیبل:** برای تبدیل ماتریس‌ها یا جداول سنتی به تیبل همیشه از `as_tibble()` استفاده کنید نه `tibble()`. تابع `tibble()` برای ساخت دستی ستون‌ها به کار می‌رود.",
  },
  {
    id: "tidy-dplyr",
    seriesId: 'foundations',
    title: "36. Fast Data Manipulation with dplyr",
    brief: "dplyr standardizes wrangling with 5 core verbs. Filter flights where dep_delay > 0, compute speed = air_time / 60 with mutate, and arrange by desc(dep_delay) into delayed_flights.",
    goal: "delayed_flights <- flights |> filter(dep_delay > 0) |> mutate(speed = air_time / 60) |> arrange(desc(dep_delay))",
    setup: "filter <- function(.data, ...) { expr <- substitute(...); cond <- eval(expr, envir = .data, enclos = parent.frame()); .data[cond & !is.na(cond), , drop = FALSE] }\nmutate <- function(.data, ...) { dots <- match.call(expand.dots = FALSE)$...; res <- .data; for (nm in names(dots)) { res[[nm]] <- eval(dots[[nm]], envir = res, enclos = parent.frame()) }; res }\ndesc <- function(x) -xtfrm(x)\narrange <- function(.data, ...) { expr <- substitute(order(...)); ord <- eval(expr, envir = .data, enclos = parent.frame()); .data[ord, , drop = FALSE] }\nflights <- data.frame(dest = c(\"IAH\", \"MIA\", \"IAH\", \"JFK\", \"MIA\"), dep_delay = c(15, -5, 30, 0, 45), air_time = c(180, 150, 190, 320, 140), stringsAsFactors = FALSE)",
    par: 1,
    difficulty: 3,
    checks: [
          {
                "type": "eval",
                "expr": "is.data.frame(delayed_flights) && nrow(delayed_flights) == 3",
                "label": "delayed_flights contains 3 delayed flights"
          },
          {
                "type": "eval",
                "expr": "all(delayed_flights$dep_delay > 0) && \"speed\" %in% names(delayed_flights)",
                "label": "Filtered dep_delay > 0 and computed speed column"
          },
          {
                "type": "eval",
                "expr": "delayed_flights$dep_delay[1] == 45 && delayed_flights$dep_delay[3] == 15",
                "label": "Rows are arranged descending by dep_delay"
          }
    ],
    hint: "Pipe flights into filter(dep_delay > 0), mutate(speed = air_time / 60), and arrange(desc(dep_delay)).",
    lesson: "### فصل ۳۶ — دستکاری داده‌ها با افعال پنج‌گانه dplyr\n\nپکیج `dplyr` دستور زبان پالایش و تبدیل داده‌ها در علم داده مدرن است.\nعملیات اصلی حول ۵ فعل بنیادی انجام می‌شود:\n- **`filter()`**: انتخاب سطرهایی که شرط‌های منطقی معینی را برآورده می‌کنند.\n- **`select()`**: انتخاب یا حذف ستون‌های خاص با نام یا موقعیت.\n- **`mutate()`**: ایجاد ستون‌های محاسباتی جدید بر پایه ستون‌های موجود.\n- **`arrange()`**: مرتب‌سازی سطرها به صورت صعودی یا نزولی با `desc()`.\n- **`summarise()`**: تجمیع و خلاصه‌سازی ستون‌ها (مانند میانگین، مجموع و واریانس).\n\nترکیب این توابع با عملگر پایپ (`|>`) باعث خوانایی شبیه به زبان طبیعی می‌شود.\n\n#### ⚠️ دام‌های متداول (Common Gotchas):\n- **اشتباه در استفاده از عملگر مساوی:** در تابع `filter()` همیشه از عملگر مقایسه‌ای `==` استفاده کنید نه عملگر انتساب `=`.\n- **ماسک کردن توابع توسط سایر پکیج‌ها:** تابع `filter` در R پایه یا در پکیج `stats` برای سری‌های زمانی وجود دارد. در صورت تداخل، صراحتاً بنویسید `dplyr::filter()`.",
  },
  {
    id: "tidy-ggplot2",
    seriesId: 'foundations',
    title: "37. Grammar of Graphics with ggplot2",
    brief: "ggplot2 implements the Grammar of Graphics by layering data, aesthetics, and geoms. Build scatter_p using ggplot(mtcars, aes(x = wt, y = mpg)) + geom_point() + labs(title = \"Fuel Economy\").",
    goal: "scatter_p <- ggplot(mtcars, aes(x = wt, y = mpg)) + geom_point() + labs(title = \"Fuel Economy\")",
    setup: "ggplot <- function(data = NULL, mapping = list()) { structure(list(data = data, mapping = mapping, layers = list(), labels = list()), class = \"ggplot\") }\naes <- function(x, y, ...) { as.list(match.call())[-1] }\ngeom_point <- function(...) { list(geom = \"point\", params = list(...)) }\nlabs <- function(...) { list(labels = list(...)) }\n`+.ggplot` <- function(p, layer) { if (!is.null(layer$geom)) p$layers <- c(p$layers, list(layer)); if (!is.null(layer$labels)) p$labels <- c(p$labels, layer$labels); p }",
    par: 1,
    difficulty: 2,
    checks: [
          {
                "type": "eval",
                "expr": "inherits(scatter_p, \"ggplot\")",
                "label": "scatter_p is a ggplot object"
          },
          {
                "type": "eval",
                "expr": "length(scatter_p$layers) >= 1 && scatter_p$layers[[1]]$geom == \"point\"",
                "label": "Point geometry layer added"
          },
          {
                "type": "eval",
                "expr": "identical(scatter_p$labels$title, \"Fuel Economy\")",
                "label": "Title label set to \"Fuel Economy\""
          }
    ],
    hint: "Use scatter_p <- ggplot(mtcars, aes(x = wt, y = mpg)) + geom_point() + labs(title = \"Fuel Economy\").",
    lesson: "### فصل ۳۷ — تصویرسازی علمی با گرامر گرافیک (ggplot2)\n\nپکیج `ggplot2` پیاده‌سازی نظریه دستور زبان گرافیک (Leland Wilkinson) است.\nیک نمودار در ggplot2 حاصل ترکیب چند لایه مجزا با عملگر `+` است:\n1. **داده‌ها (Data):** یک `data.frame` یا `tibble` که مشاهدات را در بر دارد.\n2. **نگاشت‌های زیبایی‌شناختی (`aes`):** اتصال متغیرهای داده به ابعاد بصری نمودار مانند محور افقی (`x`)، محور عمودی (`y`)، رنگ (`color`) و اندازه (`size`).\n3. **لایه‌های هندسی (`geom_*`):** نحوه ترسیم نقاط، خطوط یا ستون‌ها (`geom_point`, `geom_line`, `geom_col`).\n4. **برچسب‌ها و تم‌ها (`labs`, `theme`):** تنظیم عنوان، راهنماها و استایل گرافیکی.\n\n#### ⚠️ دام‌های متداول (Common Gotchas):\n- **استفاده از پایپ `|>` به جای `+`:** در دستورات `ggplot2` لایه‌ها همیشه با عملگر `+` ترکیب می‌شوند نه عملگر پایپ `|>`!\n- **قرار دادن رنگ ثابت درون `aes()`:** اگر می‌خواهید همه نقاط آبی باشند بنویسید `geom_point(color = \"blue\")`. قرار دادن آن درون `aes(color = \"blue\")` آن را به عنوان یک دسته داده‌ای تعبیر می‌کند.",
  },
  {
    id: "tidy-tidyr",
    seriesId: 'foundations',
    title: "38. Modern Tidy Reshaping with tidyr",
    brief: "tidyr standardizes data reshaping. Use pivot_longer() to pivot survey_wide cols c(\"q1\", \"q2\") into names_to = \"question\" and values_to = \"score\" stored in survey_tidy.",
    goal: "survey_tidy <- pivot_longer(survey_wide, cols = c(\"q1\", \"q2\"), names_to = \"question\", values_to = \"score\")",
    setup: "pivot_longer <- function(data, cols, names_to = \"name\", values_to = \"value\") { cols <- as.character(substitute(cols)); if (cols[1] == \"c\") cols <- cols[-1]; id_cols <- setdiff(names(data), cols); res_list <- list(); for (col in cols) { sub_df <- data[, id_cols, drop = FALSE]; sub_df[[names_to]] <- col; sub_df[[values_to]] <- data[[col]]; res_list[[length(res_list) + 1]] <- sub_df }; out <- do.call(rbind, res_list); rownames(out) <- NULL; out }\nsurvey_wide <- data.frame(id = 1:3, dept = c(\"Dev\", \"QA\", \"Ops\"), q1 = c(4, 5, 3), q2 = c(5, 4, 4), stringsAsFactors = FALSE)",
    par: 1,
    difficulty: 3,
    checks: [
          {
                "type": "eval",
                "expr": "is.data.frame(survey_tidy) && nrow(survey_tidy) == 6",
                "label": "survey_tidy reshaped to 6 rows"
          },
          {
                "type": "eval",
                "expr": "all(c(\"id\", \"dept\", \"question\", \"score\") %in% names(survey_tidy))",
                "label": "Columns contain id, dept, question, and score"
          },
          {
                "type": "eval",
                "expr": "all(survey_tidy$question %in% c(\"q1\", \"q2\"))",
                "label": "question column contains original wide column names"
          }
    ],
    hint: "Run survey_tidy <- pivot_longer(survey_wide, cols = c(\"q1\", \"q2\"), names_to = \"question\", values_to = \"score\")",
    lesson: "### فصل ۳۸ — بازآرایی و استانداردسازی داده‌ها با tidyr\n\nداده‌های تمیز (Tidy Data) سه قانون طلایی دارند:\n1. هر متغیر باید ستون اختصاصی خود را داشته باشد.\n2. هر مشاهده باید در یک سطر مجزا قرار گیرد.\n3. هر مقدار باید در یک سلول منفرد بنشیند.\n\nپکیج `tidyr` توابع قدرتمندی برای تغییر شکل داده‌ها ارائه می‌کند:\n- **`pivot_longer()`**: تبدیل جداول عریض (که نام ستون‌ها در واقع مقادیر یک متغیر هستند) به فرم طویل و استاندارد.\n- **`pivot_wider()`**: عمل معکوس برای تبدیل داده‌های طویل به ماتریس‌های گزارش‌گیری عریض.\n\n#### ⚠️ دام‌های متداول (Common Gotchas):\n- **توابع منسوخ `gather` و `spread`:** توابع `gather()` و `spread()` قدیمی هستند و دیگر نباید در کدهای جدید استفاده شوند. همیشه از توابع نسل دوم `pivot_longer()` و `pivot_wider()` استفاده کنید.",
  },
  {
    id: "tidy-stringr",
    seriesId: 'foundations',
    title: "39. Consistent String Manipulation with stringr",
    brief: "stringr provides a unified str_* API with consistent string-first signatures. Detect errors with str_detect(log_records, \"^ERR\") in err_mask, and sanitize codes with str_replace_all in clean_logs.",
    goal: "err_mask <- str_detect(log_records, \"^ERR\")\nclean_logs <- str_replace_all(log_records, \"ERR:[0-9]+\", \"ALERT\")",
    setup: "str_detect <- function(string, pattern) grepl(pattern, string)\nstr_replace_all <- function(string, pattern, replacement) gsub(pattern, replacement, string)\nstr_c <- function(..., sep = \"\", collapse = NULL) paste(..., sep = sep, collapse = collapse)\nlog_records <- c(\"ERR:404 Page not found\", \"INFO:200 User login\", \"ERR:500 Database timeout\", \"WARN:429 Rate limited\")",
    par: 1,
    difficulty: 2,
    checks: [
          {
                "type": "eval",
                "expr": "is.logical(err_mask) && sum(err_mask) == 2",
                "label": "err_mask correctly flags 2 error lines"
          },
          {
                "type": "eval",
                "expr": "clean_logs[1] == \"ALERT Page not found\" && clean_logs[3] == \"ALERT Database timeout\"",
                "label": "clean_logs replaces error codes with ALERT"
          },
          {
                "type": "eval",
                "expr": "clean_logs[2] == \"INFO:200 User login\"",
                "label": "Non-error log lines remain intact"
          }
    ],
    hint: "Use err_mask <- str_detect(log_records, \"^ERR\") and clean_logs <- str_replace_all(log_records, \"ERR:[0-9]+\", \"ALERT\").",
    lesson: "### فصل ۳۹ — پردازش یکدست رشته‌های متنی با stringr\n\nدر توابع متنی R پایه مانند `grep` و `sub`، ترتیب آرگومان‌ها ناهمگون است (گاهی الگوی regex اول می‌آید و گاهی رشته).\nپکیج `stringr` این مشکل را با طراحی بی‌نقص حل کرده است:\n1. همه توابع با پیشوند `str_` شروع می‌شوند که استفاده از تکمیل خودکار (Autocomplete) در ادیتور را بسیار لذت‌بخش می‌کند.\n2. بردار متنی (`string`) **همیشه اولین آرگومان** است، بنابراین به‌طور طبیعی با پایپ (`|>`) هماهنگ است.\n3. خروجی‌ها همیشه طول و رفتار قابل پیش‌بینی با مقادیر `NA` دارند.\n\nتوابع کلیدی:\n- **`str_detect(string, pattern)`**: بازگرداندن بردار بولی برای تطابق الگو.\n- **`str_replace_all(string, pattern, replacement)`**: جایگزینی تمام موارد منطبق با عبارت باقاعده.\n- **`str_extract(string, pattern)`**: استخراج زیررشته منطبق با الگو.\n\n#### ⚠️ دام‌های متداول (Common Gotchas):\n- **فرار دادن کاراکترهای Regex:** در زبان R به دلیل اسکیپ شدن بک‌اسلش در رشته‌ها، برای کاراکترهای خاص رجکس باید دو بک‌اسلش استفاده شود (مانند `\\\\d+` برای اعداد).",
  },
  {
    id: "tidy-forcats",
    seriesId: 'foundations',
    title: "40. Categorical Data Wrangling with forcats",
    brief: "forcats simplifies factor manipulation. Reorder dept levels by median salary using fct_reorder in staff$dept_ord, then invert the order with fct_rev in staff$dept_rev.",
    goal: "staff$dept_ord <- fct_reorder(staff$dept, staff$salary, .fun = median)\nstaff$dept_rev <- fct_rev(staff$dept_ord)",
    setup: "fct_reorder <- function(.f, .x, .fun = median, ...) { f <- as.factor(.f); vals <- tapply(.x, f, .fun, ...); factor(f, levels = levels(f)[order(vals)]) }\nfct_rev <- function(f) { f <- as.factor(f); factor(f, levels = rev(levels(f))) }\nstaff <- data.frame(dept = c(\"Sales\", \"Support\", \"Engineering\", \"Sales\", \"Support\", \"Engineering\"), salary = c(60000, 45000, 95000, 65000, 50000, 105000), stringsAsFactors = FALSE)",
    par: 1,
    difficulty: 2,
    checks: [
          {
                "type": "eval",
                "expr": "is.factor(staff$dept_ord) && identical(levels(staff$dept_ord), c(\"Support\", \"Sales\", \"Engineering\"))",
                "label": "dept_ord levels sorted ascending by median salary"
          },
          {
                "type": "eval",
                "expr": "is.factor(staff$dept_rev) && identical(levels(staff$dept_rev), c(\"Engineering\", \"Sales\", \"Support\"))",
                "label": "dept_rev levels inverted with fct_rev"
          }
    ],
    hint: "Run staff$dept_ord <- fct_reorder(staff$dept, staff$salary, .fun = median) and staff$dept_rev <- fct_rev(staff$dept_ord).",
    lesson: "### فصل ۴۰ — کار هوشمند با متغیرهای دسته‌ای (forcats)\n\nفاکتورها (`factors`) در R برای متغیرهای دسته‌ای با سطوح مشخص استفاده می‌شوند.\nبه صورت پیش‌فرض، سطوح فاکتورها به ترتیب الفبایی مرتب می‌شوند که در نمودارها و مدل‌های آماری ترتیب معناداری نیست.\nپکیج تخصصی `forcats` ابزارهایی برای مدیریت حرفه‌ای فاکتورها فراهم می‌کند:\n- **`fct_reorder(.f, .x, .fun)`**: مرتب‌سازی سطوح فاکتور بر اساس مقدار خلاصه یک متغیر عددی دیگر.\n- **`fct_rev(f)`**: معکوس کردن ترتیب سطوح فاکتور (مناسب برای محورهای نمودار افقی).\n- **`fct_lump_n(f, n)`**: تجمیع دسته‌های کم‌تکرار در دسته جامع `Other`.\n\n#### ⚠️ دام‌های متداول (Common Gotchas):\n- **تبدیل فاکتور عددی به عدد:** اگر یک فاکتور حاوی مقادیر `c(\"10\", \"20\")` را با `as.numeric()` تبدیل کنید، کدهای ایندکس داخلی آن را برمی‌گرداند! همیشه بنویسید `as.numeric(as.character(f))`.",
  },
  {
    id: "tidy-lubridate",
    seriesId: 'foundations',
    title: "41. Date-Time Parsing & Rounding with lubridate",
    brief: "lubridate makes working with dates intuitive. Parse date_strings with ymd() into event_dates, snap to start-of-month with floor_date(..., \"month\") in event_months, and extract wday() in event_days.",
    goal: "event_dates <- ymd(date_strings)\nevent_months <- floor_date(event_dates, unit = \"month\")\nevent_days <- wday(event_dates)",
    setup: "ymd <- function(x) as.Date(x, format = \"%Y-%m-%d\")\nfloor_date <- function(x, unit = \"month\") { d <- as.Date(x); if (unit == \"month\") as.Date(format(d, \"%Y-%m-01\")) else if (unit == \"year\") as.Date(format(d, \"%Y-01-01\")) else d }\nwday <- function(x) as.integer(format(as.Date(x), \"%w\")) + 1L\ndate_strings <- c(\"2026-03-15\", \"2026-03-22\", \"2026-04-05\", \"2026-04-18\")",
    par: 1,
    difficulty: 2,
    checks: [
          {
                "type": "eval",
                "expr": "inherits(event_dates, \"Date\") && length(event_dates) == 4",
                "label": "event_dates parsed as Date vector"
          },
          {
                "type": "eval",
                "expr": "all(format(event_months, \"%d\") == \"01\") && event_months[1] == as.Date(\"2026-03-01\")",
                "label": "event_months snapped to first day of month"
          },
          {
                "type": "eval",
                "expr": "is.integer(event_days) && length(event_days) == 4",
                "label": "event_days extracted via wday"
          }
    ],
    hint: "Assign event_dates <- ymd(date_strings), event_months <- floor_date(event_dates, unit = \"month\"), and event_days <- wday(event_dates).",
    lesson: "### فصل ۴۱ — تحلیل و پردازش شهودی زمان با lubridate\n\nمدیریت تاریخ و زمان در R پایه نیازمند به‌خاطرسپردن کدهای فرمت پیچیده مانند `\"%Y-%m-%d %H:%M:%S\"` بود.\nپکیج مدرن `lubridate` با طراحی شهودی محاسبات زمانی را دگرگون کرده است:\n- **توابع خواندن فوری بر اساس ترتیب حروف:**\n  - `ymd(\"2026-03-15\")`: سال، ماه، روز\n  - `dmy(\"15-03-2026\")`: روز، ماه، سال\n  - `ymd_hms(\"2026-03-15 14:30:00\")`: سال، ماه، روز به همراه ساعت، دقیقه، ثانیه\n- **گرد کردن زمان (Rounding):**\n  - `floor_date(x, unit = \"month\")`: رِند کردن به آغاز ماه\n  - `ceiling_date(x, unit = \"week\")`: رِند کردن به ابتدای هفته بعد\n- **استخراج اجزا:** `year()`, `month()`, `wday()`\n\n#### ⚠️ دام‌های متداول (Common Gotchas):\n- **تفاوت Period و Duration:** پکیج lubridate میان دوره تقویمی (`Period` مانند ۱ ماه که بسته به ماه ۲۸ تا ۳۱ روز است) و طول فیزیکی زمان (`Duration` مانند دقیقاً ۸۶۴۰۰ ثانیه برای ۱ روز) تمایز قائل می‌شود.",
  },
  {
    id: "tidy-purrr",
    seriesId: 'foundations',
    title: "42. Functional Programming & Iteration with purrr",
    brief: "purrr provides type-stable functional iteration. Use map_dbl() on sensor_readings to compute mean into avg_readings, and map_chr() to tag sensors as \"OK\" or \"ALERT\" into sensor_status.",
    goal: "avg_readings <- map_dbl(sensor_readings, mean)\nsensor_status <- map_chr(avg_readings, function(x) if (x > 50) \"ALERT\" else \"OK\")",
    setup: "map <- function(.x, .f, ...) lapply(.x, .f, ...)\nmap_dbl <- function(.x, .f, ...) { vapply(.x, .f, numeric(1), ...) }\nmap_chr <- function(.x, .f, ...) { vapply(.x, .f, character(1), ...) }\nmap_lgl <- function(.x, .f, ...) { vapply(.x, .f, logical(1), ...) }\nsensor_readings <- list(zone_a = c(42.1, 44.5, 41.8), zone_b = c(55.2, 58.0, 54.1), zone_c = c(38.0, 39.5, 40.2))",
    par: 1,
    difficulty: 3,
    checks: [
          {
                "type": "eval",
                "expr": "is.double(avg_readings) && length(avg_readings) == 3",
                "label": "avg_readings is a type-safe numeric vector of length 3"
          },
          {
                "type": "eval",
                "expr": "is.character(sensor_status) && sensor_status[\"zone_b\"] == \"ALERT\" && sensor_status[\"zone_a\"] == \"OK\"",
                "label": "sensor_status correctly classified with map_chr"
          }
    ],
    hint: "Run avg_readings <- map_dbl(sensor_readings, mean) and sensor_status <- map_chr(avg_readings, function(x) if (x > 50) \"ALERT\" else \"OK\").",
    lesson: "### فصل ۴۲ — برنامه‌نویسی تابعی و تکرار امن با purrr\n\nدر برنامه‌نویسی حرفه‌ای R، حلقه‌های `for` به ندرت استفاده می‌شوند و جای خود را به برنامه‌نویسی تابعی (Functional Programming) می‌دهند.\nتابع سنتی `sapply()` خطرناک است زیرا نوع خروجی آن به داده‌ها بستگی دارد و ممکن است گاهی بردار، ماتریس یا لیست برگرداند.\nپکیج `purrr` با تضمین نوع بازگشتی (Type Stability)، پایداری کد را به حداکثر می‌رساند:\n- **`map(.x, .f)`**: اجرای تابع و تضمین بازگرداندن یک لیست (`list`).\n- **`map_dbl(.x, .f)`**: اجرای تابع با تضمین بازگرداندن بردار عددی اعشاری (`double`). در صورت مغایرت نوع، بلافاصله خطا صادر می‌شود.\n- **`map_chr(.x, .f)`**: تضمین بازگرداندن بردار متنی (`character`).\n- **`map_lgl(.x, .f)`**: تضمین بازگرداندن بردار بولی (`logical`).\n\n#### ⚠️ دام‌های متداول (Common Gotchas):\n- **خطاهای سایلنت در `sapply`:** هرگز در کد پکیج‌ها یا پایپلاین‌های تولیدی از `sapply()` استفاده نکنید! پکیج `purrr` یا `vapply()` پایه جایگزین‌های کاملاً امن هستند.",
  },
  {
    id: "adv-memory",
    seriesId: 'foundations',
    title: "43. Names, Values & Memory Semantics",
    brief: "R objects follow copy-on-modify semantics. Assigning alias_vec <- orig creates a shared reference, and mutating alias_vec[1] <- 99 duplicates memory without altering orig. In contrast, environments have reference semantics and mutate in place.",
    goal: "orig <- c(10, 20, 30)\nalias_vec <- orig\nalias_vec[1] <- 99\nshared_env <- new.env()\nshared_env$val <- 100\nalias_env <- shared_env\nalias_env$val <- 200",
    setup: "",
    par: 1,
    difficulty: 2,
    checks: [
          {
                "type": "eval",
                "expr": "orig[1] == 10 && alias_vec[1] == 99",
                "label": "Vector copy-on-modify verified: orig is unchanged"
          },
          {
                "type": "eval",
                "expr": "shared_env$val == 200 && alias_env$val == 200",
                "label": "Environment reference semantics verified: shared_env mutated in place"
          }
    ],
    hint: "Assign orig <- c(10, 20, 30), alias_vec <- orig, alias_vec[1] <- 99, shared_env <- new.env(), shared_env$val <- 100, alias_env <- shared_env, alias_env$val <- 200.",
    lesson: "### فصل ۴۳ — مدیریت حافظه و رفتار Copy-on-Modify در R\n\nیکی از مهم‌ترین و پیشرفته‌ترین مفاهیم در معماری داخلی R نحوه اتصال نام‌ها (Names) به مقادیر (Values) است:\n\n1. **رفتار Copy-on-Modify:**\nهنگامی که می‌نویسید `y <- x`، زبان R مقادیر `x` را کپی نمی‌کند! در عوض، هر دو متغیر به یک بلوک حافظه یکسان اشاره می‌کنند. تنها زمانی که یکی از آن‌ها را ویرایش کنید (`y[1] <- 99`)، سیستم R یک نسخه مجزا در حافظه می‌سازد.\n\n2. **رفتار Modify-in-Place (محیط‌ها):**\nتنها استثنای ساختاری در R، اشیاء از نوع `environment` هستند. محیط‌ها همواره ارجاعی (Reference Semantics) هستند؛ یعنی ویرایش یک متغیر ارجاعی، اصل شیء را در جا تغییر می‌دهد.\n\n#### ⚠️ دام‌های متداول (Common Gotchas):\n- **کپی‌های پنهان درون حلقه‌ها:** اگر یک دیتافریم بزرگ را درون حلقه `for` سطر به سطر آپدیت کنید، R در هر تکرار کل جدول را در حافظه کپی می‌کند که منجر به افت تصاعدی سرعت می‌شود.",
  },
  {
    id: "adv-environments",
    seriesId: 'foundations',
    title: "44. Environments, Scoping & Closures",
    brief: "Functions capture their enclosing environment, enabling stateful closures. Implement a function factory make_counter(start = 0) where the inner function increments internal state via the super-assignment operator <<- on every invocation.",
    goal: "make_counter <- function(start = 0) {\n  count <- start\n  function() {\n    count <<- count + 1\n    count\n  }\n}\nc1 <- make_counter(10)\nr1 <- c1()\nr2 <- c1()",
    setup: "",
    par: 1,
    difficulty: 3,
    checks: [
          {
                "type": "eval",
                "expr": "is.function(make_counter) && is.function(c1)",
                "label": "make_counter factory and c1 closure are defined"
          },
          {
                "type": "eval",
                "expr": "r1 == 11 && r2 == 12 && c1() == 13",
                "label": "c1 statefully increments count from 11 to 13"
          },
          {
                "type": "eval",
                "expr": "environment(c1)$count == 13",
                "label": "Closure enclosing environment holds updated state"
          }
    ],
    hint: "Define make_counter <- function(start = 0) { count <- start; function() { count <<- count + 1; count } } and test with c1.",
    lesson: "### فصل ۴۴ — محیط‌ها، دامنه‌ها و توابع حالت‌دار (Closures)\n\nدر زبان R، هر تابع حامل یک محیط محصورکننده (Enclosing Environment) است:\n- **کارخانه تابع (Function Factory):** تابعی است که تابعی دیگر تولید می‌کند.\n- **عملگر `<<-` (Super-assignment):** متغیر را در محیط محلی جاری نمی‌سازد، بلکه در محیط‌های والد به سمت ریشه جستجو کرده و اولین متغیر با آن نام را تغییر می‌دهد.\n\nاین قابلیت پایه ساخت کش‌ها (Caching)، مولدهای شناسه و ابزارهای مانیتورینگ بدون نیاز به متغیرهای سراسری ناامن است.\n\n#### ⚠️ دام‌های متداول (Common Gotchas):\n- **خطرات `<<-` کنترل‌نشده:** اگر متغیر هدف در محیط‌های محصورکننده وجود نداشته باشد، `<<-` به اجبار آن را در `.GlobalEnv` ایجاد می‌کند که می‌تواند باعث رفتارهای جانبی ناخواسته شود.",
  },
  {
    id: "adv-conditions",
    seriesId: 'foundations',
    title: "45. Advanced Conditions & Error Handling",
    brief: "Conditions form an S3 class hierarchy. Implement safe_divide(a, b) that raises a custom S3 error class division_by_zero when b == 0, and handle it gracefully with tryCatch().",
    goal: "safe_divide <- function(a, b) {\n  if (b == 0) {\n    cond <- structure(list(message = \"Cannot divide by zero\", call = sys.call()), class = c(\"division_by_zero\", \"error\", \"condition\"))\n    stop(cond)\n  }\n  a / b\n}\ndiv_res <- tryCatch(safe_divide(10, 0), division_by_zero = function(e) list(status = \"handled\", error_class = class(e)[1]))",
    setup: "",
    par: 1,
    difficulty: 3,
    checks: [
          {
                "type": "eval",
                "expr": "is.function(safe_divide) && safe_divide(10, 2) == 5",
                "label": "safe_divide correctly divides non-zero numbers"
          },
          {
                "type": "eval",
                "expr": "div_res$status == \"handled\" && div_res$error_class == \"division_by_zero\"",
                "label": "Custom division_by_zero S3 condition caught and handled"
          }
    ],
    hint: "Build a custom condition using structure(list(...), class = c('division_by_zero', 'error', 'condition')) and catch it with tryCatch().",
    lesson: "### فصل ۴۵ — مدیریت پیشرفته شرایط و خطاهای سفارشی در R\n\nتوسعه‌دهندگان حرفه‌ای به جای پرتاب رشته‌های متنی ساده با `stop(\"error\")`، از **کلاس‌های خطای اختصاصی (Custom Conditions)** استفاده می‌کنند.\n\nمزایای خطاهای ساخت‌یافته S3:\n1. برنامه‌های فراخواننده می‌توانند بدون متوسل شدن به Regex متن خطا، مستقیماً بر اساس نوع کلاس (`division_by_zero`) تصمیم‌گیری کنند.\n2. متادیتاهایی مانند ورودی نامعتبر یا زمان وقوع در خود شیء خطا ضمیمه می‌شوند.\n\n#### ⚠️ دام‌های متداول (Common Gotchas):\n- **بررسی خطا با تطابق رشته‌ای:** اگر کدهای شما نوع خطا را بر اساس مقایسه متن `e$message == \"error\"` چک کنند، با کوچک‌ترین تغییر نگارشی یا تغییر زبان سیستم‌عامل کدها از کار می‌افتند!",
  },
  {
    id: "adv-s3",
    seriesId: 'foundations',
    title: "46. S3 Object-Oriented Programming",
    brief: "S3 is R's foundational OOP system, relying on generic functions and method dispatch via UseMethod(). Define a generic describe(x, ...), a constructor new_account(owner, balance), and the S3 method describe.account(x, ...).",
    goal: "describe <- function(x, ...) UseMethod(\"describe\")\nnew_account <- function(owner, balance) {\n  stopifnot(is.character(owner), is.numeric(balance))\n  structure(list(owner = owner, balance = balance), class = \"account\")\n}\ndescribe.account <- function(x, ...) paste0(\"Account[\", x$owner, \"]: $\", x$balance)\nacc <- new_account(\"Alice\", 1500)\nacc_desc <- describe(acc)",
    setup: "",
    par: 1,
    difficulty: 3,
    checks: [
          {
                "type": "eval",
                "expr": "is.function(describe) && is.function(describe.account)",
                "label": "describe generic and describe.account method exist"
          },
          {
                "type": "eval",
                "expr": "inherits(acc, \"account\") && acc$owner == \"Alice\"",
                "label": "acc is a valid account S3 object"
          },
          {
                "type": "eval",
                "expr": "acc_desc == \"Account[Alice]: $1500\"",
                "label": "describe generic dispatches properly to describe.account"
          }
    ],
    hint: "Create generic describe <- function(x, ...) UseMethod('describe'), constructor new_account, and method describe.account.",
    lesson: "### فصل ۴۶ — برنامه‌نویسی شیءگرا با سیستم S3 در R\n\nسیستم S3 قلب محاسبات شیءگرای زبان R پایه و Tidyverse است:\n1. **توابع ژنریک (Generics):** توابعی مثل `print`, `summary`, `plot` که رفتار ثابتی ندارند، بلکه تصمیم‌گیری را با `UseMethod(\"name\")` به متد مربوط به کلاس شیء واگذار می‌کنند.\n2. **نام‌گذاری متدها:** متدها با الگوی `generic.class` تعریف می‌شوند (مانند `print.data.frame`).\n\n#### ⚠️ دام‌های متداول (Common Gotchas):\n- **اشتباه در نام‌گذاری متدها با نقطه:** از گذاشتن نقطه در نام توابع عادی پرهیز کنید (مثل `my.function`)، زیرا R ممکن است اشتباهاً تصور کند این تابع متدی از یک تابع ژنریک به نام `my` برای شیء از کلاس `function` است!",
  },
  {
    id: "adv-r6",
    seriesId: 'foundations',
    title: "47. Encapsulated OOP with R6",
    brief: "R6 implements encapsulated OOP with mutable reference semantics. Define an Accumulator class using R6Class with public value = 0 and add(n), instantiate acc <- Accumulator$new(), and chain acc$add(10)$add(5).",
    goal: "Accumulator <- R6Class(\"Accumulator\", public = list(\n  value = 0,\n  add = function(n) { self$value <- self$value + n; invisible(self) }\n))\nacc <- Accumulator$new()\nacc$add(10)$add(5)\ntotal <- acc$value",
    setup: "R6Class <- function(classname, public = list()) {\n  generator <- list(\n    new = function(...) {\n      inst <- new.env(parent = emptyenv())\n      for (nm in names(public)) {\n        val <- public[[nm]]\n        if (is.function(val)) {\n          environment(val) <- inst\n          inst[[nm]] <- val\n        } else {\n          inst[[nm]] <- val\n        }\n      }\n      inst$self <- inst\n      class(inst) <- c(classname, \"R6\")\n      inst\n    }\n  )\n  class(generator) <- \"R6ClassGenerator\"\n  generator\n}",
    par: 1,
    difficulty: 3,
    checks: [
          {
                "type": "eval",
                "expr": "inherits(acc, \"Accumulator\") && inherits(acc, \"R6\")",
                "label": "acc is an instance of Accumulator R6 class"
          },
          {
                "type": "eval",
                "expr": "total == 15 && acc$value == 15",
                "label": "Method chaining updated acc$value in place to 15"
          }
    ],
    hint: "Define Accumulator <- R6Class('Accumulator', public = list(value = 0, add = function(n) { self$value <- self$value + n; invisible(self) })), instantiate, and chain $add(10)$add(5).",
    lesson: "### فصل ۴۷ — شیءگرایی کپسوله‌شده و مدرن با R6\n\nبرخلاف S3 که شیءگرایی تابعی است، پکیج **R6** شیءگرایی کلاسیک (Encapsulated OOP) را فراهم می‌کند:\n1. متدها و خصوصیات متعلق به خود شیء هستند (`object$method()`).\n2. رفتار ارجاعی (Reference Semantics): وقتی یک شیء R6 را تغییر می‌دهید، داده‌ها در حافظه کپی نمی‌شوند بلکه همان شیء مستقیماً آپدیت می‌شود.\n3. کلمه کلیدی `self`: برای دسترسی به متدها و فیلدهای داخلی شیء.\n\n#### ⚠️ دام‌های متداول (Common Gotchas):\n- **انتساب شیء R6 با `<-`:** دستور `b <- a` یک کپی جدید نمی‌سازد! هر دو متغیر به یک نمونه واحد اشاره دارند. تغییر `b` مستقیماً `a` را تغییر می‌دهد.",
  },
  {
    id: "adv-expressions",
    seriesId: 'foundations',
    title: "48. Expressions, AST & Code as Data",
    brief: "In R, code is an Abstract Syntax Tree (AST). Capture code using expr <- quote(log(x + 1)), extract its function symbol into fn_sym, its inner call into inner_call, and rewrite the call to sqrt in modified_expr.",
    goal: "expr <- quote(log(x + 1))\nfn_sym <- expr[[1]]\ninner_call <- expr[[2]]\nmodified_expr <- expr\nmodified_expr[[1]] <- quote(sqrt)\nx <- 8\neval_res <- eval(modified_expr)",
    setup: "",
    par: 1,
    difficulty: 3,
    checks: [
          {
                "type": "eval",
                "expr": "is.call(expr) && identical(fn_sym, quote(log))",
                "label": "expr is a call and fn_sym extracted as log"
          },
          {
                "type": "eval",
                "expr": "is.call(inner_call) && inner_call[[1]] == quote(`+`)",
                "label": "inner_call extracted as x + 1"
          },
          {
                "type": "eval",
                "expr": "identical(modified_expr, quote(sqrt(x + 1))) && eval_res == 3",
                "label": "modified_expr rewrites call to sqrt(x + 1) and evaluates to 3"
          }
    ],
    hint: "Capture expr <- quote(log(x + 1)), assign fn_sym <- expr[[1]], inner_call <- expr[[2]], rewrite modified_expr[[1]] <- quote(sqrt), and eval with x <- 8.",
    lesson: "### فصل ۴۸ — کدهای R به عنوان داده: عبارات و درخت نحو انتزاعی (AST)\n\nیکی از شگفت‌انگیزترین توانمندی‌های R قابلیت **Metaprogramming** (نوشتن کدی که کدهای دیگر را بررسی یا تولید می‌کند) است:\n\n- **تابع `quote()`:** کد را اجرا نمی‌کند، بلکه ساختار گرامری آن را به عنوان یک شیء بازمی‌گرداند.\n- **اجزای یک Call در R:** هر فراخوانی تابع در واقع یک ساختار شبیه به لیست است که:\n  - عنصر اول `expr[[1]]`: نماد تابع (Symbol)\n  - عناصر بعدی `expr[[2]]`, `expr[[3]]`: آرگومان‌ها هستند.\n\nشما می‌توانید کدهای R را مانند عناصر یک لیست تغییر دهید و سپس با `eval()` اجرا کنید!\n\n#### ⚠️ دام‌های متداول (Common Gotchas):\n- **اشتباه میان Symbol و رشته:** نماد `quote(x)` یک نام متغیر در R است، در حالی که `\"x\"` یک رشته متنی است. این دو در ارزیابی کدهای متانویسی رفتار کاملاً متفاوتی دارند.",
  },
  {
    id: "adv-quasiquote",
    seriesId: 'foundations',
    title: "49. Quasiquotation & Non-Standard Evaluation",
    brief: "Non-Standard Evaluation (NSE) powers tidyverse data masking. Implement mask_filter(df, condition) that captures an unquoted condition with substitute() and evaluates it within the environment of df.",
    goal: "mask_filter <- function(df, condition) {\n  cond_expr <- substitute(condition)\n  mask <- eval(cond_expr, envir = df, enclos = parent.frame())\n  df[mask & !is.na(mask), , drop = FALSE]\n}\ndataset <- data.frame(id = 1:4, score = c(95, 70, 88, 62), passed = c(TRUE, FALSE, TRUE, FALSE))\npassed_students <- mask_filter(dataset, score >= 80 & passed == TRUE)",
    setup: "",
    par: 1,
    difficulty: 3,
    checks: [
          {
                "type": "eval",
                "expr": "is.function(mask_filter)",
                "label": "mask_filter function is defined"
          },
          {
                "type": "eval",
                "expr": "is.data.frame(passed_students) && nrow(passed_students) == 2",
                "label": "passed_students filtered to 2 matching rows"
          },
          {
                "type": "eval",
                "expr": "identical(passed_students$id, c(1L, 3L))",
                "label": "Non-standard evaluation correctly resolved score and passed columns"
          }
    ],
    hint: "Define mask_filter <- function(df, condition) using substitute(condition) and eval(..., envir = df, enclos = parent.frame()).",
    lesson: "### فصل ۴۹ — ارزیابی غیر استاندارد (NSE) و Data Masking\n\nتا به حال فکر کرده‌اید چرا در dplyr می‌نویسیم `filter(df, age > 18)` و نیازی به گذاشتن کوتیشن اطراف `age` نیست؟\nاین جادو حاصل **Non-Standard Evaluation (NSE)** است:\n\n1. **ضبط عبارت با `substitute()`:** تابع به جای محاسبه مقدار ورودی، خود فرمول ورودی کاربر را به شکل یک درخت عبارتی می‌گیرد.\n2. **ارزیابی در بستر جدول با `eval(..., envir = df)`:** به R دستور می‌دهیم نام ستون‌های جدول `df` را مانند متغیرهای یک فضای کاری ببیند.\n\n#### ⚠️ دام‌های متداول (Common Gotchas):\n- **تداخل نام ستون و متغیر محلی (Name Collisions):** اگر متغیری بیرون از جدول هم‌نام با یکی از ستون‌ها باشد، Data Mask ستون جدول را ارجحیت می‌دهد. برای اشاره صریح به متغیر خارجی در پکیج‌های مدرن از `.env$var` استفاده می‌شود.",
  },
  {
    id: "adv-profiling",
    seriesId: 'foundations',
    title: "50. Benchmarking & Memory Optimization",
    brief: "Avoid the quadratic O(N^2) dynamic vector expansion trap c(vec, val) inside loops. Implement fast_squares(n) by pre-allocating output with numeric(n) and index assignment out[i] <- i^2.",
    goal: "fast_squares <- function(n) {\n  out <- numeric(n)\n  for (i in seq_len(n)) {\n    out[i] <- i^2\n  }\n  out\n}\nsq_100 <- fast_squares(100)",
    setup: "",
    par: 1,
    difficulty: 2,
    checks: [
          {
                "type": "eval",
                "expr": "is.function(fast_squares)",
                "label": "fast_squares function is defined"
          },
          {
                "type": "eval",
                "expr": "length(sq_100) == 100 && sq_100[100] == 10000",
                "label": "Pre-allocated squares computed accurately up to 10000"
          },
          {
                "type": "eval",
                "expr": "identical(sq_100[1:5], c(1, 4, 9, 16, 25))",
                "label": "Sequence elements match exact square powers"
          }
    ],
    hint: "Pre-allocate out <- numeric(n), fill with a for loop out[i] <- i^2, and test sq_100 <- fast_squares(100).",
    lesson: "### فصل ۵۰ — بهینه‌سازی عملکرد، پروفایلینگ و تله‌های حافظه\n\nزبان R برای محاسبات ماتریسی فوق‌العاده سریع است، اما کدهای ناشیانه می‌توانند آن را به شدت کند کنند:\n\n1. **تله گسترش داینامیک بردار (Quadratic Growing Trap):**\nنوشتن `v <- c(v, x)` داخل حلقه بدترین اشتباه ممکن است! چون طول بردار مشخص نیست، R در هر تکرار یک بردار جدید در رم می‌سازد و تمام داده‌های قبلی را کپی می‌کند که پیچیدگی زمانی آن $O(N^2)$ است.\n\n2. **راه‌حل طلایی: پیش‌تخصیص حافظه (Pre-allocation):**\nهمیشه قبل از حلقه، با `numeric(n)` یا `vector(\"list\", n)` ظرف نهایی را با اندازه معین بسازید تا پیچیدگی زمانی به $O(N)$ کاهش یابد.\n\n#### ⚠️ دام‌های متداول (Common Gotchas):\n- **برداری‌سازی بر حلقه‌های سنتی ارجح است:** قبل از نوشتن هر حلقه‌ای، بررسی کنید آیا تابع برداری آماده‌ای (مانند `(1:n)^2`) برای آن وجود دارد یا خیر.",
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
      title: 'INTRODUCTION & ENVIRONMENT',
      prefix: 'intro',
      ids: ['hello', 'rstudio'],
    },
    {
      id: 'basics',
      title: 'R BASICS & DATA STRUCTURES',
      prefix: 'basic',
      ids: ['numbers', 'vectors', 'data-structures', 'factors-reorder'],
    },
    {
      id: 'programming',
      title: 'PROGRAMMING & LOGIC',
      prefix: 'prog',
      ids: ['control-flow', 'functions', 'type-safe-apply'],
    },
    {
      id: 'import',
      title: 'DATA IMPORT & APIS',
      prefix: 'data',
      ids: ['import-flat', 'import-excel', 'import-db', 'import-web', 'rectangling'],
    },
    {
      id: 'wrangling',
      title: 'DATA WRANGLING & CLEANING',
      prefix: 'tidy',
      ids: ['tidy-data', 'pivoting', 'strings-regex', 'dplyr', 'joins', 'anti-joins'],
    },
    {
      id: 'advanced',
      title: 'TIMESERIES & VISUALIZATION',
      prefix: 'adv',
      ids: ['datetime', 'data-table', 'outliers-plots'],
    },
    {
      id: 'modeling',
      title: 'STATISTICS & MODELING',
      prefix: 'stat',
      ids: ['regression', 'hypothesis', 'appendix'],
    },
    {
      id: 'packages',
      title: 'R PACKAGES & SOFTWARE ENGINEERING',
      prefix: 'pkg',
      ids: [
        'pkg-anatomy',
        'pkg-deps',
        'pkg-code',
        'pkg-roxygen',
        'pkg-namespace',
        'pkg-testing',
        'pkg-data',
        'pkg-check',
      ],
    },
    {
      id: 'tidyverse',
      title: 'THE TIDYVERSE ECOSYSTEM',
      prefix: 'verse',
      ids: [
        'tidy-tibble',
        'tidy-dplyr',
        'tidy-ggplot2',
        'tidy-tidyr',
        'tidy-stringr',
        'tidy-forcats',
        'tidy-lubridate',
        'tidy-purrr',
      ],
    },
    {
      id: 'advanced-r',
      title: 'ADVANCED R & METAPROGRAMMING',
      prefix: 'advr',
      ids: [
        'adv-memory',
        'adv-environments',
        'adv-conditions',
        'adv-s3',
        'adv-r6',
        'adv-expressions',
        'adv-quasiquote',
        'adv-profiling',
      ],
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


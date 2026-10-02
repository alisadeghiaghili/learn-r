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

  // Section 3: برنامه‌نویسی
  {
    id: 'control-flow',
    seriesId: 'foundations',
    title: '06. Control Flow & Conditions',
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
    lesson: `### فصل 6 — ساختارهای کنترلی و شرطی

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
    title: '07. Custom Functions & Apply',
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
    lesson: `### فصل 7 — توابع و خانواده Apply

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
    lesson: `### فصل 8 — ورود داده: فایل‌های Flat و CSV

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
    title: '09. Tabular Data & Inspection',
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
    lesson: `### فصل 9 — بررسی و بازرسی ساختار داده‌ها (Data Inspection)

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
    lesson: `### فصل 10 — پایگاه‌های داده و کوئری‌های رابطه‌ای

استخراج رکوردهایی که در چندین شرط همزمان صدق می‌کنند، اساس کار با دیتابیس‌ها و بند WHERE در زبان SQL است.
تابع \`subset(data, condition)\` این کار را به صورت مستقیم و خوانا انجام می‌دهد.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **تله مقادیر NA در فیلتر کردن:** اگر در اندیس‌گذاری با \`df[df$amount > 100, ]\` مقادیر \`NA\` وجود داشته باشد، R سطرهایی کاملاً پر از NA تولید می‌کند! تابع \`subset()\` این مشکل را برطرف کرده و رکوردهای نامشخص را به طور خودکار حذف می‌کند.
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
    lesson: `### فصل 11 — داده‌های وب و ساختارهای درختی JSON

داده‌های دریافتی از وب‌سرویس‌ها به شکل درخت‌های تو در تو از لیست‌ها و دیکشنری‌ها هستند.
استفاده از \`sapply\` یا توابع بسته \`purrr\` امکان مسطح‌سازی (Rectangling) و استخراج فیلدهای مشخص را فراهم می‌سازد.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **تفاوت \`NULL\` با \`NA\` در لیست‌ها:** اگر یک فیلد در رکورد API وجود نداشته باشد مقدار آن در R برابر \`NULL\` می‌شود. اگر \`NULL\` را در یک بردار قرار دهید، عنصر ناپدید شده و طول بردار کم می‌شود!
`,
  },

  // Section 5: پاکسازی و داده‌کاوی
  {
    id: 'tidy-data',
    seriesId: 'foundations',
    title: '12. Tidy Data & Missing Values',
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
    lesson: `### فصل 12 — داده‌های مفقوده و اصول داده تمیز (Tidy Data)

در دنیای واقعی تقریباً هیچ دیتاستی بدون داده گم‌شده نیست. در زبان R مقادیر مفقوده با ثابت اختصاصی \`NA\` (Not Available) نشان داده می‌شوند.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **بزرگترین اشتباه: \`x == NA\`**: در R هرگز نباید بنویسید \`x == NA\`! چون نتیجه هر مقایسه‌ای با یک مقدار نامعلوم، خودش نامعلوم (\`NA\`) است. همیشه و فقط باید از تابع \`is.na(x)\` استفاده کنید.
- **محاسبات با \`NA\` مسری هستند:** اگر برداری حتی ۱ مقدار NA داشته باشد، \`mean(x)\` یا \`sum(x)\` مقدار \`NA\` پس می‌دهد. برای محاسبه صحیح روی داده‌های موجود باید حتماً آرگومان \`na.rm = TRUE\` را فعال کنید.
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
    lesson: `### فصل 13 — رشته‌ها و عبارات باقاعده (Regex)

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
    title: '14. Data Wrangling & Pipelines',
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
    lesson: `### فصل 14 — خط لوله داده با عملگر پایپ (Pipe Operator)

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
    lesson: `### فصل 15 — اتصال و ترکیب جداول داده (Joins)

در سیستم‌های توزیع‌شده داده‌ها در چند جدول مجزا نگهداری می‌شوند.
- **Inner Join:** سطرهایی که در هر دو جدول وجود دارند (\`all = FALSE\`).
- **Left Join:** تمام سطرهای جدول پایه سمت چپ حفظ می‌شوند و در صورت نبود مقدار در جدول دوم، \`NA\` قرار می‌گیرد (\`all.x = TRUE\`).

#### ⚠️ دام‌های متداول (Common Gotchas):
- **انفجار سطرها با کلید تکراری:** اگر کلید انتخابی در یکی از جداول تکراری باشد، عملیات Join سطرها را در یکدیگر ضرب دکارتی می‌کند و تعداد سطرهای خروجی ناخواسته چندبرابر می‌شود.
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
    lesson: `### فصل 16 — کار با تاریخ و سری‌های زمانی

زبان R از نوع داده \`Date\` برای تقویم و \`POSIXct\` برای زمان همراه با ساعت و منطقه زمانی پشتیبانی می‌کند.
تفریق دو تاریخ یک شیء \`difftime\` تولید می‌کند که با \`as.numeric()\` به تعداد روز تبدیل می‌شود.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **کدهای سال ۴ رقمی و ۲ رقمی:** در فرمت‌بندی تاریخ، \`%Y\` نشان‌دهنده سال ۴ رقمی (2026) و \`%y\` نشان‌دهنده سال ۲ رقمی (26) است. اشتباه گرفتن این دو باعث خطای محاسباتی سده می‌شود.
`,
  },
  {
    id: 'data-table',
    seriesId: 'foundations',
    title: '17. Fast Group Aggregation',
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
    lesson: `### فصل 17 — گروه‌بندی و تجمیع داده‌ها (Split-Apply-Combine)

یکی از پرکاربردترین نیازهای روزمره علم داده، خلاصه‌سازی و تجمیع متغیرهای پیوسته بر اساس دسته‌ها است.
فرمول نحوی \`aggregate(y ~ group, data, FUN)\` زبان R این الگو را به شکل فوق‌العاده کوتاه و خوانا پیاده‌سازی می‌کند.

#### ⚠️ دام‌های متداول (Common Gotchas):
- **تکمیل سطرهای دارای NA:** به طور پیش‌فرض، \`aggregate\` سطرهایی که در متغیرهای گروه‌بندی آنها \`NA\` وجود دارد را حذف می‌کند، مگر اینکه با پارامتر \`na.action = na.pass\` مانع شوید.
`,
  },
  {
    id: 'outliers-plots',
    seriesId: 'foundations',
    title: '18. Outliers & Base Plots',
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
    lesson: `### فصل 18 — شناسایی داده‌های پرت و مصورسازی مقدماتی

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
    title: '19. Linear Regression & Model Diagnostics',
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
    lesson: `### فصل 19 — رگرسیون خطی و مدل‌سازی آماری

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
    title: '20. Hypothesis Testing & Predictions',
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
    lesson: `### فصل 20 — آزمون فرض آماری و پیش‌بینی (Inference & Prediction)

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
    title: '21. Capstone: End-to-End Analysis',
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
    lesson: `### فصل 21 — پروژه جامع: تحلیل کامل صفر تا صد علم داده

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
    title: '22. Package Anatomy & DESCRIPTION',
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
    lesson: `### فصل 22 — کالبدشناسی پکیج و فایل حیاتی DESCRIPTION

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
    title: '23. Dependencies: Imports vs Suggests',
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
    lesson: `### فصل 23 — مدیریت وابستگی‌ها: تفاوت Imports و Suggests

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
    title: '24. Package Code & Side Effects (on.exit)',
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
    lesson: `### فصل 24 — کدهای سازگار با پکیج و پاکسازی اثرات جانبی (on.exit)

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
    title: '25. Documentation with roxygen2',
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
    lesson: `### فصل 25 — مستندسازی مدرن با roxygen2

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
    title: '26. NAMESPACE & Information Hiding',
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
    lesson: `### فصل 26 — مدیریت فضای نام (NAMESPACE) و پنهان‌سازی اطلاعات

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
    title: '27. Unit Testing with testthat',
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
    lesson: `### فصل 27 — تست خودکار نرم‌افزار با فریم‌ورک testthat

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
    title: '28. Package Data & Extdata Assets',
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
    lesson: `### فصل 28 — انتشار داده‌ها و فایل‌های ضمیمه در پکیج

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
    title: '29. R CMD check & CRAN Readiness',
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
    lesson: `### فصل 29 — کنترل کیفیت و انتشار بسته با R CMD check

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
      ids: ['numbers', 'vectors', 'data-structures'],
    },
    {
      id: 'programming',
      title: 'PROGRAMMING & LOGIC',
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


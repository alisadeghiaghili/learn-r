import type { LevelDef } from '../engine/types';
import type { Locale } from '../i18n/types';

export interface LocalizedLevelData {
  title: string;
  brief: string;
  hint: string;
  lesson: string;
  checksLabels?: string[];
  learning: string[];
  fieldNotes: string[];
}

export const FA_LEVELS: Record<string, LocalizedLevelData> = {
  hello: {
    title: '۰۱. مقدمه / سلام، R',
    brief: 'در کنسول R، عبارات بلافاصله ارزیابی و مقدار آن‌ها چاپ می‌شود. یک رشته متنی ایجاد کرده و آن را چاپ کنید.',
    hint: 'از تابع print() با رشته داخل گیومه استفاده کنید: print("Hello, R!")',
    lesson: `### فصل ۱ — مقدمه و شروع کار با R

زبان R یکی از محبوب‌ترین و قدرتمندترین ابزارهای متن‌باز برای تحلیل داده، محاسبات آماری و رسم نمودارهای علمی است.

در خط فرمان تعاملی R، هر دستوری که وارد شود بی‌درنگ ارزیابی شده و خروجی آن به نمایش درمی‌آید:

\`\`\`r
print("Hello, R!")
\`\`\`

برای اجرای کد در محیط اسکریپت یا کنسول کافی است کلیدهای **Ctrl + Enter** را فشار دهید.`,
    checksLabels: ['خروجی کنسول شامل "Hello, R!" باشد'],
    learning: [
      'تابع print() اشیاء و متون را مستقیماً در خروجی نمایش می‌دهد',
      'رشته‌های متنی در R می‌توانند داخل کوتیشن تکی یا دوتایی باشند',
      'هر عبارت واردشده در کنسول بلافاصله ارزیابی شده و نتیجه بازمی‌گردد',
    ],
    fieldNotes: [
      'اسکریپت‌های تحلیلی و خط فرمان R در محیط‌های سروری توسط Rscript script.R اجرا می‌شوند.',
      'در نرم‌افزارهای تحت وب Shiny و پکیج‌های توسعه‌یافته، معمولاً به جای print از تابع message یا پکیج logger استفاده می‌شود.',
    ],
  },
  rstudio: {
    title: '۰۲. آشنایی با RStudio و محیط کاری',
    brief: 'متغیرها در حافظه فضای کاری (.GlobalEnv) زندگی می‌کنند. با تابع ls() نام اشیاء فعال را استخراج کنید.',
    hint: 'دستور active_vars <- ls() را برای ذخیره نام تمام متغیرهای حافظه اجرا کنید.',
    lesson: `### فصل ۲ — محیط کاری RStudio و Workspace

محیط RStudio محبوب‌ترین IDE تخصصی برای توسعه با زبان R است.

- **کلید میانبر Ctrl + Enter**: اجرای خط جاری در کنسول
- **کلید میانبر Alt + -**: نوشتن سریع و خودکار عملگر تخصیص \`<-\`
- **تابع \`ls()\`**: نام تمام اشیاء، داده‌ها و متغیرهای تعریف‌شده در حافظه فعلی (.GlobalEnv) را به صورت بردار برمی‌گرداند.`,
    checksLabels: [
      'متغیر active_vars در فضای کاری ایجاد شده باشد',
      'متغیر active_vars شامل اشیاء موجود در حافظه باشد',
    ],
    learning: [
      'تابع ls() لیست تمام اشیاء فعال در فضای کاری .GlobalEnv را برمی‌گرداند',
      'متغیرهای حافظه تا زمان خروج از سشن یا فراخوانی rm() ماندگار هستند',
      'کلید میانبر Ctrl + Enter کد را مستقیماً از ادیتور به کنسول می‌فرستد',
    ],
    fieldNotes: [
      'پایپلاین‌های حرفه‌ای داده از ذخیره فایل‌های .RData پرهیز می‌کنند تا اجرای کدها کاملاً تکرارپذیر و ایزوله باشد.',
      'فضای نام پکیج‌ها (Namespace) توابع را از متغیرهای سراسری کاربر جدا نگه می‌دارد.',
    ],
  },
  numbers: {
    title: '۰۳. عملیات ریاضی و متغیرها',
    brief: 'زبان R از عملگرهای اختصاصی تقسیم صحیح (%/%)، باقیمانده (%%) و توان (^) پشتیبانی می‌کند. مقادیر q، r و p را محاسبه کنید.',
    hint: 'سه دستور q <- 17 %/% 5 و r <- 17 %% 5 و p <- 2^4 را وارد کنید.',
    lesson: `### فصل ۳ — محاسبات ریاضی و متغیرها

علاوه بر جمع و ضرب، R عملگرهای ریاضی اختصاصی زیر را فراهم کرده است:
- **تقسیم صحیح (\`%/%\`)**: خارج‌قسمت تقسیم بدون اعشار (\`17 %/% 5\` برابر ۳)
- **پیمانه و باقیمانده (\`%%\`)**: باقیمانده تقسیم صحیح (\`17 %% 5\` برابر ۲)
- **توان (\`^\`)**: به توان رساندن اعداد (\`2^4\` برابر ۱۶)
- **عملگر تخصیص (\`<-\`)**: استاندارد اختصاص مقدار به نام متغیر`,
    checksLabels: [
      'مقدار q برابر خارج‌قسمت تقسیم صحیح باشد (۳)',
      'مقدار r برابر باقیمانده تقسیم باشد (۲)',
      'مقدار p برابر ۲ به توان ۴ باشد (۱۶)',
    ],
    learning: [
      'عملگر %/% خارج‌قسمت صحیح تقسیم را بدون بخش اعشاری محاسبه می‌کند',
      'عملگر %% باقیمانده تقسیم را برمی‌گرداند',
      'عملگر ^ برای توان در R پایه استفاده می‌شود',
    ],
    fieldNotes: [
      'محاسبات پیمانه و تقسیم صحیح در دسته‌بندی داده‌ها، صفحه‌بندی و حلقه‌های پردازش دسته‌ای بسیار پرکاربردند.',
      'اعداد اعشاری از استاندارد IEEE 754 پیروی می‌کنند؛ برای مقایسه اعشاری از all.equal() استفاده کنید.',
    ],
  },
  vectors: {
    title: '۰۴. بردارها و ماتریس‌ها',
    brief: 'بردارها با c() و ماتریس‌ها با matrix() ساخته می‌شوند. یک ماتریس ۲ در ۳ به نام mat بسازید که به صورت سطری با ۱ تا ۶ پر شود.',
    hint: 'از دستور mat <- matrix(1:6, nrow = 2, ncol = 3, byrow = TRUE) استفاده کنید.',
    lesson: `### فصل ۴ — ساختار بردارها و ماتریس‌ها

بردارها ساختار داده پایه‌ای در R هستند که با تابع \`c()\` تجمیع می‌شوند.
ماتریس‌ها ساختارهای دوبعدی همگن هستند که با تابع \`matrix()\` ساخته می‌شوند:

\`\`\`r
mat <- matrix(1:6, nrow = 2, ncol = 3, byrow = TRUE)
\`\`\`

اندیس‌گذاری ماتریس با فرمت \`mat[row, col]\` و با شروع از عدد ۱ انجام می‌شود.`,
    checksLabels: [
      'متغیر mat یک شیء ماتریس باشد',
      'ماتریس mat دارای ۲ سطر و ۳ ستون باشد',
      'عناصر ماتریس به صورت سطری (byrow) چیده شده باشند',
    ],
    learning: [
      'تابع c() مقادیر را در یک بردار اتمیک یک‌بعدی ترکیب می‌کند',
      'تابع matrix() عناصر را در ابعاد مشخصی از سطرها و ستون‌ها سازمان‌دهی می‌کند',
      'گزینه byrow = TRUE مقادیر را سطر به سطر پر می‌کند',
    ],
    fieldNotes: [
      'ماتریس‌ها ساختار تک‌نوعی (Homogeneous) دارند که محاسبات جبر خطی را با سرعت کتابخانه‌های BLAS امکان‌پذیر می‌سازد.',
      'در یادگیری ماشین، پردازش تصویر و تحلیل شبکه‌ها، داده‌ها معمولاً در قالب ماتریس عددی نگهداری می‌شوند.',
    ],
  },
  'data-structures': {
    title: '۰۵. فاکتورها، دیتافریم‌ها و لیست‌ها',
    brief: 'فاکتورها متغیرهای کیفی را کدگذاری کرده و لیست‌ها انواع مختلف داده را نگهداری می‌کنند. فاکتور f را ساخته و در لیست profile قرار دهید.',
    hint: 'دستورهای f <- factor(c("low", "medium", "high", "low")) و profile <- list(status = f, count = length(f)) را وارد کنید.',
    lesson: `### فصل ۵ — فاکتورها، Data Frame و List

- **فاکتور (Factor)**: برای متغیرهای مقوله‌ای و طبقه‌بندی‌شده به کار می‌رود (\`factor()\`).
- **لیست (List)**: محفظه‌ای ناهمگن که می‌تواند عناصر با انواع و طول‌های متفاوت را درون خود ذخیره کند.
- **دیتا فریم (data.frame)**: جدول داده دوبعدی که هر ستون آن یک بردار با نوع داده مستقل است.`,
    checksLabels: [
      'متغیر f یک فاکتور معتبر باشد',
      'متغیر profile یک لیست باشد',
      'عنصر profile$count دارای مقدار ۴ باشد',
    ],
    learning: [
      'تابع factor() متغیرهای کیفی را همراه با سطوح مجزا کدگذاری می‌کند',
      'ساختار list() می‌تواند اشیاء با طول‌ها و انواع گوناگون را ذخیره کند',
      'دیتا فریم جدولی از بردهای هم‌اندازه است که ستون‌های متفاوت را نمایندگی می‌کند',
    ],
    fieldNotes: [
      'توابع مدل‌سازی آماری (مانند lm و glm) به صورت خودکار فاکتورها را به متغیرهای مجازی (Dummy) تبدیل می‌کنند.',
      'لیست‌ها ساختار استاندارد خروجی مدل‌ها، تنظیمات نرم‌افزار و پاسخ‌های وب‌سرویس JSON هستند.',
    ],
  },
  'control-flow': {
    title: '۰۶. ساختارهای کنترلی و شروط',
    brief: 'تابع ifelse() شروط را به صورت برداری روی عناصر اعمال می‌کند. نمرات scores را به وضعیت‌های "pass" یا "fail" تبدیل کنید.',
    hint: 'دستور status <- ifelse(scores >= 50, "pass", "fail") را اجرا کنید.',
    lesson: `### فصل ۶ — ساختارهای شرطی و کنترل جریان

در زبان R، علاوه بر دستور \`if ... else\`، تابع برداری بسیار سریع \`ifelse(test, yes, no)\` وجود دارد که شرط را روی تک‌تک اعضای یک بردار می‌سنجد:

\`\`\`r
status <- ifelse(scores >= 50, "pass", "fail")
\`\`\`

استفاده از محاسبات برداری به جای حلقه‌های سنتی، بازدهی کد را بسیار افزایش می‌دهد.`,
    checksLabels: ['بردار status نمرات بالای ۵۰ را pass و کمتر را fail کرده باشد'],
    learning: [
      'تابع ifelse() منطق شرطی را به صورت هم‌زمان روی تمام عناصر یک بردار اعمال می‌کند',
      'ارزیابی برداری نیاز به حلقه‌های کند for را در پردازش داده‌ها حذف می‌کند',
      'عملگرهای مقایسه‌ای یک بردار منطقی (Logical) از مقادیر TRUE و FALSE می‌سازند',
    ],
    fieldNotes: [
      'انشعاب‌های برداری در R روی مجموعه‌داده‌های بزرگ هزاران برابر سریع‌تر از حلقه‌های ترتیبی اجرا می‌شوند.',
      'در پکیج dplyr تابع case_when() همین فرآیند را برای شرایط چندگانه فراهم می‌کند.',
    ],
  },
  functions: {
    title: '۰۷. توابع اختصاصی و خانواده Apply',
    brief: 'تابع توان سوم cube را تعریف کرده و با sapply() روی اعداد ۱ تا ۴ اجرا کنید.',
    hint: 'دستورهای cube <- function(x) x^3 و res <- sapply(1:4, cube) را وارد کنید.',
    lesson: `### فصل ۷ — تعریف توابع و خانواده apply

تعریف تابع در R با کلمه کلیدی \`function\` انجام می‌شود و خروجی آخرین عبارت محاسبه‌شده به عنوان نتیجه برگردانده می‌شود:

\`\`\`r
cube <- function(x) x^3
\`\`\`

توابع خانواده \`apply\` (مانند \`sapply\` و \`lapply\`) امکان اجرای یک تابع را روی اعضای یک بردار یا لیست بدون نوشتن حلقه فراهم می‌سازند.`,
    checksLabels: [
      'متغیر cube یک تابع معتبر باشد',
      'بردار res شامل مقادیر توان سوم ۱ تا ۴ باشد',
    ],
    learning: [
      'دستور function() توابع مرتبه اول با دامنه متغیر واژگانی ایجاد می‌کند',
      'تابع sapply() یک تابع را روی عناصر بردار نگاشت کرده و نتیجه را ساده‌سازی می‌کند',
      'توابع در زبان R به صورت پیش‌فرض مقدار آخرین عبارت را بازمی‌گردانند',
    ],
    fieldNotes: [
      'خانواده توابع apply و پکیج purrr ستون فقرات برنامه‌نویسی تابعی و تمیز در زبان R هستند.',
      'در بسته‌های حساس به کارایی، استفاده از vapply برای تضمین نوع خروجی توصیه می‌شود.',
    ],
  },
  'import-flat': {
    title: '۰۸. ورود داده از فایل‌های متنی (CSV)',
    brief: 'تابع read.csv() داده‌های متنی با جداکننده کاما را می‌خواند. متغیر csv_text را به صورت دیتافریم در df بارگذاری کنید.',
    hint: 'دستور df <- read.csv(text = csv_text) را فراخوانی کنید.',
    lesson: `### فصل ۸ — خواندن فایل‌های Flat و CSV

فایل‌های متنی با ساختار جدول (مانند CSV و TSV) از پرکاربردترین قالب‌های ذخیره‌سازی داده هستند.
تابع \`read.csv()\` متن‌ها و فایل‌های با جداکننده کاما را خوانده و ساختار \`data.frame\` تولید می‌کند.`,
    checksLabels: [
      'متغیر df یک دیتافریم با ابعاد ۳ در ۳ باشد',
      'امتیاز سطر اول دیتافریم برابر ۹۵ باشد',
    ],
    learning: [
      'تابع read.csv() متن جدول‌بندی‌شده را به یک data.frame تبدیل می‌کند',
      'پارامتر text = امکان خواندن مستقیم رشته‌های متنی را بدون فایل فیزیکی فراهم می‌سازد',
      'سطر نخست فایل به صورت پیش‌فرض به عنوان نام ستون‌ها انتخاب می‌شود',
    ],
    fieldNotes: [
      'برای فایل‌های حجیم بالای ۱۰۰ مگابایت، پکیج‌های readr::read_csv و data.table::fread سرعت بسیار بالاتری دارند.',
      'همواره مشخص کنید که ستون‌های متنی به فاکتور تبدیل نشوند (stringsAsFactors = FALSE).',
    ],
  },
  'import-excel': {
    title: '۰۹. بررسی و بازرسی داده‌های جدولی',
    brief: 'جداول واردشده را بازرسی کنید. میانگین ستون ریاضی را در avg_math و تعداد سطرها را در n_records محاسبه نمایید.',
    hint: 'از mean(student_table$math) و nrow(student_table) استفاده کنید.',
    lesson: `### فصل ۹ — ورود داده از اکسل و بازرسی اولیه

پس از ورود داده، مراحل بازرسی با توابع استاندارد زیر انجام می‌گیرد:
- \`nrow()\` و \`ncol()\`: ابعاد سطر و ستون جدول
- \`mean()\`: محاسبه میانگین مقادیر عددی یک ستون
- \`summary()\`: خلاصه آماری شامل چارک‌ها، حداقل و حداکثر مقادیر`,
    checksLabels: [
      'میانگین ریاضی avg_math برابر ۱۸ باشد',
      'تعداد سطرها n_records برابر ۳ باشد',
    ],
    learning: [
      'توابع nrow() و ncol() ابعاد داده را پیش از پردازش کنترل می‌کنند',
      'توابع mean() و summary() توصیف آماری ستون‌های عددی را ارائه می‌دهند',
      'عملگر $ برای استخراج مستقیم یک ستون به عنوان بردار استفاده می‌شود',
    ],
    fieldNotes: [
      'در پایپلاین‌های خودکار مهندسی داده، اعتبارسنجی ابعاد داده قبل از بارگذاری در دیتابیس ضروری است.',
      'پکیج‌های readxl و openxlsx استاندارد ورود فایل‌های چندبرگی اکسل در سازمان‌ها هستند.',
    ],
  },
  'import-db': {
    title: '۱۰. پرس‌وجوهای رابطه‌ای و پایگاه‌داده',
    brief: 'فیلتر شرطی در R مشابه دستور WHERE در SQL است. سطرهایی از sales_data با amount >= 150 و region == "North" را فیلتر کنید.',
    hint: 'دستور top_sales <- subset(sales_data, amount >= 150 & region == "North") را بنویسید.',
    lesson: `### فصل ۱۰ — اتصال به دیتابیس و فیلترهای رابطه‌ای

منطق استخراج رکوردهای منطبق با شروط پایگاه‌داده در R با تابع \`subset()\` یا فیلترهای منطقی پیاده‌سازی می‌شود.
عملگر \`&\` شرط عطفی (AND) و عملگر \`|\` شرط فصلی (OR) را بررسی می‌کنند.`,
    checksLabels: [
      'دیتافریم top_sales شامل ۲ سطر فیلترشده باشد',
      'سطرهای انتخاب‌شده دارای مبلغ بالای ۱۵۰ و منطقه North باشند',
    ],
    learning: [
      'تابع subset() رکوردهای منطبق بر عبارات بولی ترکیبی (& و |) را فیلتر می‌کند',
      'منطق استخراج داده در R کاملاً منطبق بر گزاره‌های WHERE در SQL است',
      'فیلتر منطقی بدون تغییر در ساختار اصلی، زیرمجموعه سطرها را انتخاب می‌کند',
    ],
    fieldNotes: [
      'پکیج dbplyr به شما امکان می‌دهد کدهای فیلتر R را مستقیماً به کوئری‌های بهینه SQL در سرورهای PostgreSQL یا BigQuery ترجمه کنید.',
      'اعمال شرط روی ستون‌های ایندکس‌شده از خواندن کل ردیف‌ها در حافظه رم جلوگیری می‌کند.',
    ],
  },
  'import-web': {
    title: '۱۱. داده‌های وب و وب‌سرویس‌ها (APIs)',
    brief: 'وب‌سرویس‌ها داده‌ها را در ساختار درختی JSON یا لیست برمی‌گردانند. نام کاربران را از api_data$items در متغیر names استخراج کنید.',
    hint: 'دستور names <- sapply(api_data$items, function(u) u$name) را اجرا کنید.',
    lesson: `### فصل ۱۱ — خواندن داده از وب و ساختارهای JSON

داده‌های استخراج‌شده از وب‌سرویس‌ها معمولاً ساختار سلسله‌مراتبی درختی دارند.
با ترکیب توابع نگاشت و پیمایش لیست‌ها، مقادیر فیلدهای مشخص استخراج و به فرمت‌های جدولی تبدیل می‌شوند.`,
    checksLabels: ['بردار names شامل اسامی استخراج‌شده باشد'],
    learning: [
      'پاسخ‌های API ساختار تو در توی درختی (JSON و لیست‌ها) دارند',
      'تابع sapply() مشخصه‌های معین را از میان لیست‌های تودرتو بیرون می‌کشد',
      'نمادهای [[]] و $ برای پیمایش ساختار درخت‌های داده به کار می‌روند',
    ],
    fieldNotes: [
      'پایپلاین‌های حرفه‌ای از httr2 با قابلیت تلاش مجدد خودکار (Retry) و پکیج jsonlite برای مصرف سرویس‌های REST استفاده می‌کنند.',
      'داده‌های سلسله‌مراتبی وب پس از استخراج توسط purrr یا tidyr مسطح (Flatten) می‌شوند.',
    ],
  },
  'tidy-data': {
    title: '۱۲. داده‌های تمیز و مقادیر مفقوده (NA)',
    brief: 'مقادیر گم‌شده با NA نشان داده می‌شوند. مکان‌های NA را با is.na() پیدا کرده و سطرها را با na.omit() پاکسازی کنید.',
    hint: 'دستورهای has_na <- is.na(raw_survey$score) و clean_survey <- na.omit(raw_survey) را بنویسید.',
    lesson: `### فصل ۱۲ — اصول داده تمیز و مدیریت مقادیر گم‌شده

در اصول Tidy Data:
- داده‌های مفقوده با مقدار اختصاصی \`NA\` نشان داده می‌شوند.
- هرگز نباید از \`x == NA\` استفاده کرد، بلکه باید از تابع \`is.na(x)\` بهره گرفت.
- تابع \`na.omit(df)\` سطرهای دارای حداقل یک مقدار گمشده را حذف می‌نماید.`,
    checksLabels: [
      'بردار has_na جایگاه مقادیر مفقوده را به درستی تشخیص دهد',
      'دیتافریم clean_survey تنها شامل ۳ سطر بدون مقدار مفقوده باشد',
    ],
    learning: [
      'داده‌های مفقوده در R با ثابت اختصاصی NA مشخص می‌شوند',
      'تابع is.na() وضعیت تهی بودن مقادیر را بدون خطا بررسی می‌کند',
      'دستور na.omit() مشاهدات ناقص را از مجموعه داده پاکسازی می‌نماید',
    ],
    fieldNotes: [
      'عبارت x == NA همواره NA برمی‌گرداند؛ در تمام مقایسه‌ها حتماً از is.na() استفاده کنید.',
      'در پروژه‌های یادگیری ماشین، روش‌های جایگزینی آماری (Imputation) به جای حذف ساده سطرها ترجیح داده می‌شوند.',
    ],
  },
  'strings-regex': {
    title: '۱۳. کار با رشته‌ها و عبارات منظم (Regex)',
    brief: 'با تابع gsub() تمام خط‌تیره‌ها را با خط زیرین در بردار tags تعویض کرده و در clean_tags ذخیره کنید.',
    hint: 'دستور clean_tags <- gsub("-", "_", tags) را اجرا کنید.',
    lesson: `### فصل ۱۳ — دستکاری متون و الگوهای منظم

برای پاکسازی و تطبیق متن‌ها در R:
- \`gsub(pattern, replacement, x)\`: جایگزینی تمامی رخدادهای منطبق با الگو
- \`grepl(pattern, x)\`: بررسی وجود الگو به صورت بردار بولی
- \`paste()\`: پیوند دادن بردارها و متون`,
    checksLabels: ['بردار clean_tags شامل برچسب‌های استانداردشده با خط زیرین باشد'],
    learning: [
      'تابع gsub() تمام الگوهای منطبق با عبارات منظم را جایگزین می‌کند',
      'توابع متنی R پایه به صورت برداری روی تمام عناصر اعمال می‌شوند',
      'عبارات منظم برای استانداردسازی شناسه کالاها و داده‌های نامرتب حیاتی هستند',
    ],
    fieldNotes: [
      'استانداردسازی رشته‌ها اولین گام در تمیزکاری آدرس‌ها، کدهای پستی و شماره‌های پرسنلی است.',
      'پکیج stringr توابع متنی سازگار با کدگذاری UTF-8 را برای سیستم‌عامل‌های مختلف فراهم می‌سازد.',
    ],
  },
  dplyr: {
    title: '۱۴. دستکاری داده‌ها و عملگر خط لوله (Pipe)',
    brief: 'با عملگر خط لوله |> عملیات فیلتر قیمت و محاسبه total = price * qty را زنجیره‌ای انجام دهید.',
    hint: 'دستور valuable <- subset(inventory, price >= 15) |> transform(total = price * qty) را بنویسید.',
    lesson: `### فصل ۱۴ — دستکاری داده‌ها با عملگر خط لوله (Pipe)

عملگر خط لوله مدرن پایه R (\`|>\`):
نتیجه عبارت سمت چپ را به عنوان ورودی اول تابع سمت راست ارسال می‌کند.
این الگو مانع از پرانتزهای تودرتو و پیچیده شده و کدی خوانا و خطی به وجود می‌آورد.`,
    checksLabels: [
      'دیتافریم valuable شامل ۳ قلم فیلترشده باشد',
      'ستون total مقادیر محاسباتی قیمت در تعداد را نگه دارد',
    ],
    learning: [
      'عملگر خط لوله |> خروجی سمت چپ را به اولین ورودی سمت راست متصل می‌کند',
      'خطوط لوله توابع تودرتو را به جریان‌های پردازش خوانا و تمیز تبدیل می‌کنند',
      'ترکیب عملیات فیلتر و تحول ستونی کدنویسی تحلیلی را سرعت می‌بخشد',
    ],
    fieldNotes: [
      'عملگر پایپ بومی |> در نسخه‌های جدید R بدون هیچ پکیج اضافی و بدون افت بازدهی عمل می‌کند.',
      'زنجیره‌سازی منطقی کدها بازبینی و مستندسازی پروژه‌ها را برای اعضای تیم آسان‌تر می‌سازد.',
    ],
  },
  joins: {
    title: '۱۵. پیوند جداول و اتصالات رابطه‌ای (Joins)',
    brief: 'دو جدول کاربران و سفارش‌ها را بر اساس user_id پیوند دهید. با merge(all.x = TRUE) یک اتصال چپ انجام دهید.',
    hint: 'دستور report <- merge(users, orders, by = "user_id", all.x = TRUE) را وارد کنید.',
    lesson: `### فصل ۱۵ — اتصال جداول (Merge و Join)

اتصال جداول در R با تابع \`merge()\` صورت می‌گیرد:
- **اتصال چپ (Left Join)**: با گزینه \`all.x = TRUE\` تمام رکوردهای جدول اول حفظ شده و در صورت نبود سفارش، مقدار \`NA\` درج می‌شود.
- **اتصال درونی (Inner Join)**: پیش‌فرض \`merge()\` که فقط رکوردهای مشترک در هر دو جدول را نگه می‌دارد.`,
    checksLabels: [
      'دیتافریم report شامل ۳ سطر حاصل از اتصال باشد',
      'ردیف مربوط به Ali سفارش خود را به درستی جذب کرده باشد',
      'کاربر بدون سفارش دارای مقدار NA در ستون total باشد',
    ],
    learning: [
      'دستور merge() داده‌های دو جدول را با کلید مشترک ادغام می‌کند',
      'گزینه all.x = TRUE اتصال بیرونی چپ را پیاده‌سازی می‌کند',
      'در صورت عدم وجود سطر منطبق، فیلدهای جدول دوم مقدار NA می‌گیرند',
    ],
    fieldNotes: [
      'مدل‌های داده ابعادی (Star Schema) مبتنی بر اتصال جداول واقعیت (Fact) به ابعاد (Dimensions) هستند.',
      'همواره قبل از Join بررسی کنید که نوع داده کلیدهای دو جدول کاملاً یکسان باشد.',
    ],
  },
  datetime: {
    title: '۱۶. مدیریت تاریخ و زمان',
    brief: 'رشته‌های تاریخی را با as.Date() به نوع داده تاریخ تبدیل کرده و اختلاف روزها را در days_between محاسبه کنید.',
    hint: 'با as.Date("YYYY-MM-DD") تبدیل کنید و تفاضل را به عدد تبدیل نمایید: as.numeric(end_date - start_date).',
    lesson: `### فصل ۱۶ — داده‌های تقویمی و زمانی

در زبان R، کلاس \`Date\` برای مدیریت تاریخ‌های تقویمی و کلاس \`POSIXct\` برای زمان همراه با ساعت به کار می‌رود.
تفریق دو تاریخ به صورت خودکار تفاوت روزها (\`difftime\`) را برمی‌گرداند.`,
    checksLabels: [
      'متغیرهای start_date و end_date از کلاس Date باشند',
      'مقدار days_between برابر با ۱۴ روز باشد',
    ],
    learning: [
      'تابع as.Date() رشته‌های تاریخ را به اشیاء تقویمی استاندارد تبدیل می‌کند',
      'محاسبات ریاضی روی تاریخ‌ها مستقیماً فاصله روزها را نتیجه می‌دهد',
      'کلاس‌های تاریخی R سال‌های کبیسه و تعداد متغیر روزهای ماه‌ها را لحاظ می‌کنند',
    ],
    fieldNotes: [
      'همواره قالب تاریخ را با پارامتر format مشخص کنید تا از خطاهای زبان سیستم‌عامل جلوگیری شود.',
      'در پایگاه‌های داده سازمان‌ها، زمان‌ها همواره بر اساس استاندارد هماهنگ جهانی (UTC) ذخیره می‌شوند.',
    ],
  },
  'data-table': {
    title: '۱۷. خلاصه‌سازی و تجمیع داده‌ها',
    brief: 'با تابع aggregate() مجموع مبالغ تراکنش‌ها را بر اساس بخش‌های سازمانی در dept_totals محاسبه نمایید.',
    hint: 'دستور dept_totals <- aggregate(amount ~ dept, data = transactions, FUN = sum) را بنویسید.',
    lesson: `### فصل ۱۷ — تجمیع گروهی داده‌ها

تابع \`aggregate(formula, data, FUN)\` مقادیر عددی را بر اساس متغیرهای طبقه‌بندی دسته‌بندی و تابع موردنظر (مانند sum یا mean) را روی هر گروه محاسبه می‌کند.`,
    checksLabels: [
      'متغیر dept_totals یک دیتافریم باشد',
      'مجموع مبالغ بخش IT برابر ۸۵۰ باشد',
      'مجموع مبالغ بخش HR برابر ۳۵۰ باشد',
    ],
    learning: [
      'تابع aggregate() شاخص‌های آماری را به تفکیک گروه‌ها خلاصه می‌کند',
      'فرمول نویسی y ~ group متغیر وابسته و عامل گروه‌بندی را مشخص می‌سازد',
      'پارامتر FUN تابع تلخیص‌کننده (مانند sum، mean، length) را تعیین می‌کند',
    ],
    fieldNotes: [
      'تجمیع گروهی هسته اصلی تولید داشبوردهای مدیریتی و استخراج ویژگی‌های یادگیری ماشین است.',
      'در جداول با میلیون‌ها ردیف، پکیج data.table با دستوراتی نظیر DT[, .(sum(amount)), by = dept] عملکردی بی‌رقیب دارد.',
    ],
  },
  'outliers-plots': {
    title: '۱۸. شناسایی داده‌های پرت و رسم نمودار',
    brief: 'فاصله میان‌چارکی را با IQR() محاسبه کرده و با تابع boxplot() نمودار جعبه‌ای مقادیر را رسم کنید.',
    hint: 'دستورهای iqr_val <- IQR(vals) و boxplot(vals, col = "#2569bb", main = "Distribution") را اجرا کنید.',
    lesson: `### فصل ۱۸ — داده‌های پرت و نمودارهای گرافیکی

- **دامنه میان‌چارکی (\`IQR\`):** تفاوت بین چارک سوم (۷۵٪) و چارک اول (۲۵٪).
- **نمودار جعبه‌ای (\`boxplot\`):** میانه، چارک‌ها و داده‌های پرت آماری (فراتر از ۱.۵ برابر IQR) را مصورسازی می‌کند.`,
    checksLabels: [
      'مقدار iqr_val به درستی محاسبه شده باشد',
      'نمودار جعبه‌ای روی بوم ترسیم شده باشد',
    ],
    learning: [
      'دستور IQR() دامنه میان‌چارکی توزیع داده‌ها را محاسبه می‌کند',
      'نمودار boxplot() میانه، دامنه چارک‌ها و مقادیر پرت را به وضوح نمایش می‌دهد',
      'سیستم گرافیکی پایه R نیاز به هیچ بسته خارجی ندارد و با نهایت سرعت رندر می‌شود',
    ],
    fieldNotes: [
      'شناسایی مقادیر پرت اولین مرحله در تحلیل اکتشافی داده‌ها (EDA) برای کشف داده‌های ناقص یا تقلب است.',
      'در ابزارهای پایش خودکار، نمودارهای جعبه‌ای به عنوان شاخص انحراف توزیع داده‌ها (Drift) استفاده می‌شوند.',
    ],
  },
  capstone: {
    title: '۱۹. پروژه جامع و جمع‌بندی دوره',
    brief: 'یک پایپلاین کامل داده: فیلتر نمرات معتبر (score > 0)، تجمیع میانگین بر اساس گروه و رسم نمودار میله‌ای بارپلات.',
    hint: 'دستورهای valid <- subset(project_data, score > 0)، group_means <- aggregate(score ~ group, data = valid, FUN = mean) و barplot(group_means$score, names.arg = group_means$group, col = "#2569bb") را اجرا کنید.',
    lesson: `### فصل ۱۹ — پروژه جامع و پایپلاین تحلیل داده

در این پروژه نهایی تمام مفاهیم آموخته‌شده را در یک گردش کار کامل ترکیب می‌کنید:
1. فیلتر کردن رکوردهای نامعتبر با \`subset()\`
2. خلاصه‌سازی و محاسبه میانگین بر اساس گروه با \`aggregate()\`
3. رسم نمودار ستونی با \`barplot()\` برای ارائه بصری نتایج`,
    checksLabels: [
      'دیتافریم valid شامل ۴ سطر با نمره مثبت باشد',
      'دیتافریم group_means میانگین هر گروه را محاسبه کرده باشد',
      'نمودار میله‌ای با موفقیت رسم شده باشد',
    ],
    learning: [
      'گردش کار کامل داده: پاکسازی، تجمیع و رسم نمودار در یک پایپلاین متصل',
      'ترکیب فیلترهای رابطه‌ای، تجمیع آماری و ابزارهای بصری‌سازی',
      'تسلط کامل بر مبانی عملی و کاربردی برنامه‌نویسی با زبان R',
    ],
    fieldNotes: [
      'در محیط‌های صنعتی، تمام این چرخه در اسناد گزارش‌گیری تعاملی Quarto / R Markdown یا داشبوردهای Shiny پکیج‌بندی می‌شود.',
      'یک پایپلاین استاندارد داده داده‌های اولیه را می‌گیرد، اعتبارسنجی می‌کند، خلاصه آماری می‌سازد و آرتیفکت‌های بصری تحویل می‌دهد.',
    ],
  },
};

export const DE_LEVELS: Record<string, LocalizedLevelData> = {
  hello: {
    title: '01. Einführung / Hallo, R',
    brief: 'R gibt ausgewertete Werte direkt auf der Konsole aus. Erstelle eine Zeichenkette und gib sie aus.',
    hint: 'Verwende print() mit einer Zeichenkette in Anführungszeichen: print("Hello, R!")',
    lesson: `### Kapitel 1 — Einführung in R

Die Programmiersprache R ist eines der weltweit beliebtesten Werkzeuge für Datenanalyse, statistische Berechnungen und wissenschaftliche Datenvisualisierung.

Auf der interaktiven R-Konsole wird jede Eingabe unmittelbar ausgewertet und das Ergebnis dargestellt:

\`\`\`r
print("Hello, R!")
\`\`\`

Drücke **Strg + Eingabe** (oder Cmd + Eingabe auf dem Mac), um den Befehl auszuführen.`,
    checksLabels: ['Konsolenausgabe enthält "Hello, R!"'],
    learning: [
      'print() gibt Zeichenketten und Ausdrücke direkt auf der Konsole aus',
      'Zeichenketten in R können in einfache oder doppelte Anführungszeichen gesetzt werden',
      'In der R-Konsole eingegebene Befehle werden unmittelbar evaluiert',
    ],
    fieldNotes: [
      'Produktionsskripte und CLI-Tools werden nicht-interaktiv über Rscript ausgeführt.',
      'Shiny-Webanwendungen und R-Pakete nutzen statt barem print() Logging-Frameworks wie message() oder logger.',
    ],
  },
  rstudio: {
    title: '02. RStudio & Arbeitsbereich',
    brief: 'Variablen leben im globalen Arbeitsbereich (.GlobalEnv). Ermittle vorhandene Variablen mit ls().',
    hint: 'Führe active_vars <- ls() aus, um alle Objektnamen im Speicher zu erfassen.',
    lesson: `### Kapitel 2 — RStudio & der Arbeitsbereich

RStudio ist die führende Entwicklungsumgebung (IDE) für R.
- **Strg + Eingabe**: Führt die aktuelle Zeile in der Konsole aus
- **Alt + -**: Fügt automatisch den Zuweisungsoperator \`<-\` ein
- **\`ls()\`**: Liefert die Namen aller im globalen Speicher (.GlobalEnv) definierten Variablen als Zeichenvektor zurück.`,
    checksLabels: [
      'Variable active_vars existiert im Arbeitsbereich',
      'active_vars enthält die vorhandenen Umgebungsobjekte',
    ],
    learning: [
      'ls() listet alle aktiven Objektnamen im .GlobalEnv-Arbeitsbereich auf',
      'Variablen bleiben im Speicher erhalten, bis die Sitzung endet oder rm() aufgerufen wird',
      'Tastenkürzel Strg + Eingabe überträgt Codezeilen direkt zur Konsole',
    ],
    fieldNotes: [
      'Produktions-Pipelines vermeiden das Speichern von .RData-Dateien, um zustandslose, reproduzierbare Builds zu gewährleisten.',
      'Paket-Namespaces schützen Funktionen vor unbeabsichtigten Namenskollisionen mit globalen Variablen.',
    ],
  },
  numbers: {
    title: '03. Rechenoperationen & Variablen',
    brief: 'R unterstützt Ganzzahldivision (%/%), Modulo (%%) und Potenzen (^). Berechne Quotient q, Rest r und Potenz p.',
    hint: 'Gib q <- 17 %/% 5, r <- 17 %% 5 und p <- 2^4 ein.',
    lesson: `### Kapitel 3 — Arithmetik und Variablenzuweisung

Neben den Grundrechenarten bietet R spezielle mathematische Operatoren:
- **Ganzzahldivision (\`%/%\`)**: Liefert den ganzzahligen Anteil ohne Nachkommastellen (\`17 %/% 5\` ergibt 3)
- **Modulo / Rest (\`%%\`)**: Berechnet den Divisionsrest (\`17 %% 5\` ergibt 2)
- **Potenzierung (\`^\`)**: Berechnet Potenzen (\`2^4\` ergibt 16)
- **Zuweisungsoperator (\`<-\`)**: Weist einem Bezeichner einen Wert zu`,
    checksLabels: [
      'q entspricht 17 %/% 5 (3)',
      'r entspricht 17 %% 5 (2)',
      'p entspricht 2^4 (16)',
    ],
    learning: [
      '%/% führt eine Ganzzahldivision durch und verwirft den Rest',
      '%% berechnet den Restbetrag (Modulo) einer Division',
      '^ potenziert Zahlen in Basis-R',
    ],
    fieldNotes: [
      'Modulo und Ganzzahldivision sind essenziell für Paginierung, Daten-Chunking und Round-Robin-Verteilung.',
      'Fließkommazahlen folgen IEEE 754; verwende all.equal() anstelle von == für numerische Vergleiche.',
    ],
  },
  vectors: {
    title: '04. Vektoren & Matrizen',
    brief: 'Vektoren werden mit c() und Matrizen mit matrix() erstellt. Erstelle eine 2x3-Matrix mat, zeilenweise gefüllt mit 1 bis 6.',
    hint: 'Verwende mat <- matrix(1:6, nrow = 2, ncol = 3, byrow = TRUE).',
    lesson: `### Kapitel 4 — Vektoren und Matrizen

Vektoren sind das fundamentale Datenformat in R und werden mit \`c()\` gebildet.
Matrizen sind zweidimensionale, homogene Datenfelder, die mit der Funktion \`matrix()\` instanziiert werden:

\`\`\`r
mat <- matrix(1:6, nrow = 2, ncol = 3, byrow = TRUE)
\`\`\`

Der Zugriff auf Matrixelemente erfolgt im Format \`mat[Zeile, Spalte]\` (1-basiert).`,
    checksLabels: [
      'mat ist eine Matrix',
      'mat hat genau 2 Zeilen und 3 Spalten',
      'Elemente sind zeilenweise (byrow) angeordnet',
    ],
    learning: [
      'c() fasst Werte zu einem eindimensionalen atomaren Vektor zusammen',
      'matrix() ordnet Elemente in feste Zeilen und Spalten an',
      'byrow = TRUE befüllt Matrizen zeilenweise statt spaltenweise',
    ],
    fieldNotes: [
      'Matrizen erzwingen homogene Datentypen und ermöglichen lineare Algebra auf nativer BLAS/LAPACK-Geschwindigkeit.',
      'In Bildverarbeitung, Machine Learning und Graphentheorie werden Daten bevorzugt in Matrixform verarbeitet.',
    ],
  },
  'data-structures': {
    title: '05. Faktoren, Data Frames & Listen',
    brief: 'Faktoren verwalten kategoriale Merkmale und Listen speichern gemischte Typen. Packe Faktor f in eine Liste profile.',
    hint: 'Erstelle f mit factor(...) und profile mit list(status = f, count = length(f)).',
    lesson: `### Kapitel 5 — Faktoren, Data Frames und Listen

- **Faktor (Factor)**: Kodiert kategoriale Variablen mit definierten Ausprägungen (Levels).
- **Liste (List)**: Heterogener Container, der beliebige Datentypen unterschiedlicher Länge aufnehmen kann.
- **Data Frame (data.frame)**: Zweidimensionale Tabelle, in der jede Spalte ein gleichlanger Vektor mit eigenem Datentyp ist.`,
    checksLabels: [
      'f ist ein Faktor',
      'profile ist eine Liste',
      'profile$count hat den Wert 4',
    ],
    learning: [
      'factor() kodiert kategoriale Daten mit diskreten Stufen (Levels)',
      'list() speichert heterogene Elemente beliebiger Typen und Längen',
      'data.frame ist eine Tabelle gleichlanger Vektoren',
    ],
    fieldNotes: [
      'Statistische Modelle (wie lm und glm) wandeln Faktoren automatisch in Dummy-Variablen um.',
      'Listen sind das Standardformat für Modell-Ergebnisse, Konfigurationen und JSON-Daten.',
    ],
  },
  'control-flow': {
    title: '06. Ablaufsteuerung & Bedingungen',
    brief: 'ifelse() wertet Bedingungen elementweise über Vektoren aus. Klassifiziere scores in "pass" (>= 50) oder "fail".',
    hint: 'Verwende status <- ifelse(scores >= 50, "pass", "fail").',
    lesson: `### Kapitel 6 — Ablaufsteuerung und Vektorisierung

In R wird für elementweise Verzweigungen die performante vektorisierte Funktion \`ifelse(test, yes, no)\` eingesetzt:

\`\`\`r
status <- ifelse(scores >= 50, "pass", "fail")
\`\`\`

Vektorisierte Operationen vermeiden langsame klassische for-Schleifen.`,
    checksLabels: ['status klassifiziert alle Punktzahlen korrekt'],
    learning: [
      'ifelse() wendet Bedingungen simultan auf ganze Vektoren an',
      'Vektorisierung eliminiert langsame for-Schleifen in Daten-Pipelines',
      'Vergleichsoperatoren erzeugen logische Vektoren (TRUE / FALSE)',
    ],
    fieldNotes: [
      'Vektorisierte Abfragen in R sind um ein Vielfaches schneller als iterative for-Schleifen über große Data Frames.',
      'Im Tidyverse bietet dplyr::case_when() eine flexible Erweiterung für mehrstufige Bedingungen.',
    ],
  },
  functions: {
    title: '07. Eigene Funktionen & Apply-Familie',
    brief: 'Definiere eine Funktion cube für x^3 und wende sie mit sapply() auf 1:4 an.',
    hint: 'Schreibe cube <- function(x) x^3 und res <- sapply(1:4, cube).',
    lesson: `### Kapitel 7 — Eigene Funktionen und die apply-Familie

Funktionen werden mit dem Schlüsselwort \`function\` definiert und geben automatisch den Wert des letzten Ausdrucks zurück:

\`\`\`r
cube <- function(x) x^3
\`\`\`

Die \`apply\`-Funktionen (\`sapply\`, \`lapply\`) wenden Funktionen auf Elemente eines Vektors oder einer Liste an, ohne dass explizite Schleifen nötig sind.`,
    checksLabels: [
      'cube ist eine Funktion',
      'res enthält die Werte c(1, 8, 27, 64)',
    ],
    learning: [
      'function() erzeugt wiederverwendbare Funktionen mit lexikalischem Scope',
      'sapply() wendet Funktionen auf Vektorelemente an und vereinfacht das Ergebnis',
      'R-Funktionen geben automatisch den letzten evaluierten Ausdruck zurück',
    ],
    fieldNotes: [
      'Die apply-Familie und purrr::map bilden das Rückgrat funktionaler Programmierung in R.',
      'In geschäftskritischen Paketen garantiert vapply() strikte Typsicherheit für Rückgabewerte.',
    ],
  },
  'import-flat': {
    title: '08. Textdateien & CSV-Import',
    brief: 'read.csv() liest tabellarischen Text in einen data.frame ein. Importiere csv_text in df.',
    hint: 'Übergib text = csv_text an read.csv().',
    lesson: `### Kapitel 8 — Importieren von Flat Files und CSVs

Textdateien mit Trennzeichen (CSV, TSV) gehören zu den wichtigsten Austauschformaten.
Die Funktion \`read.csv()\` liest kommagetrennte Tabellen direkt in ein \`data.frame\`-Objekt ein.`,
    checksLabels: [
      'df ist ein 3x3 Data Frame',
      'Punktzahl der ersten Zeile beträgt 95',
    ],
    learning: [
      'read.csv() wandelt tabellarischen Text in ein strukturiertes data.frame um',
      'text = ermöglicht das Einlesen von Zeichenketten direkt aus dem Speicher',
      'Kopfzeilen werden standardmäßig als Spaltennamen erkannt',
    ],
    fieldNotes: [
      'Für sehr große Dateien (>100MB) nutzen Produktionsteams readr::read_csv oder data.table::fread für Multithreading-Speed.',
      'stringsAsFactors = FALSE verhindert ungewolltes Konvertieren von Text in Faktoren.',
    ],
  },
  'import-excel': {
    title: '09. Tabellarische Datenprüfung',
    brief: 'Inspiziere Tabellen: Berechne avg_math als Mittelwert und n_records als Zeilenanzahl.',
    hint: 'Verwende mean(student_table$math) und nrow(student_table).',
    lesson: `### Kapitel 9 — Tabelleninspektion und Kennzahlen

Nach dem Datenimport liefern Standardfunktionen schnelle Einblicke:
- \`nrow()\` / \`ncol()\`: Zeilen- und Spaltenanzahl
- \`mean()\`: Arithmetischer Mittelwert einer Zahlenspalte
- \`summary()\`: Statistische 5-Punkte-Zusammenfassung`,
    checksLabels: [
      'avg_math ist gleich 18',
      'n_records ist gleich 3',
    ],
    learning: [
      'nrow() und ncol() prüfen Dimensionen vor der Weiterverarbeitung',
      'mean() und summary() berechnen deskriptive Kennzahlen numerischer Spalten',
      '$ extrahiert benannte Spalten als Vektoren',
    ],
    fieldNotes: [
      'Automatisierte Datenqualitätsprüfungen in ETL-Pipelines validieren Zeilenzahlen vor Datenbank-Writes.',
      'Pakete wie readxl und openxlsx lesen Excel-Dateien ohne Java-Abhängigkeiten ein.',
    ],
  },
  'import-db': {
    title: '10. Relationale Abfragen & Datenbanken',
    brief: 'subset() filtert Datensätze analog zu SQL WHERE. Filtere sales_data mit amount >= 150 und region == "North".',
    hint: 'Verwende subset(sales_data, amount >= 150 & region == "North").',
    lesson: `### Kapitel 10 — Datenbankabfragen und relationale Filter

Das Filtern von Datensätzen nach logischen Kriterien entspricht der WHERE-Klausel in relationalen Datenbanken.
In R filtert die Funktion \`subset()\` Zeilen anhand logischer Operatoren (\`&\` für UND, \`|\` für ODER).`,
    checksLabels: [
      'top_sales enthält genau 2 Zeilen',
      'Filtert amount >= 150 und region == North',
    ],
    learning: [
      'subset() filtert Zeilen anhand kombinierter Bedingungen (& und |)',
      'Relationale Abfragelogik spiegelt SQL-WHERE-Befehle wider',
      'Logische Indizierung wählt Datensätze aus, ohne die Tabellenstruktur zu verändern',
    ],
    fieldNotes: [
      'dbplyr übersetzt R-Filterausdrücke direkt in optimiertes SQL auf PostgreSQL oder BigQuery.',
      'Gezielte Abfragen verhindern, dass unnötige Zeilen in den Arbeitsspeicher geladen werden.',
    ],
  },
  'import-web': {
    title: '11. Webdaten & JSON-Strukturen',
    brief: 'APIs liefern geschachtelte Datensätze. Extrahiere Benutzernamen aus api_data$items in names.',
    hint: 'Extrahiere name mit sapply(api_data$items, function(u) u$name).',
    lesson: `### Kapitel 11 — Web-APIs und hierarchische Daten

Webdienste und REST-APIs liefern Daten meist in geschachtelten hierarchischen Listen (aus JSON).
Mit funktionalen Mapping-Methoden lassen sich gezielt Attribute aus diesen Strukturen extrahieren.`,
    checksLabels: ['names enthält die Namen der Benutzer'],
    learning: [
      'Web-APIs liefern baumartige, geschachtelte Datenstrukturen (JSON/Listen)',
      'sapply() extrahiert Attribute aus Datensatzlisten',
      'Operatoren [[]] und $ navigieren durch hierarchische Objekte',
    ],
    fieldNotes: [
      'Produktions-Pipelines nutzen httr2 mit automatischen Retries und jsonlite zum Parsen.',
      'Geschachtelte API-Antworten werden häufig mit purrr oder tidyr in flache Data Frames transformiert.',
    ],
  },
  'tidy-data': {
    title: '12. Tidy Data & Fehlende Werte (NA)',
    brief: 'Fehlende Werte werden durch NA dargestellt. Finde NAs mit is.na() und bereinige mit na.omit().',
    hint: 'Verwende has_na <- is.na(raw_survey$score) und clean_survey <- na.omit(raw_survey).',
    lesson: `### Kapitel 12 — Tidy Data und fehlende Werte

Im Tidy-Data-Paradigma:
- Fehlende Daten werden durch die Konstante \`NA\` (Not Available) repräsentiert.
- Verwende niemals \`x == NA\`, sondern stets \`is.na(x)\`.
- \`na.omit(df)\` entfernt unvollständige Zeilen mit fehlenden Werten.`,
    checksLabels: [
      'has_na identifiziert fehlende Werte korrekt',
      'clean_survey enthält nur die 3 vollständigen Zeilen',
    ],
    learning: [
      'Fehlende Werte werden in Basis-R als NA gekennzeichnet',
      'is.na() prüft auf fehlende Werte, ohne Vergleiche zu beschädigen',
      'na.omit() entfernt unvollständige Beobachtungen aus Datensätzen',
    ],
    fieldNotes: [
      'x == NA liefert immer NA; nutze für alle Nullwertprüfungen ausschließlich is.na().',
      'In Machine-Learning-Pipelines wird Imputation (Mittelwert, Median, MICE) oft dem reinen Löschen vorgezogen.',
    ],
  },
  'strings-regex': {
    title: '13. Zeichenketten & Reguläre Ausdrücke',
    brief: 'Textbereinigung mit Regex: Ersetze Bindestriche durch Unterstriche in tags mit gsub().',
    hint: 'Führe clean_tags <- gsub("-", "_", tags) aus.',
    lesson: `### Kapitel 13 — Strings und reguläre Ausdrücke (Regex)

Funktionen zur Textbearbeitung in R:
- \`gsub(pattern, replacement, x)\`: Ersetzt alle Vorkommen eines Musters
- \`grepl(pattern, x)\`: Prüft, ob ein Muster vorkommt (liefert logischen Vektor)
- \`paste()\`: Verbindet Texte miteinander`,
    checksLabels: ['clean_tags enthält tags mit Unterstrichen'],
    learning: [
      'gsub() ersetzt alle Treffer regulärer Ausdrücke in Texten',
      'Zeichenketten-Funktionen in R wirken vektorisiert über alle Elemente',
      'Reguläre Ausdrücke standardisieren Bezeichner und Formatierungen',
    ],
    fieldNotes: [
      'String-Bereinigung ist der erste Schritt bei Postleitzahlen, Telefonnummern und Artikelnummern.',
      'Das Paket stringr bietet plattformübergreifende, UTF-8-sichere String-Methoden.',
    ],
  },
  dplyr: {
    title: '14. Daten-Wrangling & Pipelines',
    brief: 'Die Pipe |> verkettet Schritte. Filtere inventory nach price >= 15 und berechne total = price * qty.',
    hint: 'Verwende valuable <- subset(inventory, price >= 15) |> transform(total = price * qty).',
    lesson: `### Kapitel 14 — Datenmanipulation mit der Pipe |>

Die moderne native Pipe in R (\`|>\`):
Übergibt das Ergebnis des linken Ausdrucks als erstes Argument an die rechte Funktion.
Dies erzeugt übersichtlichen, linearen und selbsterklärenden Transformationscode.`,
    checksLabels: [
      'valuable enthält 3 gefilterte Artikel',
      'valuable$total enthält 50, 120, 40',
    ],
    learning: [
      'Die native Pipe |> leitet Ausgaben als erstes Argument an die nächste Funktion weiter',
      'Pipelines verwandeln geschachtelte Funktionsaufrufe in lesbare Ketten',
      'Kombination aus Filtern und Berechnen beschleunigt Datenanalysen',
    ],
    fieldNotes: [
      'Die Basis-R-Pipe |> (ab R 4.1) hat null Paketabhängigkeiten und keinerlei Laufzeit-Overhead.',
      'Das Verketten von Transformationsschritten erleichtert Code-Reviews in Teams erheblich.',
    ],
  },
  joins: {
    title: '15. Tabellen verknüpfen (Joins)',
    brief: 'Verbinde Tabellen über gemeinsame Schlüssel: Führe einen Left Join mit merge(all.x = TRUE) durch.',
    hint: 'Verwende report <- merge(users, orders, by = "user_id", all.x = TRUE).',
    lesson: `### Kapitel 15 — Joins und Tabellenverknüpfung

Tabellen werden mit \`merge()\` verbunden:
- **Left Join**: Mit \`all.x = TRUE\` bleiben alle Zeilen der ersten Tabelle erhalten; fehlende Werte in Tabelle 2 werden mit \`NA\` aufgefüllt.
- **Inner Join**: Standardeinstellung von \`merge()\`, die nur übereinstimmende Zeilen beider Tabellen behält.`,
    checksLabels: [
      'report enthält 3 Zeilen',
      'Benutzer Ali wird korrekt der Bestellung zugeordnet',
      'Benutzer ohne Bestellung erhält NA in total',
    ],
    learning: [
      'merge() verknüpft zwei Tabellen anhand gemeinsamer Schlüsselspalten',
      'all.x = TRUE implementiert einen vollständigen Left Outer Join',
      'Fehlende Zuordnungen werden automatisch mit NA aufgefüllt',
    ],
    fieldNotes: [
      'Dimensionale Datenmodelle basieren auf Left Joins zwischen Faktentabellen und Stammdaten.',
      'Prüfe vor jedem Join, ob die Schlüsselspalten identische Datentypen besitzen.',
    ],
  },
  datetime: {
    title: '16. Datums- und Zeitwerte',
    brief: 'Konvertiere Datumsstrings mit as.Date() und berechne days_between als numerische Differenz.',
    hint: 'Wandle mit as.Date("YYYY-MM-DD") um und subtrahiere: as.numeric(end_date - start_date).',
    lesson: `### Kapitel 16 — Datum und Zeit in R

In R repräsentiert die Klasse \`Date\` Kalendertage und \`POSIXct\` exakte Zeitstempel mit Uhrzeit.
Die Subtraktion zweier Date-Objekte berechnet automatisch die Zeitdifferenz in Tagen.`,
    checksLabels: [
      'start_date und end_date sind Date-Objekte',
      'days_between beträgt 14',
    ],
    learning: [
      'as.Date() parst Datumsstrings in native Kalenderobjekte',
      'Datumsarithmetik liefert Differenzen in Tagen',
      'Kalenderfunktionen berücksichtigen Schaltjahre und Monatslängen automatisch',
    ],
    fieldNotes: [
      'Gib stets explizite Formatstrings (z.B. "%Y-%m-%d") an, um sprachabhängige Parsing-Fehler zu vermeiden.',
      'In Unternehmensdatenbanken werden Zeitstempel standardmäßig in UTC gespeichert.',
    ],
  },
  'data-table': {
    title: '17. Schnelle Gruppenaggregation',
    brief: 'Aggregiere Werte nach Gruppen: Berechne mit aggregate() die Summe von amount nach dept in dept_totals.',
    hint: 'Verwende dept_totals <- aggregate(amount ~ dept, data = transactions, FUN = sum).',
    lesson: `### Kapitel 17 — Gruppenaggregation

Mit \`aggregate(formula, data, FUN)\` werden numerische Spalten nach Kategorien gruppiert und Aggregationsfunktionen wie \`sum\` oder \`mean\` pro Gruppe berechnet.`,
    checksLabels: [
      'dept_totals ist ein Data Frame',
      'Gesamtsumme für IT beträgt 850',
      'Gesamtsumme für HR beträgt 350',
    ],
    learning: [
      'aggregate() berechnet statistische Metriken gruppiert nach Faktoren',
      'Die Formelsyntax y ~ group definiert Ziel- und Gruppierungsvariablen',
      'FUN bestimmt die Aggregationsfunktion (sum, mean, length)',
    ],
    fieldNotes: [
      'Gruppenaggregationen bilden den Kern von KPI-Dashboards und Feature-Engineering.',
      'Für Tabellen mit Millionen Zeilen bietet data.table unschlagbare Geschwindigkeit und Effizienz.',
    ],
  },
  'outliers-plots': {
    title: '18. Ausreißer & Basis-Grafiken',
    brief: 'Erkenne Ausreißer und visualisiere Verteilungen: Berechne iqr_val mit IQR() und zeichne boxplot(vals).',
    hint: 'Gib iqr_val <- IQR(vals) und boxplot(vals, col = "#2569bb", main = "Distribution") ein.',
    lesson: `### Kapitel 18 — Ausreißer und Boxplots

- **Interquartilsabstand (\`IQR\`):** Differenz zwischen 75. und 25. Perzentil.
- **Boxplot (\`boxplot\`):** Visualisiert Median, Quartile und statistische Ausreißer (jenseits von 1.5 * IQR).`,
    checksLabels: [
      'iqr_val wurde korrekt berechnet',
      'Boxplot wurde auf dem Canvas gezeichnet',
    ],
    learning: [
      'IQR() berechnet den Interquartilsabstand zur Streuungsanalyse',
      'boxplot() hebt Median, Quartilsgrenzen und Ausreißer visualisierend hervor',
      'Basis-R-Grafiken benötigen keine Zusatzpakete und rendern blitzschnell',
    ],
    fieldNotes: [
      'Ausreißer-Erkennung ist der erste Schritt der explorativen Datenanalyse (EDA).',
      'Automatisierte Überwachungssysteme erstellen Boxplots zur Erkennung von Data Drift in Pipelines.',
    ],
  },
  capstone: {
    title: '19. Abschlussprojekt: End-to-End Pipeline',
    brief: 'Eine vollständige Daten-Pipeline: Gültige Daten filtern (score > 0), Mittelwerte aggregieren und als barplot darstellen.',
    hint: 'Führe valid <- subset(project_data, score > 0), group_means <- aggregate(score ~ group, data = valid, FUN = mean) und barplot(group_means$score, names.arg = group_means$group, col = "#2569bb") aus.',
    lesson: `### Kapitel 19 — End-to-End Datenpipeline

In diesem Abschlussprojekt verbindest du alle erlernten Fähigkeiten zu einer vollständigen Pipeline:
1. Bereinigung unvollständiger Zeilen mit \`subset()\`
2. Gruppenaggregation mit \`aggregate()\`
3. Visuelle Präsentation mit \`barplot()\` auf dem Grafik-Canvas`,
    checksLabels: [
      'valid enthält 4 Zeilen mit positiver Punktzahl',
      'group_means berechnet den Mittelwert pro Gruppe',
      'Balkendiagramm wurde erfolgreich gezeichnet',
    ],
    learning: [
      'Vollständiger Workflow: Bereinigung, Aggregation und Visualisierung in einer Pipeline',
      'Verknüpfung von relationalen Filtern, mathematischen Aggregaten und Grafiken',
      'Ganzheitliches Verständnis moderner Datenverarbeitung in R',
    ],
    fieldNotes: [
      'In Unternehmen wird dieser Ablauf in Quarto / R Markdown Dokumenten oder interaktiven Shiny Dashboards gebündelt.',
      'Saubere Pipelines transformieren Rohdaten automatisiert in aussagekräftige visuelle Berichte.',
    ],
  },
};

export const EN_LEVELS: Record<string, Partial<LocalizedLevelData>> = {
  hello: {
    lesson: `### Chapter 1 — Introduction & Hello, R

R is one of the most popular programming languages for data science, statistical computing, and scientific data visualization.

In the interactive R console, any entered expression is evaluated immediately, and the result is printed to the screen:

\`\`\`r
print("Hello, R!")
\`\`\`

Press **Enter** or **Ctrl + Enter** to execute your code.`,
  },
  rstudio: {
    lesson: `### Chapter 2 — RStudio & the Workspace

RStudio is the premier integrated development environment (IDE) for R.
- **Ctrl + Enter**: Run the current line in the console
- **Alt + -**: Automatically insert the assignment operator \`<-\`
- **\`ls()\`**: Returns the names of all active variables and objects residing in the global environment (.GlobalEnv) as a character vector.`,
  },
  numbers: {
    lesson: `### Chapter 3 — Math Operations & Variables

Beyond standard addition and multiplication, R provides specialized arithmetic operators:
- **Integer division (\`%/%\`)**: Discards remainder (\`17 %/% 5\` is 3)
- **Modulo (\`%%\`)**: Computes remainder (\`17 %% 5\` is 2)
- **Power (\`^\`)**: Raises a number to an exponent (\`2^4\` is 16)
- **Assignment (\`<-\`)**: Standard symbol for variable assignment`,
  },
  vectors: {
    lesson: `### Chapter 4 — Vectors & Matrices

Vectors are the fundamental building block in R, created with the \`c()\` combine function.
Matrices are two-dimensional, homogeneous arrays instantiated using \`matrix()\`:

\`\`\`r
mat <- matrix(1:6, nrow = 2, ncol = 3, byrow = TRUE)
\`\`\`

Matrix indexing uses the \`mat[row, col]\` notation starting at index 1.`,
  },
  'data-structures': {
    lesson: `### Chapter 5 — Factors, Data Frames & Lists

- **Factor**: Encodes categorical variables with discrete levels (\`factor()\`).
- **List**: Heterogeneous container storing objects of different types and varying lengths.
- **Data Frame (\`data.frame\`)**: 2D tabular dataset where each column is an equal-length vector with its own type.`,
  },
  'control-flow': {
    lesson: `### Chapter 6 — Control Flow & Vectorization

In R, the vectorized function \`ifelse(test, yes, no)\` evaluates conditions across every element of a vector simultaneously:

\`\`\`r
status <- ifelse(scores >= 50, "pass", "fail")
\`\`\`

Vectorized branching is vastly faster than traditional iterative for-loops.`,
  },
  functions: {
    lesson: `### Chapter 7 — Custom Functions & Apply

Functions are defined with the \`function\` keyword and return the value of the last evaluated expression:

\`\`\`r
cube <- function(x) x^3
\`\`\`

The \`apply\` family (\`sapply\`, \`lapply\`) maps a function across elements of a vector or list without manual loops.`,
  },
  'import-flat': {
    lesson: `### Chapter 8 — Flat Files & CSV Import

Delimited text files (CSV, TSV) are the most common formats for data exchange.
The \`read.csv()\` function parses comma-delimited text into a structured \`data.frame\`.`,
  },
  'import-excel': {
    lesson: `### Chapter 9 — Inspecting Tabular Data

After importing tabular data, standard functions provide immediate inspection:
- \`nrow()\` / \`ncol()\`: Dimensions of rows and columns
- \`mean()\`: Arithmetic average of numeric vectors
- \`summary()\`: Descriptive 5-number statistics and distributions`,
  },
  'import-db': {
    lesson: `### Chapter 10 — Relational Queries & DB Logic

Filtering records according to logical criteria directly matches the SQL WHERE clause.
In R, the \`subset()\` function filters rows matching compound boolean conditions (\`&\` for AND, \`|\` for OR).`,
  },
  'import-web': {
    lesson: `### Chapter 11 — Web Data & JSON Records

Web services and REST APIs deliver hierarchical records in JSON format.
Vectorized extraction across nested lists allows pulling specific attributes into clean tabular structures.`,
  },
  'tidy-data': {
    lesson: `### Chapter 12 — Tidy Data & Missing Values

In Tidy Data:
- Missing observations are represented by the special value \`NA\`.
- Never use \`x == NA\`; always use \`is.na(x)\` to test for missingness.
- The \`na.omit(df)\` function strips all incomplete rows from a dataset.`,
  },
  'strings-regex': {
    lesson: `### Chapter 13 — Strings & Regular Expressions

For text cleaning and pattern matching in R:
- \`gsub(pattern, replacement, x)\`: Replace all occurrences of a regular expression pattern
- \`grepl(pattern, x)\`: Test whether a pattern matches
- \`paste()\`: Concatenate strings and vectors`,
  },
  dplyr: {
    lesson: `### Chapter 14 — Data Wrangling & Pipelines

The native pipe operator (\`|>\`):
Passes the left-hand result into the first argument of the right-hand function.
This creates clean, linear, readable data transformation pipelines without deeply nested parentheses.`,
  },
  joins: {
    lesson: `### Chapter 15 — Merging & Relational Joins

Combining tables is done with the \`merge()\` function:
- **Left Join**: Setting \`all.x = TRUE\` preserves all rows of the left table and inserts \`NA\` for unmatched rows in the right table.
- **Inner Join**: Default setting of \`merge()\` that keeps only rows present in both tables.`,
  },
  datetime: {
    lesson: `### Chapter 16 — Dates & Times in R

In R, the \`Date\` class handles calendar dates, while \`POSIXct\` stores timestamps with hours and seconds.
Subtracting two Date objects automatically yields the duration in days (\`difftime\`).`,
  },
  'data-table': {
    lesson: `### Chapter 17 — Group Aggregation

The \`aggregate(formula, data, FUN)\` function groups numeric data by categorical factors and computes summary statistics (such as sum or mean) for each group.`,
  },
  'outliers-plots': {
    lesson: `### Chapter 18 — Outliers & Base Plots

- **Interquartile Range (\`IQR\`):** Difference between the 75th and 25th percentiles.
- **Boxplot (\`boxplot\`):** Visualizes the median, quartiles, and statistical outliers (points beyond 1.5 * IQR).`,
  },
  capstone: {
    lesson: `### Chapter 19 — Capstone: End-to-End Data Pipeline

In this final project, you integrate the entire curriculum:
1. Filter incomplete records with \`subset()\`
2. Compute summary group averages with \`aggregate()\`
3. Render a clean bar chart on the graphic canvas with \`barplot()\``,
  },
};

FA_LEVELS['appendix'] = FA_LEVELS['capstone'];
DE_LEVELS['appendix'] = DE_LEVELS['capstone'];
EN_LEVELS['appendix'] = EN_LEVELS['capstone'];

export function localizeLevel(level: LevelDef, locale: Locale): LevelDef {
  if (locale === 'en') {
    const enLesson = EN_LEVELS[level.id]?.lesson;
    if (enLesson) {
      return {
        ...level,
        lesson: enLesson,
      };
    }
    return level;
  }

  const dictionary = locale === 'fa' ? FA_LEVELS : locale === 'de' ? DE_LEVELS : null;
  const copy = dictionary ? dictionary[level.id] : null;
  if (!copy) {
    return level;
  }

  const checks = level.checks.map((chk, i) => ({
    ...chk,
    label: copy.checksLabels && copy.checksLabels[i] ? copy.checksLabels[i] : chk.label,
  }));

  return {
    ...level,
    title: copy.title || level.title,
    brief: copy.brief || level.brief,
    hint: copy.hint || level.hint,
    lesson: copy.lesson || level.lesson,
    learning: copy.learning || level.learning,
    fieldNotes: copy.fieldNotes || level.fieldNotes,
    checks,
  };
}

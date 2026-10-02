import type { UiStrings } from './types';

export const fa: UiStrings = {
  brand: 'آموزش',
  brandTagline: 'R',
  language: 'زبان',
  menuLabel: 'منوی ناوبری',
  levels: 'مراحل',
  lesson: 'درسنامه',
  lessonTitle: 'مطالعه توضیحات مفهومی این مرحله',
  guide: 'راهنما',
  guidePanel: 'پنل اهداف و بررسی وضعیت',
  hint: 'راهنمایی',
  solution: 'پاسخ',
  undo: 'بازگشت',
  reset: 'شروع مجدد',
  sandbox: 'سندباکس',
  sandboxBtn: 'سندباکس',
  sandboxTitle: 'حالت سندباکس',
  help: 'راهنما',
  uiGuideTitle: 'کلیدهای میانبر و راهنمای دستورات',
  visitorsTitle: 'تعداد افراد یکتایی که در این سامانه R را تمرین کرده‌اند',
  githubTitle: 'مخزن گیت‌هاب',
  support: 'Buy me a coffee',
  supportTitle: 'حمایت از پروژه',

  tabEnv: 'محیط اشیاء (Environment)',
  tabPlot: 'بوم نمودار (Plot)',
  envEmpty: 'محیط خالی است. با انتساب <- در ترمینال یا ادیتور متغیر بسازید.',
  plotEmpty: 'هنوز نموداری رسم نشده است. با دستور plot() نمودار بکشید.',
  colName: 'نام شیء',
  colClass: 'کلاس / نوع',
  colPreview: 'پیش‌نمایش مقدار',

  termPrompt: 'R >',
  termAriaLabel: 'خط فرمان تعاملی زبان R',
  editorOpen: 'ویرایشگر اسکریپت',
  editorClose: 'بستن ویرایشگر',
  runBtn: 'اجرا',
  runKeyHint: 'Ctrl / Cmd + Enter',

  targetHeading: 'هدف مرحله',
  checksHeading: 'معیارهای صحت‌سنجی',
  difficultyLabel: 'درجه سختی',
  parLabel: 'هدف گلف (Par)',
  strokesLabel: 'تعداد ضربات',
  hintLabel: 'نکته راهنما',
  nextLevel: 'مرحله بعد',
  replayLevel: 'اجرای مجدد',

  welcomeTitle: 'LearnR',
  welcomeIntro: 'آموزش تعاملی **زبان برنامه‌نویسی R** — سندباکس + مراحل هدایت‌شده.',
  welcomeBoard:
    'بورد وضعیت **اشیای محیط (Environment)** و **بوم رسم نمودار (Plot)** را نشان می‌دهد. این جریان داده و تصویر است که R مدیریت می‌کند.',
  welcomeTracks:
    '- مبانی: بردارها، انواع داده و اندیس‌گذاری (`c()`, `[]`)\n- ساختار داده: دیتافریم‌ها و ماتریس‌ها (`data.frame()`, `matrix()`)\n- توابع و کنترل جریان: `function()`, `apply()`, شروط و حلقه‌ها\n- گرافیک و تصویرسازی: `plot()`, `hist()`, `barplot()`, تنظیمات `par()`',
  welcomeMeta:
    'فرمان‌های کمکی: `levels`, `lesson`, `hint`, `solution`, `undo`, `reset`, `sandbox`.',
  welcomeLevelsCount: (n: number) =>
    `**${n}** مرحله گنجانده شده است. برای شروع مراحل را باز کنید، یا در سندباکس بمانید.`,
  welcomeWhat: '**LearnR چیست؟**',
  welcomeWhatBody:
    'یک آزمایشگاه تعاملی مرورگری برای زبان R بر بستر WebR (وب‌اسمبلی): کدهای واقعی R تایپ می‌کنید و بلافاصله ساخته شدن متغیرها، ماتریس‌ها و نمودارهای گرافیکی را می‌بینید، بدون نیاز به نصب هرگونه نرم‌افزار.',
  welcomePublisher: '**ناشر**',
  welcomePublisherBody:
    'انتشار و نگهداری توسط **Ali Sadeghi Aghili** — برنامه‌نویس، مهندس/دانشمند داده، مهندس ML. [linktr.ee/aliaghili](https://linktr.ee/aliaghili)',
  welcomeGithub: '- [GitHub — سورس و ایشو](https://github.com/alisadeghiaghili/learn-r)',
  welcomeCoffee: 'Buy Me a Coffee (از ناشر حمایت می‌کند):',
  welcomeToolbar:
    'نوار ابزار: **درس** (تکرار مقدمه مرحله) · **GitHub** · **Buy me a coffee**.',
  openLevels: 'باز کردن مرحله‌ها',
  levelClearTitle: 'مرحله با موفقیت حل شد!',
  foundationsComplete: 'دوره بنیادین کامل شد! زمین بازی آزاد برای آزمایش‌های شما در دسترس است.',
  closeBtn: 'بستن',
};

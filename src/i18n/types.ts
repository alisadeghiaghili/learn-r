export type Locale = 'en' | 'fa';

export interface UiStrings {
  brand: string;
  brandTagline: string;
  language: string;
  menuLabel: string;
  levels: string;
  lesson: string;
  lessonTitle: string;
  guide: string;
  guidePanel: string;
  hint: string;
  solution: string;
  undo: string;
  reset: string;
  sandbox: string;
  sandboxBtn: string;
  sandboxTitle: string;
  help: string;
  uiGuideTitle: string;
  visitorsTitle: string;
  githubTitle: string;
  support: string;
  supportTitle: string;

  // Board & Visualizer
  tabEnv: string;
  tabPlot: string;
  envEmpty: string;
  plotEmpty: string;
  colName: string;
  colClass: string;
  colPreview: string;

  // Terminal
  termPrompt: string;
  termAriaLabel: string;
  editorOpen: string;
  editorClose: string;
  runBtn: string;
  runKeyHint: string;

  // Dock / Guide
  targetHeading: string;
  checksHeading: string;
  difficultyLabel: string;
  parLabel: string;
  strokesLabel: string;
  hintLabel: string;
  nextLevel: string;
  replayLevel: string;

  // Dialogs & Modals
  welcomeTitle: string;
  welcomeIntro: string;
  welcomeBoard: string;
  welcomeTracks: string;
  welcomeMeta: string;
  welcomeLevelsCount: (count: number) => string;
  welcomeWhat: string;
  welcomeWhatBody: string;
  welcomePublisher: string;
  welcomePublisherBody: string;
  welcomeGithub: string;
  welcomeCoffee: string;
  welcomeToolbar: string;
  openLevels: string;
  levelsTitle: string;
  pickChallenge: string;
  howToRead: string;
  difficultyLegend: string;
  idealLegend: string;
  solvedLegend: string;
  difficultyOf: (n: number) => string;
  solvedLabel: string;
  levelClearTitle: string;
  foundationsComplete: string;
  closeBtn: string;
}

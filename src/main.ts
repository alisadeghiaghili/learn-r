import './style.css';
import { App } from './ui/app';
import { initLocale, applyDocumentLocale } from './i18n';

initLocale();
applyDocumentLocale();

const root = document.querySelector<HTMLElement>('#app');
if (!root) throw new Error('#app root element missing');

const app = new App(root);
void app.init();

// Expose on window for interactive debugging
(window as unknown as { learnRApp: App }).learnRApp = app;

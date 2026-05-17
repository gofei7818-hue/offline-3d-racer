import { Game } from './core/Game';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App root #app was not found.');
}

const game = new Game(app);
game.start();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').catch((error) => {
      console.warn('Service worker registration failed:', error);
    });
  });
}

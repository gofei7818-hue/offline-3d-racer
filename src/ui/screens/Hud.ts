export class Hud {
  readonly element: HTMLDivElement;

  constructor(host: HTMLElement) {
    this.element = document.createElement('div');
    this.element.className = 'hud';
    this.element.innerHTML = `
      <div class="pill" data-hud="speed">速度：0 km/h</div>
      <div class="pill" data-hud="lap">圈数：0/3</div>
      <div class="pill" data-hud="time">时间：00:00.000</div>
    `;
    host.appendChild(this.element);
  }

  update(speedKmh: number, lap: number, timeSeconds: number): void {
    const speed = this.element.querySelector('[data-hud="speed"]');
    const lapEl = this.element.querySelector('[data-hud="lap"]');
    const time = this.element.querySelector('[data-hud="time"]');
    if (speed) speed.textContent = `速度：${Math.round(speedKmh)} km/h`;
    if (lapEl) lapEl.textContent = `圈数：${lap}/3`;
    if (time) time.textContent = `时间：${timeSeconds.toFixed(2)}s`;
  }
}

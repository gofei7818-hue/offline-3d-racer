export class RotateNotice {
  readonly element: HTMLDivElement;

  constructor(host: HTMLElement) {
    this.element = document.createElement('div');
    this.element.className = 'rotate-notice';
    this.element.innerHTML = `
      <section class="card">
        <h2>请横屏游玩</h2>
        <p>离线 3D 赛车将以手机横屏作为主要体验。</p>
      </section>
    `;
    host.appendChild(this.element);
  }
}

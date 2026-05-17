export class MainMenu {
  readonly element: HTMLDivElement;
  private startHandler: (() => void) | null = null;

  constructor(host: HTMLElement) {
    this.element = document.createElement('div');
    this.element.className = 'screen';
    this.element.innerHTML = `
      <section class="card">
        <h1>离线 3D 赛车</h1>
        <p>Phase 0：项目骨架已创建。Phase 1 将加入最小可玩赛车原型。</p>
        <button class="primary-button" type="button">开始预览</button>
      </section>
    `;
    host.appendChild(this.element);
    this.element.querySelector('button')?.addEventListener('click', () => this.startHandler?.());
  }

  onStart(handler: () => void): void {
    this.startHandler = handler;
  }

  setVisible(visible: boolean): void {
    this.element.style.display = visible ? 'grid' : 'none';
  }
}

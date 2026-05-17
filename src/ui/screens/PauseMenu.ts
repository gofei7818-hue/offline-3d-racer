export class PauseMenu {
  readonly element: HTMLDivElement;

  constructor(host: HTMLElement) {
    this.element = document.createElement('div');
    this.element.className = 'screen';
    this.element.style.display = 'none';
    this.element.innerHTML = `
      <section class="card">
        <h2>已暂停</h2>
        <p>按 P 继续，按 R 重新开始。</p>
      </section>
    `;
    host.appendChild(this.element);
  }

  setVisible(visible: boolean): void {
    this.element.style.display = visible ? 'grid' : 'none';
  }
}

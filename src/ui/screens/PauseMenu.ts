export class PauseMenu {
  readonly element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'screen';
    this.element.style.display = 'none';
    this.element.innerHTML = `
      <section class="card">
        <h2>暂停</h2>
        <p>暂停菜单将在后续阶段接入完整比赛流程。</p>
      </section>
    `;
  }
}

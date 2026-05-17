export class SettingsMenu {
  readonly element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'screen';
    this.element.style.display = 'none';
    this.element.innerHTML = `
      <section class="card">
        <h2>设置</h2>
        <p>声音、画质和控制设置将在后续阶段接入。</p>
      </section>
    `;
  }
}

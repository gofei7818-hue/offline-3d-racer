export class RaceResult {
  readonly element: HTMLDivElement;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'screen';
    this.element.style.display = 'none';
    this.element.innerHTML = `
      <section class="card">
        <h2>比赛结果</h2>
        <p>成绩统计将在 Phase 3 接入。</p>
      </section>
    `;
  }
}

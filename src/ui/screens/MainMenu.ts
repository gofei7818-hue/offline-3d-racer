export interface MainMenuSettings {
  muted: boolean;
  volume: number;
  controlMode: 'buttons' | 'joystick';
  steeringSensitivity: number;
}

export class MainMenu {
  readonly element: HTMLDivElement;
  private startHandler: (() => void) | null = null;
  private settingsHandler: ((settings: MainMenuSettings) => void) | null = null;

  constructor(host: HTMLElement) {
    this.element = document.createElement('div');
    this.element.className = 'screen';
    this.element.innerHTML = `
      <section class="card">
        <h1>离线 3D 赛车</h1>
        <p>Phase 2A：声音、操控和赛道表现升级。</p>
        <label>音量 <input data-setting="volume" type="range" min="0" max="1" step="0.05" value="0.8"></label>
        <label><input data-setting="muted" type="checkbox"> 静音</label>
        <label>操控模式
          <select data-setting="controlMode"><option value="buttons">按钮</option><option value="joystick">摇杆(基础)</option></select>
        </label>
        <label>转向灵敏度 <input data-setting="sensitivity" type="range" min="0.5" max="1.6" step="0.05" value="1"></label>
        <button class="primary-button" type="button">开始比赛</button>
      </section>
    `;
    host.appendChild(this.element);
    this.element.querySelector('button')?.addEventListener('click', () => this.startHandler?.());
    this.element.addEventListener('input', () => this.emitSettings());
    this.element.addEventListener('change', () => this.emitSettings());
  }

  setInitialSettings(settings: MainMenuSettings): void {
    (this.element.querySelector('[data-setting="volume"]') as HTMLInputElement).value = String(settings.volume);
    (this.element.querySelector('[data-setting="muted"]') as HTMLInputElement).checked = settings.muted;
    (this.element.querySelector('[data-setting="controlMode"]') as HTMLSelectElement).value = settings.controlMode;
    (this.element.querySelector('[data-setting="sensitivity"]') as HTMLInputElement).value = String(settings.steeringSensitivity);
  }
  onStart(handler: () => void): void { this.startHandler = handler; }
  onSettingsChange(handler: (settings: MainMenuSettings) => void): void { this.settingsHandler = handler; }
  setVisible(visible: boolean): void { this.element.style.display = visible ? 'grid' : 'none'; }

  private emitSettings(): void {
    this.settingsHandler?.({
      volume: Number((this.element.querySelector('[data-setting="volume"]') as HTMLInputElement).value),
      muted: (this.element.querySelector('[data-setting="muted"]') as HTMLInputElement).checked,
      controlMode: (this.element.querySelector('[data-setting="controlMode"]') as HTMLSelectElement).value as 'buttons' | 'joystick',
      steeringSensitivity: Number((this.element.querySelector('[data-setting="sensitivity"]') as HTMLInputElement).value)
    });
  }
}

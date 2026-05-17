import { MainMenu } from './screens/MainMenu';
import { Hud } from './screens/Hud';
import { RotateNotice } from './screens/RotateNotice';

export class UIManager {
  readonly root: HTMLDivElement;
  readonly hud: Hud;
  readonly menu: MainMenu;
  readonly rotateNotice: RotateNotice;

  constructor(host: HTMLElement) {
    this.root = document.createElement('div');
    this.root.className = 'game-ui';
    host.appendChild(this.root);

    this.hud = new Hud(this.root);
    this.menu = new MainMenu(this.root);
    this.rotateNotice = new RotateNotice(this.root);
    this.mountTouchControls();
  }

  setMenuVisible(visible: boolean): void {
    this.menu.setVisible(visible);
  }

  updateHud(speedKmh: number, lap: number, timeSeconds: number): void {
    this.hud.update(speedKmh, lap, timeSeconds);
  }

  private mountTouchControls(): void {
    const controls = document.createElement('div');
    controls.className = 'touch-controls';
    controls.innerHTML = `
      <div class="control-cluster">
        <button class="control-button" data-action="left">左</button>
        <button class="control-button" data-action="right">右</button>
      </div>
      <div class="control-cluster">
        <button class="control-button" data-action="accelerate">加速</button>
        <button class="control-button" data-action="brake">刹车</button>
      </div>
    `;
    this.root.appendChild(controls);
  }

  dispose(): void {
    this.root.remove();
  }
}

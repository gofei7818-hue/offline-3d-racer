import { MainMenu } from './screens/MainMenu';
import { Hud } from './screens/Hud';
import { RotateNotice } from './screens/RotateNotice';
import { PauseMenu } from './screens/PauseMenu';

export class UIManager {
  readonly root: HTMLDivElement; readonly hud: Hud; readonly menu: MainMenu; readonly pause: PauseMenu; readonly rotateNotice: RotateNotice;
  constructor(host: HTMLElement) {
    this.root = document.createElement('div'); this.root.className = 'game-ui'; host.appendChild(this.root);
    this.hud = new Hud(this.root); this.menu = new MainMenu(this.root); this.pause = new PauseMenu(this.root); this.rotateNotice = new RotateNotice(this.root); this.mountTouchControls(); this.mountSettings();
  }
  setMenuVisible(v: boolean): void { this.menu.setVisible(v); }
  setPaused(v: boolean): void { this.pause.setVisible(v); }
  updateHud(speedKmh: number, lap: number, timeSeconds: number): void { this.hud.update(speedKmh, lap, timeSeconds); }
  private mountTouchControls(): void { const c=document.createElement('div'); c.className='touch-controls'; c.innerHTML=`<div class="control-cluster"><button class="control-button" data-action="left">◀</button><button class="control-button" data-action="right">▶</button></div><div class="control-cluster"><button class="control-button" data-action="accelerate">加速</button><button class="control-button" data-action="brake">刹车</button></div>`; this.root.appendChild(c); }
  private mountSettings(): void { const p=document.createElement('div'); p.className='settings-panel'; p.innerHTML=`<label><input type="checkbox" data-ui="mute" /> 静音</label><label>灵敏度 <input type="range" data-ui="sensitivity" min="0.6" max="1.6" value="1" step="0.1"></label><label>操控 <select data-ui="control"><option value="buttons">按钮</option><option value="joystick">摇杆(基础)</option></select></label>`; this.root.appendChild(p); }
  dispose(): void { this.root.remove(); }
}

import { MainMenu } from './screens/MainMenu';
import { Hud } from './screens/Hud';
import { RotateNotice } from './screens/RotateNotice';
import { PauseMenu } from './screens/PauseMenu';

export class UIManager {
  readonly root: HTMLDivElement; readonly hud: Hud; readonly menu: MainMenu; readonly pause: PauseMenu; readonly rotateNotice: RotateNotice;
  constructor(host: HTMLElement) { this.root = document.createElement('div'); this.root.className='game-ui'; host.appendChild(this.root); this.hud = new Hud(this.root); this.menu = new MainMenu(this.root); this.pause = new PauseMenu(this.root); this.rotateNotice = new RotateNotice(this.root); this.mountTouchControls(); this.mountUtilityControls(host); }
  setMenuVisible(v:boolean):void{this.menu.setVisible(v);} setPaused(p:boolean):void{this.pause.setVisible(p);} updateHud(s:number,l:number,t:number):void{this.hud.update(s,l,t);}
  private mountTouchControls(): void { const c=document.createElement('div'); c.className='touch-controls'; c.innerHTML=`<div class="control-cluster"><button class="control-button" data-action="left">左</button><button class="control-button" data-action="right">右</button><div class="joystick" data-joystick><div class="joystick-knob"></div></div></div><div class="control-cluster"><button class="control-button" data-action="accelerate">加速</button><button class="control-button" data-action="brake">刹车</button></div>`; this.root.appendChild(c);} 
  private mountUtilityControls(host: HTMLElement): void {
    const bar = document.createElement('div');
    bar.className = 'utility-controls';
    bar.innerHTML = `<button class="mini-button" data-utility="fullscreen">全屏</button><button class="mini-button" data-utility="reset-view">复位</button>`;
    this.root.appendChild(bar);
    const fullscreen = bar.querySelector<HTMLButtonElement>('[data-utility="fullscreen"]');
    const reset = bar.querySelector<HTMLButtonElement>('[data-utility="reset-view"]');
    fullscreen?.addEventListener('pointerdown', (event) => {
      event.preventDefault(); event.stopPropagation();
      const target = host as HTMLElement & { webkitRequestFullscreen?: () => Promise<void> | void };
      if (document.fullscreenElement) void document.exitFullscreen();
      else if (target.requestFullscreen) void target.requestFullscreen();
      else if (target.webkitRequestFullscreen) void target.webkitRequestFullscreen();
    });
    reset?.addEventListener('pointerdown', (event) => {
      event.preventDefault(); event.stopPropagation();
      window.scrollTo(0, 0);
      document.body.style.transform = 'none';
      document.documentElement.style.transform = 'none';
      window.dispatchEvent(new Event('resize'));
    });
  }
  dispose(): void { this.root.remove(); }
}

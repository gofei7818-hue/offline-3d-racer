import { InputManager } from './InputManager';

export class TouchControls {
  private readonly disposers: Array<() => void> = [];
  private mode: 'buttons' | 'joystick' = 'buttons';

  constructor(private readonly root: HTMLElement, private readonly input: InputManager) {}
  setMode(mode: 'buttons' | 'joystick'): void { this.mode = mode; this.root.dataset.controlMode = mode; }
  attach(): void {
    this.bindButton('accelerate', (a) => this.input.setThrottle(a ? 1 : 0));
    this.bindButton('brake', (a) => this.input.setBrake(a ? 1 : 0));
    this.bindButton('left', (a) => this.mode === 'buttons' && this.input.setSteer(a ? -1 : 0));
    this.bindButton('right', (a) => this.mode === 'buttons' && this.input.setSteer(a ? 1 : 0));
    this.bindJoystick();
  }
  detach(): void { this.disposers.splice(0).forEach((d) => d()); this.input.reset(); }
  private bindJoystick(): void {
    const stick = this.root.querySelector<HTMLDivElement>('[data-joystick]');
    if (!stick) return;
    const knob = stick.querySelector<HTMLDivElement>('.joystick-knob');
    if (!knob) return;
    const onMove = (e: PointerEvent) => {
      if (this.mode !== 'joystick') return;
      const rect = stick.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width * 0.45)));
      const dy = Math.max(-1, Math.min(1, (cy - e.clientY) / (rect.height * 0.45)));
      knob.style.transform = `translate(${dx * 24}px, ${-dy * 24}px)`;
      this.input.setSteer(dx);
      this.input.setThrottle(Math.max(0, dy));
    };
    const reset = () => { knob.style.transform = 'translate(0, 0)'; if (this.mode === 'joystick') { this.input.setSteer(0); this.input.setThrottle(0); } };
    stick.addEventListener('pointerdown', onMove); stick.addEventListener('pointermove', onMove);
    stick.addEventListener('pointerup', reset); stick.addEventListener('pointercancel', reset); stick.addEventListener('pointerleave', reset);
  }
  private bindButton(action: string, handler: (active: boolean) => void): void { const b = this.root.querySelector<HTMLButtonElement>(`[data-action="${action}"]`); if (!b) return; const d = (e: PointerEvent)=>{e.preventDefault(); handler(true);}; const u=(e: PointerEvent)=>{e.preventDefault(); handler(false);}; b.addEventListener('pointerdown',d); b.addEventListener('pointerup',u); b.addEventListener('pointercancel',u); b.addEventListener('pointerleave',u); this.disposers.push(()=>{b.removeEventListener('pointerdown',d);b.removeEventListener('pointerup',u);b.removeEventListener('pointercancel',u);b.removeEventListener('pointerleave',u);}); }
}

import { InputManager } from './InputManager';

export class TouchControls {
  private readonly disposers: Array<() => void> = [];
  private left = false;
  private right = false;

  constructor(private readonly root: HTMLElement, private readonly input: InputManager) {}

  attach(): void {
    this.bindButton('accelerate', (active) => this.input.setThrottle(active ? 1 : 0));
    this.bindButton('brake', (active) => this.input.setBrake(active ? 1 : 0));
    this.bindButton('left', (active) => { this.left = active; this.syncSteer(); });
    this.bindButton('right', (active) => { this.right = active; this.syncSteer(); });
  }
  private syncSteer(): void { this.input.setSteer(this.left === this.right ? 0 : this.left ? -1 : 1); }
  detach(): void { this.disposers.splice(0).forEach((d) => d()); this.input.reset(); }

  private bindButton(action: string, handler: (active: boolean) => void): void {
    const button = this.root.querySelector<HTMLButtonElement>(`[data-action="${action}"]`); if (!button) return;
    const down = (event: PointerEvent) => { event.preventDefault(); button.setPointerCapture(event.pointerId); handler(true); };
    const up = (event: PointerEvent) => { event.preventDefault(); handler(false); };
    button.addEventListener('pointerdown', down); button.addEventListener('pointerup', up); button.addEventListener('pointercancel', up); button.addEventListener('pointerleave', up);
    this.disposers.push(() => { button.removeEventListener('pointerdown', down); button.removeEventListener('pointerup', up); button.removeEventListener('pointercancel', up); button.removeEventListener('pointerleave', up); });
  }
}

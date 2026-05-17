import { InputManager } from './InputManager';

export class KeyboardControls {
  private readonly down = new Set<string>();

  constructor(private readonly input: InputManager) {}

  attach(): void {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  detach(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  private readonly onKeyDown = (event: KeyboardEvent): void => {
    this.down.add(event.code);
    this.sync();
  };

  private readonly onKeyUp = (event: KeyboardEvent): void => {
    this.down.delete(event.code);
    this.sync();
  };

  private sync(): void {
    this.input.setThrottle(this.down.has('KeyW') || this.down.has('ArrowUp') ? 1 : 0);
    this.input.setBrake(this.down.has('KeyS') || this.down.has('ArrowDown') ? 1 : 0);
    const left = this.down.has('KeyA') || this.down.has('ArrowLeft');
    const right = this.down.has('KeyD') || this.down.has('ArrowRight');
    this.input.setSteer(left === right ? 0 : left ? -1 : 1);
    this.input.setHandbrake(this.down.has('Space'));
  }
}

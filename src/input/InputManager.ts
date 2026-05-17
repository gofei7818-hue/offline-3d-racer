export interface NormalizedInput {
  throttle: number;
  brake: number;
  steer: number;
  handbrake: boolean;
}

export class InputManager {
  private input: NormalizedInput = {
    throttle: 0,
    brake: 0,
    steer: 0,
    handbrake: false
  };

  get state(): NormalizedInput {
    return { ...this.input };
  }

  setThrottle(value: number): void {
    this.input.throttle = Math.max(0, Math.min(1, value));
  }

  setBrake(value: number): void {
    this.input.brake = Math.max(0, Math.min(1, value));
  }

  setSteer(value: number): void {
    this.input.steer = Math.max(-1, Math.min(1, value));
  }

  setHandbrake(value: boolean): void {
    this.input.handbrake = value;
  }

  reset(): void {
    this.input = { throttle: 0, brake: 0, steer: 0, handbrake: false };
  }
}

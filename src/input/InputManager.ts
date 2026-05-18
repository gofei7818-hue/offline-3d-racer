export interface NormalizedInput {
  throttle: number;
  brake: number;
  steer: number;
  handbrake: boolean;
}

export class InputManager {
  private input: NormalizedInput = { throttle: 0, brake: 0, steer: 0, handbrake: false };
  private targetSteer = 0;
  private steerSensitivity = 1;

  get state(): NormalizedInput { return { ...this.input }; }
  setSteeringSensitivity(value: number): void { this.steerSensitivity = Math.max(0.5, Math.min(1.6, value)); }
  setThrottle(value: number): void { this.input.throttle = Math.max(0, Math.min(1, value)); }
  setBrake(value: number): void { this.input.brake = Math.max(0, Math.min(1, value)); }
  setSteer(value: number): void { this.targetSteer = Math.max(-1, Math.min(1, value)); }
  setHandbrake(value: boolean): void { this.input.handbrake = value; }
  tick(deltaSeconds: number): void {
    const lerp = 1 - Math.exp(-8 * deltaSeconds);
    this.input.steer += (this.targetSteer * this.steerSensitivity - this.input.steer) * lerp;
  }
  reset(): void { this.input = { throttle: 0, brake: 0, steer: 0, handbrake: false }; this.targetSteer = 0; }
}

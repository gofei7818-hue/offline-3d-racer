import { EngineSound } from './EngineSound';
import { EffectsSound } from './EffectsSound';

export class AudioManager {
  readonly engine = new EngineSound();
  readonly effects = new EffectsSound();
  private initialized = false;
  private muted = false;
  private volume = 0.8;

  async initialize(): Promise<void> {
    if (this.initialized) {
      await this.resume();
      return;
    }
    this.initialized = true;
    this.applyVolume();
    await this.resume();
  }

  async resume(): Promise<void> {
    if (!this.initialized) return;
    await this.engine.resume();
    await this.effects.resume(this.engine.context);
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    this.applyVolume();
  }

  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    this.applyVolume();
  }

  updateEngine(speedRatio: number, throttle: number): void {
    if (!this.initialized) return;
    this.engine.update(speedRatio, throttle);
  }

  playClick(): void { if (this.initialized) this.effects.click(); }
  playBrake(intensity: number): void { if (this.initialized) this.effects.brake(intensity); }
  playCollision(intensity: number): void { if (this.initialized) this.effects.collision(intensity); }

  private applyVolume(): void {
    const master = this.muted ? 0 : this.volume;
    this.engine.setVolume(master);
    this.effects.setVolume(master);
  }
}

import { EngineSound } from './EngineSound';
import { EffectsSound } from './EffectsSound';

export class AudioManager {
  private ctx?: AudioContext;
  private master?: GainNode;
  private effects?: EffectsSound;
  private readonly engine = new EngineSound();
  private muted = false;

  async initialize(): Promise<void> {
    if (!this.ctx) {
      this.ctx = new AudioContext();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.7;
      this.master.connect(this.ctx.destination);
      this.effects = new EffectsSound(this.ctx, this.master);
      this.engine.start(this.ctx, this.master);
    }
    await this.resume();
  }

  async resume(): Promise<void> { if (this.ctx && this.ctx.state !== 'running') await this.ctx.resume(); }
  setMuted(muted: boolean): void { this.muted = muted; if (this.master) this.master.gain.value = muted ? 0 : 0.7; }
  setVolume(v: number): void { if (!this.muted && this.master) this.master.gain.value = Math.max(0, Math.min(1, v)); }
  updateEngine(speedRatio: number, throttle: number): void { if (this.ctx && this.master && !this.muted) this.engine.update(this.ctx, speedRatio, throttle); }
  playClick(): void { this.effects?.click(); }
  playBrake(intensity: number): void { this.effects?.brake(intensity); }
  playCollision(): void { this.effects?.collision(); }
}

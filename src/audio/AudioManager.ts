import { EngineSound } from './EngineSound';
import { EffectsSound } from './EffectsSound';

export class AudioManager {
  readonly engine = new EngineSound();
  readonly effects = new EffectsSound();
  private initialized = false;

  async initialize(): Promise<void> {
    this.initialized = true;
  }

  updateEngine(speedRatio: number, throttle: number): void {
    if (!this.initialized) return;
    this.engine.update(speedRatio, throttle);
  }

  playClick(): void {
    if (!this.initialized) return;
    this.effects.click();
  }
}

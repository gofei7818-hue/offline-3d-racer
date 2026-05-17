export class EffectsSound {
  constructor(private readonly ctx: AudioContext, private readonly master: GainNode) {}

  private beep(freq: number, dur = 0.08, gainVal = 0.08): void {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.frequency.value = freq; osc.type = 'square';
    gain.gain.value = gainVal;
    osc.connect(gain); gain.connect(this.master);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);
    osc.stop(this.ctx.currentTime + dur);
  }
  click(): void { this.beep(820, 0.04, 0.05); }
  brake(intensity: number): void { this.beep(220 + intensity * 140, 0.05, 0.03 + intensity * 0.03); }
  collision(): void { this.beep(120, 0.14, 0.12); }
}

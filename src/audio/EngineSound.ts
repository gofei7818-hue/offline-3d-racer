export class EngineSound {
  private oscA?: OscillatorNode;
  private oscB?: OscillatorNode;
  private gain?: GainNode;

  start(ctx: AudioContext, master: GainNode): void {
    if (this.gain) return;
    this.gain = ctx.createGain();
    this.gain.gain.value = 0;
    this.gain.connect(master);
    this.oscA = ctx.createOscillator();
    this.oscA.type = 'sawtooth';
    this.oscB = ctx.createOscillator();
    this.oscB.type = 'triangle';
    this.oscA.connect(this.gain); this.oscB.connect(this.gain);
    this.oscA.start(); this.oscB.start();
  }

  update(ctx: AudioContext, speedRatio: number, throttle: number): void {
    if (!this.oscA || !this.oscB || !this.gain) return;
    const t = ctx.currentTime;
    const base = 45 + speedRatio * 180 + throttle * 65;
    this.oscA.frequency.setTargetAtTime(base, t, 0.05);
    this.oscB.frequency.setTargetAtTime(base * 2.02, t, 0.05);
    this.gain.gain.setTargetAtTime(0.06 + throttle * 0.09 + speedRatio * 0.04, t, 0.07);
  }
}

export class EngineSound {
  readonly context = new AudioContext();
  private readonly master = this.context.createGain();
  private readonly idleOsc = this.context.createOscillator();
  private readonly loadOsc = this.context.createOscillator();
  private readonly idleGain = this.context.createGain();
  private readonly loadGain = this.context.createGain();

  constructor() {
    this.master.gain.value = 0;
    this.master.connect(this.context.destination);

    this.idleOsc.type = 'sawtooth';
    this.loadOsc.type = 'square';
    this.idleOsc.frequency.value = 50;
    this.loadOsc.frequency.value = 80;

    this.idleGain.gain.value = 0.06;
    this.loadGain.gain.value = 0.01;
    this.idleOsc.connect(this.idleGain);
    this.loadOsc.connect(this.loadGain);
    this.idleGain.connect(this.master);
    this.loadGain.connect(this.master);

    this.idleOsc.start();
    this.loadOsc.start();
  }

  async resume(): Promise<void> {
    if (this.context.state !== 'running') await this.context.resume();
  }

  setVolume(volume: number): void {
    this.master.gain.setTargetAtTime(volume * 0.45, this.context.currentTime, 0.03);
  }

  update(speedRatio: number, throttle: number): void {
    const t = this.context.currentTime;
    const speed = Math.max(0, Math.min(1.25, speedRatio));
    const rpm = 45 + speed * 120 + throttle * 28;
    this.idleOsc.frequency.setTargetAtTime(rpm, t, 0.04);
    this.loadOsc.frequency.setTargetAtTime(rpm * (1.65 + throttle * 0.2), t, 0.05);
    this.loadGain.gain.setTargetAtTime(0.008 + throttle * 0.09 + speed * 0.02, t, 0.04);
  }
}

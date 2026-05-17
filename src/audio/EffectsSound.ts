export class EffectsSound {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;

  async resume(context: AudioContext): Promise<void> {
    this.context = context;
    this.master ??= context.createGain();
    this.master.connect(context.destination);
    if (context.state !== 'running') await context.resume();
  }

  setVolume(volume: number): void {
    if (!this.master || !this.context) return;
    this.master.gain.setTargetAtTime(volume * 0.9, this.context.currentTime, 0.03);
  }

  click(): void { this.beep(920, 0.03, 'square', 0.08); }
  brake(intensity: number): void { this.noise(0.06 + intensity * 0.07, 0.06 + intensity * 0.06); }
  collision(intensity: number): void { this.beep(110 + intensity * 130, 0.12, 'sawtooth', 0.18 + intensity * 0.2); }

  private beep(freq: number, duration: number, type: OscillatorType, gainAmount: number): void {
    if (!this.context || !this.master) return;
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.type = type; osc.frequency.value = freq;
    gain.gain.value = gainAmount;
    osc.connect(gain); gain.connect(this.master);
    osc.start();
    gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + duration);
    osc.stop(this.context.currentTime + duration);
  }

  private noise(duration: number, gainAmount: number): void {
    if (!this.context || !this.master) return;
    const buffer = this.context.createBuffer(1, this.context.sampleRate * duration, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const src = this.context.createBufferSource(); src.buffer = buffer;
    const gain = this.context.createGain(); gain.gain.value = gainAmount;
    src.connect(gain); gain.connect(this.master);
    src.start();
  }
}

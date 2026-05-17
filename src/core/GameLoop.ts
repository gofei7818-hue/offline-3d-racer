export type FrameCallback = (deltaSeconds: number, elapsedSeconds: number) => void;

export class GameLoop {
  private frameId = 0;
  private lastTime = 0;
  private elapsed = 0;
  private running = false;

  constructor(private readonly onFrame: FrameCallback) {}

  start(): void {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    this.frameId = requestAnimationFrame(this.tick);
  }

  stop(): void {
    this.running = false;
    cancelAnimationFrame(this.frameId);
  }

  private readonly tick = (time: number): void => {
    if (!this.running) return;
    const delta = Math.min((time - this.lastTime) / 1000, 0.05);
    this.lastTime = time;
    this.elapsed += delta;
    this.onFrame(delta, this.elapsed);
    this.frameId = requestAnimationFrame(this.tick);
  };
}

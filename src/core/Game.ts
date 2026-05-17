import { GameLoop } from './GameLoop';
import { StateMachine } from './StateMachine';
import { AssetManager } from './AssetManager';
import { Renderer } from '../render/Renderer';
import { CameraController } from '../render/CameraController';
import { Car } from '../vehicle/Car';
import { CarPhysics } from '../vehicle/CarPhysics';
import { InputManager } from '../input/InputManager';
import { KeyboardControls } from '../input/KeyboardControls';
import { TouchControls } from '../input/TouchControls';
import { AudioManager } from '../audio/AudioManager';
import { UIManager } from '../ui/UIManager';
import { SaveData } from '../storage/SaveData';
import { RACE_CONFIG } from '../config/constants';

export class Game {
  private readonly shell: HTMLElement; private readonly renderer: Renderer; private readonly cameraController: CameraController;
  private readonly state = new StateMachine(); private readonly assets = new AssetManager(); private readonly input = new InputManager();
  private readonly keyboard = new KeyboardControls(this.input); private readonly touch: TouchControls; private readonly audio = new AudioManager(); private readonly ui: UIManager;
  private readonly car = new Car(); private readonly physics = new CarPhysics(); private readonly saveData = new SaveData(); private sensitivity = 1;
  private readonly loop = new GameLoop((d,e)=>this.frame(d,e));

  constructor(host: HTMLElement) {
    this.shell = document.createElement('main'); this.shell.className = 'game-shell'; host.appendChild(this.shell);
    this.renderer = new Renderer(this.shell); this.cameraController = new CameraController(this.renderer.camera); this.ui = new UIManager(this.shell); this.touch = new TouchControls(this.ui.root, this.input);
    this.renderer.scene.add(this.car.mesh); this.car.reset(); this.saveData.load(); this.bindSettings();
    this.ui.menu.onStart(() => { void this.audio.initialize(); this.audio.playClick(); this.restartRace(); this.ui.setMenuVisible(false); this.state.transition('racing'); });
    window.addEventListener('pointerdown', this.tryResumeAudio, { passive: true });
    window.addEventListener('resize', this.handleResize); window.addEventListener('keydown', this.handleHotkeys);
  }
  async start(): Promise<void> { await this.assets.preload(); this.state.transition('menu'); this.keyboard.attach(); this.touch.attach(); this.loop.start(); }
  dispose(): void { this.loop.stop(); this.keyboard.detach(); this.touch.detach(); this.renderer.dispose(); this.ui.dispose(); window.removeEventListener('resize', this.handleResize); window.removeEventListener('keydown', this.handleHotkeys); this.shell.remove(); }

  private frame(deltaSeconds: number, elapsedSeconds: number): void {
    if (this.state.state === 'racing') {
      const input = this.input.state;
      this.input.setSteer(input.steer * this.sensitivity);
      this.physics.step(this.car, this.input.state, deltaSeconds); this.car.update(deltaSeconds);
      const speedRatio = this.car.speed / 52;
      this.audio.updateEngine(speedRatio, input.throttle);
      if (input.brake > 0.1 && this.car.speed > 5) this.audio.playBrake(input.brake);
      const r = Math.hypot(this.car.position.x, this.car.position.z);
      if (r < 30 || r > 46) { this.car.speed *= 0.96; if (r < 28 || r > 48) this.audio.playCollision(); }
    }
    this.cameraController.update(this.car.position, this.car.heading, this.car.speed);
    this.ui.updateHud(this.car.speed * 3.6, this.computeLap(), elapsedSeconds); this.renderer.render();
  }

  private bindSettings(): void {
    const mute = this.ui.root.querySelector<HTMLInputElement>('[data-ui="mute"]');
    const sens = this.ui.root.querySelector<HTMLInputElement>('[data-ui="sensitivity"]');
    mute?.addEventListener('change', ()=> this.audio.setMuted(!!mute.checked));
    sens?.addEventListener('input', ()=> this.sensitivity = Number(sens.value));
  }
  private computeLap(): number { const lap = Math.floor(Math.max(0, (38 - this.car.position.z) / 300)) + 1; return Math.min(3, lap); }
  private restartRace(): void { this.car.reset(); this.input.reset(); this.loop.reset(); }
  private readonly handleResize = (): void => this.renderer.resize();
  private readonly tryResumeAudio = (): void => { void this.audio.initialize(); };
  private readonly handleHotkeys = (event: KeyboardEvent): void => {
    if (event.code === 'KeyP') { this.state.transition(this.state.state === 'paused' ? 'racing' : 'paused'); this.ui.setPaused(this.state.state === 'paused'); this.audio.playClick(); }
    if (event.code === 'KeyR') { this.restartRace(); this.ui.setPaused(false); this.ui.setMenuVisible(false); this.state.transition('racing'); this.audio.playClick(); }
  };
}

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
import { PHYSICS_TUNING } from '../config/tuning';

export class Game {
  private readonly shell: HTMLElement; private readonly renderer: Renderer; private readonly cameraController: CameraController;
  private readonly state = new StateMachine(); private readonly assets = new AssetManager(); private readonly input = new InputManager();
  private readonly keyboard = new KeyboardControls(this.input); private readonly touch: TouchControls; private readonly audio = new AudioManager();
  private readonly ui: UIManager; private readonly car = new Car(); private readonly physics = new CarPhysics(); private readonly saveData = new SaveData();
  private readonly loop = new GameLoop((delta, elapsed) => this.frame(delta, elapsed));

  constructor(host: HTMLElement) {
    this.shell = document.createElement('main'); this.shell.className = 'game-shell'; host.appendChild(this.shell);
    this.renderer = new Renderer(this.shell); this.cameraController = new CameraController(this.renderer.camera); this.ui = new UIManager(this.shell); this.touch = new TouchControls(this.ui.root, this.input);
    this.renderer.scene.add(this.car.mesh); this.car.reset(); const save = this.saveData.load();
    this.audio.setVolume(save.volume); this.audio.setMuted(save.muted); this.touch.setMode(save.controlMode); this.input.setSteeringSensitivity(save.steeringSensitivity);
    this.ui.menu.setInitialSettings(save);
    this.ui.menu.onSettingsChange((settings) => { this.saveData.save(settings); this.audio.setMuted(settings.muted); this.audio.setVolume(settings.volume); this.touch.setMode(settings.controlMode); this.input.setSteeringSensitivity(settings.steeringSensitivity); this.audio.playClick(); void this.audio.resume(); });
    this.ui.menu.onStart(() => { void this.audio.initialize(); this.audio.playClick(); this.restartRace(); this.ui.setMenuVisible(false); this.state.transition('racing'); });
    window.addEventListener('pointerdown', () => void this.audio.initialize(), { once: true });
    window.addEventListener('resize', this.handleResize); window.addEventListener('keydown', this.handleHotkeys);
  }
  async start(): Promise<void> { await this.assets.preload(); this.state.transition('menu'); this.keyboard.attach(); this.touch.attach(); this.loop.start(); }
  dispose(): void { this.loop.stop(); this.keyboard.detach(); this.touch.detach(); this.renderer.dispose(); this.ui.dispose(); window.removeEventListener('resize', this.handleResize); window.removeEventListener('keydown', this.handleHotkeys); this.shell.remove(); }

  private frame(deltaSeconds: number, elapsedSeconds: number): void {
    this.input.tick(deltaSeconds);
    if (this.state.state === 'racing') {
      const input = this.input.state; const prev = this.car.speed;
      this.physics.step(this.car, input, deltaSeconds); this.car.update(deltaSeconds);
      this.audio.updateEngine(this.car.speed / PHYSICS_TUNING.maxSpeed, input.throttle);
      if (input.brake > 0.2 && this.car.speed > 6) this.audio.playBrake(input.brake);
      if (prev - this.car.speed > 8 * deltaSeconds) this.audio.playCollision(Math.min(1, (prev - this.car.speed) / 14));
    }
    this.cameraController.update(this.car.position, this.car.heading, this.car.speed);
    this.ui.updateHud(this.car.speed * 3.6, this.computeLap(), elapsedSeconds); this.renderer.render();
  }
  private computeLap(): number { return Math.min(3, Math.floor(Math.max(0, (12 - this.car.position.z) / 300)) + 1); }
  private restartRace(): void { this.car.reset(); this.input.reset(); this.loop.reset(); }
  private readonly handleResize = (): void => this.renderer.resize();
  private readonly handleHotkeys = (event: KeyboardEvent): void => { if (event.code === 'KeyP') { this.state.transition(this.state.state === 'racing' ? 'paused' : 'racing'); this.ui.setPaused(this.state.state === 'paused'); } if (event.code === 'KeyR') { this.restartRace(); this.ui.setPaused(false); this.ui.setMenuVisible(false); this.state.transition('racing'); } };
}

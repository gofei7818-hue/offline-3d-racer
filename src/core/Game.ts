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
  private readonly shell: HTMLDivElement;
  private readonly renderer: Renderer;
  private readonly cameraController: CameraController;
  private readonly state = new StateMachine();
  private readonly assets = new AssetManager();
  private readonly input = new InputManager();
  private readonly keyboard = new KeyboardControls(this.input);
  private readonly touch: TouchControls;
  private readonly audio = new AudioManager();
  private readonly ui: UIManager;
  private readonly car = new Car();
  private readonly physics = new CarPhysics();
  private readonly saveData = new SaveData();
  private readonly loop = new GameLoop((delta, elapsed) => this.frame(delta, elapsed));

  constructor(host: HTMLElement) {
    this.shell = document.createElement('main');
    this.shell.className = 'game-shell';
    host.appendChild(this.shell);

    this.renderer = new Renderer(this.shell);
    this.cameraController = new CameraController(this.renderer.camera);
    this.ui = new UIManager(this.shell);
    this.touch = new TouchControls(this.ui.root, this.input);

    this.renderer.scene.add(this.car.mesh);
    this.car.reset();
    this.saveData.load();

    this.ui.menu.onStart(() => {
      void this.audio.initialize();
      this.state.transition('racing');
      this.ui.setMenuVisible(false);
    });

    window.addEventListener('resize', this.handleResize);
  }

  async start(): Promise<void> {
    await this.assets.preload();
    this.state.transition('menu');
    this.keyboard.attach();
    this.touch.attach();
    this.loop.start();
  }

  dispose(): void {
    this.loop.stop();
    this.keyboard.detach();
    this.touch.detach();
    this.renderer.dispose();
    this.ui.dispose();
    window.removeEventListener('resize', this.handleResize);
    this.shell.remove();
  }

  private frame(deltaSeconds: number, elapsedSeconds: number): void {
    if (this.state.state === 'racing') {
      const input = this.input.state;
      this.physics.step(this.car, input, deltaSeconds);
      this.car.update(deltaSeconds);
      this.audio.updateEngine(this.car.speed / RACE_CONFIG.maxDevicePixelRatio, input.throttle);
    }

    this.cameraController.update(this.car.position);
    this.ui.updateHud(this.car.speed * 3.6, 0, elapsedSeconds);
    this.renderer.render();
  }

  private readonly handleResize = (): void => {
    this.renderer.resize();
  };
}

export type GameState = 'boot' | 'menu' | 'countdown' | 'racing' | 'paused' | 'finished' | 'settings';

export class StateMachine {
  private currentState: GameState = 'boot';

  get state(): GameState {
    return this.currentState;
  }

  transition(next: GameState): void {
    this.currentState = next;
  }
}

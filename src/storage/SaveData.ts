import { STORAGE_KEYS } from '../config/constants';

export type QualityLevel = 'low' | 'medium' | 'high';
export type ControlMode = 'buttons' | 'joystick';

export interface SaveDataState {
  bestLapMs: number | null;
  bestRaceMs: number | null;
  muted: boolean;
  volume: number;
  quality: QualityLevel;
  steeringSensitivity: number;
  controlMode: ControlMode;
}

const DEFAULT_SAVE: SaveDataState = {
  bestLapMs: null,
  bestRaceMs: null,
  muted: false,
  volume: 0.8,
  quality: 'medium',
  steeringSensitivity: 1,
  controlMode: 'buttons'
};
export class SaveData { /* unchanged */
  private state: SaveDataState = { ...DEFAULT_SAVE };
  load(): SaveDataState { try { const raw = localStorage.getItem(STORAGE_KEYS.saveData); if (raw) this.state = { ...DEFAULT_SAVE, ...JSON.parse(raw) }; } catch { this.state = { ...DEFAULT_SAVE }; } return this.getSnapshot(); }
  save(next: Partial<SaveDataState>): SaveDataState { this.state = { ...this.state, ...next }; localStorage.setItem(STORAGE_KEYS.saveData, JSON.stringify(this.state)); return this.getSnapshot(); }
  getSnapshot(): SaveDataState { return { ...this.state }; }
}

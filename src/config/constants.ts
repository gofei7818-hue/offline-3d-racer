export const APP_NAME = 'Offline 3D Racer';
export const APP_NAME_ZH = '离线 3D 赛车';

export const RACE_CONFIG = {
  laps: 3,
  targetFps: 60,
  minPlayableFps: 30,
  maxDevicePixelRatio: 1.75
} as const;

export const STORAGE_KEYS = {
  saveData: 'offline-3d-racer.save.v1'
} as const;

export const PHYSICS_TUNING = {
  maxSpeed: 46,
  reverseMaxSpeed: 7,
  acceleration: 30,
  brakeForce: 42,
  drag: 1.85,
  rollingResistance: 4.2,
  steeringStrength: 2.55,
  highSpeedSteerLoss: 0.58,
  handbrakeDrag: 12,
  offRoadSlowdown: 0.56
} as const;

export const CAMERA_TUNING = {
  followLerp: 0.085,
  lookAhead: 8,
  baseDistance: 17,
  speedDistance: 5,
  height: 8.2,
  fovBase: 62,
  fovBoost: 8
} as const;

export const QUALITY_PRESETS = {
  low: { pixelRatio: 1, shadows: false, sceneryDensity: 0.5 },
  medium: { pixelRatio: 1.5, shadows: true, sceneryDensity: 0.75 },
  high: { pixelRatio: 1.75, shadows: true, sceneryDensity: 1 }
} as const;

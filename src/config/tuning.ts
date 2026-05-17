export const PHYSICS_TUNING = {
  maxSpeed: 52,
  acceleration: 26,
  brakeForce: 40,
  drag: 1.8,
  steeringStrength: 2.2,
  steerLerp: 5.8,
  steerReturn: 4.5,
  highSpeedSteerDamping: 0.72,
  lateralFriction: 5,
  offRoadSlowdown: 0.55,
  cameraFollow: 0.12
} as const;

export const QUALITY_PRESETS = {
  low: { pixelRatio: 1, shadows: false, sceneryDensity: 0.5 },
  medium: { pixelRatio: 1.5, shadows: true, sceneryDensity: 0.75 },
  high: { pixelRatio: 1.75, shadows: true, sceneryDensity: 1 }
} as const;

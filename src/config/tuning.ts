export const PHYSICS_TUNING = {
  maxSpeed: 42,
  acceleration: 22,
  brakeForce: 32,
  drag: 2.2,
  steeringStrength: 1.8,
  offRoadSlowdown: 0.55
} as const;

export const QUALITY_PRESETS = {
  low: { pixelRatio: 1, shadows: false, sceneryDensity: 0.5 },
  medium: { pixelRatio: 1.5, shadows: true, sceneryDensity: 0.75 },
  high: { pixelRatio: 1.75, shadows: true, sceneryDensity: 1 }
} as const;

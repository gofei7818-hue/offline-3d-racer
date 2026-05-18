export const PHYSICS_TUNING = {
  maxSpeed: 44,
  acceleration: 20,
  brakeForce: 34,
  drag: 1.9,
  baseSteeringStrength: 2.8,
  steeringResponse: 6,
  steerAutoCenter: 4.5,
  lateralGrip: 3.5,
  highSpeedSteerLimit: 0.45,
  offRoadSlowdown: 0.55
} as const;

export const QUALITY_PRESETS = {
  low: { pixelRatio: 1, shadows: false, sceneryDensity: 0.5 },
  medium: { pixelRatio: 1.5, shadows: true, sceneryDensity: 0.75 },
  high: { pixelRatio: 1.75, shadows: true, sceneryDensity: 1 }
} as const;

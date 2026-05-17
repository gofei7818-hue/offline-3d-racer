import { PHYSICS_TUNING } from '../config/tuning';
import { Car } from './Car';

export interface DriveInput { throttle: number; brake: number; steer: number; }

export class CarPhysics {
  step(car: Car, input: DriveInput, deltaSeconds: number): void {
    const accel = input.throttle * PHYSICS_TUNING.acceleration;
    const brake = input.brake * PHYSICS_TUNING.brakeForce;
    car.speed += (accel - brake - car.speed * PHYSICS_TUNING.drag) * deltaSeconds;
    car.speed = Math.max(0, Math.min(PHYSICS_TUNING.maxSpeed, car.speed));

    const speedRatio = car.speed / PHYSICS_TUNING.maxSpeed;
    const steerLimit = 1 - speedRatio * (1 - PHYSICS_TUNING.highSpeedSteerLimit);
    const steerInput = Math.max(-steerLimit, Math.min(steerLimit, input.steer));
    const yawRate = steerInput * PHYSICS_TUNING.baseSteeringStrength * (0.45 + (1 - speedRatio));
    car.heading -= yawRate * deltaSeconds;

    car.lateralVelocity += (steerInput * car.speed * 0.35 - car.lateralVelocity * PHYSICS_TUNING.lateralGrip) * deltaSeconds;
    car.lateralVelocity *= Math.max(0, 1 - PHYSICS_TUNING.lateralGrip * 0.1 * deltaSeconds);
  }
}

import { PHYSICS_TUNING } from '../config/tuning';
import { Car } from './Car';

export interface DriveInput { throttle: number; brake: number; steer: number; }

export class CarPhysics {
  step(car: Car, input: DriveInput, deltaSeconds: number): void {
    const accel = input.throttle * PHYSICS_TUNING.acceleration;
    const brake = input.brake * PHYSICS_TUNING.brakeForce;
    const rollingDrag = PHYSICS_TUNING.drag + (input.throttle > 0 ? 0 : 0.42);
    car.speed += (accel - brake - car.speed * rollingDrag) * deltaSeconds;
    car.speed = Math.max(0, Math.min(PHYSICS_TUNING.maxSpeed, car.speed));

    const speedRatio = car.speed / PHYSICS_TUNING.maxSpeed;
    const steerLimit = 1 - speedRatio * (1 - PHYSICS_TUNING.highSpeedSteerLimit);
    const steerInput = Math.max(-steerLimit, Math.min(steerLimit, input.steer));

    // Arcade racer behavior: steering changes the car nose direction, and the
    // vehicle then moves strictly along that heading. No independent lateral
    // sliding is applied to position, so it no longer feels like a loose object
    // being dragged left/right across the screen.
    const speedAssist = 0.35 + Math.min(1, car.speed / 18) * 0.75;
    const yawRate = steerInput * PHYSICS_TUNING.baseSteeringStrength * speedAssist;
    car.heading += yawRate * deltaSeconds;

    car.lateralVelocity += (steerInput * car.speed * 0.08 - car.lateralVelocity * 5.8) * deltaSeconds;
  }
}

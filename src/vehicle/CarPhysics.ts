import { PHYSICS_TUNING } from '../config/tuning';
import { Car } from './Car';
import { DriveInput } from './types';

export class CarPhysics {
  step(car: Car, input: DriveInput, deltaSeconds: number): void {
    const accel = input.throttle * PHYSICS_TUNING.acceleration;
    const brake = input.brake * PHYSICS_TUNING.brakeForce;
    car.speed += (accel - brake - car.speed * PHYSICS_TUNING.drag) * deltaSeconds;
    car.speed = Math.max(0, Math.min(PHYSICS_TUNING.maxSpeed, car.speed));

    const steerTarget = input.steer;
    const steerRate = Math.abs(steerTarget) > 0.01 ? PHYSICS_TUNING.steerLerp : PHYSICS_TUNING.steerReturn;
    car.steer += (steerTarget - car.steer) * Math.min(1, deltaSeconds * steerRate);

    const speedRatio = car.speed / PHYSICS_TUNING.maxSpeed;
    const speedDamped = 1 - speedRatio * PHYSICS_TUNING.highSpeedSteerDamping;
    car.heading -= car.steer * PHYSICS_TUNING.steeringStrength * speedDamped * deltaSeconds;
  }
}

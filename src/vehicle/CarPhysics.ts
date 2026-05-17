import { PHYSICS_TUNING } from '../config/tuning';
import { Car } from './Car';

export interface DriveInput {
  throttle: number;
  brake: number;
  steer: number;
}

export class CarPhysics {
  step(car: Car, input: DriveInput, deltaSeconds: number): void {
    const accel = input.throttle * PHYSICS_TUNING.acceleration;
    const brake = input.brake * PHYSICS_TUNING.brakeForce;
    car.speed += (accel - brake - car.speed * PHYSICS_TUNING.drag) * deltaSeconds;
    car.speed = Math.max(0, Math.min(PHYSICS_TUNING.maxSpeed, car.speed));
    car.heading -= input.steer * PHYSICS_TUNING.steeringStrength * deltaSeconds;
  }
}

# Offline 3D Racer Roadmap

## Product goal

Build a local-first PWA 3D racing game that can run in mobile browsers, be installed to the home screen, and work offline after first load.

## Phase 0 — Project initialization

- Vite + TypeScript + Three.js foundation.
- Modular architecture.
- PWA manifest and service worker placeholders.
- Documentation and roadmap.

## Phase 1 — Minimum playable prototype

- Basic Three.js scene.
- Player car model that clearly reads as a car.
- Simple closed track.
- Third-person follow camera.
- Keyboard and touch input.
- HUD with speed, lap, and time.

## Phase 2 — Mature visual pass

- Improved low-poly car model.
- Curved track, curbs, guardrails, start line, arrows.
- Grass, trees, mountains, sky gradient, billboards.
- Camera FOV/speed feel.

## Phase 3 — Handling and race feel

- Arcade vehicle physics.
- Off-road slowdown.
- Guardrail collision.
- Drift tendency.
- Countdown, checkpoints, lap validation, race result screen.

## Phase 4 — Audio and local save

- Web Audio API engine sound.
- Brake, tire, impact, UI, and countdown effects.
- localStorage best times and settings.

## Phase 5 — PWA offline mode

- Reliable service worker caching.
- Add-to-home-screen guidance.
- Offline launch and update notes.

## Phase 6 — QA and polish

- iPhone Safari and Android Chrome landscape testing.
- Safe-area checks.
- Performance tuning.
- UI polish.
- Final deployment documentation.

# Offline 3D Racer / 离线 3D 赛车

A local-first, installable PWA 3D racing game built with Vite, TypeScript and Three.js.

本项目目标是从零开发一个可本地安装、可离线运行、手机横屏游玩的 3D 单机赛车游戏。

## Phase 0 status

This PR bootstraps the engineering foundation only. It is not the finished game.

Completed in Phase 0:

- Vite + TypeScript project scaffold.
- Three.js rendering entry point.
- Modular source structure for future game systems.
- PWA manifest and service worker placeholders.
- Basic app shell, HUD, touch-control markup, and rotate notice.
- README and roadmap for phased development.

## Commands

```bash
npm install
npm run dev
npm run typecheck
npm run build
npm run preview
```

## Static deployment

This project is intended for Netlify or GitHub Pages after `npm run build`.

Recommended Netlify settings:

- Build command: `npm run build`
- Publish directory: `dist`

## iPhone test notes

1. Open the deployed site in Safari.
2. Rotate the phone to landscape.
3. Later phases will support Add to Home Screen and offline play.

## Known Phase 0 limitations

- This phase only creates the architecture and minimal preview shell.
- The racing model, track art, camera feel, sound system, and full PWA offline validation are scheduled for later phases.
- Build validation should be performed by Codex/Netlify because this repository is being managed from mobile.

## Development phases

See [ROADMAP.md](./ROADMAP.md).

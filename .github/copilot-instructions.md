# Desktop Toolbox - AI Coding Instructions

## Architecture Overview

This is an **Electron Forge** application with a modular "toolbox" pattern—a shell app hosting multiple independent utility tools. Built with TypeScript, React 19, Redux Toolkit, and MUI.

### Process Separation

- **Main process** (`src/main/`): Node.js runtime, system access, IPC handlers
- **Renderer process** (`src/renderer/`): React UI, runs in Chromium sandbox
- **Preload script** (`src/renderer/preload.ts`): Bridges main↔renderer via `contextBridge`
- **Shared** (`src/shared/`): Type definitions shared between both processes

### IPC Communication Pattern

The app uses a strongly-typed event-driven IPC system:

1. **Define channel** in `src/shared/ipc/channels.ts`
2. **Define events** with payload types in `src/shared/ipc/events/` (separate files for main vs renderer events)
3. **Register handler** in `src/main/app/ipc/<tool>/index.ts` using switch-case on `event.event`
4. **Emit from renderer** via `windowEventEmitter.emitEvent<TypedEvent>({ channel, event, payload })`
5. **Listen in renderer** via `windowEventEmitter.handleEvent<TypedEvent>(channel, callback)`

Example flow for IconSmith tool:

- Events: `src/shared/ipc/events/image-to-icon/` (main-events.ts, renderer-events.ts)
- Handler: `src/main/app/ipc/iconsmith/index.ts`
- UI: `src/renderer/app/routes/tools/iconsmith/index.tsx`

## Adding a New Tool

1. Create route in `src/renderer/app/routes/tools/<tool-name>/index.tsx`
2. Register route in `src/renderer/app/app-router.tsx` (add to `routes` array AND router config)
3. Create Redux slice in `src/renderer/app/store/slices/<tool>.slice.ts`
4. Register slice in `src/renderer/app/store/store.ts`
5. If tool needs system access:
   - Define channel type in `src/shared/ipc/channels.ts`
   - Create event types in `src/shared/ipc/events/<tool>/`
   - Create IPC handler in `src/main/app/ipc/<tool>/index.ts`
   - Attach handler in `src/main/app/window.ts` via `attachToMainProcess()`

## Key Conventions

### Path Aliases (tsconfig.json)

- `@main/*` → `src/main/*`
- `@shared/*` → `src/shared/*`
- Renderer uses relative imports from `src/renderer/`

### State Management

- Use Redux Toolkit slices with typed hooks from `src/renderer/app/store/hooks.ts`
- Export: `useAppDispatch`, `useAppSelector`, `useAppStore`

### Styling

- MUI components with custom theme in `src/renderer/app/shared/theme.tsx`
- `FlexBox` helper component for flex layouts (`src/renderer/app/shared/components/flex-box.ts`)

### Logging (Main Process)

Use singleton logger: `ApplicationLogger.getInstance().info/error/warn()`

## Development Commands

```bash
npm start          # Dev mode with hot reload (kills existing node processes first)
npm run package    # Build for distribution
npm run lint       # ESLint
```

## Critical Notes

- **Sharp module**: Has special packaging handling for Windows x64 in main process (see `src/main/index.ts`)
- **Hash router**: Uses `createHashRouter` for Electron compatibility
- **Preload security**: All main process access goes through `window.electron.windowEventEmitter`

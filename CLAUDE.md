# Lightprint

React component library built on Radix UI + Tailwind CSS 4.

## Commands

```bash
bun install           # Install dependencies
bun run build         # Build library (vite build + tsc declarations)
bun test              # Run tests
bun run lint          # ESLint
bun run typecheck     # Type check without emit
bun run storybook     # Storybook dev server on :6006
bun run lint:package  # publint validation
bun run lint:types    # attw type validation
```

## Architecture

- `src/components/` — Components organized by category (inputs, feedback, overlay, navigation, layout, data-display, typography, hooks)
- `src/lib/utils.ts` — Core utilities (`cn()` for class merging)
- `src/styles/globals.css` — CSS variables (OKLCh colors), dark mode, Tailwind imports
- `src/index.ts` — Barrel export of all components

## Build Output

Vite library mode produces per-component and per-group bundles:
- `dist/lightprint.{es,cjs}.js` — Full bundle
- `dist/{category}/index.{es,cjs}.js` — Group bundles
- `dist/{category}/{component}.{es,cjs}.js` — Individual components
- `dist/**/*.d.ts` — TypeScript declarations (from tsconfig.build.json)

## Conventions

- Components wrap Radix UI primitives with Tailwind styling via `cva` (class-variance-authority)
- `cn()` from `src/lib/utils.ts` for conditional class merging (clsx + tailwind-merge)
- Strict TypeScript (`tsconfig.app.json`)
- Path aliases: `@/*` for src, `#category` / `#category/*` for component groups
- All Radix/consumer libs are peerDependencies (optional). Only cva, clsx, tailwind-merge are direct deps.

## Exports Alignment

When adding/modifying exports, keep these in sync:
1. `package.json` exports + imports
2. `tsconfig.app.json` paths (for IDE)
3. `tsconfig.build.json` paths (for declaration emit)
4. `vite.config.ts` entry points

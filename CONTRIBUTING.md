# Contributing to Lightprint

Thanks for your interest in contributing to Lightprint! This guide will help you get started.

## Reporting Bugs

Use the [bug report template](https://github.com/svallory/lightprint/issues/new?template=bug_report.yml) to report issues. Include:

- A clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Your environment (OS, Node version, browser)

## Suggesting Features

Use the [feature request template](https://github.com/svallory/lightprint/issues/new?template=feature_request.yml).

## Development Setup

```bash
git clone https://github.com/svallory/lightprint.git
cd lightprint
bun install
bun run build
bun test
```

### Storybook

Use Storybook for component development and visual testing:

```bash
bun run storybook
```

This starts Storybook at http://localhost:6006.

## Code Style

- TypeScript strict mode is enabled
- Run `bun run lint` before submitting a PR
- Run `bun run typecheck` to verify types

## Pull Request Process

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Make your changes
4. Follow [Conventional Commits](https://www.conventionalcommits.org/) for commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `refactor:` for code changes that neither fix bugs nor add features
   - `test:` for adding or updating tests
5. Add a changeset if your change affects the published package: `bun run changeset`
6. Open a PR against `main`
7. Ensure CI passes

## Project Structure

```
src/
  components/
    inputs/        # Buttons, checkboxes, forms, inputs, selects, etc.
    feedback/      # Alerts, badges, progress, toasts
    overlay/       # Dialogs, dropdowns, popovers, tooltips
    navigation/    # Breadcrumbs, command, pagination, sidebar, tabs
    layout/        # Cards, resizable panels, scroll areas
    data-display/  # Accordions, avatars, calendars, tables
    typography/    # Kbd
    hooks/         # Custom React hooks
  lib/
    utils.ts       # Core utilities (cn function)
  styles/
    globals.css    # CSS variables and Tailwind imports
```

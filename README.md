# Lightprint

> A comprehensive React component library built on Radix UI and Tailwind CSS 4.

[![CI](https://github.com/svallory/lightprint/actions/workflows/ci.yml/badge.svg)](https://github.com/svallory/lightprint/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/lightprint)](https://www.npmjs.com/package/lightprint)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

## Features

- 60+ accessible components built on [Radix UI](https://www.radix-ui.com/) primitives
- Styled with [Tailwind CSS 4](https://tailwindcss.com/) and [class-variance-authority](https://cva.style/)
- Dark mode support with OKLCh color space
- Tree-shakeable — import individual components or groups
- TypeScript strict mode with full type definitions
- React 19 compatible

## Installation

```bash
bun add lightprint
```

### Peer Dependencies

Lightprint requires the following peer dependencies:

```bash
bun add react react-dom @radix-ui/react-slot tailwindcss
```

See `package.json` `peerDependencies` for the full list of optional peer deps (only install what you use).

## Quick Start

Import components directly:

```tsx
import { Button } from 'lightprint'

export function App() {
  return <Button variant="default">Click me</Button>
}
```

### Styles

Import the base styles in your app entry point:

```css
@import 'lightprint/styles';
```

Or add the Lightprint CSS variables to your own stylesheet. See `src/styles/globals.css` for the full variable list.

## Usage

### Import by Category

Import component groups to keep your imports organized:

```tsx
import { Button, Input, Select } from 'lightprint/inputs'
import { Alert, Badge, Progress } from 'lightprint/feedback'
import { Dialog, Popover, Tooltip } from 'lightprint/overlay'
import { Tabs, Breadcrumb, Sidebar } from 'lightprint/navigation'
import { Card, ScrollArea, Separator } from 'lightprint/layout'
import { Table, Accordion, Calendar } from 'lightprint/data-display'
import { Kbd } from 'lightprint/typography'
import { useMobile } from 'lightprint/hooks'
```

### Import Individual Components

For maximum tree-shaking, import specific components:

```tsx
import { Button } from 'lightprint/inputs/button'
import { Card } from 'lightprint/layout/card'
```

## Component Categories

| Category | Components |
|----------|-----------|
| **Inputs** | Button, Checkbox, Field, Form, Input, InputOTP, Label, RadioGroup, Select, Slider, Switch, Textarea, Toggle, ToggleGroup |
| **Feedback** | Alert, Badge, Progress, Skeleton, Spinner, Toast, Toaster |
| **Overlay** | AlertDialog, ContextMenu, Dialog, Drawer, DropdownMenu, HoverCard, Menubar, Popover, Sheet, Tooltip |
| **Navigation** | Breadcrumb, Command, NavigationMenu, Pagination, Sidebar, Tabs |
| **Layout** | AspectRatio, Card, Item, Resizable, ScrollArea, Separator |
| **Data Display** | Accordion, Avatar, Calendar, Carousel, Chart, Collapsible, Empty, Table |
| **Typography** | Kbd |
| **Hooks** | useMobile |

## Development

```bash
# Install dependencies
bun install

# Start Storybook for component development
bun run storybook

# Build the library
bun run build

# Run tests
bun test

# Lint
bun run lint
```

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development setup and guidelines.

## License

[MIT](./LICENSE)

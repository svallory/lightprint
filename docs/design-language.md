# Lightprint Design Language

## Philosophy: Light & Ink

### The Metaphor

Lightprint's design philosophy revolves around two complementary states inspired by traditional and digital media:

**Light Mode - Printing with Ink:**
- Represents traditional print media: black ink on white/off-white paper
- Foreground elements (text, icons, borders) use dark values simulating printing ink
- Background uses light, paper-like surfaces
- Evokes clarity, readability, and the familiarity of printed materials

**Dark Mode - Light in Darkness:**
- Inverts the metaphor: bright elements shine against dark backgrounds
- Foreground elements (text, icons) use bright values simulating light or illumination
- Background uses dark surfaces creating depth and dimension
- Evokes digital displays, reduced eye strain in low-light environments, and modern interfaces

### Core Principles

1. **Semantic Color Tokens** - Colors represent purpose (primary, danger, subtle) not appearance, enabling smooth transitions between modes
2. **Consistent Contrast** - Both modes maintain WCAG AA contrast ratios minimum (4.5:1 for text, 3:1 for UI components)
3. **Intentional Inversion** - Not simply flipping colors; each mode is deliberately designed for its environmental context
4. **OKLCh Color Space** - Perceptually uniform colors ensure consistent lightness and contrast across modes

---

## Color System

### Two-Layer Architecture

Lightprint uses a two-layer color architecture that separates brand identity from mode implementation:

```mermaid
graph TD
    A[Brand Colors Layer] --> B[Mode Mapping Layer]
    B --> C[Component Styles]

    A --> A1[--ink]
    A --> A2[--beam]
    A --> A3[--surface]
    A --> A4[--abyss]
    A --> A5[Sentiment Colors]

    B --> B1[:root - Light Mode]
    B --> B2[.dark - Dark Mode]

    B1 --> B1A[--foreground: var\(--ink\)]
    B1 --> B1B[--background: var\(--surface\)]

    B2 --> B2A[--foreground: var\(--beam\)]
    B2 --> B2B[--background: var\(--abyss\)]
```

### Layer 1: Brand/Theme Colors (User Customizable)

These are the foundational colors users can customize to match their brand identity:

**Base Colors:**
- `--ink` - Dark brand color used for foreground in light mode (default: `oklch(0.12 0 0)`)
- `--beam` - Light brand color used for foreground in dark mode (default: `oklch(0.985 0 0)`)
- `--surface` - Light "paper" background for light mode (default: `oklch(0.98 0.002 90)`)
- `--abyss` - Dark background for dark mode (default: `oklch(0.145 0 0)`)

**Sentiment Colors:**
- `--danger` - Destructive actions, errors (default: `oklch(0.577 0.245 27.325)`)
- `--warning` - Caution, important notices (default: `oklch(0.828 0.189 84.429)`)
- `--success` - Positive confirmation, completion (default: `oklch(0.646 0.222 41.116)`)
- `--info` - Neutral information, tips (default: `oklch(0.6 0.118 184.704)`)
- `--subtle` - De-emphasized content (default: `oklch(0.45 0 0)` light, `oklch(0.708 0 0)` dark)
- `--prominent` - Highlighted, call-to-action elements (default: maps to primary)
- `--special` - Premium/exclusive features (default: `oklch(0.627 0.265 303.9)`)

### Layer 2: Mode-Specific Mappings

Internal variables that automatically adapt based on the current mode:

```css
:root {
  /* Base brand colors */
  --ink: oklch(0.12 0 0);
  --beam: oklch(0.985 0 0);
  --surface: oklch(0.98 0.002 90);
  --abyss: oklch(0.145 0 0);

  /* Sentiment colors */
  --danger: oklch(0.577 0.245 27.325);
  --warning: oklch(0.828 0.189 84.429);
  --success: oklch(0.646 0.222 41.116);
  --info: oklch(0.6 0.118 184.704);
  --subtle: oklch(0.45 0 0);
  --prominent: var(--ink);
  --special: oklch(0.627 0.265 303.9);

  /* Light mode mappings */
  --background: var(--surface);
  --foreground: var(--ink);
  --card: oklch(1 0 0);
  --card-foreground: var(--ink);
  --popover: oklch(1 0 0);
  --popover-foreground: var(--ink);
  --primary: var(--ink);
  --primary-foreground: var(--beam);
  --secondary: oklch(0.94 0.002 90);
  --secondary-foreground: var(--ink);
  --muted: oklch(0.94 0.002 90);
  --muted-foreground: var(--subtle);
  --accent: oklch(0.94 0.002 90);
  --accent-foreground: var(--ink);
  --border: oklch(0.88 0.002 90);
  --input: oklch(0.88 0.002 90);
  --ring: var(--ink);
}

.dark {
  /* Dark mode sentiment adjustments */
  --subtle: oklch(0.708 0 0);
  --prominent: var(--beam);

  /* Dark mode mappings */
  --background: var(--abyss);
  --foreground: var(--beam);
  --card: var(--abyss);
  --card-foreground: var(--beam);
  --popover: var(--abyss);
  --popover-foreground: var(--beam);
  --primary: var(--beam);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: var(--beam);
  --muted: oklch(0.269 0 0);
  --muted-foreground: var(--subtle);
  --accent: oklch(0.269 0 0);
  --accent-foreground: var(--beam);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
}
```

### OKLCh Color Space

Lightprint uses the OKLCh color space for all color definitions:

- **L (Lightness)**: 0-1 scale, perceptually uniform
- **C (Chroma)**: Colorfulness/saturation
- **H (Hue)**: Angle in degrees (0-360)

**Benefits:**
- Consistent perceived lightness across hues
- Predictable contrast relationships
- Better interpolation for gradients and transitions
- Modern CSS native support

---

## Component Guidelines

### Dark Mode Behavior

All components automatically adapt to dark mode through semantic color tokens. Components should:

1. **Use semantic tokens exclusively** - Never hard-code colors
2. **Maintain contrast ratios** - Ensure WCAG AA compliance in both modes
3. **Test both modes** - Verify visual appearance and accessibility
4. **Handle edge cases** - Consider images, shadows, borders, focus states

### Common Patterns

**Background Layers:**
```tsx
// Page background
<div className="bg-background text-foreground">

  // Elevated card
  <div className="bg-card text-card-foreground">
    // Content
  </div>
</div>
```

**Borders and Inputs:**
```tsx
<input className="border-input bg-background text-foreground ring-ring" />
```

**Interactive States:**
```tsx
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Action
</button>
```

**Muted Content:**
```tsx
<p className="text-muted-foreground">
  Supporting text
</p>
```

**Sentiment Colors:**
```tsx
<div className="text-danger">Error message</div>
<div className="text-warning">Warning message</div>
<div className="text-success">Success message</div>
<div className="text-info">Info message</div>
```

---

## Implementation Patterns

### For Library Users

**Basic Setup:**

1. Import styles:
```tsx
import 'lightprint/styles'
```

2. Add dark mode class to root element:
```tsx
<html className={isDark ? 'dark' : ''}>
  {/* Your app */}
</html>
```

**Customizing Brand Colors:**

Override CSS variables in your own stylesheet:

```css
:root {
  --ink: oklch(0.15 0.05 280);        /* Brand dark color */
  --beam: oklch(0.95 0.05 280);       /* Brand light color */
  --surface: oklch(0.99 0.01 280);    /* Custom light bg */
  --abyss: oklch(0.12 0.02 280);      /* Custom dark bg */

  /* Customize sentiments if needed */
  --danger: oklch(0.55 0.22 15);
  --success: oklch(0.65 0.20 140);
}
```

### For Contributors

**Adding New Components:**

1. Use only semantic color tokens from `globals.css`
2. Leverage Tailwind utilities: `bg-background`, `text-foreground`, etc.
3. Test in both light and dark modes in Storybook
4. Verify contrast ratios meet WCAG AA standards
5. Document any mode-specific considerations

**Testing Checklist:**
- [ ] Component renders correctly in light mode
- [ ] Component renders correctly in dark mode
- [ ] Contrast ratios meet WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Interactive states (hover, focus, active) work in both modes
- [ ] No hard-coded colors or mode-specific hacks
- [ ] Storybook story includes both mode examples

---

## Accessibility

### Contrast Requirements

**WCAG AA Minimum:**
- Normal text (< 18pt): 4.5:1
- Large text (≥ 18pt or 14pt bold): 3:1
- UI components and graphics: 3:1

### Testing Tools

- Chrome DevTools Contrast Checker
- Storybook a11y addon
- Manual visual inspection in both modes

---

## Migration Guide

### Updating Existing Components

If you have custom components using old color patterns:

**Before:**
```tsx
<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
```

**After:**
```tsx
<div className="bg-background text-foreground">
```

**Before:**
```tsx
<button className="bg-blue-600 dark:bg-blue-400">
```

**After:**
```tsx
<button className="bg-primary text-primary-foreground">
```

### Color Token Reference

| Old Pattern | New Token |
|-------------|-----------|
| `bg-white` / `dark:bg-gray-900` | `bg-background` |
| `text-black` / `dark:text-white` | `text-foreground` |
| `bg-gray-50` / `dark:bg-gray-800` | `bg-card` |
| `text-gray-600` / `dark:text-gray-400` | `text-muted-foreground` |
| `border-gray-200` / `dark:border-gray-700` | `border-border` |
| `bg-blue-600` / `dark:bg-blue-400` | `bg-primary` |
| `bg-red-600` | `bg-danger` |
| `bg-yellow-500` | `bg-warning` |
| `bg-green-600` | `bg-success` |

---

## Resources

- [OKLCh Color Picker](https://oklch.com/)
- [WCAG Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Tailwind CSS 4 Documentation](https://tailwindcss.com/docs)
- [Radix UI Theming](https://www.radix-ui.com/themes/docs/theme/color)

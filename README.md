# react-theme-select

Reusable React theme picker component.

## Install

```bash
pnpm add react-theme-select
```

## Usage

```tsx
import { ThemeSelect, defaultPalettes } from "react-theme-select";

const themes = Object.keys(defaultPalettes);

<ThemeSelect
  theme={theme}
  setTheme={setTheme}
  availableThemes={themes}
/>
```

This component expects CSS variables for `--background`, `--surface`, `--text`, `--border`, `--primary`, `--success`, `--warning`, `--danger`, `--info`, and optionally `--muted`.

See `examples/basic/README.md` for a full working snippet.

## Build

```bash
pnpm run build
```

The build outputs ESM to `dist/` and copies the CSS module alongside the JS output.

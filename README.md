# react-theme-select

Reusable React theme picker component.

Jump to the [theme gallery](#theme-gallery).


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

## Theme gallery

Generate screenshots with:

```bash
pnpm run screenshots
```

If Playwright browsers are missing:

```bash
pnpm exec playwright install chromium
```

<details>
  <summary>Show all themes</summary>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:12px;margin-top:12px;">
    <img src="assets/screenshots/theme-select-hacker.png" alt="Hacker theme" />
    <img src="assets/screenshots/theme-select-dark.png" alt="Dark theme" />
    <img src="assets/screenshots/theme-select-light.png" alt="Light theme" />
    <img src="assets/screenshots/theme-select-ocean.png" alt="Ocean theme" />
    <img src="assets/screenshots/theme-select-dim.png" alt="Dim theme" />
    <img src="assets/screenshots/theme-select-amoled.png" alt="Amoled theme" />
    <img src="assets/screenshots/theme-select-dracula.png" alt="Dracula theme" />
    <img src="assets/screenshots/theme-select-nord.png" alt="Nord theme" />
    <img src="assets/screenshots/theme-select-gruvbox.png" alt="Gruvbox theme" />
    <img src="assets/screenshots/theme-select-solarized-dark.png" alt="Solarized dark theme" />
    <img src="assets/screenshots/theme-select-forest.png" alt="Forest theme" />
    <img src="assets/screenshots/theme-select-sunset.png" alt="Sunset theme" />
    <img src="assets/screenshots/theme-select-cyberpunk.png" alt="Cyberpunk theme" />
    <img src="assets/screenshots/theme-select-sepia.png" alt="Sepia theme" />
    <img src="assets/screenshots/theme-select-high-contrast.png" alt="High contrast theme" />
    <img src="assets/screenshots/theme-select-runescape.png" alt="Runescape theme" />
    <img src="assets/screenshots/theme-select-runescape-stone.png" alt="Runescape stone theme" />
    <img src="assets/screenshots/theme-select-runescape-gold.png" alt="Runescape gold theme" />
    <img src="assets/screenshots/theme-select-oasis.png" alt="Oasis theme" />
    <img src="assets/screenshots/theme-select-minecraft.png" alt="Minecraft theme" />
  </div>
</details>

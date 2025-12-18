import { useMemo, useState } from "react";
import { ThemeSelect, defaultPalettes } from "react-theme-select";

const themes = Object.keys(defaultPalettes);

export default function App() {
  const [theme, setTheme] = useState("dark");
  const palette = defaultPalettes[theme] ?? defaultPalettes.dark;

  const style = useMemo(
    () =>
      ({
        "--background": palette.background,
        "--surface": palette.surface,
        "--text": palette.text,
        "--border": palette.border,
        "--primary": palette.primary,
        "--success": palette.success,
        "--warning": palette.warning,
        "--danger": palette.danger,
        "--info": palette.info,
        "--muted": palette.muted ?? palette.text,
        minHeight: "100vh",
        padding: "16px",
        boxSizing: "border-box",
        backgroundColor: "var(--background)",
      }) as React.CSSProperties,
    [palette]
  );

  return (
    <div style={style}>
      <ThemeSelect theme={theme} setTheme={setTheme} availableThemes={themes} />
    </div>
  );
}

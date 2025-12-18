import styles from "./ThemeSelect.module.css";
import { defaultPalettes, type Palette } from "./themePalettes";

export type ThemeSelectProps = {
  theme: string;
  setTheme: (theme: string) => void;
  availableThemes: string[];
  palettes?: Record<string, Palette>;
  labels?: Record<string, string>;
  className?: string;
};

export default function ThemeSelect({
  theme,
  setTheme,
  availableThemes,
  palettes,
  labels,
  className,
}: ThemeSelectProps) {
  const mergedPalettes = palettes ?? defaultPalettes;

  return (
    <div className={`${styles.container} ${className ?? ""}`.trim()}>
      <div className={styles.content}>
        <div className={styles.grid}>
          {availableThemes.map((t) => {
            const pal = mergedPalettes[t] ?? defaultPalettes.dark;
            const label = labels?.[t] ?? labelize(t);

            return (
              <button
                key={t}
                className={`${styles.card} ${theme === t ? styles.selected : ""}`}
                onClick={() => setTheme(t)}
                aria-pressed={theme === t}
                aria-label={`Apply ${label} theme`}
                type="button"
              >
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitle}>{label}</div>
                </div>
                {renderPreview(pal)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function renderPreview(p: Palette) {
  const muted = p.muted ?? p.text;

  return (
    <div className={styles.preview} style={{ background: p.background, color: p.text }}>
      <div
        className={styles.previewHeader}
        style={{ background: p.surface, borderBottom: `1px solid ${p.border}` }}
      >
        <div className={styles.previewDot} style={{ background: p.danger }} />
        <div className={styles.previewDot} style={{ background: p.warning }} />
        <div className={styles.previewDot} style={{ background: p.success }} />
      </div>
      <div
        className={styles.previewTabs}
        style={{ background: p.surface, borderBottom: `1px solid ${p.border}` }}
      >
        <div className={styles.previewTab} style={{ color: p.text }}>
          Tab
        </div>
        <div
          className={`${styles.previewTab} ${styles.previewTabSelected}`}
          style={{ color: p.text, borderBottom: `2px solid ${p.primary}` }}
        >
          Active
        </div>
        <div className={styles.previewTab} style={{ color: muted }}>
          More
        </div>
      </div>
      <div className={styles.previewBody}>
        <div
          className={styles.previewPanel}
          style={{ background: p.surface, border: `1px solid ${p.border}` }}
        >
          <div className={styles.previewText} style={{ color: p.text }}>
            Aa
          </div>
          <div className={styles.previewMuted} style={{ color: muted }}>
            Muted
          </div>
          <div className={styles.previewControls}>
            <div
              className={styles.previewInput}
              style={{ background: p.background, border: `1px solid ${p.border}` }}
            />
            <div
              className={styles.previewButton}
              style={{ background: p.primary, border: `1px solid ${p.border}` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function labelize(name: string) {
  const spaced = name.replace(/([a-z])([A-Z])/g, "$1 $2");
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

import { spawn } from "node:child_process";
import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}/`;
const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EXAMPLE_DIR = path.join(ROOT_DIR, "examples", "basic");
const DIST_INDEX = path.join(EXAMPLE_DIR, "dist", "index.html");
const OUTPUT_DIR = path.join(ROOT_DIR, "assets", "screenshots");

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url, { method: "GET" });
      if (response.ok) return;
    } catch {
      // Keep retrying until timeout.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function runCommand(command, args, options = {}) {
  const child = spawn(command, args, { stdio: "inherit", shell: false, ...options });
  return new Promise((resolve, reject) => {
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} failed with exit code ${code}`));
    });
    child.on("error", reject);
  });
}

async function ensureDependencies() {
  try {
    await access(path.join(EXAMPLE_DIR, "node_modules"));
  } catch {
    await runCommand("pnpm", ["-C", EXAMPLE_DIR, "install", "--frozen-lockfile"]);
  }
}

async function ensureBuild() {
  try {
    await access(DIST_INDEX);
    return;
  } catch {
    // dist missing: build before previewing
  }

  await runCommand("pnpm", ["-C", EXAMPLE_DIR, "build"]);
}

async function run() {
  await ensureDependencies();
  await ensureBuild();
  await mkdir(OUTPUT_DIR, { recursive: true });

  const preview = spawn(
    "pnpm",
    ["-C", EXAMPLE_DIR, "preview", "--", "--host", "localhost", "--port", String(PORT), "--strictPort"],
    { stdio: "inherit", shell: false }
  );

  const shutdown = () => {
    if (!preview.killed) preview.kill("SIGTERM");
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  try {
    await waitForServer(BASE_URL);
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    const themeButtons = page.locator('button[aria-label^="Apply "]');
    const count = await themeButtons.count();

    for (let i = 0; i < count; i += 1) {
      const button = themeButtons.nth(i);
      const label = await button.getAttribute("aria-label");
      if (!label) continue;

      const themeName = label.replace(/^Apply\s+/, "").replace(/\s+theme$/i, "");
      const fileBase = slugify(themeName);

      await button.click();
      await page.waitForTimeout(300);
      await page.screenshot({
        path: path.join(OUTPUT_DIR, `theme-select-${fileBase}.png`),
        fullPage: true,
      });
    }

    await browser.close();
  } finally {
    shutdown();
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const srcPath = resolve(process.cwd(), "src/ThemeSelect.module.css");
const destPath = resolve(process.cwd(), "dist/ThemeSelect.module.css");

await mkdir(dirname(destPath), { recursive: true });
await copyFile(srcPath, destPath);

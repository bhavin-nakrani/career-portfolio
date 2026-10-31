// Builds the site, serves it locally, and uses headless Chrome/Edge to produce:
//   public/documents/Bhavinkumar-Nakrani-Resume.pdf  (from /resume/print/)
//   public/og/default.png                           (from /og-card/)
// Run with: npm run resume   (re-run whenever resume data changes, then commit the outputs)
import { spawn, spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const PORT = 4329;
const BASE = process.env.BASE_PATH ?? "/career-portfolio";
const origin = `http://localhost:${PORT}${BASE.replace(/\/$/, "")}`;
const pdfOut = join(root, "public", "documents", "Bhavinkumar-Nakrani-Resume.pdf");
const ogOut = join(root, "public", "og", "default.png");

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    "C:/Program Files/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found) throw new Error("Chrome/Edge not found. Set CHROME_PATH to a Chromium-based browser.");
  return found;
}

function run(cmd, args) {
  const res = spawnSync(cmd, args, { cwd: root, stdio: "inherit" });
  if (res.status !== 0) throw new Error(`${cmd} ${args.join(" ")} failed`);
}

async function waitFor(url, tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url);
      if (r.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`Server did not respond at ${url}`);
}

const astro = join(root, "node_modules", "astro", "bin", "astro.mjs");
const browser = findBrowser();
const headless = ["--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars", "--run-all-compositor-stages-before-draw", "--virtual-time-budget=4000"];

console.log("› Building site…");
run(process.execPath, [astro, "build"]);

console.log("› Starting preview server…");
const server = spawn(process.execPath, [astro, "preview", "--port", String(PORT)], { cwd: root, stdio: "ignore" });

try {
  await waitFor(`${origin}/resume/print/`);
  mkdirSync(dirname(pdfOut), { recursive: true });
  mkdirSync(dirname(ogOut), { recursive: true });

  console.log("› Printing resume PDF…");
  run(browser, [...headless, "--no-pdf-header-footer", `--print-to-pdf=${pdfOut}`, `${origin}/resume/print/`]);

  console.log("› Capturing social card…");
  run(browser, [...headless, "--window-size=1200,630", `--screenshot=${ogOut}`, `${origin}/og-card/`]);

  // Keep the current build output in sync so `astro preview` shows the fresh files too.
  for (const [src, rel] of [[pdfOut, "documents/Bhavinkumar-Nakrani-Resume.pdf"], [ogOut, "og/default.png"]]) {
    const dest = join(root, "dist", rel);
    mkdirSync(dirname(dest), { recursive: true });
    copyFileSync(src, dest);
  }
  console.log(`✓ ${pdfOut}\n✓ ${ogOut}`);
} finally {
  if (process.platform === "win32") spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore" });
  else server.kill("SIGTERM");
}

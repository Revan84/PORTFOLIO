// The "matrix" page transition from the Portfolio v2 mockup, drawn on a full-screen canvas.
// "cover" fades the screen to the page background; "reveal" then wipes it away from the
// bottom up in a rain of code glyphs, leaving a short green trail.

const CELL = 16;
const GLYPHS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉ0101{}<>/;=+*";
const COVER_MS = 180;
// Reveal timing, in seconds: per-column start spread, bottom-to-top sweep, per-cell jitter,
// how long a cell shows a glyph, and how long its green trail fades.
const COLUMN_SPREAD = 0.35;
const SWEEP = 0.5;
const JITTER = 0.06;
const BAND = 0.12;
const TRAIL = 0.45;
const REVEAL_TOTAL = COLUMN_SPREAD + SWEEP + JITTER + BAND + TRAIL;

interface Palette {
  background: string;
  accent: string;
  highlight: string;
  font: string;
}

function readPalette(): Palette {
  const style = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback;
  return {
    background: read("--color-bg", "#0a0b0a"),
    accent: read("--color-accent", "#4fb07f"),
    highlight: read("--color-accent-200", "#d3f1e0"),
    font: `13px ${read("--font-mono", "monospace")}`,
  };
}

// Sizes the canvas to the viewport and returns a 2D context in CSS pixels.
function prepare(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return null;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  canvas.dataset.active = "true";
  return { context, width, height };
}

export function coverScreen(canvas: HTMLCanvasElement): Promise<void> {
  return new Promise((resolve) => {
    const prepared = prepare(canvas);
    if (!prepared) return resolve();
    const { context, width, height } = prepared;
    const { background } = readPalette();
    const start = performance.now();

    const step = (now: number) => {
      const alpha = Math.min(1, (now - start) / COVER_MS);
      context.clearRect(0, 0, width, height);
      context.globalAlpha = alpha;
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);
      context.globalAlpha = 1;
      if (alpha < 1) requestAnimationFrame(step);
      else resolve();
    };
    requestAnimationFrame(step);
  });
}

interface RevealOptions {
  // Leave the (now transparent) canvas active when done, for a caller that removes it
  // together with its own screen, so nothing shows in between.
  keepActive?: boolean;
}

export function revealScreen(
  canvas: HTMLCanvasElement,
  { keepActive = false }: RevealOptions = {},
): Promise<void> {
  return new Promise((resolve) => {
    const prepared = prepare(canvas);
    if (!prepared) return resolve();
    const { context, width, height } = prepared;
    const palette = readPalette();
    const columns = Math.ceil(width / CELL);
    const rows = Math.ceil(height / CELL);
    const columnDelay = Array.from({ length: columns }, () => Math.random() * COLUMN_SPREAD);
    const cellJitter = Float32Array.from({ length: columns * rows }, () => Math.random() * JITTER);
    const start = performance.now();

    context.font = palette.font;
    context.textBaseline = "top";
    // Cover the screen right away, so whatever this canvas replaces never leaves a gap.
    context.fillStyle = palette.background;
    context.fillRect(0, 0, width, height);

    const frame = (now: number) => {
      const elapsed = (now - start) / 1000;
      context.clearRect(0, 0, width, height);

      for (let x = 0; x < columns; x++) {
        for (let y = 0; y < rows; y++) {
          // Bottom rows go first: the wipe climbs up the screen.
          const cellStart = columnDelay[x] + ((rows - 1 - y) / rows) * SWEEP + cellJitter[x * rows + y];
          const progress = (elapsed - cellStart) / BAND;
          const px = x * CELL;
          const py = y * CELL;

          if (progress < 1) {
            // Still covered; while the band passes, the cell shows a flickering glyph.
            context.globalAlpha = 1;
            context.fillStyle = palette.background;
            context.fillRect(px, py, CELL, CELL);
            if (progress >= 0) {
              context.fillStyle = progress < 0.5 ? palette.highlight : palette.accent;
              context.fillText(GLYPHS[Math.floor(Math.random() * GLYPHS.length)], px + 3, py + 2);
            }
          } else {
            // Revealed; a small green square fades out where the glyph was.
            const trail = 1 - (elapsed - cellStart - BAND) / TRAIL;
            if (trail > 0) {
              context.globalAlpha = trail * 0.6;
              context.fillStyle = palette.accent;
              context.fillRect(px + 4, py + 4, CELL - 8, CELL - 8);
            }
          }
        }
      }
      context.globalAlpha = 1;

      if (elapsed < REVEAL_TOTAL) {
        requestAnimationFrame(frame);
      } else {
        context.clearRect(0, 0, width, height);
        if (!keepActive) delete canvas.dataset.active;
        resolve();
      }
    };
    requestAnimationFrame(frame);
  });
}

/**
 * Generate a static OG image (1200x630) for the Shadow landing page.
 *
 * Uses sharp to composite:
 *   - Dark background (#0a0a0c)
 *   - Purple radial glow (top-right)
 *   - Shady mascot (right side, portrait scaled to fit)
 *   - Text overlay via SVG
 *
 * Run: node scripts/gen-og.mjs
 * Output: public/og-image.png
 */

import sharp from "sharp";
import { existsSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dir, "..");
const OUT = join(ROOT, "public", "og-image.png");
const SHADY = join(ROOT, "public", "assets", "shady-final.png");

const W = 1200;
const H = 630;

// Background SVG with radial glow + text
const svgOverlay = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="85%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#7c3aed" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#0a0a0c" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0a0a0c" stop-opacity="1"/>
      <stop offset="60%" stop-color="#0a0a0c" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#0a0a0c" stop-opacity="0.1"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${W}" height="${H}" fill="#0a0a0c"/>

  <!-- Purple glow (top-right) -->
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Text fade overlay (left side readable) -->
  <rect width="${W}" height="${H}" fill="url(#fade)"/>

  <!-- Logo mark -->
  <circle cx="72" cy="72" r="20" fill="#7c3aed" opacity="0.9"/>
  <text x="72" y="79" font-family="system-ui,sans-serif" font-size="18" font-weight="700"
    text-anchor="middle" fill="white" letter-spacing="2">S</text>

  <!-- Wordmark -->
  <text x="104" y="82" font-family="system-ui,sans-serif" font-size="22" font-weight="600"
    fill="white" letter-spacing="4" opacity="0.9">SHADOW</text>

  <!-- Separator -->
  <line x1="60" y1="116" x2="580" y2="116" stroke="#7c3aed" stroke-width="1" opacity="0.4"/>

  <!-- Headline -->
  <text x="60" y="230" font-family="system-ui,sans-serif" font-size="64" font-weight="700"
    fill="white" letter-spacing="-2">Stop holding</text>
  <text x="60" y="310" font-family="system-ui,sans-serif" font-size="64" font-weight="700"
    fill="white" letter-spacing="-2">your whole life</text>
  <text x="60" y="390" font-family="system-ui,sans-serif" font-size="64" font-weight="700"
    fill="#7c3aed" letter-spacing="-2">in your head.</text>

  <!-- Subline -->
  <text x="60" y="470" font-family="system-ui,sans-serif" font-size="22" font-weight="400"
    fill="#a1a1aa" letter-spacing="0.2">AI second brain for memory, clarity and daily signals.</text>

  <!-- CTA hint -->
  <rect x="60" y="520" width="200" height="44" rx="22" fill="#7c3aed" opacity="0.9"/>
  <text x="160" y="547" font-family="system-ui,sans-serif" font-size="16" font-weight="600"
    fill="white" text-anchor="middle" letter-spacing="1">Join waitlist →</text>

  <!-- URL -->
  <text x="60" y="596" font-family="system-ui,monospace" font-size="14" font-weight="400"
    fill="#52525b" letter-spacing="1">shadow.so</text>
</svg>`;

async function generate() {
  // Resize shady mascot to fit right side of OG image
  // Shady is 1024x1536 (portrait) — scale to height=630, crop/position right
  const shadyResized = await sharp(SHADY)
    .resize({ height: H, width: Math.round(H * (1024 / 1536)), fit: "contain", background: { r: 10, g: 10, b: 12, alpha: 0 } })
    .png()
    .toBuffer();

  const shadyMeta = await sharp(shadyResized).metadata();
  const shadyW = shadyMeta.width ?? 420;

  const result = await sharp({
    create: { width: W, height: H, channels: 4, background: { r: 10, g: 10, b: 12, alpha: 255 } },
  })
    .composite([
      // Shady on the right
      { input: shadyResized, left: W - shadyW, top: 0 },
      // SVG text/glow overlay on top
      { input: Buffer.from(svgOverlay), left: 0, top: 0 },
    ])
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  console.log(`OG image → ${OUT} (${result.width}×${result.height})`);
}

generate().catch((e) => { console.error(e); process.exit(1); });

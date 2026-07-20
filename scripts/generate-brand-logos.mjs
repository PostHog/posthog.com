// Regenerates the downloadable PostHog logo assets in static/brand/ straight from the
// @posthog/brand library (the brand source of truth), so the handbook and press pages always
// serve the current logo. For each lockup it emits an SVG, a PNG + PNG@2x, and padded
// variants — under the historical /brand/ filenames, so every existing reference across the
// site (and third parties linking to them) picks up the new art automatically.
//
//   node scripts/generate-brand-logos.mjs
//
// Regenerate whenever the logo changes upstream. The committed assets here were produced from
// @posthog/brand@0.7.0 (the logo geometry is identical in 0.8.0). The parametric <Logo> API
// this relies on (layout/variant/color) is available from @posthog/brand ≥0.7 — bump the
// dependency before re-running if the repo is still pinned to an older release.
//
// Deps: @posthog/brand + react/react-dom (direct deps) and sharp (present via gatsby).
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { Logo } from "@posthog/brand/logo"
import sharp from "sharp"
import { writeFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const OUT =
    process.env.BRAND_OUT_DIR ||
    join(dirname(fileURLToPath(import.meta.url)), "..", "static", "brand")

const PPU_1X = 4 // rendered pixels per viewBox unit at 1x (the @2x file doubles it)
const PAD_FRACTION = 0.18 // transparent margin, as a fraction of the shorter viewBox side

// slug -> the <Logo> lockup it represents. Names match the historical /brand/ filenames.
const SPECS = [
    { slug: "posthog-logo", layout: "landscape", variant: "gradient", title: "PostHog logo" },
    { slug: "posthog-logo-black", layout: "landscape", variant: "mono", color: "#111", title: "PostHog logo" },
    { slug: "posthog-logo-white", layout: "landscape", variant: "mono", color: "#fff", title: "PostHog logo" },
    { slug: "posthog-logo-stacked", layout: "stacked", variant: "gradient", title: "PostHog logo" },
    { slug: "posthog-logomark", layout: "logomark", variant: "gradient", title: "PostHog logomark" },
]

const renderSvg = ({ layout, variant, color, title }, { padded } = {}) => {
    const props = { layout, variant, title }
    if (color) props.color = color
    let svg = renderToStaticMarkup(createElement(Logo, props))
    // Bake mono's currentColor into an explicit fill so the downloaded file is self-contained.
    if (color) svg = svg.replaceAll("currentColor", color).replace(/ style="color:[^"]*"/, "")
    const [, x, y, w, h] = svg.match(/viewBox="([\d.-]+) ([\d.-]+) ([\d.-]+) ([\d.-]+)"/).map(Number)
    let vb = { x, y, w, h }
    if (padded) {
        const pad = Math.min(w, h) * PAD_FRACTION
        vb = { x: x - pad, y: y - pad, w: w + pad * 2, h: h + pad * 2 }
    }
    // Normalize the root attrs: explicit rounded width/height + our (possibly padded) viewBox.
    const width = Math.round(vb.w)
    const height = Math.round(vb.h)
    svg = svg
        .replace(/ width="[^"]*"/, "")
        .replace(
            / viewBox="[^"]*"/,
            ` width="${width}" height="${height}" viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}"`
        )
    return { svg, width }
}

const rasterize = (svg, pxWidth) =>
    sharp(Buffer.from(svg), { density: 384 })
        .resize({ width: Math.round(pxWidth) })
        .png()
        .toBuffer()

let count = 0
for (const spec of SPECS) {
    for (const padded of [false, true]) {
        const suffix = padded ? "-padded" : ""
        const { svg, width } = renderSvg(spec, { padded })
        const base = join(OUT, spec.slug + suffix)
        await writeFile(base + ".svg", svg + "\n")
        await writeFile(base + ".png", await rasterize(svg, width * PPU_1X))
        await writeFile(base + "@2x.png", await rasterize(svg, width * PPU_1X * 2))
        count += 3
        console.log(`  ${spec.slug}${suffix}  (${width * PPU_1X}px / @2x ${width * PPU_1X * 2}px)`)
    }
}
console.log(`\nWrote ${count} files to ${OUT}`)

import {
    HOG,
    HOG_RUSH,
    PIPE,
    WEEKLY,
    CHART,
    DARK_AGENTS,
    DARK_OURS,
    DARK_WALLS,
    DARK_FLOOR,
    FLICKERS,
    pacerAt,
    pathAt,
} from './timeline.js'
import { drawText, drawLogoText, textWidth } from './font.js'
import { W, H, rect, px, hash, cached, ditherGradient, disc, sparkle, bayer, progress, easeOut, easeIn } from './fx.js'
import * as S from './sprites.js'
import { storeBackdrop, door } from './scenes.js'
import { irisIn, irisOut, drawAgent, pipe, pipeRim, pipeInterior, lever } from './level2.js'

// ================= HOGPIPE: PostHog has an MCP too =================
function hogpipe(ctx, f, scene, n) {
    storeBackdrop(ctx, n, { rightProps: false, owner: 'posthog' })
    door(ctx, false)
    pipe(ctx, n, true, 'posthog')
    for (const r of HOG_RUSH) {
        if (n < r.keys[0][0] || n > r.enter + 12) continue
        drawAgent(ctx, r.tint, pathAt(r.keys, n), n, { seed: r.i, clipY: n >= r.enter - 2 ? PIPE.rim + 1 : null })
    }
    pipeRim(ctx, 'posthog')
    const waving = HOG.wave.some((w) => n >= w && n < w + 30)
    const hopT = (n - scene.start) % 50
    const hop = !waving && hopT < 10 ? Math.round((10 * hopT * (10 - hopT)) / 25) : 0
    const pose = waving ? (Math.floor(n / 5) % 2 ? 'waveA' : 'waveB') : 'idle'
    S.draw(ctx, S.hedgehog(pose, (n + 7) % 70 < 4), HOG.x - 27, 150 - 42 - hop, { scale: 3 })
    if (waving)
        for (let i = 0; i < 3; i++) sparkle(ctx, HOG.x + 30 + i * 5, 100 - ((n + i * 5) % 15), 1, i % 2 ? 'y' : 'W')
    irisIn(ctx, f, HOG.x, 130, 10)
    irisOut(ctx, f, scene.end - scene.start, PIPE.x, PIPE.rim, 8)
}

// ================= CHART: 7x in three months =================
const BAR = { x0: 38, w: 14, gap: 5 }
const barX = (i) => BAR.x0 + i * (BAR.w + BAR.gap)
function chartBg() {
    return cached('chartbg', W, H, (c) => {
        ditherGradient(c, 0, 0, W, H, [
            [0, 'k'],
            [1, 'd'],
        ])
        for (const m of [4, 8]) {
            const y = Math.round(CHART.base - m * CHART.pxPerM)
            for (let x = 30; x < 306; x += 3) px(c, 's', x, y)
            drawText(c, `${m}M`, 8, y - 3, { color: 'S' })
        }
        rect(c, 'S', 30, CHART.base, 276, 1)
        drawText(c, 'PostHog MCP tool calls per week', 8, 6, { color: 'W' })
        drawText(c, 'JUN', barX(0), CHART.base + 4, { color: 'S' })
        drawText(c, 'SEP', barX(WEEKLY.length - 1) - 2, CHART.base + 4, { color: 'S' })
    })
}
function chart(ctx, f, scene, n) {
    const shake = n >= CHART.punch && n < CHART.punch + 10 ? Math.round((hash(n, 5) - 0.5) * 6) : 0
    ctx.save()
    ctx.translate(shake, Math.round((hash(n, 6) - 0.5) * Math.abs(shake)))
    ctx.drawImage(chartBg(), 0, 0)
    const last = WEEKLY.length - 1
    WEEKLY.forEach(([, v], i) => {
        const full = v * CHART.pxPerM
        const k =
            i < last
                ? easeOut(progress(n, CHART.barAt(i), CHART.barAt(i) + CHART.grow))
                : (easeIn(progress(n, CHART.lastFrom, CHART.punch)) * (CHART.base + 20)) / full
        if (k <= 0) return
        const h = Math.round(Math.min(full * k, CHART.base + 20))
        const x = barX(i),
            y = CHART.base - h
        const hot = i === last
        rect(ctx, 'k', x - 1, y - 1, BAR.w + 2, h + 1)
        rect(ctx, hot ? 'o' : 'b', x, y, BAR.w, h)
        rect(ctx, hot ? 'y' : 'c', x, y, BAR.w, 2)
        rect(ctx, hot ? 'O' : 'B', x + BAR.w - 3, y + 2, 3, h - 2)
    })
    if (n >= CHART.barAt(0) + CHART.grow)
        drawText(ctx, '1.6M', barX(0) - 1, CHART.base - Math.round(WEEKLY[0][1] * CHART.pxPerM) - 10, {
            color: 'W',
            outline: 'k',
        })
    ctx.restore()

    // The last bar breaks through the top of the screen
    if (n >= CHART.punch) {
        const k = n - CHART.punch
        const cx = barX(last) + BAR.w / 2
        if (k < 2) rect(ctx, 'W', 0, 0, W, H)
        for (let i = 0; i < 28; i++) {
            const a = Math.PI * (0.02 + 0.96 * hash(i, 1))
            const r = k * (1.5 + hash(i, 2) * 3.5)
            const dx = Math.round(Math.cos(a) * r),
                dy = Math.round(Math.sin(a) * r * 0.8 - 0.05 * k * k)
            if (k < 36) rect(ctx, ['y', 'o', 'W', 'O'][i % 4], cx + dx, 2 + dy, i % 3 ? 2 : 3, i % 3 ? 2 : 3)
        }
        if (k < 16) {
            disc(ctx, 'o', cx, 0, 24 - k)
            disc(ctx, 'y', cx, 0, Math.max(0, 18 - k))
            disc(ctx, 'W', cx, 0, Math.max(0, 11 - k))
        }
        for (let i = 0; i < 9; i++) px(ctx, 'k', cx - 12 + i * 3, (i % 2) * 2)
        drawText(ctx, '12.2M', cx - 34, 14, { color: 'y', outline: 'k' })
    }
    if (n >= CHART.sevenX) {
        const k = n - CHART.sevenX
        const scale = k < 2 ? 5 : 4
        drawLogoText(ctx, '7x', 120 - Math.round(textWidth('7x', scale) / 2), 44 - (scale - 4) * 3, { scale })
    }
    irisIn(ctx, f, 160, 90, 8)
    irisOut(ctx, f, scene.end - scene.start, 160, 90, 8)
}

// ================= DARK: agents stumbling around the unlit pipe =================
function darkWalls(ctx) {
    for (const x of DARK_WALLS) {
        rect(ctx, 'k', x - 3, 12, 6, DARK_FLOOR - 12)
        rect(ctx, 'g', x - 2, 12, 4, DARK_FLOOR - 12)
        rect(ctx, 's', x - 2, 12, 1, DARK_FLOOR - 12)
        for (let y = 18; y < DARK_FLOOR; y += 12) px(ctx, 'k', x, y)
    }
}
// Ordered-dither darkness: an ambient floor plus pools of light {x, y, r}.
export function darkness(ctx, ambient, lights) {
    if (ambient >= 1) return
    ctx.fillStyle = '#151515'
    for (let y = 0; y < H; y++)
        for (let x = 0; x < W; x++) {
            let light = ambient
            for (const l of lights) light += Math.max(0, 1 - Math.hypot(x - l.x, (y - l.y) * 1.2) / l.r)
            if (bayer(x, y) >= light) ctx.fillRect(x, y, 1, 1)
        }
}

function dark(ctx, f, scene, n) {
    pipeInterior(ctx, scene.pipe)
    darkWalls(ctx)
    const failed = n >= DARK_OURS.pull
    lever(ctx, DARK_OURS.lever, n, { floor: DARK_FLOOR, light: failed ? 'r' : undefined })
    const agents = [
        ...DARK_AGENTS.map((a) => ({ a, p: pacerAt(a, n) })),
        { a: DARK_OURS, p: { ...pathAt(DARK_OURS.keys, n), lastBonk: DARK_OURS.pull } },
    ]
    agents.forEach(({ a, p }, i) => {
        const hurt = a.fails && n >= p.lastBonk && n - p.lastBonk < (a.hurtFor ?? 10)
        const knock = n >= p.lastBonk && n - p.lastBonk < 4 ? p.dir * (4 - (n - p.lastBonk)) : 0
        const q = { ...p, x: p.x + knock, moving: p.moving && !(n >= p.lastBonk && n - p.lastBonk < 6) }
        drawAgent(ctx, hurt ? 'hurt' : a.tint, q, n, { seed: i, scale: 3 })
    })
    // Darkness: an ambient floor with a faint flicker, each agent's screen-face casting a small pool of light
    const ambient = FLICKERS.includes(n) ? 0.75 : 0.16 + hash(Math.floor(n / 3), 9) * 0.06
    darkness(
        ctx,
        ambient,
        agents.map(({ p }) => ({ x: p.x, y: p.y - 24, r: 42 }))
    )
    // Red failures and bonk stars stay bright on top of the dark
    if (failed) {
        disc(ctx, 'k', DARK_OURS.lever.x, DARK_FLOOR - 38, 4)
        disc(ctx, 'r', DARK_OURS.lever.x, DARK_FLOOR - 38, 3)
    }
    for (const { a, p } of agents) {
        const since = n - p.lastBonk
        if (since < 0 || since >= 12) continue
        const wx = p.x - p.dir * 20
        for (let i = 0; i < 5; i++) {
            const ang = i * 1.26 + since * 0.3
            sparkle(
                ctx,
                wx + Math.round(Math.cos(ang) * (5 + since)),
                p.y - 38 + Math.round(Math.sin(ang) * (4 + since / 2)),
                a.fails ? 2 : 1,
                a.fails ? 'r' : 'y'
            )
        }
        if (a.fails) drawText(ctx, '!', p.x - 2, p.y - 70 - Math.min(since, 4), { color: 'r', outline: 'k', scale: 2 })
    }
    irisIn(ctx, f, 160, 110, 10)
    irisOut(ctx, f, scene.end - scene.start, 160, 110, 10)
}

export const RENDERERS_L3 = { hogpipe, chart, dark }

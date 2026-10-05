import {
    HOME,
    BIT_HOME1,
    BIT_HOME2,
    BIT_STREET,
    PIPE,
    PIPE_ENTER,
    BIT_TUNNEL,
    TUNNEL_FLOOR,
    LEVERS,
    CUSTOMER_LEVERS,
    CRATE,
    DARK_FLOOR,
    HOUSES,
    HOUSE_W,
    LAUNCHES,
    TASK_CPF,
    RUSH,
    DESK2,
    pathAt,
    STREET_Y,
} from './timeline.js'
import { drawText, measure, wrap } from './font.js'
import {
    W,
    H,
    rect,
    px,
    hash,
    cached,
    ditherGradient,
    disc,
    iris,
    sparkle,
    bayer,
    progress,
    easeOut,
    easeIn,
    lerp,
} from './fx.js'
import * as S from './sprites.js'
import {
    center,
    stars,
    quietStore,
    SHOP,
    MON,
    SCR,
    KEYS,
    DEV,
    devSprite,
    room,
    windowCloud,
    monitorFrame,
    shipButton,
    appChrome,
    tabCursor,
} from './scenes.js'

// ================= SHARED PIECES =================
export const irisIn = (ctx, f, x, y, len = 10) => {
    if (f < len) iris(ctx, x, y, Math.round(lerp(0, 200, easeOut(f / len))))
}
export const irisOut = (ctx, f, len, x, y, dur = 10) => {
    if (f >= len - dur) iris(ctx, x, y, Math.round(lerp(200, 0, easeIn(progress(f, len - dur, len - 1)))))
}

// Agents are drawn by their feet position; Bit's antenna blinks, everyone blinks now and then.
export function drawAgent(ctx, tint, p, n, { seed = 0, carrying = false, clipY = null, scale = 1 } = {}) {
    const period = (p.speed ?? 0) > 2.5 ? 2 : 3
    const pose = p.air ? 'runB' : p.moving ? (Math.floor(n / period) % 2 ? 'runA' : 'runB') : 'stand'
    const blink = (n + seed * 37) % 97 < 4
    const spr = S.agent(tint, pose, { blink, lit: tint !== 'bit' || Math.floor(n / 8) % 2 === 0 })
    const bob = p.moving && pose === 'runB' ? -1 : 0
    const x = p.x - 6 * scale,
        y = p.y - (S.AGENT_H - bob) * scale
    ctx.save()
    if (clipY !== null) {
        ctx.beginPath()
        ctx.rect(0, 0, W, clipY)
        ctx.clip()
    }
    ctx.translate(Math.round(x) + (p.dir < 0 ? spr.w * scale : 0), Math.round(y))
    ctx.scale(p.dir < 0 ? -scale : scale, scale)
    ctx.drawImage(spr.canvas, 0, 0)
    if (carrying) ctx.drawImage(S.crate().canvas, 2, -7)
    ctx.restore()
}

export function bubble(ctx, text, x, y, align = 'center') {
    const w = measure(text) + 8
    const left = align === 'left' ? x + 8 - w : Math.round(x - w / 2)
    const bx = Math.max(2, Math.min(W - w - 2, left))
    const by = y - 16
    rect(ctx, 'k', bx + 1, by, w - 2, 13)
    rect(ctx, 'k', bx, by + 1, w, 11)
    rect(ctx, 'W', bx + 1, by + 1, w - 2, 11)
    rect(ctx, 'k', x - 2, by + 13, 5, 1)
    rect(ctx, 'W', x - 1, by + 12, 3, 1)
    rect(ctx, 'k', x - 1, by + 14, 3, 1)
    px(ctx, 'W', x, by + 13)
    px(ctx, 'k', x, by + 15)
    drawText(ctx, text, bx + 4, by + 3, { color: 'k' })
}

function nameTag(ctx, text, x, y) {
    const w = measure(text) + 6
    rect(ctx, 'k', x - 1, y - 1, w + 2, 11)
    rect(ctx, 'o', x, y, w, 9)
    rect(ctx, 'y', x, y, w, 1)
    drawText(ctx, text, x + 3, y + 1, { color: 'W' })
}

// Soft elliptical spotlight: ordered-dither falloff into black.
function spotlight(ctx, cx, cy, r, soft = 16) {
    ctx.fillStyle = '#151515'
    for (let y = 0; y < H; y++)
        for (let x = 0; x < W; x++) {
            const d = Math.hypot((x - cx) * 0.7, y - cy) - r
            if (d > soft || (d > 0 && bayer(x, y) < d / soft)) ctx.fillRect(x, y, 1, 1)
        }
}

// ================= HOME: one person, one agent =================
const USER = { hoodie: 'G', shade: 'H', hair: 'O', hairHi: 'o', phones: false }
const SCREEN_MID = { x: SCR.x + SCR.w / 2, y: SCR.y + SCR.h / 2 }

export function homeRoom() {
    return cached('home', W, H, (c) => {
        ditherGradient(c, 0, 0, W, 132, [
            [0, 'd'],
            [1, 'g'],
        ])
        for (let y = 6; y < 100; y += 10) for (let x = (y / 10) % 2 ? 5 : 0; x < W; x += 10) px(c, 'B', x, y)
        // night window
        rect(c, 'k', 10, 12, 64, 58)
        rect(c, 'n', 11, 13, 62, 56)
        ditherGradient(c, 14, 16, 56, 50, [
            [0, 'k'],
            [1, 'B'],
        ])
        for (let i = 0; i < 9; i++) px(c, 'w', 15 + Math.floor(hash(i, 21) * 54), 17 + Math.floor(hash(i, 22) * 46))
        disc(c, 'Y', 56, 28, 5)
        disc(c, 'B', 58, 27, 4)
        rect(c, 'n', 41, 16, 2, 50)
        rect(c, 'n', 14, 40, 56, 2)
        rect(c, 'k', 8, 70, 68, 3)
        rect(c, 'n', 9, 70, 66, 2)
        // shelf with books
        rect(c, 'k', 84, 44, 30, 3)
        rect(c, 'n', 85, 44, 28, 2)
        ;[
            ['r', 3],
            ['b', 4],
            ['y', 3],
            ['G', 4],
            ['p', 3],
            ['o', 4],
        ].reduce((x, [k, w], i) => {
            rect(c, 'k', x, 34 + (i % 2), w + 1, 10 - (i % 2))
            rect(c, k, x, 35 + (i % 2), w, 9 - (i % 2))
            return x + w + 1
        }, 86)
        // desk
        rect(c, 'k', 0, 127, W, 1)
        rect(c, 'n', 0, 128, W, 6)
        rect(c, 'y', 0, 128, W, 1)
        rect(c, 'N', 0, 134, W, 46)
        rect(c, 'k', 0, 134, W, 1)
    })
}

export function terminal(
    ctx,
    n,
    { prompt: promptText = HOME.prompt, typed = 0, lines = [], scrolled = false, title = 'Claude Code' } = {}
) {
    const { x, y, w, h } = SCR
    rect(ctx, 'k', x, y, w, h)
    rect(ctx, 'g', x, y, w, 9)
    ;[
        ['s', 4],
        ['s', 9],
        ['s', 14],
    ].forEach(([k, dx]) => rect(ctx, k, x + dx, y + 3, 3, 3))
    drawText(ctx, title, x + Math.round((w - measure(title)) / 2), y + 1, { color: 'W' })
    if (!scrolled) {
        rect(ctx, 'o', x + 4, y + 13, w - 8, 18)
        rect(ctx, 'k', x + 5, y + 14, w - 10, 16)
        drawText(ctx, '*', x + 9, y + 18, { color: 'o' })
        drawText(ctx, 'Welcome to Claude Code!', x + 17, y + 18, { color: 'W' })
    }
    // prompt
    const prompt = wrap(promptText, w - 20)
    let budget = typed
    let cy = y + (scrolled ? 14 : 37)
    let cursor = null
    prompt.forEach((line, i) => {
        if (i === 0) drawText(ctx, '>', x + 5, cy, { color: 'o' })
        const shown = line.slice(0, Math.max(0, budget))
        drawText(ctx, shown, x + 14, cy, { color: 'W' })
        if (budget >= 0 && budget <= line.length) cursor = [x + 14 + measure(shown) + (shown ? 1 : 0), cy]
        budget -= line.length + 1
        cy += 11
    })
    for (const [text, color] of lines)
        for (const row of wrap(text, w - 10)) {
            drawText(ctx, row, x + 5, cy + 2, { color })
            cy += 11
        }
    if (cursor && Math.floor(n / 8) % 2 === 0) rect(ctx, 'S', cursor[0], cursor[1], 4, 7)
}

function home(ctx, f, scene, n) {
    ctx.drawImage(homeRoom(), 0, 0)
    monitorFrame(ctx)
    const returning = !!scene.returning
    const typed = returning ? 99 : Math.max(0, Math.floor((n - HOME.typeFrom) * HOME.typeCpf))
    const lines = []
    if (returning || n >= HOME.enter) lines.push(['● Sending an agent...', 'o'])
    if (returning) {
        const results = [
            ['Found 42 churned customers.', 'W'],
            ['Draft email ready.', 'W'],
            ['✓ Done', 'L'],
        ]
        results.forEach((l, i) => {
            if (n >= HOME.lines[i]) lines.push(l)
        })
    }
    terminal(ctx, n, { typed, lines, scrolled: returning })
    const flash =
        (!returning && n >= HOME.boot && n < HOME.boot + 3) || (returning && n >= HOME.back && n < HOME.back + 3)
    if (flash) rect(ctx, 'W', SCR.x, SCR.y, SCR.w, SCR.h)
    if (!returning && n >= HOME.boot && n < HOME.hop) {
        const r = 2 + (n - HOME.boot) * 2
        for (let a = 0; a < 16; a++)
            px(
                ctx,
                'o',
                SCREEN_MID.x + Math.round(Math.cos((a / 16) * 6.283) * r),
                SCREEN_MID.y + Math.round(Math.sin((a / 16) * 6.283) * r * 0.7)
            )
    }
    rect(ctx, 'k', KEYS.x, KEYS.y, KEYS.w, 5)
    rect(ctx, 'S', KEYS.x + 1, KEYS.y, KEYS.w - 2, 3)
    for (let kx = KEYS.x + 2; kx < KEYS.x + KEYS.w - 2; kx += 3)
        px(ctx, !returning && n >= HOME.typeFrom && n < HOME.enter && (kx + n) % 7 === 0 ? 'W' : 's', kx, KEYS.y + 1)

    if (!returning && n >= HOME.hop && n < HOME.runOff + 20) {
        const p = pathAt(BIT_HOME1, n)
        drawAgent(ctx, 'bit', p, n, { scale: 2 })
        if (n >= HOME.land && n < HOME.runOff) {
            nameTag(ctx, 'BIT', p.x - 38, p.y - 24)
            if (n >= HOME.land + 8) bubble(ctx, 'find churned customers', p.x - 16, p.y - 34, 'left')
        }
        if (n >= HOME.land && n < HOME.land + 6)
            for (let i = 0; i < 6; i++)
                sparkle(
                    ctx,
                    p.x + Math.round(Math.cos(i) * (8 + (n - HOME.land) * 2)),
                    p.y - 8 + Math.round(Math.sin(i) * 6),
                    1,
                    'y'
                )
    }
    if (returning && n < HOME.back) drawAgent(ctx, 'bit', pathAt(BIT_HOME2, n), n, { carrying: true, scale: 2 })
    if (returning && n >= HOME.lines[2])
        for (let i = 0; i < 6; i++) {
            const k = n - HOME.lines[2]
            if (k < 24)
                sparkle(
                    ctx,
                    SCREEN_MID.x + Math.round(Math.cos(i * 1.05) * (20 + k * 2)),
                    SCREEN_MID.y + Math.round(Math.sin(i * 1.05) * (12 + k)),
                    1,
                    i % 2 ? 'y' : 'L'
                )
        }

    const cheer =
        returning && n >= HOME.lines[2] && n < HOME.lines[2] + 20
            ? -Math.round(3 * Math.abs(Math.sin((n - HOME.lines[2]) / 3)))
            : 0
    ctx.drawImage(devSprite(USER), DEV.x, DEV.y + (Math.floor(n / 20) % 2) + cheer)

    const len = scene.end - scene.start
    const r = returning ? 118 : Math.round(lerp(20, 118, easeOut(progress(f, 0, 30))))
    spotlight(ctx, 170, 84, r)
    if (!returning) drawText(ctx, 'YOUR CUSTOMER AT HOME', 6, 168, { color: 'S', outline: 'k' })
    irisIn(ctx, f, 170, 84)
    if (returning) irisOut(ctx, f, len, 170, 84, 8)
}

// ================= STREET: the quiet door and the MCP pipe =================
// Whose MCP pipe it is decides its colours: the customer's is blue, PostHog's is PostHog yellow with black bands.
export const PIPE_LOOK = {
    customer: {
        body: 'b',
        hi: 'c',
        lo: 'B',
        text: 'W',
        glow: 'y',
        wallA: 'B',
        wallB: 'd',
        rib: 'g',
        ribLo: 'B',
        bands: false,
    },
    posthog: {
        body: 'y',
        hi: 'Y',
        lo: 'O',
        text: 'k',
        glow: 'W',
        wallA: 'O',
        wallB: 'N',
        rib: 'n',
        ribLo: 'N',
        bands: true,
    },
}
// A clean signboard: solid board, lighter top edge and darker bottom edge, a bulb in each corner, shadowed text.
// `mount` hangs it from two chains to the ceiling or stands it on a wall bracket.
export function signboard(ctx, text, x, y, { mount = null, ceiling = 12 } = {}) {
    const w = measure(text) + 10,
        h = 15
    if (mount === 'chains')
        for (const cx of [x + 6, x + w - 7]) for (let cy = ceiling; cy < y; cy++) px(ctx, cy % 2 ? 'S' : 'g', cx, cy)
    if (mount === 'bracket')
        for (const bx of [x + 5, x + w - 9]) {
            rect(ctx, 'k', bx - 1, y + h, 6, 4)
            rect(ctx, 'S', bx, y + h, 4, 1)
            rect(ctx, 'g', bx + 1, y + h + 1, 2, 2)
        }
    rect(ctx, 'k', x - 1, y - 1, w + 2, h + 2)
    rect(ctx, 'd', x, y, w, h)
    rect(ctx, 'g', x, y, w, 1)
    rect(ctx, 'B', x, y + h - 1, w, 1)
    for (const [bx, by] of [
        [x + 1, y + 2],
        [x + w - 2, y + 2],
        [x + 1, y + h - 3],
        [x + w - 2, y + h - 3],
    ])
        px(ctx, 'Y', bx, by)
    drawText(ctx, text, x + 5, y + 4, { color: 'y', shadow: 'k' })
    return w
}
// The header sign on a pipe's back wall saying whose MCP server this is: right side, hung from the ceiling on
// chains long enough to clear the tutorial boxes that open some pipe scenes.
export const MCP_SIGN = { posthog: 'PostHog MCP server', customer: "YOUR PRODUCT's MCP server" }
export const mcpSignWidth = (owner) => measure(MCP_SIGN[owner]) + 10
export const mcpSign = (ctx, owner, x = W - mcpSignWidth(owner) - 6, y = 44) =>
    signboard(ctx, MCP_SIGN[owner], x, y, { mount: 'chains' })
// The pipe fills the frame here: ceiling at the top edge, cables hanging, bulkheads close together.
export function pipeInteriorBg(owner) {
    const L = PIPE_LOOK[owner]
    return cached(`pipe-inside-${owner}`, W, H, (c) => {
        ditherGradient(c, 0, 0, W, H, [
            [0, L.wallA],
            [0.5, L.wallB],
            [1, L.wallA],
        ])
        for (let x = 20; x < W; x += 40) {
            rect(c, L.rib, x, 12, 2, DARK_FLOOR - 12)
            rect(c, L.ribLo, x + 2, 12, 1, DARK_FLOOR - 12)
        }
        for (const [y, h] of [
            [0, 12],
            [DARK_FLOOR, 14],
        ]) {
            rect(c, L.body, 0, y, W, h)
            rect(c, L.hi, 0, y + 1, W, 2)
            rect(c, L.lo, 0, y + h - 3, W, 3)
            for (let x = 6; x < W; x += 12) px(c, L.bands ? 'k' : L.lo, x, y + 5)
            if (L.bands) for (let x = 0; x < W; x += 40) rect(c, 'k', x, y, 3, h)
        }
        rect(c, 'k', 0, DARK_FLOOR + 14, W, H)
        for (let i = 0; i < 7; i++) {
            const x = 14 + i * 46,
                len = 18 + Math.floor(hash(i, 4) * 30)
            for (let y = 12; y < 12 + len; y++) px(c, 'k', x + Math.round(Math.sin(y / 6 + i) * 1.5), y)
        }
    })
}
// The pipe's back wall plus its live header sign (drawn every frame so it follows the active font).
export function pipeInterior(ctx, owner, sign = true) {
    ctx.drawImage(pipeInteriorBg(owner), 0, 0)
    if (sign) mcpSign(ctx, owner)
}
// The customer's server: the same four slots everywhere. `pulls`/`lights` by tool; `built` grows the 4th lever in.
export function emptySlot(ctx, x, floor = DARK_FLOOR) {
    for (let y = floor - 44; y < floor; y += 4) {
        rect(ctx, 'W', x - 12, y, 2, 2)
        rect(ctx, 'W', x + 11, y, 2, 2)
    }
    for (let xx = x - 12; xx <= x + 12; xx += 4) {
        rect(ctx, 'W', xx, floor - 44, 2, 2)
        rect(ctx, 'W', xx, floor - 2, 2, 2)
    }
}
export function customerLevers(ctx, n, { pulls = {}, lights = {}, built = 0, slotPull } = {}) {
    for (const l of CUSTOMER_LEVERS) {
        if (!l.slot) {
            lever(ctx, { ...l, pull: pulls[l.label] }, n, { floor: DARK_FLOOR, light: lights[l.label] })
            continue
        }
        if (built < 1) emptySlot(ctx, l.x)
        if (built <= 0) continue
        ctx.save()
        ctx.beginPath()
        ctx.rect(0, DARK_FLOOR - 76 * built, W, 200)
        ctx.clip()
        lever(ctx, { ...l, pull: slotPull }, n, { floor: DARK_FLOOR })
        ctx.restore()
    }
}
// The hedgehog mark on PostHog's pipe plate and on the storefront porthole.
export const MINI_HOG = ['..k.k.k..', '.kNkNkNkk', 'kNNNNNNtk', 'kNNNNNNNk', '.kk.kk.k.']
export const drawMiniHog = (ctx, x, y) =>
    MINI_HOG.forEach((row, r) =>
        [...row].forEach((c, i) => {
            if (c !== '.') px(ctx, c, x + i, y + r)
        })
    )
export function pipe(ctx, n, active, owner = 'customer') {
    const L = PIPE_LOOK[owner]
    const { x, rim } = PIPE
    const bx = x - 10,
        bw = 20
    // connector into the building
    rect(ctx, 'k', SHOP.x + SHOP.w - 1, 123, bx - SHOP.x - SHOP.w + 2, 11)
    rect(ctx, L.body, SHOP.x + SHOP.w - 1, 124, bx - SHOP.x - SHOP.w + 2, 9)
    rect(ctx, L.hi, SHOP.x + SHOP.w - 1, 124, bx - SHOP.x - SHOP.w + 2, 2)
    // body
    rect(ctx, 'k', bx - 1, rim + 6, bw + 2, STREET_Y - rim - 5)
    rect(ctx, L.body, bx, rim + 6, bw, STREET_Y - rim - 6)
    rect(ctx, L.hi, bx + 2, rim + 6, 3, STREET_Y - rim - 6)
    rect(ctx, L.lo, bx + bw - 4, rim + 6, 4, STREET_Y - rim - 6)
    if (L.bands) for (const by of [rim + 18, STREET_Y - 6]) rect(ctx, 'k', bx, by, bw, 2)
    const glow = active && Math.floor(n / 6) % 2 === 0
    drawText(ctx, 'MCP', bx + 2, rim + 9, { color: glow ? L.glow : L.text, shadow: L.lo })
    if (L.bands) {
        rect(ctx, 'k', bx + 4, rim + 22, 13, 9)
        rect(ctx, 'w', bx + 5, rim + 23, 11, 7)
        drawMiniHog(ctx, bx + 6, rim + 24)
    }
    // flow into the building
    if (active)
        for (let i = 0; i < 3; i++) {
            const t = ((n * 1.5 + i * 12) % 36) / 36
            const fx = Math.round(lerp(bx, SHOP.x + SHOP.w - 2, t))
            rect(ctx, 'y', fx, 127, 3, 3)
            px(ctx, 'W', fx + 1, 128)
        }
}
export function pipeRim(ctx, owner = 'customer') {
    const L = PIPE_LOOK[owner]
    const { x, rim } = PIPE
    rect(ctx, 'k', x - 14, rim - 1, 28, 8)
    rect(ctx, L.body, x - 13, rim, 26, 6)
    rect(ctx, L.hi, x - 12, rim, 5, 6)
    rect(ctx, L.lo, x - 13, rim + 4, 26, 2)
    rect(ctx, 'k', x - 10, rim, 20, 2)
}

function blowingLeaves(ctx, n) {
    for (let i = 0; i < 10; i++) {
        const x = ((Math.floor(n * (1.6 + hash(i, 1))) + i * 41) % 360) - 20
        const y = 90 + Math.floor(hash(i, 2) * 60) + Math.round(Math.sin((n + i * 13) / 6) * 4)
        px(ctx, i % 2 ? 'L' : 'G', x, y)
        px(ctx, i % 2 ? 'G' : 'H', x + 1, y + (Math.floor(n / 4) % 2))
    }
}
function tumbleweed(ctx, n, from) {
    const t = n - from
    const x = Math.round(-20 + t * 1.3)
    if (x > 340) return
    const y = STREET_Y - 6 - Math.round(Math.abs(Math.sin(t / 5.5)) * 6)
    for (let a = 0; a < 20; a++) {
        const ang = a * 0.9 + t * 0.25
        const r = 3 + (a % 3)
        px(ctx, a % 2 ? 'n' : 'N', x + Math.round(Math.cos(ang) * r), y + Math.round(Math.sin(ang) * r))
    }
}

function street(ctx, f, scene, n) {
    quietStore(ctx, n)
    blowingLeaves(ctx, n)
    tumbleweed(ctx, n, scene.start + 10)
    pipe(ctx, n, n >= PIPE_ENTER)
    const p = pathAt(BIT_STREET, n)
    drawAgent(ctx, 'bit', p, n, { clipY: n >= PIPE_ENTER - 2 ? PIPE.rim + 1 : null })
    pipeRim(ctx)
    irisOut(ctx, f, scene.end - scene.start, PIPE.x, PIPE.rim, 10)
}

// ================= TUNNEL: inside the pipe =================
const LEVER_LEN = 22
export function leverPlate(ctx, l, floor = TUNNEL_FLOOR) {
    if (!l.label) return
    const lw = measure(l.label) + 8,
        top = floor - (l.up ? 74 : 60)
    if (l.up) rect(ctx, 'g', l.x, top + 13, 1, 14)
    rect(ctx, 'k', l.x - lw / 2 - 1, top, lw + 2, 13)
    rect(ctx, 'g', l.x - lw / 2, top + 1, lw, 11)
    drawText(ctx, l.label, l.x - lw / 2 + 4, top + 3, { color: 'W' })
}
// light: the status lamp colour; defaults to green once pulled (a successful tool call).
export function lever(ctx, l, n, { floor = TUNNEL_FLOOR, light } = {}) {
    const pulled = l.pull && n >= l.pull
    const base = floor - 6
    leverPlate(ctx, l, floor)
    const lamp = light ?? (pulled ? 'L' : 'd')
    const ly = floor - 38
    disc(ctx, 'k', l.x, ly, 4)
    disc(ctx, lamp, l.x, ly, 3)
    if (lamp !== 'd') px(ctx, 'W', l.x - 1, ly - 1)
    if (pulled && !light && n - l.pull < 16)
        for (let a = 0; a < 8; a++)
            px(
                ctx,
                'L',
                l.x + Math.round(Math.cos(a * 0.785) * (6 + (n - l.pull) / 3)),
                ly + Math.round(Math.sin(a * 0.785) * (6 + (n - l.pull) / 3))
            )
    const ang = (pulled ? 0.55 : -0.55) + (l.pull && n >= l.pull - 4 && n < l.pull ? (n - l.pull + 4) * 0.28 : 0)
    for (let i = 0; i < LEVER_LEN; i++)
        rect(ctx, 'k', l.x + Math.round(Math.sin(ang) * i) - 1, base - Math.round(Math.cos(ang) * i) - 1, 3, 3)
    for (let i = 0; i < LEVER_LEN; i++)
        px(ctx, 'S', l.x + Math.round(Math.sin(ang) * i), base - Math.round(Math.cos(ang) * i))
    const kx = l.x + Math.round(Math.sin(ang) * LEVER_LEN),
        ky = base - Math.round(Math.cos(ang) * LEVER_LEN)
    disc(ctx, 'k', kx, ky, 4)
    disc(ctx, 'y', kx, ky, 3)
    px(ctx, 'W', kx - 1, ky - 2)
    rect(ctx, 'k', l.x - 10, base - 2, 20, 8)
    rect(ctx, 'g', l.x - 9, base - 1, 18, 6)
    rect(ctx, 's', l.x - 9, base - 1, 18, 1)
    // result packet rises into the pipe and flows toward the product
    if (l.pull) {
        const t = n - l.pull - 6
        if (t >= 0 && t < 40) {
            const up = Math.min(t, 12)
            const px0 = l.x + Math.max(0, t - 12) * 5
            rect(ctx, 'k', px0 - 2, ly + 2 - up * 3, 5, 5)
            rect(ctx, 'y', px0 - 1, ly + 3 - up * 3, 3, 3)
        }
    }
}

function tunnel(ctx, f, scene, n) {
    pipeInterior(ctx, scene.pipe)
    customerLevers(ctx, n, { pulls: Object.fromEntries(LEVERS.map((l) => [l.tool, l.pull])) })
    const p = pathAt(BIT_TUNNEL, n)
    const carrying = n >= CRATE.pick
    if (n >= CRATE.spawn && !carrying) {
        const t = Math.min(10, n - CRATE.spawn)
        S.draw(ctx, S.crate(), 178 + t, TUNNEL_FLOOR - 7 - Math.round((4 * t * (10 - t)) / 10))
    }
    drawAgent(ctx, 'bit', p, n, { carrying, scale: 2 })
    const pulling = LEVERS.map((l) => ({ ...l, x: CUSTOMER_LEVERS.find((c) => c.label === l.tool).x })).find(
        (l) => n >= l.pull - 6 && n < l.pull + 6
    )
    if (pulling) {
        const kx = pulling.x + Math.round(Math.sin(n >= pulling.pull ? 0.55 : -0.2) * LEVER_LEN)
        rect(ctx, 'k', p.x + 10, p.y - 20, kx - p.x - 10, 4)
        rect(ctx, 'o', p.x + 10, p.y - 19, kx - p.x - 11, 2)
    }
    irisIn(ctx, f, 40, 100)
    irisOut(ctx, f, scene.end - scene.start, 40, 60, 10)
}

// ================= HOMES: everyone does it =================
const TOOL_STYLE = {
    'Claude Code': { wall: 'g', roof: 'O' },
    Codex: { wall: 'H', roof: 'd' },
    Cursor: { wall: 'B', roof: 'b' },
}
function toolScreen(ctx, tool, x, y, w, h, n, done) {
    if (tool === 'Cursor') {
        rect(ctx, 'd', x, y, w, h)
        rect(ctx, 'g', x, y, 8, h)
        for (let i = 0; i < 5; i++)
            rect(
                ctx,
                ['b', 'y', 'o', 'L', 'C'][i],
                x + 10 + (i % 2) * 3,
                y + 3 + i * 4,
                10 + ((i * 7 + Math.floor(n / 6)) % 12),
                2
            )
        return
    }
    rect(ctx, 'k', x, y, w, h)
    if (tool === 'Codex') {
        drawText(ctx, '>_', x + 2, y + 2, { color: 'W' })
        for (let i = 0; i < 3; i++) rect(ctx, 'L', x + 3, y + 11 + i * 4, 8 + ((i * 11 + Math.floor(n / 5)) % 20), 2)
        return
    }
    rect(ctx, 'o', x + 2, y + 2, w - 4, 7)
    rect(ctx, 'k', x + 3, y + 3, w - 6, 5)
    px(ctx, 'o', x + 5, y + 5)
    if (done) {
        drawText(ctx, '✓', x + 3, y + 11, { color: 'L' })
        rect(ctx, 'W', x + 11, y + 13, 18, 2)
        return
    }
    for (let i = 0; i < 3; i++) rect(ctx, 'W', x + 3, y + 12 + i * 4, 6 + ((i * 9 + Math.floor(n / 5)) % 22), 2)
}
function house(ctx, h, i, n) {
    const x = i * HOUSE_W
    const st = TOOL_STYLE[h.tool]
    // roof
    for (let r = 0; r < 18; r++) {
        rect(ctx, 'k', x + 2 + 20 - r - 1, 44 + r, 2 * r + 38 + 2, 1)
        rect(ctx, st.roof, x + 2 + 20 - r, 44 + r, 2 * r + 38, 1)
    }
    rect(ctx, 'k', x + 3, 62, HOUSE_W - 6, 90)
    rect(ctx, st.wall, x + 4, 63, HOUSE_W - 8, 88)
    for (let yy = 66; yy < 124; yy += 6)
        for (let xx = x + 6 + ((yy / 6) % 2) * 3; xx < x + HOUSE_W - 6; xx += 6) px(ctx, 'd', xx, yy)
    // desk + monitor
    rect(ctx, 'k', x + 4, 125, HOUSE_W - 8, 1)
    rect(ctx, 'n', x + 4, 126, HOUSE_W - 8, 4)
    rect(ctx, 'N', x + 4, 130, HOUSE_W - 8, 21)
    rect(ctx, 'k', x + 20, 86, 42, 30)
    rect(ctx, 's', x + 21, 87, 40, 28)
    toolScreen(ctx, h.tool, x + 23, 89, 36, 24, n + i * 17, i === 0)
    rect(ctx, 'k', x + 38, 116, 6, 9)
    rect(ctx, 's', x + 39, 116, 4, 9)
    // person from behind
    disc(ctx, 'k', x + 22, 118, 7)
    disc(ctx, ['y', 'N', 'k', 'O'][i], x + 22, 118, 6)
    rect(ctx, 'k', x + 10, 125, 25, 26)
    rect(ctx, ['G', 'p', 'r', 'y'][i], x + 11, 126, 23, 25)
    // label plate
    // label up on the wall, clear of the caption bar at the bottom
    const lw = measure(h.tool) + 8
    rect(ctx, 'k', x + HOUSE_W / 2 - lw / 2 - 1, 67, lw + 2, 13)
    rect(ctx, 'W', x + HOUSE_W / 2 - lw / 2, 68, lw, 11)
    drawText(ctx, h.tool, x + HOUSE_W / 2 - lw / 2 + 4, 70, { color: 'k' })
}

function homes(ctx, f, scene, n) {
    ditherGradient(ctx, 0, 0, W, 60, [
        [0, 'k'],
        [1, 'd'],
    ])
    stars(ctx, n, 30, 40)
    rect(ctx, 'd', 0, 60, W, H)
    rect(ctx, 'g', 0, 151, W, 29)
    HOUSES.forEach((h, i) => house(ctx, h, i, n))
    // Bit waits on the first desk with the crate
    drawAgent(ctx, 'bit', { x: 62, y: 125, moving: false, air: false, dir: -1 }, n)
    S.draw(ctx, S.crate(), 44, 118)
    for (const l of LAUNCHES) {
        // the person types their task (it appears letter by letter above their head), then their agent hops out
        if (n >= l.typeFrom && n < l.t) {
            const shown = l.task.slice(0, Math.max(1, Math.floor((n - l.typeFrom) * TASK_CPF)))
            bubble(ctx, shown, l.house * HOUSE_W + 22, 104)
        }
        if (n < l.t) continue
        const p = pathAt(l.keys, n)
        if (p.x > 330) continue
        drawAgent(ctx, l.tint, p, n, { seed: l.house * 3 + l.t })
    }
    HOUSES.forEach((h, i) => {
        const k = progress(n, h.on, h.on + 8)
        if (k >= 1) return
        // lights off: the house stays a dim silhouette until its owner sits down, then dithers up to full light
        ctx.fillStyle = '#151515'
        const x0 = i * HOUSE_W
        for (let y = 42; y < 152; y++)
            for (let x = x0; x < x0 + HOUSE_W; x++) if (bayer(x, y) >= Math.max(k, 0.3)) ctx.fillRect(x, y, 1, 1)
    })
    irisIn(ctx, f, 40, 110, 10)
}

// ================= BUSY: the pipe fills up =================
function busy(ctx, f, scene, n) {
    quietStore(ctx, n)
    blowingLeaves(ctx, n)
    pipe(ctx, n, true)
    for (const r of RUSH) {
        if (n < r.keys[0][0] || n > r.enter + 12) continue
        const p = pathAt(r.keys, n)
        drawAgent(ctx, r.tint, p, n, { seed: r.i, clipY: n >= r.enter - 2 ? PIPE.rim + 1 : null })
    }
    pipeRim(ctx)
    // A few agents announce their task on the way in
    for (const r of RUSH.filter((r) => r.i % 4 === 0)) {
        const p = pathAt(r.keys, n)
        if (n >= r.enter - 34 && n < r.enter - 12 && p.x > 10 && p.x < 300)
            bubble(ctx, ['get usage', 'refund order', 'add seat', 'export data'][r.i / 4], p.x, p.y - S.AGENT_H - 2)
    }
    irisIn(ctx, f, PIPE.x, PIPE.rim, 10)
}

// ================= DESK2: the dev sees nothing =================
function emptyFunnel(ctx, b) {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;[100, 64, 38].forEach((pct, i) => {
        const full = Math.round((118 * pct) / 100)
        const by = b.y + 2 + i * 15
        const bx = b.x + 60 - Math.round(full / 2)
        for (let x = 0; x < full; x += 3) {
            px(ctx, 'S', bx + x, by)
            px(ctx, 'S', bx + x, by + 11)
        }
        for (let y = 0; y < 12; y += 3) {
            px(ctx, 'S', bx, by + y)
            px(ctx, 'S', bx + full - 1, by + y)
        }
        drawText(ctx, '0%', bx + Math.round(full / 2) - 4, by + 3, { color: 's' })
    })
}
function emptyReplay(ctx, b) {
    rect(ctx, 'S', b.x, b.y, b.w, b.h - 12)
    rect(ctx, 'w', b.x + 1, b.y + 1, b.w - 2, b.h - 14)
    const msg = 'No recordings'
    drawText(ctx, msg, b.x + Math.round((b.w - measure(msg)) / 2), b.y + 22, { color: 's' })
    const py = b.y + b.h - 9
    rect(ctx, 'd', b.x, py, b.w, 9)
    rect(ctx, 's', b.x + 3, py + 2, 1, 5)
    rect(ctx, 's', b.x + 4, py + 3, 1, 3)
    px(ctx, 's', b.x + 5, py + 4)
    rect(ctx, 'g', b.x + 10, py + 4, b.w - 20, 1)
}
function desk2(ctx, f, scene, n) {
    ctx.drawImage(room(), 0, 0)
    windowCloud(ctx, n)
    monitorFrame(ctx)
    const replay = n >= DESK2.replay
    const b = appChrome(ctx, replay ? 1 : 0)
    tabCursor(ctx, b, n, DESK2.replay - 8, 1)
    if (replay) emptyReplay(ctx, b)
    else {
        emptyFunnel(ctx, b)
        const zero = '0 visitors'
        drawText(ctx, zero, SCR.x + Math.round((SCR.w - measure(zero) * 2) / 2), SCR.y + SCR.h - 22, {
            scale: 2,
            color: 'k',
            shadow: 'S',
        })
    }
    rect(ctx, 'k', KEYS.x, KEYS.y, KEYS.w, 5)
    rect(ctx, 'S', KEYS.x + 1, KEYS.y, KEYS.w - 2, 3)
    shipButton(ctx, 0)
    const slump = n >= DESK2.question ? 2 : 0
    ctx.drawImage(devSprite(), DEV.x, DEV.y + slump)
    if (n >= DESK2.question) headBubble(ctx, n - DESK2.question, 'question')
    irisIn(ctx, f, 200, 64, 12)
    irisOut(ctx, f, scene.end - scene.start, 200, 64, 10)
}

// A bubble over the dev's head: a '?' when he can't see, a smile when he can. k is frames since it appeared.
export function headBubble(ctx, k, mood) {
    const bob = Math.round(Math.sin(k / 6) * 2)
    const bx = DEV.x + 50,
        by = DEV.y - 36 + bob
    rect(ctx, 'k', bx - 1, by, 22, 22)
    rect(ctx, 'k', bx, by - 1, 20, 24)
    rect(ctx, 'W', bx, by, 20, 22)
    rect(ctx, 'k', bx + 2, by + 22, 4, 3)
    rect(ctx, 'W', bx + 3, by + 21, 2, 2)
    if (mood === 'question') {
        const size = k < 3 ? 1 : 2
        drawText(ctx, '?', bx + 10 - (size === 2 ? 5 : 2), by + 11 - (size === 2 ? 7 : 3), { scale: size, color: 'b' })
        return
    }
    disc(ctx, 'y', bx + 10, by + 11, k < 3 ? 5 : 8)
    if (k < 3) return
    rect(ctx, 'k', bx + 6, by + 7, 2, 3)
    rect(ctx, 'k', bx + 12, by + 7, 2, 3)
    rect(ctx, 'k', bx + 5, by + 13, 1, 2)
    rect(ctx, 'k', bx + 14, by + 13, 1, 2)
    rect(ctx, 'k', bx + 6, by + 15, 8, 1)
}

export const RENDERERS_L2 = { home, street, tunnel, homes, busy, desk2 }

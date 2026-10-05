import {
    TITLE,
    CARD,
    cardLetterLand,
    ARRIVALS,
    personAt,
    DOOR_X,
    STREET_Y,
    DESK,
    loopTiming,
    loopRevs,
    LOOP_NODES,
} from './timeline.js'
import { drawText, drawLogoText, measure, textWidth } from './font.js'
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
    tri,
    progress,
    easeOut,
    easeIn,
    lerp,
    clamp01,
} from './fx.js'
import * as S from './sprites.js'
import { panel } from './ui.js'

const SUBTITLE = 'AN 8-BIT TALE'
export const center = (text, scale = 1, spacing = 1) => Math.round((W - textWidth(text, scale, spacing)) / 2)

// ================= TITLE =================
function nightSky() {
    return cached('night', W, H, (c) => {
        ditherGradient(c, 0, 0, W, 140, [
            [0, 'k'],
            [0.35, 'd'],
            [0.75, 'B'],
            [1, 'b'],
        ])
        // Moon
        disc(c, 'Y', 262, 30, 11)
        disc(c, 'w', 265, 28, 8)
        ;[
            [259, 31, 'Y'],
            [262, 34, 'Y'],
            [267, 25, 'S'],
        ].forEach(([x, y, k]) => rect(c, k, x, y, 2, 2))
    })
}
function hills(ctx, f) {
    const far = Math.floor(f * 0.15)
    const near = Math.floor(f * 0.4)
    for (let x = 0; x < W; x++) {
        const hf = 112 + Math.round(8 * Math.sin((x + far) / 23) + 5 * Math.sin((x + far) / 9))
        rect(ctx, 'd', x, hf, 1, H - hf)
        const hn = 132 + Math.round(5 * Math.sin((x + near) / 31) + 3 * Math.sin((x + near) / 13))
        rect(ctx, 'H', x, hn, 1, H - hn)
        px(ctx, 'G', x, hn)
    }
    rect(ctx, 'k', 0, 158, W, 22)
    rect(ctx, 'H', 0, 157, W, 1)
}
export function stars(ctx, f, n = 50, maxY = 110) {
    for (let i = 0; i < n; i++) {
        const x = Math.floor(hash(i, 1) * W)
        const y = Math.floor(hash(i, 2) * maxY)
        const tw = Math.sin(f / 9 + i * 1.7)
        if (tw > 0.85 && i % 5 === 0) sparkle(ctx, x, y, 1, 'w')
        else px(ctx, tw > -0.3 ? 'w' : 's', x, y)
    }
}

function title(ctx, f) {
    ctx.drawImage(nightSky(), 0, 0)
    stars(ctx, f)
    hills(ctx, f)

    // Idle walker crossing the foreground
    const wx = -12 + Math.floor(f * 0.9)
    const walker = S.person(2, Math.floor(wx / 4))
    S.draw(ctx, walker.spr, wx, 143 + walker.bob)

    // Logo drops with gravity, lands, one small bounce, then idles
    const logo = 'MCP ANALYTICS'
    const lx = center(logo, 3)
    let ly = 34
    if (f < TITLE.land) ly = lerp(-30, 34, easeIn(progress(f, TITLE.drop, TITLE.land)))
    else if (f < TITLE.land + 10) ly = 34 - Math.round(5 * Math.sin((Math.PI * (f - TITLE.land)) / 10))
    else ly = 34 + Math.round(Math.sin((f - TITLE.land) / 14))
    if (f >= TITLE.drop) drawLogoText(ctx, logo, lx, Math.round(ly), { scale: 3 })

    // Ribbon banner
    if (f >= TITLE.banner) {
        const k = easeOut(progress(f, TITLE.banner, TITLE.banner + 7))
        const bw = Math.round(Math.max(118, textWidth(SUBTITLE, 2) + 16) * k)
        const bx = 160 - Math.round(bw / 2)
        const by = 70
        if (bw > 8) {
            // folded tails
            rect(ctx, 'k', bx - 10, by + 4, 14, 16)
            rect(ctx, 'B', bx - 9, by + 5, 12, 14)
            rect(ctx, 'k', bx + bw - 4, by + 4, 14, 16)
            rect(ctx, 'B', bx + bw - 3, by + 5, 12, 14)
            for (let i = 0; i < 4; i++) {
                rect(ctx, 'k', bx - 10 + i, by + 8 + i, 1, 8 - i * 2)
                rect(ctx, 'k', bx + bw + 9 - i, by + 8 + i, 1, 8 - i * 2)
            }
            rect(ctx, 'k', bx, by, bw, 20)
            rect(ctx, 'b', bx + 1, by + 1, bw - 2, 18)
            rect(ctx, 'c', bx + 1, by + 1, bw - 2, 2)
            rect(ctx, 'B', bx + 1, by + 17, bw - 2, 2)
        }
        if (k >= 1) drawText(ctx, SUBTITLE, center(SUBTITLE, 2), by + 3, { scale: 2, color: 'W', shadow: 'B' })
    }
    // Twinkles around the logo
    if (f > TITLE.land)
        for (let i = 0; i < 5; i++) {
            const phase = (f + i * 13) % 40
            if (phase < 10)
                sparkle(ctx, Math.floor(40 + hash(i, 7) * 240), Math.floor(26 + hash(i, 8) * 50), phase < 5 ? 2 : 1)
        }

    // PRESS START: slow blink, then fast after the press
    if (f >= TITLE.blinkFrom && f < TITLE.irisFrom + 6) {
        const pressed = f >= TITLE.press
        const on = pressed ? Math.floor(f / 2) % 2 === 0 : Math.floor((f - TITLE.blinkFrom) / 15) % 2 === 0
        if (on)
            drawText(ctx, 'PRESS START', center('PRESS START', 1, 2), 112, {
                color: pressed ? 'y' : 'w',
                shadow: 'k',
                spacing: 2,
            })
    }
    drawText(ctx, '© 2026 PostHog', center('© 2026 PostHog'), 166, { color: 's' })

    if (f >= TITLE.irisFrom) {
        const r = Math.round(lerp(200, 0, easeIn(progress(f, TITLE.irisFrom, TITLE.irisTo))))
        iris(ctx, 160, 80, r)
    }
}

// ================= LEVEL CARD =================
function card(ctx, f, scene) {
    rect(ctx, 'k', 0, 0, W, H)
    stars(ctx, f + 200, 30, 180)
    const len = scene.end - scene.start
    const tx = center(scene.title, 3)
    ;[...scene.title].forEach((ch, i) => {
        const land = cardLetterLand(i)
        if (ch === ' ' || f < land - CARD.fall) return
        const y =
            f < land
                ? Math.round(lerp(-24, 58, easeIn(progress(f, land - CARD.fall, land))))
                : 58 - (f < land + 4 ? [0, 3, 2, 1][f - land] : 0)
        drawLogoText(ctx, ch, tx + textWidth(scene.title.slice(0, i), 3) + (i ? 3 : 0), y, { scale: 3 })
    })
    const sub = scene.subtitle
    const sx = center(sub, 2)
    ;[...sub].forEach((ch, i) => {
        const at = CARD.subFrom + i * CARD.subGap
        if (ch === ' ' || f < at) return
        drawText(ctx, ch, sx + textWidth(sub.slice(0, i), 2) + (i ? 2 : 0), 96 - (f < at + 2 ? 2 : 0), {
            scale: 2,
            color: f < at + 2 ? 'y' : 'w',
            shadow: 'O',
        })
    })
    const lw = Math.round(
        easeOut(progress(f, CARD.subFrom, CARD.subFrom + sub.length * CARD.subGap)) * (textWidth(sub, 2) / 2 + 6)
    )
    if (lw > 0) {
        rect(ctx, 'o', 160 - lw, 118, lw * 2, 1)
        px(ctx, 'y', 160 - lw - 3, 118)
        px(ctx, 'y', 160 + lw + 2, 118)
    }
    if (f >= len - 8) iris(ctx, 160, 90, Math.round(lerp(200, 0, easeIn(progress(f, len - 8, len - 1)))))
}

// ================= STOREFRONT =================
export const SHOP = { x: 92, y: 56, w: 136, base: 144 }
export function daySky() {
    return cached('day', W, H, (c) => {
        ditherGradient(c, 0, 0, W, 120, [
            [0, 'c'],
            [0.7, 'C'],
            [1, 'w'],
        ])
        // distant city
        for (let i = 0; i < 16; i++) {
            const x = i * 21 - 6 + Math.floor(hash(i, 5) * 8)
            const h = 18 + Math.floor(hash(i, 6) * 30)
            const w = 14 + Math.floor(hash(i, 7) * 10)
            rect(c, 'S', x, 120 - h, w, h)
            for (let wy = 120 - h + 4; wy < 116; wy += 5)
                for (let wx = x + 3; wx < x + w - 2; wx += 4) px(c, 'C', wx, wy)
        }
        ditherGradient(c, 0, 116, W, 28, [
            [0, 'L'],
            [0.35, 'G'],
            [1, 'H'],
        ])
    })
}
export function clouds(ctx, f) {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;[
        [20, 14, 0.12],
        [150, 6, 0.08],
        [250, 22, 0.1],
    ].forEach(([x0, y, v]) => {
        const x = ((Math.floor(x0 + f * v) + 40) % (W + 60)) - 40
        S.draw(ctx, S.cloud(), x, y)
    })
}
function street() {
    return cached('street', W, H, (c) => {
        rect(c, 'S', 0, SHOP.base, W, 14)
        rect(c, 'W', 0, SHOP.base, W, 1)
        for (let x = 0; x < W; x += 16) rect(c, 's', x, SHOP.base + 1, 1, 13)
        rect(c, 's', 0, SHOP.base + 7, W, 1)
        rect(c, 'g', 0, SHOP.base + 14, W, 2)
        rect(c, 'k', 0, SHOP.base + 16, W, 1)
        rect(c, 'd', 0, SHOP.base + 17, W, H)
        for (let x = 4; x < W; x += 24) rect(c, 'y', x, 170, 12, 2)
    })
}
// The customer's shop and PostHog's are the same building in different colours: neither side is bigger than the other.
// awning: [stripe, base, stripe shade, base shade]; cornice: [body, top edge]
const SHOP_STYLES = {
    customer: {
        wall: 'w',
        siding: 'S',
        cornice: ['O', 'o'],
        board: 'd',
        awning: ['o', 'w', 'O', 'S'],
        label: 'YOUR PRODUCT',
    },
    posthog: {
        wall: 'd',
        siding: 'g',
        cornice: ['o', 'y'],
        board: 'k',
        awning: ['b', 'y', 'B', 'O'],
        label: 'PostHog',
        logo: true,
    },
}
function storefront(owner) {
    const { wall, siding, cornice, board, awning } = SHOP_STYLES[owner]
    return cached(`shop-${owner}`, W, H, (c) => {
        const { x, y, w, base } = SHOP
        // Body
        rect(c, 'k', x - 1, y + 8, w + 2, base - y - 8)
        rect(c, wall, x, y + 9, w, base - y - 9)
        for (let yy = y + 12; yy < base; yy += 4) rect(c, siding, x, yy, w, 1)
        // Roof cornice
        rect(c, 'k', x - 5, y + 2, w + 10, 9)
        rect(c, cornice[0], x - 4, y + 3, w + 8, 7)
        rect(c, cornice[1], x - 4, y + 3, w + 8, 2)
        for (let i = x - 2; i < x + w + 2; i += 6) rect(c, 'O', i, y + 7, 3, 3)
        // Sign board
        rect(c, 'k', x + 10, y + 13, w - 20, 19)
        rect(c, board, x + 11, y + 14, w - 22, 17)
        // Awning, striped, scalloped
        const ay = y + 38
        rect(c, 'k', x - 4, ay - 1, w + 8, 1)
        for (let i = 0; i < w + 8; i++) {
            const stripe = Math.floor(i / 6) % 2 ? awning[0] : awning[1]
            rect(c, stripe, x - 4 + i, ay, 1, 9)
            const sc = Math.floor(i / 6) % 2 ? awning[2] : awning[3]
            rect(c, sc, x - 4 + i, ay + 7, 1, 2)
            const r = i % 6
            const dip = r === 0 || r === 5 ? 0 : r === 1 || r === 4 ? 2 : 3
            rect(c, stripe, x - 4 + i, ay + 9, 1, dip)
            px(c, 'k', x - 4 + i, ay + 9 + dip)
        }
        rect(c, 'S', x, ay + 12, w, 2)
        // Windows
        const wy = ay + 17
        const wh = base - wy - 8
        for (const wx of [x + 8, x + w - 48]) {
            rect(c, 'k', wx - 1, wy - 1, 42, wh + 2)
            rect(c, 'n', wx, wy, 40, wh)
            rect(c, 'c', wx + 2, wy + 2, 36, wh - 4)
            rect(c, 'C', wx + 2, wy + 2, 36, 3)
            // shelf with products (the left window holds the OPEN sign instead)
            rect(c, 'N', wx + 2, wy + wh - 6, 36, 2)
            if (wx > x + 8)
                [
                    ['o', 4],
                    ['y', 11],
                    ['b', 18],
                    ['r', 25],
                    ['G', 31],
                ].forEach(([k, dx], i) => {
                    const hh = 5 + (i % 2) * 2
                    rect(c, 'k', wx + dx - 1, wy + wh - 6 - hh - 1, 6, hh + 1)
                    rect(c, k, wx + dx, wy + wh - 6 - hh, 4, hh)
                    px(c, 'W', wx + dx, wy + wh - 6 - hh)
                })
            // glass glint
            if (wx > x + 8)
                for (let i = 0; i < 8; i++) {
                    px(c, 'W', wx + 26 + i, wy + 3 + i)
                    px(c, 'W', wx + 29 + i, wy + 3 + i)
                }
            rect(c, 'k', wx - 2, wy + wh + 1, 44, 1)
            rect(c, 'S', wx - 2, wy + wh + 2, 44, 2)
        }
        // OPEN sign in the left window
        const ox = x + 12
        rect(c, 'k', ox + 2, wy + 5, 29, 11)
        rect(c, 'r', ox + 3, wy + 6, 27, 9)
        drawText(c, 'OPEN', ox + 5, wy + 7, { color: 'W' })
        px(c, 'y', ox + 15, wy + 2)
        px(c, 'k', ox + 10, wy + 4)
        px(c, 'k', ox + 21, wy + 4)
        // Door frame
        const dx = DOOR_X - 11
        rect(c, 'k', dx - 2, wy - 5, 26, base - wy + 5)
        rect(c, 'N', dx - 1, wy - 4, 24, base - wy + 4)
        // Step
        rect(c, 'k', dx - 5, base - 3, 32, 4)
        rect(c, 'S', dx - 4, base - 3, 30, 2)
        rect(c, 'W', dx - 4, base - 3, 30, 1)
        // Wall base
        rect(c, 'g', x, base - 3, dx - 5 - x, 3)
        rect(c, 'g', dx + 27, base - 3, x + w - dx - 27, 3)
    })
}
export function door(ctx, open) {
    const { base } = SHOP
    const wy = SHOP.y + 38 + 17
    const dx = DOOR_X - 11
    const top = wy - 3
    const h = base - 3 - top
    if (open) {
        rect(ctx, 'y', dx, top, 22, h)
        rect(ctx, 'Y', dx + 2, top + 2, 18, h - 10)
        rect(ctx, 'o', dx, top + h - 6, 22, 6)
        rect(ctx, 'n', dx, top, 5, h)
        rect(ctx, 'N', dx + 4, top, 1, h)
        rect(ctx, 'C', dx + 1, top + 3, 2, 10)
        return
    }
    rect(ctx, 'n', dx, top, 22, h)
    rect(ctx, 'N', dx, top, 22, 1)
    rect(ctx, 'k', dx + 3, top + 3, 16, 14)
    rect(ctx, 'c', dx + 4, top + 4, 14, 12)
    rect(ctx, 'C', dx + 4, top + 4, 14, 3)
    for (let i = 0; i < 5; i++) px(ctx, 'W', dx + 11 + i, top + 5 + i)
    rect(ctx, 'N', dx + 3, top + 20, 16, 1)
    rect(ctx, 'N', dx + 3, top + 20, 1, h - 23)
    rect(ctx, 'N', dx + 18, top + 20, 1, h - 23)
    rect(ctx, 'y', dx + 17, top + 17, 2, 2)
}
function marquee(ctx, n, { label, logo }) {
    const { x, y, w } = SHOP
    const bulbs = []
    for (let i = x + 12; i < x + w - 11; i += 4) bulbs.push([i, y + 14], [i, y + 30])
    bulbs.forEach(([bx, by], i) => px(ctx, (Math.floor(n / 4) + i) % 3 === 0 ? 'W' : 'y', bx, by))
    const logoW = logo ? 22 : 0,
        tx = center(label) + logoW / 2
    if (logo) S.draw(ctx, S.hedgehog('idle', n % 90 < 4), tx - logoW, y + 16)
    drawText(ctx, label, tx, y + 19, { color: 'y', shadow: 'O' })
}

export function storeBackdrop(ctx, n, { rightProps = true, owner = 'customer' } = {}) {
    ctx.drawImage(daySky(), 0, 0)
    clouds(ctx, n)
    S.draw(ctx, S.tree(Math.floor(n / 20)), 28, 124)
    S.draw(ctx, S.tree(Math.floor(n / 20) + 1), 268, 122)
    S.draw(ctx, S.bush(), 60, 139)
    if (rightProps) S.draw(ctx, S.bush(), 244, 139)
    ctx.drawImage(storefront(owner), 0, 0)
    ctx.drawImage(street(), 0, 0)
    marquee(ctx, n, SHOP_STYLES[owner])
    S.draw(ctx, S.potPlant(), DOOR_X - 24, SHOP.base - 12)
    S.draw(ctx, S.potPlant(), DOOR_X + 16, SHOP.base - 12)
    S.draw(ctx, S.lamp(), 76, SHOP.base - 22)
    if (rightProps) S.draw(ctx, S.lamp(), 238, SHOP.base - 22)
}

// Level 2's shop: still open, just quiet. The final beat shows the same shop without any of this.
const SALE = {
    S: ['111', '100', '111', '001', '111'],
    A: ['010', '101', '111', '101', '101'],
    L: ['100', '100', '100', '100', '111'],
    E: ['111', '100', '110', '100', '111'],
}
export function quietStore(ctx, n) {
    storeBackdrop(ctx, n, { rightProps: false })
    door(ctx, false)
    const { x, y, w } = SHOP,
        wy = y + 55
    for (const [bx, by] of [
        [x + 40, y + 14],
        [x + 96, y + 30],
    ])
        px(ctx, 's', bx, by)
    const ox = x + 12
    if (hash(Math.floor(n / 3), 11) > 0.8 || n % 97 < 5) {
        rect(ctx, 'N', ox + 3, wy + 6, 27, 9)
        drawText(ctx, 'OPEN', ox + 5, wy + 7, { color: 'O' })
        px(ctx, 'g', ox + 15, wy + 2)
    }
    // faded SALE poster, its top right corner peeling forward
    const px0 = x + w - 45,
        py0 = wy + 3
    rect(ctx, 'S', px0 - 1, py0 - 1, 25, 11)
    rect(ctx, 'Y', px0, py0, 23, 9)
    ;[...'SALE'].forEach((ch, i) =>
        SALE[ch].forEach((row, r) =>
            [...row].forEach((v, c) => v === '1' && px(ctx, 'T', px0 + 2 + i * 4 + c, py0 + 2 + r))
        )
    )
    for (let r = 0; r <= 5; r++)
        for (let c = 0; c <= 5; c++) {
            const at = [px0 + 23 - c, py0 - 1 + r]
            if (c + r <= 4) px(ctx, 'c', ...at)
            else if (c + r === 5) px(ctx, 'S', ...at)
            else px(ctx, c === 5 || r === 5 ? 'k' : 'w', ...at)
        }
    // cobweb in the door frame's top left corner
    const cx = DOOR_X - 11,
        cy = wy - 3
    ;[
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
        [3, 0],
        [5, 0],
        [6, 0],
        [0, 3],
        [0, 5],
        [0, 6],
        [2, 1],
        [1, 2],
        [5, 1],
        [4, 2],
        [2, 4],
        [1, 5],
    ].forEach(([dx, dy]) => px(ctx, 'S', cx + dx, cy + dy))
    // the users counter stopped where Level 1 left it, gathering dust
    const hx = hud(ctx, ARRIVALS.length, 999)
    const t = n % 70
    if (t < 18)
        for (let i = 0; i < 5; i++)
            px(ctx, i % 2 ? 's' : 'S', hx + 13 + i * 3 + Math.round(((i - 2) * t) / 8), 9 - Math.round(t / 4) - (i % 2))
}

// Sized from its label; without an x it sits against the right edge.
export function hud(ctx, count, sinceBump, { label = 'users', x = null, y = 6 } = {}) {
    const w = 34 + measure(label)
    x ??= W - w - 4
    panel(ctx, x, y, w, 17, { fill: 'd', bevel: 'g', edge: 'k' })
    S.draw(ctx, S.coin(0), x + 5, y + 5)
    const bump = sinceBump < 4 ? -1 : 0
    drawText(ctx, String(count).padStart(2, '0'), x + 15, y + 5 + bump, { color: sinceBump < 8 ? 'y' : 'W' })
    drawText(ctx, label, x + 30, y + 5, { color: 'S' })
    return x
}

function store(ctx, f, scene, n) {
    storeBackdrop(ctx, n)
    const doorOpen = ARRIVALS.some((p) => n >= p.arrive - 8 && n < p.arrive + 8)
    door(ctx, doorOpen)

    const walkers = ARRIVALS.map((p) => ({ p, s: personAt(p, n) })).filter(({ s }) => !s.inside && s.onScreen)
    walkers.sort((a, b) => a.p.arrive - b.p.arrive)
    for (const { p, s } of walkers) {
        const { spr, bob } = S.person(p.variant, s.step)
        const near = p.arrive - n
        const lift = near < 6 ? Math.round((6 - near) / 2) : 0
        S.draw(ctx, spr, s.x - 4, STREET_Y - 14 + bob - lift, { flip: s.dir < 0 })
    }

    // Signup pops
    let count = 0
    let lastArrive = -99
    for (const p of ARRIVALS) {
        if (n < p.arrive) continue
        count++
        lastArrive = p.arrive
        const t = n - p.arrive
        if (t > 34) continue
        const rise = Math.round(easeOut(t / 20) * 16)
        const cy = SHOP.y + 48 - rise
        const side = ARRIVALS.indexOf(p) % 2 ? -1 : 1
        const cx = DOOR_X + side * 26
        S.draw(ctx, S.coin(Math.floor(t / 3)), cx - 3, cy)
        if (t < 8)
            for (let i = 0; i < 4; i++) {
                const a = (i / 4) * Math.PI * 2 + 0.6
                sparkle(ctx, cx + Math.round(Math.cos(a) * (6 + t)), cy + 3 + Math.round(Math.sin(a) * (6 + t)), 1)
            }
        const label = '+1 user'
        if (t < 28 || t % 4 < 2)
            drawText(ctx, label, side > 0 ? cx + 7 : cx - 6 - measure(label), cy, { color: 'y', outline: 'k' })
    }
    hud(ctx, count, n - lastArrive)

    const len = scene.end - scene.start
    if (f < 10) iris(ctx, DOOR_X, 110, Math.round(lerp(0, 200, easeOut(f / 10))))
    if (f >= len - 14) iris(ctx, DOOR_X, 110, Math.round(lerp(200, 0, easeIn(progress(f, len - 14, len - 2)))))
}

// ================= DESK =================
export const MON = { x: 122, y: 12, w: 172, h: 104 }
export const SCR = { x: MON.x + 4, y: MON.y + 4, w: MON.w - 8, h: MON.h - 8 }
const BTN = { x: 112, y: 120 }
export const KEYS = { x: MON.x + 50, y: 129, w: 74 }
export const DEV = { x: 22, y: 94 }

export function room() {
    return cached('room', W, H, (c) => {
        rect(c, 'Y', 0, 0, W, 132)
        for (let yy = 4; yy < 100; yy += 8) for (let xx = (yy / 8) % 2 ? 4 : 0; xx < W; xx += 8) px(c, 'y', xx, yy)
        rect(c, 'k', 0, 99, W, 1)
        rect(c, 'n', 0, 100, W, 32)
        for (let xx = 0; xx < W; xx += 20) rect(c, 'N', xx, 100, 1, 32)
        rect(c, 'Y', 0, 100, W, 1)
        // window with sky
        rect(c, 'k', 10, 12, 64, 58)
        rect(c, 'W', 11, 13, 62, 56)
        ditherGradient(c, 14, 16, 56, 50, [
            [0, 'c'],
            [1, 'C'],
        ])
        rect(c, 'W', 41, 16, 2, 50)
        rect(c, 'W', 14, 40, 56, 2)
        rect(c, 'k', 8, 70, 68, 3)
        rect(c, 'n', 9, 70, 66, 2)
        // clock
        disc(c, 'k', 98, 26, 9)
        disc(c, 'w', 98, 26, 8)
        rect(c, 'k', 98, 20, 1, 7)
        rect(c, 'k', 98, 26, 5, 1)
        // desk
        rect(c, 'k', 0, 127, W, 1)
        rect(c, 'n', 0, 128, W, 6)
        rect(c, 'y', 0, 128, W, 1)
        rect(c, 'N', 0, 134, W, 46)
        rect(c, 'k', 0, 134, W, 1)
        for (const xx of [150, 236]) {
            rect(c, 'k', xx, 140, 70, 1)
            rect(c, 'k', xx, 140, 1, 40)
            rect(c, 'k', xx + 69, 140, 1, 40)
            rect(c, 'y', xx + 30, 146, 10, 2)
            rect(c, 'k', xx, 160, 70, 1)
            rect(c, 'y', xx + 30, 166, 10, 2)
        }
    })
}

export function windowCloud(ctx, n) {
    const x = 14 + ((Math.floor(n * 0.15) % 70) - 20)
    ctx.save()
    ctx.beginPath()
    ctx.rect(14, 16, 56, 50)
    ctx.clip()
    S.draw(ctx, S.cloud(), x, 24)
    ctx.restore()
}

export function monitorFrame(ctx) {
    const { x, y, w, h } = MON
    const sx = x + Math.round(w / 2) - 7
    rect(ctx, 'k', sx, y + h + 1, 14, 10)
    rect(ctx, 'g', sx + 1, y + h + 1, 12, 9)
    rect(ctx, 'k', sx - 14, 125, 42, 3)
    rect(ctx, 'g', sx - 13, 125, 40, 2)
    rect(ctx, 'k', x - 1, y - 1, w + 2, h + 2)
    rect(ctx, 'g', x, y, w, h)
    rect(ctx, 's', x, y, w, 1)
    rect(ctx, 'k', SCR.x - 1, SCR.y - 1, SCR.w + 2, SCR.h + 2)
    px(ctx, 'G', x + w - 6, y + h - 3)
}

const TABS = ['Funnel', 'Replay', 'A/B test']
// A cursor glides to the next tab and clicks it just before the switch, so tab changes are motivated.
// One pointer per screen: it starts where the screen's own cursor last was (`from`), if it has one.
export function tabCursor(ctx, b, n, clickAt, tabIndex, from = [b.x + b.w - 20, b.y + b.h - 10]) {
    if (n < clickAt - 14 || n >= clickAt + 8) return
    const tab = b.tabs[tabIndex]
    const t = easeOut(progress(n, clickAt - 14, clickAt))
    const cx = Math.round(lerp(from[0], tab.x + tab.w / 2, t)),
        cy = Math.round(lerp(from[1], tab.y + 5, t))
    if (n >= clickAt && n < clickAt + 6)
        for (let a = 0; a < 12; a++)
            px(
                ctx,
                'o',
                cx + Math.round(Math.cos(a * 0.52) * (2 + n - clickAt)),
                cy + Math.round(Math.sin(a * 0.52) * (2 + n - clickAt))
            )
    S.draw(ctx, S.cursor(), cx, cy)
}
// Analytics app window on the office monitor; returns the content rect under the tabs.
export function appChrome(ctx, active, tabs = TABS) {
    const { x, y, w, h } = SCR
    rect(ctx, 'w', x, y, w, h)
    rect(ctx, 'd', x, y, w, 9)
    ;[
        ['r', 4],
        ['y', 9],
        ['G', 14],
    ].forEach(([k, dx]) => rect(ctx, k, x + dx, y + 3, 3, 3))
    let tx = x + 4
    const ty = y + 11
    const tabRects = []
    rect(ctx, 'S', x, ty + 10, w, 1)
    tabs.forEach((label, i) => {
        const tw = measure(label) + 8
        tabRects.push({ x: tx, y: ty, w: tw })
        const on = i === active
        rect(ctx, on ? 'W' : 'S', tx, ty, tw, 10)
        if (on) rect(ctx, 'o', tx, ty + 9, tw, 2)
        drawText(ctx, label, tx + 4, ty + 2, { color: on ? 'k' : 'g' })
        tx += tw + 2
    })
    return { x: x + 4, y: ty + 14, w: w - 8, h: h - 29, tabs: tabRects }
}

function app(ctx, n) {
    const starts = [DESK.funnel, DESK.replay, DESK.ab]
    const i = Math.max(0, starts.filter((at) => n >= at).length - 1)
    const body = appChrome(ctx, i)
    ;[funnelView, replayView, abView][i](ctx, body, n - starts[i], n)
    // The Replay tab shows two pointers on purpose: the recorded user's inside the replay, the dev's resting on the tab strip.
    const replayTab = [body.tabs[1].x + body.tabs[1].w - 6, body.tabs[1].y + 6]
    if (n >= DESK.tabClicks[0] + 8 && n < DESK.tabClicks[1] - 14) S.draw(ctx, S.cursor(), ...replayTab)
    DESK.tabClicks.forEach((c, k) => tabCursor(ctx, body, n, c, k + 1, k === 1 ? replayTab : undefined))
}

function funnelView(ctx, b, t) {
    const steps = [
        ['Visit', 100],
        ['Sign up', 64],
        ['Buy', 21],
    ]
    const gap = 6,
        from = DESK.barsDone - DESK.funnel - steps.length * gap
    const labelX = b.x + b.w - Math.max(...steps.map(([label]) => measure(label))) - 2,
        barW = labelX - b.x - 6
    steps.forEach(([label, pct], i) => {
        const k = easeOut(progress(t, from + i * gap, from + (i + 1) * gap))
        if (k <= 0) return
        const full = Math.round((barW * pct) / 100)
        const bw = Math.max(2, Math.round(full * k))
        const by = b.y + 2 + i * 15
        const bx = b.x + 1 + Math.round((barW - bw) / 2)
        rect(ctx, 'B', bx, by + 1, bw, 12)
        rect(ctx, 'b', bx, by, bw, 12)
        rect(ctx, 'c', bx, by, bw, 2)
        if (k >= 1) {
            drawText(ctx, label, labelX, by + 2, { color: 'k' })
            drawText(ctx, `${pct}%`, bx + Math.round(bw / 2) - Math.round(measure(`${pct}%`) / 2), by + 3, {
                color: 'W',
            })
        }
    })
}

function replayView(ctx, b, t, n) {
    // A tiny web page being replayed
    rect(ctx, 'S', b.x, b.y, b.w, b.h - 12)
    rect(ctx, 'W', b.x + 1, b.y + 1, b.w - 2, b.h - 14)
    rect(ctx, 'o', b.x + 1, b.y + 1, b.w - 2, 6)
    rect(ctx, 'W', b.x + 4, b.y + 3, 10, 2)
    rect(ctx, 'y', b.x + 8, b.y + 12, 36, 28)
    rect(ctx, 'O', b.x + 8, b.y + 36, 36, 4)
    disc(ctx, 'o', b.x + 26, b.y + 24, 7)
    rect(ctx, 's', b.x + 54, b.y + 13, 60, 3)
    rect(ctx, 'S', b.x + 54, b.y + 20, 90, 2)
    rect(ctx, 'S', b.x + 54, b.y + 25, 80, 2)
    const [c1, c2] = DESK.clicks.map((c) => c - DESK.replay)
    const btn = { x: b.x + 54, y: b.y + 32, w: 34, h: 11 }
    const pressed = (t >= c1 && t < c1 + 4) || (t >= c2 && t < c2 + 4)
    rect(ctx, 'k', btn.x, btn.y + (pressed ? 1 : 0), btn.w, btn.h)
    rect(ctx, t >= c2 ? 'G' : 'b', btn.x + 1, btn.y + 1 + (pressed ? 1 : 0), btn.w - 2, btn.h - 3)
    const label = t >= c2 ? 'Paid!' : 'Buy'
    drawText(ctx, label, btn.x + Math.round((btn.w - measure(label)) / 2), btn.y + 2 + (pressed ? 1 : 0), {
        color: 'W',
    })
    // Cursor path: wander in, click, nudge, click again
    const keys = [
        [0, b.x + 140, b.y + 50],
        [c1 - 2, btn.x + 20, btn.y + 5],
        [c1 + 8, btn.x + 20, btn.y + 5],
        [c2 - 2, btn.x + 14, btn.y + 6],
        [99, btn.x + 60, btn.y + 16],
    ]
    let i = 0
    while (i < keys.length - 2 && t > keys[i + 1][0]) i++
    const [ta, xa, ya] = keys[i]
    const [tb, xb, yb] = keys[i + 1]
    const k = easeOut(progress(t, ta, tb))
    const cx = Math.round(lerp(xa, xb, k))
    const cy = Math.round(lerp(ya, yb, k)) + Math.round(Math.sin(t / 5) * (1 - k))
    ctx.save()
    ctx.beginPath()
    ctx.rect(b.x + 1, b.y + 1, b.w - 2, b.h - 14)
    ctx.clip()
    for (const c of [c1, c2]) {
        const r = t - c
        if (r >= 0 && r < 10) {
            const rr = 2 + r
            for (let a = 0; a < 16; a++)
                px(
                    ctx,
                    'o',
                    cx + Math.round(Math.cos((a / 16) * 6.283) * rr),
                    cy + Math.round(Math.sin((a / 16) * 6.283) * rr)
                )
        }
    }
    S.draw(ctx, S.replayCursor(), cx, cy)
    if (t < c1) {
        rect(ctx, 'k', cx + 7, cy - 8, measure('user') + 4, 9)
        drawText(ctx, 'user', cx + 9, cy - 7, { color: 'Y' })
    }
    ctx.restore()
    // Player bar
    const py = b.y + b.h - 9
    rect(ctx, 'd', b.x, py, b.w, 9)
    rect(ctx, 'W', b.x + 3, py + 2, 1, 5)
    rect(ctx, 'W', b.x + 4, py + 3, 1, 3)
    px(ctx, 'W', b.x + 5, py + 4)
    rect(ctx, 'g', b.x + 10, py + 4, b.w - 40, 1)
    rect(ctx, 'o', b.x + 10, py + 4, Math.round((b.w - 40) * clamp01(t / 68)), 1)
    if (Math.floor(n / 10) % 2) px(ctx, 'r', b.x + b.w - 26, py + 4)
    drawText(ctx, 'REC', b.x + b.w - 22, py + 1, { color: 'S' })
}

function abView(ctx, b, t, n) {
    const flipped = n >= DESK.flip
    ;[
        ['A', 31, 'g', 0],
        ['B', 44, 'G', 1],
    ].forEach(([label, pct, col, i]) => {
        const cx = b.x + 8 + i * 56
        const win = flipped && i === 1
        rect(ctx, win ? 'y' : 'S', cx - 1, b.y - 1, 50, 50)
        rect(ctx, 'W', cx, b.y, 48, 48)
        rect(ctx, 'k', cx + 3, b.y + 3, 11, 11)
        rect(ctx, i ? 'b' : 's', cx + 4, b.y + 4, 9, 9)
        drawText(ctx, label, cx + 6, b.y + 5, { color: 'W' })
        const grow = easeOut(progress(t, 6 + i * 6, 20 + i * 6))
        const bh = Math.round(pct * 0.66 * grow)
        rect(ctx, col, cx + 20, b.y + 44 - bh, 20, bh)
        if (grow >= 1)
            drawText(ctx, `${pct}%`, cx + 20 + Math.round((20 - measure(`${pct}%`)) / 2), b.y + 36 - bh, { color: 'k' })
        if (win) sparkle(ctx, cx + 45, b.y + 3, (Math.floor(n / 4) % 2) + 1, 'y')
    })
    if (flipped) drawText(ctx, 'B wins! Rolling it out.', b.x + 8, b.y + 56, { color: 'G' })
    // Feature flag toggle
    S.draw(ctx, S.flag(), b.x + 118, b.y + 2)
    drawText(ctx, 'Flag:', b.x + 116, b.y + 16, { color: 'g' })
    drawText(ctx, 'B on', b.x + 116, b.y + 26, { color: flipped ? 'G' : 'S' })
    const sw = { x: b.x + 118, y: b.y + 38 }
    const k = easeOut(progress(n, DESK.flip, DESK.flip + 5))
    rect(ctx, 'k', sw.x, sw.y, 20, 10)
    rect(ctx, k > 0.5 ? 'G' : 's', sw.x + 1, sw.y + 1, 18, 8)
    const kx = sw.x + 1 + Math.round(k * 10)
    rect(ctx, 'W', kx, sw.y + 1, 8, 8)
    rect(ctx, 'S', kx, sw.y + 8, 8, 1)
}

export function shipButton(ctx, n) {
    const down = n >= DESK.ship && n < DESK.ship + 8 ? 2 : 0
    const { x, y } = BTN
    // plate with hazard edge
    rect(ctx, 'k', x - 1, y + 2, 32, 11)
    for (let i = 0; i < 30; i++) rect(ctx, Math.floor(i / 2) % 2 ? 'k' : 'y', x + i, y + 3, 1, 9)
    rect(ctx, 'k', x + 3, y + 4, 24, 7)
    drawText(ctx, 'SHIP', x + 5, y + 4, { color: 'y' })
    // dome
    rect(ctx, 'k', x + 6, y - 5 + down, 18, 8 - down)
    rect(ctx, 'k', x + 7, y - 6 + down, 16, 1)
    rect(ctx, 'r', x + 7, y - 5 + down, 16, 7 - down)
    rect(ctx, 'o', x + 7, y - 5 + down, 16, 1)
    rect(ctx, 'W', x + 9, y - 4 + down, 3, 1)
    if (n >= DESK.ship && n < DESK.ship + 14) {
        const r = 10 + (n - DESK.ship) * 2
        for (let a = 0; a < 8; a++)
            sparkle(
                ctx,
                x + 15 + Math.round(Math.cos((a / 8) * 6.283) * r),
                y - 2 + Math.round(Math.sin((a / 8) * 6.283) * r * 0.6),
                1,
                'y'
            )
    }
}

// Over-the-shoulder dev: headphones, orange hoodie, chair back. Painted once, blitted per frame.
export const DEV_STYLE = { hoodie: 'o', shade: 'O', hair: 'N', hairHi: 'n', phones: true }
export function devSprite(st = DEV_STYLE) {
    return cached(`dev-${JSON.stringify(st)}`, 80, 86, (c) => {
        const cx = 40
        // shoulders + hood
        for (let y = 34; y < 86; y++) {
            const hw = Math.min(37, 13 + Math.round((y - 34) * 2.2))
            rect(c, 'k', cx - hw - 1, y, hw * 2 + 3, 1)
        }
        for (let y = 35; y < 86; y++) {
            const hw = Math.min(36, 12 + Math.round((y - 35) * 2.2))
            rect(c, st.hoodie, cx - hw, y, hw * 2 + 1, 1)
            rect(c, st.shade, cx + hw - 4, y, 5, 1)
        }
        disc(c, 'k', cx, 36, 11)
        disc(c, st.shade, cx, 36, 10)
        disc(c, st.hoodie, cx, 38, 7)
        // neck
        rect(c, 'k', cx - 7, 26, 15, 10)
        rect(c, 't', cx - 6, 26, 13, 9)
        rect(c, 'T', cx - 6, 33, 13, 2)
        // head: hair from behind, a sliver of cheek on the right (facing the screen)
        disc(c, 'k', cx, 17, 15)
        disc(c, 't', cx + 3, 19, 13)
        disc(c, st.hair, cx - 1, 17, 14)
        rect(c, st.hairHi, cx - 9, 7, 6, 2)
        rect(c, st.hairHi, cx - 11, 10, 4, 2)
        rect(c, st.hairHi, cx + 2, 5, 5, 1)
        if (st.phones) {
            for (let a = 200; a <= 340; a += 2) {
                const r = a / 57.2958
                rect(c, 'k', cx + Math.round(Math.cos(r) * 17) - 1, 17 + Math.round(Math.sin(r) * 17) - 1, 3, 3)
            }
            for (let a = 200; a <= 340; a += 2) {
                const r = a / 57.2958
                px(c, 'g', cx + Math.round(Math.cos(r) * 17), 17 + Math.round(Math.sin(r) * 17))
            }
            for (const ex of [cx - 21, cx + 14]) {
                rect(c, 'k', ex, 10, 8, 16)
                rect(c, 'o', ex + 1, 11, 6, 14)
                rect(c, 'O', ex + 1, 21, 6, 4)
                rect(c, 'Y', ex + 2, 12, 1, 4)
            }
        }
        // chair back
        rect(c, 'k', 14, 58, 52, 28)
        rect(c, 'd', 15, 59, 50, 27)
        rect(c, 'g', 16, 60, 48, 2)
        rect(c, 'g', 16, 60, 2, 26)
        rect(c, 'k', 36, 70, 8, 16)
        rect(c, 'g', 37, 71, 6, 15)
    })
}

function dev(ctx, n) {
    const bob = Math.floor(n / 20) % 2
    // Right arm reaches for SHIP just before the press, then returns
    const reach =
        easeOut(progress(n, DESK.ship - 18, DESK.ship - 3)) * (1 - progress(n, DESK.ship + 12, DESK.ship + 22))
    if (reach > 0) {
        const sx = DEV.x + 66,
            sy = DEV.y + 46
        const hx = Math.round(lerp(sx, BTN.x + 15, reach))
        const hy = Math.round(lerp(sy, BTN.y - 8 + (n >= DESK.ship && n < DESK.ship + 8 ? 2 : 0), reach))
        for (const [c, sz] of [
            ['k', 9],
            ['o', 7],
        ])
            for (let i = 0; i <= 16; i++) {
                const ax = Math.round(lerp(sx, hx, i / 16))
                const ay = Math.round(lerp(sy, hy, i / 16))
                rect(ctx, c, ax - (sz >> 1), ay - (sz >> 1), sz, sz)
            }
        shipButton(ctx, n)
        rect(ctx, 'k', hx - 4, hy - 3, 9, 7)
        rect(ctx, 't', hx - 3, hy - 2, 7, 5)
        rect(ctx, 'T', hx - 3, hy + 2, 7, 1)
    } else shipButton(ctx, n)
    ctx.drawImage(devSprite(), DEV.x, DEV.y + bob)
}

function desk(ctx, f, scene, n) {
    ctx.drawImage(room(), 0, 0)
    windowCloud(ctx, n)
    S.draw(ctx, S.potPlant(), 304, 119)
    const mx = 276
    rect(ctx, 'k', mx, 118, 10, 10)
    rect(ctx, 'w', mx + 1, 119, 8, 8)
    rect(ctx, 'o', mx + 1, 121, 8, 2)
    rect(ctx, 'k', mx + 9, 120, 3, 5)
    rect(ctx, 'w', mx + 9, 121, 2, 3)
    for (let i = 0; i < 3; i++) {
        const sy = 114 - ((n + i * 7) % 20)
        px(ctx, 'W', mx + 3 + i * 2 + Math.round(Math.sin((n + i * 9) / 5)), sy)
    }
    monitorFrame(ctx)
    app(ctx, n)
    rect(ctx, 'k', KEYS.x, KEYS.y, KEYS.w, 5)
    rect(ctx, 'S', KEYS.x + 1, KEYS.y, KEYS.w - 2, 3)
    for (let kx = KEYS.x + 2; kx < KEYS.x + KEYS.w - 2; kx += 3) px(ctx, 's', kx, KEYS.y + 1)
    dev(ctx, n)

    if (n >= DESK.ship && n < DESK.ship + 3) {
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        rect(ctx, 'd', 0, 0, W, H)
        ctx.restore()
    }
    const len = scene.end - scene.start
    if (f < 12) iris(ctx, 190, 64, Math.round(lerp(0, 200, easeOut(f / 12))))
    if (f >= len - 12) iris(ctx, BTN.x + 15, BTN.y, Math.round(lerp(200, 0, easeIn(progress(f, len - 12, len - 1)))))
}

// ================= LOOP =================
const RING = { x: 160, y: 76, r: 45 }
export function loopBg() {
    return cached('loopbg', W, H, (c) => {
        ditherGradient(c, 0, 0, W, H, [
            [0, 'k'],
            [0.45, 'd'],
            [1, 'B'],
        ])
        for (let i = 0; i < 40; i++)
            px(c, hash(i, 9) > 0.5 ? 'g' : 's', Math.floor(hash(i, 1) * W), Math.floor(hash(i, 2) * H))
    })
}
const ringPoint = (frac, r = RING.r) => [
    RING.x + Math.round(Math.sin(frac * Math.PI * 2) * r),
    RING.y - Math.round(Math.cos(frac * Math.PI * 2) * r),
]
const NODE_STYLE = [
    ['b', 'eye'],
    ['y', 'bulb'],
    ['G', 'flask'],
    ['o', 'rocket'],
]

function loop(ctx, f, scene, n) {
    const LOOP = loopTiming(scene)
    ctx.drawImage(loopBg(), 0, 0)
    const drawn = easeOut(progress(n, LOOP.draw, LOOP.draw + LOOP.drawLen))
    // Track: dim full ring, bright drawn arc, clockwise arrows between nodes
    for (let i = 0; i < 360; i++) {
        const [x, y] = ringPoint(i / 360)
        rect(ctx, 'g', x - 1, y - 1, 3, 3)
    }
    for (let i = 0; i < 360 * drawn; i++) {
        const [x, y] = ringPoint(i / 360)
        rect(ctx, 'w', x - 1, y - 1, 3, 3)
    }
    const revs = loopRevs(n, LOOP.run)
    const speed = loopRevs(n + 1, LOOP.run) - revs
    // Nodes
    LOOP_NODES.forEach((label, i) => {
        const frac = i / 4
        const popAt = LOOP.draw + Math.round(((i + 0.5) / 4) * LOOP.drawLen)
        const age = n - popAt
        if (age < 0) return
        const passed = Math.floor(revs * 4) >= i + 1 ? (revs * 4 - i) % 4 : 99
        const flash = passed < 0.6
        const r = age < 3 ? 6 + age * 3 : age < 5 ? 14 : 12
        const [x, y] = ringPoint(frac)
        const [col, ic] = NODE_STYLE[i]
        disc(ctx, 'k', x, y, r + 2 + (flash ? 1 : 0))
        disc(ctx, flash ? 'W' : 'w', x, y, r + 1 + (flash ? 1 : 0))
        disc(ctx, col, x, y, r)
        if (r >= 12) S.draw(ctx, S.icon(ic), x - 5, y - 5)
        const lw = measure(label)
        const pos = [
            [x - Math.round(lw / 2), y - 25],
            [x + 18, y - 3],
            [x + 18, y - 3],
            [x - 18 - lw, y - 3],
        ][i]
        if (age >= 3) drawText(ctx, label, pos[0], pos[1], { color: flash ? 'y' : 'W', shadow: 'k' })
    })
    // Clockwise arrowheads between nodes
    if (drawn >= 1)
        [0.125, 0.375, 0.625, 0.875].forEach((frac) => {
            const a = frac * Math.PI * 2
            const [tx, ty] = [Math.cos(a), Math.sin(a)]
            const [nx, ny] = [Math.sin(a), -Math.cos(a)]
            const cx = RING.x + nx * RING.r,
                cy = RING.y + ny * RING.r
            const tip = [cx + tx * 5, cy + ty * 5]
            tri(
                ctx,
                'k',
                [tip[0] + tx, tip[1] + ty],
                [cx - tx * 4 + nx * 6, cy - ty * 4 + ny * 6],
                [cx - tx * 4 - nx * 6, cy - ty * 4 - ny * 6]
            )
            tri(
                ctx,
                'y',
                tip,
                [cx - tx * 3 + nx * 4.5, cy - ty * 3 + ny * 4.5],
                [cx - tx * 3 - nx * 4.5, cy - ty * 3 - ny * 4.5]
            )
        })
    // Runner with a trail that lengthens with speed
    if (n >= LOOP.run) {
        const trail = Math.min(14, 3 + Math.round(speed * 90))
        for (let i = trail; i >= 0; i--) {
            const [x, y] = ringPoint(revs - (speed * i) / 1.5)
            const c = i === 0 ? 'W' : i < trail / 3 ? 'y' : i < (2 * trail) / 3 ? 'o' : 'O'
            const s = i === 0 ? 5 : i < trail / 2 ? 3 : 2
            rect(ctx, c, x - Math.floor(s / 2), y - Math.floor(s / 2), s, s)
        }
    }
    // Mini storefront in the middle of the loop
    const mx = RING.x - 12,
        my = RING.y - 14
    rect(ctx, 'k', mx - 1, my - 1, 26, 22)
    rect(ctx, 'w', mx, my + 4, 24, 16)
    for (let i = 0; i < 24; i++) rect(ctx, Math.floor(i / 3) % 2 ? 'o' : 'w', mx + i, my, 1, 5)
    rect(ctx, 'n', mx + 9, my + 9, 6, 11)
    rect(ctx, 'c', mx + 2, my + 8, 5, 5)
    rect(ctx, 'c', mx + 17, my + 8, 5, 5)
    if (f < 8) iris(ctx, RING.x, RING.y, Math.round(lerp(0, 200, easeOut(f / 8))))
}

export const RENDERERS = { title, card, store, desk, loop }

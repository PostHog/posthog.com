import {
    HOGROOM,
    ROOM,
    L4_LEVERS,
    VISITS,
    CROWD,
    LETTERS,
    EVENT_ROWS,
    TEAM_LABEL,
    TRAY_BOUNCE,
    DIG6,
    NOTE,
    pathAt,
} from './timeline.js'
import { drawText, measure } from './font.js'
import { W, rect, px, hash, disc, sparkle, progress, easeOut, lerp } from './fx.js'
import * as S from './sprites.js'
import {
    irisIn,
    irisOut,
    drawAgent,
    lever,
    bubble,
    signboard,
    pipeInterior,
    customerLevers,
    MCP_SIGN,
} from './level2.js'
import { darkness } from './level3.js'
import { devSprite } from './scenes.js'

const FLOOR = 146
// The hog's room: a warm brick alcove dug in at the pipe entrance, with a desk, a stamp and a tube going up.
const ROOM_BOX = { x0: 4, x1: 100, top: 80 }
const DESK = { x0: 16, x1: 72, top: 122 }
// One hog size for every room it sits in.
export const HOG_SCALE = 2
const HOG_AT = { x: 22, y: DESK.top - 13 * HOG_SCALE }
const LAMP = { x: 50, y: 90 }
// The tube rises from the desk: in Level 4 straight into the teammate's tray upstairs, elsewhere up out of frame.
const TUBE = { x: 84, trayY: 64 }
const MOUTH = [TUBE.x, DESK.top - 6]
export const TEAMMATE_STYLE = { hoodie: 'o', shade: 'O', hair: 'g', hairHi: 's', phones: false }

// A 7x5 envelope; red ones are complaints.
export function envelope(ctx, x, y, red = false) {
    rect(ctx, 'k', x - 1, y - 1, 9, 7)
    rect(ctx, red ? 'r' : 'W', x, y, 7, 5)
    px(ctx, red ? 'O' : 's', x + 1, y + 1)
    px(ctx, red ? 'O' : 's', x + 5, y + 1)
    rect(ctx, red ? 'O' : 's', x + 2, y + 2, 3, 1)
}
// A folded paper note: what an agent writes its feedback on.
export function note(ctx, x, y) {
    rect(ctx, 'k', x - 1, y - 1, 7, 6)
    rect(ctx, 'w', x, y, 5, 4)
    rect(ctx, 's', x + 1, y + 1, 3, 1)
    px(ctx, 's', x + 1, y + 2)
}
// The note being written, big enough to read, with the pencil at the end of what is written so far.
function noteCard(ctx, text, typed, x, y) {
    const w = measure(text) + 8,
        bx = Math.max(2, Math.min(W - w - 2, Math.round(x - w / 2))),
        by = y - 16
    rect(ctx, 'k', bx - 1, by - 1, w + 2, 15)
    rect(ctx, 'w', bx, by, w, 13)
    rect(ctx, 'S', bx, by + 11, w, 2)
    const shown = text.slice(0, typed)
    drawText(ctx, shown, bx + 4, by + 2, { color: 'k' })
    if (typed < text.length) {
        const px0 = bx + 4 + measure(shown) + 1
        rect(ctx, 'y', px0, by + 1, 2, 6)
        rect(ctx, 'k', px0, by + 7, 2, 2)
    }
}
// The feedback jar ships with MCP analytics: the same small glass jar on the hog's desk in every room.
// `notes` sit inside (it fits JAR.fits); `spill` more lie around it once it overflows.
export const JAR = { x: 59, w: 13, h: 14, fits: 8 }
const JAR_TOP = DESK.top - 1 - JAR.h
export const JAR_MOUTH = { x: JAR.x + 4, y: JAR_TOP - 3 }
// Where the hog holds a note it has fished out, and seals it.
export const PAW = { x: 44, y: 110 }
const SPILL = [
    [73, 117],
    [52, 117],
    [82, 141],
    [74, 142],
    [92, 142],
    [64, 141],
    [88, 138],
    [100, 142],
    [70, 137],
    [96, 139],
    [78, 138],
    [58, 142],
]
function feedbackJar(ctx, { notes = 0, spill = 0 }) {
    const { x, w, h } = JAR,
        y = JAR_TOP
    rect(ctx, 'k', x, y + 1, w, h)
    rect(ctx, 'k', x + 1, y, w - 2, h + 1)
    rect(ctx, 'C', x + 1, y + 2, w - 2, h - 2)
    rect(ctx, 'k', x + 1, y - 3, w - 2, 4)
    rect(ctx, 'S', x + 2, y - 2, w - 4, 2)
    for (let i = 0; i < Math.min(notes, JAR.fits); i++)
        note(ctx, x + 2 + (i % 2) * 4 + ((i >> 1) % 2), y + h - 5 - (i >> 1) * 3)
    if (notes > JAR.fits)
        for (const [dx, dy] of [
            [1, -6],
            [7, -5],
            [4, -9],
            [0, -11],
            [7, -12],
        ])
            note(ctx, x + dx, y + dy)
    rect(ctx, 'W', x + 2, y + 3, 1, h - 5)
    const label = 'feedback',
        tw = measure(label) + 6,
        tx = DESK.x1 - 2 - tw,
        ty = DESK.top + 6
    rect(ctx, 'S', x + w - 4, y + h - 2, 1, ty - (y + h - 2))
    rect(ctx, 'k', tx - 1, ty - 1, tw + 2, 12)
    rect(ctx, 'w', tx, ty, tw, 10)
    drawText(ctx, label, tx + 3, ty + 1, { color: 'k' })
    SPILL.slice(0, spill).forEach(([sx, sy]) => note(ctx, sx, sy))
}
// A note tossed from `from` into the jar, landing on the last frame of `span`.
export function tossNote(ctx, n, [a, b], from) {
    if (n < a || n >= b) return
    const t = (n - a) / (b - a)
    note(ctx, Math.round(lerp(from.x, JAR_MOUTH.x, t)), Math.round(lerp(from.y, JAR_MOUTH.y, t) - 10 * 4 * t * (1 - t)))
}
// The hog fishes a note out of the jar into its paw.
export function fishNote(ctx, n, [a, b]) {
    if (n < a || n >= b) return
    const t = easeOut((n - a) / (b - a))
    note(
        ctx,
        Math.round(lerp(JAR_MOUTH.x, PAW.x, t)),
        Math.round(lerp(JAR_MOUTH.y, PAW.y, t) - 6 * Math.sin(t * Math.PI))
    )
}
// The letter the hog holds up before sending it: big enough to read its event name.
const BIG = { x: 8, y: 108 }
function bigLetter(ctx, subject, red, stamped) {
    const w = measure(subject) + 14,
        h = 17,
        { x, y } = BIG
    rect(ctx, 'k', x - 1, y - 1, w + 2, h + 2)
    rect(ctx, red ? 'r' : 'W', x, y, w, h)
    for (let i = 0; i < 5; i++) {
        px(ctx, red ? 'O' : 's', x + Math.round(w / 2) - 5 + i, y + 1 + Math.floor(i / 2))
        px(ctx, red ? 'O' : 's', x + Math.round(w / 2) + 5 - i, y + 1 + Math.floor(i / 2))
    }
    drawText(ctx, subject, x + 7, y + 7, { color: red ? 'W' : 'k' })
    if (stamped) {
        rect(ctx, 'k', x + w - 9, y + 1, 8, 6)
        rect(ctx, red ? 'Y' : 'o', x + w - 8, y + 2, 6, 4)
    }
    return { x: x + w - 5, y }
}
const tubePos = (t, routed) => [TUBE.x, lerp(MOUTH[1], routed ? TUBE.trayY : -10, t)]
function tube(ctx, routed) {
    const top = routed ? TUBE.trayY : 0
    rect(ctx, 'k', TUBE.x - 4, top, 9, DESK.top - top)
    rect(ctx, 'C', TUBE.x - 3, top, 7, DESK.top - top)
    rect(ctx, 'W', TUBE.x - 2, top, 1, DESK.top - top)
    rect(ctx, 'k', TUBE.x - 6, DESK.top - 8, 13, 4)
    rect(ctx, 'S', TUBE.x - 5, DESK.top - 7, 11, 2)
}
// The permanent signboard on the hog's room, styled like the storefront's sign.
const banner = (ctx) => signboard(ctx, 'MCP analytics', 8, ROOM_BOX.top - 14, { mount: 'bracket' })
// A letter in flight; `from` is where it starts (the big letter's corner) before it zips into the tube mouth.
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (2 - 2 * t) ** 2 / 2)
export function flyingLetter(ctx, n, [from, to], routed, red, start = null, slow = false) {
    if (n < from || n >= to) return
    const zip = start ? 6 : 0
    const [x, y] =
        n < from + zip
            ? [lerp(start.x, MOUTH[0], (n - from) / zip), lerp(start.y, MOUTH[1], (n - from) / zip)]
            : tubePos((slow ? easeInOut : easeOut)((n - from - zip) / (to - from - zip)), routed)
    envelope(ctx, Math.round(x) - 3, Math.round(y) - 2, red)
}

// dug: 0..1 how much of the alcove exists; tada: frame the hog pops up with a flourish; stamp: {x, y, at} when it stamps a letter.
export function hogRoom(
    ctx,
    n,
    { dug = 1, tada = -99, nods = [], sign = null, routed = false, wave = false, stamp = null, jar = {} } = {}
) {
    const { x0, x1, top } = ROOM_BOX
    for (let y = top; y < FLOOR; y += 5)
        for (let x = x0 + ((y / 5) % 2) * 4; x < x1; x += 8) {
            if (hash(x, y, 7) > dug) continue
            rect(ctx, 'N', x, y, 8, 5)
            rect(ctx, (x + y) % 3 ? 'n' : 'O', x, y, 7, 4)
        }
    rect(ctx, 'k', LAMP.x, top, 1, LAMP.y - top - 4)
    rect(ctx, 'k', LAMP.x - 5, LAMP.y - 5, 11, 4)
    rect(ctx, 'g', LAMP.x - 4, LAMP.y - 4, 9, 2)
    disc(ctx, 'Y', LAMP.x, LAMP.y, 2)
    if (dug < 1) return
    rect(ctx, 'k', x0 - 1, top - 3, x1 - x0 + 2, 3)
    rect(ctx, 'N', x0, top - 2, x1 - x0, 2)
    tube(ctx, routed)
    banner(ctx)
    if (n >= tada) {
        const pop = Math.round(lerp(14, 0, easeOut(progress(n, tada, tada + 6))))
        const nod = nods.some((f) => n >= f && n < f + 6) ? 2 : 0
        const stamping = stamp && n >= stamp.at - 6 && n < stamp.at
        const flourish = n < tada + 24 || wave
        const pose = stamping ? 'waveA' : flourish ? (Math.floor(n / 6) % 2 ? 'waveA' : 'waveB') : 'idle'
        S.draw(ctx, S.hedgehog(pose, n % 90 < 4), HOG_AT.x, HOG_AT.y + pop + nod, { scale: HOG_SCALE })
        if (n >= tada && n < tada + 20)
            for (let i = 0; i < 8; i++)
                sparkle(
                    ctx,
                    HOG_AT.x + 18 + Math.round(Math.cos(i * 0.785) * (16 + (n - tada) * 2)),
                    HOG_AT.y + 16 + Math.round(Math.sin(i * 0.785) * (12 + n - tada)),
                    2,
                    i % 2 ? 'y' : 'W'
                )
    }
    rect(ctx, 'k', DESK.x0 - 1, DESK.top - 1, DESK.x1 - DESK.x0 + 2, 5)
    rect(ctx, 'n', DESK.x0, DESK.top, DESK.x1 - DESK.x0, 3)
    rect(ctx, 'N', DESK.x0 + 2, DESK.top + 4, DESK.x1 - DESK.x0 - 4, FLOOR - DESK.top - 4)
    rect(ctx, 'O', DESK.x0 + 2, DESK.top + 4, DESK.x1 - DESK.x0 - 4, 1)
    for (let i = 0; i < 3; i++) envelope(ctx, DESK.x0 + 3, DESK.top - 6 - i * 2)
    feedbackJar(ctx, jar)
    const at = stamp && n >= stamp.at - 10 && n < stamp.at + 6 ? stamp : null
    const sx = at ? at.x : 30,
        sy = at ? at.y - 10 : DESK.top - 7
    const lift = at ? (n < at.at ? Math.round(6 * progress(n, at.at - 10, at.at - 3)) : 0) : 0
    rect(ctx, 'k', sx, sy - lift, 8, 6)
    rect(ctx, 'r', sx + 1, sy + 1 - lift, 6, 4)
    rect(ctx, 'N', sx + 3, sy - 4 - lift, 2, 4)
    disc(ctx, 'N', sx + 4, sy - 5 - lift, 2)
    if (at && n >= at.at && n < at.at + 4)
        for (let a = 0; a < 6; a++)
            px(ctx, 'y', sx + 4 + Math.round(Math.cos(a) * (6 + n - at.at)), sy + 6 + Math.round(Math.sin(a) * 2))
    if (sign && n >= sign[0] && n < sign[1]) {
        const up = Math.round(lerp(8, 0, easeOut(progress(n, sign[0], sign[0] + 5))))
        const bx = HOG_AT.x + 34,
            by = HOG_AT.y - 14 + up
        rect(ctx, 'N', bx, by + 12, 2, 14)
        rect(ctx, 'k', bx - 16, by - 2, 34, 15)
        rect(ctx, 'W', bx - 15, by - 1, 32, 13)
        drawText(ctx, 'why?', bx + 1 - Math.round(measure('why?') / 2), by + 2, { color: 'k' })
    }
}
// The lamp is on from the first brick: the room glows warm while the rest of the pipe is still dark, then the light floods out.
export function roomLight(ctx, n, lightsOn) {
    if (n >= lightsOn + 24) return
    const grow = n < lightsOn ? 0 : (n - lightsOn) * 14
    darkness(ctx, 0.12, [
        { x: 30, y: 112, r: 90 + grow },
        { x: 80, y: 112, r: 90 + grow },
    ])
    if (n >= lightsOn && n < lightsOn + 16)
        for (let i = 0; i < 10; i++)
            sparkle(
                ctx,
                LAMP.x + Math.round(Math.cos(i * 0.63) * (30 + (n - lightsOn) * 6)),
                112 + Math.round(Math.sin(i * 0.63) * (20 + (n - lightsOn) * 3)),
                2,
                'y'
            )
}
function plate(ctx, text, x, y) {
    const w = measure(text) + 8
    rect(ctx, 'k', x - 1, y - 1, w + 2, 13)
    rect(ctx, 'd', x, y, w, 11)
    drawText(ctx, text, x + 4, y + 2, { color: 'y' })
}

// ---- Upstairs: the PostHog teammate's desk. Each letter that lands adds one row to the events table on the monitor.
const UP = { x: 0, y: 10, w: 316, h: 56 }
const SCREEN = { x: 44, y: 12, w: 270, h: 53 }
// Columns sized from what they hold, so they stay aligned. Each event takes two lines: its
// columns, then the agent's why under the tool, so a long why never runs off the screen.
const HEADERS = ['event', 'tool', '✓/✗']
const ROW_H = 21
function columns() {
    const cells = [['tool_call', 'feedback'], LETTERS.map((l) => l.row.tool), ['✓']]
    let x = 4
    return HEADERS.map((h, i) => {
        const at = x
        x += Math.max(measure(h), ...cells[i].map((c) => measure(c))) + 6
        return at
    })
}
function tableHeader(ctx, x, y, w) {
    const cols = columns()
    HEADERS.forEach((label, i) => drawText(ctx, label, x + cols[i], y, { color: 'S' }))
    rect(ctx, 'g', x + 2, y + 8, w - 4, 1)
}
function eventRow(ctx, l, x, y, n) {
    const { row } = l,
        cols = columns()
    if (row.feedback) rect(ctx, 'r', x + 1, y - 1, SCREEN.w - 2, ROW_H)
    drawText(ctx, row.feedback ? 'feedback' : 'tool_call', x + cols[0], y, { color: row.feedback ? 'W' : 'C' })
    drawText(ctx, row.tool, x + cols[1], y, { color: 'W' })
    if (!row.feedback && n >= row.result)
        drawText(ctx, row.ok ? '✓' : '✗', x + cols[2] + 5, y, { color: row.ok ? 'L' : 'r' })
    drawText(ctx, 'why:', x + cols[1], y + 10, { color: row.feedback ? 'Y' : 'S' })
    drawText(ctx, row.intent, x + cols[1] + measure('why: '), y + 10, { color: row.feedback ? 'W' : 'Y' })
}
const TRAY = { x: 74, y: 60 }
function upstairs(ctx, n) {
    const { x, y, w, h } = UP
    rect(ctx, 'k', x, y - 1, w + 1, h + 2)
    rect(ctx, 'w', x, y, w, h)
    rect(ctx, 'n', x, y + h - 6, w, 2)
    rect(ctx, 'N', x, y + h - 4, w, 4)
    rect(ctx, 'k', SCREEN.x - 2, SCREEN.y - 2, SCREEN.w + 4, SCREEN.h + 4)
    rect(ctx, 'd', SCREEN.x, SCREEN.y, SCREEN.w, SCREEN.h)
    ctx.save()
    ctx.beginPath()
    ctx.rect(SCREEN.x, SCREEN.y, SCREEN.w, SCREEN.h)
    ctx.clip()
    tableHeader(ctx, SCREEN.x, SCREEN.y + 1, SCREEN.w)
    const landed = LETTERS.filter((l) => n >= l.send[1])
    landed
        .filter((l) => n >= l.send[1] + TRAY_BOUNCE)
        .slice(-EVENT_ROWS)
        .forEach((l, i) => eventRow(ctx, l, SCREEN.x, SCREEN.y + 11 + i * ROW_H, n))
    ctx.restore()
    rect(ctx, 'k', TRAY.x, TRAY.y + 3, 24, 5)
    rect(ctx, 'S', TRAY.x + 1, TRAY.y + 4, 22, 3)
    landed.forEach((l, i) =>
        envelope(
            ctx,
            TRAY.x + 3 + (i % 3) * 6,
            TRAY.y - Math.floor(i / 3) * 2 - (n - l.send[1] < TRAY_BOUNCE ? [0, 3, 4, 3, 1, 0][n - l.send[1]] : 0),
            l.red
        )
    )
    ctx.save()
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.clip()
    ctx.drawImage(devSprite(TEAMMATE_STYLE), 2, 28, 40, 43)
    ctx.restore()
    if (n >= TEAM_LABEL[0] && n < TEAM_LABEL[1]) plate(ctx, 'PostHog team', 236, 60)
}

function hogroom(ctx, f, scene, n) {
    pipeInterior(ctx, scene.pipe, false)
    const dug = progress(n, ...HOGROOM.dig)
    const showing = VISITS.flatMap((v) => [v.letter, v.complaint]).find((l) => l && n >= l.show[0] && n < l.show[1])
    const corner = showing && { x: BIG.x + measure(showing.subject) + 6, y: BIG.y }
    hogRoom(ctx, n, {
        dug,
        tada: HOGROOM.tada,
        routed: true,
        nods: VISITS.map((v) => v.say[0] + 10),
        sign: VISITS.map((v) => v.why).find(([a, b]) => n >= a && n < b),
        stamp: showing ? { x: corner.x - 8, y: BIG.y, at: showing.stamp } : null,
        jar: { notes: VISITS.filter((v) => v.complaint && n >= v.complaint.plink && n < v.complaint.plink + 2).length },
    })
    for (const { complaint: c } of VISITS) if (c) fishNote(ctx, n, [c.plink + 2, c.show[0]])
    if (dug > 0 && dug < 1)
        for (let i = 0; i < 6; i++)
            px(ctx, i % 2 ? 'N' : 'n', 8 + Math.floor(hash(i, n) * 90), 80 + ((n * 3 + i * 17) % 66))
    L4_LEVERS.forEach((l, i) => {
        const v = VISITS.find((v) => v.lever === i)
        lever(ctx, { ...l, pull: v.ok ? v.pull : undefined }, n, {
            floor: FLOOR,
            light: !v.ok && n >= v.pull ? 'r' : undefined,
        })
    })
    for (const v of VISITS) {
        if (n < v.keys[0][0] || n >= v.keys.at(-1)[0]) continue
        const p = pathAt(v.keys, n)
        const hurt = !v.ok && n >= v.pull && n < v.pull + 12
        const facing = !p.moving && Math.abs(p.x - ROOM.stop) < 2 ? -1 : p.dir
        drawAgent(
            ctx,
            hurt ? 'hurt' : v.tint,
            { ...p, dir: facing, x: p.x - (hurt && n < v.pull + 4 ? 4 - (n - v.pull) : 0) },
            n,
            { scale: 2 }
        )
        if (hurt)
            for (let i = 0; i < 5; i++)
                sparkle(
                    ctx,
                    p.x + 16 + Math.round(Math.cos(i * 1.3) * (5 + n - v.pull)),
                    p.y - 30 + Math.round(Math.sin(i * 1.3) * 5),
                    2,
                    'r'
                )
        if (n >= v.say[0] && n < v.say[1]) bubble(ctx, v.says, p.x + 4, p.y - 34)
        const c = v.complaint
        if (c && n >= c.note[0] && n < c.note[1])
            noteCard(ctx, NOTE.text, Math.floor((n - c.note[0]) * NOTE.cpf), p.x + 4, p.y - 31)
        if (c) tossNote(ctx, n, [c.note[1], c.plink], { x: p.x - 12, y: p.y - 20 })
    }
    for (const c of CROWD)
        if (n >= c.keys[0][0] && n < c.keys.at(-1)[0])
            drawAgent(ctx, c.tint, pathAt(c.keys, n), n, { scale: 2, seed: c.i })
    roomLight(ctx, n, HOGROOM.lightsOn)
    if (showing) bigLetter(ctx, showing.subject, showing === VISITS[1].complaint, n >= showing.stamp)
    for (const v of VISITS)
        for (const l of [v.letter, v.complaint].filter(Boolean))
            flyingLetter(
                ctx,
                n,
                l.send,
                true,
                l === v.complaint,
                { x: BIG.x + measure(l.subject) / 2, y: BIG.y + 8 },
                l.slow
            )
    for (const c of CROWD) flyingLetter(ctx, n, c.send, true, c.red)
    // the upstairs desk fills the top of this shot, so the header sign hangs just below it
    if (n >= HOGROOM.lightsOn) {
        upstairs(ctx, n)
        signboard(ctx, MCP_SIGN[scene.pipe], 104, 70, { mount: 'chains', ceiling: 66 })
    }
    irisIn(ctx, f, 60, 110, 10)
    irisOut(ctx, f, scene.end - scene.start, 210, 40, 8)
}

// Level 6: the owner installs, and the same hog moves in at his pipe.
function dig6(ctx, f, scene, n) {
    pipeInterior(ctx, scene.pipe)
    customerLevers(ctx, n)
    const dug = progress(n, ...DIG6.dig)
    hogRoom(ctx, n, { dug, tada: DIG6.dig[1], wave: n >= DIG6.lightsOn + 6 })
    if (dug > 0 && dug < 1)
        for (let i = 0; i < 6; i++)
            px(ctx, i % 2 ? 'N' : 'n', 8 + Math.floor(hash(i, n) * 90), 80 + ((n * 3 + i * 17) % 66))
    roomLight(ctx, n, DIG6.lightsOn)
    if (n >= DIG6.lightsOn) plate(ctx, 'installed!', 20, 50)
    irisIn(ctx, f, 60, 110, 8)
}

export const RENDERERS_L4 = { hogroom, dig6 }

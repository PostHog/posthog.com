import {
    CMD,
    TEAMMATE,
    FEEDBACK_LETTER,
    FIX,
    SKILL_LEVER,
    BEFORE5,
    SEALS,
    AFTER5,
    AFTER_COUNT,
    CLEAR,
    STAKES,
    CURSOR_OUT,
    EXIT3,
    INTENT6,
    PLANFIX,
    OWNER,
    ROOM,
    PH_HOG,
    DASH,
    INTENTS,
    TOOL_COUNTS,
    ASK,
    BIT_ASK,
    PH_LEVERS,
    BIT_PH,
    PH_CARD,
    ANSWER,
    HISFIX,
    FINAL,
    FINAL_RUSH,
    FINAL_VISITORS,
    PIPE,
    AT,
    STREET_Y,
    DOOR_X,
    pathAt,
    personAt,
} from './timeline.js'
import { drawText, drawLogoText, measure, wrap } from './font.js'
import { W, rect, px, disc, sparkle, iris, tri, progress, easeOut, easeIn, lerp } from './fx.js'
import * as S from './sprites.js'
import { panel } from './ui.js'
import {
    storeBackdrop,
    door,
    hud,
    center,
    room,
    windowCloud,
    monitorFrame,
    devSprite,
    shipButton,
    appChrome,
    tabCursor,
    SCR,
    KEYS,
    DEV,
} from './scenes.js'
import {
    irisIn,
    irisOut,
    drawAgent,
    pipe,
    pipeRim,
    drawMiniHog,
    pipeInterior,
    customerLevers,
    lever,
    headBubble,
    bubble,
    terminal,
    homeRoom,
} from './level2.js'
import { hogRoom, envelope, flyingLetter, note, tossNote, fishNote, JAR, PAW, TEAMMATE_STYLE } from './level4.js'

const FLOOR = 146

function prCard(ctx, x, y, label) {
    const w = measure(label) + 10
    rect(ctx, 'k', x - w / 2 - 1, y - 1, w + 2, 13)
    rect(ctx, 'G', x - w / 2, y, w, 11)
    rect(ctx, 'L', x - w / 2, y, w, 1)
    drawText(ctx, label, x - w / 2 + 5, y + 2, { color: 'W' })
}
// Inside a pipe; `hog` adds the hog's room at the entrance, `owner` picks PostHog's or the customer's colours.
function pipeRoom(ctx, n, hog, owner) {
    pipeInterior(ctx, owner)
    if (hog) hogRoom(ctx, n)
}

function poster(ctx) {
    rect(ctx, 'k', 78, 42, 42, 32)
    rect(ctx, 'd', 79, 43, 40, 30)
    S.draw(ctx, S.hedgehog('idle'), 90, 45)
    drawText(ctx, 'PostHog', 99 - Math.round(measure('PostHog') / 2), 62, { color: 'y' })
}
// Upstairs at PostHog, one monitor tells Level 5: red envelopes pile up on the desk, a person's PR merges, the error rate falls.
const DROP = { x: 306, y: 112 }
function envelopePile(ctx, n) {
    const dropped = Math.floor(progress(n, ...TEAMMATE.drops) * 24)
    rect(ctx, 'k', DROP.x - 4, 0, 9, DROP.y)
    rect(ctx, 'C', DROP.x - 3, 0, 7, DROP.y)
    rect(ctx, 'W', DROP.x - 2, 0, 1, DROP.y)
    for (let i = 0; i < dropped; i++)
        envelope(ctx, 297 + (i % 3) * 7 - Math.floor(i / 12) * 3, 124 - Math.floor(i / 3) * 3, true)
    for (let f0 = TEAMMATE.drops[0]; f0 < TEAMMATE.drops[1]; f0 += 12)
        if (n >= f0 && n < f0 + 8) envelope(ctx, DROP.x - 3, Math.round(lerp(0, 116, (n - f0) / 8)), true)
}
// Big numbers in the plain pixel font at 3x, solid blocks: an outline notches the diagonals at this size.
const bigNumber = (ctx, text, x, y, color) => drawText(ctx, text, x, y, { scale: 3, color })
function whatScreen(ctx, b, n) {
    const count = `~${Math.round(2000 * progress(n, ...TEAMMATE.drops)).toLocaleString('en-US')} reports / day`
    drawText(ctx, 'skill-get tool', b.x + 8, b.y + 6, { color: 'k' })
    bigNumber(ctx, '6.6%', b.x + 8, b.y + 18, 'r')
    drawText(ctx, 'errors', b.x + 16 + measure('6.6%') * 3, b.y + 26, { color: 'r' })
    drawText(ctx, count, b.x + 8, b.y + 44, { color: 'k' })
}
function whyScreen(ctx, b, n) {
    const k = easeOut(progress(n, TEAMMATE.why, TEAMMATE.why + 8))
    const w = b.w - 16,
        h = Math.round(54 * k),
        x = b.x + 8,
        y = b.y + 4
    rect(ctx, 'k', x - 1, y - 1, w + 2, h + 2)
    rect(ctx, 'W', x, y, w, h)
    if (k < 1) return
    rect(ctx, 'r', x, y, w, 12)
    envelope(ctx, x + 4, y + 3, true)
    drawText(ctx, FEEDBACK_LETTER.subject, x + 16, y + 3, { color: 'W' })
    drawText(ctx, FEEDBACK_LETTER.body, x + 6, y + 18, { color: 'k' })
    wrap(FEEDBACK_LETTER.why, w - 12).forEach((line, i) => drawText(ctx, line, x + 6, y + 30 + i * 10, { color: 'g' }))
}
function fixScreen(ctx, b, n) {
    rect(ctx, 'k', b.x, b.y - 1, b.w, b.h + 1)
    drawText(ctx, '>', b.x + 4, b.y + 6, { color: 'o' })
    let budget = Math.max(0, Math.floor((n - FIX.typeFrom) * FIX.cpf))
    const lines = wrap(FIX.prompt, b.w - 16)
    lines.forEach((line, i) => {
        drawText(ctx, line.slice(0, Math.max(0, budget)), b.x + 12, b.y + 6 + i * 11, { color: 'W' })
        budget -= line.length + 1
    })
    const dy = b.y + 9 + lines.length * 11
    if (n >= FIX.doneAt) drawText(ctx, FIX.done, b.x + 4, dy, { color: 'L' })
    if (n >= TEAMMATE.merged) mergedStamp(ctx, b.x + 12 + measure(FIX.done), dy - 3, n - TEAMMATE.merged)
}
function mergedStamp(ctx, x0, y0, k) {
    const grow = k < 3 ? 1.4 - k * 0.13 : 1
    const w = Math.round((measure('Merged') + 10) * grow),
        h = Math.round(12 * grow),
        x = x0 - (w - measure('Merged') - 10) / 2,
        y = y0 - (h - 12) / 2
    rect(ctx, 'k', x - 1, y - 1, w + 2, h + 2)
    rect(ctx, 'p', x, y, w, h)
    drawText(ctx, 'Merged', Math.round(x + (w - measure('Merged')) / 2), Math.round(y + h / 2 - 3), { color: 'W' })
    if (k < 10)
        for (let a = 0; a < 8; a++)
            sparkle(
                ctx,
                Math.round(x + w / 2 + Math.cos(a * 0.785) * (w / 2 + k * 2)),
                Math.round(y + 6 + Math.sin(a * 0.785) * (8 + k)),
                1,
                'p'
            )
}
// At the desk, in order: what broke, why (both from MCP analytics), then the fix (their own agent) and its merge.
const STEPS = [
    { from: -Infinity, tab: 'MCP analytics', draw: whatScreen },
    { from: TEAMMATE.why, tab: 'MCP analytics', draw: whyScreen },
    { from: TEAMMATE.fix, tab: 'Claude Code', draw: fixScreen },
]
function teammate(ctx, f, scene, n) {
    ctx.drawImage(room(), 0, 0)
    windowCloud(ctx, n)
    poster(ctx)
    monitorFrame(ctx)
    const step = STEPS.findLast((st) => n >= st.from)
    const b = appChrome(ctx, 0, [step.tab])
    step.draw(ctx, b, n)
    envelopePile(ctx, n)
    rect(ctx, 'k', KEYS.x, KEYS.y, KEYS.w, 5)
    rect(ctx, 'S', KEYS.x + 1, KEYS.y, KEYS.w - 2, 3)
    const fixing = n >= TEAMMATE.fix
    if (fixing) {
        const hop = Math.round(lerp(10, 0, easeOut(progress(n, TEAMMATE.fix, TEAMMATE.fix + 8))))
        drawAgent(ctx, 'claude', { x: 272, y: 128 + hop, moving: false, air: hop > 0, dir: -1 }, n, { scale: 2 })
    }
    const lean = fixing ? -3 + (n >= FIX.typeFrom && n < FIX.doneAt && n % 4 < 2 ? 1 : 0) : Math.floor(n / 20) % 2
    ctx.drawImage(devSprite(TEAMMATE_STYLE), DEV.x + (fixing ? 4 : 0), DEV.y + lean)
    S.draw(ctx, S.hedgehog('idle'), DEV.x + 31, DEV.y + 52)
    irisIn(ctx, f, 200, 64, 8)
}
// Before the fix, at PostHog's skill-get lever: the crowd fails, stomps and drops notes in the overflowing jar,
// while the hog keeps fishing them out and sealing red letters into the tube.
function before5(ctx, f, scene, n) {
    pipeInterior(ctx, scene.pipe)
    const sealing = SEALS.findLast((s) => n >= s - 4 && n < s + 12)
    hogRoom(ctx, n, {
        stamp: sealing && { x: PAW.x, y: PAW.y + 10, at: sealing + 6 },
        jar: { notes: JAR.fits + 1, spill: 5 + BEFORE5.filter((a) => n >= a.plink).length },
    })
    for (const s of SEALS) {
        fishNote(ctx, n, [s, s + 4])
        if (n >= s + 4 && n < s + 10) envelope(ctx, PAW.x - 3, PAW.y, true)
        flyingLetter(ctx, n, [s + 10, s + 22], false, true, { x: PAW.x, y: PAW.y + 2 })
    }
    const last = BEFORE5.filter((a) => n >= a.pull).at(-1)
    const light = last && n < last.pull + 12 ? (last.ok ? 'L' : 'r') : Math.floor(n / 6) % 2 ? 'r' : 'O'
    lever(ctx, { ...SKILL_LEVER, pull: last?.pull }, n, { floor: FLOOR, light })
    for (const a of BEFORE5) {
        if (n < a.keys[0][0] || n >= a.keys.at(-1)[0]) continue
        const p = pathAt(a.keys, n)
        const angry = !a.ok && n >= a.pull && n < a.pull + 14
        const shake = angry ? (n % 4 < 2 ? -1 : 1) : 0
        drawAgent(
            ctx,
            angry && n < a.pull + 6 ? 'hurt' : a.tint,
            { ...p, x: p.x + shake, dir: p.moving ? p.dir : !a.ok && n >= a.pull + 14 ? -1 : 1 },
            n,
            { scale: 2, seed: a.i }
        )
        if (angry) bubble(ctx, '#@!', p.x, p.y - 34)
        if (!a.ok && n >= a.pull + 14 && n < a.drop) note(ctx, p.x - 12, p.y - 20)
        if (!a.ok) tossNote(ctx, n, [a.drop, a.plink], { x: p.x - 12, y: p.y - 20 })
    }
    irisIn(ctx, f, 170, 110, 8)
}
// After the fix, same place and crowd: every pull is green, they hop and carry crates on through; the error rate counts down.
function after5(ctx, f, scene, n) {
    pipeRoom(ctx, n, true, scene.pipe)
    const last = AFTER5.filter((a) => n >= a.pull).at(-1)
    lever(ctx, { ...SKILL_LEVER, pull: last?.pull }, n, { floor: FLOOR, light: 'L' })
    for (const a of AFTER5) {
        if (n < a.keys[0][0] || n >= a.keys.at(-1)[0]) continue
        const p = pathAt(a.keys, n)
        drawAgent(ctx, a.tint, p, n, { scale: 2, seed: a.i, carrying: n >= a.pull + 3 })
        if (n >= a.pull && n < a.pull + 14)
            S.draw(
                ctx,
                S.coin(Math.floor((n - a.pull) / 3)),
                p.x - 3,
                p.y - 44 - Math.round(easeOut((n - a.pull) / 10) * 8)
            )
    }
    const k = easeOut(progress(n, ...AFTER_COUNT))
    const head = 'skill-get tool · errors',
        rate = `${lerp(6.6, 0.6, k).toFixed(1)}%`
    rect(ctx, 'k', 14, 16, 150, 44)
    rect(ctx, 'd', 15, 17, 148, 42)
    drawText(ctx, head, 89 - Math.round(measure(head) / 2), 21, { color: 'S' })
    bigNumber(ctx, rate, 89 - Math.round((measure(rate) * 3) / 2), 34, k >= 1 ? 'L' : 'r')
    if (n >= CLEAR) {
        const t = n - CLEAR
        const scale = t < 2 ? 2 : t < 4 ? 4 : 3
        rect(ctx, 'k', 0, 76, W, 34)
        drawLogoText(ctx, 'LEVEL CLEAR', center('LEVEL CLEAR', scale), 82 - (scale - 3) * 4, { scale })
        if (t < 25)
            for (let i = 0; i < 12; i++)
                sparkle(
                    ctx,
                    160 + Math.round(Math.cos(i * 0.52) * (30 + t * 4) * 1.6),
                    92 + Math.round(Math.sin(i * 0.52) * (14 + t * 2)),
                    2,
                    i % 2 ? 'y' : 'W'
                )
    }
    irisIn(ctx, f, 170, 110, 8)
    irisOut(ctx, f, scene.end - scene.start, 160, 92, 6)
}

// ================= LEVEL 6: your turn =================
function office(ctx, n) {
    ctx.drawImage(room(), 0, 0)
    windowCloud(ctx, n)
    monitorFrame(ctx)
}
function officeFront(ctx, n, bubbleMood) {
    rect(ctx, 'k', KEYS.x, KEYS.y, KEYS.w, 5)
    rect(ctx, 'S', KEYS.x + 1, KEYS.y, KEYS.w - 2, 3)
    shipButton(ctx, 0)
    ctx.drawImage(devSprite(), DEV.x, DEV.y + (Math.floor(n / 20) % 2))
    if (bubbleMood) headBubble(ctx, bubbleMood.k, bubbleMood.mood)
}

function owner(ctx, f, scene, n) {
    office(ctx, n)
    const { x, y, w, h } = SCR
    rect(ctx, 'k', x, y, w, h)
    rect(ctx, 'g', x, y, w, 9)
    drawText(ctx, 'Terminal', x + Math.round((w - measure('Terminal')) / 2), y + 1, { color: 'W' })
    let budget = Math.floor((n - OWNER.typeFrom) * OWNER.cpf)
    let cy = y + 16
    wrap(CMD, w - 16).forEach((line, i) => {
        if (i === 0) drawText(ctx, '$', x + 5, cy, { color: 'o' })
        drawText(ctx, line.slice(0, Math.max(0, budget)), x + 14, cy, { color: 'W' })
        budget -= line.length + 1
        cy += 11
    })
    if (n >= OWNER.enter) drawText(ctx, '✓ MCP analytics added', x + 5, cy + 4, { color: 'L' })
    officeFront(ctx, n)
    irisIn(ctx, f, 200, 64, 10)
}

const nameColumn = (b, names) => b.x + 3 + Math.max(...names.map((s) => measure(s))) + 6
function toolsView(ctx, b, n, from) {
    const barX = nameColumn(
            b,
            TOOL_COUNTS.map(([name]) => name)
        ),
        top = TOOL_COUNTS[0][1]
    const countX = b.x + b.w - measure(top.toLocaleString('en-US')) - 2,
        barW = countX - barX - 5
    TOOL_COUNTS.forEach(([name, count], i) => {
        const y = b.y + 4 + i * 14
        const k = easeOut(progress(n, from + 2 + i * 5, from + 10 + i * 5))
        drawText(ctx, name, b.x + 2, y + 2, { color: 'k' })
        rect(ctx, 'b', barX, y + 1, Math.round(barW * (count / top) * k) + 1, 8)
        if (k >= 1) drawText(ctx, count.toLocaleString('en-US'), countX, y + 2, { color: 'k' })
    })
}
function errorsView(ctx, b, n) {
    const broke = n >= DASH.broke
    const rows = [
            ['find customers', '0.4%', false],
            ['search docs', broke ? '6% not found' : '0.4%', broke],
        ],
        rateX = nameColumn(
            b,
            rows.map(([name]) => name)
        )
    rows.forEach(([name, rate, bad], i) => {
        const y = b.y + i * 13
        if (bad) {
            rect(ctx, n < DASH.broke + 6 && n % 2 ? 'r' : 'Y', b.x, y - 1, b.w, 11)
            rect(ctx, 'r', b.x, y - 1, 2, 11)
        }
        drawText(ctx, name, b.x + 3, y + 1, { color: bad ? 'r' : 'k' })
        drawText(ctx, rate, rateX, y + 1, { color: bad ? 'r' : 'G' })
    })
}
// built: the missing tool has been made, so its "no tool" tag turns into a green "✓ built".
function intentsView(ctx, b, n, { built = false } = {}) {
    INTENTS.forEach(([text, count, tag], i) => {
        if (n < INTENT6.rows[i]) return
        const shown = Math.min(text.length, Math.floor((n - INTENT6.rows[i] + 1) * INTENT6.rowCpf))
        const typed = shown === text.length
        const y = b.y + 2 + i * 12
        const label = built ? '✓ built' : tag
        if (tag && typed) {
            const tw = measure(label) + 6,
                tx = b.x + b.w - tw - 1
            rect(ctx, built ? 'G' : 'r', tx, y + 10, tw, 10)
            drawText(ctx, label, tx + 3, y + 11, { color: 'W' })
        }
        rect(ctx, 'Y', b.x, y - 1, Math.round((((b.w * count) / 412) * shown) / text.length), 11)
        const c = `×${count}`
        ctx.save()
        ctx.beginPath()
        ctx.rect(b.x, y - 1, b.w - measure(c) - 4, 11)
        ctx.clip()
        drawText(ctx, `"${text.slice(0, shown)}${typed ? '"' : ''}`, b.x + 2, y + 1, { color: 'k' })
        ctx.restore()
        if (!typed) return
        drawText(ctx, c, b.x + b.w - measure(c) - 1, y + 1, { color: 'O' })
    })
}
function dash(ctx, f, scene, n) {
    office(ctx, n)
    const tab = n >= DASH.errors ? 1 : 0
    const b = appChrome(ctx, tab, ['Tools', 'Errors', 'Intents'])
    ;[() => toolsView(ctx, b, n, scene.start), () => errorsView(ctx, b, n)][tab]()
    DASH.tabClicks.forEach((c, k) => tabCursor(ctx, b, n, c, k + 1))
    for (let i = 0; i < 3; i++) {
        const t = progress(n, scene.start + i * 6, scene.start + i * 6 + 18)
        if (t > 0 && t < 1)
            envelope(
                ctx,
                Math.round(lerp(-10, SCR.x + 30 + i * 12, easeOut(t))),
                SCR.y + 40 - Math.round(Math.sin(t * Math.PI) * 14)
            )
    }
    officeFront(ctx, n, n < scene.start + 60 ? { k: n - scene.start, mood: 'question' } : null)
}

function ask(ctx, f, scene, n) {
    office(ctx, n)
    terminal(ctx, n, {
        prompt: ASK.prompt,
        typed: Math.max(0, Math.floor((n - ASK.typeFrom) * ASK.cpf)),
        lines: n >= ASK.enter ? [[ASK.status, 'o']] : [],
    })
    if (n >= ASK.boot && n < ASK.boot + 2) rect(ctx, 'W', SCR.x, SCR.y, SCR.w, SCR.h)
    officeFront(ctx, n, { k: 99, mood: 'question' })
    if (n >= ASK.hop) {
        const p = pathAt(BIT_ASK, n)
        drawAgent(ctx, 'bit', p, n, { scale: 2 })
    }
}

function phlevers(ctx, f, scene, n) {
    pipeRoom(ctx, n, false, scene.pipe)
    hogRoom(ctx, n, {
        sign: n >= PH_HOG.why[0] && n < PH_HOG.why[1] ? PH_HOG.why : null,
        nods: [PH_HOG.say[0] + 10],
        stamp: { x: PAW.x, y: 125, at: PH_HOG.stamp },
    })
    flyingLetter(ctx, n, PH_HOG.send, false, false)
    for (const l of PH_LEVERS) lever(ctx, l, n, { floor: FLOOR })
    const p = pathAt(BIT_PH, n)
    drawAgent(ctx, 'bit', { ...p, dir: !p.moving && p.x === ROOM.stop ? -1 : p.dir }, n, {
        scale: 2,
        carrying: n >= PH_CARD.pick,
    })
    if (n >= PH_HOG.say[0] && n < PH_HOG.say[1]) bubble(ctx, PH_HOG.says, p.x + 4, p.y - 34)
    if (n >= PH_CARD.at) {
        const w = Math.max(...PH_CARD.lines.map((l) => measure(l))) + 12
        const x = 160 - w / 2,
            y = 38
        panel(ctx, x, y, w, 30, { fill: 'd', bevel: 'g' })
        drawText(ctx, PH_CARD.lines[0], x + 6, y + 5, { color: 'o' })
        drawText(ctx, PH_CARD.lines[1], x + 6, y + 16, { color: 'W' })
    }
    irisIn(ctx, f, 60, 110, 8)
}

function answer(ctx, f, scene, n) {
    office(ctx, n)
    const lines = [[ASK.status, 'o'], ...ANSWER.lines.filter(([t]) => n >= t).map(([, text, c]) => [text, c])]
    terminal(ctx, n, { prompt: ASK.prompt, typed: 99, lines, scrolled: true })
    if (n >= ANSWER.back && n < ANSWER.back + 2) rect(ctx, 'W', SCR.x, SCR.y, SCR.w, SCR.h)
    officeFront(ctx, n, { k: 99, mood: 'question' })
    if (n < ANSWER.back) drawAgent(ctx, 'bit', pathAt(ANSWER.bit, n), n, { scale: 2, carrying: true })
}

function hisfix(ctx, f, scene, n) {
    pipeRoom(ctx, n, true, scene.pipe)
    const SX = HISFIX.x,
        green = n >= HISFIX.slam[1]
    const last = HISFIX.passers.filter((p) => n >= p.pull).at(-1)
    customerLevers(ctx, n, {
        pulls: { 'search docs': last?.pull },
        lights: {
            'find customers': 'L',
            'draft email': 'L',
            'search docs': green ? 'L' : Math.floor(n / 6) % 2 ? 'r' : 'O',
        },
    })
    if (n >= HISFIX.pop && n < HISFIX.slam[1]) {
        const grow = easeOut(progress(n, HISFIX.pop, HISFIX.pop + 6)),
            t = easeIn(progress(n, ...HISFIX.slam))
        // it pops in clear of the lever's name plate, whatever the font's width
        const restX = SX + Math.round((measure('search docs') + measure('PR #1')) / 2) + 20
        const cx = Math.round(lerp(restX, SX, t)),
            cy = Math.round(lerp(FLOOR - 58, FLOOR - 40, t))
        if (grow >= 1) prCard(ctx, cx, cy, 'PR #1')
        else rect(ctx, 'G', cx - 14 * grow, cy + 5 - 5 * grow, 28 * grow, 11 * grow)
        if (n >= HISFIX.merged) {
            const k = n - HISFIX.merged,
                s = k < 3 ? 2 - k * 0.3 : 1,
                w = Math.round((measure('Merged') + 6) * s),
                h = Math.round(11 * s)
            rect(ctx, 'k', cx - w / 2 - 1, cy - 14 - h / 2, w + 2, h + 2)
            rect(ctx, 'p', cx - w / 2, cy - 13 - h / 2, w, h)
            if (s === 1) drawText(ctx, 'Merged', cx - Math.round(measure('Merged') / 2), cy - 16, { color: 'W' })
        }
    }
    const k = n - HISFIX.slam[1]
    if (k >= 0 && k < 12)
        for (let i = 0; i < 8; i++)
            sparkle(
                ctx,
                SX + Math.round(Math.cos(i * 0.785) * (8 + k * 2)),
                FLOOR - 30 + Math.round(Math.sin(i * 0.785) * (6 + k)),
                2,
                i % 2 ? 'y' : 'L'
            )
    for (const p of HISFIX.passers) {
        const pos = pathAt(p.keys, n)
        drawAgent(ctx, p.tint, pos, n, { scale: 2, carrying: n >= p.pull + 3 })
        if (n >= p.pull && n < p.pull + 12)
            S.draw(
                ctx,
                S.coin(Math.floor((n - p.pull) / 3)),
                pos.x - 3,
                pos.y - 44 - Math.round(easeOut((n - p.pull) / 10) * 8)
            )
    }
    if (n >= HISFIX.count[0]) {
        const c = easeOut(progress(n, ...HISFIX.count)),
            head = 'search docs tool · errors',
            rate = `${lerp(6, 0.4, c).toFixed(1)}%`
        rect(ctx, 'k', 14, 16, 150, 44)
        rect(ctx, 'd', 15, 17, 148, 42)
        drawText(ctx, head, 89 - Math.round(measure(head) / 2), 21, { color: 'S' })
        bigNumber(ctx, rate, 89 - Math.round((measure(rate) * 3) / 2), 34, c >= 1 ? 'L' : 'r')
    }
    irisIn(ctx, f, 160, 110, 8)
}

// ================= LEVEL 3 stakes: the agent comes home empty-handed =================
const OTHER_CUSTOMER = { hoodie: 'p', shade: 'd', hair: 'N', hairHi: 'n', phones: false }
// The PostHog user's desk: a Cursor terminal holding the question and PostHog MCP's replies so far.
function cursorDesk(ctx, n, typed) {
    ctx.drawImage(homeRoom(), 0, 0)
    monitorFrame(ctx)
    const lines = [STAKES.call, ...STAKES.lines].filter(([at]) => n >= at).map(([, text, c]) => [text, c])
    terminal(ctx, n, { prompt: STAKES.prompt, typed, lines, scrolled: true, title: 'Cursor' })
}
function phask(ctx, f, scene, n) {
    cursorDesk(ctx, n, Math.max(0, Math.floor((n - STAKES.typeFrom) * STAKES.cpf)))
    if (n >= STAKES.boot && n < STAKES.boot + 3) rect(ctx, 'W', SCR.x, SCR.y, SCR.w, SCR.h)
    if (n >= STAKES.boot && n < STAKES.hop) {
        const r = 2 + (n - STAKES.boot) * 2,
            mx = SCR.x + SCR.w / 2,
            my = SCR.y + SCR.h / 2
        for (let a = 0; a < 16; a++)
            px(
                ctx,
                'b',
                mx + Math.round(Math.cos((a / 16) * 6.283) * r),
                my + Math.round(Math.sin((a / 16) * 6.283) * r * 0.7)
            )
    }
    if (n >= STAKES.hop) drawAgent(ctx, 'cursor', pathAt(CURSOR_OUT, n), n, { scale: 2 })
    ctx.drawImage(devSprite(OTHER_CUSTOMER), DEV.x, DEV.y + (Math.floor(n / 20) % 2))
    drawText(ctx, 'A POSTHOG USER AT HOME', 6, 168, { color: 'S', outline: 'k' })
    irisIn(ctx, f, 170, 84, 8)
}
function stakes(ctx, f, scene, n) {
    cursorDesk(ctx, n, 99)
    if (n < STAKES.home) drawAgent(ctx, 'hurt', pathAt(STAKES.back, n), n, { scale: 2 })
    const shrug =
        n >= STAKES.shrug && n < STAKES.shrug + 20 ? -Math.round(2 * Math.abs(Math.sin((n - STAKES.shrug) / 3))) : 0
    ctx.drawImage(devSprite(OTHER_CUSTOMER), DEV.x, DEV.y + shrug)
    irisIn(ctx, f, 170, 84, 8)
}

// ================= LEVEL 6 roadmap payoff: build the tool agents keep asking for =================
// Back on the dashboard after the first fix: the Intents tab types in, then the "no tool" row lights up and he clicks it.
function intents(ctx, f, scene, n) {
    office(ctx, n)
    const b = appChrome(ctx, n >= INTENT6.tabClick ? 2 : 1, ['Tools', 'Errors', 'Intents'])
    if (n >= INTENT6.tabClick) intentsView(ctx, b, n)
    else errorsView(ctx, b, n)
    tabCursor(ctx, b, n, INTENT6.tabClick, 2)
    const ry = b.y + 1 + (INTENTS.length - 1) * 12
    if (n >= INTENT6.glow && Math.floor((n - INTENT6.glow) / 6) % 2 === 0) {
        rect(ctx, 'o', b.x - 2, ry - 2, b.w + 4, 1)
        rect(ctx, 'o', b.x - 2, ry + 11, b.w + 4, 1)
        rect(ctx, 'o', b.x - 2, ry - 2, 1, 14)
        rect(ctx, 'o', b.x + b.w + 1, ry - 2, 1, 14)
    }
    if (n >= INTENT6.click - 24) {
        const t = easeOut(progress(n, INTENT6.click - 24, INTENT6.click))
        const cx = Math.round(lerp(b.x + b.w - 10, b.x + 60, t)),
            cy = Math.round(lerp(b.y + b.h - 6, ry + 4, t))
        if (n >= INTENT6.click && n < INTENT6.click + 6)
            for (let a = 0; a < 12; a++)
                px(
                    ctx,
                    'o',
                    cx + Math.round(Math.cos(a * 0.52) * (2 + n - INTENT6.click)),
                    cy + Math.round(Math.sin(a * 0.52) * (2 + n - INTENT6.click))
                )
        S.draw(ctx, S.cursor(), cx, cy)
    }
    officeFront(ctx, n, { k: 99, mood: 'question' })
    irisIn(ctx, f, 200, 64, 8)
}
// Both fixes shipped: the missing tool now reads "✓ built" and the owner finally smiles.
function proud(ctx, f, scene, n) {
    office(ctx, n)
    const b = appChrome(ctx, 2, ['Tools', 'Errors', 'Intents'])
    intentsView(ctx, b, n, { built: true })
    officeFront(ctx, n, { k: n - scene.start, mood: 'smile' })
    irisIn(ctx, f, 200, 64, 8)
}
// His pipe: agents wait at an empty slot asking for the tool; he adds it; it builds into the slot; they use it and go.
function planfix(ctx, f, scene, n) {
    pipeRoom(ctx, n, true, scene.pipe)
    const { slot, build, waiters } = PLANFIX
    const pulled = [...waiters].reverse().find((w) => n >= w.pull - 4)
    customerLevers(ctx, n, {
        lights: { 'find customers': 'L', 'draft email': 'L', 'search docs': 'L' },
        built: easeOut(progress(n, ...build)),
        slotPull: pulled?.pull,
    })
    if (n >= build[0]) {
        if (n < build[1] + 8)
            for (let a = 0; a < 8; a++)
                sparkle(
                    ctx,
                    slot + Math.round(Math.cos(a * 0.785 + n / 4) * (12 + (n - build[0]) / 2)),
                    FLOOR - 30 + Math.round(Math.sin(a * 0.785 + n / 4) * 14),
                    2,
                    'y'
                )
    }
    for (const w of waiters) {
        if (n < w.keys[0][0] || n >= w.keys.at(-1)[0]) continue
        const p = pathAt(w.keys, n)
        const shrug = n >= w.shrug && n < w.shrug + 14 ? -2 * (Math.floor((n - w.shrug) / 3) % 2) : 0
        drawAgent(ctx, w.tint, { ...p, y: p.y + shrug, dir: p.moving ? p.dir : 1 }, n, {
            scale: 2,
            carrying: n >= w.crate,
        })
        if (n >= w.bubble[0] && n < w.bubble[1]) bubble(ctx, PLANFIX.ask, p.x, p.y - 31)
    }
    if (n >= PLANFIX.typeFrom - 6) {
        const x = 104,
            y = 2,
            w = 150
        panel(ctx, x, y, w, 40, { fill: 'k', bevel: 'g' })
        drawText(ctx, 'Claude Code', x + 5, y + 3, { color: 'o' })
        drawText(ctx, '>', x + 5, y + 15, { color: 'o' })
        drawText(
            ctx,
            PLANFIX.prompt.slice(0, Math.max(0, Math.floor((n - PLANFIX.typeFrom) * PLANFIX.cpf))),
            x + 13,
            y + 15,
            { color: 'W' }
        )
        if (n >= PLANFIX.added) drawText(ctx, PLANFIX.done, x + 5, y + 27, { color: 'L' })
    }
    irisIn(ctx, f, 160, 110, 8)
}

function finalScene(ctx, f, scene, n) {
    storeBackdrop(ctx, n, { rightProps: false })
    const doorOpen = FINAL_VISITORS.some((p) => n >= p.arrive - 8 && n < p.arrive + 8)
    door(ctx, doorOpen)
    pipe(ctx, n, true)
    for (const p of FINAL_VISITORS) {
        const s = personAt(p, n)
        if (s.inside || !s.onScreen) continue
        const { spr, bob } = S.person(p.variant, s.step)
        S.draw(ctx, spr, s.x - 4, STREET_Y - 14 + bob, { flip: s.dir < 0 })
    }
    for (const r of FINAL_RUSH) {
        if (n < r.keys[0][0] || n > r.enter + 12) continue
        drawAgent(ctx, r.tint, pathAt(r.keys, n), n, { seed: r.i, clipY: n >= r.enter - 2 ? PIPE.rim + 1 : null })
    }
    pipeRim(ctx)
    hogPorthole(ctx, n)
    const users = FINAL_VISITORS.filter((p) => n >= p.arrive)
    const agents = FINAL_RUSH.filter((r) => n >= r.enter)
    hud(ctx, users.length, n - (users.at(-1)?.arrive ?? -99), { x: 4, y: 60 })
    hud(ctx, agents.length, n - (agents.at(-1)?.enter ?? -99), { label: 'agents', y: 60 })
    entranceLabel(ctx, n, FINAL.doorLabel, 'product analytics', DOOR_X, 86, 'eye')
    entranceLabel(ctx, n, FINAL.pipeLabel, 'MCP analytics', PIPE.x + 43, 100)
    irisIn(ctx, f, DOOR_X, 110, 10)
}
// From the street, the hog's room shows as a warm porthole on the pipe.
function hogPorthole(ctx, n) {
    const cx = PIPE.x,
        cy = STREET_Y - 12
    if (Math.floor(n / 8) % 2)
        for (let a = 0; a < 12; a++)
            px(ctx, 'y', cx + Math.round(Math.cos(a * 0.52) * 7), cy + Math.round(Math.sin(a * 0.52) * 7))
    disc(ctx, 'k', cx, cy, 6)
    disc(ctx, 'Y', cx, cy, 5)
    drawMiniHog(ctx, cx - 4, cy - 2)
}
function entranceLabel(ctx, n, at, text, cx, y, icon) {
    const k = easeOut(progress(n, at, at + 6))
    if (k <= 0) return
    const iw = icon ? 13 : 0,
        w = measure(text) + 8 + iw,
        h = Math.max(2, Math.round(13 * k))
    const x = Math.min(W - w - 2, Math.round(cx - w / 2)),
        yy = y + Math.round((13 - h) / 2)
    rect(ctx, 'k', x - 1, yy - 1, w + 2, h + 2)
    rect(ctx, 'd', x, yy, w, h)
    if (k < 1) return
    if (icon) S.draw(ctx, S.icon(icon), x + 3, y + 1)
    drawText(ctx, text, x + 4 + iw, y + 3, { color: 'y' })
}

// Establishing dive: the building whose MCP server we are about to be inside, then the camera plunges into its pipe.
const diveLayer = new OffscreenCanvas(W, 180)
function dive(ctx, f, scene, n) {
    const g = diveLayer.getContext('2d')
    const ph = scene.pipe === 'posthog'
    storeBackdrop(g, n, { rightProps: false, owner: scene.pipe })
    door(g, false)
    pipe(g, n, true, scene.pipe)
    if (scene.agent) {
        const s0 = scene.start
        const keys = [
            [s0, 150, STREET_Y],
            [s0 + 8, 234, STREET_Y],
            [s0 + 13, PIPE.x, PIPE.rim, 16],
            [s0 + 16, PIPE.x, PIPE.rim],
            [s0 + 22, PIPE.x, PIPE.rim + 18],
        ]
        drawAgent(g, scene.agent, pathAt(keys, n), n, { clipY: n >= s0 + 14 ? PIPE.rim + 1 : null })
    }
    pipeRim(g, scene.pipe)
    if (n >= (ph ? AT.hogroom : AT.dig6)) hogPorthole(g, n)
    const k = easeIn(progress(n, scene.start + 6, scene.end))
    const zoom = lerp(1, 12, k),
        sw = W / zoom,
        sh = 180 / zoom
    // zoom about the pipe mouth, so it stays put on screen while everything else rushes past
    const fx = PIPE.x,
        fy = PIPE.rim + 3,
        sx = fx * (1 - 1 / zoom),
        sy = fy * (1 - 1 / zoom)
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(diveLayer, sx, sy, sw, sh, 0, 0, W, 180)
    irisOut(ctx, f, scene.end - scene.start, 160, 90, 5)
}

// Level 3's way home: the failed agent climbs out of PostHog's pipe and trudges off the way it came.
function exit3(ctx, f, scene, n) {
    storeBackdrop(ctx, n, { rightProps: false, owner: scene.pipe })
    door(ctx, false)
    pipe(ctx, n, true, scene.pipe)
    const p = pathAt(EXIT3, n)
    drawAgent(ctx, 'hurt', p, n, { clipY: n < EXIT3[1][0] + 2 ? PIPE.rim + 1 : null })
    pipeRim(ctx, scene.pipe)
    irisIn(ctx, f, PIPE.x, PIPE.rim, 8)
    irisOut(ctx, f, scene.end - scene.start, 160, 110, 8)
}

export const RENDERERS_END = {
    dive,
    phask,
    exit3,
    teammate,
    before5,
    after5,
    stakes,
    owner,
    dash,
    intents,
    proud,
    ask,
    phlevers,
    answer,
    hisfix,
    planfix,
    final: finalScene,
}

// The single source of truth for picture and sound. Pure data + pure functions, importable from Node.
export const FPS = 30
// The track played for each mood. Paths are relative to music/.
export const MUSIC_CHOICE = {
    nostalgic: 'nostalgic/back-to-business.mp3',
    curious: 'curious/tiger-tracks.mp3',
    tense: 'tense/detector.mp3',
    triumphant: 'triumphant/conquerors-of-space.mp3',
}
export const MUSIC_VOLUME = 0.2
export const SFX_VOLUME = 0.8

// Scenes play back to back. `key` is unique; `id` picks the renderer.
// `ui: true` marks shots that introduce a screen the viewer has to read (pacing rule: at least 3.5s).
const SCENE_LIST = [
    // The title is a logo and PRESS START, not a screen to read: a plain 2.5s shot (owner call).
    ['title', 'title', 75],
    ['card1', 'card', 51, { title: 'LEVEL 1', subtitle: '2020 SOFTWARE' }],
    ['store', 'store', 219],
    ['desk', 'desk', 365, { ui: true }],
    ['loop', 'loop', 178],
    ['card2', 'card', 51, { title: 'LEVEL 2', subtitle: 'AGENTS ARRIVE' }],
    ['home1', 'home', 287, { ui: true }],
    ['street', 'street', 233],
    ['tunnel', 'tunnel', 178, { pipe: 'customer' }],
    ['home2', 'home', 98, { returning: true }],
    ['homes', 'homes', 244],
    ['busy', 'busy', 131],
    ['desk2', 'desk2', 230, { ui: true }],
    ['card3', 'card', 51, { title: 'LEVEL 3', subtitle: 'WE WERE BLIND TOO' }],
    ['hogpipe', 'hogpipe', 93],
    ['chart', 'chart', 174, { ui: true }],
    // A PostHog user's agent goes to PostHog's MCP, fails in the dark, and comes home empty-handed.
    ['phask', 'phask', 152, { ui: true }],
    ['dive3', 'dive', 24, { pipe: 'posthog', agent: 'cursor' }],
    ['dark', 'dark', 285, { pipe: 'posthog' }],
    ['exit3', 'exit3', 80, { pipe: 'posthog' }],
    ['stakes', 'stakes', 306],
    ['card4', 'card', 51, { title: 'LEVEL 4', subtitle: 'MEET MCP ANALYTICS' }],
    ['dive4', 'dive', 24, { pipe: 'posthog' }],
    ['hogroom', 'hogroom', 957, { pipe: 'posthog' }],
    ['card5', 'card', 51, { title: 'LEVEL 5', subtitle: 'IT WORKED FOR US' }],
    ['dive5a', 'dive', 24, { pipe: 'posthog' }],
    ['before5', 'before5', 120, { pipe: 'posthog' }],
    ['teammate', 'teammate', 442, { ui: true }],
    ['dive5b', 'dive', 24, { pipe: 'posthog' }],
    ['after5', 'after5', 180, { pipe: 'posthog' }],
    ['card6', 'card', 51, { title: 'LEVEL 6', subtitle: 'YOUR TURN' }],
    ['owner1', 'owner', 105, { ui: true }],
    ['dive6a', 'dive', 24, { pipe: 'customer' }],
    ['dig6', 'dig6', 75, { pipe: 'customer' }],
    // Level 6 pairs each problem with its fix: Tools + Errors -> fix search docs; Intents -> build export csv.
    ['dash', 'dash', 232, { ui: true }],
    ['ask', 'ask', 152, { ui: true }],
    // Bit travels from the owner's side to PostHog's building
    ['dive6b', 'dive', 24, { pipe: 'posthog', agent: 'bit' }],
    ['phlevers', 'phlevers', 239, { pipe: 'posthog' }],
    ['answer', 'answer', 210],
    ['dive6c', 'dive', 24, { pipe: 'customer' }],
    ['hisfix', 'hisfix', 110, { pipe: 'customer' }],
    ['intents', 'intents', 263, { ui: true }],
    ['dive6d', 'dive', 24, { pipe: 'customer' }],
    ['planfix', 'planfix', 226, { pipe: 'customer' }],
    ['proud', 'proud', 75],
    ['end', 'final', 350, { ui: true }],
]
export const PIPE_RENDERERS = [
    'tunnel',
    'dark',
    'hogroom',
    'before5',
    'after5',
    'dig6',
    'phlevers',
    'hisfix',
    'planfix',
    'dive',
]
export const SCENES = []
for (const [key, id, len, extra] of SCENE_LIST) {
    const start = SCENES.at(-1)?.end ?? 0
    SCENES.push({ key, id, start, end: start + len, ...extra })
}
export const FRAMES = SCENES.at(-1).end
export const AT = Object.fromEntries(SCENES.map((s) => [s.key, s.start]))
// Chapter names come from the level cards, for the preview's chapter list.
export const LEVELS = SCENES.filter((s) => s.id === 'card').map(({ title, subtitle, start }) => ({
    title,
    subtitle,
    start,
}))
const scene = (key) => SCENES.find((s) => s.key === key)
// Music cuts on the level cards: each segment starts its mood's track at offset 0 and stops at the next card.
export const MUSIC = [
    { mood: 'nostalgic', start: 0, end: AT.card1 },
    { mood: 'nostalgic', start: AT.store, end: AT.card2 },
    { mood: 'curious', start: AT.home1, end: AT.card3 },
    { mood: 'tense', start: AT.hogpipe, end: AT.card4 },
    { mood: 'triumphant', start: AT.dive4, end: AT.card5 },
    { mood: 'triumphant', start: AT.dive5a, end: AT.card6 },
    { mood: 'nostalgic', start: AT.owner1, end: FRAMES },
]
export const musicAt = (f) => MUSIC.find((m) => f >= m.start && f < m.end) ?? null
export const sceneAt = (f) => SCENES.find((s) => f >= s.start && f < s.end) ?? SCENES.at(-1)

export const TITLE = { drop: 3, land: 12, banner: 18, blinkFrom: 24, press: 44, irisFrom: 56, irisTo: 72 }

// Text beats. Tutorials type on at `cpf` chars/frame (default TYPE_CPF); captions appear whole.
export const TYPE_CPF = 1
export const POP_OPEN = 6
export const POP_CLOSE = 6
export const TEXTS = [
    {
        kind: 'tutorial',
        start: AT.store + 12,
        end: AT.store + 207,
        cpf: 2,
        text: 'Your users visit your website or app. You can watch what they do.',
    },
    {
        kind: 'caption',
        start: AT.loop + 12,
        end: AT.card2,
        text: "For years, this is how great products got built. It's what PostHog helps you do.",
        highlight: ['PostHog'],
    },
    {
        kind: 'tutorial',
        start: AT.home1 + 4,
        end: AT.home1 + 184,
        cpf: 4,
        text: 'These are AI agents. You tell them what you want, they do the work.',
    },
    {
        kind: 'tutorial',
        start: AT.street + 4,
        end: AT.street + 232,
        cpf: 4,
        text: 'MCP is a door built for agents. It lets them use your product directly, without ever opening your website.',
    },
    {
        kind: 'tutorial',
        start: AT.tunnel + 30,
        end: AT.tunnel + 170,
        cpf: 3,
        text: 'Each action an agent takes is a tool call.',
    },
    {
        kind: 'caption',
        start: AT.homes + 232,
        end: AT.busy + 131,
        text: "Your users don't leave the tools they love. They send agents instead.",
    },
    {
        kind: 'tutorial',
        start: AT.desk2 + 6,
        end: AT.desk2 + 222,
        cpf: 3,
        text: "Agents don't click, scroll or visit pages. So the tools you use to watch users see nothing.",
    },
    {
        kind: 'caption',
        start: AT.hogpipe + 2,
        end: AT.hogpipe + 93,
        text: 'PostHog has an MCP too.',
        highlight: ['PostHog'],
    },
    {
        kind: 'caption',
        start: AT.chart + 68,
        end: AT.chart + 174,
        text: '7x more tool calls in three months.',
        highlight: ['7x'],
    },
    { kind: 'float', start: AT.dark + 2, end: AT.dark + 99, text: 'Which tools do agents use?' },
    { kind: 'float', start: AT.dark + 99, end: AT.dark + 181, text: 'Which ones break?' },
    { kind: 'float', start: AT.dark + 181, end: AT.dark + 285, text: 'What were they trying to do?' },
    {
        kind: 'caption',
        start: AT.stakes + 155,
        end: AT.stakes + 306,
        text: 'Agents became our fastest-growing users. When they failed, we never knew.',
    },
    { kind: 'caption', start: AT.hogroom + 256, end: AT.hogroom + 356, text: 'Every agent tells the hog why.' },
    { kind: 'caption', start: AT.hogroom + 864, end: AT.hogroom + 955, text: 'Failures come back as feedback.' },
    {
        kind: 'caption',
        start: AT.teammate + 158,
        end: AT.teammate + 264,
        text: 'MCP analytics shows what broke, and why.',
    },
    { kind: 'caption', start: AT.teammate + 308, end: AT.teammate + 414, text: 'You and your agent fix it.' },
    { kind: 'caption', start: AT.after5 + 66, end: AT.after5 + 144, text: 'Seen, fixed, gone.' },
    // Level 6's tabs answer Level 3's questions, drawn in the same style as those floating questions
    { kind: 'echo', start: AT.dash + 2, end: AT.dash + 99, text: 'Which tools do agents use?' },
    { kind: 'echo', start: AT.dash + 107, end: AT.dash + 232, text: 'Which ones break?' },
    { kind: 'caption', start: AT.answer + 130, end: AT.hisfix + 78, text: 'Your agent can read it too.' },
    { kind: 'echo', start: AT.intents + 2, end: AT.intents + 263, text: 'What were they trying to do?' },
    { kind: 'caption', start: AT.planfix + 118, end: AT.planfix + 226, text: 'Agents tell you what to build next.' },
    { kind: 'caption', start: AT.end + 20, end: AT.end + 130, text: 'People and agents. PostHog sees both.' },
    { kind: 'caption', start: AT.end + 130, end: AT.end + 210, text: 'Stop building blind.' },
    // ends past the last frame so it never plays its close: the video ends on the command, held steady
    {
        kind: 'panel',
        start: AT.end + 210,
        end: AT.end + 350 + POP_CLOSE,
        text: 'MCP analytics, live in PostHog',
        cmd: 'npx -y @posthog/wizard@latest mcp-analytics',
    },
]
export const cpfOf = (t) => t.cpf ?? TYPE_CPF
export const typedAt = (t) => t.start + POP_OPEN + (t.kind === 'tutorial' ? Math.ceil(t.text.length / cpfOf(t)) : 2)
export const minHoldFrames = (t) => Math.ceil((1.5 + 0.25 * t.text.split(/\s+/).length) * FPS)

// Storefront: people walk to the door and go in. Door centre x, pavement y (feet).
export const DOOR_X = 160
export const STREET_Y = 150
export const ARRIVALS = [
    { at: 18, side: 'L', variant: 0, speed: 1.0 },
    { at: 50, side: 'R', variant: 1, speed: 0.9 },
    { at: 82, side: 'L', variant: 2, speed: 1.1 },
    { at: 114, side: 'R', variant: 3, speed: 1.0 },
    { at: 148, side: 'L', variant: 4, speed: 0.85 },
    { at: 184, side: 'R', variant: 5, speed: 1.15 },
].map(({ at, ...p }) => ({ ...p, arrive: AT.store + at }))
export function personAt(p, f) {
    const dir = p.side === 'L' ? 1 : -1
    const dist = (p.arrive - f) * p.speed
    const x = DOOR_X - dir * dist
    return { x: Math.round(x), dir, step: Math.floor(dist / 4), inside: f >= p.arrive, onScreen: x > -12 && x < 332 }
}

// Office monitor beats.
const d0 = AT.desk
// Each tab holds its reading time + 1s, and a cursor clicks the next tab before it switches.
export const DESK = {
    funnel: d0 + 2,
    barsDone: d0 + 24,
    tabClicks: [d0 + 99, d0 + 219],
    replay: d0 + 105,
    clicks: [d0 + 117, d0 + 129],
    ab: d0 + 225,
    flip: d0 + 253,
    ship: d0 + 343,
}

// Launch and loop.
export const loopTiming = (sc) => ({ draw: sc.start + 1, drawLen: 24, run: sc.start + 27 })
export const loopRevs = (f, run) => {
    const s = Math.max(0, f - run) / FPS
    return 0.25 * s + 0.07 * s * s
}
export const LOOP_NODES = ['WATCH', 'LEARN', 'TEST', 'SHIP']

// Level cards: title letters drop one by one, then the subtitle types on.
export const CARD = { drop: 2, gap: 1, fall: 6, subFrom: 14, subGap: 1 }
export const cardLetterLand = (i) => CARD.drop + i * CARD.gap + CARD.fall
function cardCues(q, card) {
    q.push(cue(card.start + 2, 'Win/win-7.wav', 0.5), cue(card.start + cardLetterLand(0), 'Player/landing.wav', 0.5))
}

// ---- Level 2 motion. Paths are [frame, x, feetY, hopHeight?] keys, linearly interpolated.
export function pathAt(keys, f) {
    if (f <= keys[0][0])
        return { x: keys[0][1], y: keys[0][2], moving: false, air: false, dir: Math.sign(keys[1][1] - keys[0][1]) || 1 }
    for (let i = 1; i < keys.length; i++) {
        const [f1, x1, y1, hop = 0] = keys[i]
        const [f0, x0, y0] = keys[i - 1]
        if (f <= f1) {
            const t = f1 === f0 ? 1 : (f - f0) / (f1 - f0)
            return {
                x: Math.round(x0 + (x1 - x0) * t),
                y: Math.round(y0 + (y1 - y0) * t - hop * 4 * t * (1 - t)),
                moving: x1 !== x0 && !hop,
                air: hop > 0 || y1 !== y0,
                dir: Math.sign(x1 - x0) || 1,
                speed: Math.abs(x1 - x0) / Math.max(1, f1 - f0),
            }
        }
    }
    const [, x, y] = keys.at(-1)
    return { x, y, moving: false, air: false, dir: 1 }
}

export const HOME = {
    prompt: "find last week's churned customers",
    typeFrom: AT.home1 + 186,
    typeCpf: 2,
    enter: AT.home1 + 212,
    boot: AT.home1 + 218,
    hop: AT.home1 + 226,
    land: AT.home1 + 242,
    runOff: AT.home1 + 271,
    back: AT.home2 + 16,
    lines: [AT.home2 + 22, AT.home2 + 28, AT.home2 + 32],
}
const DESK_Y = 128
export const BIT_HOME1 = [
    [HOME.hop, 208, 78],
    [HOME.land, 150, DESK_Y, 40],
    [HOME.runOff, 150, DESK_Y],
    [HOME.runOff + 13, 340, DESK_Y],
]
export const BIT_HOME2 = [
    [AT.home2 + 1, 332, DESK_Y],
    [AT.home2 + 10, 240, DESK_Y],
    [HOME.back, 208, 70, 30],
]

export const PIPE = { x: 245, rim: 112 }
const s2 = AT.street
export const BIT_STREET = [
    [s2 + 5, -14, STREET_Y],
    [s2 + 96, 234, STREET_Y],
    [s2 + 108, PIPE.x, PIPE.rim, 22],
    [s2 + 116, PIPE.x, PIPE.rim],
    [s2 + 128, PIPE.x, PIPE.rim + 18],
]
export const PIPE_ENTER = s2 + 116

const s3 = AT.tunnel
export const TUNNEL_FLOOR = 146
// The customer's MCP server is one place: the same levers in the same order in Level 2 and Level 6. The 4th slot
// stays an empty bracket until the owner builds "export csv" in Level 6. `up` staggers label heights so they fit.
export const CUSTOMER_LEVERS = [
    { x: 140, label: 'find customers' },
    { x: 186, label: 'draft email', up: true },
    { x: 232, label: 'search docs' },
    { x: 278, label: 'export csv', up: true, slot: true },
]
export const LEVERS = [
    { tool: 'find customers', pull: s3 + 48 },
    { tool: 'draft email', pull: s3 + 104 },
]
export const CRATE = { spawn: s3 + 112, pick: s3 + 120 }
export const BIT_TUNNEL = [
    [s3 + 6, 60, 10],
    [s3 + 20, 60, TUNNEL_FLOOR],
    [s3 + 24, 60, TUNNEL_FLOOR],
    [s3 + 42, 126, TUNNEL_FLOOR],
    [s3 + 62, 126, TUNNEL_FLOOR],
    [s3 + 90, 172, TUNNEL_FLOOR],
    [s3 + 124, 172, TUNNEL_FLOOR],
    [s3 + 152, 60, TUNNEL_FLOOR],
    [s3 + 158, 60, TUNNEL_FLOOR],
    [s3 + 172, 60, -30, 10],
]

// Zoomed-out homes: house 0 is our person (Bit is back), houses 1-3 launch their own agents.
const s4 = AT.homes
// Each other customer gets their own beat: the house lights up, they type a task, the bubble holds
// its reading time, then the agent hops out. Only one bubble is ever on screen.
export const TASK_CPF = 2.5
// owner exception: short task bubbles (2-4 words) read in 1.2s + 0.25s/word instead of 1.5s + 0.25s/word
const SHORT_BUBBLE_SAVE = 0.3
const bubbleHold = (task) =>
    minHoldFrames({ text: task }) - (task.split(/\s+/).length <= 4 ? Math.round(SHORT_BUBBLE_SAVE * FPS) : 0)
const OTHERS = [
    { tool: 'Codex', tint: 'codex', task: 'export invoices' },
    { tool: 'Cursor', tint: 'cursor', task: 'which plan am I on?' },
    { tool: 'Claude Code', tint: 'claude', task: 'summarize support tickets' },
]
export const HOUSE_W = 80
export const LAUNCHES = []
for (const [i, h] of OTHERS.entries()) {
    const house = i + 1
    const typeFrom = i ? LAUNCHES[i - 1].t + 1 : s4 + 12
    const typed = typeFrom + Math.ceil(h.task.length / TASK_CPF)
    const t = typed + bubbleHold(h.task)
    const sx = house * HOUSE_W + 40
    LAUNCHES.push({
        ...h,
        house,
        on: typeFrom - 8,
        typeFrom,
        typed,
        t,
        keys: [
            [t, sx, 104],
            [t + 12, sx + 14, 150, 18],
            [t + 16, sx + 14, 150],
            [t + 16 + Math.round((340 - sx - 14) / 4.5), 340, 150],
        ],
    })
}
export const HOUSES = [{ tool: 'Claude Code', tint: 'claude', on: s4 + 2 }, ...LAUNCHES]

// Busy pipe: agents from every tool stream in from both sides.
const s5 = AT.busy
const TINT_CYCLE = [
    'codex',
    'cursor',
    'claude',
    'cursor',
    'codex',
    'claude',
    'claude',
    'codex',
    'cursor',
    'codex',
    'claude',
    'cursor',
    'codex',
    'cursor',
]
export const RUSH = TINT_CYCLE.map((tint, i) => {
    const fromLeft = i % 3 !== 2
    const arrive = s5 + 8 + i * 5
    const speed = 3 + (i % 4) * 0.5
    const startX = fromLeft ? -14 : 334
    const groundX = fromLeft ? 234 : 256
    const t0 = arrive - Math.round(Math.abs(groundX - startX) / speed)
    return {
        tint,
        i,
        keys: [
            [t0, startX, STREET_Y],
            [arrive, groundX, STREET_Y],
            [arrive + 10, PIPE.x, PIPE.rim, 18],
            [arrive + 14, PIPE.x, PIPE.rim],
            [arrive + 24, PIPE.x, PIPE.rim + 18],
        ],
        enter: arrive + 14,
    }
})

export const DESK2 = { question: AT.desk2 + 6, replay: AT.desk2 + 100 }

// Footsteps only for the one character the camera follows (`follow`); everyone else walks silently.
function stepCues(q, keys, every, gain, rate, from = keys[0][0], to = keys.at(-1)[0], follow = true) {
    if (!follow) return
    for (let f = from; f < to; f += every) {
        const p = pathAt(keys, f)
        if (p.moving && p.x > -10 && p.x < 330)
            q.push(cue(f, 'Player/footstep.wav', gain, { rate, pan: +((p.x - 160) / 170).toFixed(2), follow: true }))
    }
}
function echo(q, frame, file, gain, extra = {}) {
    // pipe echo: two quieter repeats
    q.push(
        cue(frame, file, gain, extra),
        cue(frame + 5, file, gain * 0.35, extra),
        cue(frame + 10, file, gain * 0.12, extra)
    )
}
function level2Cues(q) {
    // One person, one agent
    const h1 = scene('home1')
    q.push(cue(h1.start, 'Environment/computing.wav', 0.07, { until: h1.end }))
    q.push(cue(h1.start + 2, 'UI/ok-3.wav', 0.35, { rate: 0.8 }))
    typingCues(q, HOME.typeFrom, HOME.prompt, -0.1, HOME.typeCpf)
    q.push(cue(HOME.enter, 'UI/ok-1.wav', 0.6))
    q.push(cue(HOME.boot, 'Environment/robot.wav', 0.3), cue(HOME.boot, 'Collect/collect-6.wav', 0.35))
    q.push(cue(HOME.hop, 'Player/jump-1.wav', 0.6), cue(HOME.land, 'Player/landing.wav', 0.6))
    q.push(
        cue(HOME.land + 6, 'UI/blip-1.wav', 0.4, { rate: 1.5 }),
        cue(HOME.land + 12, 'UI/blip-1.wav', 0.4, { rate: 1.9 }),
        cue(HOME.land + 8, 'UI/ok-3.wav', 0.3)
    )
    q.push(cue(HOME.runOff, 'Player/jump-4.wav', 0.3))
    stepCues(q, BIT_HOME1, 4, 0.16, 1.6, HOME.runOff)
    // The walk past the quiet door, into the pipe
    const st = scene('street')
    q.push(cue(st.start, 'gen/wind.wav', 0.55, { until: st.end }))
    for (let f = st.start + 20; f < st.end; f += 34) q.push(cue(f, 'Player/jump-6.wav', 0.07, { rate: 0.6, pan: -0.3 }))
    stepCues(q, BIT_STREET, 5, 0.18, 1.6)
    q.push(cue(PIPE_ENTER - 10, 'Player/jump-2.wav', 0.5))
    echo(q, PIPE_ENTER + 2, 'Player/teleport.wav', 0.45, { rate: 0.8 })
    ;[0, 14, 28].forEach((d, i) => q.push(cue(PIPE_ENTER + 24 + d, 'UI/blip-1.wav', 0.14, { rate: 1.2 + i * 0.15 })))
    // Inside the pipe: echoing steps, lever clunks, green success
    const tu = scene('tunnel')
    q.push(cue(s3 + 20, 'Player/landing.wav', 0.6))
    for (let f = s3 + 24; f < s3 + 172; f += 6) {
        const p = pathAt(BIT_TUNNEL, f)
        if (p.moving) echo(q, f, 'Player/footstep.wav', 0.15, { rate: 1.6, pan: +((p.x - 160) / 170).toFixed(2) })
    }
    for (const l of LEVERS.filter((l) => l.pull)) {
        echo(q, l.pull, 'Collide/hit-1.wav', 0.5)
        q.push(
            cue(l.pull + 1, 'UI/ok-3.wav', 0.4),
            cue(l.pull + 5, 'Collect/collect-2.wav', 0.4),
            cue(l.pull + 8, 'Shoot/laser-3.wav', 0.12, { rate: 0.8 })
        )
    }
    q.push(cue(CRATE.spawn, 'Collect/collect-1.wav', 0.4), cue(CRATE.pick, 'UI/ok-3.wav', 0.3, { rate: 1.3 }))
    echo(q, s3 + 174, 'Player/jump-1.wav', 0.4)
    // Bit comes home with the crate
    const h2 = scene('home2')
    q.push(cue(h2.start, 'Environment/computing.wav', 0.07, { until: h2.end }))
    stepCues(q, BIT_HOME2, 4, 0.16, 1.6)
    q.push(cue(HOME.back - 12, 'Player/jump-1.wav', 0.45), cue(HOME.back, 'Player/teleport.wav', 0.3, { rate: 1.5 }))
    HOME.lines.forEach((f, i) => {
        for (let k = 0; k < 6; k++) q.push(cue(f + k * 2, 'UI/blip-2.wav', 0.2, { rate: 1.8 }))
        if (i === 2) q.push(cue(f, 'Win/win-1.wav', 0.7))
    })
    // Everyone else joins
    q.push(cue(scene('homes').start, 'Environment/computing.wav', 0.08, { until: scene('homes').end }))
    for (const l of LAUNCHES) {
        const pan = +((l.keys[0][1] - 160) / 170).toFixed(2)
        for (let f = l.typeFrom; f < l.typed; f += 4)
            q.push(cue(f, 'UI/blip-2.wav', 0.16, { pan, rate: 1.9 + (f % 3) * 0.1 }))
        q.push(cue(l.on, 'UI/ok-1.wav', 0.25, { pan }), cue(l.t, 'Player/jump-2.wav', 0.4, { pan }))
    }
    const bu = scene('busy')
    q.push(cue(bu.start, 'gen/wind.wav', 0.25, { until: bu.end }))
    for (const r of RUSH.filter((r) => r.i % 4 === 0))
        q.push(cue(r.enter - 10, 'Player/jump-2.wav', 0.25, { pan: 0.5 }))
    // The dev sees nothing
    const d2 = scene('desk2')
    q.push(cue(d2.start, 'Environment/computing.wav', 0.14, { until: d2.end }))
    q.push(cue(d2.start + 6, 'UI/ok-3.wav', 0.4), cue(DESK2.replay, 'UI/ok-3.wav', 0.4))
    q.push(cue(DESK2.question, 'UI/cancel-1.wav', 0.5), cue(DESK2.question + 6, 'Lose/lose-7.wav', 0.5))
}

// ---- Level 3. PostHog's own MCP, the growth chart, and the dark pipe.
const s6 = AT.hogpipe
export const HOG = { x: 176, wave: [s6 + 14, s6 + 60] }
export const HOG_RUSH = Array.from({ length: 8 }, (_, i) => {
    const tint = ['codex', 'cursor', 'claude'][i % 3]
    const arrive = s6 + 10 + i * 11
    const startX = -14
    const groundX = 234
    const t0 = arrive - Math.round((groundX - startX) / 2.4)
    return {
        tint,
        i,
        keys: [
            [t0, startX, STREET_Y],
            [arrive, groundX, STREET_Y],
            [arrive + 10, PIPE.x, PIPE.rim, 18],
            [arrive + 14, PIPE.x, PIPE.rim],
            [arrive + 24, PIPE.x, PIPE.rim + 18],
        ],
        enter: arrive + 14,
    }
})

// Weekly PostHog MCP tool calls, millions, weeks starting Monday.
export const WEEKLY = [
    ['Jun 22', 1.61],
    ['Jun 29', 1.8],
    ['Jul 6', 2.15],
    ['Jul 13', 2.66],
    ['Jul 20', 3.18],
    ['Jul 27', 4.06],
    ['Aug 3', 4.77],
    ['Aug 10', 5.37],
    ['Aug 17', 6.13],
    ['Aug 24', 7.72],
    ['Aug 31', 8.57],
    ['Sep 7', 9.47],
    ['Sep 14', 11.2],
    ['Sep 21', 12.2],
]
const s7 = AT.chart
export const CHART = {
    base: 140,
    pxPerM: 11.6,
    barAt: (i) => s7 + 6 + i * 3,
    grow: 4,
    lastFrom: s7 + 45,
    punch: s7 + 66,
    sevenX: s7 + 72,
}

// Dark pipe: agents pace between walls and bonk. Some of them fail, and flash red.
const s8 = AT.dark
export const DARK_FLOOR = 146
export const DARK_WALLS = [6, 86, 166, 246, 314]
export const DARK_AGENTS = [
    { tint: 'codex', L: 29, R: 63, speed: 0.6, phase: 10, fails: false },
    { tint: 'claude', L: 189, R: 223, speed: 0.5, phase: 0, fails: false },
    { tint: 'codex', L: 269, R: 291, speed: 0.55, phase: 15, fails: true },
]
// Ping-pong between walls L..R; returns position and the frame of the latest bonk.
export function pacerAt(a, f) {
    const span = a.R - a.L
    const d = Math.max(0, (f - s8) * a.speed + a.phase)
    const leg = Math.floor(d / span)
    const u = d - leg * span
    const right = leg % 2 === 0
    const x = Math.round(right ? a.L + u : a.R - u)
    const lastBonk = s8 + Math.ceil((leg * span - a.phase) / a.speed)
    return { x, y: DARK_FLOOR, moving: true, air: false, dir: right ? 1 : -1, lastBonk: leg > 0 ? lastBonk : -999 }
}
export const bonks = (a) => {
    const out = []
    for (let k = 1; ; k++) {
        const f = s8 + Math.ceil((k * (a.R - a.L) - a.phase) / a.speed)
        if (f >= scene('dark').end - 10) return out
        out.push({ f, x: k % 2 ? a.R : a.L })
    }
}
// The PostHog user's agent: drops in from the pipe, fails at "skill-get" as the second question appears, climbs back out.
export const DARK_OURS = {
    tint: 'cursor',
    fails: true,
    hurtFor: Infinity,
    pull: s8 + 104,
    lever: { x: 140, label: 'skill-get' },
    keys: [
        [s8 + 2, 106, -30],
        [s8 + 18, 106, DARK_FLOOR],
        [s8 + 70, 106, DARK_FLOOR],
        [s8 + 96, 120, DARK_FLOOR],
        [s8 + 222, 120, DARK_FLOOR],
        [s8 + 254, 96, DARK_FLOOR],
        [s8 + 274, 96, -70, 30],
    ],
}
// The way home, the outbound trip in reverse (right to left): out of PostHog's pipe, a hop down, a slow trudge off.
const s8x = AT.exit3
export const EXIT3 = [
    [s8x + 4, PIPE.x, PIPE.rim + 18],
    [s8x + 12, PIPE.x, PIPE.rim],
    [s8x + 22, 214, STREET_Y, 16],
    [s8x + 76, 100, STREET_Y],
]
export const FLICKERS = [s8 + 70, s8 + 71, s8 + 160, s8 + 250, s8 + 251, s8 + 252]

function level3Cues(q) {
    const hp = scene('hogpipe')
    q.push(cue(hp.start, 'Environment/birds.wav', 0.14, { until: hp.end }))
    HOG.wave.forEach((f) =>
        q.push(cue(f, 'UI/blip-1.wav', 0.3, { rate: 2 }), cue(f + 5, 'UI/blip-1.wav', 0.3, { rate: 2.3 }))
    )
    for (const r of HOG_RUSH.filter((r) => r.i % 3 === 0))
        q.push(cue(r.enter - 10, 'Player/jump-2.wav', 0.25, { pan: 0.5 }))
    // Chart: a blip per bar, pitching up with the value; a rising tone, then the punch through the screen
    WEEKLY.forEach(([, v], i) => {
        if (i < WEEKLY.length - 1) q.push(cue(CHART.barAt(i), 'UI/blip-1.wav', 0.3, { rate: 0.7 + v * 0.1 }))
    })
    q.push(cue(CHART.lastFrom, 'Environment/going-up.wav', 0.45, { rate: 1.1 }))
    q.push(
        cue(CHART.punch, 'Collide/explode-6.wav', 0.9),
        cue(CHART.punch, 'Collide/explode-3.wav', 0.5),
        cue(CHART.punch + 3, 'Collide/hit-5.wav', 0.4)
    )
    for (let k = 0; k < 6; k++)
        q.push(cue(CHART.punch + 12 + k * 5, 'Collide/bonk-3.wav', 0.1, { rate: 1.5 + k * 0.1, pan: 0.6 }))
    q.push(cue(CHART.sevenX, 'Win/win-9.wav', 0.5))
    // Dark pipe: eerie bed, echoing footsteps, bonks, red failures, light flicker, a tone per question
    const dk = scene('dark')
    q.push(cue(dk.start, 'Environment/eery-2.wav', 0.3, { until: dk.end }))
    for (const a of DARK_AGENTS.filter((a) => a.fails))
        for (const b of bonks(a).slice(0, 4)) {
            const pan = +((b.x - 160) / 170).toFixed(2)
            q.push(cue(b.f, 'Collide/bonk-2.wav', 0.5, { pan }), cue(b.f + 1, 'Collide/hit-4.wav', 0.3, { pan }))
        }
    for (const f of FLICKERS.filter((f, i) => FLICKERS[i - 1] !== f - 1))
        q.push(cue(f, 'Environment/shut-down-2.wav', 0.12, { rate: 3 }))
    for (const t of TEXTS.filter((t) => t.kind === 'float')) q.push(cue(t.start, 'UI/blip-1.wav', 0.3, { rate: 0.75 }))
    const [, [land]] = DARK_OURS.keys,
        [leave] = DARK_OURS.keys.at(-2)
    q.push(
        cue(land, 'Player/landing.wav', 0.45),
        cue(DARK_OURS.pull - 2, 'Collide/hit-1.wav', 0.35),
        cue(DARK_OURS.pull, 'Collide/bonk-2.wav', 0.55),
        cue(DARK_OURS.pull + 1, 'Lose/lose-7.wav', 0.35)
    )
    q.push(cue(leave, 'Player/jump-1.wav', 0.45))
}

// ---- Level 4: lights on. A hog bouncer moves in at the pipe entrance, asks every agent why,
// and sends each answer up a tube to a PostHog teammate's desk. Failures come back as red envelopes.
export const CMD = 'npx -y @posthog/wizard@latest mcp-analytics'
export const ROOM = { stop: 118 }
const s10 = AT.hogroom
export const HOGROOM = { dig: [s10 + 8, s10 + 22], tada: s10 + 22, lightsOn: s10 + 40 }
export const L4_LEVERS = [
    { x: 172, label: 'find customers' },
    { x: 272, label: 'skill-get' },
]
// Real event names from the SDK: every call is a $mcp_tool_call, an agent's complaint is $mcp_feedback.
export const SUBJECT = { call: '$mcp_tool_call', feedback: '$mcp_feedback' }
const SUBJECT_HOLD = 56
// The first letter of each kind travels slowly enough to follow up the tube; later ones zip.
const SLOW_TRIP = 40,
    FAST_TRIP = 26
export const TRAY_BOUNCE = 6
// Feedback is a tool MCP analytics ships: a failed agent writes a note and drops it in the feedback jar on the hog's desk,
// and the hog fishes it out and seals it into a red $mcp_feedback letter. `arc` is the drop into the jar, `fish` the pull out.
export const NOTE = { text: "can't read the skill", cpf: 2, arc: 6, fish: 8 }
// One visit: walk up, get asked why, answer; the hog holds up the letter (subject readable), stamps it and sends it;
// then the lever, and home (or back to the jar with a note that becomes its own letter).
function visit(t0, tint, says, lever, ok, slow) {
    const stand = L4_LEVERS[lever].x - 14
    const walk = Math.round((stand - ROOM.stop) / 4)
    const arrive = t0 + 30,
        say = [arrive + 28, arrive + 88]
    const trip = slow ? SLOW_TRIP : FAST_TRIP
    const letter = {
        show: [say[1], say[1] + SUBJECT_HOLD],
        stamp: say[1] + 24,
        send: [say[1] + SUBJECT_HOLD, say[1] + SUBJECT_HOLD + trip],
        subject: SUBJECT.call,
        slow,
    }
    const pull = letter.send[0] + walk + 6
    const v = { tint, says, lever, ok, arrive, why: [arrive + 4, arrive + 34], say, letter, pull }
    const keys = [
        [t0, -20, 146],
        [arrive, ROOM.stop, 146],
        [letter.send[0], ROOM.stop, 146],
        [letter.send[0] + walk, stand, 146],
        [pull + 6, stand, 146],
    ]
    if (ok) return { ...v, keys: [...keys, [pull + 6 + Math.round((stand + 20) / 5), -20, 146]] }
    // the note is written at the lever and stays up for its read, carried back so it drops into the jar as the read ends
    const write = pull + 12,
        typed = write + Math.ceil(NOTE.text.length / NOTE.cpf),
        drop = typed + minHoldFrames(NOTE)
    const plink = drop + NOTE.arc,
        show = plink + NOTE.fish
    const complaint = {
        note: [write, drop],
        typed,
        plink,
        show: [show, show + SUBJECT_HOLD],
        stamp: show + 24,
        send: [show + SUBJECT_HOLD, show + SUBJECT_HOLD + SLOW_TRIP],
        subject: SUBJECT.feedback,
        slow: true,
    }
    return {
        ...v,
        complaint,
        keys: [
            ...keys.slice(0, -1),
            [drop - 2 - walk, stand, 146],
            [drop - 2, ROOM.stop, 146],
            [complaint.send[0], ROOM.stop, 146],
            [complaint.send[0] + 30, -20, 146],
        ],
    }
}
export const VISITS = [
    visit(s10 + 64, 'bit', 'draft a win-back email', 0, true, true),
    visit(s10 + 330, 'codex', 'load the querying data skill', 1, false, false),
]
// Then many: a steady line of agents, each answer zipping up the tube as a small letter.
const CROWD_INTENTS = [
    ['find customers', 'find churned users'],
    ['skill-get', 'chart weekly signups'],
    ['find customers', 'weekly signup report'],
]
// The crowd waits until the feedback row has had its read (validate() checks it) before their letters push it off.
const CROWD_FROM = VISITS[1].complaint.send[1] + 58
export const CROWD = CROWD_INTENTS.map(([tool, intent], i) => {
    const t0 = CROWD_FROM + i * 16
    return {
        tint: ['cursor', 'codex', 'bit'][i],
        i,
        tool,
        intent,
        red: tool === L4_LEVERS[1].label,
        keys: [
            [t0, -20, 146],
            [t0 + 20, ROOM.stop, 146],
            [t0 + 26, ROOM.stop, 146],
            [t0 + 74, 340, 146],
        ],
        send: [t0 + 22, t0 + 46],
    }
})
// Every letter that reaches the teammate's desk, in order, with the row it adds to the event list.
export const LETTERS = [
    ...VISITS.map((v) => ({
        send: v.letter.send,
        slow: v.letter.slow,
        red: false,
        row: { tool: L4_LEVERS[v.lever].label, intent: v.says, result: v.pull, ok: v.ok },
    })),
    {
        send: VISITS[1].complaint.send,
        slow: true,
        red: true,
        row: { tool: L4_LEVERS[VISITS[1].lever].label, intent: NOTE.text, feedback: true },
    },
    ...CROWD.map((c) => ({
        send: c.send,
        red: c.red,
        row: { tool: c.tool, intent: c.intent, result: c.send[1], ok: !c.red },
    })),
].sort((a, b) => a.send[1] - b.send[1])
export const EVENT_ROWS = 2
// The complaint row must stay on the list long enough to read before newer rows push it off.
const feedbackAt = LETTERS.findIndex((l) => l.row.feedback)
export const COMPLAINT = {
    show: [
        LETTERS[feedbackAt].send[1] + TRAY_BOUNCE,
        (LETTERS[feedbackAt + EVENT_ROWS]?.send[1] ?? Infinity) + TRAY_BOUNCE,
    ],
}
export const TEAM_LABEL = [LETTERS[0].send[1], LETTERS[0].send[1] + 60]

// ---- Level 5: we tried it first. One real fix (PostHog PR #91107, skill-get), then three more.
// Level 5 at the teammate's desk, in four steps. MCP analytics shows WHAT broke and WHY; the person and their agent ship the FIX; then the RESULT.
const s11 = AT.teammate
export const TEAMMATE = { screen: s11 + 6, drops: [s11 + 6, s11 + 140], why: s11 + 150, fix: s11 + 278 }
export const FEEDBACK_LETTER = {
    subject: SUBJECT.feedback,
    body: NOTE.text,
    why: 'why: "load the querying data skill"',
}
export const FIX = {
    prompt: "scouts can't read skills. fix it",
    typeFrom: TEAMMATE.fix + 8,
    cpf: 1.5,
    done: '✓ PR #91107',
}
FIX.doneAt = FIX.typeFrom + Math.ceil(FIX.prompt.length / FIX.cpf) + 45
// The PR merges in place: a Merged stamp lands on the terminal's PR line once it has been read.
TEAMMATE.merged = FIX.doneAt + 36
// Before the fix, at PostHog's skill-get lever: most pulls fail, the agents stomp and drop notes in the overflowing
// feedback jar (one passes), while the hog keeps sealing red letters into the tube on its own beat.
export const SKILL_LEVER = { x: 170, label: 'skill-get' }
const SKILL_STAND = SKILL_LEVER.x - 14
const DROP_X = 136
export const BEFORE5 = [0, 1, 2, 3, 4].map((i) => {
    const t0 = AT.before5 + i * 14,
        pull = t0 + 30,
        ok = i === 2
    const base = { tint: ['codex', 'cursor', 'bit', 'claude', 'codex'][i], i, ok, pull }
    // they drop in from the pipe's ceiling and hop back out, as in Level 3, so no one walks across the jar's tag
    const enter = [
        [t0 + 6, DROP_X, -30],
        [t0 + 20, DROP_X, 146],
        [t0 + 26, SKILL_STAND, 146],
    ]
    if (ok) return { ...base, keys: [...enter, [pull + 6, SKILL_STAND, 146], [pull + 42, 340, 146]] }
    const drop = pull + 26
    return {
        ...base,
        drop,
        plink: drop + NOTE.arc,
        keys: [
            ...enter,
            [pull + 14, SKILL_STAND, 146],
            [pull + 24, ROOM.stop, 146],
            [drop + 4, ROOM.stop, 146],
            [drop + 20, ROOM.stop, -70, 30],
        ],
    }
})
export const SEALS = Array.from({ length: 8 }, (_, i) => AT.before5 + 8 + i * 14)
// After the fix, same place and crowd: every pull goes green and they carry on through with crates while the error rate falls.
const s13 = AT.after5
export const AFTER5 = [0, 1, 2, 3, 4].map((i) => {
    const t0 = s13 + i * 14,
        pull = t0 + 30
    return {
        tint: ['codex', 'cursor', 'bit', 'claude', 'codex'][i],
        i,
        pull,
        keys: [
            [t0, -20, 146],
            [t0 + 26, SKILL_STAND, 146],
            [pull + 4, SKILL_STAND, 146],
            [pull + 8, SKILL_STAND, 146, 10],
            [pull + 12, SKILL_STAND, 146],
            [pull + 50, 340, 146],
        ],
    }
})
export const AFTER_COUNT = [s13 + 20, s13 + 65]
export const CLEAR = s13 + 146

// ---- Level 6: the store owner wraps his MCP, then asks his own agent to use PostHog's MCP to fix it.
export const OWNER = { typeFrom: AT.owner1 + 4, cpf: 2, enter: AT.owner1 + 28 }
export const DIG6 = { dig: [AT.dig6 + 8, AT.dig6 + 22], lightsOn: AT.dig6 + 34 }
const s14 = AT.dash
export const DASH = { barsFull: s14 + 20, tabClicks: [s14 + 99], errors: s14 + 107, broke: s14 + 112 }
// Back on the dashboard after the first fix: the Intents tab, then the "no tool" row gets clicked.
const s14b = AT.intents
export const INTENT6 = {
    tabClick: s14b + 10,
    rows: [s14b + 18, s14b + 24, s14b + 30],
    rowCpf: 3,
    glow: s14b + 226,
    click: s14b + 257,
}
// The last row is the owner's own missing tool: agents keep asking for something he never built.
export const INTENTS = [
    ['draft win-back emails', 412],
    ['find churned customers', 288],
    ['export invoices as CSV', 96, 'no tool'],
]
export const TOOL_COUNTS = [
    ['find customers', 1284],
    ['draft email', 702],
    ['search docs', 96],
]
const s15 = AT.ask
export const ASK = {
    prompt: 'fix search docs',
    status: '● asking PostHog MCP',
    typeFrom: s15 + 2,
    cpf: 0.7,
    enter: s15 + 54,
    boot: s15 + 84,
    hop: s15 + 86,
    land: s15 + 98,
    runOff: s15 + 143,
}
export const BIT_ASK = [
    [ASK.hop, 250, 112],
    [ASK.land, 150, DESK_Y, 40],
    [ASK.runOff, 150, DESK_Y],
    [ASK.runOff + 7, 340, DESK_Y],
]
const s16 = AT.phlevers
// PostHog's own pipe has the hog room too: a quick why, a fast letter, then the two pulls.
export const PH_LEVERS = [
    { x: 170, label: 'tool failures', pull: s16 + 104 },
    { x: 260, label: 'tool stats', pull: s16 + 130 },
]
export const PH_HOG = {
    why: [s16 + 22, s16 + 40],
    says: 'debug search docs errors',
    say: [s16 + 36, s16 + 84],
    stamp: s16 + 86,
    send: [s16 + 88, s16 + 100],
}
export const BIT_PH = [
    [s16, -20, 146],
    [s16 + 20, ROOM.stop, 146],
    [s16 + 88, ROOM.stop, 146],
    [s16 + 98, 156, 146],
    [s16 + 108, 156, 146],
    [s16 + 124, 246, 146],
    [s16 + 221, 246, 146],
    [s16 + 237, -20, 146],
]
export const PH_CARD = { at: s16 + 132, pick: s16 + 221, lines: ['search docs:', "98% 'not found'"] }
const s17 = AT.answer
export const ANSWER = {
    bit: [
        [s17, 332, DESK_Y],
        [s17 + 10, 240, DESK_Y],
        [s17 + 16, 208, 70, 30],
    ],
    back: s17 + 16,
    lines: [
        [s17 + 22, 'Found it: empty queries fail.', 'W'],
        [s17 + 75, '✓ PR ready', 'L'],
    ],
}
const s18 = AT.hisfix
// In place, like Level 5's "after": the PR pops in by the search docs lever, gets its Merged stamp, slams into the lever,
// the waiting agents pull it and go, and the error rate counts down.
const SD = CUSTOMER_LEVERS.find((l) => l.label === 'search docs').x
export const HISFIX = {
    x: SD,
    pop: s18 + 4,
    merged: s18 + 22,
    slam: [s18 + 34, s18 + 42],
    count: [s18 + 46, s18 + 80],
    passers: [0, 1].map((i) => {
        const pull = s18 + 48 + i * 16,
            stand = SD - 14
        return {
            tint: ['claude', 'codex'][i],
            pull,
            keys: [
                [s18, stand - 30 - i * 24, 146],
                [pull - 6, stand - 30 - i * 24, 146],
                [pull - 2, stand, 146],
                [pull + 4, stand, 146],
                [pull + 8, stand, 146, 10],
                [pull + 12, stand, 146],
                [pull + 44, 340, 146],
            ],
        }
    }),
}
const s19 = AT.end
// The storefront beat: people through the door and agents into the pipe at a steady, even pace, then the end panel.
export const FINAL = { doorLabel: s19 + 24, pipeLabel: s19 + 54, panel: s19 + 210 }
export const FINAL_RUSH = Array.from({ length: 11 }, (_, i) => {
    const arrive = s19 + 30 + i * 30
    const t0 = arrive - Math.round(248 / 3.6)
    return {
        tint: ['bit', 'codex', 'cursor', 'claude'][i % 4],
        i,
        keys: [
            [t0, -14, STREET_Y],
            [arrive, 234, STREET_Y],
            [arrive + 10, PIPE.x, PIPE.rim, 18],
            [arrive + 14, PIPE.x, PIPE.rim],
            [arrive + 24, PIPE.x, PIPE.rim + 18],
        ],
        enter: arrive + 14,
    }
})
export const FINAL_VISITORS = Array.from({ length: 11 }, (_, i) => ({
    arrive: s19 + 16 + i * 30,
    side: i % 2 ? 'R' : 'L',
    variant: (i * 3) % 7,
    speed: 1 + (i % 3) * 0.15,
}))

function typingCues(q, from, text, pan = 0, cpf = 1) {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;[...text].forEach((ch, i) => {
        if (ch !== ' ' && i % 3 === 0)
            q.push(cue(from + Math.floor(i / cpf), 'UI/blip-2.wav', 0.2, { rate: 1.6 + ((i * 5) % 4) * 0.1, pan }))
    })
}
function hogRoomCues(q, [digFrom, digTo], lightsOn) {
    for (let f = digFrom; f < digTo; f += 6) q.push(cue(f, 'Collide/hit-2.wav', 0.25, { rate: 0.7 + (f % 3) * 0.1 }))
    q.push(cue(lightsOn, 'Environment/secret-area-2.wav', 0.45), cue(lightsOn + 4, 'Win/win-5.wav', 0.7))
}
const STAMP = (f) => cue(f, 'Collide/hit-5.wav', 0.5, { rate: 0.7 })
const WHOOSH = (f) => cue(f, 'Shoot/laser-1.wav', 0.2, { rate: 0.5 })
const LAND = (f) => cue(f, 'Player/landing.wav', 0.3, { rate: 1.8 })
const PAPER = (f) => cue(f, 'UI/blip-2.wav', 0.2, { rate: 0.55 })
const PLINK = (f) => cue(f, 'Collect/coin-2.wav', 0.5, { rate: 1.7 })
function endgameCues(q) {
    for (const d of SCENES.filter((sc) => sc.id === 'dive'))
        q.push(
            cue(d.start + 4, 'Shoot/laser-1.wav', 0.3, { rate: 0.45 }),
            cue(d.end - 4, 'Player/teleport.wav', 0.2, { rate: 1.4 })
        )
    // Level 4
    q.push(cue(AT.hogroom, 'Environment/eery-2.wav', 0.18, { until: HOGROOM.lightsOn }))
    hogRoomCues(q, HOGROOM.dig, HOGROOM.lightsOn)
    for (const v of VISITS) {
        stepCues(q, v.keys, 5, 0.12, 1.6)
        q.push(
            cue(v.why[0], 'UI/blip-1.wav', 0.35, { rate: 1.3 }),
            cue(v.say[0], 'UI/blip-2.wav', 0.3, { rate: 1.6 }),
            cue(v.letter.show[0], 'UI/ok-1.wav', 0.3),
            STAMP(v.letter.stamp),
            WHOOSH(v.letter.send[0]),
            LAND(v.letter.send[1])
        )
        q.push(cue(v.pull - 2, 'Collide/hit-1.wav', 0.4))
        if (v.ok) q.push(cue(v.pull + 4, 'Collect/collect-2.wav', 0.4))
        else q.push(cue(v.pull, 'Collide/bonk-2.wav', 0.6), cue(v.pull + 1, 'Collide/hit-4.wav', 0.3))
        for (const l of [v.letter, v.complaint].filter((l) => l?.slow))
            q.push(WHOOSH(Math.round((l.send[0] + l.send[1]) / 2)), PAPER(l.send[1] + 2))
        if (v.complaint) typingCues(q, v.complaint.note[0], NOTE.text, 0.6, NOTE.cpf)
        if (v.complaint)
            q.push(
                PLINK(v.complaint.plink),
                STAMP(v.complaint.stamp),
                WHOOSH(v.complaint.send[0]),
                LAND(v.complaint.send[1]),
                cue(v.complaint.send[1] + 2, 'UI/cancel-3.wav', 0.3, { rate: 0.8 })
            )
    }
    q.push(cue(HOGROOM.tada, 'Collect/collect-6.wav', 0.5))
    for (const c of CROWD) q.push(WHOOSH(c.send[0]), LAND(c.send[1]))
    // Level 5: red envelopes pile up upstairs, a PR fixes skill-get, three more flip green
    const tm = scene('teammate')
    q.push(cue(tm.start, 'Environment/computing.wav', 0.1, { until: tm.end }))
    for (let f = TEAMMATE.drops[0]; f < TEAMMATE.drops[1]; f += 12) q.push(LAND(f + 8))
    q.push(cue(TEAMMATE.why, 'UI/ok-3.wav', 0.4), cue(TEAMMATE.why + 2, 'UI/blip-2.wav', 0.3, { rate: 0.6 }))
    q.push(cue(TEAMMATE.fix + 2, 'Player/jump-1.wav', 0.35, { rate: 1.4 }))
    typingCues(q, FIX.typeFrom, FIX.prompt, -0.2, FIX.cpf)
    q.push(cue(FIX.doneAt, 'Win/win-1.wav', 0.5))
    q.push(cue(TEAMMATE.merged, 'Collide/hit-3.wav', 0.6), cue(TEAMMATE.merged + 2, 'Win/win-1.wav', 0.5))
    for (const a of BEFORE5) {
        if (a.ok) {
            q.push(cue(a.pull, 'Collide/hit-1.wav', 0.3), cue(a.pull + 3, 'Collect/collect-2.wav', 0.35))
            continue
        }
        q.push(
            cue(a.pull, 'Collide/bonk-2.wav', 0.45, { rate: 0.9 + a.i * 0.05 }),
            cue(a.pull + 4, 'UI/cancel-1.wav', 0.2, { rate: 0.7 }),
            PLINK(a.plink)
        )
    }
    for (const s of SEALS) q.push(STAMP(s + 6), WHOOSH(s + 10))
    for (const a of AFTER5)
        q.push(
            cue(a.pull, 'Collide/hit-1.wav', 0.25),
            cue(a.pull + 3, 'Collect/coin-1.wav', 0.45, { rate: 1 + a.i * 0.08 }),
            cue(a.pull + 8, 'Player/jump-1.wav', 0.2, { rate: 1.4 })
        )
    for (let f = AFTER_COUNT[0]; f < AFTER_COUNT[1]; f += 5)
        q.push(cue(f, 'UI/blip-1.wav', 0.2, { rate: 1.8 - (f - AFTER_COUNT[0]) / 60 }))
    q.push(cue(AFTER_COUNT[1], 'Collect/collect-5.wav', 0.45))
    q.push(cue(CLEAR, 'Win/win-10.wav', 0.85), cue(CLEAR, 'Collect/collect-7.wav', 0.4))
    // Level 6
    const o1 = scene('owner1')
    q.push(cue(o1.start, 'Environment/computing.wav', 0.12, { until: o1.end }))
    typingCues(q, OWNER.typeFrom, CMD, -0.3, OWNER.cpf)
    q.push(cue(OWNER.enter, 'UI/ok-1.wav', 0.5))
    hogRoomCues(q, DIG6.dig, DIG6.lightsOn)
    const da = scene('dash')
    q.push(cue(da.start, 'Environment/computing.wav', 0.12, { until: da.end }))
    q.push(cue(da.start + 2, 'UI/cancel-1.wav', 0.3))
    TOOL_COUNTS.forEach((_, i) => q.push(cue(da.start + 6 + i * 6, 'UI/blip-1.wav', 0.25, { rate: 1 + i * 0.12 })))
    q.push(
        cue(DASH.errors, 'UI/ok-3.wav', 0.4),
        cue(DASH.broke, 'Collide/bonk-2.wav', 0.35),
        cue(DASH.broke + 1, 'Collide/hit-4.wav', 0.25)
    )
    q.push(cue(INTENT6.tabClick, 'UI/ok-1.wav', 0.4))
    INTENT6.rows.forEach((f, i) => q.push(cue(f, 'UI/blip-1.wav', 0.3, { rate: 1.1 + i * 0.15 })))
    const ak = scene('ask')
    q.push(cue(ak.start, 'Environment/computing.wav', 0.1, { until: ak.end }))
    typingCues(q, ASK.typeFrom, ASK.prompt, -0.2, ASK.cpf)
    q.push(
        cue(ASK.enter, 'UI/ok-1.wav', 0.55),
        cue(ASK.boot, 'Collect/collect-6.wav', 0.3),
        cue(ASK.hop, 'Player/jump-1.wav', 0.55),
        cue(ASK.land, 'Player/landing.wav', 0.5)
    )
    q.push(cue(ASK.land + 3, 'UI/blip-1.wav', 0.35, { rate: 1.6 }), cue(ASK.runOff, 'Player/jump-4.wav', 0.3))
    stepCues(q, BIT_ASK, 3, 0.14, 1.6, ASK.runOff)
    const ph = scene('phlevers')
    for (let f = ph.start + 2; f < ph.end; f += 5) {
        const p = pathAt(BIT_PH, f)
        if (p.moving) q.push(cue(f, 'Player/footstep.wav', 0.14, { rate: 1.6, pan: +((p.x - 160) / 170).toFixed(2) }))
    }
    for (const l of PH_LEVERS)
        q.push(
            cue(l.pull, 'Collide/hit-1.wav', 0.45),
            cue(l.pull + 1, 'UI/ok-3.wav', 0.35),
            cue(l.pull + 5, 'Collect/collect-2.wav', 0.4)
        )
    q.push(
        cue(PH_HOG.why[0], 'UI/blip-1.wav', 0.3, { rate: 1.3 }),
        cue(PH_HOG.say[0], 'UI/blip-2.wav', 0.25, { rate: 1.6 }),
        STAMP(PH_HOG.stamp),
        WHOOSH(PH_HOG.send[0])
    )
    q.push(cue(PH_CARD.at, 'Collect/collect-1.wav', 0.45), cue(PH_CARD.pick, 'UI/ok-3.wav', 0.3, { rate: 1.3 }))
    const an = scene('answer')
    q.push(cue(an.start, 'Environment/computing.wav', 0.1, { until: an.end }))
    stepCues(q, ANSWER.bit, 4, 0.14, 1.6)
    q.push(cue(ANSWER.back - 10, 'Player/jump-1.wav', 0.4), cue(ANSWER.back, 'Player/teleport.wav', 0.3, { rate: 1.5 }))
    ANSWER.lines.forEach(([f], i) => {
        for (let k = 0; k < 4; k++) q.push(cue(f + k * 2, 'UI/blip-2.wav', 0.18, { rate: 1.8 }))
        if (i === ANSWER.lines.length - 1) q.push(cue(f, 'Win/win-1.wav', 0.6))
    })
    const hf = scene('hisfix')
    q.push(
        cue(HISFIX.pop, 'UI/ok-1.wav', 0.4),
        STAMP(HISFIX.merged),
        cue(HISFIX.slam[1], 'Collide/hit-3.wav', 0.6),
        cue(HISFIX.slam[1] + 2, 'Collect/coin-1.wav', 0.6)
    )
    for (const p of HISFIX.passers)
        q.push(cue(p.pull, 'Collide/hit-1.wav', 0.3), cue(p.pull + 3, 'Collect/collect-2.wav', 0.35))
    for (let f = HISFIX.count[0]; f < HISFIX.count[1]; f += 5)
        q.push(cue(f, 'UI/blip-1.wav', 0.2, { rate: 1.8 - (f - HISFIX.count[0]) / 60 }))
    const en = scene('end')
    q.push(cue(en.start, 'Environment/birds.wav', 0.15, { until: en.end }))
    for (const r of FINAL_RUSH)
        q.push(
            cue(r.enter - 10, 'Player/jump-2.wav', 0.2, { pan: 0.5 }),
            cue(r.enter + 1, 'Collect/collect-2.wav', 0.18, { rate: 1.3, pan: 0.5 })
        )
    for (const p of FINAL_VISITORS) q.push(cue(p.arrive + 1, 'Collect/coin-1.wav', 0.45))
    q.push(
        cue(FINAL.doorLabel, 'UI/ok-1.wav', 0.4),
        cue(FINAL.pipeLabel, 'UI/ok-1.wav', 0.4, { rate: 1.2 }),
        cue(FINAL.panel, 'UI/ok-3.wav', 0.5)
    )
}

// ---- Level 3 stakes: a PostHog user sends an agent to PostHog's MCP; it comes home empty-handed.
// The terminal shows the agent really called PostHog's MCP, so the failure reads as PostHog's, not a generic AI error.
// Read in order: the question types, the call line follows once it has been read, the agent boots out of the screen;
// after the dark pipe it returns, each failure line waits for the one before, the customer shrugs,
// and only then the caption joins the terminal, which stays up.
const s20 = AT.phask,
    s20b = AT.stakes
export const STAKES = {
    prompt: 'how many users signed up last week?',
    typeFrom: s20 + 4,
    cpf: 3,
    call: [s20 + 76, '→ PostHog MCP: skill-get', 'o'],
    boot: s20 + 84,
    hop: s20 + 92,
    land: s20 + 108,
    runOff: s20 + 128,
    back: [
        [s20b + 1, 332, 128],
        [s20b + 34, 236, 128],
        [s20b + 46, 208, 70, 30],
    ],
    home: s20b + 46,
    shrug: s20b + 130,
    lines: [
        [s20b + 48, '✗ not found', 'r'],
        [s20b + 71, "Sorry, I couldn't do that.", 'r'],
    ],
}
export const CURSOR_OUT = [
    [STAKES.hop, 208, 78],
    [STAKES.land, 150, DESK_Y, 40],
    [STAKES.runOff, 150, DESK_Y],
    [STAKES.runOff + 13, 340, DESK_Y],
]
// ---- Level 6 roadmap payoff: the most-asked missing tool gets built.
const s21 = AT.planfix
// Cause -> effect: he clicks the "no tool" row, agents wait at an empty slot asking for it, he adds the tool, it builds, they use it.
const slot = CUSTOMER_LEVERS.find((l) => l.slot).x,
    standX = slot - 14
export const PLANFIX = {
    slot,
    ask: 'export CSV?',
    prompt: 'add an export csv tool',
    tool: 'export csv',
    done: '✓ added',
    typeFrom: s21 + 74,
    cpf: 1.5,
    added: s21 + 100,
    build: [s21 + 104, s21 + 118],
    waiters: [
        {
            tint: 'cursor',
            bubble: [s21 + 4, s21 + 40],
            shrug: s21 + 34,
            pull: s21 + 130,
            crate: s21 + 136,
            keys: [
                [s21, standX, 146],
                [s21 + 140, standX, 146],
                [s21 + 148, standX, 146, 12],
                [s21 + 150, standX, 146],
                [s21 + 172, 340, 146],
            ],
        },
        {
            tint: 'codex',
            bubble: [s21 + 40, s21 + 100],
            shrug: s21 + 70,
            pull: s21 + 166,
            crate: s21 + 172,
            keys: [
                [s21 + 14, -20, 146],
                [s21 + 40, standX - 58, 146],
                [s21 + 152, standX - 58, 146],
                [s21 + 164, standX, 146],
                [s21 + 176, standX, 146],
                [s21 + 184, standX, 146, 12],
                [s21 + 186, standX, 146],
                [s21 + 206, 340, 146],
            ],
        },
    ],
}

// ---- Sound. Every cue is derived from the beats above. The library is quiet, so both the
// page and the mix apply the same master gain before the limiter.
export const SFX_MASTER = 2.2
const cue = (frame, file, gain, extra = {}) => ({ frame, file, gain, ...extra })
// ---- Sound grammar: one sound per meaning, reused everywhere so it becomes recognizable.
const SOUND = {
    success: 'Collect/collect-2.wav',
    fail: 'Collide/bonk-2.wav',
    flash: 'Collide/hit-4.wav',
    ui: 'UI/ok-1.wav',
    pop: 'UI/blip-1.wav',
    coin: 'Collect/coin-1.wav',
    hop: 'Player/jump-2.wav',
    boot: 'Player/teleport.wav',
}
// Unique hero moments keep their own sound: title press, rocket, level up, 7x, lights on, level clear, sad trombone, final press.
const HERO = new Set([
    'UI/ok-2.wav',
    'Collect/collect-3.wav',
    'Player/blast-off.wav',
    'Player/blast-off-2.wav',
    'Win/win-3.wav',
    'Win/win-7.wav',
    'Win/win-9.wav',
    'Collide/explode-6.wav',
    'Collide/explode-3.wav',
    'Environment/secret-area-2.wav',
    'Win/win-5.wav',
    'Win/win-10.wav',
    'Win/win-1.wav',
    'Lose/lose-7.wav',
    'Environment/going-up.wav',
    'Player/landing.wav',
    'Environment/shut-down-2.wav',
    'UI/cancel-2.wav',
])
const REMAP = {
    'Collect/collect-1.wav': SOUND.success,
    'Collect/collect-4.wav': SOUND.success,
    'Collect/collect-5.wav': null,
    'Collect/collect-6.wav': null,
    'Collect/collect-7.wav': null,
    'Collect/coin-4.wav': SOUND.coin,
    'UI/ok-3.wav': SOUND.ui,
    'UI/cancel-1.wav': null,
    'UI/cancel-3.wav': null,
    'Player/jump-1.wav': SOUND.hop,
    'Player/jump-3.wav': SOUND.hop,
    'Player/jump-4.wav': SOUND.hop,
    'Player/jump-5.wav': SOUND.hop,
    'Player/jump-6.wav': SOUND.hop,
    'Collide/bonk-1.wav': SOUND.fail,
    'Collide/bonk-3.wav': null,
    'Collide/bonk-4.wav': SOUND.fail,
    'Collide/hit-1.wav': null,
    'Collide/hit-2.wav': null,
    'Collide/hit-3.wav': null,
    'Collide/hit-5.wav': null,
    'Collide/hit-6.wav': null,
    'Shoot/laser-1.wav': null,
    'Shoot/laser-3.wav': null,
    'Shoot/laser-6.wav': null,
    'Environment/robot.wav': SOUND.boot,
    'Environment/eery-1.wav': null,
}
const HERO_WINDOW = 45
const MIN_GAIN = 0.08
const SMALL = 0.4
function normalize(sorted) {
    const cards = SCENES.filter((s) => s.id === 'card')
    const heroFrames = sorted.filter((c) => HERO.has(c.file) && c.gain >= 0.5).map((c) => c.frame)
    const nearHero = (f) => heroFrames.some((h) => Math.abs(h - f) < HERO_WINDOW)
    const out = []
    const lastByFile = new Map()
    let lastStep = -99
    const recentSmall = []
    for (const c0 of sorted) {
        let c = { ...c0 }
        if (c.until) {
            const card = cards.find((k) => k.start > c.frame)
            if (card && c.until > card.start) c.until = card.start
            out.push(c)
            continue
        }
        if (!HERO.has(c.file) && c.file in REMAP) {
            if (!REMAP[c.file]) continue
            c.file = REMAP[c.file]
        }
        if (c.file === 'Player/footstep.wav') {
            if (!c.follow || c.frame - lastStep < 9) continue
            lastStep = c.frame
            c.gain = Math.max(c.gain, 0.14)
        }
        if (c.gain < MIN_GAIN) continue
        if (c.frame - (lastByFile.get(c.file) ?? -99) < 3) continue
        if (c.gain < SMALL && !HERO.has(c.file) && !nearHero(c.frame)) {
            while (recentSmall.length && recentSmall[0] <= c.frame - 30) recentSmall.shift()
            if (recentSmall.length >= 4) continue
            recentSmall.push(c.frame)
        }
        lastByFile.set(c.file, c.frame)
        delete c.follow
        out.push(c)
    }
    return out
}
// Loop: nodes pop in, then a chime each time the runner passes a node, pitching up with speed.
function loopCues(q, sc) {
    const L = loopTiming(sc)
    LOOP_NODES.forEach((_, i) =>
        q.push(cue(L.draw + Math.round(((i + 0.5) / 4) * L.drawLen), 'UI/blip-1.wav', 0.35, { rate: 1 + i * 0.15 }))
    )
    let passes = 0
    for (let f = L.run; f < sc.end; f++) {
        const n = Math.floor(loopRevs(f, L.run) * 4)
        if (n > passes) {
            passes = n
            q.push(cue(f, 'Collect/collect-2.wav', 0.22, { rate: Math.min(2, 0.9 + passes * 0.07) }))
        }
    }
    if (sc.end - L.run > 70) q.push(cue(L.run + 60, 'Environment/going-up.wav', 0.3))
}
function buildSfx() {
    const q = []
    // Title
    q.push(cue(TITLE.drop, 'Player/jump-3.wav', 0.45, { rate: 0.8 }))
    q.push(cue(TITLE.land, 'Player/landing.wav', 0.9), cue(TITLE.land, 'Collide/hit-2.wav', 0.35))
    q.push(cue(TITLE.banner, 'UI/blip-1.wav', 0.5))
    q.push(cue(TITLE.press, 'UI/ok-2.wav', 0.9), cue(TITLE.press + 3, 'Collect/collect-3.wav', 0.5))
    q.push(cue(TITLE.irisFrom, 'Player/teleport.wav', 0.4))
    // Level card
    for (const card of SCENES.filter((s) => s.id === 'card')) cardCues(q, card)
    // Storefront: bed, footsteps on each stride, door + coin + jingle per signup
    const store = scene('store')
    q.push(cue(store.start, 'Environment/birds.wav', 0.18, { until: store.end }))
    ARRIVALS.forEach((p, i) => {
        let prev = null
        for (let f = store.start; f < Math.min(p.arrive, store.end); f++) {
            const s = personAt(p, f)
            if (i === 0 && prev !== null && s.step !== prev && s.onScreen && s.step % 2 === 0) {
                q.push(
                    cue(f, 'Player/footstep.wav', 0.14, {
                        pan: +((s.x - 160) / 170).toFixed(2),
                        rate: 0.9,
                        follow: true,
                    })
                )
            }
            prev = s.step
        }
        if (p.arrive < store.end) {
            q.push(cue(p.arrive - 3, 'UI/ok-3.wav', 0.1, { rate: 0.7 }))
            q.push(cue(p.arrive + 1, i % 2 ? 'Collect/coin-4.wav' : 'Collect/coin-1.wav', 0.75))
            if ((i + 1) % 3 === 0) q.push(cue(p.arrive + 6, 'Collect/collect-5.wav', 0.3))
        }
    })
    q.push(cue(store.end - 14, 'Player/jump-5.wav', 0.3, { rate: 0.9 }))
    // Tutorial pop-ups: open, a blip every 3 typed characters, close
    for (const t of TEXTS.filter((t) => t.kind === 'tutorial')) {
        q.push(cue(t.start, 'UI/ok-1.wav', 0.55))
        const t0 = t.start + POP_OPEN
        for (let i = 0; i < t.text.length; i += 4)
            if (t.text[i] !== ' ')
                q.push(cue(t0 + Math.floor(i / cpfOf(t)), 'UI/blip-2.wav', 0.14, { rate: 1 + ((i * 7) % 5) * 0.04 }))
    }
    // Office
    const desk = scene('desk')
    q.push(cue(desk.start, 'Environment/computing.wav', 0.16, { until: desk.end }))
    for (const f of [DESK.funnel, DESK.replay, DESK.ab]) q.push(cue(f, 'UI/ok-3.wav', 0.45))
    ;[0, 1, 2].forEach((i) => q.push(cue(DESK.funnel + 4 + i * 6, 'UI/blip-1.wav', 0.28, { rate: 1 + i * 0.12 })))
    for (const f of DESK.clicks) q.push(cue(f, 'UI/blip-2.wav', 0.6, { rate: 0.8 }))
    q.push(cue(DESK.clicks[1] + 4, 'Collect/collect-2.wav', 0.3))
    q.push(cue(DESK.flip, 'Collect/collect-4.wav', 0.45))
    q.push(cue(DESK.ship, 'UI/ok-1.wav', 0.9), cue(DESK.ship, 'Collide/hit-3.wav', 0.45))
    // Launch
    q.push(cue(AT.loop, 'Player/jump-2.wav', 0.3))
    for (const sc of SCENES.filter((x) => x.id === 'loop')) loopCues(q, sc)
    for (const f of [...DESK.tabClicks, ...DASH.tabClicks, DESK2.replay - 8]) q.push(cue(f, 'UI/ok-1.wav', 0.4))
    level2Cues(q)
    level3Cues(q)
    endgameCues(q)
    for (const key of ['phask', 'stakes']) {
        const st = scene(key)
        q.push(cue(st.start, 'Environment/computing.wav', 0.08, { until: st.end }))
    }
    typingCues(q, STAKES.typeFrom, STAKES.prompt, 0.2, STAKES.cpf)
    q.push(cue(STAKES.call[0], 'UI/blip-2.wav', 0.3, { rate: 1.4 }))
    q.push(cue(STAKES.boot, 'Environment/robot.wav', 0.3), cue(STAKES.boot, 'Collect/collect-6.wav', 0.35))
    q.push(
        cue(STAKES.hop, 'Player/jump-1.wav', 0.6),
        cue(STAKES.land, 'Player/landing.wav', 0.6),
        cue(STAKES.runOff, 'Player/jump-4.wav', 0.3)
    )
    stepCues(q, CURSOR_OUT, 4, 0.16, 1.6, STAKES.runOff)
    q.push(
        cue(EXIT3[1][0], 'Player/jump-1.wav', 0.4, { rate: 0.8 }),
        cue(EXIT3[2][0], 'Player/landing.wav', 0.4),
        cue(EXIT3[2][0] + 4, 'Lose/lose-7.wav', 0.25)
    )
    stepCues(q, EXIT3, 7, 0.12, 0.9, EXIT3[2][0])
    stepCues(q, STAKES.back, 5, 0.12, 1.2, STAKES.back[0][0], STAKES.back[1][0])
    q.push(cue(STAKES.home - 10, 'Player/jump-2.wav', 0.4), cue(STAKES.home, 'Player/teleport.wav', 0.3))
    q.push(cue(STAKES.shrug, 'UI/cancel-1.wav', 0.3, { rate: 0.8 }))
    q.push(
        cue(STAKES.lines[0][0], 'Collide/bonk-2.wav', 0.4),
        cue(STAKES.lines[1][0], 'Collide/hit-4.wav', 0.4),
        cue(STAKES.shrug + 6, 'UI/cancel-2.wav', 0.5)
    )
    const pf = scene('planfix')
    q.push(
        cue(INTENT6.glow, 'UI/blip-1.wav', 0.3),
        cue(INTENT6.click, 'UI/ok-1.wav', 0.45),
        cue(AT.proud + 6, 'Collect/collect-3.wav', 0.45)
    )
    typingCues(q, PLANFIX.typeFrom, PLANFIX.prompt, -0.3, PLANFIX.cpf)
    q.push(cue(PLANFIX.added, 'UI/ok-1.wav', 0.45))
    for (let f = PLANFIX.build[0]; f < PLANFIX.build[1]; f += 4)
        q.push(cue(f, 'Collide/hit-2.wav', 0.25, { rate: 1.2 + (f % 3) * 0.1 }))
    q.push(cue(PLANFIX.build[1], 'Player/landing.wav', 0.5), cue(PLANFIX.build[1] + 2, 'Collect/collect-4.wav', 0.45))
    for (const w of PLANFIX.waiters) {
        q.push(
            cue(w.bubble[0], 'UI/blip-2.wav', 0.25, { rate: 1.4 }),
            cue(w.shrug, 'UI/cancel-1.wav', 0.2, { rate: 1.2 })
        )
        q.push(
            cue(w.pull, 'Collide/hit-1.wav', 0.35),
            cue(w.pull + 3, 'Collect/collect-2.wav', 0.45),
            cue(w.crate, 'Collect/coin-1.wav', 0.55),
            cue(w.crate + 10, 'Player/jump-1.wav', 0.3, { rate: 1.3 })
        )
    }
    return normalize(q.sort((a, b) => a.frame - b.frame))
}
export const SFX = buildSfx()

// Terminal lines follow the reading rule too: each stays visible long enough from the frame it finishes printing.
// `after` names the line it must wait behind, so each line can be read before the next appears.
const typedEnd = (from, text, cpf = 1) => from + Math.ceil(text.length / cpf)
export const TERMINAL_LINES = [
    { text: HOME.prompt, at: typedEnd(HOME.typeFrom, HOME.prompt, HOME.typeCpf), end: scene('home1').end },
    { text: 'Sending an agent...', at: HOME.enter, end: scene('home1').end },
    ...['Found 42 churned customers.', 'Draft email ready.', '✓ Done'].map((text, i) => ({
        text,
        at: HOME.lines[i],
        end: scene('home2').end,
    })),
    { text: CMD, at: typedEnd(OWNER.typeFrom, CMD, OWNER.cpf), end: scene('owner1').end },
    { text: '✓ MCP analytics added', at: OWNER.enter, end: scene('owner1').end },
    { text: ASK.prompt, at: typedEnd(ASK.typeFrom, ASK.prompt, ASK.cpf), end: scene('ask').end },
    { text: ASK.status, at: ASK.enter, end: scene('ask').end },
    { text: PH_CARD.lines.join(' '), at: PH_CARD.at, end: scene('phlevers').end },
    { text: `> ${STAKES.prompt}`, at: typedEnd(STAKES.typeFrom, STAKES.prompt, STAKES.cpf), end: scene('phask').end },
    { text: STAKES.call[1], at: STAKES.call[0], end: scene('phask').end, after: `> ${STAKES.prompt}` },
    ...STAKES.lines.map(([at, text], i) => ({
        text,
        at,
        end: scene('stakes').end,
        after: i ? STAKES.lines[i - 1][1] : STAKES.call[1],
    })),
    { text: FIX.prompt, at: typedEnd(FIX.typeFrom, FIX.prompt, FIX.cpf), end: scene('teammate').end },
    { text: FIX.done, at: FIX.doneAt, end: scene('teammate').end, after: FIX.prompt },
    { text: PLANFIX.prompt, at: typedEnd(PLANFIX.typeFrom, PLANFIX.prompt, PLANFIX.cpf), end: scene('planfix').end },
    { text: PLANFIX.done, at: PLANFIX.added, end: scene('planfix').end },
    ...ANSWER.lines.map(([at, text], i) => ({
        text,
        at,
        end: scene('answer').end,
        after: i ? ANSWER.lines[i - 1][1] : null,
    })),
]
const readFrames = (text) => Math.ceil((1.5 + 0.25 * text.split(/\s+/).length) * FPS)

// Pacing: shots and on-screen panels must hold long enough to read.
export const MIN_SHOT = Math.round(2.5 * FPS)
export const MIN_UI_SHOT = Math.round(3.5 * FPS)
const panelHold = (words, extra = 1) => Math.ceil((1.5 + 0.25 * words + extra) * FPS)
// Each entry: a panel or note that must stay readable (its reading time + `extra`, default 1s) from `from` until `until`.
export const PANELS = [
    ...LAUNCHES.map((l) => ({
        name: `L2 task "${l.task}"`,
        from: l.typed,
        until: l.t,
        words: l.task.split(/\s+/).length,
        extra: l.task.split(/\s+/).length <= 4 ? -SHORT_BUBBLE_SAVE : 0,
    })),
    { name: 'L1 funnel tab', from: DESK.barsDone, until: DESK.tabClicks[0], words: 4, extra: 0 },
    { name: 'L1 replay tab', from: DESK.clicks[1], until: DESK.tabClicks[1], words: 2 },
    { name: 'L1 A/B tab', from: DESK.flip, until: DESK.ship, words: 2 },
    { name: 'L2 empty funnel', from: scene('desk2').start + 6, until: DESK2.replay, words: 2 },
    { name: 'L2 no recordings', from: DESK2.replay, until: scene('desk2').end, words: 2 },
    ...VISITS.flatMap((v) => [v.letter, v.complaint].filter(Boolean)).map((l) => ({
        name: `L4 letter ${l.subject}`,
        from: l.show[0],
        until: l.show[1],
        words: 1,
        extra: 0,
    })),
    ...VISITS.filter((v) => v.complaint).map((v) => ({
        name: 'L4 feedback note',
        from: v.complaint.typed,
        until: v.complaint.note[1],
        words: NOTE.text.split(/\s+/).length,
        extra: 0,
    })),
    {
        name: 'L4 feedback row',
        from: COMPLAINT.show[0],
        until: COMPLAINT.show[1],
        words: ['feedback', LETTERS[feedbackAt].row.tool, LETTERS[feedbackAt].row.intent].join(' ').split(/\s+/).length,
    },
    { name: 'L5 what broke', from: TEAMMATE.screen, until: TEAMMATE.why, words: 9 },
    {
        name: 'L5 feedback letter',
        from: TEAMMATE.why,
        until: TEAMMATE.fix,
        words: Object.values(FEEDBACK_LETTER).join(' ').split(/\s+/).length,
        extra: 0,
    },
    { name: 'L5 Merged stamp', from: TEAMMATE.merged, until: scene('teammate').end, words: 1, extra: 0 },
    {
        name: 'L6 Tools tab',
        from: DASH.barsFull,
        until: DASH.tabClicks[0],
        words: 6,
        exception: 'owner override: 2.0s',
    },
    { name: 'L6 Errors tab', from: DASH.broke, until: scene('dash').end, words: 6 },
    {
        name: 'L6 Intents tab',
        from: INTENT6.rows.at(-1) + Math.ceil(INTENTS.at(-1)[0].length / INTENT6.rowCpf),
        until: INTENT6.glow,
        words: 15,
    },
]

// Returns a list of broken timing rules; empty means the timeline is sound.
export function validate() {
    const problems = []
    for (const m of MUSIC)
        if (!Number.isFinite(m.start) || !Number.isFinite(m.end) || m.start >= m.end)
            problems.push(`music segment "${m.mood}" has a bad range (${m.start}-${m.end}): a scene key was renamed?`)
    for (const t of TEXTS) {
        const hold = t.end - (t.kind === 'caption' ? 0 : POP_CLOSE) - typedAt(t)
        if (hold < minHoldFrames(t))
            problems.push(`"${t.text.slice(0, 24)}..." holds ${hold}f, needs ${minHoldFrames(t)}f`)
    }
    for (const [a, b] of TEXTS.map((t, i) => [t, TEXTS[i + 1]]).filter(([, b]) => b)) {
        if (b.start < a.end) problems.push(`"${a.text.slice(0, 16)}" overlaps "${b.text.slice(0, 16)}"`)
    }
    for (const sc of SCENES) {
        // allowed exception: level cards carry 2-4 big words, so 1.7s is enough (owner call)
        // dives are 0.8s camera moves into a pipe, not shots to read
        if (sc.id === 'dive') continue
        const need = sc.id === 'card' ? Math.round(1.7 * FPS) : sc.ui ? MIN_UI_SHOT : MIN_SHOT
        if (sc.end - sc.start < need) problems.push(`shot ${sc.key} is ${sc.end - sc.start}f, needs ${need}f`)
    }
    for (const p of PANELS)
        if (!p.exception && p.until - p.from < panelHold(p.words, p.extra))
            problems.push(`${p.name} holds ${p.until - p.from}f, needs ${panelHold(p.words, p.extra)}f`)
    for (const l of TERMINAL_LINES) {
        if (l.end - l.at < readFrames(l.text))
            problems.push(`terminal "${l.text.slice(0, 24)}" shows ${l.end - l.at}f, needs ${readFrames(l.text)}f`)
        const prev = l.after && TERMINAL_LINES.find((o) => o.text === l.after)
        if (prev && l.at - prev.at < Math.ceil(0.25 * prev.text.split(/\s+/).length * FPS))
            problems.push(`terminal "${l.text.slice(0, 24)}" follows "${prev.text.slice(0, 16)}" too soon`)
    }
    // In these scenes the caption waits until every terminal line has had its read, so the two are never read at once.
    for (const key of ['stakes']) {
        const sc = scene(key)
        const readBy = Math.max(
            ...TERMINAL_LINES.filter((l) => l.at >= sc.start && l.at < sc.end).map((l) => l.at + readFrames(l.text))
        )
        for (const t of TEXTS.filter((t) => t.kind === 'caption' && t.start < sc.end && t.end > sc.start))
            if (t.start < readBy)
                problems.push(`caption "${t.text.slice(0, 16)}" starts before the terminal in ${key} is read`)
    }
    // Every scene inside (or diving into) a pipe says whose MCP server it is.
    for (const sc of SCENES)
        if (PIPE_RENDERERS.includes(sc.id) && !['posthog', 'customer'].includes(sc.pipe))
            problems.push(`pipe scene ${sc.key} has no owner`)
    for (const c of SFX)
        if (c.frame < 0 || c.frame >= FRAMES) problems.push(`cue ${c.file} at ${c.frame} is out of range`)
    return problems
}

import { PALETTE } from './palette.js'

// A sprite is rows of palette keys. `mirror` rows are the left half and get reflected.
// `remap` swaps semantic keys (h = hair, S = shirt...) for palette keys per variant.
const cache = new Map()
export function sprite(name, rows, { mirror = false, remap = {} } = {}) {
    const key = `${name}:${JSON.stringify(remap)}`
    if (cache.has(key)) return cache.get(key)
    const full = mirror ? rows.map((r) => r + [...r].reverse().join('')) : rows
    const w = full[0].length
    for (const r of full) if (r.length !== w) throw new Error(`sprite ${name}: ragged row "${r}"`)
    const canvas = new OffscreenCanvas(w, full.length)
    const ctx = canvas.getContext('2d')
    full.forEach((row, y) =>
        [...row].forEach((ch, x) => {
            const c = remap[ch] ?? ch
            if (c === '.') return
            if (!PALETTE[c]) throw new Error(`sprite ${name}: unknown colour "${c}"`)
            ctx.fillStyle = PALETTE[c]
            ctx.fillRect(x, y, 1, 1)
        })
    )
    const s = { w, h: full.length, canvas }
    cache.set(key, s)
    return s
}

export function draw(ctx, s, x, y, { flip = false, scale = 1 } = {}) {
    x = Math.round(x)
    y = Math.round(y)
    if (!flip && scale === 1) return ctx.drawImage(s.canvas, x, y)
    ctx.save()
    ctx.imageSmoothingEnabled = false
    ctx.translate(x + (flip ? s.w * scale : 0), y)
    ctx.scale(flip ? -scale : scale, scale)
    ctx.drawImage(s.canvas, 0, 0)
    ctx.restore()
}

// ---- People: chibi walkers, facing right. h hair, S shirt, x shirt shade, P pants, t/T skin.
const HEAD = ['..kkkk..', '.khhhhk.', 'khhhhhhk', 'khhttttk', 'khtttktk', 'khttttTk', '.kttttk.']
const BODY = ['.kSSSSk.', 'kSSSSSSk', 'kxSSSSxk', 'ktSSSStk', '.kPPPPk.']
const LEGS = {
    pass: ['..kPPk..', '..kffk..'],
    stride: ['.kPkkPk.', 'kfk..kfk'],
}
const PERSON_FRAMES = {
    pass: [...HEAD, ...BODY, ...LEGS.pass],
    stride: [...HEAD, ...BODY, ...LEGS.stride],
}
export const PEOPLE_VARIANTS = [
    { h: 'N', S: 'o', x: 'O', P: 'B', t: 't', T: 'T', f: 'N' },
    { h: 'k', S: 'b', x: 'B', P: 'g', t: 'T', T: 'n', f: 'k' },
    { h: 'y', S: 'G', x: 'H', P: 'd', t: 't', T: 'T', f: 'N' },
    { h: 'O', S: 'p', x: 'd', P: 'B', t: 't', T: 'T', f: 'k' },
    { h: 'N', S: 'y', x: 'O', P: 'g', t: 'n', T: 'N', f: 'k' },
    { h: 's', S: 'r', x: 'O', P: 'd', t: 't', T: 'T', f: 'N' },
    { h: 'k', S: 'c', x: 'b', P: 'N', t: 'T', T: 'n', f: 'k' },
]
// 4-step cycle over 2 drawn poses plus a 1px bob on the pass pose.
export function person(variant, step) {
    const phase = ((step % 4) + 4) % 4
    const pose = phase % 2 === 0 ? 'stride' : 'pass'
    return {
        spr: sprite(`person-${pose}`, PERSON_FRAMES[pose], {
            remap: PEOPLE_VARIANTS[variant % PEOPLE_VARIANTS.length],
        }),
        bob: pose === 'pass' ? -1 : 0,
    }
}

// ---- Agents: one species, tinted by the tool that sent them. m body, u shade, f face, e eyes, a antenna tip.
const AGENT_HEAD = [
    '.....kak.....',
    '......k......',
    '..kkkkkkkkk..',
    '.kmmmmmmmmmk.',
    'kmmkkkkkkkmuk',
    'kmkfffffffkuk',
    'kmkfeWfeWfkuk',
    'kmkfeefeefkuk',
    'kmkfffffffkuk',
    'kmkffeeeffkuk',
    'kmmkkkkkkkmuk',
    '.kmmmmmmmmuk.',
    '..kkkkkkkkk..',
    '...kmmWmmuk..',
]
const AGENT_BLINK = { 6: 'kmkfffffffkuk', 7: 'kmkfeefeefkuk' }
const AGENT_LEGS = {
    stand: ['...kuk.kuk...', '...kkk.kkk...'],
    runA: ['..kuk...kuk..', '.kkk.....kkk.'],
    runB: ['....kuuuk....', '....kkkkk....'],
}
export const TINTS = {
    bit: { m: 'o', u: 'O', f: 'd', e: 'C', a: 'y' },
    claude: { m: 'T', u: 'n', f: 'd', e: 'Y', a: 's' },
    codex: { m: 'g', u: 'd', f: 'k', e: 'L', a: 's' },
    cursor: { m: 'b', u: 'B', f: 'd', e: 'C', a: 's' },
    hurt: { m: 'r', u: 'O', f: 'k', e: 'W', a: 'r' },
    fixer: { m: 'G', u: 'H', f: 'd', e: 'Y', a: 'y' },
}
export const AGENT_H = AGENT_HEAD.length + 2
// pose: 'stand' | 'runA' | 'runB'; blink closes the eyes; lit flips the antenna tip (Bit's blinking light).
export function agent(tint, pose = 'stand', { blink = false, lit = true } = {}) {
    const head = blink ? AGENT_HEAD.map((r, i) => AGENT_BLINK[i] ?? r) : AGENT_HEAD
    const remap = { ...TINTS[tint], ...(lit ? {} : { a: 'O' }) }
    return sprite(`agent-${pose}-${blink}`, [...head, ...AGENT_LEGS[pose]], { remap })
}
export const CRATE = ['.kkkkkkk.', 'knnynnnyk', 'kNNyNNNyk', 'kyyyyyyyk', 'knnynnnyk', 'kNNyNNNyk', '.kkkkkkk.']
export const crate = () => sprite('crate', CRATE)

// ---- PostHog-ish hedgehog, facing right. Frame 1 lifts the front paw to wave.
const HOG = [
    '....k..k..k.......',
    '...kNkkNkkNk......',
    '..kNnNNnNNnNk.....',
    '.kNnNnnNnnNnNk....',
    '.kNnnNnnNnnNnkk...',
    'kNnNnnNnnNnnktttk.',
    'kNnnNnnNnnNnkttktk',
    'kNnNnnNnnNnktttttk',
    'kNnnNnnNnnnkttttkk',
    '.kNnnnNnnnnkYYYtk.',
    '.kknnnnnnnkYYYYk..',
    '..kkkkkkkkkkkkk...',
]
const HOG_FEET = ['...kNk....kNk.....', '...kk.....kk......']
// Overrides per pose: two wave frames raise the paw by the face; blink closes the eye.
const HOG_POSES = {
    waveA: { 2: '..kNnNNnNNnNk..kk.', 3: '.kNnNnnNnnNnNk.ktk', 4: '.kNnnNnnNnnNnkkktk' },
    waveB: { 2: '..kNnNNnNNnNk.kk..', 3: '.kNnNnnNnnNnNkktk.' },
    blink: { 6: 'kNnnNnnNnnNnkttttk' },
}
export const hedgehog = (pose = 'idle', blink = false) => {
    const rows = [...HOG, ...HOG_FEET].map((r, i) => (blink && HOG_POSES.blink[i]) || HOG_POSES[pose]?.[i] || r)
    return sprite(`hog-${pose}-${blink}`, rows)
}

// ---- Coin, four spin frames.
const COIN = [
    ['..kkk..', '.kYyyk.', 'kYyyOyk', 'kYyyOyk', 'kyyyOyk', '.kyOOk.', '..kkk..'],
    ['.kkk.', 'kYyyk', 'kYyOk', 'kYyOk', 'kyyOk', 'kyOOk', '.kkk.'],
    ['.k.', 'kYk', 'kyk', 'kyk', 'kyk', 'kOk', '.k.'],
]
export const coin = (f) => {
    const i = [0, 1, 2, 1][((f % 4) + 4) % 4]
    return sprite(`coin${i}`, COIN[i])
}

// ---- Scenery.
export const CLOUD = [
    '..........WWWW..........',
    '.......WWWWWWWWW........',
    '....WWWWWWWWWWWWWWW.....',
    '..WWWWWWWWWWWWWWWWWWWW..',
    '.WWWWWWWWWWWWWWWWWWWWWW.',
    'WWWWWWWWWWWWWWWWWWWWWWWW',
    'CCWWWWWWWWWWWWWWWWWWWCCC',
    '.CCCCCWWWWWWWWWCCCCCCCC.',
    '...CCCCCCCCCCCCCCCCCC...',
]
export const cloud = () => sprite('cloud', CLOUD)

const TREE = (sway) => [
    `....${sway ? '.' : ''}kkkkkk${sway ? '' : '.'}.....`,
    '...kkLLLLLLkk...',
    '..kLLGLLLLGLLk..',
    '.kLGGGLLLGGGGLk.',
    '.kGGGGGGGGGGGGk.',
    'kLGGGHGGGGLGGGGk',
    'kGGGHGGGGGGGHGGk',
    'kGGHHGGGHGGGHHGk',
    'kGHHGGGHHHGGGHHk',
    '.kHHHGHHHHHGHHk.',
    '.kHHHHHHHHHHHHk.',
    '..kkHHHkkHHHkk..',
    '....kkknNkkk....',
    '......knNk......',
    '......knNk......',
    '......knNk......',
    '.....knnNNk.....',
]
export const tree = (f) => sprite(`tree${f % 2}`, TREE(f % 2))

export const LAMP = [
    '.kkkkk.',
    'kyYYYyk',
    'kyYWYyk',
    '.kyyyk.',
    '..kgk..',
    ...Array(18).fill('..kgk..'),
    '.kgggk.',
    'kgggggk',
]
export const lamp = () => sprite('lamp', LAMP)

export const BUSH = [
    '...kkkk..kkk...',
    '..kLLGGkkLLGk..',
    '.kLGGGGGLGGGGk.',
    'kGGGHGGGGGGHGGk',
    'kGGHHGGHGGHHGGk',
    '.kkkkkkkkkkkkk.',
]
export const bush = () => sprite('bush', BUSH)

export const POT_PLANT = [
    '..kk.kk.',
    '.kGGkLGk',
    'kLGGkGGk',
    '.kGHGGk.',
    '..kkGk..',
    '.kkkkkk.',
    '.kooOOk.',
    '.kooOOk.',
    '..kOOk..',
]
export const potPlant = () => sprite('pot', POT_PLANT)

// ---- UI icons (11x11) for the loop, plus the replay cursor.
export const ICONS = {
    eye: [
        '...........',
        '...kkkkk...',
        '.kkwwwwwkk.',
        'kwwwkkkwwwk',
        'kwwkbbWkwwk',
        'kwwkbkbkwwk',
        'kwwkbbbkwwk',
        'kwwwkkkwwwk',
        '.kkwwwwwkk.',
        '...kkkkk...',
        '...........',
    ],
    bulb: [
        '...kkkkk...',
        '..kYYYYyk..',
        '.kYYWYYyyk.',
        '.kYWYYYyyk.',
        '.kYYYYyyyk.',
        '..kYyyyyk..',
        '...kyyyk...',
        '...kgggk...',
        '...ksssk...',
        '...kgggk...',
        '....kkk....',
    ],
    flask: [
        '...kkkkk...',
        '....kwk....',
        '....kwk....',
        '....kwk....',
        '...kwwwk...',
        '..kwwwwwk..',
        '.kLLLLLLLk.',
        '.kLGLLWLLk.',
        'kLLLLLGLLLk',
        'kGGLLLLLGGk',
        '.kkkkkkkkk.',
    ],
    rocket: [
        '.....k.....',
        '....kok....',
        '...kooOk...',
        '...kwwSk...',
        '...kwbSk...',
        '...kwwSk...',
        '..kkwwSkk..',
        '.kokwwSkok.',
        '.kkkkkkkkk.',
        '....yYy....',
        '.....o.....',
    ],
}
export const icon = (name) => sprite(`icon-${name}`, ICONS[name])

export const CURSOR = [
    'k.......',
    'kk......',
    'kWk.....',
    'kWWk....',
    'kWWWk...',
    'kWWWWk..',
    'kWWWWWk.',
    'kWWWkkkk',
    'kWkWk...',
    'kk.kWk..',
    '...kWk..',
    '....k...',
]
export const cursor = () => sprite('cursor', CURSOR)
// The recorded user's pointer inside a replay, tinted so it never reads as the viewer's own.
export const replayCursor = () => sprite('cursor', CURSOR, { remap: { W: 'o' } })

export const FLAG = [
    'kk.......',
    'kokkkkk..',
    'kooooook.',
    'kooWoook.',
    'koooooook',
    'kkkkooook',
    'k...kkkk.',
    'k........',
    'k........',
    'k........',
]
export const flag = () => sprite('flag', FLAG)

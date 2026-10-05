import { PALETTE } from './palette.js'

// Proportional 5x7 bitmap font. Rows 0-6 sit on the baseline, rows 7-8 are descenders.
// Each glyph is rows separated by spaces; width is the row length.
const G = {
    A: '.###. #...# #...# ##### #...# #...# #...#',
    B: '####. #...# #...# ####. #...# #...# ####.',
    C: '.###. #...# #.... #.... #.... #...# .###.',
    D: '####. #...# #...# #...# #...# #...# ####.',
    E: '##### #.... #.... ####. #.... #.... #####',
    F: '##### #.... #.... ####. #.... #.... #....',
    G: '.###. #...# #.... #.### #...# #...# .####',
    H: '#...# #...# #...# ##### #...# #...# #...#',
    I: '### .#. .#. .#. .#. .#. ###',
    J: '..### ...#. ...#. ...#. #..#. #..#. .##..',
    K: '#...# #..#. #.#.. ##... #.#.. #..#. #...#',
    L: '#.... #.... #.... #.... #.... #.... #####',
    M: '#...# ##.## #.#.# #.#.# #...# #...# #...#',
    N: '#...# ##..# #.#.# #..## #...# #...# #...#',
    O: '.###. #...# #...# #...# #...# #...# .###.',
    P: '####. #...# #...# ####. #.... #.... #....',
    Q: '.###. #...# #...# #...# #.#.# #..#. .##.#',
    R: '####. #...# #...# ####. #.#.. #..#. #...#',
    S: '.###. #...# #.... .###. ....# #...# .###.',
    T: '##### ..#.. ..#.. ..#.. ..#.. ..#.. ..#..',
    U: '#...# #...# #...# #...# #...# #...# .###.',
    V: '#...# #...# #...# #...# .#.#. .#.#. ..#..',
    W: '#...# #...# #...# #.#.# #.#.# ##.## #...#',
    X: '#...# #...# .#.#. ..#.. .#.#. #...# #...#',
    Y: '#...# #...# .#.#. ..#.. ..#.. ..#.. ..#..',
    Z: '##### ....# ...#. ..#.. .#... #.... #####',
    a: '..... ..... .###. ....# .#### #...# .####',
    b: '#.... #.... ####. #...# #...# #...# ####.',
    c: '.... .... .### #... #... #... .###',
    d: '....# ....# .#### #...# #...# #...# .####',
    e: '..... ..... .###. #...# ##### #.... .###.',
    f: '..## .#.. #### .#.. .#.. .#.. .#..',
    g: '..... ..... .#### #...# #...# #...# .#### ....# .###.',
    h: '#.... #.... ####. #...# #...# #...# #...#',
    i: '# . # # # # #',
    j: '..# ... ..# ..# ..# ..# ..# #.# .#.',
    k: '#... #... #..# #.#. ##.. #.#. #..#',
    l: '#. #. #. #. #. #. .#',
    m: '..... ..... ##.#. #.#.# #.#.# #.#.# #.#.#',
    n: '.... .... ###. #..# #..# #..# #..#',
    o: '..... ..... .###. #...# #...# #...# .###.',
    p: '..... ..... ####. #...# #...# #...# ####. #.... #....',
    q: '..... ..... .#### #...# #...# #...# .#### ....# ....#',
    r: '.... .... #.## ##.. #... #... #...',
    s: '.... .... .### #... .##. ...# ###.',
    t: '.#. .#. ### .#. .#. .#. ..#',
    u: '.... .... #..# #..# #..# #..# .###',
    v: '..... ..... #...# #...# .#.#. .#.#. ..#..',
    w: '..... ..... #...# #...# #.#.# #.#.# .#.#.',
    x: '..... ..... #...# .#.#. ..#.. .#.#. #...#',
    y: '.... .... #..# #..# #..# #..# .### ...# .##.',
    z: '.... .... #### ...# .##. #... ####',
    0: '.###. #...# #..## #.#.# ##..# #...# .###.',
    1: '.#. ##. .#. .#. .#. .#. ###',
    2: '.###. #...# ....# ...#. ..#.. .#... #####',
    3: '##### ...#. ..#.. ...#. ....# #...# .###.',
    4: '...#. ..##. .#.#. #..#. ##### ...#. ...#.',
    5: '##### #.... ####. ....# ....# #...# .###.',
    6: '..##. .#... #.... ####. #...# #...# .###.',
    7: '##### ....# ...#. ..#.. .#... .#... .#...',
    8: '.###. #...# #...# .###. #...# #...# .###.',
    9: '.###. #...# #...# .#### ....# ...#. .##..',
    ' ': '... ... ... ... ... ... ...',
    '.': '. . . . . . #',
    ',': '.. .. .. .. .. .# .# #.',
    '!': '# # # # # . #',
    '?': '.###. #...# ....# ...#. ..#.. ..... ..#..',
    "'": '# # . . . . .',
    '"': '#.# #.# ... ... ... ... ...',
    ':': '. . # . . # .',
    ';': '.. .. .# .. .. .# .# #.',
    '-': '.... .... .... #### .... .... ....',
    '+': '..... ..#.. ..#.. ##### ..#.. ..#.. .....',
    '=': '.... .... #### .... #### .... ....',
    '/': '....# ...#. ...#. ..#.. .#... .#... #....',
    '(': '.# #. #. #. #. #. .#',
    ')': '#. .# .# .# .# .# #.',
    '<': '...# ..#. .#.. #... .#.. ..#. ...#',
    '>': '#... .#.. ..#. ...# ..#. .#.. #...',
    '%': '##..# ##..# ...#. ..#.. .#... #..## #..##',
    '*': '..... ..#.. #.#.# .###. #.#.# ..#.. .....',
    '#': '.#.#. .#.#. ##### .#.#. ##### .#.#. .#.#.',
    '·': '.. .. .. ## ## .. ..',
    '©': '.#####. #.....# #.###.# #.#...# #.###.# #.....# .#####.',
    '→': '..... ..#.. ...#. ##### ...#. ..#.. .....',
    _: '.... .... .... .... .... .... ####',
    '@': '.###. #...# #.### #.#.# #.### #.... .###.',
    $: '..#.. .#### #.#.. .###. ..#.# ####. ..#..',
    '✗': '..... #...# .#.#. ..#.. .#.#. #...# .....',
    '~': '..... ..... .#... #.#.# ...#. ..... .....',
    '×': '..... ..... #...# .#.#. ..#.. .#.#. #...#',
    '✓': '..... ....# ...#. #..#. .#.#. ..#.. .....',
    '●': '.... .... .##. #### #### .##. ....',
}

const GLYPHS = Object.fromEntries(
    Object.entries(G).map(([ch, s]) => {
        const rows = s.split(' ')
        return [ch, { w: rows[0].length, rows }]
    })
)
export const LINE_H = 11

const glyph = (ch) => GLYPHS[ch] ?? GLYPHS['?']

export function measure(text, spacing = 1) {
    let w = 0
    for (const ch of text) w += glyph(ch).w + spacing
    return Math.max(0, w - spacing)
}

export function wrap(text, maxW) {
    const lines = []
    let line = ''
    for (const word of text.split(' ')) {
        const next = line ? `${line} ${word}` : word
        if (line && measure(next) > maxW) {
            lines.push(line)
            line = word
        } else line = next
    }
    if (line) lines.push(line)
    return lines
}

// Calls px(x, y) for every lit pixel of the text at integer scale.
export function forEachPixel(text, x, y, scale, spacing, px) {
    x = Math.round(x)
    y = Math.round(y)
    let cx = x
    for (const ch of text) {
        const g = glyph(ch)
        g.rows.forEach((row, ry) => {
            for (let rx = 0; rx < row.length; rx++) if (row[rx] === '#') px(cx + rx * scale, y + ry * scale, ry)
        })
        cx += (g.w + spacing) * scale
    }
}

// capture.mjs --words sets globalThis.textLog to count the words that reach the screen.
export function drawText(ctx, text, x, y, { color = 'w', scale = 1, spacing = 1, shadow, outline } = {}) {
    globalThis.textLog?.add(text)
    if (outline) {
        ctx.fillStyle = PALETTE[outline]
        forEachPixel(text, x, y, scale, spacing, (px, py) => ctx.fillRect(px - 1, py - 1, scale + 2, scale + 2))
    }
    if (shadow) {
        ctx.fillStyle = PALETTE[shadow]
        forEachPixel(text, x, y + scale, scale, spacing, (px, py) => ctx.fillRect(px, py, scale, scale))
    }
    ctx.fillStyle = PALETTE[color]
    forEachPixel(text, x, y, scale, spacing, (px, py) => ctx.fillRect(px, py, scale, scale))
}

export const textWidth = (text, scale = 1, spacing = 1) => measure(text, spacing) * scale

// Chunky arcade logo text: 1px outline, drop shadow, top-to-bottom colour bands per glyph row.
export function drawLogoText(
    ctx,
    text,
    x,
    y,
    { scale = 3, bands = ['Y', 'y', 'y', 'o', 'o', 'O', 'O'], outline = 'k', shadow = 'k', spacing = 1 } = {}
) {
    globalThis.textLog?.add(text)
    ctx.fillStyle = PALETTE[shadow]
    forEachPixel(text, x, y + 3, scale, spacing, (px, py) => ctx.fillRect(px - 1, py - 1, scale + 2, scale + 2))
    ctx.fillStyle = PALETTE[outline]
    forEachPixel(text, x, y, scale, spacing, (px, py) => ctx.fillRect(px - 1, py - 1, scale + 2, scale + 2))
    forEachPixel(text, x, y, scale, spacing, (px, py, row) => {
        ctx.fillStyle = PALETTE[bands[Math.min(row, bands.length - 1)]]
        ctx.fillRect(px, py, scale, scale)
    })
}

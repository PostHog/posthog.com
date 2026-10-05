// One character per colour so sprites can be written as strings. '.' is transparent.
export const PALETTE = {
    k: '#151515', // PostHog near-black, outlines
    d: '#262b44', // night navy
    g: '#3e4a66', // slate
    s: '#8b93af', // cool grey
    S: '#c0c6d6', // light grey
    w: '#eeefe9', // PostHog beige
    W: '#ffffff',
    o: '#f54e00', // PostHog orange
    O: '#a63a12', // burnt orange shade
    y: '#f9bd2b', // PostHog yellow
    Y: '#ffe7a0', // pale yellow light
    b: '#1d4aff', // PostHog blue
    B: '#122a8c', // deep blue
    c: '#5b9cff', // sky
    C: '#a8d8ff', // pale sky
    r: '#d9304a', // red
    G: '#3e9b4f', // leaf green
    H: '#1f5c3a', // dark green
    L: '#94d26a', // light green
    n: '#8a5a36', // wood
    N: '#4d2e1c', // dark wood
    t: '#f2bf94', // skin
    T: '#c4855c', // skin shade
    p: '#8f5bd6', // purple
}

export const rgb = Object.fromEntries(
    Object.entries(PALETTE).map(([k, hex]) => [k, [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16))])
)

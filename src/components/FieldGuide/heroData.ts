// Design tokens for the Field Guide.
// Colors come from the Figma "HSL approved colours" palette (sampled — verify exact
// hex against Figma variables before final). Ink/paper match the printed booklet.

export const INK = '#451C01' // dark-brown ink used for all type in the booklet
export const PAPER = '#F0ECD9' // cream paper background

// 12 named palette colors (core + lightest "background blur" variant).
// Ordered warm → cool so we can band them west → east across the map.
export const PALETTE: { name: string; core: string; bg: string }[] = [
    { name: 'coral', core: '#FF474D', bg: '#FFB5B8' },
    { name: 'tangerine', core: '#FF5C1C', bg: '#FFBEA4' },
    { name: 'yellow', core: '#FFA81C', bg: '#FFDCA4' },
    { name: 'lemon', core: '#FFCE1C', bg: '#FFEBA4' },
    { name: 'lime', core: '#A0CA21', bg: '#D9EAA6' },
    { name: 'green', core: '#47C861', bg: '#B5E9C0' },
    { name: 'teal', core: '#43DAB3', bg: '#B4F0E1' },
    { name: 'corn blue', core: '#2BB3DF', bg: '#AAE1F2' },
    { name: 'blue', core: '#1490E8', bg: '#A1D3F6' },
    { name: 'cobalt', core: '#0457FF', bg: '#9BBCFF' },
    { name: 'violet', core: '#6D4FFF', bg: '#C4B9FF' },
    { name: 'purple', core: '#A737D2', bg: '#DCAFED' },
]

/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

// Shared frame for the automated OG cards: a posthog.com menu bar and one dialog window
// with text on the left, a hog on the right, and an orange button. Fonts, logo, and hogs
// come from @posthog/brand.
const brandDir = path.dirname(require.resolve('@posthog/brand'))
const base64 = (file) => fs.readFileSync(file, { encoding: 'base64' })

const fontFace = (file, weight) =>
    `@font-face { font-family: 'RoundHog'; src: url(data:font/woff2;base64,${base64(
        path.join(brandDir, 'fonts', file)
    )}) format('woff2'); font-weight: ${weight}; }`

let shared
const getShared = () => {
    if (!shared) {
        const { LOGO_BODY, LOGO_VIEW_BOX } = require(path.join(brandDir, 'logo/geometry.mjs'))
        shared = {
            fonts: [
                fontFace('RoundHog-Medium.woff2', 500),
                fontFace('RoundHog-SemiBold.woff2', 700),
                fontFace('RoundHog-Bold.woff2', 800),
            ].join('\n'),
            logo: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_VIEW_BOX.landscape}" width="130" style="color:#151515">${LOGO_BODY.landscape.mono}</svg>`,
        }
    }
    return shared
}

const hogImage = (name) =>
    `data:image/png;base64,${base64(path.join(brandDir, 'generated/hoggies/png', `${name}.png`))}`

const escapeHtml = (value = '') =>
    String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const toggle = (color) =>
    `<span style="display:inline-block;width:40px;height:24px;border-radius:12px;background:${color};position:relative;flex:none"><span style="position:absolute;right:3px;top:3px;width:18px;height:18px;border-radius:50%;background:#fff"></span></span>`

const cursor = `<svg width="38" height="56" viewBox="0 0 22 32" style="position:absolute;right:16px;bottom:-28px;filter:drop-shadow(0 2px 3px #0005)"><path d="M1 1v25l6.2-6 4.3 10.2 4-1.7-4.2-10H19z" fill="#151515" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/></svg>`

// Shrinks the headline until the text block fits above the button.
const fitScript = `<script>
function fit() {
    var text = document.getElementById('text'), title = document.getElementById('title')
    var size = parseFloat(title.dataset.size)
    title.style.fontSize = size + 'px'
    while (text.scrollHeight > 214 && size > 34) {
        size -= 2
        title.style.fontSize = size + 'px'
    }
}
fit()
document.fonts.ready.then(fit)
</script>`

/**
 * @param {object} card
 * @param {string} card.windowTitle text in the window title bar
 * @param {string} [card.chipColor] color of the toggle chip before the window title
 * @param {string} card.hog file name of a hog in @posthog/brand, without ".png"
 * @param {string} card.title headline
 * @param {number} [card.titleSize] largest headline size in px
 * @param {string[]} [card.lines] smaller lines under the headline
 * @param {string} card.button button label
 */
module.exports = ({ windowTitle, chipColor, hog, title, titleSize = 66, lines = [], button }) => {
    const { fonts, logo } = getShared()
    return `<html>
<head>
<meta charset="utf-8" />
<style>
${fonts}
* { box-sizing: border-box; }
body { margin: 0; width: 1200px; height: 630px; overflow: hidden; position: relative; font-family: 'RoundHog', sans-serif; color: #151515; background: linear-gradient(160deg, #D3DDBB 0%, #B7C996 55%, #9DB67A 100%); }
.menubar { position: absolute; left: 0; right: 0; top: 0; height: 60px; background: #EEEFE9E6; display: flex; align-items: center; padding: 0 28px; gap: 30px; }
.menubar nav { display: flex; gap: 26px; font-size: 21px; font-weight: 500; opacity: .85; }
.window { position: absolute; left: 107px; top: 117px; width: 986px; height: 456px; background: #EEEFE9; border: 1.5px solid #1A171222; border-radius: 18px; box-shadow: 0 18px 44px #0004; overflow: hidden; }
.chrome { height: 66px; display: flex; align-items: center; justify-content: space-between; padding: 0 28px; border-bottom: 1.5px solid #1A171222; }
.chrome-title { display: flex; align-items: center; gap: 12px; font-size: 28px; font-weight: 700; }
.chrome-buttons { display: flex; gap: 20px; align-items: center; opacity: .45; }
#text { position: absolute; left: 48px; right: 350px; top: 104px; }
#title { font-weight: 800; line-height: 1.03; letter-spacing: -.01em; }
.line { margin-top: 14px; font-size: 36px; font-weight: 700; line-height: 1.15; opacity: .6; }
.line + .line { margin-top: 0; }
.hog { position: absolute; right: 34px; bottom: 26px; width: 300px; max-height: 330px; object-fit: contain; object-position: bottom; }
.button { position: absolute; left: 48px; bottom: 40px; background: #F7A501; border: 2px solid #B17816; border-bottom-width: 4px; border-radius: 10px; padding: 12px 26px; font-size: 31px; font-weight: 800; }
</style>
</head>
<body>
<div class="menubar">
    <div style="line-height:0">${logo}</div>
    <nav><span>Products</span><span>Pricing</span><span>Docs</span><span>Community</span><span>Company</span></nav>
</div>
<div class="window">
    <div class="chrome">
        <div class="chrome-title">${chipColor ? toggle(chipColor) : ''}${escapeHtml(windowTitle)}</div>
        <div class="chrome-buttons"><div style="width:22px;height:22px;border:2.5px solid currentColor;border-radius:4px"></div><div style="font-size:38px;line-height:22px;font-weight:500">×</div></div>
    </div>
    <div id="text">
        <div id="title" data-size="${titleSize}">${escapeHtml(title)}</div>
        ${lines.map((line) => `<div class="line">${escapeHtml(line)}</div>`).join('')}
    </div>
    <img class="hog" src="${hogImage(hog)}" />
    <div class="button">${escapeHtml(button)}${cursor}</div>
</div>
${fitScript}
</body>
</html>`
}

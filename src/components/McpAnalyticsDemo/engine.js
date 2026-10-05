import { FRAMES, validate, sceneAt } from './timeline.js'
import { RENDERERS } from './scenes.js'
import { RENDERERS_L2 } from './level2.js'
import { RENDERERS_L3 } from './level3.js'
import { RENDERERS_END } from './endgame.js'
import { RENDERERS_L4 } from './level4.js'
import { drawTexts } from './ui.js'
import { W, H } from './fx.js'

const low = new OffscreenCanvas(W, H)
const lctx = low.getContext('2d')

// Pure function of n: nothing here reads the clock or keeps state between frames.
export function renderFrame(n, canvas) {
    n = Math.max(0, Math.min(FRAMES - 1, Math.floor(n)))
    lctx.setTransform(1, 0, 0, 1, 0, 0)
    lctx.imageSmoothingEnabled = false
    lctx.fillStyle = '#151515'
    lctx.fillRect(0, 0, W, H)
    const scene = sceneAt(n)
    ;({ ...RENDERERS, ...RENDERERS_L2, ...RENDERERS_L3, ...RENDERERS_L4, ...RENDERERS_END })[scene.id](
        lctx,
        n - scene.start,
        scene,
        n
    )
    drawTexts(lctx, n)
    const out = canvas.getContext('2d')
    out.imageSmoothingEnabled = false
    // the canvas size sets the output scale: 1920x1080 is 6x, 3840x2160 is 12x
    out.drawImage(low, 0, 0, canvas.width, canvas.height)
}

const problems = validate()
if (problems.length) console.error('timeline problems:', problems)

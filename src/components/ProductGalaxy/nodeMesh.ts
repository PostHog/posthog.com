/**
 * Per-node Three.js mesh builder. Imported only inside GalaxyCanvas (client-only),
 * so that `three` never evaluates during SSR.
 */
import {
    Color,
    Group,
    IcosahedronGeometry,
    LineBasicMaterial,
    LineSegments,
    Mesh,
    MeshBasicMaterial,
    Sprite,
    SpriteMaterial,
    Texture,
    WireframeGeometry,
} from 'three'
import { getHudAccent, getProductColor } from './colors'

const BASE_RADIUS = 6
const SELECTED_RING_SCALE = 1.5
const HOVER_RING_SCALE = 1.25

export interface GalaxyNodeMeta {
    handle: string
    name: string
    colorToken?: string
    selected?: boolean
    hovered?: boolean
}

function makeLabelSprite(name: string, hex: string): Sprite {
    // Bumped canvas resolution + font + sprite scale together to keep text crisp
    // at the larger display size.
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 128
    const ctx = canvas.getContext('2d')
    if (ctx) {
        ctx.font = '700 44px "Source Code Pro", monospace'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.strokeStyle = hex
        ctx.lineWidth = 3
        ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6)
        ctx.fillStyle = hex
        ctx.fillText(name.toUpperCase(), canvas.width / 2, canvas.height / 2)
    }
    const texture = new Texture(canvas)
    texture.needsUpdate = true
    const material = new SpriteMaterial({ map: texture, transparent: true })
    const sprite = new Sprite(material)
    sprite.scale.set(34, 8.5, 1)
    sprite.position.y = -BASE_RADIUS * 2
    return sprite
}

export function buildNodeObject(meta: GalaxyNodeMeta): Group {
    const group = new Group()
    const hex = getProductColor(meta.colorToken)
    const color = new Color(hex)

    // Solid faint inner sphere so a node is still visible head-on through the wireframe.
    const innerGeom = new IcosahedronGeometry(BASE_RADIUS * 0.6, 0)
    const innerMat = new MeshBasicMaterial({ color, transparent: true, opacity: 0.2 })
    group.add(new Mesh(innerGeom, innerMat))

    // Main wireframe shell.
    const shellGeom = new IcosahedronGeometry(BASE_RADIUS, 1)
    const wire = new WireframeGeometry(shellGeom)
    const wireMat = new LineBasicMaterial({ color, transparent: true, opacity: 0.95 })
    group.add(new LineSegments(wire, wireMat))

    // Highlight rings for selected / hovered state.
    if (meta.selected) {
        const ringGeom = new IcosahedronGeometry(BASE_RADIUS * SELECTED_RING_SCALE, 0)
        const ringWire = new WireframeGeometry(ringGeom)
        const ringMat = new LineBasicMaterial({ color: new Color(getHudAccent()), transparent: true, opacity: 0.9 })
        group.add(new LineSegments(ringWire, ringMat))
    } else if (meta.hovered) {
        const ringGeom = new IcosahedronGeometry(BASE_RADIUS * HOVER_RING_SCALE, 0)
        const ringWire = new WireframeGeometry(ringGeom)
        const ringMat = new LineBasicMaterial({ color, transparent: true, opacity: 0.5 })
        group.add(new LineSegments(ringWire, ringMat))
    }

    // Floating label below the node.
    group.add(makeLabelSprite(meta.name, hex))

    return group
}

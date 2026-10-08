export const PEEL_CANVAS_SCALE = 4
export const PEEL_RADIUS = 0.08

export function getPeelFold(grab: [number, number], pull: [number, number]) {
    const length = Math.hypot(...pull)
    const direction: [number, number] = length ? [-pull[0] / length, -pull[1] / length] : [1, 0]
    if (!length) return { direction, crease: 1 }

    // Invert the cylindrical bend so the grabbed point projects exactly onto the pointer.
    const arc = Math.PI * PEEL_RADIUS
    let distance = (length + arc) / 2
    if (length < arc) {
        let low = 0
        let high = arc
        for (let i = 0; i < 24; i++) {
            distance = (low + high) / 2
            if (distance - PEEL_RADIUS * Math.sin(distance / PEEL_RADIUS) < length) low = distance
            else high = distance
        }
    }
    return { direction, crease: grab[0] * direction[0] + grab[1] * direction[1] - distance }
}

export function getPeelProgress(grab: [number, number], pull: [number, number]): number {
    const length = Math.hypot(...pull)
    if (!length) return 0
    const direction = [-pull[0] / length, -pull[1] / length]
    const farEdge = (Math.abs(direction[0]) + Math.abs(direction[1])) / 2
    const distance = grab[0] * direction[0] + grab[1] * direction[1] + farEdge
    const arc = Math.PI * PEEL_RADIUS
    const fullPull = distance < arc ? distance - PEEL_RADIUS * Math.sin(distance / PEEL_RADIUS) : 2 * distance - arc
    return fullPull <= 0 ? 1 : Math.min(1, length / fullPull)
}

export function localPeelPoint(x: number, y: number, width: number, rotation: number): [number, number] {
    const angle = (rotation * Math.PI) / 180
    return [(x * Math.cos(angle) + y * Math.sin(angle)) / width, (x * Math.sin(angle) - y * Math.cos(angle)) / width]
}

const vertexSource = `
attribute vec2 uv;
uniform float crease;
uniform float canvasScale;
uniform vec2 direction;
uniform bool shadow;
varying vec2 textureUV;
varying vec3 normal;
void main() {
    vec2 point = vec2(uv.x - 0.5, 0.5 - uv.y);
    float distance = max(0.0, dot(point, direction) - crease);
    float radius = ${PEEL_RADIUS};
    float angle = min(distance / radius, 3.14159265);
    float bent = radius * sin(angle) - max(0.0, distance - radius * 3.14159265);
    point += direction * (bent - distance);
    float height = radius * (1.0 - cos(angle));
    normal = vec3(-direction * sin(angle), cos(angle));
    textureUV = uv;
    if (shadow) {
        point += vec2(0.1, -0.2) * height;
        height = -0.015;
    }
    gl_Position = vec4(point * (2.0 / canvasScale), -height, 1.0);
}`

const fragmentSource = `
precision mediump float;
uniform sampler2D artwork;
uniform bool shadow;
uniform bool holographic;
uniform sampler2D foilMask;
uniform bool maskedFoil;
varying vec2 textureUV;
varying vec3 normal;
void main() {
    vec4 ink = texture2D(artwork, textureUV);
    if (ink.a < 0.02) discard;
    if (shadow) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, ink.a * 0.14);
        return;
    }
    vec3 surfaceNormal = normalize(gl_FrontFacing ? normal : -normal);
    vec3 light = normalize(vec3(-0.4, 0.65, 1.0));
    float lighting = 0.72 + 0.28 * max(0.0, dot(surfaceNormal, light));
    float gloss = pow(max(0.0, dot(surfaceNormal, normalize(light + vec3(0.0, 0.0, 1.0)))), 48.0) * 0.18;
    vec3 color = gl_FrontFacing ? ink.rgb : vec3(0.94, 0.93, 0.89);
    float foilAmount = maskedFoil ? texture2D(foilMask, textureUV).r : (holographic ? 1.0 : 0.0);
    if (foilAmount > 0.0 && gl_FrontFacing) {
        float phase = dot(textureUV, vec2(0.8, 0.8)) + dot(surfaceNormal.xy, vec2(0.6, -0.7));
        vec3 foil = 0.55 + 0.45 * cos(6.2831853 * (phase + vec3(0.0, 0.33, 0.67)));
        float brightness = dot(ink.rgb, vec3(0.2126, 0.7152, 0.0722));
        float glint = pow(max(0.0, cos(phase * 12.5663706)), 32.0) * 0.4;
        vec2 grain = floor(textureUV * 220.0);
        float seed = fract(sin(dot(grain, vec2(12.9898, 78.233))) * 437.5);
        float sparkle = step(0.88, seed) * pow(max(0.0, cos(seed * 62.8 + phase * 9.0)), 12.0);
        color = mix(color, foil, (0.3 + brightness * 0.5) * foilAmount) + (glint + sparkle * 0.95) * foilAmount;
    }
    gl_FragColor = vec4(color * lighting + gloss, ink.a);
}`

export function createPeelRenderer(
    canvas: HTMLCanvasElement,
    image: HTMLImageElement | HTMLCanvasElement,
    holographic = false,
    foilMask?: HTMLCanvasElement
) {
    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: true })
    if (!gl) return null
    const program = gl.createProgram()
    const vertices = gl.createBuffer()
    const indices = gl.createBuffer()
    const texture = gl.createTexture()
    const maskTexture = gl.createTexture()
    const shaders: WebGLShader[] = []
    const dispose = () => {
        shaders.forEach((shader) => gl.deleteShader(shader))
        gl.deleteProgram(program)
        gl.deleteBuffer(vertices)
        gl.deleteBuffer(indices)
        gl.deleteTexture(texture)
        gl.deleteTexture(maskTexture)
    }
    if (!program || !vertices || !indices || !texture || !maskTexture) {
        dispose()
        return null
    }
    for (const [type, source] of [
        [gl.VERTEX_SHADER, vertexSource],
        [gl.FRAGMENT_SHADER, fragmentSource],
    ] as const) {
        const shader = gl.createShader(type)
        if (!shader) {
            dispose()
            return null
        }
        shaders.push(shader)
        gl.shaderSource(shader, source)
        gl.compileShader(shader)
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            dispose()
            return null
        }
        gl.attachShader(program, shader)
    }
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        dispose()
        return null
    }
    const grid = 64
    const points: number[] = []
    const triangles: number[] = []
    for (let y = 0; y <= grid; y++)
        for (let x = 0; x <= grid; x++) {
            points.push(x / grid, y / grid)
            if (x < grid && y < grid) {
                const i = y * (grid + 1) + x
                triangles.push(i, i + grid + 1, i + 1, i + 1, i + grid + 1, i + grid + 2)
            }
        }
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW)
    const uv = gl.getAttribLocation(program, 'uv')
    gl.enableVertexAttribArray(uv)
    gl.vertexAttribPointer(uv, 2, gl.FLOAT, false, 0, 0)
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangles), gl.STATIC_DRAW)
    for (const [unit, target, bitmap, name] of [
        [0, texture, image, 'artwork'],
        [1, maskTexture, foilMask || image, 'foilMask'],
    ] as const) {
        gl.activeTexture(gl.TEXTURE0 + unit)
        gl.bindTexture(gl.TEXTURE_2D, target)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, bitmap)
        gl.uniform1i(gl.getUniformLocation(program, name), unit)
    }
    gl.uniform1i(gl.getUniformLocation(program, 'maskedFoil'), foilMask ? 1 : 0)
    gl.enable(gl.BLEND)
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    const creaseUniform = gl.getUniformLocation(program, 'crease')
    const scaleUniform = gl.getUniformLocation(program, 'canvasScale')
    const directionUniform = gl.getUniformLocation(program, 'direction')
    const shadowUniform = gl.getUniformLocation(program, 'shadow')
    gl.uniform1i(gl.getUniformLocation(program, 'holographic'), holographic ? 1 : 0)
    return {
        draw(grab: [number, number], pull: [number, number], width: number) {
            const { direction, crease } = getPeelFold(grab, pull)
            const scale = Math.max(PEEL_CANVAS_SCALE, 2 + Math.hypot(...pull) * 2)
            canvas.style.width = canvas.style.height = `${scale * 100}%`
            const pixels = Math.min(2048, Math.ceil(width * scale * Math.min(window.devicePixelRatio || 1, 2)))
            if (canvas.width !== pixels) canvas.width = canvas.height = pixels
            gl.viewport(0, 0, canvas.width, canvas.height)
            gl.clearColor(0, 0, 0, 0)
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
            gl.uniform1f(creaseUniform, crease)
            gl.uniform1f(scaleUniform, scale)
            gl.uniform2f(directionUniform, direction[0], direction[1])
            gl.disable(gl.DEPTH_TEST)
            gl.uniform1i(shadowUniform, 1)
            gl.drawElements(gl.TRIANGLES, triangles.length, gl.UNSIGNED_SHORT, 0)
            gl.enable(gl.DEPTH_TEST)
            gl.uniform1i(shadowUniform, 0)
            gl.drawElements(gl.TRIANGLES, triangles.length, gl.UNSIGNED_SHORT, 0)
        },
        dispose,
    }
}

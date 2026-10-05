import { renderFrame } from './engine'
import { FPS, FRAMES, MUSIC_CHOICE, MUSIC_VOLUME, SCENES, SFX, SFX_MASTER, SFX_VOLUME, musicAt } from './timeline'

const ASSETS = '/mcp-analytics-demo'
const LEVEL_NAMES = [
    '2020 software',
    'Agents arrive',
    'We were blind too',
    'Meet MCP analytics',
    'It worked for us',
    'Your turn',
]

export const SPEEDS = [1, 1.25, 1.5] as const
export type Speed = (typeof SPEEDS)[number]
type Status = 'paused' | 'loading' | 'playing' | 'ended'

export interface PlayerState {
    frame: number
    status: Status
    speed: Speed
    muted: boolean
}

export const INITIAL_STATE: PlayerState = { frame: 0, status: 'paused', speed: 1, muted: false }

interface Cue {
    frame: number
    file: string
    gain: number
    rate?: number
    pan?: number
    until?: number
}

interface MusicSegment {
    mood: keyof typeof MUSIC_CHOICE
    start: number
    end: number
}

interface AudioGraph {
    ctx: AudioContext
    sfxBus: GainNode
    musicBus: GainNode
    sfx: Map<string, AudioBuffer>
}

// Chapters start at each level card; the title screen is chapter 0. The poster is a frame that shows the chapter's scene.
const CHAPTER_STARTS = [
    0,
    ...SCENES.filter((sc: { key: string }) => /^card\d$/.test(sc.key)).map((sc: { start: number }) => sc.start),
]
export const CHAPTERS = CHAPTER_STARTS.map((start, i) => {
    const end = CHAPTER_STARTS[i + 1] ?? FRAMES
    return {
        label: i === 0 ? 'Start' : `Level ${i}`,
        name: i === 0 ? 'Press start' : LEVEL_NAMES[i - 1],
        start,
        end,
        poster: start + Math.min(4 * FPS, Math.floor((end - start) / 2)),
    }
})

export const chapterAt = (frame: number): (typeof CHAPTERS)[number] =>
    CHAPTERS.filter((c) => c.start <= frame).slice(-1)[0]

export const formatTime = (frame: number): string => {
    const s = Math.floor(frame / FPS)
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

const clampFrame = (n: number): number => Math.max(0, Math.min(FRAMES - 1, Math.round(n)))

export class Player {
    state: PlayerState = INITIAL_STATE

    private audio: AudioGraph | null = null
    private loading: Promise<AudioGraph> | null = null
    private beds = new Set<AudioBufferSourceNode>()
    private musicBuffers = new Map<string, Promise<AudioBuffer>>()
    private musicSrc: AudioBufferSourceNode | null = null
    private musicSeg: MusicSegment | null = null
    private clock = { at: 0, from: 0 } // audio time when play started, and the frame at that moment
    private musicGen = 0
    private lastFired = -1
    private raf = 0
    private destroyed = false

    constructor(private canvas: HTMLCanvasElement, private onChange: (state: PlayerState) => void) {
        this.show(0)
        document.addEventListener('visibilitychange', this.onVisibilityChange)
    }

    async play(): Promise<void> {
        const { status } = this.state
        if (status === 'playing' || status === 'loading') return
        if (this.state.frame >= FRAMES - 1) this.show(0)
        this.set({ status: 'loading' })
        let audio: AudioGraph
        try {
            audio = await this.load()
        } catch (error) {
            console.error('Could not load the sound files', error)
            return this.set({ status: 'paused' })
        }
        if (this.destroyed) return
        await audio.ctx.resume()
        if (this.destroyed || this.state.status !== 'loading') return
        this.start(audio)
    }

    pause(ended = false): void {
        this.halt()
        this.set({ status: ended ? 'ended' : 'paused' })
    }

    toggle(): void {
        if (this.state.status === 'playing' || this.state.status === 'loading') this.pause()
        else void this.play()
    }

    seek(n: number): void {
        const audio = this.audio
        const wasPlaying = this.state.status === 'playing'
        if (wasPlaying) this.halt()
        this.show(clampFrame(n))
        if (wasPlaying && audio) this.start(audio)
        else if (this.state.status === 'ended') this.set({ status: 'paused' })
    }

    step(delta: number): void {
        if (this.state.status === 'playing') this.pause()
        this.seek(this.state.frame + delta)
    }

    setSpeed(speed: Speed): void {
        const audio = this.audio
        const wasPlaying = this.state.status === 'playing'
        if (wasPlaying) this.halt()
        this.set({ speed })
        if (wasPlaying && audio) this.start(audio)
    }

    setMuted(muted: boolean): void {
        this.set({ muted })
        if (this.audio) this.applyGains(this.audio)
    }

    destroy(): void {
        this.destroyed = true
        document.removeEventListener('visibilitychange', this.onVisibilityChange)
        this.halt()
        void this.loading?.then(
            ({ ctx }) => ctx.close(),
            () => undefined
        )
    }

    // The audio clock keeps running while a hidden tab's animation frames stop, so playing on would skip ahead and fire every missed cue at once.
    private onVisibilityChange = (): void => {
        if (document.hidden && (this.state.status === 'playing' || this.state.status === 'loading')) this.pause()
    }

    private set(patch: Partial<PlayerState>): void {
        this.state = { ...this.state, ...patch }
        this.onChange(this.state)
    }

    private show(n: number): void {
        renderFrame(n, this.canvas)
        this.set({ frame: n })
    }

    private halt(): void {
        cancelAnimationFrame(this.raf)
        this.musicGen++
        for (const bed of this.beds) {
            try {
                bed.stop()
            } catch {
                // stop() throws when the source has already ended
            }
        }
        this.beds.clear()
        this.stopMusic()
        this.musicSeg = null
    }

    private start(audio: AudioGraph): void {
        const { frame } = this.state
        this.clock = { at: audio.ctx.currentTime, from: frame }
        this.lastFired = frame - 1
        for (const c of SFX as Cue[])
            if (c.until && c.frame <= frame && c.until > frame) this.fire(audio, c, frame - c.frame)
        this.set({ status: 'playing' })
        void this.syncMusic(audio)
        const tick = (): void => {
            const { speed } = this.state
            const n = Math.min(
                FRAMES - 1,
                this.clock.from + Math.floor((audio.ctx.currentTime - this.clock.at) * FPS * speed)
            )
            if (n !== this.state.frame) {
                for (const c of SFX as Cue[]) if (c.frame > this.lastFired && c.frame <= n) this.fire(audio, c)
                this.lastFired = n
                this.show(n)
                void this.syncMusic(audio)
            }
            if (n >= FRAMES - 1) return this.pause(true)
            this.raf = requestAnimationFrame(tick)
        }
        this.raf = requestAnimationFrame(tick)
    }

    // One AudioContext, created on the first Play so nothing is fetched or decoded before then.
    private load(): Promise<AudioGraph> {
        this.loading ??= (async () => {
            const ctx = new AudioContext()
            void ctx.resume() // before any await: Safari only unlocks audio from a user gesture, or a short timer started by one
            const sfxBus = ctx.createGain()
            const limiter = ctx.createDynamicsCompressor()
            limiter.threshold.value = -1
            limiter.knee.value = 0
            limiter.ratio.value = 20
            limiter.attack.value = 0.003
            limiter.release.value = 0.05
            sfxBus.connect(limiter).connect(ctx.destination)
            const musicBus = ctx.createGain()
            musicBus.connect(ctx.destination)
            const audio: AudioGraph = { ctx, sfxBus, musicBus, sfx: new Map() }
            this.applyGains(audio)
            const files = [...new Set((SFX as Cue[]).map((c) => c.file))]
            try {
                await Promise.all(
                    files.map(async (f) => {
                        const res = await fetch(`${ASSETS}/sfx/${f}`)
                        if (!res.ok) return console.warn('missing sfx', f)
                        audio.sfx.set(f, await ctx.decodeAudioData(await res.arrayBuffer()))
                    })
                )
            } catch (error) {
                this.loading = null
                void ctx.close()
                throw error
            }
            this.audio = audio
            this.applyGains(audio)
            return audio
        })()
        return this.loading
    }

    private applyGains({ sfxBus, musicBus }: AudioGraph): void {
        const { muted } = this.state
        sfxBus.gain.value = muted ? 0 : SFX_MASTER * SFX_VOLUME
        musicBus.gain.value = muted ? 0 : MUSIC_VOLUME
    }

    private fire({ ctx, sfxBus, sfx }: AudioGraph, c: Cue, offsetFrames = 0): void {
        const buf = sfx.get(c.file)
        if (!buf) return
        const src = ctx.createBufferSource()
        src.buffer = buf
        src.playbackRate.value = c.rate ?? 1
        const g = ctx.createGain()
        g.gain.value = c.gain
        const pan = ctx.createStereoPanner()
        pan.pan.value = c.pan ?? 0
        src.connect(g).connect(pan).connect(sfxBus)
        const offset = offsetFrames / FPS
        if (c.until) {
            src.loop = true
            src.start(0, offset % buf.duration)
            src.stop(ctx.currentTime + ((c.until - c.frame) / FPS - offset) / this.state.speed)
            this.beds.add(src)
            src.onended = () => this.beds.delete(src)
        } else src.start(0, offset)
    }

    private musicBuffer({ ctx }: AudioGraph, url: string): Promise<AudioBuffer> {
        if (!this.musicBuffers.has(url)) {
            const buffer = fetch(url)
                .then((r) => {
                    if (!r.ok) throw new Error(`${r.status} for ${url}`)
                    return r.arrayBuffer()
                })
                .then((b) => ctx.decodeAudioData(b))
                .catch((error) => {
                    this.musicBuffers.delete(url)
                    throw error
                })
            this.musicBuffers.set(url, buffer)
        }
        return this.musicBuffers.get(url) as Promise<AudioBuffer>
    }

    private stopMusic(): void {
        try {
            this.musicSrc?.stop()
        } catch {
            // stop() throws when the source has already ended
        }
        this.musicSrc = null
    }

    // Called every tick: a segment of MUSIC plays its mood's track from offset 0 and stops at the next level card.
    private async syncMusic(audio: AudioGraph): Promise<void> {
        const seg = musicAt(this.state.frame) as MusicSegment | null
        if (seg === this.musicSeg) return
        this.musicSeg = seg
        this.stopMusic()
        if (!seg) return
        const gen = ++this.musicGen
        const buf = await this.musicBuffer(audio, `${ASSETS}/music/${MUSIC_CHOICE[seg.mood]}`).catch((error) =>
            console.warn('Could not load the music', error)
        )
        if (!buf || gen !== this.musicGen || this.state.status !== 'playing') return
        const { speed } = this.state
        const now = this.clock.from + (audio.ctx.currentTime - this.clock.at) * FPS * speed
        const offset = (now - seg.start) / FPS
        if (offset >= buf.duration) return
        const src = audio.ctx.createBufferSource()
        src.buffer = buf
        src.playbackRate.value = speed
        src.connect(audio.musicBus)
        src.start(0, offset)
        src.stop(audio.ctx.currentTime + (seg.end - now) / FPS / speed)
        this.musicSrc = src
    }
}

/**
 * The knock that goes with the wordmark's hammer burst, synthesized with Web Audio rather than
 * shipped as an audio file: `static/sounds/` only holds the tape player's samples, and a knock is
 * simple enough to build from a noise burst plus a low thump.
 *
 * Only ever called straight off a click, so it doesn't run into autoplay restrictions.
 */

/**
 * Peak amplitude of each of a tap's two layers, which sum — so this can't go much past 0.5 before
 * transients clip against the output's ceiling of 1.0. Sits at UI-sound-effect level, around
 * -12 dBFS.
 */
const GAIN = 0.25

let context: AudioContext | null = null
let noiseBuffer: AudioBuffer | null = null

/**
 * One context and one noise buffer for the page, created on the first click and reused. Browsers
 * suspend contexts that were built before any interaction, hence the resume.
 */
function getAudio(): { ctx: AudioContext; noise: AudioBuffer } | null {
    const Ctor =
        window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!Ctor) return null

    if (!context) context = new Ctor()
    if (context.state === 'suspended') void context.resume()

    if (!noiseBuffer) {
        const length = Math.floor(context.sampleRate * 0.05)
        noiseBuffer = context.createBuffer(1, length, context.sampleRate)
        const samples = noiseBuffer.getChannelData(0)
        for (let i = 0; i < length; i++) samples[i] = Math.random() * 2 - 1
    }

    return { ctx: context, noise: noiseBuffer }
}

/** A single tap: a bandpassed noise burst for the contact, over a fast-decaying sine for the wood. */
function scheduleKnock(ctx: AudioContext, noise: AudioBuffer, at: number): void {
    const contact = ctx.createBufferSource()
    contact.buffer = noise
    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    // Jittered per tap, so a run of knocks doesn't sound like one sample repeated.
    bandpass.frequency.value = 1600 + Math.random() * 700
    bandpass.Q.value = 1.2
    const contactGain = ctx.createGain()
    contactGain.gain.setValueAtTime(GAIN, at)
    contactGain.gain.exponentialRampToValueAtTime(0.0001, at + 0.05)
    contact.connect(bandpass).connect(contactGain).connect(ctx.destination)
    contact.start(at)
    contact.stop(at + 0.06)

    const body = ctx.createOscillator()
    body.type = 'sine'
    body.frequency.setValueAtTime(190 + Math.random() * 40, at)
    body.frequency.exponentialRampToValueAtTime(90, at + 0.08)
    const bodyGain = ctx.createGain()
    bodyGain.gain.setValueAtTime(GAIN * 0.8, at)
    bodyGain.gain.exponentialRampToValueAtTime(0.0001, at + 0.09)
    body.connect(bodyGain).connect(ctx.destination)
    body.start(at)
    body.stop(at + 0.1)
}

/**
 * A run of taps. The caller passes the swing timing it's animating to, so the knocks land with the
 * hammers on screen instead of drifting against them.
 *
 * Deliberately fewer taps than there are strikes — several hammers land per swing, and one knock each
 * would be a machine gun. Each tap is nudged off the beat so the run doesn't sound like a metronome
 * under strikes that are themselves staggered.
 */
export function fireKnocks(count: number, offsetMs: number, intervalMs: number): void {
    if (typeof window === 'undefined') return

    const audio = getAudio()
    if (!audio) return

    for (let i = 0; i < count; i++) {
        const at = offsetMs + i * intervalMs + (Math.random() - 0.5) * 40
        scheduleKnock(audio.ctx, audio.noise, audio.ctx.currentTime + Math.max(at, 0) / 1000)
    }
}

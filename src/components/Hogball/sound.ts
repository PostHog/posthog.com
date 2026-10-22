import type { Sound } from './physics'

type Note = { from: number; to?: number; at?: number; length: number; wave?: OscillatorType; volume?: number }

const SOUNDS: Record<Sound | 'flipper', Note[]> = {
    flipper: [{ from: 140, to: 90, length: 0.04, volume: 0.03 }],
    launch: [{ from: 180, to: 720, length: 0.25, wave: 'sawtooth' }],
    bumper: [{ from: 620, to: 310, length: 0.08 }],
    sling: [{ from: 330, to: 220, length: 0.05 }],
    target: [{ from: 880, length: 0.07, wave: 'triangle' }],
    lane: [
        { from: 660, length: 0.06, wave: 'triangle' },
        { from: 990, at: 0.06, length: 0.08, wave: 'triangle' },
    ],
    hole: [{ from: 240, to: 90, length: 0.3, wave: 'triangle' }],
    rocket: [
        { from: 120, to: 1400, length: 1.2, wave: 'sawtooth', volume: 0.04 },
        { from: 523, at: 0.2, length: 0.12 },
        { from: 659, at: 0.34, length: 0.12 },
        { from: 784, at: 0.48, length: 0.12 },
        { from: 1047, at: 0.62, length: 0.3 },
    ],
    drain: [{ from: 420, to: 70, length: 0.6, wave: 'triangle' }],
    over: [
        { from: 392, length: 0.2, wave: 'triangle' },
        { from: 330, at: 0.22, length: 0.2, wave: 'triangle' },
        { from: 262, at: 0.44, length: 0.5, wave: 'triangle' },
    ],
}

let audio: AudioContext | null = null

// Browsers only allow audio after a user gesture, so call this from a key or pointer handler
export function unlockAudio(): void {
    if (typeof window === 'undefined' || !('AudioContext' in window)) return
    audio = audio || new AudioContext()
    if (audio.state === 'suspended') audio.resume()
}

export function play(sound: Sound | 'flipper'): void {
    if (!audio || audio.state !== 'running') return
    const now = audio.currentTime
    for (const { from, to, at = 0, length, wave = 'square', volume = 0.05 } of SOUNDS[sound]) {
        const oscillator = audio.createOscillator()
        const gain = audio.createGain()
        oscillator.type = wave
        oscillator.frequency.setValueAtTime(from, now + at)
        if (to) oscillator.frequency.exponentialRampToValueAtTime(to, now + at + length)
        gain.gain.setValueAtTime(volume, now + at)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + at + length)
        oscillator.connect(gain).connect(audio.destination)
        oscillator.start(now + at)
        oscillator.stop(now + at + length)
    }
}

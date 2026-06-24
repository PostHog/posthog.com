import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import ReactConfetti from 'react-confetti'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import TapePlayer from 'components/TapePlayer'

// "Sk8er Boi" mixtape in the Squeak CMS
const THEO_MIXTAPE_ID = '27'

const THEO_AVATAR = 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Ee_S_Gdg_A5_400x400_df3d0e91f9.jpg'

const THEO_FACES = [
    THEO_AVATAR,
    'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Theo_Face_Bigger_tvxs5z_b82a0b0dce.png',
    'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/Theo_Browne_FF_2f9870f731.png',
]

// Real Theo tweets, quoted verbatim
const TWEETS = [
    {
        text: "If you're not using Posthog on your services, you're either losing useful product analytics or you're overpaying for them. Full stop.",
        date: 'Mar 21, 2024',
    },
    {
        text: "Just wanted to say that adding PostHog to my stack was a great decision I'm thankful for every day",
        date: 'Mar 7, 2024',
    },
    {
        text: 'Not gonna lie, the PostHog swag kinda goes in',
        date: 'Jan 22, 2024',
    },
    {
        text: "Who's that handsome guy on the PostHog merch store wearing an UploadThing shirt? 👀",
        date: 'May 28, 2025',
    },
    {
        text: "Cut our error rates by like 90% today. You'll never guess how",
        date: 'May 2, 2025',
    },
    {
        text: 'Posthog is the only analytics provider actively working to charge you LESS money.',
        date: 'Sep 2024',
    },
    {
        text: 'This is my new favorite thing',
        date: 'Sep 20, 2024',
    },
]

// Catchphrases shown as small unattributed cards scattered between the tweets
const QUIPS = [
    { text: 'skill issue', top: '6%', left: '35%', rotate: 5 },
    { text: 'stop rolling your own auth', top: '25%', right: '20%', rotate: -7 },
    { text: 'it depends', bottom: '30%', right: '12%', rotate: 5 },
    { text: 'just ship it', bottom: '28%', left: '12%', rotate: -4 },
    { text: 'safari is the new IE', top: '28%', left: '28%', rotate: 8 },
    { text: "you don't need kubernetes", top: '55%', right: '24%', rotate: -5 },
    { text: 'chat, is this real', bottom: '22%', left: '40%', rotate: 6 },
]

// Scattered placements for the desktop background; tweet cards cycle through TWEETS
const SPRINKLES = [
    { top: '10%', left: '4%', rotate: -8 },
    { top: '6%', right: '8%', rotate: 6 },
    { top: '45%', left: '10%', rotate: 4 },
    { top: '38%', right: '4%', rotate: -6 },
    { bottom: '14%', left: '3%', rotate: -5 },
    { bottom: '10%', right: '6%', rotate: 8 },
    { bottom: '5%', left: '38%', rotate: -3 },
]

const TweetCard = ({ text, date }: { text: string; date: string }) => (
    <div
        data-scheme="primary"
        className="w-[260px] bg-white dark:bg-dark border border-primary rounded-md p-3 shadow-lg"
    >
        <div className="flex items-center gap-2">
            <img src={THEO_AVATAR} alt="" className="size-8 rounded-full border border-primary" />
            <div className="leading-tight">
                <div className="text-sm font-semibold text-primary">Theo - t3.gg</div>
                <div className="text-xs text-secondary">@theo</div>
            </div>
        </div>
        <p className="m-0 mt-2 text-sm text-primary">{text}</p>
        <div className="mt-2 text-xs text-secondary">{date}</div>
    </div>
)

const randomPop = () => ({
    key: Math.random(),
    src: THEO_FACES[Math.floor(Math.random() * THEO_FACES.length)],
    top: `${10 + Math.random() * 65}%`,
    left: `${5 + Math.random() * 80}%`,
    rotate: Math.random() * 40 - 20,
    size: 60 + Math.random() * 80,
})

// Theo's face pops up somewhere new every few seconds; each instance runs on its own
// randomized interval so multiple faces stay out of sync
const FacePopper = () => {
    const [pop, setPop] = useState(randomPop)
    const [intervalMs] = useState(() => 1800 + Math.random() * 2000)

    useEffect(() => {
        const interval = setInterval(() => setPop(randomPop()), intervalMs)
        return () => clearInterval(interval)
    }, [])

    return (
        <AnimatePresence>
            <motion.img
                key={pop.key}
                src={pop.src}
                alt=""
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: 'spring', bounce: 0.6 }}
                className="absolute aspect-square object-cover rounded-full border-2 border-primary shadow-lg"
                style={{ top: pop.top, left: pop.left, width: pop.size, rotate: pop.rotate }}
            />
        </AnimatePresence>
    )
}

// One face permanently ricocheting around the desktop, DVD-screensaver style
const DVDFace = () => {
    const ref = useRef<HTMLImageElement>(null)
    const [src] = useState(() => THEO_FACES[Math.floor(Math.random() * THEO_FACES.length)])

    useEffect(() => {
        const size = 90
        let x = Math.random() * (window.innerWidth - size)
        let y = Math.random() * (window.innerHeight - size)
        let dx = 2.5
        let dy = 2.5
        let raf: number

        const step = () => {
            x = Math.max(0, Math.min(x + dx, window.innerWidth - size))
            y = Math.max(0, Math.min(y + dy, window.innerHeight - size))
            if (x <= 0 || x >= window.innerWidth - size) {
                dx = -dx
            }
            if (y <= 0 || y >= window.innerHeight - size) {
                dy = -dy
            }
            if (ref.current) {
                ref.current.style.transform = `translate(${x}px, ${y}px)`
            }
            raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
        return () => cancelAnimationFrame(raf)
    }, [])

    return (
        <img
            ref={ref}
            src={src}
            alt=""
            className="absolute top-0 left-0 w-[90px] aspect-square object-cover rounded-full border-2 border-primary shadow-lg"
        />
    )
}

// Small faces briefly spawn along the mouse path, 90s sparkle-cursor style
const CursorTrail = () => {
    const [trail, setTrail] = useState<Array<{ key: number; x: number; y: number; src: string }>>([])

    useEffect(() => {
        let last = 0
        const onMove = (e: MouseEvent) => {
            const now = performance.now()
            if (now - last < 80) {
                return
            }
            last = now
            setTrail((prev) => [
                ...prev.slice(-11),
                {
                    key: now,
                    x: e.clientX,
                    y: e.clientY,
                    src: THEO_FACES[Math.floor(Math.random() * THEO_FACES.length)],
                },
            ])
        }
        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
    }, [])

    return createPortal(
        <div className="fixed inset-0 z-50 pointer-events-none select-none">
            {trail.map(({ key, x, y, src }) => (
                <motion.img
                    key={key}
                    src={src}
                    alt=""
                    initial={{ opacity: 0.8, scale: 1 }}
                    animate={{ opacity: 0, scale: 0.2 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    onAnimationComplete={() => setTrail((prev) => prev.filter((p) => p.key !== key))}
                    className="absolute size-6 aspect-square object-cover rounded-full border border-primary"
                    style={{ left: x - 12, top: y - 12 }}
                />
            ))}
        </div>,
        document.body
    )
}

const TheoBackground = () => {
    // The desktop container sits below all windows, so tweets sprinkled inside it stay in the background
    const desktop = document.querySelector('[data-app="Desktop"]')

    if (!desktop) {
        return null
    }

    return createPortal(
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none select-none">
            {SPRINKLES.map(({ rotate, ...position }, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.85, scale: 1 }}
                    transition={{ delay: index * 0.15, type: 'spring' }}
                    className="absolute"
                    style={{ ...position, rotate }}
                >
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ repeat: Infinity, duration: 4 + (index % 3), ease: 'easeInOut' }}
                    >
                        <TweetCard {...TWEETS[index % TWEETS.length]} />
                    </motion.div>
                </motion.div>
            ))}
            {QUIPS.map(({ text, rotate, ...position }, index) => (
                <motion.div
                    key={text}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.85, scale: 1 }}
                    transition={{ delay: (SPRINKLES.length + index) * 0.15, type: 'spring' }}
                    className="absolute"
                    style={{ ...position, rotate }}
                >
                    <motion.div
                        animate={{ y: [0, -6, 0] }}
                        transition={{ repeat: Infinity, duration: 3 + (index % 3), ease: 'easeInOut' }}
                    >
                        <div
                            data-scheme="primary"
                            className="bg-light dark:bg-dark border border-primary rounded-md shadow-lg px-3 py-2"
                        >
                            <p className="m-0 text-sm text-primary">{text}</p>
                        </div>
                    </motion.div>
                </motion.div>
            ))}
            {Array.from({ length: 4 }, (_, index) => (
                <FacePopper key={index} />
            ))}
            <DVDFace />
        </div>,
        desktop
    )
}

const TheoWidgets = () =>
    createPortal(
        <div className="pointer-events-none select-none">
            <motion.div
                initial={{ opacity: 0, translateY: '120%' }}
                animate={{ opacity: 1, translateY: '0%' }}
                transition={{ delay: 0.5, type: 'spring', bounce: 0.4 }}
                className="fixed bottom-4 left-4 z-50"
            >
                <div
                    data-scheme="primary"
                    className="bg-light dark:bg-dark border border-primary rounded-md shadow-xl p-3"
                >
                    <p className="m-0 text-sm text-secondary">new model counter</p>
                    <p className="m-0 text-xl font-bold text-primary font-code">NaN</p>
                    <p className="m-0 text-xs text-secondary">or is it o4? 4o?</p>
                </div>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, translateY: '120%' }}
                animate={{ opacity: 1, translateY: '0%' }}
                transition={{ delay: 0.8, type: 'spring', bounce: 0.4 }}
                className="fixed bottom-4 right-4 z-50"
            >
                <div
                    data-scheme="primary"
                    className="bg-light dark:bg-dark border border-primary rounded-md shadow-xl p-3"
                >
                    <p className="m-0 text-sm text-primary">have you tried obsidian?</p>
                </div>
            </motion.div>
        </div>,
        document.body
    )

export default function TheoEasterEgg(): JSX.Element | null {
    const { addWindow, windows, closeWindow } = useApp()
    const { appWindow } = useWindow()
    const [dismissed, setDismissed] = useState(false)
    const [theoMode, setTheoMode] = useState(false)
    const [confetti, setConfetti] = useState(false)

    const isTheoVisit = new URLSearchParams(appWindow?.location?.search || '').has('theo')

    if (!isTheoVisit) {
        return null
    }

    const handleClick = () => {
        setTheoMode(true)
        setConfetti(true)
        addWindow(
            (
                <TapePlayer key="/fm" location={{ pathname: '/fm' }} newWindow id={THEO_MIXTAPE_ID} defaultShowVideo />
            ) as Parameters<typeof addWindow>[0]
        )
    }

    return (
        <>
            {theoMode && <TheoBackground />}
            {theoMode && <TheoWidgets />}
            {theoMode && <CursorTrail />}
            {theoMode &&
                createPortal(
                    <motion.button
                        initial={{ opacity: 0, translateY: '-120%' }}
                        animate={{ opacity: 1, translateY: '0%' }}
                        transition={{ delay: 0.5, type: 'spring', bounce: 0.4 }}
                        onClick={() => {
                            setTheoMode(false)
                            setDismissed(true)
                            const fmWindow = windows.find((w) => w.path === '/fm')
                            if (fmWindow) {
                                closeWindow(fmWindow)
                            }
                        }}
                        data-scheme="primary"
                        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-light dark:bg-dark border border-primary rounded-md shadow-xl px-3 py-2 text-sm font-semibold text-primary"
                    >
                        Exit Theo mode ✕
                    </motion.button>,
                    document.body
                )}
            {confetti &&
                createPortal(
                    <div className="fixed inset-0 z-50 pointer-events-none">
                        <ReactConfetti
                            recycle={false}
                            numberOfPieces={800}
                            onConfettiComplete={() => setConfetti(false)}
                        />
                    </div>,
                    document.body
                )}
            {!theoMode &&
                !dismissed &&
                createPortal(
                    <motion.div
                        initial={{ opacity: 0, translateY: '120%' }}
                        animate={{ opacity: 1, translateY: '0%' }}
                        transition={{ delay: 1, type: 'spring', bounce: 0.4 }}
                        className="fixed bottom-4 right-4 z-50 max-w-[320px]"
                    >
                        <div
                            data-scheme="primary"
                            className="relative bg-light dark:bg-dark border border-primary rounded-md shadow-xl p-3 flex items-center gap-3"
                        >
                            <button
                                onClick={() => setDismissed(true)}
                                aria-label="Dismiss"
                                className="absolute top-1 right-2 text-secondary hover:text-primary text-sm font-bold"
                            >
                                ✕
                            </button>
                            <img
                                src={THEO_AVATAR}
                                alt="Theo"
                                className="size-[64px] flex-shrink-0 rounded-full border border-primary"
                            />
                            <button onClick={handleClick} className="text-left">
                                <p className="m-0 text-sm font-bold text-primary">Theo?? Is that actually you?</p>
                                <p className="m-0 text-sm text-secondary">
                                    Either way, we made you a mixtape.{' '}
                                    <span className="font-semibold underline">Press play.</span>
                                </p>
                            </button>
                        </div>
                    </motion.div>,
                    document.body
                )}
        </>
    )
}

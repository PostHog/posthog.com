import React, { useEffect, useRef, useState } from 'react'
import { IconPlay, IconX } from '@posthog/icons'
import MediaPlayer from 'components/MediaPlayer'
import { useAppActions } from '../../context/App'
import { useWindow } from '../../context/Window'
import { useToast } from '../../context/Toast'
import usePostHog from '../../hooks/usePostHog'

const VIDEO_ID = 'vndjn7wus5'
const POSTER = 'https://res.cloudinary.com/dmukukwp6/image/upload/the_posthog_shining_thumb_781edacf00.jpg'
const DISMISSED_KEY = 'the-posthog-toast-dismissed'

function ThePostHogPlayer({}: { location: { pathname: string }; newWindow?: boolean }) {
    const { setWindowTitle } = useAppActions()
    const { appWindow } = useWindow()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'The PostHog')
        }
    }, [appWindow])

    return <MediaPlayer videoId={VIDEO_ID} source="wistia" borderRadius={false} />
}

export default function ThePostHog(): null {
    const { addWindow } = useAppActions()
    const { addToast, removeToast } = useToast()
    const posthog = usePostHog()
    const toastId = useRef<number | null>(null)
    const [hasDismissed, setHasDismissed] = useState(() => {
        try {
            return localStorage.getItem(DISMISSED_KEY) === 'true'
        } catch {
            return false
        }
    })

    const dismiss = () => {
        setHasDismissed(true)
        if (toastId.current) {
            removeToast(toastId.current)
        }
        try {
            localStorage.setItem(DISMISSED_KEY, 'true')
        } catch {
            // localStorage may be unavailable
        }
    }

    const openPlayer = () => {
        posthog?.capture('the-posthog-toast-watched', { video_id: VIDEO_ID })
        dismiss()
        addWindow((<ThePostHogPlayer location={{ pathname: 'the-posthog' }} key="the-posthog" newWindow />) as never)
    }

    useEffect(() => {
        if (hasDismissed) return

        const timer = setTimeout(() => {
            toastId.current = addToast({
                title: 'The PostHog',
                description: (
                    <div>
                        <p className="m-0 text-sm text-secondary">A masterpiece of modern SaaS.</p>
                        <button
                            type="button"
                            onClick={openPlayer}
                            className="relative mt-3 w-[calc(100%+15px)] overflow-hidden rounded group"
                        >
                            <img
                                src={POSTER}
                                alt="Watch The PostHog"
                                className="aspect-video w-full rounded object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/40">
                                <div className="flex size-11 items-center justify-center rounded-full bg-white/90 shadow-lg transition-colors group-hover:bg-white">
                                    <IconPlay className="ml-0.5 size-5 text-black" />
                                </div>
                            </div>
                        </button>
                    </div>
                ),
                actionLabel: 'Close',
                actionAsIcon: <IconX className="size-4" />,
                verticalAlign: 'items-start',
                duration: 999999999,
                onAction: () => {
                    posthog?.capture('the-posthog-toast-dismissed')
                    dismiss()
                },
                actionClassName: '!absolute -top-2 -right-2',
            })
        }, 1000)

        return () => clearTimeout(timer)
    }, [hasDismissed])

    return null
}

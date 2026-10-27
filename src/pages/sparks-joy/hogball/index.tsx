import React, { useEffect, useRef, useState } from 'react'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import usePostHog from 'hooks/usePostHog'

// The game lives in the PostHog/hogball repo and runs on GitHub Pages
const GAME_URL = 'https://posthog.github.io/hogball/'
const GAME_ORIGIN = new URL(GAME_URL).origin
const EVENTS = ['hogball_game_started', 'hogball_game_ended', 'hogball_score_submitted']
const PROPERTIES = [
    'score',
    'high_score',
    'rockets',
    'rank',
    'missions',
    'player_name',
    'player_initials',
    'duration_seconds',
]

export default function HogballGame(): JSX.Element {
    const posthog = usePostHog()
    const frameRef = useRef<HTMLIFrameElement>(null)
    const [src, setSrc] = useState<string>()

    useEffect(() => {
        // The game reads the leaderboard from this site's API and sends its events back here
        setSrc(`${GAME_URL}?host=${encodeURIComponent(window.location.origin)}`)
        const onMessage = (e: MessageEvent) => {
            if (e.origin !== GAME_ORIGIN || e.source !== frameRef.current?.contentWindow) return
            const { type, event, properties } = e.data || {}
            if (type !== 'hogball' || !EVENTS.includes(event)) return
            const allowed = Object.entries(properties || {}).filter(
                ([key, value]) => PROPERTIES.includes(key) && ['string', 'number', 'boolean'].includes(typeof value)
            )
            posthog?.capture(event, Object.fromEntries(allowed))
        }
        window.addEventListener('message', onMessage)
        return () => window.removeEventListener('message', onMessage)
    }, [posthog])

    return (
        <>
            <SEO
                title="Hogball - PostHog"
                description="A 3D space pinball table with a hedgehog for a ball."
                image={`/images/og/default.png`}
            />
            <Explorer
                template="generic"
                slug="hogball"
                title="Hogball"
                showAddressBar={false}
                headerBarOptions={[]}
                fullScreen
            >
                <div className="h-full pt-10">
                    {src && (
                        <iframe
                            ref={frameRef}
                            src={src}
                            title="Hogball"
                            allow="autoplay; fullscreen"
                            className="w-full h-full border-0"
                        />
                    )}
                </div>
            </Explorer>
        </>
    )
}

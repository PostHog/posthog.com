import React, { useRef, useState } from 'react'
import { LoginView, ProfileMenu, SavedStaysView } from '@posthog/twig-components/account'
import { SavedStay } from '@posthog/twig-components/saved-stay'
import { StayCardContent } from '@posthog/twig-components/stay-card'
import { stays } from '@posthog/twig-components/catalog'
import cabin from '@posthog/twig-components/assets/cabin.jpg'
import coast from '@posthog/twig-components/assets/coast.jpg'
import '@posthog/twig-components/catalog.css'
import '@posthog/twig-components/lab.css'

import PostHogInspector, {
    InspectorCode,
    InspectorDetails,
    InspectorJavaScript,
    InspectorStatus,
} from './PostHogInspector'
import { Exhibit } from './ProductAnalyticsExhibits'
import SessionReplayInspector from './SessionReplayInspector'
import type { SessionReplayInspectorEvent } from './SessionReplayInspector'

type ExampleEvent = {
    id: string
    destination: string
    timestamp: string
    distinctId: string
    sessionId: string
}

const firstVisit: ExampleEvent[] = [
    {
        id: 'evt-201',
        destination: 'Forest',
        timestamp: '2026-09-25T14:10:12.000Z',
        distinctId: 'anon_7f3',
        sessionId: 'session_a1',
    },
    {
        id: 'evt-202',
        destination: 'Coast',
        timestamp: '2026-09-25T14:12:38.000Z',
        distinctId: 'anon_7f3',
        sessionId: 'session_a1',
    },
]

const REPLAY_VIDEO_URL =
    'https://res.cloudinary.com/dmukukwp6/video/upload/Clean_Shot_2026_10_02_at_1_05_27_PM_553e7c2693.mp4'

const profile = {
    displayName: 'Edgar Hogg',
    email: 'edgar.hogg@fakeemail.com',
}

const forestStay = stays[0]
const coastStay = stays.find((stay) => stay.setting === 'Coast') ?? stays[1]

function eventPayload(event: ExampleEvent): string {
    return JSON.stringify({
        event: 'stay_filter_selected',
        timestamp: event.timestamp,
        properties: {
            destination_type: event.destination,
            distinct_id: event.distinctId,
            $session_id: event.sessionId,
        },
    })
}

type GuideDestination = 'Forest' | 'Coast'

function CompactBrowseStays({
    selected,
    onSelect,
}: {
    selected: GuideDestination | null
    onSelect: (destination: GuideDestination) => void
}): JSX.Element {
    const stay = selected === 'Coast' ? coastStay : forestStay
    const photo = selected === 'Coast' ? coast : cabin

    return (
        <section
            aria-label="Twig"
            className="twig-browser min-w-0 overflow-hidden rounded border border-[#d7c8b6] bg-[#f7eddf] text-[#2d2b29]"
        >
            <div className="border-b border-[#d7c8b6] px-3 py-2 font-rounded text-sm font-semibold">Twig</div>
            <div className="p-4 @md:p-5">
                <fieldset className="vac-filters !my-3">
                    <legend className="vac-sr-only">Filter by destination type</legend>
                    {(['Forest', 'Coast'] as const).map((destination) => (
                        <button
                            key={destination}
                            type="button"
                            className="vac-filter text-sm font-semibold"
                            aria-pressed={selected === destination}
                            onClick={() => onSelect(destination)}
                        >
                            {destination}
                        </button>
                    ))}
                </fieldset>
                <article className="vac-card grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-3 rounded border border-[#d7c8b6] bg-[#fff8ee] p-3 [&_.vac-card-body]:p-0 [&_.vac-card-body_h3]:text-base [&_.vac-card-body_p]:text-xs [&_.vac-card-body>p:nth-of-type(2)]:hidden [&_.vac-card-body>p:last-child]:!mb-0 [&_.vac-image]:aspect-[4/3]">
                    <StayCardContent
                        stay={stay}
                        image={
                            <div className="vac-image">
                                <img src={photo} alt={stay.images[0]?.alt ?? ''} />
                            </div>
                        }
                    />
                </article>
            </div>
        </section>
    )
}

export function SessionGroupingFigure(): JSX.Element {
    const [selected, setSelected] = useState<GuideDestination | null>(null)
    const [captured, setCaptured] = useState<GuideDestination[]>([])
    const currentEvent = selected === 'Coast' ? firstVisit[1] : selected === 'Forest' ? firstVisit[0] : null
    const completed = captured.includes('Forest') && captured.includes('Coast')

    return (
        <Exhibit
            stacked
            onReset={() => {
                setSelected(null)
                setCaptured([])
            }}
        >
            <div className="grid items-start gap-4 @lg:grid-cols-[minmax(0,1.05fr)_minmax(14rem,0.95fr)]">
                <CompactBrowseStays
                    selected={selected}
                    onSelect={(destination) => {
                        setSelected(destination)
                        setCaptured((current) => (current.includes(destination) ? current : [...current, destination]))
                    }}
                />
                <PostHogInspector>
                    <InspectorDetails
                        tab="Identity"
                        title="anonymous browser"
                        meta="anon_7f3"
                        rows={[
                            { label: 'distinct_id', value: 'anon_7f3' },
                            { label: '$session_id', value: 'session_a1' },
                        ]}
                    />
                    {currentEvent && (
                        <InspectorCode
                            label="Event payload · selected properties"
                            meta={currentEvent.id}
                            value={eventPayload(currentEvent)}
                        />
                    )}
                    <InspectorStatus>
                        {completed
                            ? 'Both events have the same distinct ID and session ID: one anonymous visitor, one visit.'
                            : selected === 'Forest'
                            ? 'Forest captured. Select Coast next.'
                            : selected === 'Coast'
                            ? 'Coast captured. Select Forest too.'
                            : 'Select Forest, then Coast to capture both events.'}
                    </InspectorStatus>
                </PostHogInspector>
            </div>
        </Exhibit>
    )
}

type SignInStage = 'stay' | 'login' | 'identified' | 'saved'

const compactSavedStaysClassName =
    '[&_.twig-account-page>h1]:!mt-1 [&_.twig-account-page>h1]:!text-2xl [&_.twig-account-page>.twig-account-muted]:!mb-3 [&_.twig-account-stay-grid]:!grid-cols-1 [&_.twig-account-stay-grid]:!gap-3 [&_.twig-account-stay-card>a]:!grid [&_.twig-account-stay-card>a]:!grid-cols-[7rem_minmax(0,1fr)] [&_.twig-account-stay-card>a]:!overflow-hidden [&_.twig-account-stay-card>a]:!rounded [&_.twig-account-stay-card>a]:!border [&_.twig-account-stay-card>a]:!border-[#d7c8b6] [&_.twig-account-stay-card>a]:!bg-[#fff8ee] [&_.vac-card-body]:!p-3 [&_.vac-card-body_h3]:!text-base [&_.vac-card-body_p]:!text-xs [&_.vac-card-body>p:nth-of-type(2)]:hidden [&_.vac-card-body>p:last-child]:!mb-0 [&_.vac-image]:!h-full [&_.vac-image]:!min-h-[8rem] [&_.vac-image]:!aspect-auto'

function CompactSavedStays(): JSX.Element {
    return (
        <div className={compactSavedStaysClassName}>
            <SavedStaysView
                stays={[forestStay]}
                renderImage={() => (
                    <div className="vac-image">
                        <img src={cabin} alt={forestStay.images[0]?.alt ?? ''} />
                    </div>
                )}
                stayHref={() => '#identity-saved-stay'}
                onNavigate={() => undefined}
            />
        </div>
    )
}

function CompactSignedOutBrowse(): JSX.Element {
    return (
        <div>
            <span className="vac-eyebrow">Browse stays</span>
            <h3 className="!mt-1 !mb-3 text-xl">Find your next stay</h3>
            <article className="vac-card grid grid-cols-[7rem_minmax(0,1fr)] overflow-hidden rounded border border-[#d7c8b6] bg-[#fff8ee] [&_.vac-card-body]:p-3 [&_.vac-card-body_h3]:text-base [&_.vac-card-body_p]:text-xs [&_.vac-card-body>p:nth-of-type(2)]:hidden [&_.vac-card-body>p:last-child]:!mb-0 [&_.vac-image]:h-full [&_.vac-image]:min-h-[8rem] [&_.vac-image]:aspect-auto">
                <StayCardContent
                    stay={forestStay}
                    image={
                        <div className="vac-image">
                            <img src={cabin} alt={forestStay.images[0]?.alt ?? ''} />
                        </div>
                    }
                />
            </article>
        </div>
    )
}

function StayCard({ signedIn, onSignIn, onSave }: { signedIn: boolean; onSignIn: () => void; onSave: () => void }) {
    return (
        <article className="vac-card relative grid grid-cols-[7rem_minmax(0,1fr)] overflow-hidden rounded border border-[#d7c8b6] bg-[#fff8ee] [&_.vac-card-body]:p-3 [&_.vac-card-body_h3]:text-base [&_.vac-card-body_p]:text-xs [&_.vac-card-body>p:nth-of-type(2)]:hidden [&_.vac-card-body>p:last-child]:!mb-0 [&_.vac-image]:h-full [&_.vac-image]:min-h-[8rem] [&_.vac-image]:aspect-auto">
            <StayCardContent
                stay={forestStay}
                image={
                    <div className="vac-image">
                        <img src={cabin} alt={forestStay.images[0]?.alt ?? ''} />
                    </div>
                }
            />
            <div className="absolute right-3 top-3">
                {signedIn ? (
                    <SavedStay
                        stayName={forestStay.title ?? 'Forest stay'}
                        signedIn
                        saved={false}
                        onSavedChange={onSave}
                    />
                ) : (
                    <SavedStay stayName={forestStay.title ?? 'Forest stay'} signedIn={false} onSignIn={onSignIn} />
                )}
            </div>
        </article>
    )
}

export function IdentifySavedStayFigure(): JSX.Element {
    const [stage, setStage] = useState<SignInStage>('stay')

    return (
        <Exhibit stacked onReset={() => setStage('stay')}>
            <div className="grid items-start gap-4 @lg:grid-cols-[minmax(0,1.05fr)_minmax(14rem,0.95fr)]">
                <section
                    aria-label="Twig"
                    className="twig-browser min-w-0 overflow-hidden rounded border border-[#d7c8b6] bg-[#f7eddf] text-[#2d2b29]"
                >
                    <div className="border-b border-[#d7c8b6] px-3 py-2 font-rounded text-sm font-semibold">Twig</div>
                    <div className="p-3 @md:p-4">
                        {stage === 'login' ? (
                            <LoginView
                                className="!min-h-0 !p-0 [&_.twig-login-card]:!w-full [&_.twig-login-card]:!max-w-none [&_.twig-login-card]:!p-4 [&_.twig-login-card]:!shadow-[4px_4px_0_#efe1ce] [&_.twig-login-card_h1]:!mt-0 [&_.twig-login-card_h1]:!text-2xl [&_.twig-login-hint]:!mb-3 [&_.twig-login-card_label]:!mt-2 [&_.twig-login-card_input]:!min-h-[36px] [&_.twig-login-card_input]:!py-2 [&_.twig-login-submit]:!mt-3 [&_.twig-login-submit]:!min-h-[38px]"
                                email={profile.email}
                                onLogin={() => setStage('identified')}
                            />
                        ) : stage === 'saved' ? (
                            <CompactSavedStays />
                        ) : (
                            <StayCard
                                signedIn={stage === 'identified'}
                                onSignIn={() => setStage('login')}
                                onSave={() => setStage('saved')}
                            />
                        )}
                    </div>
                </section>
                <PostHogInspector>
                    {(stage === 'stay' || stage === 'login') && (
                        <>
                            <InspectorDetails
                                tab="Identity"
                                title="anonymous browser"
                                meta="anon_7f3"
                                rows={[
                                    { label: 'distinct_id', value: 'anon_7f3' },
                                    { label: '$session_id', value: 'session_b2' },
                                ]}
                            />
                            <InspectorStatus>
                                {stage === 'stay'
                                    ? "Select the bookmark to start Twig's sign-in flow."
                                    : 'Twig waits until the account is signed in before calling identify.'}
                            </InspectorStatus>
                        </>
                    )}
                    {(stage === 'identified' || stage === 'saved') && (
                        <>
                            <InspectorDetails
                                tab="Identity"
                                title="person profile"
                                meta="Edgar Hogg"
                                rows={[
                                    { label: 'account distinct_id', value: 'user_812' },
                                    { label: 'linked anonymous ID', value: 'anon_7f3' },
                                    { label: 'earlier activity', value: 'Forest, Coast, City' },
                                ]}
                            />
                            <InspectorJavaScript
                                meta="identify"
                                lines={[
                                    'const currentUser = {',
                                    "    id: 'user_812',",
                                    '}',
                                    '',
                                    'posthog.identify(currentUser.id)',
                                ]}
                                highlightedLine={4}
                            />
                            <InspectorStatus>
                                {stage === 'identified'
                                    ? 'PostHog has linked the browser identity to the signed-in account. Select the bookmark again to save the stay.'
                                    : 'The earlier anonymous filters and this saved stay now belong to the same person profile.'}
                            </InspectorStatus>
                        </>
                    )}
                </PostHogInspector>
            </div>
        </Exhibit>
    )
}

export function ResetIdentityFigure(): JSX.Element {
    const [signedIn, setSignedIn] = useState(true)
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <Exhibit
            stacked
            onReset={() => {
                setSignedIn(true)
                setMenuOpen(false)
            }}
        >
            <div className="grid items-start gap-4 @lg:grid-cols-[minmax(0,1.05fr)_minmax(14rem,0.95fr)]">
                <section
                    aria-label="Twig"
                    className={`twig-browser overflow-visible rounded border border-[#d7c8b6] bg-[#f7eddf] text-[#2d2b29] ${
                        signedIn && menuOpen ? 'min-h-[22rem]' : ''
                    }`}
                >
                    <div className="relative z-10 flex items-center justify-between border-b border-[#d7c8b6] px-3 py-2">
                        <span className="font-rounded text-sm font-semibold">Twig</span>
                        {signedIn && (
                            <ProfileMenu
                                className="[&_.twig-profile-popover]:!top-[calc(100%+6px)] [&_.twig-profile-popover]:!w-32 [&_.twig-profile-summary]:hidden [&_.twig-profile-popover_nav]:hidden [&_.twig-profile-signout]:!px-2.5 [&_.twig-profile-signout]:!py-2.5"
                                profile={profile}
                                links={[]}
                                open={menuOpen}
                                onOpenChange={setMenuOpen}
                                onNavigate={() => undefined}
                                onSignOut={() => {
                                    setSignedIn(false)
                                    setMenuOpen(false)
                                }}
                            />
                        )}
                    </div>
                    <div className="p-4">{signedIn ? <CompactSavedStays /> : <CompactSignedOutBrowse />}</div>
                </section>
                <PostHogInspector>
                    {signedIn ? (
                        <>
                            <InspectorDetails
                                tab="Identity"
                                title="signed-in browser"
                                meta="Edgar Hogg"
                                rows={[
                                    { label: 'distinct_id', value: 'user_812' },
                                    { label: '$session_id', value: 'session_b2' },
                                ]}
                            />
                            <InspectorStatus>Open the profile menu and select Log out.</InspectorStatus>
                        </>
                    ) : (
                        <>
                            <InspectorJavaScript
                                meta="reset"
                                lines={['function logOut() {', '    posthog.reset()', '}']}
                                highlightedLine={1}
                            />
                            <InspectorDetails
                                tab="Identity"
                                title="anonymous browser"
                                meta="new visitor"
                                rows={[
                                    { label: 'distinct_id', value: 'anon_9k4' },
                                    { label: '$session_id', value: 'session_c3' },
                                ]}
                            />
                            <InspectorStatus>
                                New activity can no longer be mistaken for Edgar’s activity.
                            </InspectorStatus>
                        </>
                    )}
                </PostHogInspector>
            </div>
        </Exhibit>
    )
}

// Offsets match the recording at normal speed; identifiers are the lesson's example data.
const replayTimeline: SessionReplayInspectorEvent[] = [
    {
        timeMs: 0,
        kind: 'Pageview',
        title: 'Browse stays',
        properties: [
            { label: 'event', value: '$pageview' },
            { label: 'pathname', value: '/' },
            { label: 'distinct_id', value: 'anon_7f3' },
            { label: '$session_id', value: 'session_b2' },
        ],
    },
    {
        timeMs: 7300,
        kind: 'Click',
        title: 'City filter',
        properties: [
            { label: 'event', value: 'stay_filter_selected' },
            { label: 'destination_type', value: 'City' },
            { label: 'distinct_id', value: 'anon_7f3' },
            { label: '$session_id', value: 'session_b2' },
        ],
    },
    {
        timeMs: 10_200,
        kind: 'Pageview',
        title: 'Le Nid Chic',
        properties: [
            { label: 'event', value: '$pageview' },
            { label: 'pathname', value: '/stays/stay-03' },
            { label: 'distinct_id', value: 'anon_7f3' },
            { label: '$session_id', value: 'session_b2' },
        ],
    },
    {
        timeMs: 12_400,
        kind: 'Pageview',
        title: 'Log in',
        properties: [
            { label: 'event', value: '$pageview' },
            { label: 'pathname', value: '/login' },
            { label: 'distinct_id', value: 'anon_7f3' },
            { label: '$session_id', value: 'session_b2' },
        ],
    },
    {
        timeMs: 13_800,
        kind: 'Identity',
        title: 'Identify Edgar',
        properties: [
            { label: 'event', value: '$identify' },
            { label: '$anon_distinct_id', value: 'anon_7f3' },
            { label: 'distinct_id', value: 'user_812' },
            { label: '$session_id', value: 'session_b2' },
        ],
    },
    {
        timeMs: 13_900,
        kind: 'Pageview',
        title: 'Le Nid Chic',
        properties: [
            { label: 'event', value: '$pageview' },
            { label: 'pathname', value: '/stays/stay-03' },
            { label: 'distinct_id', value: 'user_812' },
            { label: '$session_id', value: 'session_b2' },
        ],
    },
    {
        timeMs: 16_900,
        kind: 'Click',
        title: 'Save stay',
        properties: [
            { label: 'event', value: 'stay_saved' },
            { label: 'stay_name', value: 'Le Nid Chic' },
            { label: 'distinct_id', value: 'user_812' },
            { label: '$session_id', value: 'session_b2' },
        ],
    },
]

function formatReplayTime(milliseconds: number): string {
    return `${(milliseconds / 1000).toFixed(1)}s`
}

export function SessionReplayLinkFigure(): JSX.Element {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [activeReplayEvent, setActiveReplayEvent] = useState(0)
    const [durationMs, setDurationMs] = useState(19_133)
    const [positionMs, setPositionMs] = useState(0)
    const [playing, setPlaying] = useState(false)

    const syncReplayDuration = (video: HTMLVideoElement): void => {
        if (Number.isFinite(video.duration) && video.duration > 0) {
            setDurationMs(video.duration * 1000)
        }
    }

    const syncReplayPosition = (video: HTMLVideoElement): void => {
        const nextPosition = video.currentTime * 1000
        const nextActiveEvent = replayTimeline.reduce(
            (activeIndex, event, index) => (nextPosition >= event.timeMs ? index : activeIndex),
            0
        )

        setPositionMs(nextPosition)
        setActiveReplayEvent(nextActiveEvent)
    }

    const togglePlayback = (): void => {
        const video = videoRef.current
        if (!video) {
            return
        }

        if (!video.paused) {
            video.pause()
            return
        }

        if (video.currentTime >= video.duration - 0.05) {
            video.currentTime = 0
            syncReplayPosition(video)
        }

        void video.play()
    }

    return (
        <Exhibit stacked>
            <style>{`
                @media (min-width: 360px) and (pointer: fine) {
                    .identity-session-replay-grid {
                        grid-template-columns: minmax(0, 1fr) 11.5rem;
                        gap: 0.5rem;
                    }

                    .identity-session-replay-grid .session-replay-inspector-summary {
                        display: none;
                    }
                }

                @media (min-width: 900px) {
                    .identity-session-replay-grid {
                        grid-template-columns: minmax(18rem, 1fr) 15rem;
                        gap: 1rem;
                    }

                    .identity-session-replay-grid .session-replay-inspector-summary {
                        display: flex;
                    }
                }
            `}</style>
            <div className="identity-session-replay-grid grid items-stretch gap-4">
                <section
                    aria-label="PostHog Session Replay"
                    className="flex min-h-0 min-w-0 flex-col overflow-hidden rounded border border-[#d3d0c8] bg-[#fffdfa] font-rounded text-[#292724] shadow-sm"
                >
                    <header className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-[#d3d0c8] bg-[#faf8f3] px-3 py-2 text-xs">
                        <strong className="text-sm">Session replay</strong>
                        <span className="hidden font-code text-[11px] text-[#716c63] min-[520px]:inline">
                            twig.com/stays
                        </span>
                        <span className="ml-auto hidden font-semibold min-[900px]:inline">Edgar Hogg</span>
                        <span className="hidden rounded border border-[#d3d0c8] bg-[#fffdfa] px-2 py-0.5 font-code text-[10px] font-semibold min-[900px]:inline">
                            session_b2
                        </span>
                    </header>

                    <div className="flex min-h-0 flex-1 items-center bg-[#1f1f1d] py-6">
                        <video
                            ref={videoRef}
                            aria-label="Twig visit recording"
                            className="block aspect-video max-h-full w-full object-contain"
                            disablePictureInPicture
                            muted
                            playsInline
                            preload="metadata"
                            src={REPLAY_VIDEO_URL}
                            onDurationChange={(event) => syncReplayDuration(event.currentTarget)}
                            onEnded={(event) => {
                                setPlaying(false)
                                syncReplayPosition(event.currentTarget)
                            }}
                            onLoadedMetadata={(event) => {
                                syncReplayDuration(event.currentTarget)
                                syncReplayPosition(event.currentTarget)
                            }}
                            onPause={() => setPlaying(false)}
                            onPlay={() => setPlaying(true)}
                            onSeeked={(event) => syncReplayPosition(event.currentTarget)}
                            onTimeUpdate={(event) => syncReplayPosition(event.currentTarget)}
                        />
                    </div>

                    <div className="grid grid-cols-[auto_auto_minmax(0,1fr)] items-center gap-2 bg-[#fffdfa] px-2 py-1.5">
                        <input
                            aria-label="Replay position"
                            className="col-span-3 col-start-1 row-start-1 my-0 w-full"
                            max={durationMs}
                            min={0}
                            step="any"
                            type="range"
                            value={Math.min(positionMs, durationMs)}
                            onChange={(event) => {
                                const video = videoRef.current
                                if (!video) {
                                    return
                                }

                                const nextPosition = Number(event.currentTarget.value)
                                video.currentTime = nextPosition / 1000
                                syncReplayPosition(video)
                            }}
                        />
                        <button
                            aria-label={
                                playing
                                    ? 'Pause replay'
                                    : positionMs >= durationMs - 50
                                    ? 'Replay visit'
                                    : 'Play replay'
                            }
                            className="col-start-1 row-start-2 grid size-7 place-items-center border-0 bg-transparent p-0 shadow-none"
                            type="button"
                            onClick={togglePlayback}
                        >
                            {playing ? (
                                <svg aria-hidden="true" className="size-3" viewBox="0 0 12 12">
                                    <rect height="12" width="3.5" x="1" />
                                    <rect height="12" width="3.5" x="7.5" />
                                </svg>
                            ) : (
                                <svg aria-hidden="true" className="size-3" viewBox="0 0 12 12">
                                    <path d="M1.5 0.8 11 6l-9.5 5.2Z" />
                                </svg>
                            )}
                        </button>
                        <output className="col-start-2 row-start-2 text-xs">
                            {formatReplayTime(positionMs)} / {formatReplayTime(durationMs)}
                        </output>
                    </div>
                </section>

                <SessionReplayInspector events={replayTimeline} activeIndex={activeReplayEvent} />
            </div>
        </Exhibit>
    )
}

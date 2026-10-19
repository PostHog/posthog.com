import React, { useEffect, useRef, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { motion, useReducedMotion, TargetAndTransition, Transition } from 'framer-motion'
import { IconX } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { OSTextarea } from 'components/OSForm'
import { IconImage, PRODUCT_ICON_MAP } from 'components/OSIcons'
import { StickerTombstone } from 'components/Stickers/Stickers'
import usePostHog from '../../../hooks/usePostHog'

const FEEDBACK_SURVEY_ID = '01a154d2-83a7-0000-94c9-677bc3e2be10'
const FEEDBACK_QUESTION_ID = '233d2514-efa4-4fc8-a962-2b0057f375ef'
const SUBMITTED_STORAGE_KEY = `ph-feedback-submitted-${FEEDBACK_SURVEY_ID}`

const DATE_FORMAT: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }

const TOMBSTONE_LANDS_AT = 0.28

const TOMBSTONE_SLAM: { initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition } = {
    initial: { scale: 3, rotate: -12, opacity: 0 },
    animate: { scale: [3, 0.9, 1], rotate: [-12, -3, -3], opacity: [0, 1, 1] },
    transition: { duration: 0.48, times: [0, 0.58, 1], ease: ['easeIn', 'easeOut'] },
}

const GROUND_SHAKE_X = [0, -5, 5, -3, 3, 0]
const GROUND_SHAKE = { delay: TOMBSTONE_LANDS_AT, duration: 0.3 }
const EPITAPH_FADE = { delay: TOMBSTONE_LANDS_AT + 0.15, duration: 0.3 }

const POP_IN_VIEWPORT = { once: true, amount: 0.6 }
const POP_IN_SPRING = { type: 'spring', stiffness: 420, damping: 22, delay: 0.2 } as const

type PopupState = 'open' | 'dismissed' | 'sent'

const useSkipRatePercent = (): number | null => {
    const { homepageFeedbackStats } = useStaticQuery(graphql`
        {
            homepageFeedbackStats {
                skipRatePercent
            }
        }
    `)
    return homepageFeedbackStats?.skipRatePercent ?? null
}

const hasSubmittedBefore = (): boolean => {
    try {
        return window.localStorage.getItem(SUBMITTED_STORAGE_KEY) !== null
    } catch {
        return false
    }
}

const rememberSubmission = (): void => {
    try {
        window.localStorage.setItem(SUBMITTED_STORAGE_KEY, new Date().toISOString())
    } catch {
        return
    }
}

const MIN_DECIMALS = 1
const FLOATING_POINT_TOLERANCE = 1e-9

const splitAtFirstNonNine = (skipRatePercent: number): { skipRate: string; responseRate: string } => {
    const gap = 100 - skipRatePercent
    const decimals = gap > 0 ? Math.max(MIN_DECIMALS, Math.ceil(-Math.log10(gap))) : MIN_DECIMALS
    const scale = 10 ** decimals
    const skipRate = Math.floor(skipRatePercent * scale + FLOATING_POINT_TOLERANCE) / scale
    const format = (value: number) => String(Number(value.toFixed(decimals)))
    return { skipRate: format(skipRate), responseRate: format(100 - skipRate) }
}

const SkipRate = ({ submitted }: { submitted: boolean }): JSX.Element | null => {
    const skipRatePercent = useSkipRatePercent()
    if (skipRatePercent === null) return null
    const { skipRate, responseRate } = splitAtFirstNonNine(skipRatePercent)
    return (
        <p className="m-0 mt-3 text-sm text-secondary text-center">
            {submitted ? (
                <>
                    You're in the <strong className="text-primary">{responseRate}%</strong> who did. Thanks.
                </>
            ) : (
                <>
                    <strong className="text-primary">{skipRate}%</strong> of visitors (including you) didn't fill out
                    this form.
                </>
            )}
        </p>
    )
}

const TitleBar = ({ onClose }: { onClose?: () => void }): JSX.Element => (
    <div className="flex items-center gap-1.5 border-b border-primary bg-accent px-2 py-1.5">
        <IconImage url={PRODUCT_ICON_MAP.posthog.classic} className="size-5" />
        <span className="flex-1 text-sm font-semibold">feedback.survey</span>
        {onClose && (
            <button
                type="button"
                aria-label="Close survey"
                onClick={onClose}
                className="p-0.5 rounded text-secondary hover:text-primary hover:bg-primary"
            >
                <IconX className="size-4" />
            </button>
        )}
    </div>
)

export default function FeedbackPopup(): JSX.Element {
    const [state, setState] = useState<PopupState>('open')
    const [feedback, setFeedback] = useState('')
    const [dismissedOn, setDismissedOn] = useState('')
    const [resurrections, setResurrections] = useState(0)
    const [submittedBefore, setSubmittedBefore] = useState(false)
    const shownCaptured = useRef(false)
    const shouldReduceMotion = useReducedMotion()
    const posthog = usePostHog()

    useEffect(() => setSubmittedBefore(hasSubmittedBefore()), [])

    const captureShown = () => {
        if (shownCaptured.current) return
        shownCaptured.current = true
        posthog?.capture('survey shown', { $survey_id: FEEDBACK_SURVEY_ID })
    }

    const dismiss = () => {
        posthog?.capture('survey dismissed', { $survey_id: FEEDBACK_SURVEY_ID })
        setDismissedOn(new Date().toLocaleDateString('en-US', DATE_FORMAT))
        setState('dismissed')
    }

    const resurrect = () => {
        setResurrections((count) => count + 1)
        setState('open')
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        const response = feedback.trim()
        if (!response) return
        posthog?.capture('survey sent', {
            $survey_id: FEEDBACK_SURVEY_ID,
            $survey_response: response,
            [`$survey_response_${FEEDBACK_QUESTION_ID}`]: response,
        })
        rememberSubmission()
        setState('sent')
    }

    return (
        <div className="w-full max-w-sm mx-auto">
            <div className="grid">
                <motion.div
                    key={resurrections}
                    initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.6, y: 24 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={POP_IN_VIEWPORT}
                    onViewportEnter={captureShown}
                    transition={POP_IN_SPRING}
                    aria-hidden={state === 'dismissed'}
                    className={`[grid-area:1/1] overflow-hidden rounded-md border border-primary bg-light dark:bg-dark shadow-2xl ${
                        state === 'dismissed' ? 'invisible' : ''
                    }`}
                >
                    <TitleBar onClose={state === 'open' ? dismiss : undefined} />
                    <div className="grid p-4">
                        <form
                            onSubmit={handleSubmit}
                            aria-hidden={state === 'sent'}
                            className={`[grid-area:1/1] ${state === 'sent' ? 'invisible' : ''}`}
                        >
                            <OSTextarea
                                label="What's one thing PostHog should fix?"
                                direction="column"
                                labelClassName="!text-base !font-bold"
                                name="feedback"
                                rows={3}
                                placeholder="Be honest. We can take it."
                                className="!resize-none"
                                value={feedback}
                                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                                    setFeedback(event.target.value)
                                }
                            />
                            <OSButton
                                type="submit"
                                variant="primary"
                                size="md"
                                width="full"
                                disabled={!feedback.trim()}
                                className="mt-3"
                            >
                                Submit
                            </OSButton>
                        </form>
                        {state === 'sent' && (
                            <div className="[grid-area:1/1] flex flex-col items-center justify-center text-center">
                                <p className="m-0 text-lg font-bold">Feedback sent</p>
                                <p className="m-0 mt-1 text-sm text-secondary">
                                    We were wrong about you. You should still use PostHog though.
                                </p>
                            </div>
                        )}
                    </div>
                </motion.div>
                {state === 'dismissed' && (
                    <motion.div
                        initial={shouldReduceMotion ? false : { x: 0 }}
                        animate={{ x: GROUND_SHAKE_X }}
                        transition={GROUND_SHAKE}
                        className="[grid-area:1/1] flex flex-col items-center justify-center rounded-md border-2 border-dashed border-primary text-center"
                    >
                        <motion.div
                            initial={shouldReduceMotion ? false : TOMBSTONE_SLAM.initial}
                            animate={TOMBSTONE_SLAM.animate}
                            transition={TOMBSTONE_SLAM.transition}
                            className="relative z-10"
                        >
                            <StickerTombstone className="size-24" />
                        </motion.div>
                        <motion.div
                            initial={shouldReduceMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={EPITAPH_FADE}
                            className="flex flex-col items-center"
                        >
                            <p className="m-0 mt-2 text-lg font-bold">Your PostHog feedback</p>
                            <p className="m-0 text-sm text-secondary">{dismissedOn}</p>
                            <OSButton variant="underline" size="sm" onClick={resurrect} className="mt-2">
                                Resurrect it
                            </OSButton>
                        </motion.div>
                    </motion.div>
                )}
            </div>
            <SkipRate submitted={submittedBefore || state === 'sent'} />
        </div>
    )
}

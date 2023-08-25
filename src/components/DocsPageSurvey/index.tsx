import React from 'react'
import cntl from 'cntl'
import { ThumbsDown, ThumbsUp } from 'components/Icons/Icons'
import { motion } from 'framer-motion'
import usePostHog from '../../hooks/usePostHog'
import { button as callToAction } from 'components/CallToAction'

const button = cntl`
    text-base
    font-bold
    flex
    items-center
    flex-grow
    sm:flex-grow-0
    sm:w-[220px]
    justify-between
    px-4
    py-2
    rounded-sm
    shadow-sm
    bg-white
    dark:bg-accent-dark
    border
    border-transparent
    dark:border-dark
    text-primary/75
    dark:text-primary-dark/75
    hover:text-primary/100
    dark:text-primary-dark/100
    relative
    active:top-[1px]
    active:scale-[.98]
    transition-none
    transition-colors
`

const ResponseButtons: React.FC<{ submitResponse: (helpful: boolean) => void }> = ({ submitResponse }) => {
    return (
        <>
            <h3 className="text-xl font-bold m-0 mb-3">Was this page useful?</h3>
            <div className="flex space-x-3 items-center">
                <button onClick={() => submitResponse(true)} className={button}>
                    <span>Yes</span>
                    <ThumbsUp />
                </button>
                <button onClick={() => submitResponse(false)} className={button}>
                    <span>Could be better</span>
                    <ThumbsDown />
                </button>
            </div>
        </>
    )
}

const ResponseFeedback: React.FC<{ title: string; placeholder: string; onSubmit: (response: string) => void }> = ({
    title,
    placeholder,
    onSubmit,
}) => {
    const [feedback, setFeedback] = React.useState<string>('')

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        onSubmit(feedback)
    }

    return (
        <motion.div initial={{ translateY: '10%', opacity: 0 }} animate={{ translateY: 0, opacity: 1 }}>
            <form onSubmit={handleSubmit} className="w-full space-y-4 m-0">
                <h3 className=" text-xlfont-bold m-0">{title}</h3>
                <textarea
                    className="w-full block bg-white p-1.5 rounded-sm shadow-sm border border-black/20 text-sm dark:bg-white/10 dark:text-white"
                    rows={3}
                    onChange={(event) => setFeedback(event.target.value)}
                    autoFocus
                    placeholder={placeholder}
                />

                <button className={callToAction()} disabled={feedback.trim() === ''}>
                    Send feedback
                </button>
            </form>
        </motion.div>
    )
}

const ResponseMessage = () => {
    return (
        <motion.div initial={{ translateY: '10%', opacity: 0 }} animate={{ translateY: 0, opacity: 1 }}>
            <h3 className="text-xl font-bold m-0">Thanks for the feedback!</h3>
        </motion.div>
    )
}

export const DocsPageSurvey = () => {
    const [state, setState] = React.useState<'base' | 'helpful' | 'not-helpful' | 'thanks'>('base')
    const posthog = usePostHog()

    const submitResponse = (wasHelpful: boolean) => {
        if (posthog) {
            posthog.capture('docs_page_review', {
                wasHelpful: wasHelpful,
            })
        }

        setState(wasHelpful ? 'helpful' : 'not-helpful')
    }

    const submitFeedback = (feedback: string) => {
        if (posthog) {
            posthog.capture('docs_page_feedback', {
                wasHelpful: state === 'helpful',
                feedback,
            })
        }

        setState('thanks')
    }

    switch (state) {
        case 'base':
            return <ResponseButtons submitResponse={submitResponse} />
        case 'helpful':
            return (
                <ResponseFeedback
                    title="What was most helpful?"
                    placeholder="Let us know what you found helpful"
                    onSubmit={submitFeedback}
                />
            )
        case 'not-helpful':
            return (
                <ResponseFeedback
                    title="What can we improve?"
                    placeholder="Let us know what we can improve on"
                    onSubmit={submitFeedback}
                />
            )
        case 'thanks':
            return <ResponseMessage />
    }
}

import React, { useState } from 'react'
import cntl from 'cntl'
import { PaperPlaneArrow, ThumbsDownOutline, ThumbsUpOutline } from 'components/Icons/Icons'
import { motion } from 'framer-motion'
import usePostHog from '../../hooks/usePostHog'
import Link from 'components/Link'

const button = cntl`
    w-full
    text-sm
    sm:text-lg
    font-bold
    flex
    flex-col
    space-y-[7px]
    items-center
    flex-grow
    sm:flex-grow-0
    justify-between
    px-4
    py-2
    sm:px-9
    sm:py-5
    rounded
    border-2
    text-primary/75
    hover:text-primary/100
    dark:text-primary-dark/100
    relative
    active:top-[1px]
    active:scale-[.98]
    transition-none
    transition-colors
`
const buttonWithThumbsUp = ({ selected }: { selected: 'up' | 'down' | null }) => cntl`
    shadow-[0_2px_0_0_teal]
    border-[#29DBBB]
    hover:bg-teal/30
    dark:hover:bg-teal/30

    ${
        selected === 'up'
            ? cntl`
            bg-teal/30
            dark:bg-teal/30
          `
            : cntl`
          bg-white
          dark:bg-accent-dark
          `
    }
    
`

const buttonWithThumbsDown = ({ selected }: { selected: 'up' | 'down' | null }) => cntl`
    shadow-[0_2px_0_0_#E92F2F]
    border-[#E92F2F]
    hover:bg-[#E92F2F]/30
    dark:hover:bg-[#E92F2F]/30

    ${
        selected === 'down'
            ? cntl`
          bg-[#E92F2F]/30
          dark:bg-[#E92F2F]/30
          `
            : cntl`
          bg-white
          dark:bg-accent-dark
          `
    }
`
const buttonWithPaperPlaneArrow = cntl` 
    rounded-[3px] 
    px-2.5 
    py-[7px] 
    text-primary/50 
    hover:text-primary/100 
    dark:text-primary-dark/50 
    dark:hover:text-primary-dark/100 
    bg-white 
    dark:bg-dark
    border-2
    border-primary/50
    dark:border-primary-dark/50 
    shadow-[0_2px_0_0_#15151580]
    dark:shadow-[0_2px_0_0_#ffffff80]

`

const ResponseButtons: React.FC<{ submitResponse: (helpful: boolean) => void }> = ({ submitResponse }) => {
    const [selected, setSelected] = useState<'up' | 'down' | null>(null)
    const handleClickBtnWithThumbsUp = () => {
        setSelected('up')
        submitResponse(true)
    }
    const handleClickBtnWithThumbsDown = () => {
        setSelected('down')
        submitResponse(false)
    }
    return (
        <>
            <h3 className="text-xl font-bold m-0 mb-3">Was this page useful?</h3>
            <div className="flex space-x-5 justify-between items-center">
                <button
                    onClick={handleClickBtnWithThumbsUp}
                    className={`${button} ${buttonWithThumbsUp({ selected })}`}
                >
                    <ThumbsUpOutline className="w-6 h-6" />
                    <span>Helpful</span>
                </button>
                <button
                    onClick={handleClickBtnWithThumbsDown}
                    className={`${button} ${buttonWithThumbsDown({ selected })}`}
                >
                    <ThumbsDownOutline className="w-6 h-6" />
                    <span>Could be better</span>
                </button>
            </div>
        </>
    )
}

const ResponseFeedback: React.FC<{
    title: string
    placeholder: string
    onSubmit: (response: string) => void
    filePath: string | undefined
}> = ({ title, placeholder, onSubmit, filePath }) => {
    const [feedback, setFeedback] = React.useState<string>('')

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        onSubmit(feedback)
    }

    return (
        <motion.div initial={{ translateY: '10%', opacity: 0 }} animate={{ translateY: 0, opacity: 1 }}>
            <form onSubmit={handleSubmit} className="w-full space-y-4 mt-6">
                <h3 className=" text-lg font-semibold m-0">{title}</h3>
                <div className="flex space-x-2 items-center pt-2 pr-2.5 pb-3 bg-white dark:bg-[#202228] rounded border border-primary/50 dark:border-primary-dark/50">
                    <textarea
                        className="w-full block resize-none border-0 focus:ring-0 text-base font-medium dark:bg-[#202228]"
                        rows={1}
                        onChange={(event) => setFeedback(event.target.value)}
                        autoFocus
                        placeholder={placeholder}
                    />

                    <button className={buttonWithPaperPlaneArrow} disabled={feedback.trim() === ''}>
                        <PaperPlaneArrow className="w-6 h-6" />
                    </button>
                </div>
                {filePath && (
                    <p className="mt-2 text-[13px] font-medium text-primary/75 dark:text-primary-dark/75 ">
                        P.S. You can
                        <Link to={`https://github.com/PostHog/posthog.com/edit/master/contents/${filePath}`}>
                            <span className="text-red">&nbsp;submit a pull request&nbsp;</span>
                        </Link>
                        to this page if you can help improve this page!
                    </p>
                )}
            </form>
        </motion.div>
    )
}

const ResponseMessage = () => {
    return (
        <motion.div initial={{ translateY: '10%', opacity: 0 }} animate={{ translateY: 0, opacity: 1 }}>
            <h3 className="text-xl font-bold m-0">Thanks for the feedback!</h3>
            <p className="mt-2 font-medium text-primary/75 dark:text-primary-dark/75">
                Your feedback has been submitted successfully.
            </p>
        </motion.div>
    )
}

interface Props {
    filePath: string | undefined
}

export const DocsPageSurvey = ({ filePath }: Props): JSX.Element => {
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
        case 'not-helpful':
            return (
                <>
                    <ResponseButtons submitResponse={submitResponse} />
                    <ResponseFeedback
                        title="Thanks for the feedback!"
                        placeholder="Mind telling us more?"
                        onSubmit={submitFeedback}
                        filePath={filePath}
                    />
                </>
            )
        case 'thanks':
            return <ResponseMessage />
    }
}

import cntl from 'cntl'
import { CallToAction } from 'components/CallToAction'
import { ThumbsDown, ThumbsUp } from 'components/Icons/Icons'
import { motion } from 'framer-motion'
import { useValues } from 'kea'
import React, { useState } from 'react'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'

const button = cntl`
    flex
    space-x-2
    items-center
    text-white
    hover:!text-white
    !bg-transparent
    !border-white
    !border-opacity-10
    hover:!border-opacity-25
    font-semibold
`

const ResponseButtons = ({ submitResponse }) => {
    return (
        <>
            <h3 className="text-white mb-5 !mt-0">Was this page useful?</h3>
            <div className="flex space-x-5 items-center">
                <CallToAction onClick={() => submitResponse(true)} size="sm" type="outline" className={button}>
                    <ThumbsUp />
                    <span>Yes</span>
                </CallToAction>
                <CallToAction onClick={() => submitResponse(false)} size="sm" type="outline" className={button}>
                    <ThumbsDown />
                    <span>Could be better</span>
                </CallToAction>
            </div>
        </>
    )
}

const ResponseMessage = () => {
    return (
        <motion.div initial={{ translateY: '100%', opacity: 0 }} animate={{ translateY: 0, opacity: 1 }}>
            <h3 className="text-white mb-5">Thanks for the feedback!</h3>
            <p className="m-0 text-white">
                If you need help on any of the above, feel free to create an issue on{' '}
                <a href="https://github.com/PostHog/posthog">our repo</a>, or <a href="/slack">join our Slack</a> where
                a member of our team can assist you! Chances are that if you have a problem or question, someone else
                does too - so please don't hesitate to create a new issue or ask us a question.
            </p>
        </motion.div>
    )
}

export const DocsPageSurvey = () => {
    const [submittedResponse, setSubmittedResponse] = useState(false)
    const { posthog } = useValues(posthogAnalyticsLogic)

    const submitResponse = (wasHelpful) => {
        if (posthog) {
            posthog.capture('docs_page_review', {
                wasHelpful: wasHelpful,
            })
        }
        setSubmittedResponse(true)
    }

    return submittedResponse ? <ResponseMessage /> : <ResponseButtons submitResponse={submitResponse} />
}

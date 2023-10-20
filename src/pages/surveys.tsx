import React, { useState } from 'react'
import Layout from '../components/Layout'
import Link from 'components/Link'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { IconChat, IconMinus, IconPlus, IconGraph } from '@posthog/icons'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import { CallToAction } from 'components/CallToAction'
import { CustomerCard } from 'components/Products/CustomerCard'
import { Feature } from 'components/Products/Feature'
import { Subfeature } from 'components/Products/Subfeature'
import Tooltip from 'components/Tooltip'

const features = [
    '$50,000 in PostHog credit for 12 months<sup>1</sup>',
    'Exclusive PostHog merch for founders<sup>2</sup>',
    'Access to our YC founder Slack community',
    'Onboarding session to get you started',
    'Our CEO on WhatsApp or SMS',
]

const cards = [
    {
        question: 'Where do key events happen in my user’s sessions?',
    },
    {
        question: "How do I understand my users' behavior in funnels?",
        url: '#',
    },
    {
        question: 'How do I understand my user journeys?',
        url: '#',
    },
    {
        question: 'How can I understand what my power users are doing?',
        url: '#',
    },
    {
        question: 'How do I figure out how to lower churn?',
        url: '#',
    },
    {
        question: 'What errors are being logged to the console?',
    },
    {
        question: 'How does my user experience differ across regions?',
    },
    {
        question: 'What is a user’s DOM interactive time?',
        url: '#',
    },
    {
        question: 'How fast does my app load?',
    },
    {
        question: 'What is a user’s First Contentful Paint time?',
        url: '#',
    },
    {
        question: 'What is a user’s Page Loaded time?',
        url: '#',
    },
    {
        question: 'How does my user experience differ across devices?',
    },
]

const Card = ({ question, url }) => {
    return (
        <>
            {url ? (
                <li className="text-2xl font-bold">
                    <Link to={url} className="block text-red dark:text-yellow font-bold py-1">
                        {question}
                    </Link>
                </li>
            ) : (
                <li className="text-2xl font-bold py-1">{question}</li>
            )}
        </>
    )
}

const VsCompetitor = ({ title, children }) => {
    return (
        <div
            className={`rounded-md p-4 border border-light dark:border-dark bg-white/50 dark:bg-accent-dark flex flex-col-reverse md:flex-row gap-4`}
        >
            <div className="flex-1">
                <h4 className="leading-tight">{title}</h4>
                {children}
            </div>
            <div className="shrink-0 basis-[167px] text-center">
                <StaticImage src="../images/products/competitors-sr.png" className="max-w-[167px]" />
            </div>
        </div>
    )
}
const VsPostHog = ({ children }) => {
    return (
        <div
            className={`rounded-md p-4 border-2 border-blue dark:border-blue bg-white/50 dark:bg-accent-dark flex flex-col md:flex-row gap-4`}
        >
            <div className="shrink-0 basis-[145px] text-center">
                <StaticImage src="../images/products/competitors-hog.png" className="max-w-[145px]" />
            </div>
            <div className="flex-1">
                <h4 className="leading-tight">Reasons to choose (PostHog logo)</h4>
                {children}
            </div>
        </div>
    )
}

const Accordion = ({ children, label, active, initialOpen = false, className = '' }) => {
    const [open, setOpen] = useState(initialOpen)
    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                type="button"
                className={`py-3 w-full border-t first:border-0 border-border dark:border-dark ${className}`}
            >
                <div className={`${active ? '' : ''} flex justify-between items-center text-left`}>
                    <p className="m-0 font-bold text-sm text-red dark:text-yellow">{label}</p>
                    {open ? <IconMinus className="w-4" /> : <IconPlus className="w-4" />}
                </div>
            </button>
            <div className={` ${open ? 'pb-2' : 'hidden'}`}>{children}</div>
        </>
    )
}

const QuoteBlock = {}

export const ProductSurveys = () => {
    const { websiteTheme } = useValues(layoutLogic)
    const darkMode = websiteTheme === 'dark'
    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-5 py-20">
                <div className="flex gap-1 justify-center items-center mb-2">
                    <span className="w-5 h-5 text-yellow">
                        <IconChat />
                    </span>
                    <span className="text-[15px] font-semibold text-opacity-60">Surveys</span>
                </div>
                <h1 className="text-6xl text-center">
                    Ask anything with <span className="text-red dark:text-yellow">no-code surveys</span>
                </h1>
                <p className="text-lg font-semibold text-center text-opacity-75">
                    Freeform text responses, multiple choice, NPS, ratings, emoji reactions, and more
                </p>

                <StaticImage
                    src="../images/products/screenshot-session-replay.png"
                    alt=""
                    className="w-full max-w-[1330px] -mr-[60px]"
                />
            </div>
        </Layout>
    )
}

export default ProductSurveys

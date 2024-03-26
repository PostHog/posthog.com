import React, { useEffect, useState } from 'react'
import { CallToAction, TrackedCTA } from '../CallToAction'
import { heading, section } from './classes'
import Icon from './Icon'
import Slider from './Slider'
import Accordion from './Accordion'
import './hero.scss'
import { useLayoutData } from 'components/Layout/hooks'
import usePostHog from 'hooks/usePostHog'
import { SignupCTA } from 'components/SignupCTA'
import Modal from 'components/Modal'
import { IconX } from '@posthog/icons'
import { motion } from 'framer-motion'
import { StaticImage } from 'gatsby-plugin-image'

export const FeatureStrip = ({ className = '' }) => {
    return (
        <div className="text-center mt-0 mb-4">
            <ul
                className={`list-none m-0 p-0 pb-2 inline-grid mx-auto grid-cols-3 md:grid-cols-5 justify-start gap-y-0 md:gap-y-4 md:gap-x-1 ${className}`}
            >
                <Feature icon="analytics" title="Product analytics" url="/product/#product-analytics" />
                <Feature icon="session-recording" title="Session recording" url="/product/session-recording" />
                <Feature icon="feature-flags" title="Feature flags" url="/product/feature-flags" />
                <Feature icon="heatmaps" title="Heatmaps" url="/product/heatmaps" />
                <Feature icon="experiments" title="Experiments" url="/product/experimentation-suite" />
            </ul>
            <p className="mt-4 text-sm">
                Plus 50-ish apps available in the <a href="/apps">PostHog App Store</a>
            </p>
        </div>
    )
}

const EnterpriseSignupCTA = () => {
    const posthog = usePostHog()

    const handleClick = () => {
        if (window.confirm('Are you sure you don’t want to book a demo?')) {
            window.location.href = `https://${
                posthog?.isFeatureEnabled('direct-to-eu-cloud') ? 'eu' : 'app'
            }.posthog.com/signup`
        }
    }

    return (
        <CallToAction
            type="secondary"
            onClick={handleClick}
            className="mt-4 !border-0 !bg-transparent p-0 [&_span]:font-normal [&_span]:bg-transparent [&_span]:border-0 [&_span]:p-0 [&_span]:text-primary [&_span]:dark:text-primary-dark"
        >
            <span className="opacity-75">or</span> <strong className="text-blue">Get started - free</strong>{' '}
            <span className="opacity-75">(not recommended)</span>
        </CallToAction>
    )
}

const Feature = ({ title, icon, url }) => {
    return (
        <li className="w-24">
            <a
                href={url}
                className="flex flex-col py-4 px-6 h-full space-y-1 font-semibold items-center justify-start text-black hover:text-black rounded hover:bg-gray-accent-light"
            >
                <Icon className="w-5 h-5 mr-1 md:mr-0" name={icon} />
                <div className="text-[14px] lg:text-[15px] mt-2 leading-tight">{title}</div>
            </a>
        </li>
    )
}

const whitepaperFields = [
    { label: 'First name', name: 'firstName' },
    { label: 'Middle name', name: 'middleName' },
    { label: 'Last name', name: 'lastName' },
    { label: 'Work email', name: 'workEmail' },
    { label: 'Personal email', name: 'personalEmail' },
    { label: 'Company', name: 'company' },
    { label: "Boss' name", name: 'bossName' },
    { label: "Boss' boss' name", name: 'bossBossName' },
    { label: 'Gartner quadrant', name: 'gartnerQuadrant' },
    {
        label: 'How long of a PostHog demo are you interested in?',
        name: 'demoLength',
        type: 'radio',
        options: ['90 minutes', '6 hours', '12 hours', 'Just keep it running'],
    },
    { label: 'Length of procurement process (years)', name: 'procurementLength', type: 'number' },
    { label: 'Monthly expense account limit (in dollars)', name: 'expenseLimit', type: 'number' },
    { label: 'What version of Webex are you running?', name: 'webexVersion' },
    { label: 'Current compensation', name: 'compensation', type: 'number' },
    { label: 'Do you moisturize?', name: 'moisturize', type: 'radio', options: ['Yes', 'No'] },
    { label: 'Klout score', name: 'kloutScore' },
    { label: 'Street you grew up on', name: 'street' },
    { label: 'Is Office Space a parody or documentary?', name: 'officeSpace' },
    { label: "Mother's maiden name", name: 'motherMaidenName' },
    {
        label: 'Last bowel movement (date and size)',
        name: 'bowelMovement',
    },
    { label: 'Last 4 digits of your debit card', name: 'debitCardLast4', type: 'number' },
    { label: 'First 12 digits of your debit card', name: 'debitCardFirst12', type: 'number' },
    { label: 'Are you a Swiftie?', name: 'swiftie', type: 'radio', options: ['Yes', 'No'] },
    { label: 'Does pineapple belong on pizza?', name: 'pineapplePizza', type: 'radio', options: ['Yes', 'No'] },
    { label: 'Favorite password', name: 'favoritePassword', placeholder: 'hunter2' },
    {
        label: 'Have you ever been convicted of murder?',
        name: 'convictedOfMurder',
        type: 'radio',
        options: ['Yes', 'No', 'Not yet'],
    },
    {
        label: 'I’d like to learn more about saving 15% or more on car insurance',
        name: 'carInsurance',
        type: 'radio',
        options: ['Yes'],
    },
    { label: 'Would you like to join our next webinar?', name: 'nextWebinar', type: 'radio', options: ['Yes', 'No'] },
]

const WhitepaperBanner = ({ onClose }) => {
    const [blackPaper, setBlackPaper] = useState(false)

    return (
        <motion.div
            initial={{ translateX: '100%', opacity: 1 }}
            animate={{ translateX: '0%', opacity: 1, transition: { duration: 10 } }}
            className="bg-white dark:bg-border-dark rounded-md border border-border dark:border-dark fixed bottom-16 md:bottom-4 right-4 z-[50] flex flex-col md:flex-row"
        >
            <button onClick={onClose} className="flex items-center justify-center absolute top-4 right-4">
                <IconX className="w-6 h-6" />
            </button>
            <div
                className={`${
                    blackPaper ? 'bg-black dark' : 'bg-white'
                } basis-[200px] md:basis-auto text-center w-auto md:w-[340px] p-4 flex items-center flex-col m-2 border border-light dark:border-dark`}
            >
                <div className="dark:hidden max-h-[300px] max-w-[200px] md:max-w-full md:max-h-auto">
                    <StaticImage src="../../../public/images/enterprise/whitepaper-poster.jpg" />
                </div>
                <div className="hidden dark:block max-h-[300px] max-w-[200px] md:max-w-full md:max-h-auto">
                    <StaticImage src="../../../public/images/enterprise/blackpaper-poster.jpg" />
                </div>
            </div>
            <div className="w-[380px] my-4 px-2">
                <div className="mb-4">
                    <h3 className="m-0">Get a free whitepaper</h3>
                    <p className="opacity-70 font-semibold m-0">Just fill out the fields below</p>
                </div>
                <div>
                    <div className="max-h-[250px] overflow-auto text-sm">
                        {whitepaperFields.map(({ label, name, type = 'text', options = [], placeholder }) => {
                            return (
                                <div key={name} className="mb-4">
                                    <label className="m-0 mb-2 inline-block" htmlFor={name}>
                                        {label}
                                    </label>
                                    {type === 'radio' ? (
                                        <div className="grid gap-4 grid-cols-2">
                                            {options.map((option) => (
                                                <label key={option} className="flex items-center space-x-1">
                                                    <input type="radio" name={name} value={option} className="mr-2" />
                                                    {option}
                                                </label>
                                            ))}
                                        </div>
                                    ) : type === 'date' ? (
                                        <input type="date" className="w-full" id={name} />
                                    ) : (
                                        <input type={type} id={name} placeholder={placeholder} className="w-full" />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <div className="my-4">
                        <input
                            type="checkbox"
                            id="blackPaperCheckbox"
                            checked={blackPaper}
                            onChange={() => setBlackPaper(!blackPaper)}
                            className="mr-2"
                        />
                        <label htmlFor="blackPaperCheckbox">Opt for blackpaper</label>
                        <p className="text-xs m-0">(Same as white paper but with a black background)</p>
                    </div>
                    <a
                        href={
                            blackPaper
                                ? '/brand/Copy of blackpaper (2) - final FINAL.docx.pdf'
                                : '/brand/Copy of whitepaper (2) - final FINAL.docx.pdf'
                        }
                        download
                        className="w-full inline-block text-center appearance-none bg-initial bg-gray-accent dark:bg-gray-accent-dark border border-light dark:border-dark py-2"
                    >
                        Get your free {blackPaper ? 'blackpaper' : 'whitepaper'} now!
                    </a>
                </div>
            </div>
        </motion.div>
    )
}

export default function Hero() {
    const [whitepaperOpen, setWhitepaperOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(9)
    const [showNPS, setShowNPS] = useState(false)
    const { enterpriseMode } = useLayoutData()
    const heroTitle = enterpriseMode
        ? 'The modern digital optimization platform'
        : 'How engineers build better products'

    useEffect(() => {
        setShowNPS(enterpriseMode)
    }, [enterpriseMode])

    const handleCloseNPS = () => {
        setShowNPS(false)
        setWhitepaperOpen(true)
    }

    return (
        <>
            <Modal open={showNPS} setOpen={handleCloseNPS}>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-[300px] dark:bg-border-dark p-4 rounded-md border border-border dark:border-dark">
                    <div className="float-right ml-4">
                        <button onClick={() => setShowNPS(false)}>
                            <IconX className="w-4 h-4" />
                        </button>
                    </div>
                    <h4 className="font-bold leading-tight">We're listening: Tell us about your experience</h4>
                    <p>
                        We're always trying to improve our web site for you. Please rate your experience before
                        continuing.
                    </p>
                    <div className="grid grid-cols-10 rounded-sm border bg-white dark:bg-black text-black dark:text-white border-border dark:border-dark divide-x divide-border dark:divide-border-dark overflow-hidden">
                        {Array.from({ length: 10 }, (_, index) => (
                            <button
                                onClick={() => setSelectedIndex(index)}
                                className={
                                    selectedIndex === index ? 'bg-black dark:bg-orange text-white dark:text-black' : ''
                                }
                                key={index + 1}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                    <div className="flex justify-between gap-4 text-xs mt-1 mb-3">
                        <span>Good</span>
                        <span>Great</span>
                    </div>
                    <button
                        onClick={handleCloseNPS}
                        className="w-full appearance-none bg-initial bg-gray-accent dark:bg-gray-accent-dark border border-light dark:border-dark py-2"
                    >
                        Submit
                    </button>
                </div>
            </Modal>
            {whitepaperOpen && enterpriseMode && <WhitepaperBanner onClose={() => setWhitepaperOpen(false)} />}
            <section className="flex flex-col justify-center items-center">
                <div className="relative w-full z-10">
                    <div className={section('z-10 relative md:!mb-8')}>
                        <h1 className={`${heading()} overflow-hidden pb-1 home-hero-title`}>
                            {heroTitle.split(' ').map((word, index) => (
                                <span
                                    key={word}
                                    className={`${
                                        index > 1 ? 'text-red dark:text-yellow' : ''
                                    } ml-4 first:ml-0 inline-block`}
                                >
                                    {word}
                                </span>
                            ))}
                        </h1>
                        <h2 className={`${heading('subtitle', 'primary', 'mt-0 mb-6')} home-hero-subtitle`}>
                            {enterpriseMode
                                ? 'Product solutions reimagined for the 21 century'
                                : 'The single platform to analyze, test, observe, and deploy new features'}
                        </h2>
                        <div className="flex justify-center items-center gap-2 home-hero-cta">
                            {enterpriseMode ? (
                                <CallToAction size="lg" to="/book-a-demo">
                                    Contact sales
                                </CallToAction>
                            ) : (
                                <SignupCTA />
                            )}
                            <TrackedCTA
                                key={enterpriseMode ? 'talk-to-sales' : 'get-a-demo'}
                                event={{ name: `clicked Get a demo` }}
                                href="/book-a-demo"
                                type="secondary"
                                size="lg"
                            >
                                {enterpriseMode ? 'Contact enterprise sales' : 'Get a demo'}
                            </TrackedCTA>
                        </div>
                        {enterpriseMode && (
                            <div className="flex justify-center mt-2 enterprise-mode-home-hero-cta">
                                <EnterpriseSignupCTA />
                            </div>
                        )}
                    </div>
                    <Slider />
                    <Accordion />
                </div>
            </section>
        </>
    )
}

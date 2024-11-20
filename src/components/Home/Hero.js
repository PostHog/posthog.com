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

const Arrow = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 52 20" width="52"><path fill="red" fillRule="evenodd" d="M47.087 18.492c-.289.173-.693.173-1.04.232-.116 0-.232 0-.347.057-.173.057-.348.057-.577.057-.173 0-.348.057-.52 0h-.52c-.232 0-.404-.116-.636-.116-.057 0-.116-.057-.173-.057-.231-.116-.52-.116-.751-.057-.232.057-.405.116-.636.057a.453.453 0 0 0-.463.116c-.116.116-.232.116-.348 0-.056 0-.115-.057-.172-.057-.116 0-.173.116-.232.116-.116 0-.172-.057-.288-.057-.232.057-.404 0-.636 0-.116 0-.232 0-.347.057-.405.172-.405.172-.636.116a.375.375 0 0 0-.348 0c-.115 0-.172.056-.288.056-.463-.056-.983 0-1.444 0-.173 0-.404 0-.577.116-.232.116-.52.173-.752.116-.115 0-.288 0-.404-.057a2.847 2.847 0 0 0-.983 0c-.404.057-.867 0-1.272 0-.288 0-.52-.057-.808 0-.232.057-.463 0-.752-.057a.813.813 0 0 0-.52 0c-.056 0-.172.057-.231.057h-.636c-.404 0-.751-.057-1.156-.057-.172 0-.404-.057-.636-.057-.52-.056-1.04-.115-1.56-.172-.172 0-.347-.057-.576-.116-.116 0-.232 0-.348-.057h-.172c-.348-.231-.809-.116-1.213-.288h-.173c-.288.115-.576 0-.808-.057a6.16 6.16 0 0 0-.983-.232c-.116 0-.232-.057-.404-.116-.116 0-.173-.056-.289-.056-.172 0-.288 0-.404-.116h-.057c-.636-.173-1.271-.52-1.907-.636-.057 0-.116-.057-.232-.057a2.516 2.516 0 0 0-1.097-.404 3.309 3.309 0 0 1-.808-.288c-.752-.348-1.503-.809-2.196-1.213-.232-.116-.463-.173-.636-.289a1.253 1.253 0 0 1-.463-.288 8.398 8.398 0 0 0-1.156-.809c-.231-.172-.52-.288-.751-.463-.289-.115-.52-.231-.752-.463-.057-.057-.116-.057-.173-.057a.28.28 0 0 0-.347.116c-.057.232-.172.404-.172.636-.057.463-.173.867-.289 1.328-.057.173-.116.348-.116.52 0 .348-.115.693-.288 1.04-.116.173-.173.636-.116.809 0 .057.057.172.057.231 0 .116 0 .232-.057.348a.805.805 0 0 0-.116.636c0 .172-.057.404 0 .635-.057.173-.116.289-.172.463 0 .057-.057.057-.116 0 0 0-.057 0-.057-.056-.116-.173-.173-.348-.116-.577.057-.289-.057-.463-.288-.636l-.057-.057c0-.173 0-.347-.116-.52 0-.057-.057-.057-.116 0-.057.057-.115.116-.115.173a22.967 22.967 0 0 0-.52-1.156 10.814 10.814 0 0 1-.693-1.733c-.116-.347-.232-.751-.347-1.097-.289-.983-.577-1.907-.984-2.772-.172-.405-.347-.868-.576-1.272a5.832 5.832 0 0 1-.405-.867 3.659 3.659 0 0 0-.463-.809c-.231-.52-.636-1.04-.867-1.56a2.427 2.427 0 0 0-.52-.808c.118-.244-.057-.36-.173-.475-.114-.116-.23-.289-.23-.464 0-.172-.115-.404-.23-.576-.117-.116-.117-.289-.232-.405a1.237 1.237 0 0 0-.289-.463c-.116-.172-.231-.345-.347-.52a1.777 1.777 0 0 0-.461-.46A2.48 2.48 0 0 1 .17 1.91c-.173-.174-.23-.404-.116-.579.116-.288.289-.52.577-.635.29-.114.579-.23.926-.289H2.253c.232 0 .404.057.636.057.172.002.345.002.577-.057.23 0 .46.06.692.116.232.057.463.116.693.232.232.115.404.172.636.231l.867.347c.173.116.404.116.577.232.173.116.404.173.577.232.231.056.463.056.636.115.404.116.751.116 1.155.116.116 0 .289 0 .405.057.577.057 1.097.116 1.675.173.289.057.577.057.868.057.808.056 1.617.056 2.427 0 .463-.057.868-.057 1.329-.116.172 0 .347 0 .52.057a.557.557 0 0 0 .52.057c.116 0 .231-.057.404-.057h.288c.463.115.983.172 1.445.288.115 0 .172.057.288.057.347.06.754.118 1.158.118.057 0 .116.057.116.057.056.057 0 .115-.057.172-.173.116-.348.289-.577.348-.522.29-1.042.52-1.621.751-.232.057-.404.116-.636.173-.52.175-1.097.29-1.617.347-.636.06-1.212.175-1.791.289-.116 0-.173.057-.289.057-.52.056-.983.056-1.503.115-.404-.057-.867.116-1.271.057-.348 0-.636.057-.925.057-.056 0-.115.057-.172.057-.057 0-.116.116-.057.173.057.178.116.235.172.351l.693.693c.173.115.289.288.463.404.348.288.636.692 1.04.924.289.347.693.693 1.04 1.04.348.288.693.577 1.04.867.463.348.983.693 1.444 1.04.577.348 1.097.752 1.733 1.04.463.232.867.463 1.272.693.52.288 1.04.577 1.56.808.231.116.463.232.751.289.232.116.463.173.752.288.116.057.231.116.347.116.636.173 1.272.404 1.848.636.116.057.232.116.348.116.404.115.808.172 1.271.288.057 0 .116 0 .173.057.752.232 1.56.347 2.369.52.115 0 .172 0 .288.057.173.057.347.057.577.116.404.116.751.172 1.156.172.347.057.692.116 1.04.057h1.04c.404 0 .867 0 1.271.057.173 0 .347.057.52 0 .289-.057.577-.057.868 0 .231 0 .463.057.692.057.173 0 .348.057.463.173.116.116.232.116.404.172.116 0 .173.057.289.057h.232c.288-.116.635-.116.924-.116a7 7 0 0 1 1.156.116c.115 0 .172.057.231.173.057.057.116.116.173.116h.692c.577 0 1.097-.057 1.676 0 .232.056.404-.057.577-.173l.173-.173c.115-.116.288-.116.404-.116.057 0 .116.057.173.057.231.057.463.057.692.057.116 0 .173 0 .289-.057.404-.115.867-.115 1.271-.115.116 0 .173 0 .289.056.231.173.52.289.867.232.173 0 .347.057.577.057h1.328l.057.057c0 .057 0 .057-.057.116-.115.056-.231.056-.347.115-.057 0-.116.057-.173.057 0 0-.056.057-.056.116 0 .057 0 .057.056.116.057 0 .116.057.173.057h.347c.116.116.173.288.232.404l-.057.057c-.286.014-.402.073-.518.073-.463.057-.867.173-1.328.288-.057 0-.116.057-.173.057-.404 0-.808.116-1.213.173h-.056c-.289.057-.577.116-.868.116a.825.825 0 0 0-.404.116v.115s0 .057.057.057h.057c.231 0 .52.057.808.057.057 0 .173 0 .173-.057a.655.655 0 0 1 .463-.172c.116 0 .172.056.288.056a.375.375 0 0 0 .348 0c.059-.113.231-.056.404-.056Zm-6.76-1.5c.116 0 .232-.058.347-.058v-.113c-.172-.116-.404-.116-.636-.057 0 0-.056.057-.056.116 0 .057.056.116.115.116.057-.005.114-.005.23-.005Zm-32.181-.52h-.057v.056c.057.173.116.405.172.577 0 .057.057.057.116.116h.057l.057-.057v-.057c-.057-.116-.116-.172-.173-.288-.056-.116-.115-.232-.172-.348Zm39.288.808c.116 0 .232-.057.289-.057 0 0 .057-.057.057-.116 0-.057 0-.057-.057-.057a.5.5 0 0 0-.404 0c-.057 0-.057.057-.116.116v.116c.115-.059.172-.059.231-.002Zm.289.116c-.057 0-.057.056-.116.056h.057c.002 0 .059 0 .059-.056Zm.463-.06c-.057.058-.057.058 0 .058 0 .059.057.002 0-.057.057.059.057 0 0 0Zm-8.668-.403h-.056v.056c0-.056 0-.056.056-.056Zm3.525-.346c-.057 0-.057 0 0 0 0 .057-.057.057 0 0ZM51.883 16.933c-.056.115-.172.172-.231.172-.232 0-.404-.057-.636-.057h-.057s-.057-.056-.057-.115c0 0 0-.057.057-.057.116-.057.289-.116.404-.057.173.057.348.057.52.114Z" clip-rule="evenodd"/><path fill="red" fillRule="evenodd" d="M41.655 16.412h-.116c.059-.057.116-.057.116 0ZM47.492 18.436c-.057-.06-.057-.06 0 0 .059 0 .059-.06 0 0ZM51.999 17.336h-.116.057c.002 0 .002.06.059 0Z" clip-rule="evenodd"/></svg> 
)

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
                    <img
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/f_auto,q_auto/v1/posthog.com/contents/images/enterprise/ftbq1l9oz8t9kwiqwgww.jpg"
                        alt="Whitepaper"
                    />
                </div>
                <div className="hidden dark:block max-h-[300px] max-w-[200px] md:max-w-full md:max-h-auto">
                    <img
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/f_auto,q_auto/v1/posthog.com/contents/images/enterprise/xp093mcq8nswx29n8x3l.jpg"
                        alt="Blackpaper"
                    />
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
        : 'How developers build successful products'

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
                        <button onClick={handleCloseNPS}>
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
                                <CallToAction size="lg" to="/demo">
                                    Contact Sales
                                </CallToAction>
                            ) : (
                                <SignupCTA />
                            )}
                            <TrackedCTA
                                key={enterpriseMode ? 'talk-to-sales' : 'talk-to-a-human'}
                                event={{ name: `clicked Talk to a human` }}
                                href="/talk-to-a-human"
                                type="secondary"
                                size="lg"
                            >
                                {enterpriseMode ? 'Contact enterprise sales' : 'Talk to a human'}
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
            <div className="fixed bottom-8 right-8 z-50">
                <div className="bg-white dark:bg-border-dark rounded-md border border-border dark:border-dark p-2 shadow-xl grid grid-cols-5">
                    <div className="col-span-2">screenshot</div>
                    <div className="col-span-3 max-w-[200px] pl-4">
                        <div className="relative">
                            <span className="animate-[blink_1.5s_ease-in-out_infinite] size-3 bg-[#f00] rounded-full inline-block absolute -left-4 top-1.5"></span>
                            <strong className="text-[15px]">Session replay live demo</strong>
                        </div>
                        <p className="text-sm mb-0 leading-snug">See what you just did on posthog.com</p>
                        <div className="relative font-squeak text-[#f00] uppercase">
                            <Arrow className="absolute left-[-60px] bottom-2" />
                            You, seconds ago
                        </div>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

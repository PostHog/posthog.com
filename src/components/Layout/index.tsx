import React, { useEffect, useState } from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import CookieBanner from 'components/CookieBanner'
import usePostHog from '../../hooks/usePostHog'
import { SearchProvider } from 'components/Search/SearchContext'
import './Fonts.scss'
import './Layout.scss'
import './SkeletonLoading.css'
import './DarkMode.scss'
import { IProps, LayoutProvider } from './context'
import { Mobile as MobileNav } from 'components/MainNav'
import { useLayoutData } from './hooks'
import SearchBox from 'components/Search/SearchBox'
import { motion } from 'framer-motion'
import { IconX } from '@posthog/icons'
import { StaticImage } from 'gatsby-plugin-image'

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

const Article = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
    const { compact, enterpriseMode } = useLayoutData()
    const [whitepaperOpen, setWhitepaperOpen] = useState(false)

    useEffect(() => {
        if (enterpriseMode) {
            setWhitepaperOpen(true)
        }
    }, [enterpriseMode])

    return (
        <div className={className}>
            {compact ? (
                <div className="px-4 py-3 border-b border-border dark:border-dark sticky top-0 z-[50] bg-light dark:bg-dark">
                    <SearchBox className="!w-full !py-2" location="mobile-header" />
                </div>
            ) : (
                <Header />
            )}
            <main>{children}</main>
            {!compact && (
                <>
                    <Footer />
                    <CookieBanner />
                    <MobileNav />
                </>
            )}
            {whitepaperOpen && enterpriseMode && <WhitepaperBanner onClose={() => setWhitepaperOpen(false)} />}
        </div>
    )
}

const Layout = ({
    children,
    parent,
    activeInternalMenu,
    className = '',
}: IProps & { className?: string }): JSX.Element => {
    const posthog = usePostHog()

    useEffect(() => {
        if (window && posthog?.setPersonProperties) {
            posthog.setPersonProperties({ preferred_theme: (window as any).__theme })
        }

        posthog?.register_once({
            utm_source: null,
            utm_medium: null,
            utm_campaign: null,
            utm_content: null,
            utm_term: null,
        })
    }, [])

    return (
        <SearchProvider>
            <LayoutProvider parent={parent} activeInternalMenu={activeInternalMenu}>
                <Article className={className}>{children}</Article>
            </LayoutProvider>
        </SearchProvider>
    )
}

export default Layout
export { Layout }

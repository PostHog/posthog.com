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
import { CallToAction } from 'components/CallToAction'
import { motion } from 'framer-motion'
import { FixedSizeList as List } from 'react-window'
import Toggle from 'components/Toggle'
import Logo from 'components/Logo'
import { IconX } from '@posthog/icons'
import { StaticImage } from 'gatsby-plugin-image'

const fields = [
    { type: 'text', name: 'firstName', placeholder: 'First name' },
    { type: 'text', name: 'lastName', placeholder: 'Last name' },
    { type: 'email', name: 'email', placeholder: 'Email' },
    { type: 'text', name: 'companyName', placeholder: 'Company name' },
    { type: 'number', name: 'noe', placeholder: 'Number of employees' },
    { type: 'text', name: 'wdyhau', placeholder: 'Where did you hear about us?' },
    { type: 'text', name: 'lopp', placeholder: 'Length of procurement process (years)' },
    { type: 'number', name: 'cloutScore', placeholder: 'Clout score' },
    { type: 'text', name: 'osVersion', placeholder: 'OS version' },
]

const repeatedFields = Array(100)
    .fill(fields)
    .flat()
    .map((field, index) => ({
        ...field,
        name: `${field.name}_${index}`,
    }))
    .sort(() => Math.random() - 0.5)

const Input = (props) => {
    return <input {...props} className="w-full p-2 border border-border dark:border-dark rounded-md" />
}

const Row = ({ index, style }) => {
    const field = repeatedFields[index]
    return (
        <div style={style}>
            <Input {...field} />
        </div>
    )
}

const WhitepaperBanner = ({ onClose }) => {
    const [blackPaper, setBlackPaper] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <motion.div
            initial={{ translateX: '100%', opacity: 1 }}
            animate={{ translateX: '0%', opacity: 1, transition: { duration: 10 } }}
            className="bg-white dark:bg-border-dark rounded-md border border-border dark:border-dark fixed bottom-4 right-4 z-[50] flex"
        >
            <button onClick={onClose} className="flex items-center justify-center absolute top-1 right-1">
                <IconX className="w-6 h-6" />
            </button>
            <div
                className={`${
                    blackPaper ? 'bg-black dark' : 'bg-white'
                } w-[300px] p-4 flex justify-center flex-col m-2 border border-border dark:border-dark`}
            >
                <StaticImage src="../../../public/images/enterprise/whitepaper-poster-light.jpg" />
            </div>
            <div className="w-[380px] flex flex-col items-center my-4">
                <div className="self-start mx-[15px] mb-4">
                    <h3 className="m-0">Get a free whitepaper</h3>
                    <p className="opacity-70 font-semibold m-0">Just fill out the fields below</p>
                </div>
                <form onSubmit={handleSubmit} className="m-0">
                    <List height={200} itemCount={repeatedFields.length} itemSize={47} width={350}>
                        {Row}
                    </List>
                    <div className="my-4">
                        <Toggle
                            checked={blackPaper}
                            label="Blackpaper"
                            onChange={(checked) => setBlackPaper(checked)}
                        />
                        <p className="text-sm m-0">(same as white paper but black background)</p>
                    </div>
                    <CallToAction width="full">
                        Get your free {blackPaper ? 'blackpaper' : 'whitepaper'} now!
                    </CallToAction>
                </form>
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

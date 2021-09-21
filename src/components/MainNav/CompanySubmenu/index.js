import React from 'react'
import Link from 'components/Link'
import { submenu } from '../classes'
import Team from '../components/Team'
import Founders from '../components/Founders'
import cntl from 'cntl'
import { motion } from 'framer-motion'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import { YouTube, LinkedIn, Twitter, Slack } from './Icons'
import { Chat, Lifeguard, RightArrow } from 'components/Icons/Icons'

const footerLink = cntl`
    text-primary
    dark:text-white
    hover:text-primary
    font-bold
    flex
    space-x-2
    items-center
`

const components = {
    Team,
    Founders,
}

const Social = ({ className = '' }) => (
    <div className={`flex space-x-4 ${className}`}>
        <Link className="group" to="/slack">
            <Slack />
        </Link>
        <Link className="group" to="https://twitter.com/posthog">
            <Twitter />
        </Link>
        <Link className="group" to="https://www.linkedin.com/company/posthog/mycompany/">
            <LinkedIn />
        </Link>
        <Link className="group" to="https://www.youtube.com/channel/UCn4mJ4kK5KVSvozJre645LA">
            <YouTube />
        </Link>
    </div>
)

export default function Company({ menu, parentURL }) {
    const { title, items } = menu
    const breakpoints = useBreakpoint()

    return (
        <>
            <div className={submenu.container('max-w-screen-2xl lg:pb-[60px]')}>
                <div className="hidden lg:flex justify-between items-center mb-6 lg:mb-12">
                    <Link className="text-primary hover:text-primary" to={parentURL}>
                        <h1 className="text-4xl m-0 font-bold">{title}</h1>
                    </Link>
                    {!breakpoints.md && <Social />}
                </div>

                <ul className="company-submenu-item-container">
                    {items.map((item, index) => {
                        const { title, description, link, component } = item
                        const position = component?.position
                        const name = component?.name
                        return (
                            <li className="flex space-x-4" key={index}>
                                <div className="overflow-hidden flex flex-col">
                                    <div>
                                        <h2 className={submenu.section.title()}>{title}</h2>
                                        <div
                                            className={submenu.section.description()}
                                            dangerouslySetInnerHTML={{ __html: description }}
                                        />
                                        {position === 'bottom' && components[name]()}
                                    </div>
                                    <Link
                                        className={submenu.section.link('flex space-x-1 items-center mt-auto')}
                                        to={link.url}
                                    >
                                        <span>{link.title}</span>
                                        <span className="text-gray-accent-light">
                                            <RightArrow className="w-5 h-5" />
                                        </span>
                                    </Link>
                                </div>
                                {position === 'right' && components[name]()}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid lg:grid-cols-2 gap-5 p-4 lg:px-9 bg-tan dark:bg-primary font-bold dark:text-white lg:absolute bottom-0 w-full"
            >
                <div className="flex lg:space-x-6 space-y-5 lg:space-y-0 w-full lg:w-auto flex-col lg:flex-row">
                    <Link className={footerLink} to="https://share.hsforms.com/1-IVCY9gNRvaZBajMt_UPIg4559u">
                        <Chat />
                        <span>Contact sales</span>
                    </Link>
                    <Link className={footerLink} to="/support">
                        <Lifeguard />
                        <span>Support</span>
                    </Link>
                </div>
                <div className="text-left lg:text-right">
                    <p className="m-0">
                        Get yourself some PostHog swag in our{' '}
                        <Link
                            iconPosition="right"
                            external
                            className={submenu.section.link()}
                            iconClasses="text-primary dark:text-white"
                            to="https://merch.posthog.com/collections/all"
                        >
                            Merch Store
                        </Link>
                    </p>
                </div>
                {breakpoints.md && (
                    <Social className="justify-self-center justify-between lg:justify-start w-full lg:w-auto pt-5 border-t border-dashed border-gray-accent-light dark:border-opacity-30" />
                )}
            </motion.div>
        </>
    )
}

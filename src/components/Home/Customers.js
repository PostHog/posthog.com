import React from 'react'
import { useInView } from 'react-intersection-observer'
import Logomark from './images/Logomark'

import airbus from './images/customers/airbus.svg'
import assemblyai from './images/customers/assemblyai.svg'
import dhl from './images/customers/dhl.svg'
import hasura from './images/customers/hasura.svg'
import joybird from './images/customers/joybird.svg'
import mux from './images/customers/mux.svg'
import outbrain from './images/customers/outbrain.svg'
import phantom from './images/customers/phantom.svg'
import posthog from './images/customers/posthog.svg'
import staples from './images/customers/staples.svg'
import trustwallet from './images/customers/trustwallet.svg'
import yCombinator from './images/customers/y-combinator.svg'

import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import Link from 'components/Link'
import { useLayoutData } from 'components/Layout/hooks'

const Logo = ({ src, alt, className = '' }) => (
    <img className={`icon px-4 md:px-6 lg:px-4 w-full ${className}`} src={src} alt={alt} />
)

const Customer = ({ image, alt, className = '', url }) => {
    const { websiteTheme } = useValues(layoutLogic)
    return (
        <li
            className="flex items-center justify-center 
            w-full 
            h-24
            py-6 
            lg:px-2
            lg:h-40
            bg-accent-dark
            rounded
            text-primary
            dark:text-primary-dark
        "
        >
            {url ? (
                <Link to={url}>
                    <Logo className={className} src={image} alt={alt} />
                </Link>
            ) : (
                <Logo className={className} src={image} alt={alt} />
            )}
        </li>
    )
}

export default function Customers() {
    const { enterpriseMode } = useLayoutData()
    return (
        <section className="md:-mt-[1px] bg-dark md:pb-0 relative after:absolute after:h-48 after:bottom-0 after:left-0 after:w-full after:bg-gradient-to-b after:from-dark after:to-[#13161B] after:content-[''] -mb-px">
            <div className="py-8 md:pt-12 xl:pt-16 px-4 relative z-20">
                <h2 className="m-0 text-center text-4xl lg:text-5xl 2xl:text-6xl text-primary-dark max-w-screen-2xl mx-auto">
                    {enterpriseMode ? (
                        <>
                            These customers <span className="text-yellow">increase shareholder value</span> with PostHog
                        </>
                    ) : (
                        <>
                            These folks <span className="text-yellow">build products users want</span> with
                        </>
                    )}
                    <Logomark className="inline-flex ml-4 -mt-2 h-8 lg:h-10 xl:h-12 2xl:h-14 fill-current" />
                </h2>
            </div>
            <div className="md:mt-4 pb-8 md:pb-0 max-w-screen-2xl mx-auto px-4 2xl:px-0 flex items-center sm:items-end flex-col sm:flex-row">
                <ul className="list-none m-0 p-0 pb-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 flex-grow w-full text-primary-dark gap-4 z-10 relative">
                    <Customer
                        url="/customers/ycombinator"
                        className="max-h-[48px]"
                        image={yCombinator}
                        alt="Y Combinator"
                    />
                    <Customer className="max-h-[40px]" image={staples} alt="Staples" />
                    <Customer className="max-h-[36px]" image={airbus} alt="Airbus" />
                    <Customer className="max-h-[35px]" image={dhl} alt="DHL" />
                    <Customer className="max-h-[50px]" image={outbrain} alt="Outbrain" />
                    <Customer className="max-h-[40px]" image={mux} alt="Mux.com" />
                    <Customer
                        url="/customers/hasura"
                        className="max-h-[60px] relative -top-1"
                        image={hasura}
                        alt="Hasura"
                    />
                    <Customer url="/customers/phantom" className="max-h-[50px]" image={phantom} alt="Phantom.app" />
                    <Customer className="max-h-[55px]" image={joybird} alt="Joybird" />
                    <Customer
                        url="/customers/assemblyai"
                        className="max-h-[55px]"
                        image={assemblyai}
                        alt="AssemblyAI"
                    />
                    <Customer className="max-h-[50px]" image={trustwallet} alt="Trust Wallet" />
                    <Customer
                        url="/blog/posthog-marketing"
                        className="max-h-[45px]"
                        image={posthog}
                        alt="PostHog - so meta!"
                    />
                </ul>
            </div>
        </section>
    )
}

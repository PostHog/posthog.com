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

import mistral from './images/customers/mistral.svg'
import elevenlabs from './images/customers/elevenlabs.svg'
import raycast from './images/customers/raycast.svg'
import startengine from './images/customers/startengine.svg'
import zendesk from './images/customers/zendesk.svg'
import researchgate from './images/customers/researchgate.svg'

import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
import Link from 'components/Link'
import { useLayoutData } from 'components/Layout/hooks'

const Logo = ({ src, alt, className = '' }) => (
    <img className={`icon px-4 md:px-6 lg:px-4 w-full ${className}`} src={src} alt={alt} />
)

const Customer = ({ image, alt, className = '', url }) => {
    const { websiteTheme } = useValues(layoutLogic)
    return url ? (
        <Link
            to={url}
            className="flex items-center justify-center 
            w-full 
            h-24
            py-6 pb-8 md:pb-6
            lg:px-2
            lg:h-40
            bg-accent-dark
            rounded
            text-primary
            dark:text-primary-dark
            relative
            overflow-hidden
        "
        >
            <Logo className={className} src={image} alt={alt} />
            <div
                className={`hidden md:flex group absolute top-2 hover:right-2 transition-all border border-transparent hover:border-light/40 rounded-full px-2 py-0.5 items-center gap-1 ${
                    image === posthog ? '[right:_-8.5rem]' : 'right-[-6.5rem]'
                }`}
            >
                <span className="inline-flex w-3 h-3 rounded-full bg-red opacity-75"></span>
                <span className="transition-all text-white/0 group-hover:text-white/80 text-[13px] whitespace-nowrap ">
                    {image === posthog ? 'How we use PostHog' : 'Customer story'} &rarr;
                </span>
            </div>
            <div className="md:hidden absolute bottom-0 left-0 w-full border-t border-dark/50 text-white/40 text-center py-1 text-xs">
                {image === posthog ? 'How we use PostHog' : 'Customer story'} &rarr;
            </div>
        </Link>
    ) : (
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
            <Logo className={className} src={image} alt={alt} />
        </li>
    )
}

export default function Customers() {
    const { enterpriseMode } = useLayoutData()
    return (
        <section className="bg-dark md:pb-0 relative after:absolute after:h-48 after:bottom-0 after:left-0 after:w-full after:bg-gradient-to-b after:from-dark after:to-[#13161B] after:content-[''] -mb-px">
            <div className="py-8 md:pt-12 xl:pt-16 px-4 relative z-20">
                <h2 className="m-0 text-center text-4xl lg:text-5xl 2xl:text-6xl text-primary-dark max-w-screen-2xl mx-auto">
                    {enterpriseMode ? (
                        <>
                            These customers <span className="text-yellow">increase shareholder value</span>
                        </>
                    ) : (
                        <>
                            These folks <span className="text-yellow">build products users want</span>
                        </>
                    )}{' '}
                    <span className="whitespace-nowrap">
                        with
                        <Logomark className="inline-flex ml-4 -mt-2 h-8 lg:h-10 xl:h-12 2xl:h-14 fill-current" />
                    </span>
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
                    <Customer className="max-h-[55px]" image={mistral} alt="Mistral AI" />
                    <Customer
                        url="/customers/elevenlabs"
                        className="max-h-[40px]"
                        image={elevenlabs}
                        alt="ElevenLabs"
                    />
                    <Customer className="max-h-[60px]" image={raycast} alt="Raycast" />
                    <Customer className="max-h-[36px]" image={airbus} alt="Airbus" />
                    <Customer className="max-h-[30px]" image={dhl} alt="DHL" />
                    <Customer className="max-h-[60px]" image={startengine} alt="StartEngine" />
                    <Customer
                        url="/customers/assemblyai"
                        className="max-h-[45px]"
                        image={assemblyai}
                        alt="Assembly AI"
                    />
                    <Customer
                        url="/customers/hasura"
                        className="max-h-[45px] relative -top-1"
                        image={hasura}
                        alt="Hasura"
                    />
                    <Customer className="max-h-[50px]" image={trustwallet} alt="Trust Wallet" />
                    <Customer
                        url="/customers/researchgate"
                        className="max-h-[30px]"
                        image={researchgate}
                        alt="ResearchGate"
                    />
                    <Customer
                        url="/blog/posthog-marketing"
                        className="max-h-[40px]"
                        image={posthog}
                        alt="PostHog - so meta!"
                    />
                </ul>
            </div>
        </section>
    )
}

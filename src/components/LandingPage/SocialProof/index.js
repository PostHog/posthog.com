import React from 'react'

import { CornerBrackets } from '../../CornerBrackets'

import airbalticLogo from '../images/SocialProofLogos/airbaltic.svg'
import dataikuLogo from '../images/SocialProofLogos/dataiku.svg'
import landmarkLogo from '../images/SocialProofLogos/landmark.svg'
import tinkoffLogo from '../images/SocialProofLogos/tinkoff.svg'
import hasuraLogo from '../images/SocialProofLogos/hasura.svg'
import spacexLogo from '../images/SocialProofLogos/spacex.svg'
import ycombinatorLogo from '../images/SocialProofLogos/ycombinator.svg'
import staplesLogo from '../images/SocialProofLogos/staples.svg'
import webinyLogo from '../images/SocialProofLogos/webiny.svg'

const Logo = ({ logo, alt }) => <img src={logo} alt={alt} className="px-2" />

export const SocialProof = () => {
    return (
        <div className="mt-24">
            <div className="w-11/12 max-w-3xl mx-auto mb-4 flex justify-center sm:justify-between flex-row flex-wrap">
                <Logo logo={dataikuLogo} alt="Dataiku" />
                <Logo logo={hasuraLogo} alt="Hasura" />
                <Logo logo={ycombinatorLogo} alt="Y Combinator" />
                <Logo logo={staplesLogo} alt="Staples" />
                <Logo logo={spacexLogo} alt="Spacex" />
            </div>
            <div className="w-11/12 max-w-3xl mx-auto flex justify-around flex-row flex-wrap">
                <Logo logo={webinyLogo} alt="Webiny" />
                <Logo logo={landmarkLogo} alt="Landmark Group" />
                <Logo logo={airbalticLogo} alt="Airbaltic" />
                <Logo logo={tinkoffLogo} alt="Tinkoff" />
            </div>

            <div className="w-11/12 max-w-xl mx-auto mt-24 bg-purple-500 bg-opacity-20 rounded p-8 text-center text-white relative">
                <CornerBrackets spacing="lg" />
                <p className="opacity-80">
                    PostHog is what I always wanted a Product Analytics SaaS to be. Private cloud option so GDPR becomes
                    way more manageable, features built based on direct community feedback, focus on simplicity and
                    usefulness over vanity features...Great job people!
                </p>
                <span className="block opacity-50">@benjackwhite</span>
            </div>
        </div>
    )
}

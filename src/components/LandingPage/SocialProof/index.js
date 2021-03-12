import React from 'react'

import airbalticLogo from '../images/SocialProofLogos/airbaltic.svg'
import dataikuLogo from '../images/SocialProofLogos/dataiku.svg'
import landmarkLogo from '../images/SocialProofLogos/landmark.svg'
import tinkoffLogo from '../images/SocialProofLogos/webiny.svg'
import hasuraLogo from '../images/SocialProofLogos/hasura.svg'
import spacexLogo from '../images/SocialProofLogos/spacex.svg'
import ycombinatorLogo from '../images/SocialProofLogos/ycombinator.svg'
import staplesLogo from '../images/SocialProofLogos/staples.svg'

const Logo = ({ logo, alt }) => <img src={logo} alt={alt} className="p-6" />

export const SocialProof = () => {
    return (
        <div className="mt-24">
            <div className="w-11/12 max-w-3xl mx-auto flex justify-around flex-row flex-wrap">
                <Logo logo={airbalticLogo} alt="Airbaltic" />
                <Logo logo={dataikuLogo} alt="Dataiku" />
                <Logo logo={landmarkLogo} alt="Landmark Group" />
                <Logo logo={tinkoffLogo} alt="Tinkoff" />
                <Logo logo={hasuraLogo} alt="Hasura" />
                <Logo logo={spacexLogo} alt="Spacex" />
                <Logo logo={ycombinatorLogo} alt="Ycombinator" />
                <Logo logo={staplesLogo} alt="Staples" />
            </div>

            <div className="w-11/12 max-w-3xl mx-auto mt-24 bg-purple-500 bg-opacity-20 rounded p-8 text-center text-white">
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

import React from 'react'

import outbrainLogo from '../images/SocialProofLogos/outbrain.svg'
import landmarkLogo from '../images/SocialProofLogos/landmark.svg'
import tinkoffLogo from '../images/SocialProofLogos/tinkoff.svg'
import hasuraLogo from '../images/SocialProofLogos/hasura.svg'
import spacexLogo from '../images/SocialProofLogos/spacex.svg'
import ycombinatorLogo from '../images/SocialProofLogos/ycombinator.svg'
import staplesLogo from '../images/SocialProofLogos/staples.svg'
import webinyLogo from '../images/SocialProofLogos/webiny.svg'
import grafanaLogo from '../images/SocialProofLogos/grafana.svg'

const Logo = ({ logo, alt }: { logo: string; alt: string }) => (
    <img src={logo} alt={alt} className="px-2 xl:flex-1 max-h-6 flex-shrink" />
)

export const SocialProof = () => {
    return (
        <div className="xl:flex xl:justify-center mx-auto relative z-40 pb-12">
            <div className="flex flex-wrap md:flex-nowrap items-center gap-x-6 xl:gap-x-2 justify-center md:mb-4">
                <Logo logo={hasuraLogo} alt="Hasura" />
                <Logo logo={ycombinatorLogo} alt="Y Combinator" />
                <Logo logo={staplesLogo} alt="Staples" />
                <Logo logo={spacexLogo} alt="Spacex" />
            </div>
            <div className="flex flex-wrap md:flex-nowrap items-center gap-x-6 xl:gap-x-2 justify-center">
                <Logo logo={grafanaLogo} alt="Grafana" />
                <Logo logo={webinyLogo} alt="Webiny" />
                <Logo logo={landmarkLogo} alt="Landmark Group" />
                <Logo logo={outbrainLogo} alt="Outbrain" />
                <Logo logo={tinkoffLogo} alt="Tinkoff" />
            </div>
        </div>
    )
}

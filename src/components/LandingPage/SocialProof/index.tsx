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
import grafanaLogo from '../images/SocialProofLogos/grafana.svg'

const Logo = ({ logo, alt }: { logo: string; alt: string }) => <img src={logo} alt={alt} className="px-2" />

export const SocialProof = () => {
    return (
        <div className="mt-24 hero-proof">
            <div className="w-11/12 max-w-3xl mx-auto mb-4 flex justify-center sm:justify-between flex-row flex-wrap">
                <Logo logo={dataikuLogo} alt="Dataiku" />
                <Logo logo={hasuraLogo} alt="Hasura" />
                <Logo logo={ycombinatorLogo} alt="Y Combinator" />
                <Logo logo={staplesLogo} alt="Staples" />
                <Logo logo={spacexLogo} alt="Spacex" />
            </div>
            <div className="w-11/12 max-w-3xl mx-auto flex justify-around flex-row flex-wrap">
                <Logo logo={grafanaLogo} alt="Grafana" />
                <Logo logo={webinyLogo} alt="Webiny" />
                <Logo logo={landmarkLogo} alt="Landmark Group" />
                <Logo logo={airbalticLogo} alt="Airbaltic" />
                <Logo logo={tinkoffLogo} alt="Tinkoff" />
            </div>
        </div>
    )
}

import React from 'react'
import { Structure } from '../../Structure'
import { mergeClassList } from '../../../lib/utils'

import eltjeImg from './images/eltje.png'
import charlesImg from './images/charles.png'
import kunalImg from './images/kunal.png'
import ericImg from './images/eric.png'

interface QuoteProps {
    image: string
    position: string
    name: string
    details: string
    className?: string
}

const Quote = ({ image, name, position, details, className = '' }: QuoteProps) => {
    const classList = mergeClassList('w-full text-center mt-12 lg:mt-0', className)

    return (
        <div className={classList}>
            <img src={image} className="max-w-full w-36 h-auto mx-auto" alt={name} />

            <header className="text-white text-lg mt-4 font-bold">{name}</header>
            <span className="text-white text-opacity-40 block mt-1">{position}</span>
            <p className="mt-1 max-w-lg mx-auto">{details}</p>
        </div>
    )
}

export const WorkingAtPostHog = () => {
    return (
        <div className="careers-working-at-posthog pt-24 text-white text-center" id="working-at-posthog">
            <Structure.Section width="5xl">
                <Structure.SectionHeader
                    title="Working at PostHog"
                    titleTag="h2"
                    leadText="Real, honest opinions from really honest people"
                    leadTextClassName="opacity-80"
                />

                <div className="flex flex-col lg:flex-row items-center space-between mt-12">
                    <div className="w-full lg:w-1/3 lg:mr-6">
                        <Quote
                            image={charlesImg}
                            name="Charles Cook"
                            position="Business Operations"
                            details="I hate how much I enjoy working at PostHog. It has ruined all other companies for me. Thanks a lot."
                        />
                    </div>

                    <div className="w-full lg:w-1/3 lg:mx-6">
                        <Quote
                            image={eltjeImg}
                            name="Eltje Lange"
                            position="People and Talent"
                            details="I love PostHog’s level of autonomy and transparency. We have a lot of freedom and trust in the team, but we also hold each other accountable and don’t shy away from giving (and receiving) a lot of feedback. Plus the team helped me to pick up some basic coding skills, which is amazing!"
                        />

                        <Quote
                            image={ericImg}
                            name="Eric Duong"
                            position="Software Engineer"
                            details="Working at PostHog feels like successfully having a lot of cooks in the kitchen. (People might not believe this or find it alarming, so proceed with caution!)"
                            className="lg:mt-24"
                        />
                    </div>

                    <div className="w-full lg:w-1/3 lg:ml-6">
                        <Quote
                            image={kunalImg}
                            name="Kunal Pathak"
                            position="Growth Engineer"
                            details="It's a lot of fun and a unique experience to get to work with people from all over the world around a unified goal."
                        />
                    </div>
                </div>

                <div className="mt-24 max-w-2xl mx-auto">
                    <header className="text-white text-lg">
                        Watch a day in the life of our graphic designer, Lottie!
                    </header>
                    <div className="mt-8 h-0 pb-fluid-video relative">
                        <iframe
                            src="https://www.youtube.com/embed/xlODCLrZyvM"
                            className="absolute top-0 left-0 w-full h-full rounded-lg"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen=""
                            frameBorder="0"
                        ></iframe>
                    </div>
                </div>
            </Structure.Section>
        </div>
    )
}

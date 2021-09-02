import React from 'react'
import { CallToAction } from 'components/CallToAction'
import { heading } from 'components/HostHogHub/classes'

import londonVenue from './images/london-2021-venue.png'
import marcus from './images/marcus.png'
import anca from './images/anca-filip.png'

const AgendaItem = ({ time, title, description, speakerImage, speakerBio }) => {
    return (
        <div className="flex border-t border-dashed">
            <div className="border-r border-dashed pt-4 px-4 text-center flex-none">{time}</div>
            <div className="pt-4 px-4">
                <div>
                    <h3 className="text-sm">{title}</h3>
                    <p>{description}</p>
                </div>
                {speakerImage && speakerBio && (
                    <div className="flex flex-row">
                        <img className="p-4 m-auto relative -ml-20" width={193} src={speakerImage} />
                        <div className="p-4">
                            <p>{speakerBio}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function Agenda() {
    return (
        <section className="justify-center items-center mx-10 my-16">
            <div className="grid grid-cols-2 border-t border-b border-dashed">
                {/* Left column with image */}
                <div>
                    <img className="rounded-lg p-4 m-auto" width={614} src={londonVenue} />
                </div>

                {/* Right column for Agenda */}
                <div className="border-l border-dashed">
                    <div className="flex flex-col content-center">
                        <h2 className="p-4 m-0">Agenda</h2>

                        <AgendaItem
                            time="5:45pm"
                            title="PostHog: How we find out what users need"
                            description="PostHog VP of Product Marcus Hyett will explain the ways PostHog finds out what users need using tools such as session replays, customer interviews and aggregated data."
                            speakerImage={marcus}
                            speakerBio="Marcus Hyett has 11 years of product experience spanning Network Rail, Facebook and Arachnys. As Head of Product he’s in charge of PostHog’s roadmap and post-it notes."
                        />

                        <AgendaItem
                            time="7:00pm"
                            title="Mention Me: Designing better multivariate experiments"
                            description="Referral platform Mention Me has used PostHog since 2021. Head of Product Anca Filip will explain how Mention Me’s team uses PostHog to design experiments which guide the product roadmap."
                            speakerImage={anca}
                            speakerBio="Anca Filip is Head of Product for Mention Me, which powers referral campaigns for more than 450 of the world’s biggest brands, including FarFetch, Nutmeg and Zipcar."
                        />

                        <AgendaItem
                            time="7:45pm"
                            title="Networking drinks"
                            description="Take advantage of the open bar and free food while chatting with other PostHog users and members of the open source community. PostHog’s team is eager to hear your feedback and ideas!"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

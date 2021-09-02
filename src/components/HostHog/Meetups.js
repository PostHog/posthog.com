import React from 'react'
import { CallToAction } from '../CallToAction'
import { heading, section } from './classes'

const MeetupDate = ({ date }) => {
    return <div className="text-center border-t border-dashed py-8 text-lg">{date}</div>
}

const MeetupVenue = ({ venue }) => {
    return <div className="text-center border-t border-dashed py-8 text-lg">{venue}</div>
}

const FindOutMore = ({ link }) => {
    return (
        <div className="text-center border-t border-dashed py-8">
            <CallToAction type="button" width="56" className="bg-primary border border-primary" to={link}>
                Find out more
            </CallToAction>
        </div>
    )
}

export default function Meetups() {
    return (
        <section className="flex flex-col justify-center items-center max-w-screen-2xl my-8 md:my-16">
            <p>We’re constantly planning new HostHogs, so check out often to find out about new events near you.</p>
            <div className="w-full border-t border-dashed mt-8">
                <div className="grid grid-cols-3">
                    <div className="border-r border-dashed pt-8">
                        <h3 className="text-blue text-center">London</h3>
                        <div className="text-center">Logo</div>
                        <div className="px-16 py-8 h-32">
                            Our London HostHog in March will be hosted by our VP of Product, Marcus Hyett. Hear how
                            companies such as Mention Me use PostHog to drive experimentation.
                        </div>
                        <MeetupDate date="Friday 22 Dec 2022" />
                        <MeetupVenue venue="The Bell Centre" />
                        <FindOutMore link="/hosthog/london-2022" />
                    </div>
                    <div className="pt-8">
                        <h3 className="text-orange text-center">San Franciso</h3>
                        <div className="text-center">Logo</div>
                        <div className="px-16 py-8 h-32">
                            Join us in December to hear our Platform Lead, James Greenhill and how Vendasta’s Product
                            team use PostHog to support over 25 products at once.
                        </div>
                        <MeetupDate date="Friday 18 Mar 2022" />
                        <MeetupVenue venue="Lardon Hotel" />
                        <FindOutMore link="#" />
                    </div>
                    <div className="border-l border-dashed pt-8">
                        <h3 className="text-yellow text-center">Berlin</h3>
                        <div className="text-center">Logo</div>
                        <div className="px-16 py-8 h-32">
                            PostHog CTO Tim Glaser will host our Berlin HostHog in June, where n8n will join to explain
                            how they’ve integrated PostHog into their product stack.
                        </div>
                        <MeetupDate date="Friday 14 Jun 2022" />
                        <MeetupVenue venue="Radison Blue Hotel" />
                        <FindOutMore link="#" />
                    </div>
                </div>
            </div>
        </section>
    )
}

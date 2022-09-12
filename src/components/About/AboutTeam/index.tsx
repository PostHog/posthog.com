import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { CallToAction } from 'components/CallToAction'
import { Map } from './Map'
import { Avatar } from './Avatar'

interface DotProps {
    classes: string
}

const Dot = ({ classes }: DotProps) => {
    return (
        <div className={`absolute ${classes}`}>
            <span className="inline-flex h-4 w-4 mx-auto bg-red rounded-full relative border-[2.5px] border-solid border-white">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red opacity-75"></span>
            </span>
        </div>
    )
}

export const AboutTeam = () => {
    return (
        <section id="team" className="py-12 px-4">
            <h3 className="text-5xl mb-4 lg:mb-1 text-center">
                We're a team of <span className="text-blue">30</span> from all over the world.
            </h3>
            <h4 className="font-semibold opacity-70 text-center">
                Many of us move around a lot. Here’s where we’re currently shipping code.
            </h4>

            <div className="text-center">
                <CallToAction to="/handbook/company/team" type="secondary">
                    Meet the team
                </CallToAction>
            </div>

            <div className="relative scale-[150%] pt-20 pb-16 lg:py-0 lg:scale-100">
                <Avatar />
                <Dot classes="top-[27%] left-[44%]" />
                <Map className="w-[795px] h-[485px]" />
            </div>
        </section>
    )
}

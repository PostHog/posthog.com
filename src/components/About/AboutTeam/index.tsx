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
                Many of us move around a lot. Here's where we're currently shipping code.
            </h4>

            <div className="text-center">
                <CallToAction to="/handbook/company/team" type="secondary">
                    Meet the team
                </CallToAction>
            </div>

            <div className="relative pt-20 pb-16 lg:py-0 lg:scale-100">
                <Avatar size="lg" handle="li-yi-yu" color="#9DE1D9" className="left-0 top-0" />
                <Avatar size="md" handle="neil-kakkar" color="#B3E19D" className="left-[30%] top-8" />
                <Avatar size="sm" handle="yakko-majuri" color="#A2B0D4" className="right-16 top-12" />
                <Avatar size="md" handle="eric-duong" color="#FDEDC9" className="right-0 top-24" />
                <Avatar size="md" handle="marius-andra" color="#DCB1E3" className="right-0 bottom-24" />
                <Avatar size="xl" handle="lottie-coxon" color="#E19D9D" className="right-24 bottom-0" />
                <Avatar size="sm" handle="coua-phang" color="#E6A9E8" className="left-24 bottom-8" />
                <Avatar size="xl" handle="guido-iaquinti" color="#9DA4E1" className="left-12 bottom-12" />
                <Avatar size="md" handle="cameron-deleone" color="#FBBC05" className="left-4 top-36" />

                <Dot classes="top-[27%] left-[44%]" />
                <Map className="w-[795px] h-[485px]" />
            </div>
        </section>
    )
}

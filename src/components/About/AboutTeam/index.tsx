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

            <div className="relative text-center pt-16 pb-24 ml-12">
                <StaticImage
                    src="./Map/images/map-with-pins.png"
                    width={795}
                    height={485}
                    placeholder="blurred"
                    alt="Map of the PostHoggers"
                />
                {/* <Map className="w-[795px] h-[485px] scale-75" /> */}
                <div className="absolute inset-1/2 border">
                    <Avatar size="xl" handle="li-yi-yu" color="#9DE1D9" className="left-[-26rem] top-[-18rem]" />
                    <Avatar size="md" handle="neil-kakkar" color="#B3E19D" className="left-[-8rem] top-[-16rem]" />
                    <Avatar size="lg" handle="yakko-majuri" color="#A2B0D4" className="right-[-10rem] top-[-18rem]" />
                    <Avatar size="md" handle="eric-duong" color="#FDEDC9" className="right-[-20rem] top-[-12rem]" />
                    <Avatar size="lg" handle="marius-andra" color="#DCB1E3" className="right-[-22rem] top-[-2rem]" />
                    <Avatar
                        size="xl"
                        handle="lottie-coxon"
                        color="#E19D9D"
                        className="right-[-11rem] bottom-[-12rem]"
                    />
                    <Avatar size="md" handle="coua-phang" color="#E6A9E8" className="left-[-6rem] bottom-[-10rem]" />
                    <Avatar
                        size="xl"
                        handle="guido-iaquinti"
                        color="#9DA4E1"
                        className="left-[-20rem] bottom-[-12rem]"
                    />
                    <Avatar
                        size="md"
                        handle="cameron-deleone"
                        color="#FBBC05"
                        className="left-[-24rem] bottom-[-2rem]"
                    />
                    <Dot classes="top-[27%] left-[44%]" />
                </div>
            </div>
        </section>
    )
}

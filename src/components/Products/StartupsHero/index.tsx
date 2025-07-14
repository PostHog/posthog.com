import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { CallToAction } from 'components/CallToAction'
import { IconRewindPlay, IconTrends } from '@posthog/icons'

interface StartupsHeroProps {
    icon: string
    beta?: boolean
    product: string
    title: string
    description: string
    image: any
    color: string
}

export const StartupsHero = ({ color, icon, beta, product, title, description }: StartupsHeroProps): JSX.Element => {
    return (
        <>
            <section>
                <div className="flex gap-1.5 justify-center items-center mb-3">
                    <span className={`w-6 h-6 text-${color}`}>{icon}</span>
                    <span className="text-[15px] font-semibold text-opacity-60">{product}</span>
                    {beta && (
                        <span className="text-xs font-semibold text-opacity-60 bg-yellow px-1 py-0.5 rounded-sm uppercase text-primary">
                            Beta
                        </span>
                    )}
                </div>
                <h1 className="text-5xl md:text-6xl text-center mb-4 md:mb-2 text-balance">{title}</h1>
                <p className="text-lg font-semibold text-center text-opacity-75 mb-5">{description}</p>
                <div className="flex justify-center gap-2 mb-12">
                    <CallToAction href="https://app.posthog.com/startups" type="primary">
                        Apply now
                    </CallToAction>
                </div>
                <div className="flex justify-center mb-4">
                    <img
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/day_startup_a0c2d247b6.png"
                        alt="Startup team working"
                        className="max-w-[50%] h-auto floating-image"
                        style={{
                            animation: 'float 6s ease-in-out infinite',
                        }}
                    />
                </div>
            </section>
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-5px); }
                    }
                `,
                }}
            />
        </>
    )
}

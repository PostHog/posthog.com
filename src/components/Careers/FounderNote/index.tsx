import React, { useState, useRef } from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { James, Plus, Tim } from 'components/Signatures'
import { Link } from 'gatsby'

import jamesQuote1 from './Audio/quote-1.mp3'
import jamesQuote2 from './Audio/quote-2.mp3'
import jamesQuote3 from './Audio/quote-3.mp3'
import jamesQuote4 from './Audio/quote-4.mp3'
import jamesQuote5 from './Audio/quote-5.mp3'
import jamesQuote6 from './Audio/quote-6.mp3'
import jamesQuote7 from './Audio/quote-7.mp3'
import jamesQuote8 from './Audio/quote-8.mp3'
import jamesQuote9 from './Audio/quote-9.mp3'
import jamesQuote10 from './Audio/quote-10.mp3'
import Logo from 'components/Logo'

const P = ({ children }) => {
    return <p className="text-base leading-normal mb-3 max-w-xl">{children}</p>
}

export const FounderNote = () => {
    const audioRef = useRef<HTMLAudioElement>(null)
    const mp3Files = [
        jamesQuote1,
        jamesQuote2,
        jamesQuote3,
        jamesQuote4,
        jamesQuote5,
        jamesQuote6,
        jamesQuote7,
        jamesQuote8,
        jamesQuote9,
        jamesQuote10,
    ]

    const playRandomJamesAudio = () => {
        try {
            const randomIndex = Math.floor(Math.random() * mp3Files.length)
            const randomMp3 = mp3Files[randomIndex]
            if (audioRef.current) {
                audioRef.current.src = randomMp3
                audioRef.current.play().then(() => {
                    console.log('Audio played successfully')
                })
            }
        } catch (error) {
            console.error('Error in playRandomSound:', error)
        }
    }

    return (
        <section className="@container px-4 max-w-7xl mx-auto mb-16">
            <div className="grid md:grid-cols-5 gap-12 items-center">
                <div className="hidden @sm:block col-span-2 text-right">
                    <button onClick={playRandomJamesAudio} className="inline-block border-[6px] border-white dark:border-white rounded-md shadow-lg -rotate-1 relative top-[1px] lg:top-0 hover:top-[-3px] transform scale-100 hover:scale-[1.02] active:scale-[.998] active:top-px transition-all duration-100 cursor-play">
                        <StaticImage
                            src="./images/these-founders-ship.jpg"
                            alt="James Hawkins and Tim Glaser: These founders ship"
                            className="w-[300px]"
                            placeholder="blurred"
                        />
                    </button>
                </div>
                <div className="col-span-3">
                    <h2 className="text-2xl font-bold mb-2 @sm:mb-4 @sm:flex items-center gap-3">Thanks for checking out <span className="@sm:hidden">PostHog!</span> <Logo className="hidden @sm:inline-block h-8" /></h2>
                    <button onClick={playRandomJamesAudio} className="float-right max-w-sm inline-block @sm:hidden border-[6px] border-white dark:border-white rounded-md shadow-lg rotate-1 relative top-[1px] lg:top-0 hover:top-[-3px] transform scale-100 hover:scale-[1.02] active:scale-[.998] active:top-px transition-all duration-100 ml-2 cursor-play">
                        <StaticImage
                            src="./images/these-founders-ship.jpg"
                            alt="James Hawkins and Tim Glaser: These founders ship"
                            className="w-[150px]"
                            placeholder="blurred"
                        />
                    </button>
                    <P>
                        We started PostHog during Y Combinator's W20 cohort and had the most successful
                        B2B software launch on Hacker News since 2012 - with a product that was just 4
                        weeks old.
                    </P>
                    <P>
                        We now have over 10,000 customers, we're{' '}
                        <Link to="http://www.paulgraham.com/aord.html">default alive</Link>, and we grow 97%
                        through word of mouth.
                    </P>

                    <P>
                        What does this mean for you? We have a lot of capital (and from the world's best
                        investors), but we're a lean, strong team - so you've got the opportunity to
                        have a huge impact.
                    </P>
                    <P>
                        We'd love to have you join us!
                    </P>
                    <div className="flex items-center space-x-3 mt-4">
                        <James className="h-11" />
                        <Plus className="h-5" />
                        <Tim className="h-8" />
                    </div>
                </div>
            </div>
        </section>
    )
}

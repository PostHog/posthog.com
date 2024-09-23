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

const P = ({ children }) => {
    return <p className="text-sm md:text-base mb-3">{children}</p>
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
        <div id="introduction" className="px-4 max-w-7xl mx-auto">
            <div className="bg-white dark:bg-accent-dark p-4 lg:p-6 rounded">

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-2">

                        <button onClick={playRandomJamesAudio}>
                            <StaticImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/team/james.png"
                                alt="James Hawkins"
                                className="w-14 h-14 rounded-full bg-yellow border-2 border-solid border-white cursor-pointer"
                                placeholder="blurred"
                            />
                        </button>
                        <StaticImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/team/tim.png"
                            alt="Tim Glaser"
                            className="w-14 h-14 rounded-full bg-red border-2 border-solid border-white -ml-4"
                            placeholder="blurred"
                        />
                    </div>

                    <div className="col-span-10 columns-2 gap-8">

                        <P><strong>We're James and Tim.</strong> 👋</P>
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
                        <P>We'd love to have you join us!</P>

                        <div className="flex items-center space-x-3 transform scale-75">
                            <James />
                            <Plus />
                            <Tim />
                        </div>
                    </div>
                </div>
                <audio ref={audioRef}></audio>
            </div>

        </div >
    )
}

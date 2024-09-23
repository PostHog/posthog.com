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
    return <p className="text-sm md:text-[15px] leading-normal mb-3">{children}</p>
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
        <div id="introduction" className="px-4 max-w-7xl mx-auto mb-12">
            <div className="bg-white dark:bg-accent-dark pt-4 px-4 rounded shadow-xl overflow-hidden">
                <div className="border-b border-light dark:border-dark pb-2 mb-4">
                    <strong>Hey from PostHog!</strong> 👋
                </div>

                <div className="flex flex-col-reverse lg:flex-row lg:gap-4 items-end">
                    <div className="-mt-16 lg:mt-0 -mr-4 lg:mr-0">
                        <button onClick={playRandomJamesAudio} className="relative top-[1px] lg:top-0 hover:top-[-3px] transform scale-100 hover:scale-[1.05] active:scale-[.995] active:top-px transition-all duration-100 cursor-play">
                            <StaticImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/team/james.png"
                                alt="James Hawkins"
                                className="size-[5.1rem] lg:size-36"
                                placeholder="blurred"
                            />
                        </button>
                        <StaticImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/team/tim.png"
                            alt="Tim Glaser"
                            className="size-[5rem] lg:size-[8.75rem] top-[3px] lg:top-0 lg:mt-1 -ml-6 lg:-ml-11"
                            placeholder="blurred"
                        />
                    </div>

                    <div className="flex-1 pb-4">

                        <div className="lg:columns-2 lg:gap-4 xl:gap-6">

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
                                have a huge impact. We'd love to have you join us!
                            </P>
                            <div className="flex items-center space-x-3">
                                <James className="h-8" />
                                <Plus className="h-4" />
                                <Tim className="h-6" />
                            </div>
                        </div>
                    </div>
                </div>
                <audio ref={audioRef}></audio>
            </div>

        </div >
    )
}

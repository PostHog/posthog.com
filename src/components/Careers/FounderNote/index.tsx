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
import { Tweet } from 'components/Tweet'

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
            <h2 className="text-center text-4xl mb-8">This message brought to you by our co-founder</h2>
            <div className="grid justify-center">
                <div className="hidden col-span-2 text-right">
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
                    <h2 className="hidden text-2xl font-bold mb-2 @sm:mb-4 @sm:f lex items-center gap-3">Thanks for checking out <span className="@sm:hidden">PostHog!</span> <Logo className="hidden @sm:inline-block h-8" /></h2>
                    <button onClick={playRandomJamesAudio} className="float-right max-w-sm inline-block @sm:hidden border-[6px] border-white dark:border-white rounded-md shadow-lg rotate-1 relative top-[1px] lg:top-0 hover:top-[-3px] transform scale-100 hover:scale-[1.02] active:scale-[.998] active:top-px transition-all duration-100 ml-2 cursor-play">
                        <StaticImage
                            src="./images/these-founders-ship.jpg"
                            alt="James Hawkins and Tim Glaser: These founders ship"
                            className="w-[150px]"
                            placeholder="blurred"
                        />
                    </button>
                    <Tweet alertMessage="yo, just apply already!">
                        <p className="mb-2">yo, i’m james, one of the two co-founders, and there are a lot of things i can’t offer you…</p>
                        <ul>
                            <li>we don’t offer career progression frameworks</li>
                            <li>we don’t offer mentorship</li>
                            <li>we don’t offer lots of meetings</li>
                            <li>we don’t hold back if we think something is wrong</li>
                            <li>i don’t offer many capital letters</li>
                        </ul>
                    </Tweet>
                    <Tweet alertMessage="yo, just apply already!">
                        <p>if you join, my job is to provide an environment where we coach you to build the best products you can.</p>
                    </Tweet>
                    <Tweet alertMessage="yo, just apply already!">
                        <p className="mb-2">it looks like:</p>
                        <ul>
                            <li>high expectations - i expect you to decide what to ship, for you to ship fast and for you to then iterate with users. you don’t have to do this alone, there are lots of friendly, deeply skilled and helpful people here - you just need to make sure you go get help instead of assuming it will come to you</li>
                            <li>coaching for your team in the early days of a new product</li>
                            <li>growth reviews of your product when it is popular to scale it or split it into more products</li>
                            <li>lots of deep work time</li>
                            <li>we will raise feedback constructively and will encourage crazy ideas</li>
                            <li>lots of weird in jokes</li>
                        </ul>
                    </Tweet>

                    <Tweet alertMessage="yo, just apply already!">
                        <p>i believe you focusing on shipping products and learning from this is how you progress your career. anything else is a means to this end.</p>
                    </Tweet>
                    <Tweet alertMessage="yo, just apply already!">
                        <p>if you are joining a role outside of engineering, the concepts are exactly the same. that’s why we’re well known for a very different approach to marketing, sales, ops, recruitment and design.</p>
                    </Tweet>
                    <Tweet alertMessage="yo, just apply already!">
                        <p>come work with people that are truly great at, and focused on, what they do</p>
                    </Tweet>
                </div>
            </div>
        </section>
    )
}

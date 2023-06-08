import { StaticImage } from 'gatsby-plugin-image'
import React, { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { heading, section } from './classes'
import airbus from './images/airbus.svg'
import clickhouse from './images/clickhouse.svg'
import hasura from './images/hasura.svg'
import assemblyai from './images/assemblyai.svg'
import joybird from './images/joybird.svg'
import landmark from './images/landmark.svg'
import Logomark from './images/Logomark'
import outbrain from './images/outbrain.svg'
import phantom from './images/phantom.svg'
import linear from './images/linear.svg'
import staples from './images/staples.svg'
import dhl from './images/dhl.svg'
import yCombinator from './images/y-combinator.svg'
import { motion } from 'framer-motion'

const Customer = ({ image, width, height, className = '' }) => {
    return (
        <li
            className="flex items-center justify-center 
            w-full 
            h-24
            py-6 

            lg:px-2
            lg:h-40
        "
        >
            <img className={`icon px-4 md:px-6 lg:px-4 ${className}`} width={width} height={height} src={image} />
        </li>
    )
}

export default function Customers() {
    const { ref, inView, entry } = useInView({ triggerOnce: true })
    return (
        <section className="mb-16 -mt-[1px]">
            <div className="bg-black dark:bg-dark py-8 md:py-12 xl:py-16 px-4 relative z-20">
                <h2 className="m-0 text-center text-4xl lg:text-5xl 2xl:text-6xl text-primary-dark max-w-screen-2xl mx-auto">
                    These folks <span className="text-yellow">build products users want</span> with
                    <Logomark className="inline-flex ml-4 -mt-2 h-8 lg:h-10 xl:h-12 2xl:h-14 fill-current" />
                </h2>
            </div>
            <div
                ref={ref}
                className="mt-8 max-w-screen-2xl mx-auto px-4 2xl:px-0 flex items-center sm:items-end flex-col sm:flex-row"
            >
                {inView && (
                    <ul className="list-none m-0 p-0 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 flex-grow w-full text-primary-dark">
                        <Customer className="max-h-[44px]" image={yCombinator} />
                        <Customer className="max-h-[36px]" image={staples} />
                        <Customer className="max-h-[36px]" image={airbus} />
                        <Customer className="max-h-[35px]" image={dhl} />

                        <Customer className="max-h-[50px]" image={landmark} />
                        <Customer className="max-h-[40px]" image={outbrain} />
                        <Customer className="max-h-[35px]" image={clickhouse} />
                        <Customer className="max-h-[51px]" image={hasura} />

                        <Customer className="max-h-[46px]" image={phantom} />
                        <Customer className="max-h-[45px]" image={linear} />
                        <Customer className="max-h-[50px]" image={joybird} />
                        <Customer className="max-h-[50px]" image={assemblyai} />
                    </ul>
                )}
            </div>
        </section>
    )
}

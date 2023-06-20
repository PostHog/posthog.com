import { StaticImage } from 'gatsby-plugin-image'
import React, { useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { heading, section } from './classes'
import airbus from './images/airbus.svg'
import airbusDark from './images/airbus_dark.svg'
import clickhouse from './images/clickhouse.svg'
import clickhouseDark from './images/clickhouse_dark.svg'
import hasura from './images/hasura.svg'
import hasuraDark from './images/hasura_dark.svg'
import assemblyai from './images/assemblyai.svg'
import assemblyaiDark from './images/assemblyai_dark.svg'
import joybird from './images/joybird.svg'
import joybirdDark from './images/joybird_dark.svg'
import landmark from './images/landmark.svg'
import landmarkDark from './images/landmark_dark.svg'
import Logomark from './images/Logomark'
import outbrain from './images/outbrain.svg'
import outbrainDark from './images/outbrain_dark.svg'
import phantom from './images/phantom.svg'
import phantomDark from './images/phantom_dark.svg'
import linear from './images/linear.svg'
import linearDark from './images/linear_dark.svg'
import staples from './images/staples.svg'
import staplesDark from './images/staples_dark.svg'
import dhl from './images/dhl.svg'
import dhlDark from './images/dhl_dark.svg'
import yCombinator from './images/y-combinator.svg'
import yCombinatorDark from './images/y-combinator_dark.svg'
import { motion } from 'framer-motion'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'

const Customer = ({ image, imageDark, width, height, className = '' }) => {
    const { websiteTheme } = useValues(layoutLogic)
    const logo = websiteTheme === 'dark' ? imageDark || image : image
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
            <img className={`icon px-4 md:px-6 lg:px-4 ${className}`} width={width} height={height} src={logo} />
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
                        <Customer className="max-h-[44px]" image={yCombinator} imageDark={yCombinatorDark} />
                        <Customer className="max-h-[36px]" image={staples} imageDark={staplesDark} />
                        <Customer className="max-h-[36px]" image={airbus} imageDark={airbusDark} />
                        <Customer className="max-h-[35px]" image={dhl} imageDark={dhlDark} />

                        <Customer className="max-h-[50px]" image={landmark} imageDark={landmarkDark} />
                        <Customer className="max-h-[40px]" image={outbrain} imageDark={outbrainDark} />
                        <Customer className="max-h-[35px]" image={clickhouse} imageDark={clickhouseDark} />
                        <Customer className="max-h-[51px]" image={hasura} imageDark={hasuraDark} />

                        <Customer className="max-h-[46px]" image={phantom} imageDark={phantomDark} />
                        <Customer className="max-h-[45px]" image={linear} imageDark={linearDark} />
                        <Customer className="max-h-[50px]" image={joybird} imageDark={joybirdDark} />
                        <Customer className="max-h-[50px]" image={assemblyai} imageDark={assemblyaiDark} />
                    </ul>
                )}
            </div>
        </section>
    )
}

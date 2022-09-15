import React from 'react'
import { heading, section } from './classes'
import airbus from './images/airbus.svg'
import clickhouse from './images/clickhouse.svg'
import hasura from './images/hasura.svg'
import ing from './images/ing.svg'
import joybird from './images/joybird.svg'
import landmark from './images/landmark.svg'
import Logomark from './images/Logomark'
import outbrain from './images/outbrain.svg'
import phantom from './images/phantom.svg'
import spacex from './images/spacex.svg'
import staples from './images/staples.svg'
import vendasta from './images/vendasta.svg'
import yCombinator from './images/y-combinator.svg'

const Customer = ({ image, width, height, className = '' }) => {
    return (
        <li
            className="border-t border-l border-dashed border-gray-accent-light flex items-center justify-center 
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
    return (
        <section className="mb-16 -mt-[1px]">
            <div className="bg-almost-black py-8 md:py-12 xl:py-16 px-4 relative z-20">
                <h2 className="m-0 text-center text-4xl lg:text-5xl 2xl:text-6xl text-white max-w-screen-2xl mx-auto">
                    These industry leaders <span className="text-yellow">run their data stack</span> on
                    <Logomark className="inline-flex ml-4 -mt-2 h-8 lg:h-10 xl:h-12 2xl:h-14 fill-current" />
                </h2>
            </div>
            <div className="mt-8 max-w-screen-2xl mx-auto px-4 2xl:px-0">
                <ul className="list-none m-0 p-0 grid grid-cols-2 md:grid-cols-4 border-b border-r border-dashed border-gray-accent-light">
                    <Customer className="max-h-[44px]" image={yCombinator} />
                    <Customer className="max-h-[36px]" image={staples} />
                    <Customer className="max-h-[45px]" image={spacex} />
                    <Customer className="max-h-[36px]" image={airbus} />

                    <Customer className="max-h-[46px]" image={phantom} />
                    <Customer className="max-h-[50px]" image={ing} />
                    <Customer className="max-h-[40px]" image={outbrain} />
                    <Customer className="max-h-[35px]" image={clickhouse} />

                    <Customer className="max-h-[50px]" image={joybird} />
                    <Customer className="max-h-[35px]" image={vendasta} />
                    <Customer className="max-h-[51px]" image={hasura} />
                    <Customer className="max-h-[50px]" image={landmark} />
                </ul>
            </div>
        </section>
    )
}

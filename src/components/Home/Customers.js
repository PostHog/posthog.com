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
        <section className={section('-mt-4 md:mt-12')}>
            <h2 className={heading('md')}>
                These industry leaders <span className="text-blue">build their data stack</span> on
                <Logomark className="inline-flex ml-4 -mt-2 h-8 lg:h-10 xl:h-12 2xl:h-14" />
            </h2>
            <div className="mt-8 md:mt-12">
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

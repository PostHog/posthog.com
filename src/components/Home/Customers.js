import React from 'react'
import { heading, section } from './classes'
import airbus from './images/airbus.svg'
import hasura from './images/hasura.svg'
import landmark from './images/landmark.svg'
import outbrain from './images/outbrain.svg'
import phantom from './images/phantom.svg'
import spacex from './images/spacex.svg'
import staples from './images/staples.svg'
import yCombinator from './images/y-combinator.svg'

const Customer = ({ image, width, height }) => {
    return (
        <li className="p-4 md:p-0 border-t border-l border-dashed border-gray-accent-light flex items-center">
            <img
                width={width}
                height={height}
                className="icon w-full py-2 px-4 md:py-6 md:px-8 lg:py-10 lg:px-16 m-0"
                src={image}
            />
        </li>
    )
}

export default function Customers() {
    return (
        <section className={section('md:-mb-8')}>
            <h2 className={heading('md')}>
                These industry leaders <span className="text-blue">self-host</span> their product analytics
            </h2>
            <div className="mt-8 md:mt-20">
                <ul className="list-none m-0 p-0 grid grid-cols-2 md:grid-cols-4 border-b border-r border-dashed border-gray-accent-light">
                    <Customer width={212} height={44} image={yCombinator} />
                    <Customer width={198} height={36} image={staples} />
                    <Customer width={267} height={35} image={spacex} />
                    <Customer width={229} height={41} image={airbus} />
                    <Customer width={206} height={47} image={landmark} />
                    <Customer width={173.46} height={51} image={hasura} />
                    <Customer width={138} height={31} image={outbrain} />
                    <Customer width={175} height={41} image={phantom} />
                </ul>
            </div>
        </section>
    )
}

import React from 'react'
import { heading, section } from './classes'
import yCombinator from './images/y-combinator.svg'
import staples from './images/staples.svg'
import spacex from './images/spacex.svg'
import landmark from './images/landmark.svg'
import hasura from './images/hasura.svg'
import grafana from './images/grafana.svg'
import outbrain from './images/outbrain.svg'
import tinkoff from './images/tinkoff.svg'

const Customer = ({ image }) => {
    return (
        <li className="p-4 md:p-0 border-t border-l border-dashed border-gray-accent-light">
            <img className="icon w-full py-2 px-4 md:py-6 md:px-8 lg:py-10 lg:px-16 m-0" src={image} />
        </li>
    )
}

export default function Customers() {
    return (
        <section className={section()}>
            <h2 className={heading('md')}>
                These industry leaders <span className="text-blue">self-host</span> their product analytics
            </h2>
            <div className="mt-8 md:mt-20">
                <ul className="list-none m-0 p-0 grid grid-cols-2 md:grid-cols-4 border-b border-r border-dashed border-gray-accent-light">
                    <Customer image={yCombinator} />
                    <Customer image={staples} />
                    <Customer image={spacex} />
                    <Customer image={landmark} />
                    <Customer image={hasura} />
                    <Customer image={grafana} />
                    <Customer image={outbrain} />
                    <Customer image={tinkoff} />
                </ul>
            </div>
        </section>
    )
}

import React from 'react'
import { CallToAction } from 'components/CallToAction'
import { section, heading } from './classes'
import Link from 'components/Link'

export default function ClimatePledge() {
    return (
        <section className={section('text-center')}>
            <div className="bg-blue rounded-lg py-14 px-16 w-9/12 mx-auto">
                <h2 className={heading('md', 'white')}>Climate Pledge</h2>
                <p className="text-white py-4 px-16">
                    We’re committed to making MeetHogs as carbon neutral as possible. We use Project Wren to offset the
                    carbon footprint for all speakers and don’t use any single-use plastics in our merch. For popular
                    events we sometimes charge a small attendance fee, which we use to{' '}
                    <Link
                        to="https://www.hertswildlifetrust.org.uk/shop#!/Hedgehog-Sponsorship/p/100527218/category=27439637"
                        className="text-white"
                    >
                        sponsor incredibly cute hedgehogs
                    </Link>
                    .
                </p>
                <CallToAction
                    type="button"
                    width="56"
                    className="bg-blue text-white hover:text-white border-2 border-white"
                    to="#"
                >
                    Meet our hedgehogs
                </CallToAction>
            </div>
        </section>
    )
}

import { CallToAction } from 'components/CallToAction'
import React from 'react'
import { heading, section } from './classes'

export default function CTA() {
    return (
        <section className={section('text-center')}>
            <div className="bg-blue w-full rounded-lg px-4 py-28">
                <h2 className={heading('lg', 'white')}>Give it a try</h2>
                <h3 className={heading('sm', 'white')}>Join 5,500 companies already using PostHog.</h3>
                <div className="mt-12 flex flex-col space-y-2 md:space-y-3 items-center justify-center">
                    <CallToAction
                        type="custom"
                        width="56"
                        className="bg-white text-blue hover:text-blue border-2 border-white"
                        to="/signup"
                    >
                        Get started
                    </CallToAction>
                    <CallToAction
                        type="custom"
                        width="56"
                        className="bg-blue text-white border-2 rounded-full border-white"
                        to="/schedule-demo"
                    >
                        Schedule a demo
                    </CallToAction>
                </div>
            </div>
        </section>
    )
}

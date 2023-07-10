import { CallToAction } from 'components/CallToAction'
import React from 'react'
import { heading, section } from './classes'

export default function CTA() {
    return (
        <section className={section('text-center')}>
            <div className="bg-blue w-full rounded-lg px-4 py-28">
                <h2 className={heading('lg', 'white')}>Give it a try</h2>
                <h3 className={heading('sm', 'white')}>Join 31,000 companies already using PostHog.</h3>
                <div className="mt-12 flex flex-col space-y-2 md:space-y-3 items-center justify-center">
                    <CallToAction type="primary" width="56" className="" to="https://app.posthog.com/signup">
                        Get started
                    </CallToAction>
                    <CallToAction
                        href="/book-a-demo"
                        type="custom"
                        width="56"
                        size="lg"
                        className="md:!w-auto !w-full"
                        childClassName="!bg-blue"
                    >
                        Schedule a demo
                    </CallToAction>
                </div>
            </div>
        </section>
    )
}

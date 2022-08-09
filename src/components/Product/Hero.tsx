import { CallToAction } from 'components/CallToAction'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

export default function Hero() {
    return (
        <section className="text-center pt-14">
            <div className="px-5 max-w-screen-2xl mx-auto">
                <h1 className="text-6xl m-0">
                    The modern platform for <br />
                    <span className="text-red">product analytics</span> and{' '}
                    <span className="text-red">experimentation</span>
                </h1>
                <p className="text-xl text-black/75 font-semibold m-0 mt-3 mb-5">
                    PostHog is the single platform that can replace an entire suite of tools you’re already paying for.
                </p>
                <div className="flex space-x-3 items-center justify-center">
                    <CallToAction to="/signup" type="primary">
                        Get started - free
                    </CallToAction>
                    <CallToAction to="/pricing" type="secondary">
                        View pricing
                    </CallToAction>
                </div>
            </div>
            <StaticImage placeholder="none" loading="eager" src="./images/product-hogs.png" alt="Product hogs" />
        </section>
    )
}

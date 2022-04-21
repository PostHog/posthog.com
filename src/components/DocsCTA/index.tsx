import React from 'react'
import { CallToAction } from 'components/CallToAction'

export const DocsCTA = () => (
    <>
        <h3 className="text-white mb-5 !mt-0">Want to give it a go?</h3>
        <div className="flex flex-col md:flex-row gap-2 xl:gap-4">
            <CallToAction width="56" to="/signup">
                Try PostHog today
            </CallToAction>
            <CallToAction type="outline" width="56" to="/book-a-demo">
                Schedule a demo
            </CallToAction>
        </div>
    </>
)

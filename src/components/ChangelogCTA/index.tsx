import React from 'react'
import { CallToAction } from 'components/CallToAction'

export default function ChangelogCTA(): JSX.Element {
    return (
        <div className="p-6 md:p-8 border border-primary bg-accent rounded mb-8 mt-2">
            <p className="font-semibold mb-1 opacity-75">Release notes have moved</p>
            <h3 className="text-2xl mt-0 mb-4">
                Looking for the latest updates? Check the <span className="text-red dark:text-yellow">changelog</span>.
            </h3>
            <p className="mb-6 text-[15px] opacity-75">
                We don't publish release notes on the blog anymore. The changelog has the most up-to-date list of
                everything new we've shipped in PostHog.
            </p>
            <CallToAction to="/changelog" type="primary" size="sm">
                View the changelog
            </CallToAction>
        </div>
    )
}

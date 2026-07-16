import React from 'react'
import { CallToAction } from 'components/CallToAction'
import { Check3, YC } from 'components/Icons'

const Benefit = ({ children }: { children: React.ReactNode }) => (
    <li className="list-none relative pl-7 p-0 text-sm">
        <Check3 className="w-4 h-4 inline-block absolute left-1 top-0.5" />
        {children}
    </li>
)

export default function StartupsCTA(): JSX.Element {
    return (
        <div className="p-6 md:p-8 border border-primary bg-accent rounded mb-8 mt-2">
            <p className="font-semibold mb-1 opacity-75">The PostHog startup program</p>
            <h3 className="text-2xl mt-0 mb-4">
                Building a startup? Get <span className="text-red dark:text-yellow">$50,000 in credits</span> to build a
                better product.
            </h3>
            <ul className="p-0 mb-6 grid @3xl:grid-cols-2 gap-2">
                <Benefit>$50,000 in PostHog credits for 12 months</Benefit>
                <Benefit>$1,000 of exclusive PostHog merch</Benefit>
                <Benefit>Partner perks worth $12,000+</Benefit>
                <li className="list-none relative pl-7 flex items-center gap-2 text-sm">
                    <Check3 className="w-4 h-4 inline-block absolute left-1 top-0.5" />
                    Used and recommended by <YC className="w-[100px]" />
                </li>
            </ul>
            <CallToAction to="/startups" type="primary" size="sm" state={{ newWindow: true }}>
                Apply to PostHog for Startups
            </CallToAction>
        </div>
    )
}

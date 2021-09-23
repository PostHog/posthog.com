import React from 'react'
import { ServerLocked, WebCode, Prohibited } from 'components/Icons/Icons'
import { CallToAction } from 'components/CallToAction'
import { Plan, Section, Price, Features, features } from './Plan'

export const SelfHostedPlanBreakdown = () => {
    return (
        <>
            <section className="grid grid-cols-3">
                <Plan title="Open source" subtitle="Great for startups" badge="LIMITED TO 1 PROJECT">
                    <Section title="Platform">
                        <Features features={features['Platform']} className="grid-cols-2" />
                    </Section>
                    <Section title="Platform features" className="mt-auto">
                        <Features features={features['Platform features']} className="grid-cols-2" />
                    </Section>
                    <Section title="Pricing" className="mt-auto">
                        <Price>Free</Price>
                    </Section>
                    <CallToAction className="my-7">Deploy now</CallToAction>
                    <span className="text-[15px] opacity-50 text-center">Includes community support on Slack</span>
                </Plan>
                <Plan
                    title="Scale"
                    subtitle="For large userbases or event volumes"
                    badge="INCLUDES OPEN SOURCE FEATURES"
                    className="border border-dashed border-gray-accent-light rounded-sm bg-white bg-opacity-20"
                >
                    <Section title="Advanced features">
                        <Features features={features['Advanced features']} />
                    </Section>
                    <Section title="Collaboration">
                        <Features features={features['Collaboration']} />
                    </Section>
                    <Section title="Pricing starts at" className="mt-auto">
                        <Price>
                            $2,000<span className="text-base opacity-50">/mo</span>
                        </Price>
                    </Section>
                    <CallToAction className="mt-7 mb-3">Get started</CallToAction>
                    <CallToAction type="outline">Book a demo</CallToAction>
                </Plan>
                <Plan
                    title="Enterprise"
                    subtitle="Your IT & legal teams will be very pleased"
                    badge="INCLUDES OPEN SOURCE & SCALE FEATURES"
                >
                    <Section title="Account & support">
                        <Features features={features['Account & support']} />
                    </Section>
                    <Section title="Ops & security">
                        <Features features={features['Ops & security']} />
                    </Section>
                    <Section title="Pricing">
                        <Price>Custom</Price>
                    </Section>
                    <CallToAction className="mt-7 mb-3">Get in touch</CallToAction>
                    <CallToAction type="outline">Book a demo</CallToAction>
                </Plan>
            </section>
            <section className="mt-36">
                <h2 className="text-center text-lg opacity-50 mb-14">With all self-hosted plans:</h2>
                <ul className="grid grid-cols-3 gap-12">
                    <li className="flex space-x-4">
                        <ServerLocked className="flex-shrink-0" />
                        <div className="opacity-75">
                            <h3 className="text-base ">Data stays on your infrastructure</h3>
                            <p className="text-[14px]">
                                Breeze through SOC 2 and HIPAA audits by eliminating a handful of subprocessors.
                            </p>
                        </div>
                    </li>
                    <li className="flex space-x-4">
                        <WebCode className="flex-shrink-0" />
                        <div className="opacity-75">
                            <h3 className="text-base ">Full access to production instance</h3>
                            <p className="text-[14px]">
                                Audit code running on your servers for compliance and security.
                            </p>
                        </div>
                    </li>
                    <li className="flex space-x-4">
                        <Prohibited className="flex-shrink-0" />
                        <div className="opacity-75">
                            <h3 className="text-base ">No third-party cookies</h3>
                            <p className="text-[14px]">
                                By hosting yourself, PostHog’s tracking code is less susceptible to browser privacy
                                features and ad blockers.
                            </p>
                        </div>
                    </li>
                </ul>
            </section>
        </>
    )
}

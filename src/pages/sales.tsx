import Layout from 'components/Layout'
import React, { useEffect, useState } from 'react'
import SEO from 'components/seo'
import Link from 'components/Link'
import { ArcherContainer, ArcherElement } from 'react-archer'

const Step = ({ who, number, target, title, children }) => {
    return (
        <div className="relative pl-16 pt-2 [&_p]:mb-2">
            <ArcherElement
                id={`${who}-${number}`}
                relations={[
                    {
                        targetId: `${who}-${number}b`,
                        sourceAnchor: 'bottom',
                        targetAnchor: 'left',
                        style: { strokeDasharray: '5,5' },
                    },
                ]}
            >
                <span className="absolute top-0 left-0 text-2xl text-black size-12 flex justify-center items-center font-bold bg-yellow rounded-full border-3 border-black">
                    {number}
                </span>
            </ArcherElement>
            <h3>{title}</h3>
            {children}
            <ArcherElement
                id={`${who}-${number}b`}
                relations={[
                    {
                        targetId: `${who}-${number}c`,
                        targetAnchor: 'left',
                        sourceAnchor: 'right',
                        style: { strokeDasharray: '5,5' },
                    },
                ]}
            >
                <span className="b-trigger size-0 absolute left-10 bottom-10"></span>
            </ArcherElement>
            <ArcherElement
                id={`${who}-${number}c`}
                relations={[
                    {
                        targetId: target,
                        targetAnchor: 'left',
                        sourceAnchor: 'right',
                        style: { strokeDasharray: '5,5' },
                    },
                ]}
            >
                <span className="b-trigger size-0 absolute left-30 -bottom-10"></span>
            </ArcherElement>
        </div>
    )
}

function Sales() {
    return (
        <Layout>
            <SEO title="Sales at PostHog" description='How we do "sales"' image={`/images/og/terms.png`} />
            <div>
                <div className="max-w-2xl mx-auto py-8 px-4 md:px-8">
                    <h1 className="text-5xl text-center">
                        Sales,{' '}
                        <span className="whitespace-nowrap text-red dark:text-yellow">
                            <em>PostHog style</em>
                        </span>
                    </h1>
                    <p>
                        <strong>So you want to evaluate PostHog, maybe get a demo, or ask a question.</strong>
                    </p>
                    <p>
                        We don’t want to waste your time, so we’ve gone to great lengths to make sure this process is
                        hassle-free. This means our process is vastly differently than most B2B SaaS companies.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <ArcherContainer strokeColor="red" endMarker={false}>
                        <div className="grid grid-cols-2">
                            <Step who="them" number="1" target="them-2" title='"I have a question about the product."'>
                                <p>
                                    You click ‘contact us’ and type in a bunch of personal information that has nothing
                                    to do with your use of the product.
                                </p>
                                <p>Often times, there's no place to even ask your question.</p>
                                <p>Your phone number is required, even though they’ll respond by email.</p>
                            </Step>
                            <div></div>

                            <div></div>
                            <Step who="them" number="2" target="them-3" title="The discovery call">
                                <p>Get booked with a junior rep who decides if you are a worthy human being.</p>
                                <p>They will ask you the same questions you already filled out on the form.</p>
                            </Step>

                            <Step who="them" number="3" target="them-4" title="Finally, the demo!">
                                <p>
                                    Deemed worthy? They will book you into a further call for a demo with a different
                                    person, five minutes of which will cover what you are specifically interested in.
                                </p>
                                <p>
                                    No pricing will be revealed. You will be asked the same questions for a third time.
                                </p>
                            </Step>
                            <div></div>
                        </div>
                    </ArcherContainer>
                </div>
            </div>
        </Layout>
    )
}

export default Sales

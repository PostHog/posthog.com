import React, { useState, useEffect } from 'react'
import Layout from 'components/Layout'
import { heading } from 'components/Home/classes'
import { SEO } from 'components/seo'
import { sexyLegalMenu } from '../navs'
import Tooltip from 'components/Tooltip'
import { IconInfo } from '@posthog/icons'
import { TrackedCTA } from 'components/CallToAction'

function BAAGenerator() {
    const [companyName, setCompanyName] = useState('')
    const [yourName, setYourName] = useState('')
    const [yourTitle, setYourTitle] = useState('')
    const [email, setEmail] = useState('')
    const [isFormComplete, setIsFormComplete] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (window.posthog) {
            window.posthog.capture('submit_baa_request', {
                company_name: companyName,
                full_name: yourName,
                title: yourTitle,
                email,
            })
        }
        setSubmitted(true)
    }

    useEffect(() => {
        setIsFormComplete(!!companyName && !!yourName && !!yourTitle && !!email)
    }, [companyName, yourName, yourTitle, email])

    return (
        <Layout
            headerBlur={false}
            parent={sexyLegalMenu}
            activeInternalMenu={sexyLegalMenu.children.find(({ name }) => name.toLowerCase().includes('baa'))}
        >
            <SEO
                title="BAA Generator"
                description="PostHog's Business Associate Agreement (BAA) generator."
                image={`/images/og/dpa.png`}
            />

            <header className="print:hidden text-center mt-8">
                <h1 className={`${heading()} overflow-hidden pt-8 pb-1`}>
                    BAA? Try BA<em className="text-red">YAY</em>!
                </h1>
                <h2 className="mt-2 text-xl opacity-75 font-semibold leading-tight">
                    Generate a Business Associate Agreement (BAA) for your organization in seconds.
                </h2>
            </header>

            <section className="grid md:grid-cols-5 2xl:grid-cols-4 relative items-start mt-12 gap-4">
                <div className="@container md:col-span-2 2xl:col-span-1 px-4 lg:px-8 md:py-4 md:max-h-screen md:overflow-auto md:sticky top-0">
                    <h2 className="mb-1 text-xl">Enter your company details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-5 gap-2 items-center">
                            <label className="col-span-5 @sm:col-span-2 text-sm" htmlFor="companyName">
                                Company Name
                            </label>
                            <input
                                id="companyName"
                                type="text"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="col-span-5 @sm:col-span-3 mb-2 bg-accent rounded border border-light hover:border-black/50 text-black"
                                required
                            />

                            <label className="col-span-5 @sm:col-span-2 text-sm" htmlFor="yourName">
                                Your Full Name
                            </label>
                            <input
                                id="yourName"
                                type="text"
                                value={yourName}
                                onChange={(e) => setYourName(e.target.value)}
                                className="col-span-5 @sm:col-span-3 mb-2 bg-accent rounded border border-light hover:border-black/50 text-black"
                                required
                            />

                            <label className="col-span-5 @sm:col-span-2 text-sm" htmlFor="yourTitle">
                                Title
                            </label>
                            <input
                                id="yourTitle"
                                type="text"
                                value={yourTitle}
                                onChange={(e) => setYourTitle(e.target.value)}
                                className="col-span-5 @sm:col-span-3 mb-2 bg-accent rounded border border-light hover:border-black/50 text-black"
                                required
                            />

                            <label className="col-span-5 @sm:col-span-2 text-sm" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="col-span-5 @sm:col-span-3 mb-2 bg-accent rounded border border-light hover:border-black/50 text-black"
                                required
                            />
                        </div>

                        <TrackedCTA
                            type="primary"
                            size="sm"
                            disabled={!isFormComplete}
                            event={{ name: 'submitted BAA' }}
                            className="mt-4"
                            onClick={handleSubmit}
                        >
                            Submit
                        </TrackedCTA>
                        {submitted && (
                            <p className="mt-4 text-green-700 font-semibold">
                                Thank you! Your BAA request has been received.
                            </p>
                        )}
                    </form>
                </div>

                <div className="md:col-span-3 bg-white text-primary px-4 md:px-8 pt-4 border-y md:border-y-0 border-light dark:border-dark md:shadow-xl rounded relative">
                    <div className="text-lg font-bold mb-4">Preview</div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Business Associate Agreement Preview</h2>
                        <p>
                            This Business Associate Agreement ("Agreement") is entered into by and between
                            <strong> {companyName || '[Company Name]'} </strong>
                            ("Covered Entity") and <strong>PostHog, Inc.</strong> ("Business Associate").
                        </p>
                        <p>
                            This Agreement is effective as of the date signed by Covered Entity’s representative,
                            <strong> {yourName || '[Representative Name]'} </strong>, titled
                            <strong> {yourTitle || '[Title]'} </strong>.
                        </p>
                        <p>
                            This Agreement is entered into for the purpose of ensuring that Business Associate will
                            appropriately safeguard Protected Health Information (PHI) as required by the Health
                            Insurance Portability and Accountability Act of 1996 (HIPAA).
                        </p>
                        <p>
                            Capitalized terms used in this Agreement and not otherwise defined shall have the meanings
                            ascribed to them in HIPAA.
                        </p>
                        <p>[Full text of the BAA continues here, same as from the DOCX...]</p>
                        <div className="mt-8">
                            <p className="mb-2 font-semibold">Signed by Covered Entity:</p>
                            <p className="border-b border-black w-2/3 mb-1">{yourName || '[Representative Name]'}</p>
                            <p className="border-b border-black w-2/3 mb-1">{yourTitle || '[Title]'}</p>
                            <p className="border-b border-black w-2/3">{email || '[Email Address]'}</p>

                            <p className="mt-6 mb-2 font-semibold">Signed by Business Associate:</p>
                            <p className="border-b border-black w-2/3 mb-1">Hector Rodriguez</p>
                            <p className="border-b border-black w-2/3">Legal & Compliance Manager</p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default BAAGenerator

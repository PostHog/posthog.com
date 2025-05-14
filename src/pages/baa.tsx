import React, { useState, useEffect, useRef } from 'react'
import Layout from 'components/Layout'
import { heading } from 'components/Home/classes'
import { SEO } from 'components/seo'
import { sexyLegalMenu } from '../navs'
import Tooltip from 'components/Tooltip'
import { IconInfo } from '@posthog/icons'

function BAAGenerator() {
    const [companyName, setCompanyName] = useState('')
    const [yourName, setYourName] = useState('')
    const [yourTitle, setYourTitle] = useState('')
    const [email, setEmail] = useState('')
    const [mode, setMode] = useState('pretty')
    const [isFormComplete, setIsFormComplete] = useState(false)

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

            <div className="grid md:grid-cols-2 gap-6">
                {/* FORM */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <h1 className={`${heading()} mt-8 mb-4`}>Generate your BAA</h1>

                    <label className="block">
                        <span className="font-semibold">Company Name</span>
                        <input
                            className="w-full border px-3 py-2 rounded"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            required
                        />
                    </label>
                    <label className="block">
                        <span className="font-semibold">Your Full Name</span>
                        <input
                            className="w-full border px-3 py-2 rounded"
                            value={yourName}
                            onChange={(e) => setYourName(e.target.value)}
                            required
                        />
                    </label>
                    <label className="block">
                        <span className="font-semibold">Your Title</span>
                        <input
                            className="w-full border px-3 py-2 rounded"
                            value={yourTitle}
                            onChange={(e) => setYourTitle(e.target.value)}
                            required
                        />
                    </label>
                    <label className="block">
                        <span className="font-semibold">Email Address</span>
                        <input
                            type="email"
                            className="w-full border px-3 py-2 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </label>

                    <button
                        type="submit"
                        className="bg-primary text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                        disabled={!isFormComplete}
                    >
                        Submit
                    </button>
                </form>

                {/* PREVIEW */}
                <div className="border border-dashed rounded p-6 bg-white">
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
                        appropriately safeguard Protected Health Information (PHI) as required by the Health Insurance
                        Portability and Accountability Act of 1996 (HIPAA).
                    </p>

                    {/* Insert rest of BAA text here, styled as paragraphs */}
                    <p>
                        Capitalized terms used in this Agreement and not otherwise defined shall have the meanings
                        ascribed to them in HIPAA.
                    </p>

                    <p>
                        1. <strong>Permitted Uses and Disclosures</strong>. Business Associate may use or disclose PHI
                        only as permitted under this Agreement, or as required by law.
                    </p>

                    <p>
                        2. <strong>Safeguards</strong>. Business Associate shall implement appropriate administrative,
                        physical, and technical safeguards to protect PHI.
                    </p>

                    {/* ... continue inserting BAA text from the DOCX ... */}

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
        </Layout>
    )
}

export default BAAGenerator

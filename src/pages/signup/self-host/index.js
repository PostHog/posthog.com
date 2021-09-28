import { heading, section } from 'components/Home/classes'
import Logo from 'components/Logo'
import { Enterprise, OpenSource, Scale } from 'components/Pricing/PricingTable/Plans'
import ScaleModal from 'components/Pricing/PricingTable/ScaleModal'
import { SEO } from 'components/seo'
import Layout from 'components/SignUp/Layout'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import React, { useState } from 'react'

export default function SelfHost() {
    const { posthog } = useValues(posthogAnalyticsLogic)
    const [open, setOpen] = useState(false)
    const setModalOpen = (state) => {
        setOpen(state)
        if (state) {
            posthog?.capture('opened pricing modal')
        }
    }
    return (
        <Layout
            crumbs={[
                {
                    title: 'Get started',
                    url: '/signup',
                },
                {
                    title: 'Self-host',
                },
            ]}
        >
            <SEO title="Self-host - PostHog" />
            <ScaleModal hideBadge hideActions setOpen={setModalOpen} open={open} />
            <section className="px-4">
                <div className={section('md:my-[87px]')}>
                    <Logo className="mx-auto" />
                    <h1 className={heading('md', 'primary', 'mt-16')}>Select your edition</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <OpenSource />
                    <Scale setOpen={setModalOpen} />
                    <Enterprise />
                </div>
                <p className="text-center mt-16 font-semibold text-black text-opacity-50">
                    You can change your plan later.
                </p>
            </section>
        </Layout>
    )
}

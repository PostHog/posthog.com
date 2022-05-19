import { Enterprise, OpenSource, Scale } from 'components/Pricing/PricingTable/Plans'
import ScaleModal from 'components/Pricing/PricingTable/ScaleModal'
import { SEO } from 'components/seo'
import Intro from 'components/SignUp/Intro'
import Layout from 'components/SignUp/Layout'
import React, { useState } from 'react'
import EnterpriseModal from '../../../components/Pricing/PricingTable/EnterpriseModal'

export default function SelfHost() {
    const [scaleOpen, setScaleOpen] = useState(false)
    const [enterpriseOpen, setEnterpriseOpen] = useState(false)

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
            <ScaleModal setOpen={setScaleOpen} open={scaleOpen} hideActions hideBadge={false} />
            <EnterpriseModal setOpen={setEnterpriseOpen} open={enterpriseOpen} hideActions hideBadge={false} />
            <section className="px-4">
                <Intro title="Select your edition" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <OpenSource />
                    <Scale setOpen={setScaleOpen} />
                    <Enterprise setOpen={setEnterpriseOpen} />
                </div>
                <p className="text-center mt-8 md:mt-16 font-semibold text-black text-opacity-50">
                    You can change your plan later.
                </p>
            </section>
        </Layout>
    )
}

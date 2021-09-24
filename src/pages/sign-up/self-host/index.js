import React, { useState } from 'react'
import Layout from 'components/SignUp/Layout'
import { section, heading } from 'components/Home/classes'
import Logo from 'components/Logo'
import { OpenSource, Scale, Enterprise } from 'components/Pricing/PricingTable/Plans'
import ScaleModal from 'components/Pricing/PricingTable/ScaleModal'

export default function SelfHost() {
    const [open, setOpen] = useState(false)
    return (
        <Layout
            crumbs={[
                {
                    title: 'Get started',
                    url: '/sign-up',
                },
                {
                    title: 'Self-host',
                },
            ]}
        >
            <ScaleModal hideBadge hideActions setOpen={setOpen} open={open} />
            <section className="px-10">
                <div className={section()}>
                    <Logo className="mx-auto" />
                    <h1 className={heading('md', 'primary', 'mt-16')}>Select your edition</h1>
                </div>
                <div className="grid grid-cols-3">
                    <OpenSource />
                    <Scale setOpen={setOpen} />
                    <Enterprise />
                </div>
            </section>
        </Layout>
    )
}

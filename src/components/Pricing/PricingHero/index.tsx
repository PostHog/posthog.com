import React from 'react'

import { Header } from '../../Header'
import { Structure } from '../../Structure'

export const PricingHero = () => {
    return (
        <div className="pricing-hero text-white text-center">
            <Header
                onPostPage={false}
                isBlogArticlePage={false}
                isHomePage={true}
                menuActiveKey="active"
                transparentBackground={true}
            />

            <Structure.Section width="4xl" className="py-12">
                <Structure.SectionHeader
                    title="Simple pricing for powerful analytics"
                    titleTag="h1"
                    titleClassName="mb-2"
                    leadText="There are different ways to run PostHog, but you’ll get the same product suite."
                />
            </Structure.Section>
        </div>
    )
}

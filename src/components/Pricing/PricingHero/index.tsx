import React from 'react'

import { Header } from '../../Header'
import { Structure } from '../../Structure'

export const PricingHero = () => {
    return (
        <div className="pricing-hero text-center relative">
            <Header
                onPostPage={false}
                isBlogArticlePage={false}
                isHomePage={true}
                menuActiveKey="active"
                transparentBackground={true}
            />

            <Structure.Section width="4xl" className="pt-12">
                <Structure.SectionHeader
                    title="Simple pricing for powerful analytics"
                    titleTag="h1"
                    titleClassName="mb-2"
                    leadText="Get the same product suite no matter how you run PostHog."
                    style
                />
            </Structure.Section>
        </div>
    )
}

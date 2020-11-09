import React from 'react'
import '../styles/features.scss'
import Layout from '../../components/Layout'
import { OtherFeaturesBlock } from '../../components/OtherFeaturesBlock'
import { PageHeader } from '../../components/PageHeader'
import { Spacer } from '../../components/Spacer'
import { FeaturedSectionTextLeft } from '../../components/Sections/FeaturedSectionTextLeft'
import { FeaturedSectionTextRight } from '../../components/Sections/FeaturedSectionTextRight'
import selfHostedImg1 from '../../images/self-hosted-1.svg'
import selfHostedImg2 from '../../images/self-hosted-2.svg'
import selfHostedImg3 from '../../images/self-hosted-3.svg'
import { StartNowButton } from '../../components/StartNowButton'

function ProductFeatures() {
    return (
        <Layout>
            <PageHeader
                title="Self-Hosted"
                tagline="Powerful analytics on your own infrastructure, with all the features your team needs."
                styleKey="selfHosted"
                bgColor="navy"
            />
            <div className="featuresWrapper">
                <Spacer />
                <FeaturedSectionTextLeft
                    headerText="Take control of your data"
                    listItem="01"
                    descriptionText={`When you self-host, your data is all yours. This means your users’ data is not sent to any third-party, not even PostHog. The privacy of your users is preserved, and it is easier to comply with legislation such as GDPR and cookie laws.`}
                    image={selfHostedImg1}
                    color="red"
                />
                <Spacer onlyDesktop={true} />
                <FeaturedSectionTextRight
                    headerText="Deploy in your own way"
                    listItem="02"
                    descriptionText={`We strive to make our deployment process as simple as possible. As a result, we offer a wide variety of ways to deploy PostHog, so you can pick the one that suits you best. Additionally, it’s up to you where you deploy it! This gives you more freedom and prevents PostHog from disrupting your tech stack.`}
                    image={selfHostedImg2}
                    color="red"
                />
                <Spacer onlyDesktop={true} />
                <FeaturedSectionTextLeft
                    headerText="Perform powerful analytics your entire team can use"
                    listItem="03"
                    descriptionText={`When you self-host, your data is all yours. This means your users’ data is not sent to any third-party, not even PostHog. The privacy of your users is preserved, and it is easier to comply with legislation such as GDPR and cookie laws. `}
                    image={selfHostedImg3}
                    color="red"
                />
                <Spacer onlyDesktop={true} />
                <StartNowButton />
                <OtherFeaturesBlock currentPageKey="self-hosted" />
            </div>
        </Layout>
    )
}

export default ProductFeatures

import React from 'react'
import '../styles/features.css'
import '../../components/Layout/Layout.css'
import Layout from '../../components/Layout'
import { OtherFeaturesBlock } from '../../components/OtherFeaturesBlock'
import { PageHeader } from '../../components/PageHeader'
import { Spacer } from '../../components/Spacer'
import { FeaturedSectionTextLeft } from '../../components/Sections/FeaturedSectionTextLeft'
import { FeaturedSectionTextRight } from '../../components/Sections/FeaturedSectionTextRight'
import trendsImg1 from '../../images/trends-1.svg'
import trendsImg2 from '../../images/trends-2.svg'
import trendsImg3 from '../../images/trends-3.svg'
import { StartNowButton } from '../../components/StartNowButton'

function ProductFeatures() {
    return (
        <Layout>
            <PageHeader
                title="Trends"
                tagline="Understand what parts of your app are engaging, and what areas still need some work."
                styleKey="trends"
                bgColor="yellow"
            />
            <div className="featuresWrapper">
                <Spacer />
                <FeaturedSectionTextLeft
                    headerText="Monitor engagement with your app"
                    listItem="01"
                    descriptionText={`Knowing how your users interact with your app is key to understanding what you’re doing right and what you’re doing wrong. With trends, PostHog lets you determine what areas of your app are particularly engaging, as well as those that need improving to attract more usage.`}
                    image={trendsImg1}
                    color="red"
                />
                <Spacer onlyDesktop={true} />
                <FeaturedSectionTextRight
                    headerText="Understand how your app is being used over time"
                    listItem="02"
                    descriptionText={`With trend stickiness, PostHog lets you understand how trends in user engagement with your app evolve over time. It is easy to identify patterns regarding which parts of your products are being used repeatedly and what aspects don’t drive as much engagement.`}
                    image={trendsImg2}
                    color="red"
                />
                <Spacer onlyDesktop={true} />
                <FeaturedSectionTextLeft
                    headerText="Visualize how your changes affect the UX"
                    listItem="03"
                    descriptionText={`When you make changes to your app, it is important to identify how those changes affect the experience of your users. With trends and trend segmentation, PostHog let’s you assess the impact of new features, changes, and various user properties on how people are using your app.`}
                    image={trendsImg3}
                    color="red"
                />
                <Spacer onlyDesktop={true} />
                <StartNowButton />
                <OtherFeaturesBlock currentPageKey="trends" />
            </div>
        </Layout>
    )
}

export default ProductFeatures

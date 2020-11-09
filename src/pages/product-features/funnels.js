import React from 'react'
import '../styles/features.scss'
import Layout from '../../components/Layout'
import { OtherFeaturesBlock } from '../../components/OtherFeaturesBlock'
import { PageHeader } from '../../components/PageHeader'
import { Spacer } from '../../components/Spacer'
import { FeaturedSectionTextLeft } from '../../components/Sections/FeaturedSectionTextLeft'
import { FeaturedSectionTextRight } from '../../components/Sections/FeaturedSectionTextRight'
import funnelsImg1 from '../../images/funnels-1-mobile.svg'
import funnelsImg2 from '../../images/funnels-2-mobile.svg'
import funnelsImg3 from '../../images/funnels-3-mobile.svg'
import { StartNowButton } from '../../components/StartNowButton'

function FunnelsPage() {
    return (
        <Layout>
            <PageHeader
                title="Funnels"
                tagline="Visualize users going through a multi-step process in your app and figure out where they’re dropping off."
                styleKey="funnels"
                bgColor="navy"
            />
            <div className="featuresWrapper">
                <Spacer />
                <FeaturedSectionTextLeft
                    headerText="Visualize user behavior step-by-step"
                    listItem="01"
                    descriptionText={`PostHog funnels offer you a visual representation of the flow of users through specific
                    areas of your app, such as the sign up process. They allow you to understand what percentage
                    of users go from one step to another, so you can identify any areas for improvement in
                    multi-step processes.`}
                    image={funnelsImg1}
                    color="red"
                />
                <Spacer onlyDesktop={true} />
                <FeaturedSectionTextRight
                    headerText="Understand where users drop off"
                    listItem="02"
                    descriptionText={`Funnels are especially useful for understanding at which step of a process users are
                    dropping off. They can help you identify points that need attention in order to improve
                    conversion rates, or simply make the app more friendly to use.`}
                    image={funnelsImg2}
                    color="red"
                />
                <Spacer onlyDesktop={true} />
                <FeaturedSectionTextLeft
                    headerText="Improve your app’s UX"
                    listItem="03"
                    descriptionText={`In PostHog, you can see an aggregate view of all your users going through a funnel, filter
                    them by a certain property, or even see each user individually! This makes it easy to
                    identify accessibility issues, or areas where information might be unclear. With funnels,
                    you can identify patterns, polish the UX, and improve conversion.`}
                    image={funnelsImg3}
                    color="red"
                />
                <Spacer onlyDesktop={true} />
                <StartNowButton />
                <OtherFeaturesBlock currentPageKey="funnels" />
            </div>
        </Layout>
    )
}

export default FunnelsPage

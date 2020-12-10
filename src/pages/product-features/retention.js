import React from 'react'
import '../styles/features.scss'
import Layout from '../../components/Layout'
import { OtherFeaturesBlock } from '../../components/OtherFeaturesBlock'
import { PageHeader } from '../../components/PageHeader'
import { Spacer } from '../../components/Spacer'
import { FeaturedSectionTextLeft } from '../../components/Sections/FeaturedSectionTextLeft'
import { FeaturedSectionTextRight } from '../../components/Sections/FeaturedSectionTextRight'
import retentionImg1 from '../../images/retention-2.svg'
import retentionImg2 from '../../images/retention-1.svg'
import retentionImg3 from '../../images/retention-3.svg'
import { StartNowButton } from '../../components/StartNowButton'

function RetentionPage() {
    return (
        <Layout>
            <PageHeader
                title="Retention"
                tagline="Understand what percentage of users you’re retaining, and who are the ones you’re not."
                styleKey="retention"
                bgColor="red"
            />
            <div className="featuresWrapper">
                <Spacer />
                <FeaturedSectionTextLeft
                    headerText="See how well you’re retaining users"
                    listItem="01"
                    descriptionText={`An essential word in analytics is retention. It is not a good sign if your users try your app once and never come back. With our retention tables, you can easily determine what percentage of your users are being retained, as well as how retention rates evolve over time.`}
                    image={retentionImg1}
                    color="red"
                />
                <Spacer onlyDesktop={true} height={125} />
                <FeaturedSectionTextRight
                    headerText="Understand what keeps users coming back"
                    listItem="02"
                    descriptionText={`Paired with other PostHog features such as Trend Stickiness, Feature Flags, and Annotations, retention tables allow you to determine what helps improve your retention rate, as well as what is harmful to it. By experimenting with how different features impact retention, you can work towards creating an app that users want to keep coming back to.`}
                    image={retentionImg2}
                    color="red"
                />
                <Spacer onlyDesktop={true} height={125} />
                <FeaturedSectionTextLeft
                    headerText="Identify the types of users you’re losing"
                    listItem="03"
                    descriptionText={`Retention tables don’t only help you determine how many users you’re losing - they also help you determine who those users are. With the help of filters, you can determine patterns regarding what type of users you’re retaining, and which users you’re losing. `}
                    image={retentionImg3}
                    color="red"
                />
                <Spacer onlyDesktop={true} height={125} />
                <StartNowButton />
                <OtherFeaturesBlock currentPageKey="retention" />
            </div>
        </Layout>
    )
}

export default RetentionPage

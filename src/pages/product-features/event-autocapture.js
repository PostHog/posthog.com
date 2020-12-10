import React from 'react'
import '../styles/features.scss'
import Layout from '../../components/Layout'
import { OtherFeaturesBlock } from '../../components/OtherFeaturesBlock'
import { PageHeader } from '../../components/PageHeader'
import { Spacer } from '../../components/Spacer'
import { FeaturedSectionTextLeft } from '../../components/Sections/FeaturedSectionTextLeft'
import { FeaturedSectionTextRight } from '../../components/Sections/FeaturedSectionTextRight'
import autocaptureImg1 from '../../images/event-autocapture-1.svg'
import autocaptureImg2 from '../../images/event-autocapture-2.svg'
import autocaptureImg3 from '../../images/event-autocapture-3.svg'
import { StartNowButton } from '../../components/StartNowButton'

function ProductFeatures() {
    return (
        <Layout>
            <PageHeader
                title="Event Autocapture"
                tagline="Less setup, more analytics. Start capturing relevant data from the moment setup is complete."
                styleKey="autocapture"
                bgColor="red"
            />
            <div className="featuresWrapper">
                <Spacer />
                <FeaturedSectionTextLeft
                    headerText="Get started with one click"
                    listItem="01"
                    descriptionText={`PostHog starts capturing events from the second the setup is complete - no extra steps required. We also provide various ways to deploy in just one click, such as Heroku, AWS, and Linode. This way, you can go from first hearing about PostHog to capturing your first event in less than an hour.`}
                    image={autocaptureImg1}
                    color="red"
                />
                <Spacer onlyDesktop={true} height={125} />
                <FeaturedSectionTextRight
                    headerText="Don't miss a thing"
                    listItem="02"
                    descriptionText={`Event autocapture means you don’t have to worry about missing important events while you figure out your setup. By default, PostHog captures a wide variety of events that are important to you, from page views to button clicks. As such, from the moment you deploy, you’re already gathering useful data!`}
                    image={autocaptureImg2}
                    color="red"
                />
                <Spacer onlyDesktop={true} height={125} />
                <FeaturedSectionTextLeft
                    headerText="Customize as you wish"
                    listItem="03"
                    descriptionText={`Event autocapture is a great way to get started, but you might want some added customization to improve your analytics processes. With PostHog you can set up actions for new or already-existing events. This helps you filter through autocaptured events, as well as create more complex logic that isn’t possible with just autocapture.`}
                    image={autocaptureImg3}
                    color="red"
                />
                <Spacer onlyDesktop={true} height={125} />
                <StartNowButton />
                <OtherFeaturesBlock currentPageKey="autocapture" />
            </div>
        </Layout>
    )
}

export default ProductFeatures

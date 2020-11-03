import React from 'react'
import '../styles/features.scss'
import Layout from '../../components/Layout'
import { OtherFeaturesBlock } from '../../components/OtherFeaturesBlock'
import { PageHeader } from '../../components/PageHeader'
import { FeaturedSectionTextLeft } from '../../components/Sections/FeaturedSectionTextLeft'
import { FeaturedSectionTextRight } from '../../components/Sections/FeaturedSectionTextRight'
import { Spacer } from '../../components/Spacer'
import sessionRecordingImg1 from '../../images/session-recording-3.svg'
import sessionRecordingImg2 from '../../images/session-recording-2.svg'
import sessionRecordingImg3 from '../../images/session-recording-1.svg'
import { StartNowButton } from '../../components/StartNowButton'

function SessionRecordingPage() {
    return (
        <Layout>
            <PageHeader
                title="Session Recording"
                tagline="Watch how real users use your product"
                styleKey="sessionRecording"
                bgColor="yellow"
            />
            <div className="featuresWrapper">
                <Spacer />
                <FeaturedSectionTextLeft
                    headerText="Experience user pain points first-hand"
                    listItem="01"
                    descriptionText={``}
                    image={sessionRecordingImg1}
                    color="red"
                />
                <Spacer onlyDesktop={true} />
                <FeaturedSectionTextRight
                    headerText="Track down bugs faster"
                    listItem="02"
                    descriptionText={``}
                    image={sessionRecordingImg2}
                    color="red"
                />
                <Spacer onlyDesktop={true} />
                <FeaturedSectionTextLeft
                    headerText="Ensure privacy for your users"
                    listItem="03"
                    descriptionText={``}
                    image={sessionRecordingImg3}
                    color="red"
                />
                <Spacer onlyDesktop={true} />
                <StartNowButton />
                <OtherFeaturesBlock currentPageKey="feature-flags" />
            </div>
        </Layout>
    )
}

export default SessionRecordingPage

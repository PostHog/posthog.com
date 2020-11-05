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
                    descriptionText={`
                        With session recording, you don't need to guess what your users are doing - you can just watch it. 
                        See exactly where users are gettng stuck, what parts of your UI are confusing, and how you can make your 
                        UX more intuitive.
                    `}
                    image={sessionRecordingImg1}
                    color="red"
                />
                <Spacer onlyDesktop={true} />
                <FeaturedSectionTextRight
                    headerText="Track down bugs faster"
                    listItem="02"
                    descriptionText={`
                        No more debugging in production with user screenshots and cryptic logs. When watching a recording you 
                        can see exactly where users encountered bugs, what went wrong in your app, and how to reproduce errors. 
                    `}
                    image={sessionRecordingImg2}
                    color="red"
                />
                <Spacer onlyDesktop={true} />
                <FeaturedSectionTextLeft
                    headerText="Ensure privacy for your users"
                    listItem="03"
                    descriptionText={`
                        Reap the benefits of session recording while only recording what you really need to. Toggle session 
                        recording on and off as needed and avoid capturing any sensitive information by customizing what elements
                        should not be included in recordings.
                    `}
                    image={sessionRecordingImg3}
                    color="red"
                />
                <Spacer onlyDesktop={true} />
                <StartNowButton />
                <OtherFeaturesBlock currentPageKey="session-recording" />
            </div>
        </Layout>
    )
}

export default SessionRecordingPage

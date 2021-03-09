import React from 'react'
import '../styles/features.scss'
import Layout from '../../components/Layout'
import { OtherFeaturesBlock } from '../../components/OtherFeaturesBlock'
import { PageHeader } from '../../components/PageHeader'
import { FeaturedSectionTextLeft } from '../../components/Sections/FeaturedSectionTextLeft'
import { FeaturedSectionTextRight } from '../../components/Sections/FeaturedSectionTextRight'
import { Spacer } from '../../components/Spacer'
import pluginsImg1 from '../../images/plugins-1.svg'
import pluginsImg2 from '../../images/plugins-2.svg'
import pluginsImg3 from '../../images/plugins-3.svg'
import { StartNowButton } from '../../components/StartNowButton'

function PluginsPage() {
    return (
        <Layout>
            <PageHeader
                title="Plugins"
                tagline="Build on top of a robust platform and customize PostHog as you wish"
                styleKey="plugins"
                bgColor="red"
            />
            <div className="featuresWrapper">
                <Spacer />
                <FeaturedSectionTextLeft
                    headerText="Enrich your event data"
                    listItem="01"
                    descriptionText={`
                        Plugins allow you to pull data from other sources to enrich your events before they are processed by PostHog,
                        letting you add external data to improve your analytics processes. If you have relevant data somewhere else
                        or want to hit an API for some extra information, you can do so with plugins.  
                    `}
                    image={pluginsImg1}
                    color="red"
                />
                <Spacer onlyDesktop={true} height={125} />
                <FeaturedSectionTextRight
                    headerText="Send data to other platforms seamlessly"
                    listItem="02"
                    descriptionText={`
                        Do you need your PostHog data somewhere else? Maybe a data warehouse or BI tool? With plugins you can 
                        create triggers to send events elsewhere as they come into PostHog, making sure your data gets exactly
                        where it needs to be.
                    `}
                    image={pluginsImg2}
                    color="red"
                />
                <Spacer onlyDesktop={true} height={125} />
                <FeaturedSectionTextLeft
                    headerText="Build your own plugins with ease"
                    listItem="03"
                    descriptionText={`
                        Our plugins are JavaScript-based, making it easily accessible for anyone to build their own plugin.
                        If you have a use-case that isn't met by the existing plugins, why not build your own? 
                    `}
                    image={pluginsImg3}
                    color="red"
                />
                <Spacer onlyDesktop={true} height={125} />
                <StartNowButton />
                <OtherFeaturesBlock currentPageKey="plugins" />
            </div>
        </Layout>
    )
}

export default PluginsPage

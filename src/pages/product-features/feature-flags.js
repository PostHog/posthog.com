import React from 'react'
import { Link } from 'gatsby'
import '../styles/features.css'
import '../../components/Layout/Layout.css'
import Layout from '../../components/Layout'
import Button from 'antd/lib/button'
import rays from '../../images/rays.svg'
import { OtherFeaturesBlock } from '../../components/OtherFeaturesBlock'
import { PageHeader } from '../../components/PageHeader'
import { FeaturedSectionTextLeft } from '../../components/Sections/FeaturedSectionTextLeft'
import { FeaturedSectionTextRight } from '../../components/Sections/FeaturedSectionTextRight'
import { Spacer } from '../../components/Spacer'
import featureFlagsImg1 from '../../images/feature-flags-1.svg'
import featureFlagsImg2 from '../../images/feature-flags-2.svg'
import featureFlagsImg3 from '../../images/feature-flags-3.svg'

function ProductFeatures() {
    return (
        <Layout>
            <PageHeader
                title="Feature Flags"
                tagline="Release new features slowly to your users, see how they perform, and roll them back if you need to."
                styleKey="featureFlags"
                bgColor="yellow"
            />
            <Spacer />
            <FeaturedSectionTextLeft
                headerText="Roll out features at your own pace"
                listItem="01"
                descriptionText={`Releasing new features can be difficult. As much as your team may find the feature amazing,
                    you cannot be sure of how it will impact your users. With feature flags, rolling out new
                    features becomes less stressful. You can choose to slowly roll out features to a certain
                    percentages of your users, and increase or decrease that percentage accordingly.`}
                image={featureFlagsImg1}
                color="red"
            />
            <Spacer onlyDesktop={true} />
            <FeaturedSectionTextRight
                headerText="See how new features affect the UX"
                listItem="02"
                descriptionText={`Maybe you want to see how your users react to different text on a button, or a new navbar
                    style. With feature flags, you can roll out a change to only a percentage of users and see
                    how that affects the UX through the various analytics tools PostHog provides. You can then
                    decide to fully implement the change or simply roll it back.`}
                image={featureFlagsImg2}
                color="red"
            />
            <Spacer onlyDesktop={true} />
            <FeaturedSectionTextLeft
                headerText="Safely roll back features"
                listItem="03"
                descriptionText={`Maybe your new feature didn’t turn out to be as exciting to your users, or perhaps it still
                    needs a few tweaks. No problem. Safely roll back features without serious consequences and
                    only make definite changes to your app when you’re certain they’re good to go!`}
                image={featureFlagsImg3}
                color="red"
            />
            <div className="startNowWrapper">
                <div className="startNowRow">
                    <Link to="/trial/">
                        <Button type="primary" className="startNowButton">
                            Start now
                        </Button>
                    </Link>
                    <img src={rays} />
                </div>
            </div>
            <OtherFeaturesBlock currentPageKey="feature-flags" />
        </Layout>
    )
}

export default ProductFeatures

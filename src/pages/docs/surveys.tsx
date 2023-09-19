import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import List from 'components/List'
import ResourceItem from 'components/Docs/ResourceItem'
import { CallToAction } from 'components/CallToAction'
import { docsMenu } from '../../navs'

type FeatureFlagsProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

export const Intro = ({ image = true }) => (
    <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded flex flex-col items-center md:flex-row gap-8 pt-2 mb-8">
        <div className="p-4 md:p-8 shrink-0">
            <h1 className="text-4xl mt-0 mb-2">Surveys</h1>
            <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
                Collect feedback from your users.
            </h3>
            <CallToAction to="/docs/surveys/installation">Create your first survey</CallToAction>
        </div>

        {image && (
            <figure className="m-0 p-0">
                <StaticImage
                    alt=""
                    placeholder="none"
                    quality={100}
                    className=""
                    src="../../components/Home/Slider/images/surveys-hog.png"
                />
            </figure>
        )}
    </div>
)

export const Content = () => {
    return <></>
}

const FeatureFlags: React.FC<FeatureFlagsProps> = () => {
    return (
        <Layout>
            <SEO title="Surveys - Docs - PostHog" />

            <PostLayout title={'Surveys'} hideSurvey hideSidebar>
                <Intro />
                <Content />
            </PostLayout>
        </Layout>
    )
}

export default FeatureFlags

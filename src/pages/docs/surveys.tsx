import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import List from 'components/List'
import ResourceItem from 'components/Docs/ResourceItem'
import { CallToAction } from 'components/CallToAction'
import { docsMenu } from '../../navs'
import { useLayoutData } from 'components/Layout/hooks'
import QuickLinks from 'components/QuickLinks'

type SurveysProps = {
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
                <CloudinaryImage
                    alt=""
                    quality={100}
                    className=""
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/surveys-hog.png"
                />
            </figure>
        )}
    </div>
)

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    return (
        <>
            {compact && (
                <QuickLinks items={docsMenu.children.find(({ name }) => name.toLowerCase() === 'surveys')?.children} />
            )}
            <section className="mb-12">
                <h3 className="m-0 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="Get feedback and book user interviews with surveys"
                        description="Automate the process of finding the right users and booking interviews"
                        Image={
                            <CloudinaryImage
                                alt=""
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/surveys-hog.png"
                            />
                        }
                        url="/tutorials/feedback-interviews-site-apps"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to create custom surveys"
                        description="Customize the look and feel of your surveys"
                        Image={
                            <CloudinaryImage
                                alt=""
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/Slider/images/surveys-hog.png"
                            />
                        }
                        url="/tutorials/survey"
                    />
                </ul>
            </section>
            <section>
                <h3 className="mb-1 text-xl">Survey templates</h3>
                <p className="text-[15px]">Choose from many common survey types and launch them in a few clicks!</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        title="Net Promoter Score (NPS)"
                        description="The benchmark for judging what users think of you"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages/docs/images/nps-survey.png"
                            />
                        }
                        url="/templates/nps-survey"
                    />
                    <ResourceItem
                        title="Customer Satisfaction (CSAT)"
                        description="Get a vibe check on your product"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages/docs/images/csat-survey.png"
                            />
                        }
                        url="/templates/csat-survey"
                    />
                    <ResourceItem
                        title="Customer Churn Rate (CCR)"
                        description="Find out why your users are saying goodbye"
                        Image={
                            <CloudinaryImage
                                alt=""
                                className="h-full"
                                objectFit="contain"
                                quality={100}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages/docs/images/ccr-survey.png"
                            />
                        }
                        url="/templates/churn-survey"
                    />
                </ul>
                <CallToAction
                    to="/templates?filter=type&value=survey"
                    type="custom"
                    size="md"
                    className="group !bg-accent dark:!bg-accent-dark !border-light dark:!border-dark"
                    childClassName="text-primary/75 dark:text-primary-dark/75 group-hover:text-primary/100 dark:group-hover:text-primary-dark/100 !bg-white dark:!bg-dark !border-light dark:!border-dark"
                    width="[calc(100%_+_3px)]"
                >
                    Browse templates
                </CallToAction>
            </section>
        </>
    )
}

const Surveys: React.FC<SurveysProps> = () => {
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

export default Surveys

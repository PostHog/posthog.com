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

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    return (
        <>
            {compact && <QuickLinks items={docsMenu.children[5].children} />}
            <section className="mb-12">
                <h3 className="m-0 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="Get feedback and book user interviews with surveys"
                        description="Automate the process of finding the right users and booking interviews"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/surveys-hog.png"
                            />
                        }
                        url="/tutorials/feedback-interviews-site-apps"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to create custom surveys"
                        description="Customize the look and feel of your surveys"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/surveys-hog.png"
                            />
                        }
                        url="/tutorials/survey"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to show a survey after a delay"
                        description="Delay the display of your survey to improve user experience"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/surveys-hog.png"
                            />
                        }
                        url="/tutorials/delayed-survey"
                    />
                </ul>
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

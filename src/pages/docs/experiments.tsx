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

export const quickLinks = [
    {
        icon: 'GraduationCap',
        name: 'Start here',
        to: '/docs/experiments/hey',
        color: 'red',
    },
    {
        name: 'Product manual',
        to: '/docs/experiments/manual',
        description: 'How to run A/B tests with PostHog.',
    },
    {
        name: 'Creating an experiment',
        to: '/docs/experiments/manual#creating-an-experiment',
        description: 'Create an experiment to test a hypothesis.',
    },
    {
        name: 'Statistical significance',
        to: '/docs/experiments/significance',
        description: 'Notes on how to interpret statistical significance.',
    },
    {
        name: 'Under the hood',
        to: '/docs/experiments/under-the-hood',
        description: 'Detailed information on how experiments work',
    },
    {
        name: 'Common questions',
        to: '/docs/experiments/common-questions',
        description: 'Common questions when setting up experiments and how to solve them.',
    },
]

type ExperimentsProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

export const Intro = ({ image = true }) => (
    <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded flex flex-col items-center md:flex-row md:gap-4 pt-2 mb-8">
        <div className="p-4 md:p-8">
            <h1 className="text-4xl mt-0 mb-2">A/B testing</h1>
            <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
                Test changes in production with an experimentation suite that makes it easy to get the results you want.
            </h3>
            <CallToAction to="/docs/experiments/installation">Roll out your first experiment</CallToAction>
        </div>

        {image && (
            <figure className="m-0 mt-auto p-0">
                <StaticImage
                    alt=""
                    placeholder="none"
                    quality={100}
                    className=""
                    src="../../components/Home/Slider/images/ab-testing-hog.png"
                />
            </figure>
        )}
    </div>
)

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    return (
        <>
            {(quickLinks || compact) && <QuickLinks items={docsMenu.children[4].children} />}
            <section className="mb-12">
                <h3 className="m-0 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="Running experiments on new users"
                        description="Test changes to signup and onboarding flows"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/experiment-hog.png"
                            />
                        }
                        url="/tutorials/new-user-experiments"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Run A/B tests in Webflow"
                        description="A guide to low-code experimentation"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/experiment-hog.png"
                            />
                        }
                        url="/tutorials/webflow-ab-tests"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Run experiments without feature flags"
                        description="Useful if you don't use PostHog feature flags"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/experiment-hog.png"
                            />
                        }
                        url="/tutorials/experiments"
                    />
                </ul>
                <CallToAction
                    to="/tutorials/categories/experimentation"
                    type="custom"
                    size="md"
                    className="group !bg-accent dark:!bg-accent-dark !border-light dark:!border-dark"
                    childClassName="text-primary/75 dark:text-primary-dark/75 group-hover:text-primary/100 dark:group-hover:text-primary-dark/100 !bg-white dark:!bg-dark !border-light dark:!border-dark"
                    width="[calc(100%_+_3px)]"
                >
                    Explore guides
                </CallToAction>
            </section>
        </>
    )
}

const Experiments: React.FC<ExperimentsProps> = ({ data }) => {
    return (
        <Layout>
            <SEO title="A/B testing - Docs - PostHog" />

            <PostLayout title={'Experiments'} hideSurvey hideSidebar>
                <Intro />
                <Content />

                <div className="">
                    <CallToAction to="/docs/experiments/manual" width="full">
                        Visit the manual
                    </CallToAction>
                </div>
            </PostLayout>
        </Layout>
    )
}

export default Experiments

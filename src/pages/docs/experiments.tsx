import React from 'react'
import { SEO } from 'components/seo'
import ResourceItem from 'components/Docs/ResourceItem'
import { CallToAction } from 'components/CallToAction'
import { docsMenu } from '../../navs'
import { useLayoutData } from 'components/Layout/hooks'
import QuickLinks from 'components/QuickLinks'
import Intro from 'components/Docs/Intro'
import AskMax from 'components/AskMax'
import ReaderView from 'components/ReaderView'
import { buildProductMenuTabs, ProductSwitcher } from 'components/Products/ReaderViewProduct'
import useProduct from 'hooks/useProduct'

export const quickLinks = [
    {
        icon: 'GraduationCap',
        name: 'Start here',
        to: '/docs/experiments/hey',
        color: 'red',
    },
    {
        name: 'Product manual',
        to: '/docs/experiments/start-here',
        description: 'How to run A/B tests with PostHog.',
    },
    {
        name: 'Creating an experiment',
        to: '/docs/experiments/creating-an-experiment',
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

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    return (
        <>
            {(quickLinks || compact) && (
                <QuickLinks
                    items={docsMenu.children.find(({ name }) => name.toLowerCase() === 'a/b testing')?.children}
                />
            )}
            <section className="mb-12">
                <h3 className="m-0 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="Running experiments on new users"
                        description="Test changes to signup and onboarding flows"
                        url="/tutorials/new-user-experiments"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Run A/B tests in Webflow"
                        description="A guide to low-code experimentation"
                        url="/tutorials/webflow-ab-tests"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Run experiments without feature flags"
                        description="Useful if you don't use PostHog feature flags"
                        url="/docs/experiments/running-experiments-without-feature-flags"
                    />
                </ul>
                <CallToAction
                    to="/docs/experiments/tutorials"
                    type="custom"
                    size="md"
                    className="group !bg-accent dark:!bg-accent-dark !border-light dark:!border-dark"
                    childClassName="text-secondary group-hover:text-primary !bg-white dark:!bg-dark !border-light dark:!border-dark"
                    width="[calc(100%_+_3px)]"
                >
                    Explore guides
                </CallToAction>
            </section>
        </>
    )
}

const Experiments: React.FC<ExperimentsProps> = () => {
    const productData = useProduct({ handle: 'experiments' })
    const menuTabs = buildProductMenuTabs({ productData, activeSurface: 'docs' })

    return (
        <ReaderView menuTabs={menuTabs} productSelect={<ProductSwitcher activeHandle="experiments" />}>
            <SEO title="Experiments - Docs - PostHog" />

            <div className="mx-auto max-w-4xl">
                <section className="mb-6">
                    <Intro
                        subheader="Getting started"
                        title="Experiments"
                        description="Test different variations of your product and measure the impact."
                        buttonText="Roll out your first experiment"
                        buttonLink="/docs/experiments/start-here"
                        imageColumnClasses="max-w-96 mt-8 md:mt-0"
                        imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/EXPERIMENTS_f9f880f1b2.png"
                    />
                </section>

                <AskMax
                    quickQuestions={[
                        'How can I watch recordings of users in my experiment?',
                        'Can I override a release condition?',
                        "How do I know if I've reached statistical significance?",
                    ]}
                />

                <Content />

                <div>
                    <CallToAction to="/docs/experiments/start-here" width="full">
                        Visit the manual
                    </CallToAction>
                </div>
            </div>
        </ReaderView>
    )
}

export default Experiments

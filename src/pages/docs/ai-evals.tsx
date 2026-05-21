import React from 'react'

import { SEO } from 'components/seo'
import { docsMenu } from '../../navs'
import { useLayoutData } from 'components/Layout/hooks'
import QuickLinks from 'components/QuickLinks'
import Intro from 'components/Docs/Intro'
import ReaderView from 'components/ReaderView'

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    return (
        <>
            {(quickLinks || compact) && (
                <QuickLinks items={docsMenu.children.find(({ name }) => name === 'Evaluations')?.children} />
            )}
        </>
    )
}

const Evaluations: React.FC = () => {
    return (
        <ReaderView>
            <SEO title="Evaluations - Documentation - PostHog" />

            <Intro
                subheader="Getting started"
                title="Evaluations"
                description="Score the quality of your LLM generations with automated checks, manual reviews, datasets, and taggers."
                buttonText="Set up evaluations"
                buttonLink="/docs/ai-evals/evaluations"
                imageColumnClasses="max-w-96 mt-8 md:mt-0"
                imageClasses="max-h-48 md:max-h-64"
                imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/robot_960530c306.png"
            />

            <Content />
        </ReaderView>
    )
}

export default Evaluations

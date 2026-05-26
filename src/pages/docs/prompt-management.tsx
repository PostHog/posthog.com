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
                <QuickLinks items={docsMenu.children.find(({ name }) => name === 'Prompt Management')?.children} />
            )}
        </>
    )
}

const PromptManagement: React.FC = () => {
    return (
        <ReaderView>
            <SEO title="Prompt Management - Documentation - PostHog" />

            <Intro
                subheader="Getting started"
                title="Prompt Management"
                description="Version and ship prompts and reusable agent skills without code deploys."
                buttonText="Manage prompts"
                buttonLink="/docs/prompt-management/prompts"
                imageColumnClasses="max-w-96 mt-8 md:mt-0"
                imageClasses="max-h-48 md:max-h-64"
                imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/robot_960530c306.png"
            />

            <Content />
        </ReaderView>
    )
}

export default PromptManagement

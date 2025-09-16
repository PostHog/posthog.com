import React, { useState } from 'react'
import { SEO } from 'components/seo'
import ResourceItem from 'components/Docs/ResourceItem'
import { CallToAction } from 'components/CallToAction'
import AskMax from 'components/AskMax'
import Intro from 'components/Docs/Intro'
import ReaderView from 'components/ReaderView'
import OSTable from 'components/OSTable'
import { IconCheck, IconLogomark } from '@posthog/icons'
import InstallationPlatforms from '../../../contents/docs/error-tracking/installation/_snippets/installation-platforms'
import Pricing from '../../components/Pricing/PricingCalculator/SingleProduct'
import { CodeBlock } from 'components/CodeBlock'

type ErrorTrackingProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

const maxWidth = 'max-w-4xl'

export const Content = () => {
    const javascriptCode = `posthog.captureException(error, {
  user_id: "user123",
  stack_trace: error.stack,
  severity: "error"
})`

    const pythonCode = `posthog.capture_exception(
  error,
  distinct_id="user123",
  properties={
    "stack_trace": str(error),
    "severity": "error"
  }
)`

    const goCode = `client.CaptureException(posthog.CaptureException{
  DistinctId: "user123",
  Exception:  err,
  Properties: map[string]interface{}{
    "severity": "error",
    "context":  "user_action",
  },
})`

    const codeLanguages = [
        {
            label: 'JavaScript',
            language: 'javascript',
            code: javascriptCode,
        },
        {
            label: 'Python',
            language: 'python',
            code: pythonCode,
        },
        {
            label: 'Go',
            language: 'go',
            code: goCode,
        },
    ]

    const [currentLanguage, setCurrentLanguage] = useState(codeLanguages[0])

    const handleLanguageChange = (language: any) => {
        setCurrentLanguage(language)
    }

    return (
        <>
            <section className={`mb-6 mx-auto ${maxWidth}`}>
                <div>
                    <p>
                        Error tracking lets you track errors and resolve issues within your app, so you can ship fast
                        with confidence.
                    </p>
                    <p>Error tracking is great for teams who:</p>
                    <ul>
                        <li>Need to ship faster with a fast growing product</li>
                        <li>Need to consolidate dev tools and focus on product</li>
                        <li>Need to streamline full-stack development </li>
                        <li>Need to understand impact of errors</li>
                    </ul>
                </div>

                <div className="mt-8">
                    <CodeBlock currentLanguage={currentLanguage} onChange={handleLanguageChange}>
                        {codeLanguages}
                    </CodeBlock>

                    <InstallationPlatforms columns={4} />
                </div>
            </section>

            <section className={`mb-6 mx-auto ${maxWidth}`}>
                <h2 className="mb-4 text-xl">All the features you expect</h2>
                <OSTable
                    columns={[
                        { name: '', width: '1fr', align: 'left' },
                        { name: <IconLogomark className="h-7" />, width: '120px', align: 'center' },
                        { name: '', width: '1fr', align: 'left' },
                        { name: <IconLogomark className="h-7" />, width: '120px', align: 'center' },
                    ]}
                    rows={[
                        {
                            cells: [
                                { content: 'Error alerts' },
                                { content: <IconCheck className="h-5 text-green" /> },
                                { content: 'Exception capture' },
                                { content: <IconCheck className="h-5 text-green" /> },
                            ],
                        },
                        {
                            cells: [
                                { content: 'Issue management' },
                                { content: <IconCheck className="h-5 text-green" /> },
                                { content: 'Network performance monitoring' },
                                { content: <IconCheck className="h-5 text-green" /> },
                            ],
                        },
                        {
                            cells: [
                                { content: 'Error grouping' },
                                { content: <IconCheck className="h-5 text-green" /> },
                                { content: 'Source map support' },
                                { content: <IconCheck className="h-5 text-green" /> },
                            ],
                        },
                        {
                            cells: [
                                { content: 'Stack tracing' },
                                { content: <IconCheck className="h-5 text-green" /> },
                                { content: 'Integration with product analytics' },
                                { content: <IconCheck className="h-5 text-green" /> },
                            ],
                        },
                        {
                            cells: [
                                { content: 'Integration with session replays' },
                                { content: <IconCheck className="h-5 text-green" /> },
                                { content: 'Integration with A/B experiments' },
                                { content: <IconCheck className="h-5 text-green" /> },
                            ],
                        },
                    ]}
                    size="sm"
                    className={maxWidth}
                />
            </section>

            <section className={`mb-6 mx-auto ${maxWidth}`}>
                <h2 className="mb-4 text-xl">And the features that help you 10x</h2>
            </section>

            <section className={`mb-6 mx-auto ${maxWidth}`}>
                <h2 className="mb-4 text-xl">Usage-based pricing</h2>
                <p>
                    PostHog's error tracking is built to be cost-effective by default, with a generous free tier and
                    transparent usage-based pricing. Our generous free tier means more than 90% of companies use PostHog
                    for free.
                </p>
                <p>
                    No credit card required to start. You can also set billing limits to avoid surprise charges. See our{' '}
                    <a href="/pricing">pricing page</a> for more up-to-date details
                </p>
                <div className="px-8 bg-white rounded-md border-primary border">
                    <Pricing productType="error_tracking" />
                </div>
            </section>

            <AskMax
                className={`mx-auto ${maxWidth}`}
                quickQuestions={[
                    'How do I see what the most common errors are?',
                    'How do I custom error groups?',
                    'How do I assign someone an error?',
                ]}
            />

            <section className={`mb-6 mx-auto ${maxWidth}`}>
                <h3 className="m-0 text-xl">Resources</h3>
                <p className="text-[15px]">Real-world use cases to get you started</p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="How to set up Next.js error monitoring"
                        description="Track client and server errors in Next.js"
                        url="/tutorials/nextjs-error-monitoring"
                    />
                    <ResourceItem
                        type="Guide"
                        title="How to set up Python error tracking"
                        description="Learn how to track basic errors in Python and Flask"
                        url="/tutorials/python-error-tracking"
                    />
                    <ResourceItem
                        type="Article"
                        title="What is real user monitoring (and how to set it up)"
                        description="How to set up RUM to get more context on errors"
                        url="/product-engineers/real-user-monitoring"
                    />
                </ul>
            </section>
        </>
    )
}

const ErrorTracking: React.FC<ErrorTrackingProps> = () => {
    return (
        <ReaderView>
            <SEO title="Error tracking - Docs - PostHog" />

            <section className={`mb-6 mx-auto ${maxWidth}`}>
                <Intro
                    subheader="Getting started"
                    title="Error tracking"
                    description="Track and monitor errors and exceptions in your code."
                    buttonText="Installation guide"
                    buttonLink="/docs/error-tracking/start-here"
                    imageColumnClasses="mt-4 md:-mt-8"
                    imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/error_f2df714c47.png"
                    imageClasses="max-h-48 md:max-h-64"
                />
            </section>

            <Content />

            <div className="">
                <CallToAction to="/docs/error-tracking/start-here" width="full">
                    Start integrating
                </CallToAction>
            </div>
        </ReaderView>
    )
}

export default ErrorTracking

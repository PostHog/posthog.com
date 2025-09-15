import PostLayout from 'components/PostLayout'
import { dataPipelines, docsMenu } from '../navs'
import React from 'react'
import Layout from 'components/Layout'
import { graphql } from 'gatsby'
import APIExamples from 'components/Product/Pipelines/APIExamples'
import Configuration from 'components/Product/Pipelines/Configuration'
import SEO from 'components/seo'
import { getIconUrl, NotifyMe } from 'components/Product/Pipelines'
import ReactMarkdown from 'react-markdown'
import ReaderView from 'components/ReaderView'
import { getProseClasses } from '../constants'

export default function DataPipeline({
    data,
}: {
    data: {
        postHogPipeline: {
            name: string
            description: string
            inputs_schema: any
            id: string
            type: string
            icon_url: string
            status: string
            introSnippet: string
            installationSnippet: string
        }
    }
}): JSX.Element {
    const {
        postHogPipeline: {
            name,
            description,
            inputs_schema,
            id,
            type,
            icon_url,
            status,
            introSnippet,
            installationSnippet,
        },
    } = data

    const segmentWarning =
        "> The configuration process for this destination mirrors Segment's setup. We've automatically modified the documentation from third-party sources to show you how to set up this destination with PostHog."

    return (
        <>
            <SEO title={`${name} - Docs - PostHog`} description={description} />
            <ReaderView title={name} hideTitle>
                <div className="flex items-center space-x-2">
                    <img src={getIconUrl(icon_url)} alt={name} className="w-10 h-10" />
                    <h1 className="m-0">{name}</h1>
                </div>
                <div className={getProseClasses('base')}>
                    <p>{description}</p>
                    {id.startsWith('segment-') && (
                        <>
                            <ReactMarkdown>{segmentWarning}</ReactMarkdown>
                            <ReactMarkdown>{introSnippet || ''}</ReactMarkdown>
                            <ReactMarkdown>{installationSnippet || ''}</ReactMarkdown>
                        </>
                    )}
                    {status !== 'coming_soon' && inputs_schema?.length > 0 && (
                        <>
                            <h2>Configuration</h2>
                            <Configuration inputs_schema={inputs_schema} />
                        </>
                    )}
                    {status !== 'coming_soon' && (
                        <APIExamples initialOpen id={id} name={name} inputs_schema={inputs_schema} type={type} />
                    )}
                    {status === 'coming_soon' && <NotifyMe pipeline={{ name, type }} />}

                    {id.startsWith('segment-') && (
                        <div>
                            <h2>FAQ</h2>
                            <h3>Is the source code for this destination available?</h3>
                            <p>
                                Yes. The{' '}
                                <a href="https://github.com/segmentio/action-destinations/tree/main/packages/destination-actions/src/destinations">
                                    source code
                                </a>{' '}
                                is available on GitHub.
                            </p>
                            <h3>Who maintains this?</h3>
                            <p>
                                This is maintained by Segment. If you have issues with it not functioning as intended,
                                please{' '}
                                <a href="https://us.posthog.com/#panel=support%3Asupport%3Aapps%3A%3Atrue">
                                    let us know
                                </a>
                                !
                            </p>
                            <h3>What if I have feedback on this destination?</h3>
                            <p>
                                We love feature requests and feedback. Please{' '}
                                <a href="https://us.posthog.com/#panel=support%3Afeedback%3Aapps%3Alow%3Atrue">
                                    tell us what you think
                                </a>
                                .
                            </p>
                            <h3>What if my question isn't answered above?</h3>
                            <p>
                                We love answering questions. Ask us anything via{' '}
                                <a href="/questions">our community forum</a>.
                            </p>
                            <p className="text-sm opacity-70 pt-4">
                                Parts of this page are sourced from{' '}
                                <a href="https://github.com/segmentio/segment-docs">segmentio/segment-docs</a> under the{' '}
                                <a href="https://creativecommons.org/licenses/by/4.0/">
                                    Creative Commons Attribution 4.0 International License
                                </a>
                                . The content may have been modified according to{' '}
                                <a href="https://github.com/PostHog/posthog.com/blob/master/gatsby/sourceNodes.ts">
                                    this code
                                </a>
                                .
                            </p>
                        </div>
                    )}
                </div>
            </ReaderView>
        </>
    )
}

export const query = graphql`
    query ($id: String!) {
        postHogPipeline(id: { eq: $id }) {
            id
            name
            description
            type
            icon_url
            inputs_schema {
                key
                type
                label
                secret
                required
                description
            }
            status
            introSnippet
            installationSnippet
        }
    }
`

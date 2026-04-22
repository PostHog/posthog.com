import React from 'react'
import { graphql } from 'gatsby'
import SEO from 'components/seo'
import ReactMarkdown from 'react-markdown'
import ReaderView from 'components/ReaderView'
import { getProseClasses } from '../constants'

interface SourceField {
    name: string
    label: string
    type: string
    required: boolean
    placeholder: string
    caption: string
}

export default function DataWarehouseSource({
    data,
}: {
    data: {
        postHogSource: {
            sourceId: string
            name: string
            icon_url: string
            caption: string
            permissionsCaption: string
            beta: boolean
            sourceFields: SourceField[]
        }
    }
}): JSX.Element {
    const { sourceId, name, icon_url, caption, permissionsCaption, beta, sourceFields } = data.postHogSource

    return (
        <>
            <SEO title={`${name} source - Docs - PostHog`} description={`Connect ${name} to PostHog`} />
            <ReaderView title={name} hideTitle>
                <div className="flex items-center space-x-2">
                    <img src={icon_url} alt={name} className="w-10 h-10" />
                    <h1 className="m-0">{name}</h1>
                    {beta && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue/10 text-blue">Beta</span>
                    )}
                </div>
                <div className={getProseClasses('base')}>
                    <p>
                        Connect {name} to PostHog to sync your data into the PostHog data warehouse for analysis and
                        modeling.
                    </p>

                    {caption && <ReactMarkdown>{caption}</ReactMarkdown>}

                    {permissionsCaption && (
                        <>
                            <h2>Required permissions</h2>
                            <ReactMarkdown>{permissionsCaption}</ReactMarkdown>
                        </>
                    )}

                    {sourceFields && sourceFields.length > 0 && (
                        <>
                            <h2>Configuration</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Field</th>
                                        <th>Type</th>
                                        <th>Required</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sourceFields.map((field) => (
                                        <tr key={field.name}>
                                            <td>
                                                <strong>{field.label || field.name}</strong>
                                            </td>
                                            <td>
                                                <code>{field.type}</code>
                                            </td>
                                            <td>{field.required ? 'Yes' : 'No'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}

                    <h2>Linking {name} to PostHog</h2>
                    <ol>
                        <li>
                            Go to the <a href="https://us.posthog.com/pipeline/new/source">Data pipeline page</a> in
                            PostHog
                        </li>
                        <li>
                            Click <strong>New source</strong> and select <strong>{name}</strong>
                        </li>
                        <li>Fill in the required configuration fields</li>
                        <li>
                            Click <strong>Next</strong>, select the tables you want to sync, and then press{' '}
                            <strong>Import</strong>
                        </li>
                    </ol>
                </div>
            </ReaderView>
        </>
    )
}

export const query = graphql`
    query ($id: String!) {
        postHogSource(id: { eq: $id }) {
            sourceId
            name
            icon_url
            caption
            permissionsCaption
            beta
            sourceFields {
                name
                label
                type
                required
                placeholder
                caption
            }
        }
    }
`

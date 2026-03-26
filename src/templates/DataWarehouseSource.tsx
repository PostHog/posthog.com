import React from 'react'
import { graphql } from 'gatsby'
import SEO from 'components/seo'
import ReactMarkdown from 'react-markdown'
import ReaderView from 'components/ReaderView'
import { getProseClasses } from '../constants'

const INBOUND_IPS = `
| US | EU |
| --- | --- |
| 44.205.89.55  | 3.75.65.221 |
| 44.208.188.173 | 18.197.246.42 |
| 52.4.194.122 | 3.120.223.253 |
`

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
            fields: SourceField[]
        }
    }
}): JSX.Element {
    const { sourceId, name, icon_url, caption, permissionsCaption, beta, fields } = data.postHogSource

    return (
        <>
            <SEO title={`${name} source - Docs - PostHog`} description={`Connect ${name} to PostHog`} />
            <ReaderView title={name} hideTitle>
                <div className={getProseClasses('base')}>
                    <div className="flex items-center space-x-2 mb-4">
                        <img src={icon_url} alt={name} className="w-10 h-10 object-contain" />
                        <h1 className="m-0">{name}</h1>
                        {beta && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue/10 text-blue">Beta</span>
                        )}
                    </div>

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

                    {fields && fields.length > 0 && (
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
                                    {fields.map((field) => (
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

                    <h4>Inbound IP addresses</h4>
                    <p>
                        We use a set of IP addresses to access your instance. To ensure this connector works, add these
                        IPs to your inbound security rules:
                    </p>
                    <ReactMarkdown>{INBOUND_IPS}</ReactMarkdown>
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
            fields {
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

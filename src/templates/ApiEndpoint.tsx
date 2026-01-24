import ElementScrollLink, { ScrollSpyProvider } from 'components/ElementScrollLink'
import '@fontsource/source-code-pro'
import { CodeBlock, SingleCodeBlock } from 'components/CodeBlock'
import { SEO } from 'components/seo'
import 'core-js/features/array/at'
import { graphql } from 'gatsby'
import { getCookie, setCookie } from 'lib/utils'
import * as OpenAPISampler from 'openapi-sampler'
import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { shortcodes } from '../mdxGlobalComponents'
import { MdxCodeBlock } from 'components/CodeBlock'
import { InlineCode } from 'components/InlineCode'
import { CallToAction } from 'components/CallToAction'
import ReaderView from 'components/ReaderView'
import { Heading } from 'components/Heading'
import { IconChevronDown } from '@posthog/icons'

const mapVerbsColor = {
    get: 'blue',
    post: 'green',
    patch: 'orange',
    put: 'green',
    delete: 'red',
}

// Divider component for visual separation
const Divider = ({ className = '' }) => <hr className={`border-0 border-t border-primary my-6 ${className}`} />

// Section divider with more spacing for major sections
const SectionDivider = ({ className = '' }) => <hr className={`border-0 border-t-2 border-primary my-8 ${className}`} />

// Displays the default value for a parameter
const DefaultValue = ({ value }: { value: unknown }) => (
    <div>
        <span className="text-sm">
            Default: <code>{String(value)}</code>
        </span>
    </div>
)

// Extracts the schema name from a $ref path (e.g., "#/components/schemas/User" -> "User")
// Checks both direct $ref and items.$ref for array types
const getSchemaRefName = (schema?: { $ref?: string; items?: { $ref?: string } }): string | undefined => {
    const ref = schema?.['$ref'] ?? schema?.items?.['$ref']
    return ref?.split('/').at(-1)
}

// Displays enum values as a list of code snippets
const EnumValues = ({ values }: { values: (string | null)[] }) => (
    <div className="text-sm">
        One of:{' '}
        {values
            .filter((item) => item && item !== '')
            .map((item) => (
                <code className="mr-1" key={item}>
                    "{item}"
                </code>
            ))}{' '}
    </div>
)

function Endpoints({
    paths,
    containerRef,
}: {
    paths: Record<string, Record<string, unknown>>
    containerRef: React.RefObject<HTMLDivElement>
}) {
    return (
        <div>
            <h3>Endpoints</h3>
            <table className="table-auto">
                <tbody className="list-none m-0 p-0 flex flex-col">
                    {Object.entries(paths).map(([path, value]) => (
                        <React.Fragment key={path}>
                            {Object.keys(value as Record<string, unknown>).map((verb) => (
                                <tr key={verb} className="border-0">
                                    <td className="py-1 px-0">
                                        <code
                                            className={`method text-${
                                                mapVerbsColor[verb as keyof typeof mapVerbsColor]
                                            }`}
                                        >
                                            {verb.toUpperCase()}
                                        </code>
                                    </td>
                                    <td className="py-1 px-4">
                                        <ElementScrollLink
                                            id={pathID(verb, path)}
                                            label={<code>{path.replaceAll('{', ':').replaceAll('}', '')}</code>}
                                            element={containerRef}
                                            className="cursor-pointer hover:underline"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function humanReadableName(name) {
    name = name.replace('_partial', '').split('_')
    if (name.length > 1) {
        name = name.slice(0, name.length - 1) // Remove _list, _retrieve etc
    }
    return name.map((word) => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
}

const titleMap: Record<string, string> = {
    actions: 'Actions',
    activity_log: 'Activity log',
    annotations: 'Annotations',
    batch_exports: 'Batch exports',
    cohorts: 'Cohorts',
    dashboards: 'Dashboards',
    dashboard_templates: 'Dashboard templates',
    early_access_feature: 'Early access features',
    environments: 'Environments',
    event_definitions: 'Event definitions',
    events: 'Events',
    experiments: 'Experiments',
    feature_flags: 'Feature flags',
    groups: 'Groups',
    groups_types: 'Groups types',
    hog_functions: 'Hog functions',
    insights: 'Insights',
    invites: 'Invites',
    members: 'Members',
    notebooks: 'Notebooks',
    organizations: 'Organizations',
    persons: 'Persons',
    projects: 'Projects',
    property_definitions: 'Property definitions',
    query: 'Query',
    roles: 'Roles',
    session_recordings: 'Session recordings',
    session_recording_playlists: 'Session recording playlists',
    sessions: 'Sessions',
    subscriptions: 'Subscriptions',
    surveys: 'Survey',
    users: 'Users',
    web_analytics: 'Web analytics',
    data_model: 'Data model',
}

const verbMap = {
    get: 'Retrieve',
    post: 'Create',
    patch: 'Update',
    delete: 'Delete',
}
function generateName(item) {
    let name = item.operationId.split('_')
    name = name.slice(0, name.length - 1).join(' ')
    name = name.replace(' partial', '')
    if (item.operationId.includes('_list')) {
        return 'List all ' + name.toLowerCase()
    }

    return verbMap[item.httpVerb] + ' ' + name.toLowerCase()
}

function pathID(verb, path) {
    return verb + path.replaceAll('/', '-').replaceAll('{', '').replaceAll('}', '').slice(0, -1)
}

function getSchemaTypeName(schema: any): string | null {
    const itemRef = schema?.items?.$ref
    const directRef = schema?.$ref

    if (itemRef) {
        const typeName = itemRef.split('/').at(-1)
        return `${typeName}[]`
    }

    if (directRef) {
        return directRef.split('/').at(-1)
    }

    return null
}

function ExpandToggle({ isOpen, onClick, label }: { isOpen: boolean; onClick: () => void; label: string }) {
    return (
        <button className="group cursor-pointer inline-flex items-center" onClick={onClick}>
            <span className="font-code text-[13px]">{label}</span>
            <IconChevronDown className={`size-6 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
    )
}

interface ParamItemProps {
    param: { name: string; schema: any }
    objects: any
    depth: number
}

function ParamItem({ param, objects, depth }: ParamItemProps) {
    const [isOpen, setIsOpen] = useState(false)
    const schemaRefName = getSchemaRefName(param.schema)
    const schema = schemaRefName ? objects.schemas[schemaRefName] : param.schema

    return (
        <li className="py-3 border-b border-primary last:border-0">
            <div className="grid" style={{ gridTemplateColumns: '40% 60%' }}>
                <div className="flex flex-col">
                    <span className="font-code font-semibold text-[13px] leading-7">{param.name}</span>
                </div>
                <div className="">
                    <div>
                        <span className="type bg-accent inline-block px-[4px] py-[2px] text-sm rounded-sm">
                            {schemaRefName && schema.properties ? (
                                <ExpandToggle
                                    label={schemaRefName}
                                    isOpen={isOpen}
                                    onClick={() => setIsOpen(!isOpen)}
                                />
                            ) : (
                                schema.type
                            )}
                        </span>
                    </div>
                    {schema.default !== undefined && schema.default !== null && <DefaultValue value={schema.default} />}
                    {schema.enum && <EnumValues values={schema.enum} />}
                </div>
            </div>

            {isOpen && schemaRefName && (
                <div className="params-wrapper bg-accent rounded px-4 mr-2 my-1">
                    <Params objects={objects} object={objects.schemas[schemaRefName]} depth={depth + 1} />
                </div>
            )}
        </li>
    )
}

function Params({
    params: initialParams,
    objects,
    object,
    depth = 0,
}: {
    params?: any[]
    objects: any
    object?: any
    depth?: number
}) {
    if (depth > 4) return null
    let params = initialParams || []
    if (object?.properties) {
        params = Object.entries(object.properties).map(([key, value]) => {
            return {
                name: key,
                schema: value,
            }
        })
    }

    return (
        <ul className="list-none pl-0">
            {params.map((param, index) => (
                <ParamItem key={index} param={param} objects={objects} depth={depth} />
            ))}
        </ul>
    )
}
function Parameters({ item, objects }) {
    const pathParams = item.parameters?.filter((param) => param.in === 'path')
    const queryParams = item.parameters?.filter((param) => param.in === 'query')

    return (
        <>
            {pathParams?.length > 0 && (
                <div>
                    <h4>Path parameters</h4>
                    <Params params={pathParams} objects={objects} />
                    {queryParams?.length > 0 && <Divider />}
                </div>
            )}
            {queryParams?.length > 0 && (
                <div>
                    <h4>Query parameters</h4>
                    <Params params={queryParams} objects={objects} />
                </div>
            )}
        </>
    )
}

function Security({ item }) {
    const personaApiKeyScopes = item.security?.[0]?.['PersonalAPIKeyAuth']

    return (
        personaApiKeyScopes?.length && (
            <div>
                <h4>Required API key scopes</h4>
                <div className="flex items-center gap-2">
                    {personaApiKeyScopes.map((x) => (
                        <code key={x}>{x}</code>
                    ))}
                </div>
            </div>
        )
    )
}

function RequestBody({ item, objects }) {
    const objectKey = getSchemaRefName(item.requestBody?.content?.['application/json']?.schema)
    if (!objectKey) return null
    const object = objects.schemas[objectKey]

    return (
        <div>
            <h4>Request parameters</h4>
            <Params
                params={Object.entries(object.properties)
                    .map(([name, schema]) => {
                        return {
                            name,
                            schema,
                        }
                    })
                    .filter((item) => !item.schema.readOnly)}
                objects={objects}
            />
        </div>
    )
}

function ResponseBody({ item, objects }) {
    const objectKey = getSchemaRefName(
        item.responses[Object.keys(item.responses)[0]]?.content?.['application/json']?.schema
    )
    if (!objectKey) return null
    const object = objects.schemas[objectKey]
    const [showResponse, setShowResponse] = useState(false)

    return (
        <>
            <h4>Response</h4>
            <div className="response-wrapper">
                <button className="mt-2 text-sm text-red font-semibold" onClick={() => setShowResponse(!showResponse)}>
                    {showResponse ? 'Hide' : 'Show'} response body
                </button>
                <br />
                {showResponse && (
                    <>
                        <Divider className="my-4" />
                        <Params
                            params={Object.entries(object.properties)
                                .map(([name, schema]) => {
                                    return {
                                        name,
                                        schema,
                                    }
                                })
                                .filter((item) => !item.schema.readOnly)}
                            objects={objects}
                        />
                    </>
                )}
            </div>
        </>
    )
}

function RequestExample({ name, item, objects, exampleLanguage, setExampleLanguage }) {
    let params = []

    if (item.requestBody) {
        const objectKey = getSchemaRefName(item.requestBody.content?.['application/json']?.schema)
        if (!objectKey) return null
        const object = objects.schemas[objectKey]
        params = Object.entries(object.properties).filter(
            ([name, schema]) => object.required?.indexOf(name) > -1 && !schema.readOnly
        )
        // If no params are required, just grab the first relevant one as an example
        if (params.length === 0) {
            params = [Object.entries(object.properties).filter(([name]) => ['id', 'short_id'].indexOf(name) === -1)[0]]
        }
        params = params.map(([name, schema]) => {
            return [
                name,
                schema.items?.$ref === '#/components/schemas/FilterEvent'
                    ? [{ id: '$pageview' }]
                    : schema.example || schema.type,
            ]
        })
    }

    const path: string = item.pathName.replaceAll('{', ':').replaceAll('}', '')

    // If the object name ends with 's', remove the 's'
    const object: string = name.charAt(name.length - 1) === 's' ? name.slice(0, -1) : name
    const object_noun: string = object.replaceAll('_', ' ')

    const additionalPathParams =
        item.parameters
            ?.filter((param) => param.in === 'path')
            .filter((param) => !['project_id', 'id'].includes(param.name)) || []

    const languages = [
        {
            label: 'cURL',
            language: 'bash',
            code: `
            export POSTHOG_PERSONAL_API_KEY=[your personal api key]
curl ${item.httpVerb === 'delete' ? ' -X DELETE ' : item.httpVerb == 'patch' ? '-X PATCH ' : ''}${
                item.httpVerb === 'post' ? "\n    -H 'Content-Type: application/json'" : ''
            }\\
    -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \\
    <ph_app_host>${path}${params.map((item) => `\\\n\t-d ${item[0]}=${JSON.stringify(item[1])}`)}
            `,
        },
        {
            label: 'Python',
            language: 'python',
            code: `
api_key = "[your personal api key]"
project_id = "[your project id]"
response = requests.${item.httpVerb}(
    "<ph_app_host>${item.pathName.replace('{id}', `{${object}_id}`)}".format(
        project_id=project_id${item.pathName.includes('{id}') ? `,\n\t\t${object}_id="<the ${object_noun} id>"` : ''}${
                additionalPathParams.length > 0
                    ? additionalPathParams.map(
                          (param) => `,\n\t\t${param.name}="<the ${param.name.replaceAll('_', ' ')}>"`
                      )
                    : ''
            }
    ),
    headers={"Authorization": "Bearer {}".format(api_key)},${
        params.length > 0
            ? `\n\tdata=${JSON.stringify(Object.fromEntries(params), null, '\t')
                  .replaceAll('\n', '\n\t')
                  .replace('\n}', '\n\t}')}`
            : ''
    }
)${item.httpVerb !== 'delete' ? '.json()' : ''}
            `,
        },
    ]

    const currentLanguage = languages.find((l) => l.language === exampleLanguage) || languages[0]

    return (
        <CodeBlock
            selector="dropdown"
            currentLanguage={currentLanguage}
            onChange={({ language }) => setExampleLanguage(language)}
            label={
                <div className="code-example flex text-xs space-x-1.5 my-1">
                    <code className={`shrink-0 text-${mapVerbsColor[item.httpVerb]}`}>
                        {item.httpVerb.toUpperCase()}{' '}
                    </code>
                    <code className="min-w-0 break-words">
                        {path.split('/').map((token) => {
                            if (token === '') {
                                return <wbr key={token} />
                            } else {
                                return (
                                    <>
                                        <wbr />/{token}
                                    </>
                                )
                            }
                        })}
                    </code>
                </div>
            }
        >
            {languages}
        </CodeBlock>
    )
}

function ResponseExample({ item, objects, objectKey }) {
    if (!objectKey) {
        return null
    }

    let response

    try {
        // Check if there are examples in the API spec
        const firstResponseKey = Object.keys(item.responses || {})[0]
        const responseSpec = item.responses?.[firstResponseKey]
        const examples = responseSpec?.content?.['application/json']?.examples

        if (examples) {
            const firstExampleKey = Object.keys(examples)[0]
            const exampleValue = examples[firstExampleKey]?.value

            if (exampleValue !== undefined) {
                response = JSON.stringify(exampleValue, null, 2)
            }
        }
    } catch (error) {
        // Continue to fallback
    }

    // Fallback to generated example if no real example exists
    if (!response) {
        try {
            response = JSON.stringify(
                OpenAPISampler.sample(objects.schemas[objectKey], {}, { components: objects }),
                null,
                2
            )
        } catch (error) {
            response = JSON.stringify({ message: 'No example available' }, null, 2)
        }
    }

    return (
        <SingleCodeBlock
            showCopy={false}
            label={<span className="text-xs font-semibold">RESPONSE</span>}
            language="javascript"
        >
            {response}
        </SingleCodeBlock>
    )
}

const pathDescription = (item) => {
    const name = humanReadableName(item.operationId).toLowerCase()
    if (item.operationId.includes('_list')) {
        return `Returns a list of ${name}. The ${name} are returned in sorted order, with the most recent charges appearing first.`
    }
    if (item.httpVerb === 'get') {
        return `Returns a single ${name.slice(0, -1)}, which you can request by passing through an id in the url.`
    }
    if (item.httpVerb === 'post') {
        return `Create ${name}. You need to pass through any required fields, and you can optionally pass through other fields.`
    }
    if (item.httpVerb === 'patch') {
        return `Update ${name} by setting the values of the parameters passed. Any parameters not set will be unchanged.`
    }
}

interface ApiEndpointData {
    data: {
        name: string
        nextURL?: string
        items: string
    }
    apiComponents: {
        components: string
    }
    allMdx: {
        nodes?: Array<{
            slug: string
            body: string
        }>
    }
}

export default function ApiEndpoint({ data }: { data: ApiEndpointData }): JSX.Element {
    const {
        apiComponents: { components: apiComponents },
        allMdx,
    } = data
    const name = data.data.name
    const title = titleMap[name] || humanReadableName(name)
    const nextURL = data.data.nextURL
    const paths = {}
    const components = {
        inlineCode: InlineCode,
        pre: MdxCodeBlock,
        MultiLanguage: MdxCodeBlock,
        ...shortcodes,
    }
    // Filter PUT as it's basically the same as PATCH
    const items = JSON.parse(data.data.items).filter((item) => item.httpVerb !== 'put')
    items.map((item) => {
        if (!paths[item.path]) {
            paths[item.path] = {}
        }
        paths[item.path][item.httpVerb] = item.operationSpec
    })
    const objects = JSON.parse(apiComponents)

    const [exampleLanguage, setExampleLanguageState] = useState()
    const contentContainerRef = useRef<HTMLDivElement>(null)

    const setExampleLanguage = (language) => {
        setCookie('api_docs_example_language', language)
        setExampleLanguageState(language)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setExampleLanguageState(getCookie('api_docs_example_language') || 'curl')
        }
    }, [])

    // Find overview.mdx node for this API entity
    // Note: name uses underscores (from OpenAPI), but file slugs use hyphens
    const overviewNode = allMdx.nodes?.find((node) => node.slug === `docs/api/${name.replace(/_/g, '-')}/overview`)

    const [hovered, setHovered] = useState(false)

    return (
        <ScrollSpyProvider>
            <ReaderView>
                <div ref={contentContainerRef} className="p-4">
                    <SEO title={`${title} API Reference - PostHog`} />

                    <h2 className="!mt-0">{title}</h2>
                    <blockquote className="p-6 mb-4 rounded bg-accent">
                        <p>
                            For instructions on how to authenticate to use this endpoint, see{' '}
                            <a href="/docs/api/overview">API overview</a>.
                        </p>
                    </blockquote>

                    {overviewNode?.body && (
                        <div className="article-content mt-6">
                            <MDXProvider components={components}>
                                <MDXRenderer>{overviewNode.body}</MDXRenderer>
                            </MDXProvider>
                            <SectionDivider />
                        </div>
                    )}

                    <Endpoints paths={paths} containerRef={contentContainerRef} />

                    {items.map((item, index) => {
                        item = item.operationSpec
                        const mdxNode = allMdx.nodes?.find((node) => node.slug.split('/').pop() === item.operationId)

                        return (
                            <div className="mt-8" key={item.operationId}>
                                {index > 0 && <SectionDivider />}

                                <div
                                    className="grid grid-cols-1 @xl:grid-cols-2 gap-8 items-start"
                                    id={pathID(item.httpVerb, item.pathName)}
                                >
                                    <div className="space-y-6">
                                        <Heading id={pathID(item.httpVerb, item.pathName)} as="h2">
                                            {generateName(item)}
                                        </Heading>
                                        {mdxNode?.body && (
                                            <div className="article-content">
                                                <div className="text-primary">
                                                    <MDXProvider components={components}>
                                                        <MDXRenderer>{mdxNode.body}</MDXRenderer>
                                                    </MDXProvider>
                                                </div>
                                            </div>
                                        )}
                                        <ReactMarkdown>
                                            {!item.description ||
                                            item.description === items[0].operationSpec?.description
                                                ? pathDescription(item)
                                                : item.description}
                                        </ReactMarkdown>

                                        <Security item={item} />
                                        {item.security?.[0]?.['PersonalAPIKeyAuth']?.length && <Divider />}

                                        <Parameters item={item} objects={objects} />
                                        {item.parameters?.filter((param) => param.in === 'path' || param.in === 'query')
                                            ?.length > 0 && <Divider />}

                                        <RequestBody item={item} objects={objects} />
                                        {item.requestBody && <Divider />}

                                        <ResponseBody item={item} objects={objects} />
                                    </div>
                                    <div className="lg:sticky top-[108px] space-y-6">
                                        <div>
                                            <h4>Example request</h4>
                                            <RequestExample
                                                name={name}
                                                item={item}
                                                objects={objects}
                                                exampleLanguage={exampleLanguage}
                                                setExampleLanguage={setExampleLanguage}
                                            />
                                        </div>
                                        <div>
                                            <h4>Example response</h4>
                                            {Object.keys(item.responses).map((statusCode) => {
                                                const response = item.responses[statusCode]
                                                return (
                                                    <div key={statusCode} className="mb-4">
                                                        <h5 className="text-sm font-semibold mb-2">
                                                            <span className="bg-gray-accent-light dark:bg-gray-accent-dark inline-block px-[4px] py-[2px] text-sm rounded-sm">
                                                                Status {statusCode}
                                                            </span>{' '}
                                                            {response.description}
                                                        </h5>
                                                        <ResponseExample
                                                            item={item}
                                                            objects={objects}
                                                            objectKey={getSchemaRefName(
                                                                response.content?.['application/json']?.schema
                                                            )}
                                                            exampleLanguage={exampleLanguage}
                                                            setExampleLanguage={setExampleLanguage}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {nextURL && (
                        <CallToAction className="mt-8" to={nextURL}>
                            Next page →
                        </CallToAction>
                    )}
                </div>
            </ReaderView>
        </ScrollSpyProvider>
    )
}

export const query = graphql`
    query ApiEndpoint($id: String!, $regex: String!) {
        allMdx(filter: { fields: { slug: { regex: $regex } } }) {
            nodes {
                slug
                body
            }
        }
        data: apiEndpoint(id: { eq: $id }) {
            id
            internal {
                content
                description
                ignoreType
                mediaType
            }
            items
            name
            url
            nextURL
        }
        apiComponents: apiComponents {
            components
        }
    }
`

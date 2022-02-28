import { Button, Select } from 'antd'
import CodeBlock from 'components/Home/CodeBlock'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import 'core-js/features/array/at'
import 'core-js/features/string/replace-all'
import { graphql } from 'gatsby'
import { getCookie, setCookie } from 'lib/utils'
import * as OpenAPISampler from 'openapi-sampler'
import Highlight, { defaultProps } from 'prism-react-renderer'
import React, { useEffect, useRef, useState } from 'react'
import { push as Menu } from 'react-burger-menu'
import ReactMarkdown from 'react-markdown'
import '../styles/api-docs.scss'
import MainSidebar from './Handbook/MainSidebar'
import Navigation from './Handbook/Navigation'
import SectionLinks from './Handbook/SectionLinks'

const mapVerbsColor = {
    get: 'blue',
    post: 'green',
    patch: 'orange',
    put: 'green',
    delete: 'red',
}

function Endpoints({ paths }) {
    return (
        <div>
            <h3>Endpoints</h3>
            <ul className="list-none m-0 p-0">
                {Object.entries(paths).map(([path, value]) => (
                    <li key={value}>
                        {Object.keys(value).map((verb) => (
                            <span key={verb}>
                                <span className={`text-${mapVerbsColor[verb]}`}>{verb.toUpperCase()} </span>
                                {path}
                                <br />
                            </span>
                        ))}
                    </li>
                ))}
            </ul>
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

function Params({ params, objects, object, depth = 0 }) {
    if (depth > 4) return null
    if (object) {
        params = Object.entries(object.properties).map(([key, value]) => {
            return {
                name: key,
                schema: value,
            }
        })
    }
    const [openSubParams, setOpenSubParams] = useState([])

    return (
        <>
            {params.map((param, index) => (
                <div key={index}>
                    <strong>{param.name}</strong> {param.schema.type}
                    {param.schema.enum && (
                        <>
                            {' '}
                            one of{' '}
                            {param.schema.enum.map((item) => (
                                <code style={{ marginRight: 4 }} key={item}>
                                    {item}
                                </code>
                            ))}
                        </>
                    )}
                    <br />
                    {param.schema.default && (
                        <>
                            Default: <code>{param.schema.default}</code>
                            <br />
                        </>
                    )}
                    <ReactMarkdown>{param.schema.description}</ReactMarkdown>
                    {param.schema.items?.$ref && (
                        <>
                            {openSubParams.indexOf(param.schema.items.$ref) > -1 ? (
                                <div>
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            setOpenSubParams(
                                                openSubParams.filter((item) => item !== param.schema.items.$ref)
                                            )
                                        }}
                                    >
                                        Show less
                                    </Button>
                                    <div style={{ marginLeft: '1rem' }}>
                                        <Params
                                            objects={objects}
                                            object={objects.schemas[param.schema.items?.$ref.split('/').at(-1)]}
                                            depth={depth + 1}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Button
                                        type="link"
                                        onClick={() => setOpenSubParams([...openSubParams, param.schema.items.$ref])}
                                    >
                                        Show more
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                    <hr />
                </div>
            ))}
        </>
    )
}
function Parameters({ item, objects }) {
    let pathParams = item.parameters?.filter((param) => param.in === 'path')
    let queryParams = item.parameters?.filter((param) => param.in === 'query')

    return (
        <>
            {pathParams?.length > 0 && (
                <>
                    <h4>Path Parameters</h4>
                    <Params params={pathParams} />
                </>
            )}
            {queryParams?.length > 0 && (
                <>
                    <h4>Query Parameters</h4>
                    <Params params={queryParams} />
                </>
            )}
        </>
    )
}

function RequestBody({ item, objects }) {
    let objectKey =
        item.requestBody?.content?.['application/json']?.schema['$ref'].split('/').at(-1) ||
        item.requestBody?.content?.['application/json']?.schema.items['$ref'].split('/').at(-1)
    if (!objectKey) return null
    let object = objects.schemas[objectKey]

    return (
        <>
            <h4>Request Parameters</h4>
            <br />
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
    )
}

function ResponseBody({ item, objects }) {
    let objectKey = item.responses[Object.keys(item.responses)[0]]?.content?.['application/json']?.schema['$ref']
        ?.split('/')
        .at(-1)
    if (!objectKey) return null
    let object = objects.schemas[objectKey]
    let [showResponse, setShowResponse] = useState(false)

    return (
        <>
            <h4>Response</h4>
            <Button type="link" style={{ padding: 0 }} onClick={() => setShowResponse(!showResponse)}>
                {showResponse ? 'Hide' : 'Show'} response
            </Button>
            <br />
            {showResponse && (
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
            )}
        </>
    )
}

function RequestExample({ item, objects, exampleLanguage, setExampleLanguage }) {
    let params = []

    if (item.requestBody) {
        let objectKey = item.requestBody.content?.['application/json']?.schema['$ref']?.split('/').at(-1)
        if (!objectKey) return null
        let object = objects.schemas[objectKey]
        params = Object.entries(object.properties).filter(
            ([name, schema]) => object.required?.indexOf(name) > -1 && !schema.readOnly
        )
        // If no params are required, just grab the first relevant one as an example
        if (params.length === 0) {
            params = [
                Object.entries(object.properties).filter(
                    ([name, schema]) => ['id', 'short_id'].indexOf(name) === -1
                )[0],
            ]
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
    const path = item.pathName.replaceAll('{', ':').replaceAll('}', '')
    let queryParams = item.parameters?.filter((param) => param.in === 'query')
    return (
        <>
            <div className="code-example justify-between flex">
                <div className="text-gray">
                    <span className={`text-${mapVerbsColor[item.httpVerb]}`}>{item.httpVerb.toUpperCase()} </span>
                    {path}
                </div>
                <Select
                    value={exampleLanguage}
                    onChange={(key) => setExampleLanguage(key)}
                    bordered={false}
                    style={{ border: 0, background: 'transparent', width: 90 }}
                >
                    <Select.Option key="curl" value="curl">
                        curl
                    </Select.Option>
                    <Select.Option key="python" value="python">
                        python
                    </Select.Option>
                </Select>
            </div>

            {exampleLanguage === 'curl' && (
                <CodeBlock
                    code={`export POSTHOG_PERSONAL_API_KEY=[your personal api key]
curl${item.httpVerb === 'delete' ? ' -X DELETE \\' : ''}
    -H "Authorization: Bearer $POSTHOG_PERSONAL_API_KEY" \\
    https://app.posthog.com${path}${params.map((item) => `\\\n\t-d ${item[0]}="${item[1]}"`)}`}
                    language="bash"
                    hideNumbers={true}
                />
            )}
            {exampleLanguage === 'python' && (
                <CodeBlock
                    code={`api_key = "[your personal api key]"
project_id = "[your project id]"
response = requests.${item.httpVerb}(
    "https://app.posthog.com${path}".format(
        project_id=project_id${path.includes('{id}') ? ',\n\t\tid=response["id"]' : ''}
    ),
    headers={"Authorization": "Bearer {}".format(api_key)},${
        params.length > 0
            ? `\n\tdata=${JSON.stringify(Object.fromEntries(params), null, '\t')
                  .replaceAll('\n', '\n\t')
                  .replace('\n}', '\n\t}')}`
            : ''
    }
)${item.httpVerb !== 'delete' ? '.json()' : ''}`}
                    language="bash"
                    hideNumbers={true}
                />
            )}
        </>
    )
}

function ResponseExample({ item, objects, objectKey }) {
    if (!objectKey) {
        return 'No response'
    }
    return (
        <Highlight
            {...defaultProps}
            code={JSON.stringify(
                OpenAPISampler.sample(objects.schemas[objectKey], {}, { components: objects }),
                null,
                2
            )}
            language="json"
        >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={className} style={{ background: '#24292E', margin: 0 }}>
                    {tokens.map((line, i) => (
                        <div {...getLineProps({ line, key: i })} key={i}>
                            {line.map((token, key) => (
                                <span {...getTokenProps({ token, key })} key={key} />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    )
}

const pathDescription = (item) => {
    let name = humanReadableName(item.operationId).toLowerCase()
    if (item.operationId.includes('_list')) {
        return (
            <>
                Returns a list of {name}. The {name} are returned in sorted order, with the most recent charges
                appearing first.
            </>
        )
    }
    if (item.httpVerb === 'get') {
        return <>Returns a single {name.slice(0, -1)}, which you can request by passing through an id in the url. </>
    }
    if (item.httpVerb === 'post') {
        return (
            <>
                Create {name}. You need to pass through any required fields, and you can optionally pass through other
                fields.
            </>
        )
    }
    if (item.httpVerb === 'patch') {
        return (
            <>Update {name} by setting the values of the parameters passed. Any parameters not set will be unchanged.</>
        )
    }
}

const SectionLinksTop = ({ previous, next }) => {
    return <SectionLinks className="mt-9" previous={previous} next={next} />
}

export default function ApiEndpoint({ data, pageContext: { slug, menu, previous, next, breadcrumb, breadcrumbBase } }) {
    const {
        data: { id, url },
        components: { components },
    } = data
    const name = humanReadableName(data.data.name)
    const paths = {}
    // Filter PUT as it's basically the same as PATCH
    const items = JSON.parse(data.data.items).filter((item) => item.httpVerb !== 'put')
    items.map((item) => {
        if (!paths[item.path]) {
            paths[item.path] = {}
        }
        paths[item.path][item.httpVerb] = item.operationSpec
    })
    const objects = JSON.parse(components)
    const mainEl = useRef()

    const [menuOpen, setMenuOpen] = useState(false)
    const [exampleLanguage, setExampleLanguageState] = useState()
    const setExampleLanguage = (language) => {
        setCookie('api_docs_example_language', language)
        setExampleLanguageState(language)
    }

    const handleMobileMenuClick = () => {
        setMenuOpen(!menuOpen)
    }
    const styles = {
        bmOverlay: {
            background: 'transparent',
        },
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setExampleLanguageState(getCookie('api_docs_example_language') || 'curl')
        }
    }, [])

    return (
        <>
            <SEO title={`${name} API Reference - PostHog`} />
            <Layout>
                <div className="handbook-container px-4">
                    <div id="handbook-menu-wrapper">
                        <Menu
                            width="calc(100vw - 80px)"
                            onClose={() => setMenuOpen(false)}
                            customBurgerIcon={false}
                            customCrossIcon={false}
                            styles={styles}
                            pageWrapId="handbook-content-menu-wrapper"
                            outerContainerId="handbook-menu-wrapper"
                            overlayClassName="backdrop-blur"
                            isOpen={menuOpen}
                        >
                            <MainSidebar height={'auto'} menu={menu} slug={slug} className="p-5 pb-32 md:hidden" />
                        </Menu>
                        <Navigation
                            title={name}
                            filePath={null}
                            breadcrumb={breadcrumb}
                            breadcrumbBase={breadcrumbBase}
                            menuOpen={menuOpen}
                            handleMobileMenuClick={handleMobileMenuClick}
                        />
                    </div>
                    <section id="handbook-content-menu-wrapper">
                        <SectionLinksTop next={next} previous={previous} />
                        <div className="flex items-start mt-8 md:space-x-16">
                            <MainSidebar
                                height={'auto'}
                                sticky
                                top={90}
                                mainEl={mainEl}
                                menu={menu}
                                slug={slug}
                                className="hidden md:block w-full transition-opacity md:opacity-60 hover:opacity-100 mb-14 flex-1"
                            />
                            <article
                                className="article-content api-content-container api-documentation flex-grow"
                                ref={mainEl}
                            >
                                <h2>{name}</h2>
                                <blockquote className="p-6 rounded bg-gray-accent-light dark:bg-gray-accent-dark">
                                    <p>
                                        For instructions on how to authenticate to use this endpoint, see{' '}
                                        <a className="text-red hover:text-red font-semibold" href="/docs/api/overview">
                                            API overview
                                        </a>
                                        .
                                    </p>
                                </blockquote>
                                <p>
                                    <ReactMarkdown>{items[0].operationSpec?.description}</ReactMarkdown>
                                </p>

                                <Endpoints paths={paths} />

                                {items.map((item) => {
                                    item = item.operationSpec
                                    let objectKey = 'Dashboard'

                                    return (
                                        <div className="mt-8" key={item.operationId}>
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                                                <div>
                                                    <h2>{generateName(item)}</h2>
                                                    <ReactMarkdown>
                                                        {!item.description ||
                                                        item.description === items[0].operationSpec?.description
                                                            ? pathDescription(item)
                                                            : item.description}
                                                    </ReactMarkdown>
                                                    <Parameters item={item} />

                                                    <RequestBody item={item} objects={objects} />

                                                    <ResponseBody item={item} objects={objects} />
                                                </div>
                                                <div className="lg:sticky top-0">
                                                    <h4>Request</h4>
                                                    <RequestExample
                                                        item={item}
                                                        objects={objects}
                                                        exampleLanguage={exampleLanguage}
                                                        setExampleLanguage={setExampleLanguage}
                                                    />

                                                    <h4>Response</h4>
                                                    <ResponseExample
                                                        item={item}
                                                        objects={objects}
                                                        objectKey={
                                                            item.responses[Object.keys(item.responses)[0]]?.content?.[
                                                                'application/json'
                                                            ]?.schema['$ref']
                                                                ?.split('/')
                                                                .at(-1) ||
                                                            item.responses[Object.keys(item.responses)[0]]?.content?.[
                                                                'application/json'
                                                            ]?.schema['items']['$ref']
                                                                ?.split('/')
                                                                .at(-1)
                                                        }
                                                        exampleLanguage={exampleLanguage}
                                                        setExampleLanguage={setExampleLanguage}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </article>
                        </div>
                    </section>
                </div>
            </Layout>
        </>
    )
}

export const query = graphql`
    query ApiEndpoint($id: String!) {
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
        }
        components: apiComponents {
            components
        }
    }
`

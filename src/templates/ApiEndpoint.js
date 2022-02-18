import Breadcrumbs from 'components/Breadcrumbs'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { graphql } from 'gatsby'
import React, {useState} from 'react'
import '../styles/api-docs.scss'

import { RedocStandalone } from 'redoc'
import Highlight, {defaultProps} from 'prism-react-renderer'
import CodeBlock from 'components/Home/CodeBlock'
import { Button } from 'antd'
import ReactMarkdown from 'react-markdown'
import { push as Menu } from 'react-burger-menu'
import MainSidebar from './Handbook/MainSidebar'
import Navigation from './Handbook/Navigation'

function Endpoints({paths}) {
    const map_verbs = {
        get: 'blue',
        post: 'green',
        patch: 'orange',
        put: 'green',
        delete: 'red',
    }
    return <div>
        <h3>Endpoints</h3>
    {Object.entries(paths).map(([path, value]) => 
        <>

            {Object.keys(value).map(verb => <>
            <span className={`text-${map_verbs[verb]}`}>{verb.toUpperCase()} </span>
            {path}<br />
            </>
            )}
        </>
    )}
    </div>
}

function generateName(item) {
    let name = item.operationId.split('_')
    name = name.slice(0, name.length-1).map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(' ')
    if(item.operationId.includes('_list')) {
        name = name + ' List'
    }
    return item.httpVerb.toUpperCase() + ' ' + name
}

function Params({params, objects, object, depth=0}) {
    if(depth > 4) return null
    if(object) {
        params = Object.entries(object.properties).map(([key, value]) => {
            return {
                name: key,
                schema: value
            }
        })
    }
    const [openSubParams, setOpenSubParams] = useState([])

    return  <>
        {params.map((param, index) => <>
            <strong>{param.name}</strong> {param.schema.type}
            {param.schema.enum && <> one of {param.schema.enum.map(item => <code style={{marginRight: 4}}>{item}</code>)}</>}
            <br />
            {param.schema.default && <>Default: <code>{param.schema.default}</code><br /></>}
            <ReactMarkdown>{param.schema.description}</ReactMarkdown>

            {param.schema.items?.$ref && <>

                {openSubParams.indexOf(param.schema.items.$ref) > -1 ? <div>
                    <Button type="link" onClick={() => {
                        setOpenSubParams(openSubParams.filter(item => item !== param.schema.items.$ref))
                    }}>Show less</Button>
                    <div style={{marginLeft: '1rem'}}>
                        <Params objects={objects} object={objects.schemas[param.schema.items?.$ref.split('/').at(-1)]} depth={depth+1} />
                    </div>
                </div>: <>
                    <Button type="link" onClick={() => setOpenSubParams([...openSubParams, param.schema.items.$ref])}>Show more</Button>
                </>
                } 
            </>}
            {index < params.length-1 && <hr />}
        </>)}
    </>
}
function Parameters({item, objects}) {
    let pathParams = item.parameters.filter(param => param.in === 'path')
    let queryParams = item.parameters.filter(param => param.in === 'query')
    
    return <>
        {pathParams.length > 0 && <>
            <h4>Path Parameters</h4>
            <Params params={pathParams} type="Path" />
        </>}
        {queryParams.length > 0 && <>
            <h4>Query Parameters</h4>
            <Params params={queryParams} type="Query" />
        </>}
    </>
}

function RequestBody({item, objects}) {
    let objectKey = item.requestBody?.content?.['application/json']?.schema['$ref'].split('/').at(-1)
    if(!objectKey) return null
    let object = objects.schemas[objectKey]

    return <>
    <br />
        <h4>Request Body</h4>
        <Params params={Object.entries(object.properties).map(([name, schema]) => {
            return {
                name,
                schema
            }
        }).filter(item => !item.schema.readOnly)} type="Path" objects={objects} />
    </>
}

function RequestExample({item, objects}) {
    let params = []
    if(item.requestBody) {
        let objectKey = item.requestBody.content?.['application/json']?.schema['$ref'].split('/').at(-1)
        if(!objectKey) return null
        let object = objects.schemas[objectKey]
        params = Object.entries(object.properties).filter(([name, schema]) => object.required?.indexOf(name) > -1 && !schema.readOnly).map(([name, schema]) => {
            return [name, schema.example || schema.type]
        })
    }
    let queryParams = item.parameters.filter(param => param.in === 'query')

    return <CodeBlock
        code={`curl https://app.posthog.com${item.pathName} \\n
    -u token \
    ${params.map(item => `-d ${item[0]}="${item[1]}\n`)}
        `}
        language="bash"
        />
}

function generateResponseExample(objectKey, objects, depth=0) {
    if(depth > 4) { return ""}
    let resp = {}
    Object.entries(objects.schemas[objectKey].properties).map(([key, value]) => {
        if (value.type === 'array' && value.items.$ref) {
            
            resp[key] = [
                generateResponseExample(value.items.$ref.split('/').at(-1), objects)
            ]
        } else if (value.allOf) {
            resp[key] = generateResponseExample(value.allOf[0].$ref.split('/').at(-1), objects)

        } else {
            resp[key] = value.example || value.type
        }
    })
    return resp
}


function ResponseExample({item, objects, objectKey}) {
    
    if(!objectKey) {
        return "No response"
    }
    return <Highlight {...defaultProps} code={JSON.stringify(generateResponseExample(objectKey, objects), null, 2)} language="json">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ background: '#24292E', margin: 0 }}>
            {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                <span {...getTokenProps({ token, key })} />
                ))}
            </div>
            ))}
        </pre>
        )}
    </Highlight>
}

export default function ApiEndpoint({
    data,
    pageContext: { menu, next, previous, breadcrumb = [], breadcrumbBase, tableOfContents },
    }) {
    const {
        data: { id, items, name, url },
        components: { components },
    } = data
    const paths = {}
    JSON.parse(items).map((item) => {
        if (!paths[item.path]) {
            paths[item.path] = {}
        }
        paths[item.path][item.httpVerb] = item.operationSpec
    })
    const objects = JSON.parse(components)
    console.log(objects)
    console.log(paths)
    const [menuOpen, setMenuOpen] = useState(false)
    const handleMobileMenuClick = () => {
        setMenuOpen(!menuOpen)
    }
    const slug = ""
    const title=""
    const filePath = ""
    return (
        <>
            <SEO title={`${name} - PostHog`} />
            <Layout>
                <div className="handbook-container px-4">
                    <div id="handbook-menu-wrapper">
                        {/* <Menu
                            width="calc(100vw - 80px)"
                            onClose={() => setMenuOpen(false)}
                            customBurgerIcon={false}
                            customCrossIcon={false}
                            // styles={styles}
                            pageWrapId="handbook-content-menu-wrapper"
                            outerContainerId="handbook-menu-wrapper"
                            overlayClassName="backdrop-blur"
                            isOpen={menuOpen}
                        >
                            <MainSidebar height={'auto'} menu={menu} slug={""} className="p-5 pb-32 md:hidden" />
                        </Menu>
                        <Navigation
                            next={next}
                            previous={previous}
                            title={title}
                            filePath={filePath}
                            breadcrumb={breadcrumb}
                            breadcrumbBase={breadcrumbBase}
                            menuOpen={menuOpen}
                            handleMobileMenuClick={handleMobileMenuClick}
                        /> */}
                        <div id="handbook-content-menu-wrapper">
                            <div className="max-w-screen-sm mx-auto px-4 flex flex-col md:flex-row items-start mt-16 md:mt-20">
                                <section className="plugin-content api-documentation">
                                    <h2>{name}</h2>
                                    
                                    <Endpoints paths={paths} />

                                    {JSON.parse(items).filter(item => !item.operationId.includes('partial')).map(item => {
                                        item = item.operationSpec
                                        let objectKey = 'Dashboard'
                                        
                                        console.log(item)
                                        return <>
                                            <h2>{generateName(item)}</h2>
                                            <div className="grid grid-cols-2">
                                                <div>
                                                    <Parameters item={item} />
                                                    <RequestBody item={item} objects={objects} />

                                                </div>
                                                <div>
                                                    <h3>Request</h3>
                                                    <RequestExample item={item} objects={objects} />

                                                    <h3>Response</h3>
                                                    <ResponseExample item={item} objects={objects} objectKey={item.responses[Object.keys(item.responses)[0]]?.content?.['application/json']?.schema['$ref'].split('/').at(-1)} />
                                                    
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    })}
                                    
                                </section>
                            </div>
                        </div>
                    </div>
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

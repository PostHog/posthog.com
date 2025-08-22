import React from 'react'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import PostLayout from '../components/PostLayout'
import CommunityQuestions from '../components/CommunityQuestions'
import { docsMenu } from '../navs'
import { Steps, Step } from '../components/Docs/Steps'
import { CalloutBox } from '../components/Docs/CalloutBox'
import { CodeBlock } from '../components/CodeBlock'
import ReactMarkdown from 'react-markdown'
import Accordion from '../components/SdkReferences/Accordion'
import { CallToAction } from '../components/CallToAction'

interface StepContent {
    type: string
    [key: string]: any
}

interface StepData {
    title: string
    badge?: string
    content: StepContent[]
}

interface StepsData {
    title: string
    description: string
    steps: StepData[]
}

interface StepsTemplateProps {
    pageContext: {
        stepsData: StepsData
        title: string
        description: string
    }
}

// Component renderer for custom PostHog components in markdown
const renderPostHogComponents = (markdown: string) => {
    // Handle ProductScreenshot
    const productScreenshotRegex = /<ProductScreenshot\s+([^>]+)\s*\/>/g
    const callToActionRegex = /<CallToAction\s+([^>]+)>([^<]+)<\/CallToAction>/g
    
    let result = markdown
    
    // Replace ProductScreenshot with img tags for now (can be enhanced later)
    result = result.replace(productScreenshotRegex, (match, attrs) => {
        const imageLightMatch = attrs.match(/imageLight="([^"]+)"/)
        const altMatch = attrs.match(/alt="([^"]+)"/)
        const classMatch = attrs.match(/className="([^"]+)"/)
        
        if (imageLightMatch) {
            const src = imageLightMatch[1]
            const alt = altMatch ? altMatch[1] : 'Screenshot'
            const className = classMatch ? classMatch[1] : ''
            return `<img src="${src}" alt="${alt}" class="${className}" style="border-radius: 8px;" />`
        }
        return match
    })
    
    // Replace CallToAction with links for now
    result = result.replace(callToActionRegex, (match, attrs, text) => {
        const toMatch = attrs.match(/to="([^"]+)"/)
        if (toMatch) {
            const href = toMatch[1]
            return `[${text}](${href})`
        }
        return text
    })
    
    return result
}

const ContentRenderer: React.FC<{ content: StepContent[] }> = ({ content }) => {
    if (!content || !Array.isArray(content)) {
        return <div>No content available</div>
    }
    
    return (
        <>
            {content.map((item, index) => {
                switch (item.type) {
                    case 'markdown':
                        const processedMarkdown = renderPostHogComponents(item.inner_md)
                        return (
                            <div key={index} className="prose max-w-none">
                                <ReactMarkdown 
                                    components={{
                                        img: ({ src, alt, ...props }) => (
                                            <img 
                                                src={src} 
                                                alt={alt} 
                                                {...props} 
                                                style={{ borderRadius: '8px', maxWidth: '100%' }} 
                                            />
                                        )
                                    }}
                                >
                                    {processedMarkdown}
                                </ReactMarkdown>
                            </div>
                        )
                    
                    
                    case 'codeBlock':
                        return (
                            <CodeBlock key={index} currentLanguage={{ language: item.language, code: item.code }}>
                                {[{ language: item.language, code: item.code }]}
                            </CodeBlock>
                        )
                    
                    case 'multi-language':
                        // Parse the markdown content to extract code blocks with their languages
                        const codeBlocks = item.inner_md.match(/```(\w+)\s+file=(\w+)\n([\s\S]*?)```/g) || []
                        const languages = codeBlocks.map((block: string) => {
                            const match = block.match(/```(\w+)\s+file=(\w+)\n([\s\S]*?)```/)
                            if (match) {
                                return {
                                    language: match[1],
                                    code: match[3].trim(),
                                    label: match[2],
                                    file: match[2]
                                }
                            }
                            return null
                        }).filter(Boolean)
                        
                        if (languages.length > 0) {
                            return (
                                <CodeBlock key={index} currentLanguage={languages[0]} selector="tabs">
                                    {languages}
                                </CodeBlock>
                            )
                        }
                        return <div key={index}>No code blocks found</div>
                    
                    case 'callout':
                        return (
                            <CalloutBox key={index} type={item.variant || 'fyi'} title="Important" icon="IconQuestion">
                                {item.inner_md}
                            </CalloutBox>
                        )
                    
                    case 'details':
                        return (
                            <Accordion key={index} title={item.summary}>
                                <div className="prose max-w-none">
                                    <ReactMarkdown>{item.inner_md}</ReactMarkdown>
                                </div>
                            </Accordion>
                        )
                    
                    case 'note':
                        return (
                            <div key={index} className="bg-yellow-50 border border-yellow-200 rounded p-3 my-2">
                                <div className="text-yellow-800">
                                    <div className="prose max-w-none">
                                        <ReactMarkdown>{`**Note:** ${item.inner_md}`}</ReactMarkdown>
                                    </div>
                                </div>
                            </div>
                        )
                    
                    case 'product-screenshot':
                        // Parse ProductScreenshot component with regex
                        const psMatch = item.inner_md.match(/<ProductScreenshot\s+([^>]+)\s*\/>/)
                        if (psMatch) {
                            const { ProductScreenshot } = require('../components/ProductScreenshot')
                            const attrs = psMatch[1]
                            const imageLightMatch = attrs.match(/imageLight="([^"]+)"/)
                            const imageDarkMatch = attrs.match(/imageDark="([^"]+)"/)
                            const altMatch = attrs.match(/alt="([^"]+)"/)
                            const classesMatch = attrs.match(/classes="([^"]+)"/)
                            const classNameMatch = attrs.match(/className="([^"]+)"/)
                            
                            const props = {
                                imageLight: imageLightMatch ? imageLightMatch[1] : '',
                                imageDark: imageDarkMatch ? imageDarkMatch[1] : '',
                                alt: altMatch ? altMatch[1] : '',
                                classes: classesMatch ? classesMatch[1] : '',
                                className: classNameMatch ? classNameMatch[1] : ''
                            }
                            
                            return <ProductScreenshot key={index} {...props} />
                        }
                        return <div key={index}>Invalid ProductScreenshot format</div>
                    
                    case 'call-to-action':
                        // Parse CallToAction component with regex
                        const ctaMatch = item.inner_md.match(/<CallToAction\s+([^>]+)>([^<]+)<\/CallToAction>/)
                        if (ctaMatch) {
                            const { CallToAction } = require('../components/CallToAction')
                            const attrs = ctaMatch[1]
                            const content = ctaMatch[2]
                            
                            const classNameMatch = attrs.match(/className="([^"]+)"/)
                            const sizeMatch = attrs.match(/size="([^"]+)"/)
                            const typeMatch = attrs.match(/type="([^"]+)"/)
                            const toMatch = attrs.match(/to="([^"]+)"/)
                            const externalMatch = attrs.match(/external={([^}]+)}/)
                            
                            const props = {
                                className: classNameMatch ? classNameMatch[1] : '',
                                size: sizeMatch ? sizeMatch[1] : 'md',
                                type: typeMatch ? typeMatch[1] : 'primary',
                                to: toMatch ? toMatch[1] : '',
                                external: externalMatch ? externalMatch[1] === 'true' : false
                            }
                            
                            return <CallToAction key={index} {...props}>{content}</CallToAction>
                        }
                        return <div key={index}>Invalid CallToAction format</div>
                    
                    case 'component':
                        return (
                            <div key={index} className="bg-gray-100 border border-gray-300 rounded p-4 my-4">
                                <div className="font-semibold text-gray-700">Component: {item.name}</div>
                                <div className="text-sm text-gray-600">{item.description}</div>
                                {item.props && (
                                    <div className="text-xs text-gray-500 mt-1">
                                        Props: {JSON.stringify(item.props)}
                                    </div>
                                )}
                            </div>
                        )
                    
                    default:
                        return (    
                            <div key={index} className="bg-red-100 border border-red-300 rounded p-2 my-2">
                                <div className="text-red-700">Unknown content type: {item.type}</div>
                                <pre className="text-xs">{JSON.stringify(item, null, 2)}</pre>
                            </div>
                        )
                }
            })}
        </>
    )
}

const StepsTemplate: React.FC<StepsTemplateProps> = ({ pageContext }) => {
    const { stepsData, title, description } = pageContext
    const activeInternalMenu = docsMenu.children.find(({ name }): boolean => name === 'Product OS')

    // Generate table of contents from steps
    const tableOfContents = stepsData.steps.map((step, stepIndex) => ({
        url: `step-${stepIndex + 1}`,
        value: step.title,
        depth: 0,
    }))

    return (
        <Layout parent={docsMenu} activeInternalMenu={activeInternalMenu}>
            <SEO title={`${title} - PostHog`} description={description} />
            <PostLayout
                title={title}
                questions={<CommunityQuestions />}
                menu={activeInternalMenu?.children || []}
                fullWidthContent={true}
                hideSidebar={false}
                sidebar={<></>}
                tableOfContents={tableOfContents}
            >
                <section>
                    <div className="mb-8 relative">
                        <div className="flex items-center mt-0 flex-wrap justify-between">
                            <div className="flex flex-col-reverse md:flex-row md:items-center space-x-2 mb-1 w-full">
                                <div className="flex-1">
                                    <h1 className="dark:text-white text-3xl sm:text-4xl m-0">
                                        {title}
                                    </h1>
                                    {description && (
                                        <p className="text-lg text-primary/70 dark:text-primary-dark/70 mt-2 mb-4">
                                            {description}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full">
                        <Steps>
                            {stepsData.steps.map((step, stepIndex) => (
                                <Step key={`step-${stepIndex + 1}`} title={step.title} badge={step.badge as "required" | "optional" | "recommended"}>
                                    <ContentRenderer content={step.content} />
                                    {/* <p>test</p> */}
                                </Step>
                            ))}
                        </Steps>
                    </div>
                </section>
            </PostLayout>
        </Layout>
    )
}

export default StepsTemplate
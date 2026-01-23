import React, { createContext, useContext, useState } from 'react'
import { Steps, Step } from 'components/Docs/Steps'
import { MdxCodeBlock, CodeBlock, SingleCodeBlock } from 'components/CodeBlock'
import { CalloutBox } from 'components/Docs/CalloutBox'
import { ProductScreenshot } from 'components/ProductScreenshot'
import OSButton from 'components/OSButton'
import { Blockquote } from 'components/BlockQuote'
import { dedent } from '../../utils'
import Tab from 'components/Tab'
import { Markdown } from 'components/Squeak/components/Markdown'
import Link from 'components/Link'

const transformPosthogLink = (href: string | undefined): string | undefined => {
    if (!href) return href

    try {
        const url = new URL(href)
        if (url.hostname === 'posthog.com' || url.hostname === 'www.posthog.com') {
            return url.pathname + url.search + url.hash
        }
    } catch {
        return href
    }

    return href
}

// This transforms absolute posthog.com links defined in app as relative links
const InAppLink = ({ node, href, ...props }: any) => {
    const transformedHref = transformPosthogLink(href) || href || ''
    return <Link to={transformedHref} state={{ newWindow: true }} {...props} />
}

type CodeBlockItem = {
    language: string
    file?: string
    code: string
}

type CodeBlockWrapperProps = { blocks: CodeBlockItem[] } | { language: string; code: string }

const CodeBlockWrapper = (props: CodeBlockWrapperProps) => {
    // Handle single code block format
    if ('language' in props && 'code' in props) {
        const { language, code } = props
        return (
            <SingleCodeBlock language={language} showLabel={false}>
                {code}
            </SingleCodeBlock>
        )
    }

    const { blocks } = props

    if (!blocks || blocks.length === 0) {
        return null
    }

    const [currentLanguage, setCurrentLanguage] = useState(blocks[0])

    return (
        <CodeBlock currentLanguage={currentLanguage} onChange={setCurrentLanguage}>
            {blocks}
        </CodeBlock>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MDXComponent = React.ComponentType<any>

// No-op component for unknown components from upstream monorepo
// This prevents runtime errors when upstream monorepo adds new components we don't have
const UnknownComponent: MDXComponent = () => null

interface DocsComponents {
    Steps: MDXComponent
    Step: MDXComponent
    MdxCodeBlock: MDXComponent
    CodeBlock: React.ComponentType<CodeBlockWrapperProps>
    CalloutBox: MDXComponent
    ProductScreenshot: MDXComponent
    OSButton: MDXComponent
    Markdown: MDXComponent
    Blockquote: MDXComponent
    Tab: typeof Tab
    dedent: (strings: TemplateStringsArray | string, ...values: unknown[]) => string
    snippets?: Record<string, React.ComponentType<Record<string, never>>>
    // Allow additional components from upstream monorepo without breaking
    [key: string]: unknown
}

const MDXComponentsContext = createContext<DocsComponents>({
    Steps,
    Step,
    MdxCodeBlock,
    CodeBlock: CodeBlockWrapper,
    CalloutBox,
    ProductScreenshot,
    OSButton,
    Markdown,
    Blockquote,
    Tab,
    dedent,
})

export const useMDXComponents = (): DocsComponents => {
    return useContext(MDXComponentsContext)
}

interface OnboardingContentWrapperProps {
    children: React.ReactNode
    snippets?: Record<string, React.ComponentType<Record<string, never>>>
}

export const OnboardingContentWrapper: React.FC<OnboardingContentWrapperProps> = ({ children, snippets }) => {
    return (
        <MDXComponentsContext.Provider
            value={{
                Steps,
                Step,
                MdxCodeBlock,
                CodeBlock: CodeBlockWrapper,
                CalloutBox,
                ProductScreenshot,
                OSButton,
                Markdown: (props: any) => (
                    <Markdown
                        {...props}
                        components={{
                            a: InAppLink,
                        }}
                    />
                ),
                Blockquote,
                Tab,
                dedent,
                snippets,
            }}
        >
            {children}
        </MDXComponentsContext.Provider>
    )
}

interface StepDefinition {
    title: string
    badge?: string
    content: React.ReactNode
}

// TODO: Consider consolidating with DocsComponents above - these interfaces are nearly identical
// and both have index signatures. OnboardingComponents could extend DocsComponents or be removed.
interface OnboardingComponents {
    Steps: MDXComponent
    Step: MDXComponent
    CodeBlock: React.ComponentType<CodeBlockWrapperProps>
    CalloutBox: MDXComponent
    Markdown: MDXComponent
    Tab: typeof Tab
    dedent: (strings: TemplateStringsArray | string, ...values: unknown[]) => string
    snippets?: Record<string, React.ComponentType<Record<string, never>>>
    // Allow additional components from upstream monorepo without breaking
    [key: string]: unknown
}

interface InstallationProps {
    modifySteps?: (steps: StepDefinition[]) => StepDefinition[]
}

export const createInstallation = (getSteps: (ctx: OnboardingComponents) => StepDefinition[]) => {
    return function Installation({ modifySteps }: InstallationProps) {
        const allComponents = useMDXComponents()

        // Wrap components in a proxy that returns UnknownComponent for missing keys
        // This prevents runtime errors when upstream monorepo adds new components we don't have
        const safeComponents = new Proxy(allComponents as OnboardingComponents, {
            get(target, prop: string) {
                const value = target[prop]
                if (value !== undefined) {
                    return value
                }
                // Return no-op component for unknown components
                return UnknownComponent
            },
        })

        let steps = getSteps(safeComponents)
        if (modifySteps) {
            steps = modifySteps(steps)
        }

        const { Steps, Step } = allComponents

        return (
            <Steps>
                {steps.map((step, index) => (
                    <Step key={index} title={step.title} badge={step.badge}>
                        {step.content}
                    </Step>
                ))}
            </Steps>
        )
    }
}

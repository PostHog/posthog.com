import React, { createContext, useContext, useState } from 'react'
import { Steps, Step } from 'components/Docs/Steps'
import { MdxCodeBlock, CodeBlock, SingleCodeBlock } from 'components/CodeBlock'
import { CalloutBox } from 'components/Docs/CalloutBox'
import { ProductScreenshot } from 'components/ProductScreenshot'
import OSButton from 'components/OSButton'
import { Markdown } from 'components/Squeak/components/Markdown'
import { Blockquote } from 'components/BlockQuote'
import { dedent } from '~/utils'

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

    // Handle blocks array format
    const { blocks } = props
    const [currentLanguage, setCurrentLanguage] = useState<CodeBlockItem | null>(
        blocks && blocks.length > 0 ? blocks[0] : null
    )

    React.useEffect(() => {
        if (blocks && blocks.length > 0 && (!currentLanguage || !blocks.includes(currentLanguage))) {
            setCurrentLanguage(blocks[0])
        }
    }, [blocks, currentLanguage])

    if (!blocks || blocks.length === 0 || !currentLanguage) {
        return null
    }

    return (
        <CodeBlock currentLanguage={currentLanguage} onChange={setCurrentLanguage}>
            {blocks}
        </CodeBlock>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MDXComponent = React.ComponentType<any>

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
    dedent: (strings: TemplateStringsArray | string, ...values: unknown[]) => string
    snippets?: Record<string, MDXComponent>
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
    dedent,
})

export const useMDXComponents = (): DocsComponents => {
    return useContext(MDXComponentsContext)
}

interface OnboardingContentWrapperProps {
    children: React.ReactNode
    snippets?: Record<string, MDXComponent>
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
                Markdown,
                Blockquote,
                dedent,
                snippets,
            }}
        >
            {children}
        </MDXComponentsContext.Provider>
    )
}

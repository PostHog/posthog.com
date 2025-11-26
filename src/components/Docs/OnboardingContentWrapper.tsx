import React, { createContext, useContext } from 'react'
import { Steps, Step } from 'components/Docs/Steps'
import { MdxCodeBlock } from 'components/CodeBlock'
import { CalloutBox } from 'components/Docs/CalloutBox'
import { ProductScreenshot } from 'components/ProductScreenshot'
import OSButton from 'components/OSButton'
import { Markdown } from 'components/Squeak/components/Markdown'
import { Blockquote } from 'components/BlockQuote'

const createCodeBlock = (language: string, code: string, file?: string) => ({
    props: {
        mdxType: 'pre',
        children: {
            key: null,
            props: {
                className: `language-${language}`,
                mdxType: 'code',
                children: code,
                file: file,
            },
        },
    },
})

interface DocsComponents {
    Steps: React.ComponentType<any>
    Step: React.ComponentType<any>
    MdxCodeBlock: React.ComponentType<any>
    CalloutBox: React.ComponentType<any>
    ProductScreenshot: React.ComponentType<any>
    OSButton: React.ComponentType<any>
    Markdown: React.ComponentType<any>
    Blockquote: React.ComponentType<any>
    createCodeBlock: (language: string, code: string, file?: string) => any
    snippets?: Record<string, React.ComponentType<any>>
}

const MDXComponentsContext = createContext<DocsComponents>({
    Steps,
    Step,
    MdxCodeBlock,
    CalloutBox,
    ProductScreenshot,
    OSButton,
    Markdown,
    Blockquote,
    createCodeBlock,
})

export const useMDXComponents = (): DocsComponents => {
    return useContext(MDXComponentsContext)
}

interface OnboardingContentWrapperProps {
    children: React.ReactNode
    snippets?: Record<string, React.ComponentType<any>>
}

export const OnboardingContentWrapper: React.FC<OnboardingContentWrapperProps> = ({ children, snippets }) => {
    return (
        <MDXComponentsContext.Provider
            value={{
                Steps,
                Step,
                MdxCodeBlock,
                CalloutBox,
                ProductScreenshot,
                OSButton,
                Markdown,
                Blockquote,
                createCodeBlock,
                snippets,
            }}
        >
            {children}
        </MDXComponentsContext.Provider>
    )
}

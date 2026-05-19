import React, { useMemo } from 'react'
import { MDXProvider } from '@mdx-js/react'
import { navigate } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { JsxComponentDescriptor } from '@mdxeditor/editor'
import Editor from 'components/Editor'
import Link from 'components/Link'

interface KoreanMDXViewerProps {
    mdxBody: string
    jsxComponentDescriptors: JsxComponentDescriptor[]
    cta?: {
        url: string
        label: string
    }
    maxWidth?: number
}

export default function KoreanMDXViewer({ mdxBody, jsxComponentDescriptors, cta, maxWidth }: KoreanMDXViewerProps) {
    const mdxComponents = useMemo(() => {
        return jsxComponentDescriptors.reduce((acc, descriptor) => {
            acc[descriptor.name] = descriptor.Editor
            return acc
        }, {} as Record<string, React.ComponentType<any>>)
    }, [jsxComponentDescriptors])
    const providerComponents = useMemo(() => ({ a: Link, ...mdxComponents }), [mdxComponents])

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const href = (event.target as HTMLElement).closest('a')?.getAttribute('href')
        if (href?.startsWith('/')) {
            event.preventDefault()
            navigate(href, { state: { newWindow: true } })
        }
    }

    return (
        <Editor type="mdx" cta={cta}>
            <div onClick={handleClick} style={maxWidth ? { maxWidth, margin: '0 auto' } : undefined}>
                <MDXProvider components={providerComponents}>
                    <MDXRenderer>{mdxBody}</MDXRenderer>
                </MDXProvider>
            </div>
        </Editor>
    )
}

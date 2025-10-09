import React from 'react'
import { Heading } from 'types'
import { AnchorIcon } from './AnchorIcon'
import './style.css'

const getNodeText = (children: string | React.ReactNode): string => {
    let text = ''
    if (typeof children === 'string') {
        text = children
    } else {
        React.Children.map(children, (child) => {
            if (text === '' && !React.isValidElement(child)) {
                text = child as string
            }
        })
    }
    return text
}

export const getAnchor = (children: string | React.ReactNode): string => {
    const text = getNodeText(children)
    return text
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/[ ]/g, '-')
}

const HeaderNode = ({
    headingType,
    anchor,
    children,
}: {
    headingType: Heading
    children: string | React.ReactNode
    anchor?: string
}) => {
    const isSupportedHeading = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

    if (!isSupportedHeading.includes(headingType)) {
        throw new Error(`Unsupported HiddenSection headingType of ${headingType}`)
    }

    const Heading = `${headingType}` as keyof JSX.IntrinsicElements

    return (
        <Heading id={anchor} style={{ display: 'inline-block' }}>
            {children}
        </Heading>
    )
}

export function MdxHeader({
    children,
    headingType,
}: {
    children: string | React.ReactNode
    headingType: Heading
}): JSX.Element {
    const anchor = getAnchor(children)
    const link = `#${anchor}`

    return (
        <div className="mdx-header" style={{ position: 'relative' }}>
            <HeaderNode headingType={headingType} anchor={anchor}>
                <a href={link} className="anchor-link post-toc-anchor">
                    <AnchorIcon />
                </a>
                {children}
            </HeaderNode>
        </div>
    )
}

export const H1 = ({ children }: { children: string }) => <MdxHeader headingType="h1">{children}</MdxHeader>
export const H2 = ({ children }: { children: string }) => <MdxHeader headingType="h2">{children}</MdxHeader>
export const H3 = ({ children }: { children: string }) => <MdxHeader headingType="h3">{children}</MdxHeader>
export const H4 = ({ children }: { children: string }) => <MdxHeader headingType="h4">{children}</MdxHeader>
export const H5 = ({ children }: { children: string }) => <MdxHeader headingType="h5">{children}</MdxHeader>
export const H6 = ({ children }: { children: string }) => <MdxHeader headingType="h6">{children}</MdxHeader>

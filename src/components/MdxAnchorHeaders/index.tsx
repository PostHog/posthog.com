import React from 'react'
import { Heading } from 'types'
import { AnchorIcon } from './AnchorIcon'
import './style.scss'

const getAnchor = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/[ ]/g, '-')
}

const generateHeading = (headingType: Heading, children: string | React.ReactNode, anchor: string) => {
    switch (headingType) {
        case 'h1':
            return <h1 id={anchor}>{children}</h1>
        case 'h2':
            return <h2 id={anchor}>{children}</h2>
        case 'h3':
            return <h3 id={anchor}>{children}</h3>
        case 'h4':
            return <h4 id={anchor}>{children}</h4>
        case 'h5':
            return <h5 id={anchor}>{children}</h5>
        case 'h6':
            return <h6 id={anchor}>{children}</h6>
    }
}

export const MdxHeader = ({ children, headingType }: { children: string | React.ReactNode; headingType: Heading }) => {
    // simplistic handling for when a heading has another element inside of it (e.g. a link)
    if (!(typeof children === 'string')) {
        return <>{generateHeading(headingType, children, '')}</>
    }
    const anchor = getAnchor(children)
    const link = `#${anchor}`
    return (
        <div className="mdx-header">
            <a href={link} className="anchor-link">
                <AnchorIcon />
            </a>
            {generateHeading(headingType, children, anchor)}
        </div>
    )
}

export const H1 = ({ children }: { children: string }) => <MdxHeader headingType="h1">{children}</MdxHeader>
export const H2 = ({ children }: { children: string }) => <MdxHeader headingType="h2">{children}</MdxHeader>
export const H3 = ({ children }: { children: string }) => <MdxHeader headingType="h3">{children}</MdxHeader>
export const H4 = ({ children }: { children: string }) => <MdxHeader headingType="h4">{children}</MdxHeader>
export const H5 = ({ children }: { children: string }) => <MdxHeader headingType="h5">{children}</MdxHeader>
export const H6 = ({ children }: { children: string }) => <MdxHeader headingType="h6">{children}</MdxHeader>

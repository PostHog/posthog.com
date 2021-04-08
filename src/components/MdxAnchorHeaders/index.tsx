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

const generateHeading = (headingType: Heading, text: string, anchor: string) => {
    switch (headingType) {
        case 'h1':
            return <h1 id={anchor}>{text}</h1>
        case 'h2':
            return <h2 id={anchor}>{text}</h2>
        case 'h3':
            return <h3 id={anchor}>{text}</h3>
        case 'h4':
            return <h4 id={anchor}>{text}</h4>
        case 'h5':
            return <h5 id={anchor}>{text}</h5>
        case 'h6':
            return <h5 id={anchor}>{text}</h5>
    }
}

export const MdxHeader = ({ children, headingType }: { children: string; headingType: Heading }) => {
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

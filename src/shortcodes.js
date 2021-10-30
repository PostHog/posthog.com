import { Endpoint } from 'components/APIDocs/Endpoint'
import { ArrayCTA } from 'components/ArrayCTA'
import { BasicHedgehogImage } from 'components/BasicHedgehogImage'
import { Blockquote } from 'components/BlockQuote'
import { BorderWrapper } from 'components/BorderWrapper'
import { CallToAction } from 'components/CallToAction'
import { CodeBlock } from 'components/CodeBlock'
import { CompensationCalculator } from 'components/CompensationCalculator'
import { FloatedImage } from 'components/FloatedImage'
import { GithubIcon } from 'components/GithubIcon'
import { Heading } from 'components/Heading'
import { HiddenSection } from 'components/HiddenSection'
import { ImageBlock } from 'components/ImageBlock'
import { InlineCode } from 'components/InlineCode'
import { LibraryStats } from 'components/LibraryStats'
import Link from 'components/Link'
import { OverflowXSection } from 'components/OverflowXSection'
import { Quote } from 'components/Pricing/Quote'
import { VisitLibrary } from 'components/VisitLibrary'
import { ZoomImage } from 'components/ZoomImage'
import React from 'react'

const A = (props) => <Link {...props} className="text-red hover:text-red font-semibold" />
const Iframe = (props) => (
    <div style={{ position: 'relative', height: 0, paddingBottom: '56.25%' }}>
        <iframe {...props} className="absolute top-0 left-0 w-full h-full" />
    </div>
)

export const shortcodes = {
    OverflowXSection,
    HiddenSection,
    LibraryStats,
    GithubIcon,
    VisitLibrary,
    CompensationCalculator,
    BasicHedgehogImage,
    BorderWrapper,
    Quote,
    CallToAction,
    Endpoint,
    ArrayCTA,
    FloatedImage,
    ImageBlock,
    inlineCode: InlineCode,
    blockquote: Blockquote,
    pre: CodeBlock,
    a: A,
    iframe: Iframe,
    img: ZoomImage,
    h1: (props) => Heading({ as: 'h1', ...props }),
    h2: (props) => Heading({ as: 'h2', ...props }),
    h3: (props) => Heading({ as: 'h3', ...props }),
    h4: (props) => Heading({ as: 'h4', ...props }),
    h5: (props) => Heading({ as: 'h5', ...props }),
    h6: (props) => Heading({ as: 'h6', ...props }),
}

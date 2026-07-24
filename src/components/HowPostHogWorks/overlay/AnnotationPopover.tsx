import React, { forwardRef } from 'react'
import Link from 'components/Link'
import { SingleCodeBlock } from 'components/CodeBlock'
import { PRODUCTS } from './products'
import { Annotation } from './types'

interface AnnotationPopoverProps {
    annotation: Annotation
    onClose: () => void
}

// Custom absolutely-positioned card rather than a Radix popover: Radix
// portals to <body> and escapes the app window's clipping, while this one
// stays inside the browser-frame stage where the tracking loop positions it.
const AnnotationPopover = forwardRef<HTMLDivElement, AnnotationPopoverProps>(function AnnotationPopover(
    { annotation, onClose },
    ref
) {
    const product = PRODUCTS[annotation.product]

    return (
        <div ref={ref} data-hpw-popover className="hpw-pop hpw-pop-in">
            <div className="hpw-pop-head">
                <span className="hpw-ic" style={{ background: product.color }} />
                <span className="hpw-lbl">{annotation.label}</span>
                <span className="hpw-pop-ptag" style={{ background: product.color, color: product.textOnColor }}>
                    {product.name}
                </span>
                <button className="hpw-pop-close" onClick={onClose} aria-label="Close">
                    ✕
                </button>
            </div>
            <div className="hpw-pop-title">{annotation.title}</div>
            <div className="hpw-pop-body">
                <div className="hpw-why">{annotation.body.why}</div>
                {annotation.body.code && (
                    <div className="hpw-pop-code">
                        <SingleCodeBlock language={annotation.body.code.language} showLabel={false} showCopy={false}>
                            {annotation.body.code.snippet}
                        </SingleCodeBlock>
                    </div>
                )}
                {annotation.body.after && <div className="hpw-why">{annotation.body.after}</div>}
                {product.docsUrl && (
                    <Link className="hpw-pop-docs" to={product.docsUrl}>
                        {product.name} docs →
                    </Link>
                )}
            </div>
        </div>
    )
})

export default AnnotationPopover

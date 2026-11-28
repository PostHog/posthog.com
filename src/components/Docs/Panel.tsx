import React from 'react'

/** A surface on the page ground, after `FeaturePanel` on `/desktop`. Colour lives in the icons only. */
const Panel = ({
    eyebrow,
    description,
    children,
}: {
    eyebrow: React.ReactNode
    description?: string
    children: React.ReactNode
}): JSX.Element => (
    <section className="@container flex h-full flex-col rounded border border-primary bg-primary p-4 @xl:p-5">
        <h2 className={`m-0 text-sm font-bold uppercase tracking-wide text-primary ${description ? 'mb-1' : 'mb-3'}`}>
            {eyebrow}
        </h2>
        {description && <p className="m-0 mb-3 text-sm leading-snug text-secondary">{description}</p>}
        {children}
    </section>
)

export default Panel

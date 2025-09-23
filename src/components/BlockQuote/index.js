import React from 'react'

export const Blockquote = (props) => (
    <blockquote
        {...props}
        data-scheme="secondary"
        className="not-prose pt-2 px-4 my-4 rounded bg-primary border border-primary [&>p:first-child]:mt-1 [&_a]:font-semibold [&_a]:underline"
    />
)

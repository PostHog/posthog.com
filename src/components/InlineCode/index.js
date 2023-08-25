import React from 'react'

export const InlineCode = (props) => (
    <code
        {...props}
        className="text-inherit p-1 rounded bg-accent dark:bg-accent-dark border border-light dark:border-dark !text-[13px]"
    />
)

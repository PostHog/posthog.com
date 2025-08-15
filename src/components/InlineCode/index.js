import React from 'react'

export const InlineCode = (props) => (
    <code
        {...props}
        className="text-red dark:text-yellow py-0.5 px-1 rounded-sm bg-red/10 dark:bg-yellow/10 border border-red/50 dark:border-yellow/50"
    />
)

import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { CodeBlock as CB } from 'components/CodeBlock'

export default function CodeBlock({ code, language, hideNumbers, lineNumberStart, tooltips }) {
    const languages = [
        {
            language,
            code,
        },
    ]
    return (
        <CB
            currentLanguage={languages[0]}
            showLabel={false}
            showLineNumbers
            lineNumberStart={lineNumberStart}
            tooltips={tooltips}
        >
            {languages}
        </CB>
    )
}

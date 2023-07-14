import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { CodeBlock as CB } from 'components/CodeBlock'

export default function CodeBlock({ code, language, hideNumbers, lineNumberStart }) {
    const languages = [
        {
            language,
            code,
        },
    ]
    return (
        <CB currentLanguage={languages[0]} showLabel={false} showLineNumbers lineNumberStart={lineNumberStart}>
            {languages}
        </CB>
    )
}

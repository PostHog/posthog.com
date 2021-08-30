import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'

export default function CodeBlock({ code, language }) {
    return (
        <Highlight {...defaultProps} code={code} language={language}>
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre className={`${className}`} style={{ background: '#24292E', margin: 0 }}>
                    {tokens.map((line, i) => (
                        <div className="table-row" key={i} {...getLineProps({ line, key: i })}>
                            <span className="table-cell pr-4">{i + 1}</span>
                            <span className="table-cell">
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token, key })} />
                                ))}
                            </span>
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    )
}

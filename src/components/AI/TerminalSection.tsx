import React, { ReactNode } from 'react'

interface TerminalSectionProps {
    id?: string
    title?: string
    children: ReactNode
    className?: string
}

export default function TerminalSection({ id, title, children, className = '' }: TerminalSectionProps): JSX.Element {
    return (
        <section
            id={id}
            className={`mb-8 [text-shadow:0_0_1px_rgba(238,239,233,0.4),0_0_2px_rgba(238,239,233,0.2)] ${className}`}
        >
            {title && (
                <h2 className="text-[#00FF00] text-base mb-4 font-bold">
                    {'>'} {title.toUpperCase()}
                </h2>
            )}
            <div className="text-[rgba(238,239,233,0.9)]">{children}</div>
        </section>
    )
}

interface ASCIIBoxProps {
    title?: string
    children: ReactNode
    width?: number
    className?: string
}

export function ASCIIBox({ title, children, width = 80, className = '' }: ASCIIBoxProps): JSX.Element {
    const border = '+' + '='.repeat(width - 2) + '+'
    const paddedTitle = title
        ? '|' + title.toUpperCase().padStart(Math.floor((width - 2 + title.length) / 2)).padEnd(width - 2) + '|'
        : null

    return (
        <div className={`text-[rgba(238,239,233,0.9)] ${className}`}>
            <pre className="m-0 whitespace-pre-wrap font-code text-[13px]">
                <div className="text-[#F1A82C]">{border}</div>
                {paddedTitle && (
                    <>
                        <div className="text-[#F1A82C]">{paddedTitle}</div>
                        <div className="text-[#F1A82C]">{border}</div>
                    </>
                )}
                <div className="text-[rgba(238,239,233,0.9)]">{children}</div>
                <div className="text-[#F1A82C]">{border}</div>
            </pre>
        </div>
    )
}

export function wrapText(text: string, maxWidth: number): string[] {
    const words = text.split(' ')
    const lines: string[] = []
    let currentLine = ''

    words.forEach((word) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word
        if (testLine.length <= maxWidth) {
            currentLine = testLine
        } else {
            if (currentLine) lines.push(currentLine)
            currentLine = word
        }
    })
    if (currentLine) lines.push(currentLine)

    return lines
}

export function SectionDivider({ className = '' }: { className?: string }): JSX.Element {
    const pattern = '═╪═'
    const fullPattern = pattern.repeat(30)

    return (
        <div className={`text-[#333] my-12 font-mono text-xs ${className}`}>
            <div className="max-w-4xl">{fullPattern}</div>
        </div>
    )
}

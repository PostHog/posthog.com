import React, { ReactNode, useRef, useState, useLayoutEffect } from 'react'

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
            className={`mb-8 [text-shadow:0_0_1px_rgb(var(--bg)/0.4),0_0_2px_rgb(var(--bg)/0.2)] ${className}`}
        >
            {title && (
                <h2 className="text-[#00FF00] text-base mb-4 font-bold">
                    {'>'} {title.toUpperCase()}
                </h2>
            )}
            <div className="text-bg">{children}</div>
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
    const horizontalBorder = '='.repeat(width - 2)
    const titleContent = title ? ` ${title.toUpperCase()} ` : ''
    const titlePadding = width - 2 - titleContent.length
    const paddedTitle = titleContent + ' '.repeat(Math.max(0, titlePadding))

    return (
        <pre className={`text-bg font-code text-[14px] m-0 whitespace-pre ${className}`}>
            <div className="text-[#F1A82C]">|{horizontalBorder}|</div>
            {title && (
                <>
                    <div className="text-[#F1A82C]">|{paddedTitle}|</div>
                    <div className="text-[#F1A82C]">|{horizontalBorder}|</div>
                </>
            )}
            <div className="text-bg">{children}</div>
            <div className="text-[#F1A82C]">|{horizontalBorder}|</div>
        </pre>
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
    const pattern = ' ▪︎ '
    const fullPattern = pattern.repeat(50)

    return (
        <div className={`text-bg/50 my-12 whitespace-pre font-mono text-xs ${className}`}>
            <div className="max-w-4xl">{fullPattern}</div>
        </div>
    )
}

import React from 'react'
import Link from 'components/Link'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { posthog_ai } from 'hooks/productData/posthog_ai'
import { skills, skillTitle } from 'components/Products/Slides/OverviewSlide/OverviewSlideMax'
import { graphql, useStaticQuery } from 'gatsby'

interface ASCIIBoxProps {
    title: string
    lines: string[]
    width?: number
}

const ASCIIBox = ({ title, lines, width = 44 }: ASCIIBoxProps) => {
    const topBorder = '+' + '='.repeat(width) + '+'
    const bottomBorder = topBorder
    const paddedTitle = '|' + title.padStart(Math.floor((width + title.length) / 2)).padEnd(width) + '|'

    return (
        <>
            <div className="text-[#F1A82C] [text-shadow:0_0_1px_rgba(238,239,233,0.4),0_0_2px_rgba(238,239,233,0.2)]">
                {topBorder}
            </div>
            <div className="text-[#F1A82C] [text-shadow:0_0_1px_rgba(238,239,233,0.4),0_0_2px_rgba(238,239,233,0.2)]">
                {paddedTitle}
            </div>
            <div className="text-[#F1A82C] [text-shadow:0_0_1px_rgba(238,239,233,0.4),0_0_2px_rgba(238,239,233,0.2)]">
                {topBorder}
            </div>
            {lines.map((line, idx) => (
                <div
                    key={idx}
                    className="text-[rgba(238,239,233,0.9)] [text-shadow:0_0_1px_rgba(238,239,233,0.4),0_0_2px_rgba(238,239,233,0.2)]"
                >
                    | {line.padEnd(width - 2)} |
                </div>
            ))}
            <div className="text-[#F1A82C] [text-shadow:0_0_1px_rgba(238,239,233,0.4),0_0_2px_rgba(238,239,233,0.2)]">
                {bottomBorder}
            </div>
        </>
    )
}

interface ASCIIBoxRowProps {
    children: React.ReactNode
}

const ASCIIBoxRow = ({ children }: ASCIIBoxRowProps) => {
    const childArray = React.Children.toArray(children)
    return (
        <div className="flex gap-[1ch]">
            {childArray.map((child, idx) => (
                <div key={idx}>{child}</div>
            ))}
        </div>
    )
}

const ASCII_HEADER = `    Welcome to
███████╗  ██████╗  ███████╗ ████████╗ ██╗  ██╗  ██████╗   ██████╗      █████╗  ██╗
██╔══██║ ██╔═══██╗ ██╔════╝ ╚══██╔══╝ ██║  ██║ ██╔═══██╗ ██╔════╝     ██╔══██╗ ██║
██████╔╝ ██║   ██║ ███████╗    ██║    ███████║ ██║   ██║ ██║  ███╗    ███████║ ██║
██╔═══╝  ██║   ██║ ╚════██║    ██║    ██╔══██║ ██║   ██║ ██║   ██║    ██╔══██║ ██║
██║      ╚██████╔╝ ███████║    ██║    ██║  ██║ ╚██████╔╝ ╚██████╔╝    ██║  ██║ ██║
╚═╝       ╚═════╝  ╚══════╝    ╚═╝    ╚═╝  ╚═╝  ╚═════╝   ╚═════╝     ╚═╝  ╚═╝ ╚═╝`

const wrapText = (text: string, maxWidth: number): string[] => {
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
export default function ASCIISlide(): JSX.Element {
    const { roadmaps } = useStaticQuery(graphql`
        {
            roadmaps: allRoadmap(
                filter: { teams: { data: { elemMatch: { attributes: { name: { eq: "PostHog AI" } } } } } }
            ) {
                nodes {
                    id
                    strapiID
                    title
                    description
                    projectedCompletion
                    complete
                }
            }
        }
    `)

    const underConsideration = roadmaps.nodes.filter(
        (roadmap: any) => !roadmap.projectedCompletion && !roadmap.complete
    )
    const inProgress = roadmaps.nodes.filter((roadmap: any) => roadmap.projectedCompletion && !roadmap.complete)
    const shipped = roadmaps.nodes.filter((roadmap: any) => roadmap.complete)
    return (
        <div
            data-scheme="primary"
            className="relative size-full bg-[#151515] text-light-2/90 font-code text-[13px] overflow-auto p-5 leading-[1.4]"
        >
            {/* Scanlines overlay */}
            <div className="absolute inset-0 pointer-events-none z-[1] bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.15)_0px,transparent_1px,transparent_2px,rgba(0,0,0,0.15)_3px)] bg-[length:100%_3px]" />
            {/* Screen glow overlay */}
            <div className="absolute inset-0 pointer-events-none z-[2] bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.2)_100%)]" />
            <div className="aspect-square h-full mx-auto">
                <div className="relative z-0">
                    <ScrollArea className="h-full">
                        <pre className="m-0 whitespace-pre overflow-x-auto [text-shadow:0_0_1px_rgba(238,239,233,0.4),0_0_2px_rgba(238,239,233,0.2)]">
                            {ASCII_HEADER.split('\n').map((line, lineIdx) => {
                                // "Welcome to" line
                                if (line.includes('Welcome to')) {
                                    return (
                                        <div
                                            key={lineIdx}
                                            className="text-[rgba(238,239,233,0.7)] [text-shadow:0_0_1px_rgba(238,239,233,0.4),0_0_2px_rgba(238,239,233,0.2)]"
                                        >
                                            {line}
                                        </div>
                                    )
                                }
                                // Large ASCII art header (lines with block characters)
                                if (
                                    line.includes('█') ||
                                    line.includes('╗') ||
                                    line.includes('╔') ||
                                    line.includes('║') ||
                                    line.includes('═') ||
                                    line.includes('╚') ||
                                    line.includes('╝')
                                ) {
                                    // Color mapping: P=Blue, O=Red, S=Yellow, T=Blue, H=Red, O=Yellow, G=Blue, A=White, I=White
                                    const colors = [
                                        '#1D4AFF',
                                        '#F54E00',
                                        '#F1A82C',
                                        '#1D4AFF',
                                        '#F54E00',
                                        '#F1A82C',
                                        '#1D4AFF',
                                        '#EEEFE9',
                                        '#EEEFE9',
                                    ]
                                    // Start column indexes for each letter based on ASCII positions
                                    const letterStarts = [0, 9, 19, 28, 38, 47, 57, 70, 79] // P, O, S, T, H, O, G, A, I

                                    return (
                                        <div
                                            key={lineIdx}
                                            className="flex [text-shadow:0_0_1px_rgba(238,239,233,0.4),0_0_2px_rgba(238,239,233,0.2)]"
                                        >
                                            {line.split('').map((char, charIdx) => {
                                                // Find which letter this character belongs to
                                                let colorIdx = 0
                                                for (let i = letterStarts.length - 1; i >= 0; i--) {
                                                    if (charIdx >= letterStarts[i]) {
                                                        colorIdx = i
                                                        break
                                                    }
                                                }
                                                return (
                                                    <span
                                                        key={charIdx}
                                                        style={{ color: colors[colorIdx] }}
                                                        className="[text-shadow:0_0_1px_rgba(238,239,233,0.4),0_0_2px_rgba(238,239,233,0.2)]"
                                                    >
                                                        {char}
                                                    </span>
                                                )
                                            })}
                                        </div>
                                    )
                                }
                                return (
                                    <div
                                        key={lineIdx}
                                        className="text-[rgba(238,239,233,0.9)] [text-shadow:0_0_1px_rgba(238,239,233,0.4),0_0_2px_rgba(238,239,233,0.2)]"
                                    >
                                        {line}
                                    </div>
                                )
                            })}
                            <div className="text-[rgba(238,239,233,0.8)] [text-shadow:0_0_1px_rgba(238,239,233,0.4),0_0_2px_rgba(238,239,233,0.2)]">
                                {' '.repeat(55)}
                                Your product assistant
                            </div>
                        </pre>

                        <pre className="mt-5 mb-0 ml-0 mr-0 whitespace-pre overflow-x-auto [text-shadow:0_0_1px_rgba(238,239,233,0.4),0_0_2px_rgba(238,239,233,0.2)]">
                            <ASCIIBoxRow>
                                <ASCIIBox
                                    title={skillTitle.toUpperCase()}
                                    lines={(() => {
                                        const lines: string[] = []
                                        skills.forEach((skill) => {
                                            lines.push(wrapText(`  • ${skill}`, 80).join('\n'))
                                        })
                                        return lines
                                    })()}
                                />
                            </ASCIIBoxRow>
                        </pre>

                        <pre className="mt-5 mb-0 ml-0 mr-0 whitespace-pre overflow-x-auto [text-shadow:0_0_1px_rgba(238,239,233,0.4),0_0_2px_rgba(238,239,233,0.2)]">
                            <div className="text-[#00FF00] mb-2">{'>'} DEVELOPMENT STATUS</div>
                            <div className="text-[rgba(238,239,233,0.9)] font-code text-xs leading-tight">
                                {/* Shipped items */}
                                {shipped?.slice(0, 1).map((item, idx) => (
                                    <div key={idx} className="mb-1">
                                        <span className="text-[#00FF00]">[✓]</span>{' '}
                                        <span className="text-[rgba(238,239,233,0.7)]">
                                            {item.title.substring(0, 60)}
                                        </span>{' '}
                                        <span className="text-[#00FF00] text-[10px]">SHIPPED</span>
                                    </div>
                                ))}

                                {/* In progress items */}
                                {inProgress?.slice(0, 1).map((item, idx) => (
                                    <div key={idx} className="mb-1">
                                        <span className="text-[#F1A82C]">[→]</span>{' '}
                                        <span className="text-[rgba(238,239,233,0.7)]">
                                            {item.title.substring(0, 60)}
                                        </span>{' '}
                                        <span className="text-[#F1A82C] text-[10px]">IN PROGRESS</span>
                                    </div>
                                ))}

                                {/* Planned items */}
                                {underConsideration?.slice(0, 1).map((item, idx) => (
                                    <div key={idx} className="mb-1">
                                        <span className="text-[#666]">[?]</span>{' '}
                                        <span className="text-[rgba(238,239,233,0.7)]">
                                            {item.title.substring(0, 60)}
                                        </span>{' '}
                                        <span className="text-[#666] text-[10px]">PLANNED</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-3 text-[rgba(238,239,233,0.7)]">
                                <span className="text-[#00FF00]">{'>'}</span>{' '}
                                <button
                                    onClick={() => {
                                        const slideElement = document.querySelector(
                                            '[data-slide-id="ai"][data-slide="5"]'
                                        )
                                        slideElement?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                    }}
                                    className="text-[rgba(238,239,233,0.7)] hover:text-[#F1A82C] underline cursor-pointer bg-transparent border-none p-0 font-code"
                                >
                                    See the full roadmap
                                </button>
                            </div>
                        </pre>

                        <pre className="mt-5 mb-0 ml-0 mr-0 whitespace-pre-wrap text-[rgba(238,239,233,0.7)] [text-shadow:0_0_1px_rgba(238,239,233,0.4),0_0_2px_rgba(238,239,233,0.2)] font-code text-xs">
                            <div className="mb-3 pl-4 border-l-2 border-[#F1A82C]">
                                <div className="text-[#F1A82C] mb-1">USAGE:</div>
                                <div className="text-[rgba(238,239,233,0.8)] pl-2">
                                    Open PostHog AI in your project and ask it to analyze data or build something
                                </div>
                            </div>
                            <div className="mb-3 pl-4 border-l-2 border-[#1D4AFF]">
                                <div className="text-[#1D4AFF] mb-1">EXAMPLES:</div>
                                <div className="text-[rgba(238,239,233,0.8)] pl-2 space-y-1">
                                    {posthog_ai.answers?.slice(0, 3).map((a, idx) => (
                                        <div key={idx}>
                                            <span className="text-[#00FF00]">$</span> {a.q}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="text-[#00FF00]">C:\POSTHOG\AI{'>'}</span>{' '}
                                <Link
                                    to="https://app.posthog.com/ai"
                                    className="text-[rgba(238,239,233,0.9)] underline hover:text-[#F1A82C]"
                                >
                                    start
                                </Link>
                            </div>
                        </pre>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
}

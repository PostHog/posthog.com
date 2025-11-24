import React from 'react'
import Link from 'components/Link'
import ScrollArea from 'components/RadixUI/ScrollArea'

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
            <div style={{ color: '#F1A82C' }}>{topBorder}</div>
            <div style={{ color: '#F1A82C' }}>{paddedTitle}</div>
            <div style={{ color: '#F1A82C' }}>{topBorder}</div>
            {lines.map((line, idx) => (
                <div key={idx} style={{ color: 'rgba(238, 239, 233, 0.9)' }}>
                    | {line.padEnd(width - 2)} |
                </div>
            ))}
            <div style={{ color: '#F1A82C' }}>{bottomBorder}</div>
        </>
    )
}

interface ASCIIBoxRowProps {
    children: React.ReactNode
}

const ASCIIBoxRow = ({ children }: ASCIIBoxRowProps) => {
    const childArray = React.Children.toArray(children)
    return (
        <div style={{ display: 'flex', gap: '1ch' }}>
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
╚═╝       ╚═════╝  ╚══════╝    ╚═╝    ╚═╝  ╚═╝  ╚═════╝   ╚═════╝     ╚═╝  ╚═╝ ╚═╝
                 The product analyst agent.`

export default function ASCIISlide() {
    return (
        <div
            data-scheme="primary"
            style={{
                backgroundColor: '#151515',
                color: 'rgba(238, 239, 233, 0.9)',
                fontFamily: 'Monaco, Menlo, "Courier New", monospace',
                fontSize: '13px',
                height: '100%',
                overflow: 'auto',
                padding: '20px',
                lineHeight: '1.4',
            }}
        >
            <ScrollArea className="h-full">
                <pre style={{ margin: 0, whiteSpace: 'pre', overflowX: 'auto' }}>
                    {ASCII_HEADER.split('\n').map((line, lineIdx) => {
                        // "Welcome to" line
                        if (line.includes('Welcome to')) {
                            return (
                                <div key={lineIdx} style={{ color: 'rgba(238, 239, 233, 0.7)' }}>
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
                                <div key={lineIdx} style={{ display: 'flex' }}>
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
                                            <span key={charIdx} style={{ color: colors[colorIdx] }}>
                                                {char}
                                            </span>
                                        )
                                    })}
                                </div>
                            )
                        }
                        // Description lines right after ASCII art
                        if (line.includes('Your product analyst')) {
                            return (
                                <div key={lineIdx} style={{ color: 'rgba(238, 239, 233, 0.8)' }}>
                                    {line}
                                </div>
                            )
                        }
                        return (
                            <div key={lineIdx} style={{ color: 'rgba(238, 239, 233, 0.9)' }}>
                                {line}
                            </div>
                        )
                    })}
                </pre>

                <pre style={{ margin: '20px 0 0 0', whiteSpace: 'pre', overflowX: 'auto' }}>
                    <ASCIIBoxRow>
                        <ASCIIBox
                            title="WHY NOT JUST ASK CHATGPT INSTEAD?"
                            lines={[
                                'PostHog AI is an agent with native access',
                                'to your product data:',
                                '',
                                '  • Events, persons, sessions, groups',
                                '  • Actions, cohorts, properties',
                                '  • Data warehouse schema',
                                '  • Session replays and errors',
                                '',
                                'It understands your data taxonomy and',
                                'reasons about complex queries.',
                            ]}
                        />
                        <ASCIIBox
                            title="MORE THAN CHATTING WITH YOUR DATA"
                            lines={[
                                'Not just a chatbot - PostHog AI gets',
                                'things done in PostHog for you:',
                                '',
                                '  • Create insights and dashboards',
                                '  • Write and edit PostHog SQL queries',
                                '  • Filter recordings or errors',
                                '  • Create feature flags and experiments',
                                '  • Add data pipeline functions with Hog',
                                '  • Start surveys',
                            ]}
                        />
                    </ASCIIBoxRow>

                    <ASCIIBoxRow>
                        <ASCIIBox
                            title="PRODUCT AUTONOMY"
                            width={84}
                            lines={[
                                'Goal: Help every developer ship a product autonomously.',
                                'Now: Analyze your data, answer product questions, and automate PostHog workflows.',
                                'Soon: Detect and generate PRs for fixing UX issues and errors before you wake up.',
                                'Generate ideas for what to work on and convert them into PRs.',
                            ]}
                        />
                    </ASCIIBoxRow>
                </pre>

                <div style={{ marginTop: '20px', color: 'rgba(238, 239, 233, 0.7)' }}>
                    <div>
                        GETTING STARTED: Open PostHog AI in your project and ask it to analyze data or build something
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        EXAMPLES: "Show me users who churned" | "Create a funnel for signup" | "Make a survey"
                    </div>
                    <div style={{ marginTop: '8px' }}>
                        NEXT UP: See other slides → or{' '}
                        <Link to="https://app.posthog.com/ai" className="underline">
                            open PostHog AI now ↗
                        </Link>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

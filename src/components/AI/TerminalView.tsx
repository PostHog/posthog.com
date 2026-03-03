import React from 'react'
import SEO from 'components/seo'
import TerminalLayout from 'components/AI/TerminalLayout'
import TerminalSection, { ASCIIBox, wrapText, SectionDivider } from 'components/AI/TerminalSection'
import TerminalFeatures from 'components/AI/TerminalFeatures'
import TerminalDemo from 'components/AI/TerminalDemo'
import TerminalVideos from 'components/AI/TerminalVideos'
import TerminalPersonas from 'components/AI/TerminalPersonas'
import TerminalRoadmap from 'components/AI/TerminalRoadmap'
import TerminalCapabilities from 'components/AI/TerminalCapabilities'
import { posthog_ai } from 'hooks/productData/posthog_ai'
import { skills, skillTitle } from 'components/Products/Slides/OverviewSlide/OverviewSlideMax'
import Link from 'components/Link'

const ASCII_HEADER = `    Welcome to
███████╗  ██████╗  ███████╗ ████████╗ ██╗  ██╗  ██████╗   ██████╗      █████╗  ██╗
██╔══██║ ██╔═══██╗ ██╔════╝ ╚══██╔══╝ ██║  ██║ ██╔═══██╗ ██╔════╝     ██╔══██╗ ██║
██████╔╝ ██║   ██║ ███████╗    ██║    ███████║ ██║   ██║ ██║  ███╗    ███████║ ██║
██╔═══╝  ██║   ██║ ╚════██║    ██║    ██╔══██║ ██║   ██║ ██║   ██║    ██╔══██║ ██║
██║      ╚██████╔╝ ███████║    ██║    ██║  ██║ ╚██████╔╝ ╚██████╔╝    ██║  ██║ ██║
╚═╝       ╚═════╝  ╚══════╝    ╚═╝    ╚═╝  ╚═╝  ╚═════╝   ╚═════╝     ╚═╝  ╚═╝ ╚═╝`

export default function TerminalView(): JSX.Element {
    // Detect OS for terminal prompt
    const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0
    const prompt = isMac ? '~ $' : 'C:\\Users\\Me>'

    return (
        <>
            <SEO
                title="PostHog AI - PostHog"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <TerminalLayout>
                {/* ASCII Header */}
                <div className="mb-12">
                    <pre className="m-0 whitespace-pre overflow-x-auto [text-shadow:0_0_1px_rgb(var(--bg)/0.4),0_0_2px_rgb(var(--bg)/0.2)]">
                        {ASCII_HEADER.split('\n').map((line, lineIdx) => {
                            // "Welcome to" line
                            if (line.includes('Welcome to')) {
                                return (
                                    <div
                                        key={lineIdx}
                                        className="text-bg [text-shadow:0_0_1px_rgb(var(--bg)/0.4),0_0_2px_rgb(var(--bg)/0.2)]"
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
                                        className="flex [text-shadow:0_0_1px_rgb(var(--bg)/0.4),0_0_2px_rgb(var(--bg)/0.2)]"
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
                                                    className="[text-shadow:0_0_1px_rgb(var(--bg)/0.4),0_0_2px_rgb(var(--bg)/0.2)]"
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
                                    className="text-bg [text-shadow:0_0_1px_rgb(var(--bg)/0.4),0_0_2px_rgb(var(--bg)/0.2)]"
                                >
                                    {line}
                                </div>
                            )
                        })}
                        <div className="text-bg [text-shadow:0_0_1px_rgb(var(--bg)/0.4),0_0_2px_rgb(var(--bg)/0.2)]">
                            {' '.repeat(55)}
                            Your product assistant
                        </div>
                    </pre>
                </div>

                {/* Intro with help command */}
                <div className="mb-6 pt-4 border-t border-[#333]">
                    <div className="text-[14px] space-y-1">
                        <div>
                            <span className="text-[#00FF00]">{prompt}</span>{' '}
                            <span className="text-bg">posthog ai --help</span>
                        </div>
                        <div className="text-[#666] pl-4">
                            Your AI-powered product assistant. Ask questions, build insights, analyze data.
                        </div>
                    </div>
                </div>

                {/* Skills */}
                <TerminalSection id="skills">
                    <ASCIIBox title={skillTitle}>
                        {skills.map((skill, idx) => (
                            <div key={idx}> • {skill}</div>
                        ))}
                    </ASCIIBox>
                </TerminalSection>

                <SectionDivider />

                {/* Features */}
                <TerminalSection id="features" title="Product Integrations">
                    <TerminalFeatures features={posthog_ai.features} />
                </TerminalSection>

                <SectionDivider />

                {/* Demo */}
                <TerminalSection id="demo" title="Chat with your data">
                    <TerminalDemo />
                </TerminalSection>

                <SectionDivider />

                {/* Advanced Modes */}
                <TerminalSection id="capabilities" title="Advanced Modes">
                    <TerminalCapabilities />
                </TerminalSection>

                <SectionDivider />

                {/* Videos */}
                <TerminalSection id="videos" title="Video Demonstrations">
                    <TerminalVideos videos={posthog_ai.videos} />
                </TerminalSection>

                <SectionDivider />

                {/* Personas */}
                <TerminalSection id="personas" title="PostHog AI for you">
                    <TerminalPersonas />
                </TerminalSection>

                <SectionDivider />

                {/* Roadmap */}
                <TerminalSection id="roadmap" title="Development Status">
                    <TerminalRoadmap />
                </TerminalSection>

                <SectionDivider />

                {/* Pricing */}
                <TerminalSection id="pricing" title="Pricing & Credits">
                    <ASCIIBox title="How Credits Work">
                        <div className="space-y-3 text-[14px] leading-relaxed">
                            <p className="text-bg">
                                AI credits are based on the underlying token costs, which reflect
                                <br />
                                the effort required to complete your request
                            </p>
                            <div className="space-y-2">
                                <p className="text-bg">
                                    <span className="text-[#00FF00]">SIMPLE QUERIES</span> like "What were my daily
                                    active users in October?"
                                    <br />
                                    use very few tokens, and therefore very few credits.
                                </p>
                                <p className="text-bg">
                                    <span className="text-red">COMPLEX TASKS</span> like analyzing hundreds of session
                                    recordings or
                                    <br />
                                    rewriting SQL queries multiple times use more tokens and consume
                                    <br />
                                    more credits.
                                </p>
                            </div>
                            <p className="text-bg">
                                PostHog automatically selects the most efficient model for each AI
                                <br />
                                feature. We apply a simple, consistent 20% markup over the underlying
                                <br />
                                LLM provider's cost:
                            </p>
                            <div className="font-semibold">
                                1 PostHog AI credit = $0.1 of cost = $0.0083 of raw inference
                            </div>
                        </div>
                    </ASCIIBox>
                </TerminalSection>

                {/* Getting Started */}
                <TerminalSection id="getting-started" title="Getting Started">
                    <div className="space-y-4">
                        <div className="pl-4 border-l-2 border-[#F1A82C] space-y-2">
                            <div className="text-[#F1A82C] text-sm font-bold">USAGE:</div>
                            <div className="text-bg text-[14px] leading-relaxed">
                                Open PostHog AI in your project and ask it to analyze data or build something
                            </div>
                        </div>

                        <div className="pl-4 border-l-2 border-[#1D4AFF] space-y-2">
                            <div className="text-[#1D4AFF] text-sm font-bold">EXAMPLES:</div>
                            <div className="text-bg text-[14px] space-y-1">
                                {posthog_ai.answers?.slice(0, 5).map((a, idx) => (
                                    <div key={idx}>
                                        <span className="text-[#00FF00]">$</span> {a.q}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-6 pt-8 border-t border-[#333]">
                            <div className="text-[14px]">
                                <span className="text-[#00FF00]">{prompt}</span>{' '}
                                <Link
                                    to="https://app.posthog.com/ai"
                                    external
                                    className="text-bg underline hover:text-[#F1A82C]"
                                >
                                    posthog ai start
                                </Link>
                            </div>
                        </div>
                    </div>
                </TerminalSection>

                {/* Footer */}
                <div className="pt-6 text-[12px] text-[#666] border-t border-[#333]">
                    <p>
                        Report issues or share feedback at{' '}
                        <Link
                            to="https://github.com/PostHog/posthog"
                            external
                            className="text-[#1D4AFF] hover:text-[#F1A82C] underline"
                        >
                            github.com/PostHog/posthog
                        </Link>
                    </p>
                </div>
            </TerminalLayout>
        </>
    )
}

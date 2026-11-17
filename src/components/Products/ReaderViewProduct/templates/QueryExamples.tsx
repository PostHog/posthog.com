import React, { useRef, useState } from 'react'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { IconArrowRight } from '@posthog/icons'
import Link from 'components/Link'
import type { SectionComponentProps } from '../types'
import { SectionHeading } from '../helpers'

interface Question {
    tool: string
    to: string
    /** Tailwind classes for the tool label. */
    tag: string
    question: string
    summary: string
    answer: string
    Insight?: React.ComponentType
}

/**
 * Example questions, each answered with a different tool. A click shows that
 * tool's animated insight, what the tool is for, and the answer. Reads
 * `productData.queryExamples`.
 */
const QueryExamples = ({ id, productData }: SectionComponentProps) => {
    const examples = productData?.queryExamples
    const questions: Question[] = examples?.questions ?? []
    const [activeIndex, setActiveIndex] = useState(0)
    const panelRef = useRef<HTMLDivElement>(null)
    if (!examples || !questions.length) return null

    const active = questions[activeIndex]
    const pick = (index: number) => {
        setActiveIndex(index)
        // In one column the panel is below every question, so bring it into view.
        const panel = panelRef.current
        if (panel && panel.getBoundingClientRect().top > window.innerHeight) {
            panel.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
        }
    }

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <SectionHeading lede={examples.lede}>{examples.title}</SectionHeading>
            <div className="grid items-start gap-4 @3xl/reader-content:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                <ul className="m-0 grid list-none gap-2 p-0">
                    {questions.map(({ tool, tag, question }, index) => {
                        const isActive = index === activeIndex
                        return (
                            <li key={question} className="m-0">
                                <button
                                    type="button"
                                    aria-pressed={isActive}
                                    onClick={() => pick(index)}
                                    className={`flex w-full flex-col gap-1.5 rounded-md border-2 bg-primary p-3 text-left text-primary transition-colors ${
                                        isActive ? 'border-blue shadow-md' : 'border-primary hover:border-blue/60'
                                    }`}
                                >
                                    <span
                                        className={`self-start rounded-sm px-1.5 py-0.5 text-xs font-bold uppercase tracking-wide ${tag}`}
                                    >
                                        {tool}
                                    </span>
                                    <span className="text-base font-bold leading-snug">"{question}"</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>

                <div
                    ref={panelRef}
                    className="rounded-md border-2 border-blue bg-blue/10 p-4 @xl/reader-content:p-6 @3xl/reader-content:sticky @3xl/reader-content:top-4"
                >
                    <MotionConfig reducedMotion="user">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={active.question}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="flex flex-col gap-4"
                            >
                                <p className="m-0 text-lg font-bold leading-snug">"{active.question}"</p>
                                {active.Insight && (
                                    <div className="rounded-md border border-primary bg-primary p-4">
                                        <p className="m-0 mb-3 flex items-center gap-2 text-xs font-semibold text-secondary">
                                            <span className={`rounded-sm px-1.5 py-0.5 ${active.tag}`}>
                                                {active.tool}
                                            </span>
                                            {examples.insightLabel}
                                        </p>
                                        <active.Insight />
                                    </div>
                                )}
                                <p className="m-0 text-base font-semibold leading-relaxed">{active.answer}</p>
                                <p className="m-0 text-sm leading-relaxed text-secondary">
                                    {active.summary}{' '}
                                    <Link
                                        to={active.to}
                                        state={{ newWindow: true }}
                                        className="whitespace-nowrap font-semibold text-red hover:underline dark:text-yellow"
                                    >
                                        {examples.docsLinkLabel}
                                        <IconArrowRight className="relative -top-px ml-1 inline-block size-4" />
                                    </Link>
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </MotionConfig>
                </div>
            </div>
        </section>
    )
}

export default QueryExamples

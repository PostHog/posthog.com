import React from 'react'
import { Accordion } from 'components/RadixUI/Accordion'
import Link from 'components/Link'
import type { SectionComponentProps } from '../types'
import { SECTION_H2 } from '../helpers'

const LINK_CLASSES = 'text-red dark:text-yellow font-semibold hover:underline'

interface FaqItem {
    question: string
    answer: string
    link?: { label: string; to: string }
}

/**
 * Question and answer list for readers and agents. Reads `productData.faq`;
 * `ProductReaderView` sends the same items to the FAQPage structured data.
 * The product's `questions` (tutorial links) render underneath.
 */
const FAQ = ({ id, productData }: SectionComponentProps) => {
    const faq = productData?.faq
    if (!faq?.items?.length) return null
    const questions: { question: string; url: string }[] = productData?.questions ?? []

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <header className="mb-4">
                <h2 className={`${SECTION_H2} !mb-1`}>{faq.title}</h2>
                {faq.subtitle && <p className="text-lg text-secondary m-0">{faq.subtitle}</p>}
            </header>
            <div className="border border-primary rounded-md bg-primary">
                <Accordion
                    type="multiple"
                    triggerClassName="!px-4 !py-3 font-semibold"
                    contentClassName="!px-4 !pb-4 !text-base !leading-relaxed"
                    items={faq.items.map(({ question, answer, link }: FaqItem, index: number) => ({
                        value: `item-${index}`,
                        trigger: question,
                        content: (
                            <>
                                <p>{answer}</p>
                                {link && (
                                    <p>
                                        <Link to={link.to} state={{ newWindow: true }} className={LINK_CLASSES}>
                                            {link.label}
                                        </Link>
                                    </p>
                                )}
                            </>
                        ),
                    }))}
                />
            </div>

            {questions.length > 0 && (
                <div className="mt-12">
                    <h2 className={SECTION_H2}>{faq.moreQuestionsTitle}</h2>
                    <ul className="grid grid-cols-1 @xl/reader-content:grid-cols-2 gap-x-6 gap-y-2 list-none m-0 p-0">
                        {questions.map(({ question, url }) => (
                            <li key={question} className="m-0 text-[15px]">
                                <Link to={url} state={{ newWindow: true }} className={LINK_CLASSES}>
                                    {question}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    )
}

export default FAQ

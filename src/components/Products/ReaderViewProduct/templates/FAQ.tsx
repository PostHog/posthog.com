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
 */
const FAQ = ({ id, productData }: SectionComponentProps) => {
    const faq = productData?.faq
    if (!faq?.items?.length) return null

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
        </section>
    )
}

export default FAQ

import React, { ChangeEvent, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { faqs } from '../../../pages-content/pricing-data'
import { Plus, Minus } from 'components/Icons/Icons'
import Fuse from 'fuse.js'

const fuse = new Fuse(faqs, { keys: ['q', 'a'], includeMatches: true })

export const FAQs = ({ className = '' }) => {
    const [questions, setQuestions] = useState(faqs)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const filtered = fuse.search(e.target.value).map((item) => item.item)
        setQuestions(filtered.length ? filtered : faqs)
    }

    return (
        <section className={`not-prose ${className}`}>
            <input
                onChange={handleChange}
                placeholder="Search questions asked on this page..."
                data-scheme="secondary"
                className="bg-primary border border-primary py-2 px-3 rounded-sm text-[15px] font-semibold w-full"
            />
            <div className="mt-4 divide-y divide-primary border-y border-primary">
                {questions &&
                    questions.map((faq, index) => {
                        const { q, a } = faq
                        return (
                            <Disclosure key={index}>
                                {({ open }) => (
                                    <>
                                        <Disclosure.Button className="flex w-full items-center justify-between py-3 text-left">
                                            <span className="text-[15px] font-semibold pr-4">{q}</span>
                                            <span className="flex-shrink-0">
                                                {open ? <Minus className="size-4" /> : <Plus className="size-4" />}
                                            </span>
                                        </Disclosure.Button>
                                        <Disclosure.Panel className="pb-4 pr-8">
                                            <p className="text-[14px] text-secondary m-0">{a}</p>
                                        </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        )
                    })}
            </div>
        </section>
    )
}

import React, { ChangeEvent, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { faqs } from '../../../pages-content/pricing-data'
import { Plus, Minus } from 'components/Icons/Icons'
import { motion } from 'framer-motion'
import Fuse from 'fuse.js'

const fuse = new Fuse(faqs, { keys: ['q', 'a'], includeMatches: true })

export const FAQs = ({ className = '' }) => {
    const [questions, setQuestions] = useState(faqs)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const filtered = fuse.search(e.target.value).map((item) => item.item)
        setQuestions(filtered.length ? filtered : faqs)
    }

    return (
        <section className={`${className}`}>
            <input
                onChange={handleChange}
                placeholder="Search questions asked on this page"
                className="bg-accent dark:bg-accent-dark border border-light dark:border-dark py-3 px-4 rounded-sm text-[15px] font-semibold w-full"
            />
            <ul className="list-none m-0 p-0 grid gap-y-6 mt-4">
                {questions &&
                    questions.map((faq, index) => {
                        const { author, q, a } = faq
                        return (
                            <li key={index}>
                                <div className="flex items-center space-x-2 relative">
                                    <span className="flex-shrink-0 relative">
                                        <span className="absolute w-full h-full left-1/2 translate-y-[55%] border-l border-b border-dashed border-gray-accent-light rounded-sm" />
                                        <span>{author.q.image}</span>
                                    </span>
                                    <p className="text-[15px] font-semibold m-0">{q}</p>
                                </div>
                                <div className="flex items-start space-x-2 pt-2 ml-[calc(40px+.5rem)]">
                                    <span className="flex-shrink-0">{author.a.image}</span>
                                    <span>
                                        <p className="text-[15px] font-semibold text-red m-0">{author.a.name}</p>
                                        <p className="text-[14px] font-normal m-0">{a}</p>
                                    </span>
                                </div>
                            </li>
                        )
                    })}
            </ul>
        </section>
    )
}

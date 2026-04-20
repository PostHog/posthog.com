import React from 'react'
import Link from 'components/Link'
import { SectionComponentProps } from '../types'

interface Question {
    question: string
    url?: string
}

const Answers = ({ id, productData }: SectionComponentProps) => {
    const questions: Question[] = productData?.questions || []
    if (!questions.length) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-3">
                {productData?.answersHeadline || `What can ${productData?.name} answer?`}
            </h2>
            {productData?.answersDescription && (
                <p className="text-base text-secondary leading-relaxed m-0 mb-4">{productData.answersDescription}</p>
            )}
            <ul className="list-none m-0 p-0 flex flex-col gap-2">
                {questions.map(({ question, url }) => (
                    <li
                        key={question}
                        className="m-0 p-3 border border-primary rounded bg-primary text-sm leading-relaxed"
                    >
                        {url ? (
                            <Link to={url} state={{ newWindow: true }} className="font-semibold underline text-primary">
                                {question}
                            </Link>
                        ) : (
                            <span className="text-primary">{question}</span>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Answers

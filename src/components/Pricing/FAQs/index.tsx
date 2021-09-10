import React from 'react'
import { faqs } from '../../../pages-content/pricing-data'
import Disclosure from 'components/Disclosure'

export const FAQs = ({ className = '' }) => {
    return (
        <section className={`${className} text-almost-black max-w-screen-md`}>
            {faqs.map((faq, index) => {
                return (
                    <Disclosure key={index} title={faq.q}>
                        {faq.a}
                    </Disclosure>
                )
            })}
        </section>
    )
}

import React from 'react'
import { Disclosure } from '@headlessui/react'
import { faqs } from '../../../pages-content/pricing-data'
import { Plus, Minus } from 'components/Icons/Icons'
import { motion } from 'framer-motion'

export const FAQs = ({ className = '' }) => {
    const variants = {
        hidden: { height: 0 },
        shown: { height: 'auto' },
    }
    return (
        <section className={`${className} text-almost-black max-w-screen-md`}>
            {faqs.map((faq, index) => {
                return (
                    <div key={index}>
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <Plus
                                        render={(icon) => (
                                            <Disclosure.Button className="flex items-center space-x-2 text-left w-full text-base md:text-lg font-semibold py-4 border-dashed border-gray-accent-light border-b-2">
                                                {open ? <Minus /> : icon}
                                                <span>{faq.q}</span>
                                            </Disclosure.Button>
                                        )}
                                    />
                                    {open && (
                                        <motion.div initial="hidden" animate="shown" variants={variants}>
                                            <Disclosure.Panel className="py-4 text-base">{faq.a}</Disclosure.Panel>
                                        </motion.div>
                                    )}
                                </>
                            )}
                        </Disclosure>
                    </div>
                )
            })}
        </section>
    )
}

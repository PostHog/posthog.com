import React from 'react'
import { Plus, Minus } from 'components/Icons/Icons'
import { motion } from 'framer-motion'
import { Disclosure as HeadlessDisclosure } from '@headlessui/react'

export default function Disclosure({ title, children }) {
    const variants = {
        hidden: { height: 0 },
        shown: { height: 'auto' },
    }
    return (
        <HeadlessDisclosure>
            {({ open }) => (
                <>
                    <HeadlessDisclosure.Button className="flex items-start space-x-2 text-left w-full text-base md:text-lg font-semibold py-4 border-dashed border-gray-accent-light border-b">
                        {open ? <Minus /> : <Plus />}
                        <span className="-my-1">{title}</span>
                    </HeadlessDisclosure.Button>
                    {open && (
                        <motion.div initial="hidden" animate="shown" variants={variants}>
                            <HeadlessDisclosure.Panel className="py-4 text-base pl-8">
                                {children}
                            </HeadlessDisclosure.Panel>
                        </motion.div>
                    )}
                </>
            )}
        </HeadlessDisclosure>
    )
}

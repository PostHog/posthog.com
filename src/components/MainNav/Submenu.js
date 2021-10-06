import React from 'react'
import { motion } from 'framer-motion'
import Docs from './DocsSubmenu'
import Company from './CompanySubmenu'

const submenus = {
    Docs,
    Company,
}

export default function Submenu({ referenceElement, menu, open, parentURL }) {
    const { component } = menu
    const variants = {
        hidden: { height: 0 },
        shown: { height: 'auto' },
    }
    return (
        <div className="z-10 top-[calc(40px+1.25rem)] lg:pt-5 lg:absolute left-0 w-full lg:block text-almost-black">
            <motion.div
                className="lg:bg-white lg:shadow-lg lg:dark:bg-gray-accent-dark overflow-hidden lg:my-0 my-6"
                variants={variants}
                initial="hidden"
                animate="shown"
            >
                {submenus[component]({ menu, parentURL })}
            </motion.div>
        </div>
    )
}

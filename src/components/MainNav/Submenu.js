import React from 'react'
import { motion } from 'framer-motion'
import Docs from './Submenus/Docs/index'
import Company from './Submenus/Company/index'
import Community from './Submenus/Community/index'

const submenus = {
    Docs,
    Company,
    Community,
}

export default function Submenu({ referenceElement, menu, open, parentURL }) {
    const { component } = menu
    const variants = {
        hidden: { height: 0 },
        shown: { height: 'auto' },
    }
    return (
        <div className="z-10 lg:block text-almost-black relative top-0">
            <motion.div
                className="lg:bg-white lg:shadow-lg lg:dark:bg-gray-accent-dark overflow-hidden lg:my-0 mt-6 rounded-md"
                variants={variants}
                initial="hidden"
                animate="shown"
            >
                {submenus[component]()}
            </motion.div>
        </div>
    )
}

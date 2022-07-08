import React from 'react'
import { motion } from 'framer-motion'
import Docs from './Submenus/docs'
import Company from './Submenus/docs'
import Community from './Submenus/community'

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
        <div className="z-10 lg:pt-5 lg:block text-almost-black relative -top-5">
            <motion.div
                className="lg:bg-white lg:shadow-lg lg:dark:bg-gray-accent-dark overflow-hidden lg:my-0 my-6 rounded-md"
                variants={variants}
                initial="hidden"
                animate="shown"
            >
                {submenus[component]()}
            </motion.div>
        </div>
    )
}

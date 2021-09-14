import React, { useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Docs from './DocsSubmenu'
import Company from './CompanySubmenu'

const submenus = {
    Docs,
    Company,
}

export default function Submenu({ referenceElement, menu, open, parentURL }) {
    const { component } = menu

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
            <div className="z-10 top-[50px] lg:pt-[40px] lg:absolute left-0 w-full lg:block text-almost-black">
                <div className="lg:bg-white lg:shadow-lg lg:dark:bg-gray-accent-dark lg:max-h-[calc(100vh-120px)] lg:overflow-auto posthog-scrollbars">
                    {submenus[component]({ menu, parentURL })}
                </div>
            </div>
        </motion.div>
    )
}

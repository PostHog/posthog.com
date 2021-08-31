import React, { useState } from 'react'
import { Plus, Minus } from 'components/Icons/Icons'
import { motion } from 'framer-motion'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'

export default function Accordion({ title, children }) {
    const [open, setOpen] = useState(false)
    const variants = {
        hidden: { height: 0 },
        shown: { height: 'auto' },
    }
    const breakpoints = useBreakpoint()
    return (
        <>
            <h3
                style={!breakpoints.md || open ? {} : { margin: 0 }}
                role={breakpoints.md ? 'button' : 'heading'}
                onClick={() => setOpen(!open)}
                className="text-xl flex justify-between items-center"
            >
                <span>{title}</span>
                {breakpoints.md && (open ? <Minus /> : <Plus />)}
            </h3>
            {(!breakpoints.md || open) && (
                <motion.div initial="hidden" animate="shown" variants={variants}>
                    {children}
                </motion.div>
            )}
        </>
    )
}

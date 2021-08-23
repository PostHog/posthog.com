import React, { useLayoutEffect, useState } from 'react'
import SubmenuItem from './SubmenuItem'
import { motion } from 'framer-motion'

export default function Submenu({ referenceElement, menu, open }) {
    const variants = {
        shown: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    }
    const [offset, setOffset] = useState(0)
    const getOffset = () => {
        if (typeof window !== 'undefined') {
            const offset =
                window.innerWidth / 2 -
                (referenceElement.current.getBoundingClientRect().x + referenceElement.current.offsetWidth / 2)
            setOffset(offset)
        }
    }
    useLayoutEffect(() => {
        window.addEventListener('resize', getOffset)
        getOffset()
        return () => window.removeEventListener('resize', getOffset)
    }, [])
    return (
        <div className="z-10 lg:pt-[30px] lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 mx-auto w-full max-w-screen-xl lg:block text-white">
            <span
                style={{ transform: `translate(calc(-50% - ${offset}px), -10px) rotate(45deg)`, zIndex: -1 }}
                className="w-8 h-8 bg-[#371a51] absolute left-1/2 hidden lg:block"
            />
            <div className="lg:bg-[#371a51] text-[14px] lg:p-12 p-0 rounded">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                    <h1 className="hidden lg:block text-4xl m-0 font-bold">{menu.title}</h1>
                    <p className="hidden lg:block my-3 text-">{menu.description}</p>
                </motion.div>

                <motion.ul initial="hidden" animate="shown" variants={variants} className="list-none p-0 m-0">
                    {menu.items.map((item, index) => (
                        <SubmenuItem item={item} key={index} />
                    ))}
                </motion.ul>
            </div>
        </div>
    )
}

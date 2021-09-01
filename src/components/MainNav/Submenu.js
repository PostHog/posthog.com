import React, { useLayoutEffect, useState } from 'react'
import SubmenuItem from './SubmenuItem'
import Link from 'components/Link'
import { motion } from 'framer-motion'

export default function Submenu({ referenceElement, menu, open, parentURL }) {
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
        <div className="z-10 top-[50px] lg:pt-[40px] lg:absolute lg:left-20 lg:right-20 max-w-screen-3xl lg:block text-almost-black">
            <div className="lg:bg-white lg:dark:bg-gray-accent-dark lg:rounded-xl lg:max-h-[calc(100vh-120px)] lg:overflow-auto posthog-scrollbars">
                <div className="lg:dark:bg-gray-accent-dark text-[14px] lg:p-12 p-0 max-w-screen-xl mx-auto">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                        <Link to={parentURL}>
                            <h1 className="hidden lg:block text-4xl m-0 font-bold">{menu.title}</h1>
                        </Link>
                        <p className="hidden lg:block my-3 text-almost-black dark:text-white">
                            <div dangerouslySetInnerHTML={{ __html: menu.description }} />
                        </p>
                    </motion.div>

                    <motion.ul initial="hidden" an imate="shown" variants={variants} className="list-none p-0 m-0">
                        {menu.items.map((item, index) => (
                            <SubmenuItem item={item} key={index} />
                        ))}
                    </motion.ul>
                </div>
            </div>
        </div>
    )
}

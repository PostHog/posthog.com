import React from 'react'
import { motion } from 'framer-motion'
import Link from 'components/Link'
import SubmenuItem from './SubmenuItem'
import { submenu } from '../classes'

export default function Docs({ menu, parentURL }) {
    const variants = {
        shown: {
            transition: {
                staggerChildren: 0.05,
            },
        },
    }
    return (
        <div className={submenu.container()}>
            <motion.div>
                <Link className="text-primary hover:text-primary" to={parentURL}>
                    <h1 className="hidden lg:inline-block text-4xl m-0 font-bold">{menu.title}</h1>
                </Link>
                <p className={submenu.section.description('hidden lg:block')}>
                    <div dangerouslySetInnerHTML={{ __html: menu.description }} />
                </p>
            </motion.div>

            <motion.ul initial="hidden" animate="shown" variants={variants} className="list-none p-0 m-0">
                {menu.items.map((item, index) => (
                    <SubmenuItem item={item} key={index} />
                ))}
            </motion.ul>
        </div>
    )
}

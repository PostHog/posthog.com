import React from 'react'
import Link from 'components/Link'
import SubmenuItem from './SubmenuItem'
import { submenu } from '../classes'

export default function Docs({ menu, parentURL }) {
    return (
        <div className="lg:max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className={submenu.container()}>
                <div>
                    <Link className="text-primary hover:text-primary" to={parentURL}>
                        <h1 className="hidden lg:inline-block text-4xl m-0 font-bold">{menu.title}</h1>
                    </Link>
                    <div className={submenu.section.description('hidden lg:block')}>
                        <div dangerouslySetInnerHTML={{ __html: menu.description }} />
                    </div>
                </div>

                <ul className="list-none p-0 m-0">
                    {menu.items.map((item, index) => (
                        <SubmenuItem item={item} key={index} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

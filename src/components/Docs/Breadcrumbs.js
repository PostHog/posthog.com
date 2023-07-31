import React from 'react'
import { Link } from 'gatsby'

const Crumb = ({ crumb: { name, url } }) => {
    const classes = 'mr-1 md:mr-2'
    return (
        <li className="flex items-center text-sm md:text-lg">
            {url ? (
                <Link className={`${classes} dark:text-[#765494] text-primary/75 hover:text-primary/100 `} to={url}>
                    {name}
                </Link>
            ) : (
                <div className={classes}>{name}</div>
            )}
        </li>
    )
}

export default function Breadcrumbs({ crumbs, base }) {
    return (
        <ul className="list-none p-0 m-0 flex font-semibold space-x-2 mb-2 md:absolute -top-7 breadcrumbs-container">
            {base && <Crumb crumb={base} />}
            {crumbs.map((crumb, index) => {
                return <Crumb key={index} crumb={crumb} />
            })}
        </ul>
    )
}

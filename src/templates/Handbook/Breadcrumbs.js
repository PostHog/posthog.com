import React from 'react'
import { Link } from 'gatsby'

const Crumb = ({ crumb: { name, url } }) => {
    const classes = 'mr-1 md:mr-2'
    return (
        <li className="flex items-center text-xs md:text-base">
            {url ? (
                <Link className={`${classes} text-[#765494] hover:text-[#765494]`} to={url}>
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
        <ul className="text-[#765494] list-none p-0 m-0 flex font-semibold space-x-2 mb-2 md:absolute -top-5 breadcrumbs-container">
            {base && <Crumb crumb={base} />}
            {crumbs.map((crumb, index) => {
                return <Crumb key={index} crumb={crumb} />
            })}
        </ul>
    )
}

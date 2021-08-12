import React from 'react'

const Crumb = ({ title }) => {
    return (
        <li className="flex items-center text-xs md:text-base">
            <div className="mr-1 md:mr-2">{title}</div>
        </li>
    )
}

export default function Breadcrumbs({ crumbs, base }) {
    return (
        <ul className="text-[#765494] list-none p-0 m-0 flex font-semibold space-x-2 mb-2 md:absolute -top-5 breadcrumbs-container">
            {base && <Crumb title={base} />}
            {crumbs.map((crumb, index) => {
                return <Crumb key={index} title={crumb} />
            })}
        </ul>
    )
}

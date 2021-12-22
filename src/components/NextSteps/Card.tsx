import React from 'react'

export default function Card({
    className = '',
    children,
}: {
    className: string
    children: JSX.Element[] | JSX.Element
}) {
    return <div className={`my-16 p-11 rounded-md ${className}`}>{children}</div>
}

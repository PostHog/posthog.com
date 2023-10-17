import React, { useContext } from 'react'

export default function Title({ children, className = '' }: { children: React.ReactNode }) {
    return <h1 className={`text-3xl md:text-4xl lg:text-4xl leading-tight m-0 ${className}`}>{children}</h1>
}

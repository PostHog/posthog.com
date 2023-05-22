import React from 'react'
import { ITwoCol } from './types'

export default function TwoCol({ children, className = '' }: ITwoCol) {
    return (
        <div className={`grid md:grid-cols-2 md:gap-y-0 gap-y-4 md:gap-x-8 lg:gap-x-12 xl:gap-x-16 ${className}`}>
            {children[0]}
            {children[1]}
        </div>
    )
}

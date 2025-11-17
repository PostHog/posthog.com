import React from 'react'

interface ProductSectionHeaderProps {
    id: string
    name: string
}

export const ProductSectionHeader = ({ id, name }: ProductSectionHeaderProps) => {
    return (
        <h2 id={id} className={`text-center text-gray text-sm uppercase bg-accent-light mb-0 p-2 header-${id}`}>
            {name}
        </h2>
    )
}

import React from 'react'

interface ProductSectionHeaderProps {
    id: string
    name: string
}

export const ProductSectionHeader = ({ id, name }: ProductSectionHeaderProps) => {
    return (
        <h2 id={id} className={`text-center mt-16 mb-4 text-lg header-${id}`}>
            {name}
        </h2>
    )
}

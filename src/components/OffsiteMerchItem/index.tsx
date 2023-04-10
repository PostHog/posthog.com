import React from 'react'

interface OffsiteMerchItemProps {
    name: string
    image?: string
}

export const OffsiteMerchItem = ({ name, image }: OffsiteMerchItemProps) => {
    return (
        <div>
            <img src={image} alt="" className="w-full h-full object-contain" />
            {name}
        </div>
    )
}

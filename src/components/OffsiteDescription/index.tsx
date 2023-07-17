import React from 'react'

interface OffsiteDescriptionProps {
    children: JSX.Element[]
}

export const OffsiteDescription = ({ children }: OffsiteDescriptionProps) => {
    return <p className="max-w-2xl mx-auto pb-4 opacity-70">{children}</p>
}

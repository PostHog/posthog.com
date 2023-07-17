import React from 'react'

interface OffsiteMerchProps {
    children: JSX.Element[]
}

export const OffsiteMerch = ({ children }: OffsiteMerchProps) => {
    return (
        <>
            <h3 className="max-w-4xl text-center mx-auto">Limited edition merch</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 text-center items-center max-w-4xl mx-auto gap-8 pb-8">
                {children}
            </div>
        </>
    )
}

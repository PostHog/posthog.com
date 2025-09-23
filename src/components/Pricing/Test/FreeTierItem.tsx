import React from 'react'

interface FreeTierItemProps {
    icon: React.ReactNode
    icon2?: React.ReactNode
    name: string
    allocation?: string | React.ReactNode
    description?: string
}

const FreeTierItem = ({ icon, icon2, name, allocation, description }: FreeTierItemProps): JSX.Element => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex gap-1 items-center leading-none">
                {icon}
                {icon2 && <>+ {icon2}</>}
            </div>
            <strong className="text-[15px] text-center leading-none mt-2 mb-1">{name}</strong>
            <div
                className={`text-sm text-center text-balance leading-none ${description ? 'opacity-75' : 'text-green'}`}
            >
                {description ? description : allocation}
            </div>
        </div>
    )
}

export default FreeTierItem

import React from 'react'

interface FreeTierItemProps {
    icon: React.ReactNode
    icon2?: React.ReactNode
    name: string
    allocation?: string | React.ReactNode
    description?: string
    size?: 'normal' | 'large'
}

const FreeTierItem = ({
    icon,
    icon2,
    name,
    allocation,
    description,
    size = 'normal',
}: FreeTierItemProps): JSX.Element => {
    return (
        <div className="flex flex-col items-center">
            <div className="flex gap-1 items-center leading-none">
                {icon}
                {icon2 && <>+ {icon2}</>}
            </div>
            <strong
                className={`text-center leading-none mt-2 mb-1 ${size === 'normal' && 'text-[15px]'} ${
                    size === 'large' && 'text-xl'
                }`}
            >
                {name}
            </strong>
            <div
                className={`text-center text-balance leading-none ${description ? 'opacity-75' : 'text-green'} ${
                    size === 'normal' && 'text-sm'
                } ${size === 'large' && 'text-lg mt-1'}`}
            >
                {description ? description : allocation}
            </div>
        </div>
    )
}

export default FreeTierItem

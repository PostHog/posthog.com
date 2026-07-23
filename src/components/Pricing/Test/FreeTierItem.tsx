import React from 'react'

interface FreeTierItemProps {
    icon: React.ReactNode
    icon2?: React.ReactNode
    name: string
    badge?: string
    allocation?: string | React.ReactNode
    description?: string
    size?: 'normal' | 'large'
}

const FreeTierItem = ({
    icon,
    icon2,
    name,
    badge,
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
                className={`text-center leading-none mt-2 mb-1 flex items-center gap-1.5 ${
                    size === 'normal' && 'text-[15px]'
                } ${size === 'large' && 'text-xl'}`}
            >
                <span>{name}</span>
                {badge && (
                    <span className="bg-yellow uppercase text-2xs rounded-xs px-0.5 py-0.5 font-semibold text-black leading-none">
                        {badge}
                    </span>
                )}
            </strong>
            <div
                className={`text-center text-balance leading-none ${description ? 'opacity-75' : 'text-secondary'} ${
                    size === 'normal' && 'text-sm'
                } ${size === 'large' && 'text-lg mt-1'}`}
            >
                {description ? description : allocation}
            </div>
        </div>
    )
}

export default FreeTierItem

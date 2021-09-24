import React from 'react'

export const Features = ({ features, className = '' }) => {
    return (
        <ul className={`p-0 list-none m-0 grid gap-4 ${className}`}>
            {features.map((feature, index) => {
                const { title, icon } = feature
                return (
                    <li key={index} className="flex space-x-2 items-center">
                        {icon && <span>{icon}</span>}
                        <span>{title}</span>
                    </li>
                )
            })}
        </ul>
    )
}

export const Plan = ({ title, subtitle, badge, children, className = '' }) => {
    return (
        <div className={`flex flex-col py-6 md:py-9 px-6 md:px-14 ${className}`}>
            <h3 className="my-0">{title}</h3>
            <p className="text-[15px] mt-1 mb-2">{subtitle}</p>
            {badge && (
                <span className="text-[11px] py-1 px-2 rounded-sm border border-primary border-opacity-50 self-start opacity-50">
                    {badge}
                </span>
            )}
            {children}
        </div>
    )
}

export const Price = ({ children }) => {
    return <h5 className="m-0">{children}</h5>
}

export const Section = ({ title, children, className = '' }) => {
    return (
        <div className={className}>
            <h4 className="opacity-50 border-b border-dashed border-gray-accent-light pb-2 font-semibold text-[15px] mb-3 mt-7">
                {title}
            </h4>
            {children}
        </div>
    )
}

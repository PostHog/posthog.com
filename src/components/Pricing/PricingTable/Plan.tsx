import React from 'react'
import { feature } from './classes'

export const Feature = ({ title, icon, size }) => {
    return (
        <li className={feature(size)}>
            {icon && <span>{icon}</span>}
            <span>{title}</span>
        </li>
    )
}

export const Features = ({ features, size, className = '' }) => {
    return (
        <ul className={`p-0 list-none m-0 grid gap-2 text-xs ${className}`}>
            {features.map((feature, index) => {
                const { title, icon } = feature
                return <Feature key={index} title={title} icon={icon} size={size} />
            })}
        </ul>
    )
}

export const Badge = ({ title, className = '' }) => {
    return (
        <span
            className={`text-[11px] py-1 px-2 rounded-sm border border-primary/50 opacity-50 font-normal leading-none ${className}`}
        >
            {title}
        </span>
    )
}

export const Title = ({ className = '', title, subtitle, badge, icon }) => {
    return (
        <div>
            {icon && <span className="inline-block opacity-30">{icon}</span>}
            <div>
                <div className="flex items-center flex-wrap">
                    <h3 className="m-0 text-[18px] font-black mr-2">{title}</h3>
                    {badge && (
                        <span
                            className={`text-[12px] py-[4px] px-[4px] rounded-[3px] border border-primary/50 opacity-50 font-normal leading-none`}
                        >
                            {badge}
                        </span>
                    )}
                </div>
                <p className="m-0 mt-1 text-black/50 font-medium text-xs">{subtitle}</p>
            </div>
        </div>
    )
}

export const Plan = ({ title, subtitle, badge, children, className = '', style = {}, icon }) => {
    return (
        <div style={style} className={`flex flex-col py-6 md:py-9 px-6 md:px-14 ${className}`}>
            <Title icon={icon} title={title} subtitle={subtitle} badge={badge} />
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

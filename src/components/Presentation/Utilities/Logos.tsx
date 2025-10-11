import Logo from 'components/Logo'
import { IconHeartFilled } from '@posthog/icons'
import React from 'react'

export default function Logos({
    companyLogo,
    companyName,
    color = 'text-red',
    size = 'md',
}: {
    companyLogo: string
    companyName: string
    color: string
    size: 'sm' | 'md'
}) {
    return (
        <div className="flex items-center gap-4">
            <Logo
                noText
                fill={color === 'text-white' ? 'white' : ''}
                className={`${size === 'sm' ? 'size-12' : 'size-20'}`}
            />
            {companyLogo && (
                <>
                    <IconHeartFilled className={`${size === 'sm' ? 'size-8' : 'size-12'} inline-block ${color}`} />
                    <img
                        src={companyLogo}
                        alt={companyName || 'Company logo'}
                        className={`${size === 'sm' ? 'h-8 @2xl:h-12' : 'h-12 @2xl:h-16'} object-contain rounded`}
                    />
                </>
            )}
        </div>
    )
}

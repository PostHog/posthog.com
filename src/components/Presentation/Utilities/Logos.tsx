import Logo from 'components/Logo'
import { IconHeartFilled } from '@posthog/icons'
import React from 'react'

export default function Logos({ companyLogo, companyName }: { companyLogo: string; companyName: string }) {
    return (
        <div className="flex items-center gap-4">
            <Logo noText className="size-20" />
            {companyLogo && (
                <>
                    <IconHeartFilled className="size-12 inline-block text-red" />
                    <img
                        src={companyLogo}
                        alt={companyName || 'Company logo'}
                        className="h-12 @2xl:h-16 object-contain rounded"
                    />
                </>
            )}
        </div>
    )
}

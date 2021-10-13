import React from 'react'
import { CallToAction } from 'components/CallToAction'

export default function Hero({
    title,
    subtitle,
    ctas,
}: {
    title?: JSX.Element | string
    subtitle?: JSX.Element | string
    ctas?: {
        href: string
        text: JSX.Element | string
        type: 'primary' | 'outline'
    }[]
}): JSX.Element {
    return (
        <div className="max-w-[849px] mx-auto text-center">
            {title && <h1 className="text-4xl md:text-[64px] mt-0 mb-5">{title}</h1>}
            {subtitle && (
                <h2 className="text-[18px] md:text-[20px] leading-[1.4] font-semibold mb-8 !mt-5">{subtitle}</h2>
            )}
            {ctas && (
                <div className="flex flex-col space-y-3 items-center">
                    {ctas.map((cta, index) => {
                        const { href, text, type } = cta
                        return (
                            <CallToAction key={index} href={href} type={type}>
                                {text}
                            </CallToAction>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

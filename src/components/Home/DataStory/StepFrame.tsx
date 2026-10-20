import React from 'react'
import { cn } from '../../../utils'

export default function StepFrame({
    number,
    title,
    description,
    children,
}: {
    number: number
    title: string
    description: React.ReactNode
    children: React.ReactNode
}): JSX.Element {
    return (
        <div className={cn('@container', number === 1 ? 'mt-10' : 'mt-16')}>
            <div className="relative mx-auto flex max-w-[58rem] flex-col gap-5">
                <div className="max-w-2xl [&_h3]:!mb-1 [&_h3]:!text-lg [&_p]:!mb-0 [&_p]:!text-[15px] [&_p]:text-secondary">
                    <h3 className="!mt-0">
                        {number}. {title}
                    </h3>
                    <p>{description}</p>
                </div>
                <div className="w-full">{children}</div>
            </div>
        </div>
    )
}

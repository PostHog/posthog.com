import React from 'react'

export default function Section({
    children,
    cta,
    title,
    className = '',
    id = '',
}: {
    children: React.ReactNode
    cta?: React.ReactNode
    title?: string
    className?: string
    id?: string
}): JSX.Element {
    return (
        <section id={id} className={`max-w-screen-xl mx-auto px-5 mt-6 mb-12 ${className}`}>
            {title && (
                <div className="flex flex-col md:flex-row justify-between items-baseline w-full mb-6 md:mb-8 relative after:h-px after:bg-border dark:after:bg-border-dark after:absolute after:top-1/2 after:left-0 after:w-full">
                    <h4 className="m-0 bg-light dark:bg-dark relative z-10 pr-2">{title}</h4>
                    {cta && (
                        <aside className="bg-light dark:bg-dark relative z-10 md:pl-2 leading-tight -top-1">
                            {cta}
                        </aside>
                    )}
                </div>
            )}
            <div>{children}</div>
        </section>
    )
}

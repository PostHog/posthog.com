import React from 'react'
import Link from 'components/Link'

type MaxCTAProps = {
    className?: string
    children?: React.ReactNode
    question: string
}

export const MaxCTA = ({ className = '', children, question }: MaxCTAProps): JSX.Element => {
    const encodedQuestion = encodeURIComponent(question)
    const maxUrl = `https://app.posthog.com/#panel=max:${encodedQuestion}`

    return (
        <div
            className={`bg-[#e5e7e0] dark:bg-[#242529] border border-border dark:border-border-dark text-[15px] rounded-md p-4 my-4 ${className}`}
        >
            <div className="flex items-start space-x-3">
                <span className="text-xl leading-none mt-0.5">🦔</span>
                <div className="space-y-1">
                    <div className="font-bold text-primary dark:text-primary-dark">Try this with Max AI</div>
                    <p className="text-muted dark:text-muted-dark m-0">
                        If you're opted in to{' '}
                        <Link
                            href="http://app.posthog.com/home#panel=feature-previews"
                            externalNoIcon
                            className="text-red-600 dark:text-yellow-400 hover:underline"
                        >
                            our free Max AI beta
                        </Link>
                        , you can{' '}
                        <Link
                            href={maxUrl}
                            externalNoIcon
                            className="text-red-600 dark:text-yellow-400 hover:underline"
                        >
                            ask Max to build this for you
                        </Link>
                        .
                    </p>
                    {children}
                </div>
            </div>
        </div>
    )
}

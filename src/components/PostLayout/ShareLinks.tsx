import React from 'react'

import { Facebook, LinkedIn, Mail, Twitter } from 'components/Icons'

type ShareLinkProps = {
    href: string
    children: React.ReactNode
}

const ShareLink: React.FC<ShareLinkProps> = ({ children, href }) => {
    const width = 626
    const height = 436
    const handleClick = () => {
        if (typeof window !== 'undefined') {
            const left = window.innerWidth / 2 - width / 2
            const top = window.innerHeight / 2 - height / 2
            window.open(href, '', `left=${left},top=${top},width=${width},height=${height}`)
        }
    }
    return (
        <button
            className="flex text-primary hover:text-primary dark:text-white dark:hover:text-white"
            onClick={handleClick}
        >
            {children}
        </button>
    )
}

type ShareLinksProps = {
    title: string
    href: string
}

export const ShareLinks: React.FC<ShareLinksProps> = ({ title, href }) => {
    return (
        <div className="opacity-50 flex space-x-3 items-center">
            <ShareLink href={`https://www.facebook.com/sharer/sharer.php?u=${href}`}>
                <Facebook />
            </ShareLink>
            <ShareLink
                href={`https://twitter.com/intent/tweet?url=${href}&text=Check%20out%20this%20article%20from%20%40posthog%0A%0A`}
            >
                <Twitter className="w-[32px] h-[32px]" />
            </ShareLink>
            <ShareLink href={`https://www.linkedin.com/shareArticle?url=${href}`}>
                <LinkedIn className="w-[32px] h-[32px]" />
            </ShareLink>
            <a
                className="text-primary hover:text-primary dark:text-white dark:hover:text-white"
                href={`mailto:?subject=${title}&body=${href}`}
            >
                <Mail />
            </a>
        </div>
    )
}

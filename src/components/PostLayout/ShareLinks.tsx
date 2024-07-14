import React, { useState } from 'react'
import { useLocation } from '@reach/router'
import { LinkedIn, LinkIcon, Mail, Twitter } from 'components/Icons'
import { usePost } from './hooks'
import Tooltip from 'components/Tooltip'

const ShareLink = ({ children, url }: { children: React.ReactNode; url: string }) => {
    const width = 626
    const height = 436
    const handleClick = () => {
        if (typeof window !== 'undefined') {
            const left = window.innerWidth / 2 - width / 2
            const top = window.innerHeight / 2 - height / 2
            window.open(url, '', `left=${left},top=${top},width=${width},height=${height}`)
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

export default function ShareLinks(): JSX.Element | null {
    const { title } = usePost()
    const { href } = useLocation()
    const [copied, setCopied] = useState(false)
    const handleCopyClick = () => {
        const url = `${href.replace(/#.*/, '')}`
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 5000)
    }
    return (
        <div className="opacity-50 flex space-x-4 items-center">
            <ShareLink
                url={`https://twitter.com/intent/tweet?url=${href}&text=Check%20out%20this%20article%20from%20%40posthog%0A%0A`}
            >
                <Twitter className="w-[24px] h-[24px] relative hover:scale-[1.1] active:top-[.5px] active:scale-[.99]" />
            </ShareLink>
            <ShareLink url={`https://www.linkedin.com/shareArticle?url=${href}`}>
                <LinkedIn className="w-[24px] h-[24px] relative hover:scale-[1.1] active:top-[.5px] active:scale-[.99]" />
            </ShareLink>
            <a
                className="text-primary hover:text-primary dark:text-white dark:hover:text-white relative hover:scale-[1.1] active:top-[.5px] active:scale-[.99] w-[24px] h-[16px]"
                href={`mailto:?subject=${title}&body=${href}`}
            >
                <Mail />
            </a>
            <button className="relative" onClick={handleCopyClick}>
                <Tooltip
                    placement="top"
                    content={() => <p className="m-0 font-semibold text-sm">{copied ? 'Copied!' : 'Copy page URL'}</p>}
                >
                    <span className="relative">
                        <LinkIcon className="w-[20px] h-[20px] relative hover:scale-[1.1] active:top-[.5px] active:scale-[.99]" />
                    </span>
                </Tooltip>
            </button>
        </div>
    )
}

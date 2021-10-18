import React, { useEffect, useState } from 'react'
import { LinkedIn, Twitter } from 'components/Icons/Icons'
import cntl from 'cntl'

const icons = cntl`
    text-primary
    dark:text-primary-dark
`

export const BlogShareButtons = (): JSX.Element => {
    const [currentUrl, setCurrentUrl] = useState('')

    useEffect(() => {
        if (window?.location?.href) {
            setCurrentUrl(window.location.href)
        }
    }, [])

    return (
        <>
            <div className="flex-col absolute -ml-3 mt-1 hidden sm:inline-flex share-links">
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                    target="_blank"
                    className="mb-4 opacity-75 hover:opacity-100"
                    rel="noreferrer"
                >
                    <LinkedIn className={icons} />
                </a>
                <a
                    href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
                    target="_blank"
                    className="opacity-75 hover:opacity-100"
                    rel="noreferrer"
                >
                    <Twitter className={icons} />
                </a>
            </div>
        </>
    )
}

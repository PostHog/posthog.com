import React, { useEffect, useState } from 'react'

import twitterIcon from '../../../images/icons/twitter.svg'
import linkedInIcon from '../../../images/icons/linkedin.svg'

export const BlogShareButtons = (): JSX.Element => {
    const [currentUrl, setCurrentUrl] = useState('')

    useEffect(() => {
        if (window?.location?.href) {
            setCurrentUrl(window.location.href)
        }
    }, [])

    return (
        <>
            <div className="flex-col absolute -ml-3 mt-1 hidden sm:inline-flex">
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                    target="_blank"
                    className="mb-4 opacity-75 hover:opacity-100"
                    rel="noreferrer"
                >
                    <img src={linkedInIcon} alt="share on LinkedIn" />
                </a>
                <a
                    href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
                    target="_blank"
                    className="opacity-75 hover:opacity-100"
                    rel="noreferrer"
                >
                    <img src={twitterIcon} alt="share on Twitter" />
                </a>
            </div>
        </>
    )
}

import React, { useEffect, useState } from 'react'

import twitterIcon from '../../../images/icons/twitter.svg'
import linkedInIcon from '../../../images/icons/linkedin.svg'

export const BlogShareButtons = () => {
    const [currentUrl, setCurrentUrl] = useState('')

    useEffect(() => {
        if (window?.location?.href) {
            setCurrentUrl(window.location.href)
        }
    }, [])

    return (
        <>
            <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
                target="_blank"
                rel="noreferrer"
            >
                <img src={linkedInIcon} alt="share on LinkedIn" className="inline-block" />
            </a>
            <a
                href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
                target="_blank"
                className="ml-4"
                rel="noreferrer"
            >
                <img src={twitterIcon} alt="share on Twitter" className="inline-block" />
            </a>
        </>
    )
}

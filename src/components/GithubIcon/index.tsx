import { GitHub } from 'components/Icons/Icons'
import React from 'react'
import './style.scss'

interface GithubIconProps {
    username: string
}

export const GithubIcon = ({ username }: GithubIconProps) => {
    const url = `https://github.com/${username}`

    return (
        <a
            href={url}
            className="github-user-link inline-block my-2 opacity-75 hover:opacity-100 !text-primary hover:text-primary dark:text-white dark:hover:text-white"
        >
            <GitHub />
        </a>
    )
}

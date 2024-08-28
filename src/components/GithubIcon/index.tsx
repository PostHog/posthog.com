import './style.scss'

import React from 'react'
import { IconGithub } from '@posthog/icons'

interface GithubIconProps {
    username: string
}

export const GithubIcon = ({ username }: GithubIconProps) => {
    const url = `https://github.com/${username}`

    return (
        <a href={url} className="github-user-link inline-block -mt-4 mb-4 opacity-75 hover:opacity-100">
            <IconGithub style={{ fontSize: '22px', color: 'black', verticalAlign: 'baseline' }} />
        </a>
    )
}

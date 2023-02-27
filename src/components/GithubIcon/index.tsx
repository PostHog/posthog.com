import React from 'react'
import { GithubOutlined } from '@ant-design/icons'

import './style.scss'
import { GitHub } from 'components/Icons'

interface GithubIconProps {
    username: string
}

export const GithubIcon = ({ username }: GithubIconProps) => {
    const url = `https://github.com/${username}`

    return (
        <a href={url} className="github-user-link !opacity-75 hover:!opacity-100 !text-black dark:!text-white cta">
            <GitHub />
        </a>
    )
}

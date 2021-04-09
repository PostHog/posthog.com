import React from 'react'
import { GithubOutlined } from '@ant-design/icons'

import './style.scss'

interface GithubIconProps {
    username: string
}

export const GithubIcon = ({ username }: GithubIconProps) => {
    const url = `https://github.com/${username}`

    return (
        <a href={url} class="github-user-link">
            <GithubOutlined style={{ fontSize: '22px', color: 'black', verticalAlign: 'baseline' }} />
        </a>
    )
}

import React from 'react'
import { Link } from 'gatsby'
import Button from 'antd/lib/button'
import rays from '../../images/rays.svg'
import './style.scss'

interface StartNowButtonProps {
    href?: string
    innerText?: string
}

export const StartNowButton = ({ href = '/pricing', innerText = 'Start Now' }: StartNowButtonProps) => {
    return (
        <div className="start-now-btn-wrapper">
            <div className="startNowWrapper">
                <div className="startNowRow">
                    <Link to={href}>
                        <Button type="primary" className="startNowButton">
                            {innerText}
                        </Button>
                    </Link>
                    <img src={rays} />
                </div>
            </div>
        </div>
    )
}

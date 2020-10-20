import React from 'react'
import { Link } from 'gatsby'
import Button from 'antd/lib/button'
import rays from '../../src/images/rays.svg'
import './style.scss'

export const StartNowButton = ({ href = '/trial', /* size, color = 'blue', */ innerText = 'Start Now' }) => {
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

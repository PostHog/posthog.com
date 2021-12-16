import { CallToAction } from 'components/CallToAction'
import React from 'react'
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
                    <CallToAction to={href}>{innerText}</CallToAction>
                    <img src={rays} />
                </div>
            </div>
        </div>
    )
}

import React from 'react'
import { Spacer } from '../Spacer'
import './style.scss'

export const DemoScheduler = ({
    iframeSrc = 'https://calendly.com/yakko/yc-onboarding-group',
}: {
    iframeSrc?: string
}) => {
    return (
        <>
            <div>
                <iframe src={iframeSrc} className="centered calendly-frame" style={{ margin: 'auto' }} />
            </div>
            <Spacer height={100} />
        </>
    )
}

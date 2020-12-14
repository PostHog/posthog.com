import React from 'react'
import { Spacer } from '../Spacer'
import './style.scss'

export const DemoScheduler = () => {
    return (
        <>
            <div>
                <iframe
                    src="https://calendly.com/yakko/yc-onboarding"
                    className="centered calendly-frame"
                    style={{ margin: 'auto' }}
                />
            </div>
            <Spacer height={100} />
        </>
    )
}

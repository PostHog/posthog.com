import React from 'react'
import { MethodTags, method } from '../MethodTags'
import './style.scss'

interface EndpointProps {
    endpoint: string
    allowedMethods: method[]
}

export const Endpoint = ({ endpoint, allowedMethods }: EndpointProps) => {
    return (
        <div className="docs-endpoint-wrapper">
            <MethodTags allowedMethods={allowedMethods} />
            <h6 className="endpoint-text">{endpoint}</h6>
        </div>
    )
}

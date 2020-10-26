import React from 'react'

interface ContainerProps {
    onPostPage: boolean
    className: string
    containerStyle?: React.CSSProperties
    children: any
}

function Container({ onPostPage, className, containerStyle = {}, children }: ContainerProps) {
    return (
        <div className={className + ' ' + (onPostPage && ' docs-container')}>
            <div
                style={{
                    ...containerStyle,
                }}
            >
                {children}
            </div>
        </div>
    )
}

export default Container

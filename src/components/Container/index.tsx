import React from 'react'

interface ContainerProps {
    onPostPage: boolean
    className: string
    containerStyle?: any
    children: React.ReactNode
}

export const Container = ({ onPostPage, className, containerStyle = {}, children }: ContainerProps) => {
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

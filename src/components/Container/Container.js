import React from 'react'

function Container({ onPostPage, className, containerStyle = {}, children }) {
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

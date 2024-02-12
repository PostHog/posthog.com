import React from 'react'

export const ProductScreenshot = ({ imageLight, imageDark, alt, classes }) => {
    return (
        <div
            className={`mb-4 border border-light dark:border-dark rounded p-4 bg-accent dark:bg-accent-dark ${classes}`}
            style={{ display: 'flex', justifyContent: 'center' }}
        >
            {imageLight && (
                <img
                    src={imageLight}
                    alt={alt}
                    className={`dark:hidden ${classes}`}
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            )}
            {imageDark && (
                <img
                    src={imageDark}
                    alt={alt}
                    className={`hidden dark:block ${classes}`}
                    style={{ maxWidth: '100%', height: 'auto' }}
                />
            )}
        </div>
    )
}

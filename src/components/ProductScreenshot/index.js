import React from 'react'

export const ProductScreenshot = ({ imageLight, imageDark, alt, classes }) => {
    return (
        <div
            className={`mb-4 border border-light dark:border-dark rounded p-4 bg-accent dark:bg-accent-dark flex justify-center ${classes}`}
        >
            {imageLight && (
                <img
                    src={imageLight}
                    alt={alt}
                    className={`dark:hidden max-w-full  ${classes}`}
                />
            )}
            {imageDark && (
                <img
                    src={imageDark}
                    alt={alt}
                    className={`hidden dark:block max-w-full ${classes}`}
                />
            )}
        </div>
    )
}

import React from 'react'

export const ProductScreenshot = ({ imageLight, imageDark, alt, classes }) => {
    return (
        <div className="mb-4 border border-light dark:border-dark rounded p-4 bg-accent dark:bg-accent-dark">
            <img src={imageLight} alt={alt} className={`${imageDark ? 'dark:hidden' : ''} ${classes}`} />
            {imageDark && <img src={imageDark} alt={alt} className={`hidden dark:block ${classes}`} />}
        </div>
    )
}

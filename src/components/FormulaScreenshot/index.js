import React from 'react'

export const FormulaScreenshot = ({ imageLight, imageDark, alt, classes }) => {
    return (
        <div className="mb-4 border border-light dark:border-dark rounded bg-accent dark:bg-accent-dark">
            <img src={imageLight} alt={alt} className={`${imageDark ? 'dark:hidden' : ''} ${classes}`} />
            {imageDark && <img src={imageDark} alt={alt} className={`hidden dark:block ${classes}`} />}
        </div>
    )
}

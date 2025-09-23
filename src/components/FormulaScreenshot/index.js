import React from 'react'

export const FormulaScreenshot = ({ imageLight, imageDark, alt, classes }) => {
    return (
        <div className="mb-4 border border-primary rounded bg-accent">
            <img src={imageLight} alt={alt} className={`${imageDark ? 'dark:hidden' : ''} ${classes}`} />
            {imageDark && <img src={imageDark} alt={alt} className={`hidden dark:block ${classes}`} />}
        </div>
    )
}

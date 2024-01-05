import React from 'react'

export const ProductScreenshot = ({ imageLight, imageDark, classes }) => {
    return (
        <div className="mb-4 border border-light dark:border-dark rounded p-4 bg-accent dark:bg-accent-dark">
            <img src={imageLight} alt="Screenshot" className={`dark:hidden rounded $classes}`} />
            <img src={imageDark} alt="Screenshot" className={`hidden dark:block rounded $classes}`} />
        </div>
    )
}

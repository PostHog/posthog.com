import React from 'react'
import { ZoomImage } from 'components/ZoomImage'

export const ProductScreenshot = ({ imageLight, imageDark, alt, classes, zoom }) => {
    return (
        <div className="mb-4 border border-light dark:border-dark rounded p-4 bg-accent dark:bg-accent-dark">
            {zoom === false ? (
                <>
                    <img src={imageLight} alt={alt} className={`${imageDark ? 'dark:hidden' : ''} ${classes}`} />
                    {imageDark && <img src={imageDark} alt={alt} className={`hidden dark:block ${classes}`} />}
                </>
            ) : (
                <ZoomImage>
                    <img src={imageLight} alt={alt} className={`${imageDark ? 'dark:hidden' : ''} ${classes}`} />
                    {imageDark && <img src={imageDark} alt={alt} className={`hidden dark:block ${classes}`} />}
                </ZoomImage>
            )}
        </div>
    )
}

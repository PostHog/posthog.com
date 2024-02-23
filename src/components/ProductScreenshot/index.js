import React from 'react'
import { ZoomImage } from 'components/ZoomImage'

export const ProductScreenshot = ({ imageLight, imageDark, alt, classes = '', zoom }) => {
    const Container = zoom === false ? React.Fragment : ZoomImage
    return (
        <div className="mb-4 border border-light dark:border-dark rounded p-4 bg-accent dark:bg-accent-dark">
            <Container>
                <img src={imageLight} alt={alt} className={`${imageDark ? 'dark:hidden' : ''} ${classes}`} />
                {imageDark && <img src={imageDark} alt={alt} className={`hidden dark:block ${classes}`} />}
            </Container>
        </div>
    )
}

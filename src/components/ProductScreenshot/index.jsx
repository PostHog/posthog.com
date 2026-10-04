import React from 'react'
import { ZoomImage } from 'components/ZoomImage'

export const ProductScreenshot = ({ imageLight, imageDark, alt, padding = true, classes = '', zoom }) => {
    const Container = zoom === false ? React.Fragment : ZoomImage
    return (
        <div className={`mb-4 border border-primary rounded bg-accent max-w-fit leading-[0] ${padding ? 'p-4' : ''}`}>
            <Container>
                <img src={imageLight} alt={alt} className={`${imageDark ? 'dark:hidden' : ''} ${classes}`} />
                {imageDark && <img src={imageDark} alt={alt} className={`hidden dark:block ${classes}`} />}
            </Container>
        </div>
    )
}

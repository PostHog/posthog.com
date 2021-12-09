import React from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export const ZoomImage = ({ children, ...other }: { children: any }) => {
    return (
        <Zoom overlayBgColorEnd="rgb(0 0 0 / 85%)" overlayBgColorStart="rgb(0 0 0 / 80%)">
            {children || <img {...other} />}
        </Zoom>
    )
}

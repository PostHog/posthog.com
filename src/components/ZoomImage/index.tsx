import React from 'react'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export const ZoomImage = (props: any) => {
    return (
        <Zoom overlayBgColorEnd="rgb(0 0 0 / 85%)" overlayBgColorStart="rgb(0 0 0 / 80%)">
            <img {...props} />
        </Zoom>
    )
}

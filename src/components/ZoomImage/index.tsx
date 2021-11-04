import React, { useCallback, useState } from 'react'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export const ZoomImage = ({ frame, ...other }: { frame: boolean }) => {
    const [isZoomed, setIsZoomed] = useState(false)

    const handleZoomChange = useCallback((shouldZoom) => {
        setIsZoomed(shouldZoom)
    }, [])

    return (
        <ControlledZoom
            isZoomed={isZoomed}
            onZoomChange={handleZoomChange}
            overlayBgColorEnd="rgb(0 0 0 / 85%)"
            overlayBgColorStart="rgb(0 0 0 / 80%)"
        >
            <img className={frame && !isZoomed ? 'rounded-md shadow-lg' : ''} {...other} />
        </ControlledZoom>
    )
}

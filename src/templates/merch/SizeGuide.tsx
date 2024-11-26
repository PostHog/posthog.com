import CloudinaryImage from 'components/CloudinaryImage'
import { ZoomImage } from 'components/ZoomImage'
import React, { useState } from 'react'

const sizeGuides = {
    't-shirt': 'https://res.cloudinary.com/dmukukwp6/image/upload/5026_SIZE_GUIDE_c922fdf762.jpg',
    hoodie: 'https://res.cloudinary.com/dmukukwp6/image/upload/5102_SIZE_GUIDE_31cdfc2740.jpg',
}

export default function SizeGuide({ title }: { title: string }): React.ReactElement | null {
    const [showSizeGuide, setShowSizeGuide] = useState(false)
    const sizeGuideImage =
        sizeGuides[Object.keys(sizeGuides).find((key) => title.toLowerCase().includes(key)) as keyof typeof sizeGuides]

    return sizeGuideImage ? (
        <div className={showSizeGuide ? '' : '!mt-1'}>
            {showSizeGuide && (
                <div className="w-full aspect-square">
                    <ZoomImage>
                        <CloudinaryImage src={sizeGuideImage} />
                    </ZoomImage>
                </div>
            )}
            <button className="text-sm opacity-70 underline" onClick={() => setShowSizeGuide(!showSizeGuide)}>
                {showSizeGuide ? 'Hide' : 'View'} size guide
            </button>
        </div>
    ) : null
}

import CloudinaryImage from 'components/CloudinaryImage'
import { ZoomImage } from 'components/ZoomImage'
import React, { useState } from 'react'

const sizeGuides = {
    't-shirt': ['https://res.cloudinary.com/dmukukwp6/image/upload/5026_SIZE_GUIDE_c922fdf762.jpg'],
    hoodie: ['https://res.cloudinary.com/dmukukwp6/image/upload/5102_SIZE_GUIDE_31cdfc2740.jpg'],
    'track.suit': [
        'https://res.cloudinary.com/dmukukwp6/image/upload/IMG_3315_b6230804cf.png',
        'https://res.cloudinary.com/dmukukwp6/image/upload/IMG_3316_3d564f9e41.png',
    ],
    'posthog_xmas.sweater': ['https://res.cloudinary.com/dmukukwp6/image/upload/sweater_sizes_efd7c22922.jpg'],
}

export default function SizeGuide({ title }: { title: string }): React.ReactElement | null {
    const [showSizeGuide, setShowSizeGuide] = useState(false)
    const sizeGuideImages =
        sizeGuides[Object.keys(sizeGuides).find((key) => title.toLowerCase().includes(key)) as keyof typeof sizeGuides]

    return sizeGuideImages?.length > 0 ? (
        <div className={showSizeGuide ? '' : '!mt-1'}>
            {showSizeGuide && (
                <ul className="list-none p-0 m-0">
                    {sizeGuideImages?.map((image) => (
                        <li className="w-full" key={image}>
                            <ZoomImage>
                                <CloudinaryImage src={image} />
                            </ZoomImage>
                        </li>
                    ))}
                </ul>
            )}
            <button className="text-sm opacity-70 underline" onClick={() => setShowSizeGuide(!showSizeGuide)}>
                {showSizeGuide ? 'Hide' : 'View'} size guide
            </button>
        </div>
    ) : null
}

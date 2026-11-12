import React from 'react'
import { Carousel } from 'components/UI/Carousel'

const photos = [
    {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/ucd_0_da36c8b7ef.jpeg',
        caption: 'UC Davis students at a PostHog event',
    },
    {
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/ucd_1_c842b31c89.png',
        caption: 'The UC Davis campus community',
    },
    { image: 'https://res.cloudinary.com/dmukukwp6/image/upload/ucd_2_08264c97eb.JPG', caption: 'PostHog on campus' },
]

export default function AutomaticPhotos(): JSX.Element {
    return (
        <Carousel label="PostHog on campus" autoplay={5000}>
            {photos.map((photo) => (
                <figure key={photo.image} className="m-0">
                    <img
                        src={photo.image}
                        alt={photo.caption}
                        loading="lazy"
                        className="aspect-[4/3] w-full rounded-lg object-cover"
                    />
                    <figcaption className="mt-2 text-sm text-secondary">{photo.caption}</figcaption>
                </figure>
            ))}
        </Carousel>
    )
}

import React from 'react'
import { Video } from 'components/UI/Video'

export default function Manual(): JSX.Element {
    return (
        <Video
            src="https://res.cloudinary.com/dmukukwp6/video/upload/product_analytics_data_1080_0f850bdf5b.mp4"
            poster="https://res.cloudinary.com/dmukukwp6/video/upload/so_0,f_jpg/product_analytics_data_1080_0f850bdf5b.jpg"
            autoPlay={false}
            label="Explore data with product analytics"
            caption="Press play to start the demo."
        />
    )
}

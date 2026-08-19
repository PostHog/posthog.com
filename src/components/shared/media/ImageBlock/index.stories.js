import React from 'react'
import { ImageBlock as ImageBlockomponent } from '.'

export default {
    component: ImageBlockomponent,
    title: 'Components/Image Block',
    argTypes: {
        title: {
            table: {
                type: {
                    summary: 'The label that appears above the images',
                },
            },
        },
        images: {
            table: {
                type: {
                    summary: 'A list of images to render',
                },
            },
        },
    },
}

export const ImageBlock = (args) => <ImageBlockomponent {...args} />
ImageBlock.args = {
    title: 'Mention Me’s Product Stack',
    images: ['/images/customers/appcues.svg', '/images/customers/posthog.svg', '/images/customers/intercom.svg'],
}

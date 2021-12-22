import React from 'react'
import { FloatedImage as FloatedImageComponent } from '.'

export default {
    component: FloatedImageComponent,
    title: 'Components/Floated Image',
    argTypes: {
        align: {
            defaultValue: 'right',
            options: ['left', 'right'],
            control: { type: 'radio' },
            table: {
                type: {
                    summary: 'Determines which side of the content the image is floated to',
                },
                defaultValue: { summary: 'right' },
            },
        },
        image: {
            table: {
                type: {
                    summary: 'The source of the image',
                },
            },
        },
    },
}

export const FloatedImage = (args) => <FloatedImageComponent {...args} />
FloatedImage.args = {
    align: 'right',
    image: '/images/customers/model.png',
}

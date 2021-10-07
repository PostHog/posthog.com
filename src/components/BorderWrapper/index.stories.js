import React from 'react'
import { BorderWrapper as BorderWrapperComponent } from '.'

export default {
    component: BorderWrapperComponent,
    title: 'Components/Border Wrapper',
    argTypes: {
        children: {
            table: {
                type: {
                    summary: 'Content to be surrounded by border',
                },
            },
        },
    },
}

export const BorderWrapper = (args) => <BorderWrapperComponent {...args} />
BorderWrapper.args = {
    children: <p>Jerry was a race car driver</p>,
}

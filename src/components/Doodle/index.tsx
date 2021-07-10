import React from 'react'

import { DoodleCircle } from '../DoodleCircle'
import { DoodleRectangle } from '../DoodleRectangle'
import { DoodleTriangle } from '../DoodleTriangle'
import { DoodleZigzag } from '../DoodleZigzag'

interface DoodleProps {
    type: 'circle' | 'rectangle' | 'triangle' | 'zigzag'
    color: string
    classes?: string
}

export const Doodle = ({ type, color, classes }: DoodleProps) => {
    switch (type) {
        case 'circle':
            return <DoodleCircle color={color} classes={classes} />
        case 'rectangle':
            return <DoodleRectangle color={color} classes={classes} />
        case 'triangle':
            return <DoodleTriangle color={color} classes={classes} />
        case 'zigzag':
            return <DoodleZigzag color={color} classes={classes} />
        default:
            return null
    }
}

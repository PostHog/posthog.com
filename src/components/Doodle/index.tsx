import React from 'react'

import { DoodleCircle } from '../DoodleCircle'
import { DoodleRectangle } from '../DoodleRectangle'
import { DoodleTriangle } from '../DoodleTriangle'
import { DoodleZigzag } from '../DoodleZigzag'

interface DoodleProps {
    type: 'circle' | 'rectangle' | 'triangle' | 'zigzag'
    color: string
}

export const Doodle = ({ type, color }: DoodleProps) => {
    switch (type) {
        case 'circle':
            return <DoodleCircle color={color} />
        case 'rectangle':
            return <DoodleRectangle color={color} />
        case 'triangle':
            return <DoodleTriangle color={color} />
        case 'zigzag':
            return <DoodleZigzag color={color} />
        default:
            return null
    }
}

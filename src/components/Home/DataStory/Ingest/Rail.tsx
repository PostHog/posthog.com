import React from 'react'
import { offsetPolyline, pathData } from './geometry'
import type { Point } from './geometry'

export const RAIL_THICKNESS = 6
const EDGE_WIDTH = 1
const EDGE = { stroke: 'rgb(var(--border))' }
const FACE = { stroke: 'rgb(var(--accent))' }

export default function Rail({ points }: { points: Point[] }): JSX.Element {
    const d = pathData(offsetPolyline(points, RAIL_THICKNESS / 2))
    return (
        <g>
            <path
                d={d}
                fill="none"
                style={EDGE}
                strokeWidth={RAIL_THICKNESS + EDGE_WIDTH * 2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d={d}
                fill="none"
                style={FACE}
                strokeWidth={RAIL_THICKNESS}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
    )
}

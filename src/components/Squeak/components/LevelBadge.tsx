import React, { useCallback, useRef } from 'react'
import { Link } from 'gatsby'
import getLevel from '../util/getLevel'
import Tooltip from '../../RadixUI/Tooltip'

const HOGFATHER_IMG =
    'https://res.cloudinary.com/dmukukwp6/image/upload/w_200,h_200,c_fill,q_100,f_png/hedgehog_4d76d5fc_b1a5_49b5_9c22_dd1540ab2eef_a4c517f5d1.png'

type LevelBadgeProps = {
    points?: number
    pointsOnly?: boolean
    tooltip?: boolean
}

function buildShimmerGradient(colors: string[]): string {
    const stops = colors.map((c, i) => `${c} ${30 + (i * 40) / (colors.length - 1)}%`)
    return `linear-gradient(120deg, transparent 15%, ${stops.join(', ')}, transparent 85%)`
}

export default function LevelBadge({ points, pointsOnly, tooltip = true }: LevelBadgeProps) {
    if (points == null) return null

    const level = pointsOnly ? null : getLevel(points)
    const isHogfather = level?.label === 'Hogfather'
    const hogRef = useRef<HTMLImageElement>(null)

    const handleClick = useCallback(() => {
        if (!isHogfather || !hogRef.current) return
        hogRef.current.classList.remove('animate-hogfather-jump')
        void hogRef.current.offsetWidth
        hogRef.current.classList.add('animate-hogfather-jump')
    }, [isHogfather])

    return (
        <Tooltip
            trigger={
                !level ? (
                    <span
                        className="inline-flex items-center gap-1 text-xs font-semibold py-0.5 px-1.5 rounded-sm cursor-default"
                        style={{
                            border: '1px solid rgb(var(--border))',
                            backgroundColor: 'rgb(var(--bg-accent))',
                        }}
                    >
                        <span style={{ opacity: 0.7 }}>{points}</span>
                    </span>
                ) : (
                    <span className={`relative inline-block ${isHogfather ? 'select-none' : ''}`} onClick={handleClick}>
                        {isHogfather && (
                            <span className="absolute top-0 size-8 animate-hogfather-roll z-10">
                                <img
                                    ref={hogRef}
                                    src={HOGFATHER_IMG}
                                    alt=""
                                    width={200}
                                    height={200}
                                    className="size-full"
                                />
                            </span>
                        )}
                        <span
                            className={`relative overflow-hidden inline-flex items-center gap-0.5 text-xs font-semibold py-0.5 px-1.5 rounded-sm ${
                                isHogfather ? 'cursor-pointer' : 'cursor-default'
                            }`}
                            style={{
                                border: `1.5px solid ${level.color + level.borderOpacity}`,
                                backgroundColor: level.color + level.bgOpacity,
                            }}
                        >
                            {level.shimmer && (
                                <span
                                    className="absolute inset-0 animate-shimmer"
                                    style={{
                                        backgroundSize: '200% 100%',
                                        backgroundImage: buildShimmerGradient(level.shimmer.colors),
                                        opacity: level.shimmer.opacity,
                                    }}
                                />
                            )}
                            <span className="relative inline-flex items-center gap-0.5">
                                {level.label}{' '}
                                <span style={{ color: level.color ?? undefined, opacity: 0.8 }}>· {points}</span>
                            </span>
                        </span>
                    </span>
                )
            }
            side="top"
            sideOffset={4}
            open={tooltip ? undefined : false}
            className="flex"
        >
            <Link
                to="/community/reputation"
                className="text-xs font-semibold text-red dark:text-yellow"
                state={{ newWindow: true }}
            >
                How reputation works
            </Link>
        </Tooltip>
    )
}

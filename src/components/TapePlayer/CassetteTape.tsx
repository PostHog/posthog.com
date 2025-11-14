import React from 'react'

interface CassetteLabelBackground {
    url: string
    backgroundSize?: string
    backgroundRepeat?: string
    backgroundPosition?: string
}

interface ReelProps {
    rotation: number
}

function Reel({ rotation }: ReelProps): JSX.Element {
    return (
        <div className="relative w-1/4 aspect-square">
            <div className="absolute inset-0 border-2 border-primary rounded-full bg-accent shadow-inner" />
            <div
                className="absolute inset-1 border-2 border-primary rounded-full bg-primary flex items-center justify-center"
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                {/* Spindle with 4 teeth */}
                <div className="relative w-2/3 aspect-square">
                    <div className="absolute inset-0 border-2 border-primary rounded-full bg-accent" />
                    <div className="absolute -top-0 left-1/2 -translate-x-1/2 w-1/4 h-1/4 bg-primary border-2 border-primary border-t-0 rounded-[2px]" />
                    <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-1/4 bg-primary border-2 border-primary border-b-0 rounded-[2px]" />
                    <div className="absolute -left-0 top-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-primary border-2 border-primary border-l-0 rounded-[2px]" />
                    <div className="absolute -right-0 top-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-primary border-2 border-primary border-r-0 rounded-[2px]" />
                </div>
            </div>
        </div>
    )
}

interface CassetteTapeProps {
    title?: string
    artist?: string
    rotation?: number
    labelBackground?: CassetteLabelBackground
    cassetteColor?: string
    labelColor?: string
}

export default function CassetteTape({
    title,
    artist,
    rotation = 0,
    labelBackground,
    cassetteColor,
    labelColor,
}: CassetteTapeProps): JSX.Element {
    const labelBackgroundStyle = labelBackground?.url
        ? {
              backgroundImage: `url(${labelBackground.url})`,
              backgroundSize: labelBackground.backgroundSize || 'auto',
              backgroundRepeat: labelBackground.backgroundRepeat || 'no-repeat',
              backgroundPosition: labelBackground.backgroundPosition || 'center',
          }
        : {}

    const labelStyle = {
        ...labelBackgroundStyle,
        backgroundColor: labelColor,
    }

    return (
        <div
            className="flex-1 border-2 border-primary shadow-inner aspect-[100/63] rounded bg-accent"
            style={{ backgroundColor: cassetteColor }}
        >
            <div
                className="border-2 border-primary m-[3.5%] mb-0 p-[3.5%] pb-0 h-[75%] flex flex-col justify-between rounded bg-primary"
                style={labelStyle}
            >
                {/* Tape label */}
                {title && artist && (
                    <div className="bg-accent/30 border-2 border-primary text-center flex flex-col justify-center rounded py-[3%]">
                        <div className="font-bold text-sm text-primary truncate">{title}</div>
                        <div className="text-xs text-secondary truncate">{artist}</div>
                    </div>
                )}

                {/* Tape reels */}
                <div className="flex items-center justify-around gap-4 my-auto">
                    <Reel rotation={rotation} />
                    <Reel rotation={-rotation} />
                </div>
            </div>
        </div>
    )
}

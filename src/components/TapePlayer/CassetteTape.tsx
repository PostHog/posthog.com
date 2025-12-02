import React from 'react'

interface CassetteLabelBackground {
    url: string
    backgroundSize?: string
    backgroundRepeat?: string
    backgroundPosition?: string
}

interface ReelProps {
    rotation: number
    teeth?: boolean
    spindle?: boolean
}

function Reel({ rotation, teeth = true, spindle = true }: ReelProps): JSX.Element {
    return (
        <div className="relative w-1/5 aspect-square">
            <div
                className={`absolute inset-0 border-2 border-primary rounded-full shadow-inner ${
                    spindle ? 'bg-accent' : 'bg-primary'
                }`}
            />

            {spindle && (
                <div
                    className="absolute inset-1 border-2 border-primary rounded-full bg-white dark:bg-[#9a9a9f] flex items-center justify-center"
                    style={{ transform: `rotate(${rotation}deg)` }}
                >
                    {/* Spindle with 4 teeth */}

                    <div className="relative w-2/3 aspect-square">
                        <div className="absolute inset-0 border-2 border-primary rounded-full bg-accent" />
                        {teeth && (
                            <>
                                <div className="absolute -top-0 left-1/2 -translate-x-1/2 w-1/4 h-1/4 bg-white dark:bg-[#9a9a9f] border-2 border-primary border-t-0 rounded-[2px]" />
                                <div className="absolute -bottom-0 left-1/2 -translate-x-1/2 w-1/4 h-1/4 bg-white dark:bg-[#9a9a9f] border-2 border-primary border-b-0 rounded-[2px]" />
                                <div className="absolute -left-0 top-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-white dark:bg-[#9a9a9f] border-2 border-primary border-l-0 rounded-[2px]" />
                                <div className="absolute -right-0 top-1/2 -translate-y-1/2 w-1/4 h-1/4 bg-white dark:bg-[#9a9a9f] border-2 border-primary border-r-0 rounded-[2px]" />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

interface CassetteTapeProps {
    title?: string
    rotation?: number
    labelBackground?: CassetteLabelBackground
    cassetteColor?: string
    labelColor?: string
    teeth?: boolean
    spindle?: boolean
    minimal?: boolean
}

export default function CassetteTape({
    title,
    rotation = 0,
    labelBackground,
    cassetteColor,
    labelColor,
    minimal = false,
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
            className={`flex-1 border-2 border-primary shadow-inner aspect-[100/63] bg-accent ${
                minimal ? 'rounded' : ' rounded-[0.5rem]'
            }`}
            style={{ backgroundColor: cassetteColor }}
        >
            <div
                className="border-2 border-primary m-[5%] mb-0 pb-0 h-[70%] flex flex-col justify-between rounded bg-primary"
                style={labelStyle}
            >
                {/* Tape label */}
                {title && (
                    <div className="p-[3.5%] pb-0">
                        <div className="bg-accent/90 border-2 border-primary text-center flex flex-col justify-center rounded py-[3%]">
                            {title && <div className="font-bold text-sm text-primary truncate">{title}</div>}
                        </div>
                    </div>
                )}

                {/* Tape reels */}
                <div className={`flex items-center gap-4 my-auto ${minimal ? 'justify-evenly' : 'justify-around'}`}>
                    <Reel rotation={-rotation} teeth={!minimal} spindle={!minimal} />
                    <Reel rotation={-rotation} teeth={!minimal} spindle={!minimal} />
                </div>
            </div>
        </div>
    )
}

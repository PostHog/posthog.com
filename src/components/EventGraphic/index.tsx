import React, { forwardRef } from 'react'
import dayjs from 'dayjs'
import Logo from 'components/Logo'
import { PROFILE_COLORS } from 'constants/profileColors'

export type EventGraphicSpeaker = {
    name: string
    color?: string
    avatarUrl?: string
    companyRole?: string
}

export type EventGraphicProps = {
    title: string
    date?: string
    location?: string
    online?: boolean
    speaker?: EventGraphicSpeaker
    partners?: Array<{ name: string }>
    className?: string
}

// Profile colors light enough to need dark text — the rest get white
const LIGHT_BACKGROUNDS = ['lime-green', 'teal', 'yellow', 'orange']

const DEFAULT_BACKGROUND = 'yellow'

// Fallback artwork for events without a speaker (or speakers without an avatar)
const DEFAULT_HEDGEHOG = 'https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/hogzilla_73b822a689.png'

const EventGraphic = forwardRef<HTMLDivElement, EventGraphicProps>(function EventGraphic(
    { title, date, location, online, speaker, partners, className = '' },
    ref
) {
    const color = speaker?.color && PROFILE_COLORS.includes(speaker.color) ? speaker.color : DEFAULT_BACKGROUND
    const darkText = LIGHT_BACKGROUNDS.includes(color)
    const parsedDate = date ? dayjs(date) : null
    const partnerNames = (partners || []).map((partner) => partner.name).filter(Boolean)
    const locationLine = online ? 'Online' : location

    return (
        <div className={`@container overflow-hidden ${className}`}>
            <div
                ref={ref}
                className={`relative aspect-square w-full overflow-hidden bg-${color} ${
                    darkText ? 'text-black' : 'text-white'
                }`}
            >
                <div className="absolute right-[6%] top-[31%] aspect-square w-[46%]">
                    <div className="absolute inset-0 rounded-full border-[0.75cqw] border-white bg-tan shadow-xl" />
                    {/* Clip only below the circle's midline so illustrations break out of the top instead of being cropped */}
                    <div className="absolute inset-x-0 -top-[18%] bottom-0 overflow-hidden rounded-b-full">
                        <img
                            src={speaker?.avatarUrl || DEFAULT_HEDGEHOG}
                            alt={speaker?.name || 'Max the hedgehog'}
                            crossOrigin="anonymous"
                            className="absolute bottom-0 left-1/2 w-[108%] max-w-none -translate-x-1/2"
                        />
                    </div>
                </div>
                <div className="absolute inset-0 flex flex-col p-[6%]">
                    <h3
                        className={`m-0 w-full break-words font-squeak font-bold uppercase leading-[0.95] ${
                            title.length > 40 ? 'text-[7.5cqw]' : title.length > 22 ? 'text-[9.5cqw]' : 'text-[12cqw]'
                        }`}
                    >
                        {title}
                    </h3>
                    <div className="mt-[3%] w-[46%] font-rounded text-[3.75cqw] font-bold uppercase leading-snug">
                        {parsedDate?.isValid() && <div>{parsedDate.format('dddd, MMMM D')}</div>}
                        {locationLine && <div>{locationLine}</div>}
                    </div>
                    {speaker && (
                        <div className="mb-[6%] mt-auto w-[52%]">
                            <div className="mb-[1.5%] font-rounded text-[2.75cqw] font-semibold uppercase leading-none">
                                Featuring:
                            </div>
                            <div className="break-words font-squeak text-[5.5cqw] font-bold uppercase leading-none">
                                {speaker.name}
                            </div>
                            {speaker.companyRole && (
                                <div className="mt-[1.5%] font-rounded text-[2.75cqw] font-semibold uppercase leading-none">
                                    {speaker.companyRole}
                                </div>
                            )}
                        </div>
                    )}
                    <div
                        className={`flex items-center justify-center gap-[2.5cqw] rounded-[2cqw] bg-white px-[4%] py-[2.5%] text-black ${
                            speaker ? '' : 'mt-auto'
                        }`}
                    >
                        <Logo className="h-[5cqw] w-auto shrink-0" />
                        {partnerNames.length > 0 && (
                            <>
                                <span className="font-rounded text-[3cqw] font-semibold uppercase leading-none">
                                    with
                                </span>
                                <span className="truncate font-squeak text-[4.5cqw] font-bold uppercase leading-none">
                                    {partnerNames.join(' & ')}
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
})

export default EventGraphic

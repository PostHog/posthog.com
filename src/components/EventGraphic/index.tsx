import React, { forwardRef } from 'react'
import dayjs from 'dayjs'
import { Logo } from '@posthog/brand/logo'
import {
    HedgehogBallHog,
    HedgehogBeaker,
    HedgehogCardHog,
    HedgehogChef,
    HedgehogConstruction,
    HedgehogHogpatch,
    HedgehogIpad,
    HedgehogMountie,
    HedgehogRoboHog,
    HedgehogSailorHog,
    HedgehogSpeakerHog,
} from '@posthog/brand/hoggies'
import {
    EVENT_GRAPHIC_CREAM_FROM,
    EVENT_GRAPHIC_CREAM_TO,
    EVENT_GRAPHIC_INK,
    EVENT_GRAPHIC_INK_MUTED,
    eventGraphicStyle,
    eventGraphicStyleIndex,
    type EventGraphicVariant,
} from 'constants/eventGraphicPalette'

export type EventGraphicSpeaker = {
    name: string
    /** Kept for the community profile shape — no longer drives the graphic's color. */
    color?: string
    avatarUrl?: string
    companyRole?: string
}

export type EventGraphicPartner = {
    name: string
    /** Partner logo from Strapi. Falls back to the name set in Squeak when absent. */
    logoUrl?: string
}

export type EventGraphicFormat = 'square' | 'landscape'

export type EventGraphicProps = {
    title: string
    date?: string
    /** 'HH:mm'. Falls back to the time embedded in `date` when that isn't midnight. */
    startTime?: string
    /** Venue name, rendered above the location line. */
    venue?: string
    location?: string
    online?: boolean
    speaker?: EventGraphicSpeaker
    partners?: EventGraphicPartner[]
    format?: EventGraphicFormat
    /** Resolves to a hue + light/dark variant. Defaults to a stable hash of the title. */
    styleIndex?: number
    className?: string
}

// One hog per hue, so a given color always brings the same artwork — the pairing the brand team set up
// in Figma. Ordered to match EVENT_GRAPHIC_HUES.
const HUE_HOGS = [
    HedgehogRoboHog, // blue
    HedgehogMountie, // sky
    HedgehogSailorHog, // ocean
    HedgehogChef, // coral
    HedgehogConstruction, // lime
    HedgehogCardHog, // green
    HedgehogIpad, // lilac
    HedgehogSpeakerHog, // purple
    HedgehogHogpatch, // teal
    HedgehogBallHog, // tangerine
    HedgehogBeaker, // yellow
]

/**
 * Everything except the title is the same physical size in both formats (a ~30px margin, a 126px badge,
 * a 48px logo), so the tokens below are those measurements expressed against each canvas width — 800 for
 * the square, 1200 for the landscape. They're applied as inline `cqw` styles rather than Tailwind classes
 * because the values are computed, and that also keeps them out of `safelist.txt`.
 */
const FORMATS = {
    square: {
        aspect: '100%',
        pad: 4,
        // Step down as the title gets longer, so it always fills the space without overflowing.
        titleSizes: [15, 12.5, 10.4, 8.7, 7.6],
        titleWidth: 76,
        titleGap: 2.6,
        infoWidth: 46,
        date: 4,
        time: 3.2,
        venue: 3.75,
        rule: 11,
        ruleThickness: 0.5,
        footerBottom: 6.9,
        logo: 6,
        badge: 15.75,
        badgeTop: 3.7,
        badgeRight: 4.1,
        badgeRadius: 0.75,
        badgeHeader: 5.9,
        badgeMonth: 3,
        badgeDay: 8.5,
        artWidth: 54,
        artRight: -3,
        artBottom: 11,
        barHeight: 12.5,
    },
    landscape: {
        aspect: '52.5%',
        pad: 2.33,
        // The landscape canvas is short, so long titles have to step down harder than the square's
        // to keep the date block clear of the footer.
        titleSizes: [12.5, 10.5, 8.6, 6.9, 6],
        titleWidth: 84,
        titleGap: 2,
        infoWidth: 32,
        date: 2.75,
        time: 2.2,
        venue: 2.4,
        rule: 7,
        ruleThickness: 0.33,
        footerBottom: 6,
        logo: 4,
        badge: 10.5,
        badgeTop: 2.34,
        badgeRight: 2.62,
        badgeRadius: 0.5,
        badgeHeader: 3.94,
        badgeMonth: 2,
        badgeDay: 5.67,
        artWidth: 27,
        artRight: -1,
        artBottom: 7,
        barHeight: 9,
    },
} as const

const titleSizeFor = (title: string, sizes: readonly number[]): number => {
    if (title.length <= 20) return sizes[0]
    if (title.length <= 32) return sizes[1]
    if (title.length <= 48) return sizes[2]
    if (title.length <= 64) return sizes[3]
    return sizes[4]
}

/**
 * The event's time only exists inside `date`, and only when the organizer set one — a midnight value
 * means "no time given", so nothing is shown rather than a misleading 12:00 AM. There is no end time or
 * timezone in the data, so this is a single start time in the same format `/events` already uses.
 */
const startTimeLabel = (date?: string, startTime?: string): string | null => {
    if (startTime) {
        const withTime = dayjs(`${dayjs(date).format('YYYY-MM-DD')} ${startTime}`)
        return withTime.isValid() ? withTime.format('h:mm A') : null
    }
    const parsed = date ? dayjs(date) : null
    if (!parsed?.isValid() || parsed.format('HH:mm') === '00:00') return null
    return parsed.format('h:mm A')
}

const EventGraphic = forwardRef<HTMLDivElement, EventGraphicProps>(function EventGraphic(
    {
        title,
        date,
        startTime,
        venue,
        location,
        online,
        speaker,
        partners,
        format = 'square',
        styleIndex,
        className = '',
    },
    ref
) {
    const t = FORMATS[format]
    const resolvedIndex = styleIndex ?? eventGraphicStyleIndex(title)
    const { hue, variant } = eventGraphicStyle(resolvedIndex)
    const Hog = HUE_HOGS[Math.abs(resolvedIndex) % HUE_HOGS.length]

    const light = variant === 'light'
    const onDarkIsWhite = hue.titleOnDark === '#FFFFFF'

    const background = light
        ? `linear-gradient(180deg, ${EVENT_GRAPHIC_CREAM_FROM} 0%, ${EVENT_GRAPHIC_CREAM_TO} 100%)`
        : `linear-gradient(180deg, ${hue.from} 0%, ${hue.to} 100%)`
    const titleColor = light ? hue.titleOnLight : hue.titleOnDark
    const ink = light ? EVENT_GRAPHIC_INK : hue.titleOnDark
    const inkMuted = light ? EVENT_GRAPHIC_INK_MUTED : onDarkIsWhite ? 'rgba(255,255,255,0.75)' : 'rgba(21,21,21,0.65)'
    const ruleColor = light ? 'rgba(57,65,80,0.35)' : onDarkIsWhite ? 'rgba(255,255,255,0.4)' : 'rgba(21,21,21,0.3)'

    const parsedDate = date ? dayjs(date) : null
    const hasDate = Boolean(parsedDate?.isValid())
    const timeLabel = startTimeLabel(date, startTime)
    const locationLine = online ? 'Online' : location
    const venueLine = online ? undefined : venue
    const partnerList = (partners || []).filter((partner) => partner.name)

    // The speaker portrait bleeds to the bottom edge, so it needs a solid bar to sit against. Hog
    // artwork stops short of the footer, letting the logos sit straight on the background.
    const hasBar = Boolean(speaker?.avatarUrl)
    const barColor = light ? hue.from : '#FFFFFF'
    const barInk = light ? hue.titleOnDark : EVENT_GRAPHIC_INK

    const footerInk = hasBar ? barInk : light ? EVENT_GRAPHIC_INK : hue.titleOnDark
    // The 4-color mark reads best on the white bar; everywhere else the mono mark keeps contrast.
    const logoVariant = hasBar && !light ? 'gradient' : 'mono'

    return (
        <div className={`@container overflow-hidden ${className}`}>
            <div ref={ref} className="relative w-full overflow-hidden" style={{ paddingBottom: t.aspect, background }}>
                {/* Artwork sits behind the copy so long titles can run over it, as the designs do. */}
                <div
                    className="absolute"
                    style={{
                        width: `${t.artWidth}cqw`,
                        right: `${t.artRight}cqw`,
                        bottom: `${hasBar ? 0 : t.artBottom}cqw`,
                    }}
                >
                    {speaker?.avatarUrl ? (
                        <img
                            src={speaker.avatarUrl}
                            alt={speaker.name}
                            crossOrigin="anonymous"
                            className="block w-full"
                        />
                    ) : (
                        <Hog className="block h-auto w-full" />
                    )}
                </div>

                {/* Calendar badge */}
                {hasDate && (
                    <div
                        className="absolute overflow-hidden bg-white"
                        style={{
                            width: `${t.badge}cqw`,
                            height: `${t.badge}cqw`,
                            top: `${t.badgeTop}cqw`,
                            right: `${t.badgeRight}cqw`,
                            borderRadius: `${t.badgeRadius}cqw`,
                            boxShadow: `0 ${t.badgeRadius}cqw ${t.badgeRadius * 1.5}cqw rgba(0,0,0,0.16)`,
                        }}
                    >
                        <div
                            className="flex items-center justify-center font-rounded font-extrabold uppercase text-white"
                            style={{
                                height: `${t.badgeHeader}cqw`,
                                background: hue.badge,
                                fontSize: `${t.badgeMonth}cqw`,
                                letterSpacing: '0.02em',
                            }}
                        >
                            {parsedDate?.format('MMM')}
                        </div>
                        <div
                            className="flex items-center justify-center font-rounded font-extrabold"
                            style={{
                                height: `${t.badge - t.badgeHeader}cqw`,
                                fontSize: `${t.badgeDay}cqw`,
                                color: EVENT_GRAPHIC_INK,
                            }}
                        >
                            {parsedDate?.format('D')}
                        </div>
                    </div>
                )}

                {/* Copy */}
                <div className="absolute inset-0" style={{ padding: `${t.pad}cqw` }}>
                    <h3
                        className="m-0 break-words font-squeak font-bold uppercase"
                        style={{
                            width: `${t.titleWidth}cqw`,
                            fontSize: `${titleSizeFor(title, t.titleSizes)}cqw`,
                            lineHeight: 1.01,
                            color: titleColor,
                            // Soft same-hue bloom behind the type, as the designs have it
                            textShadow: `0 0 ${t.pad * 0.28}cqw ${light ? `${hue.titleOnLight}47` : `${hue.to}66`}`,
                        }}
                    >
                        {title}
                    </h3>

                    <div
                        className={
                            format === 'landscape'
                                ? 'flex items-start font-rounded font-extrabold'
                                : 'font-rounded font-extrabold'
                        }
                        style={{
                            marginTop: `${t.titleGap}cqw`,
                            gap: format === 'landscape' ? `${t.pad}cqw` : undefined,
                        }}
                    >
                        {/* Landscape sizes this column to its content — a fixed width wrapped long dates
                            like "Wednesday, September 23" onto a second line and into the footer. */}
                        <div
                            style={{
                                minWidth: format === 'landscape' ? `${t.infoWidth}cqw` : undefined,
                                flexShrink: format === 'landscape' ? 0 : undefined,
                            }}
                        >
                            {hasDate && (
                                <div
                                    className={format === 'landscape' ? 'whitespace-nowrap' : undefined}
                                    style={{ fontSize: `${t.date}cqw`, color: ink, lineHeight: 1.2 }}
                                >
                                    {parsedDate?.format('dddd, MMMM D')}
                                </div>
                            )}
                            {timeLabel && (
                                <div
                                    style={{
                                        fontSize: `${t.time}cqw`,
                                        color: inkMuted,
                                        lineHeight: 1.3,
                                        marginTop: `${t.pad * 0.3}cqw`,
                                    }}
                                >
                                    {timeLabel}
                                </div>
                            )}
                        </div>

                        {/* Square stacks the venue under a horizontal rule; landscape puts it in a second
                            column behind a vertical one. */}
                        {format === 'square' ? (
                            <>
                                {(venueLine || locationLine) && (
                                    <div
                                        style={{
                                            width: `${t.rule}cqw`,
                                            height: `${t.ruleThickness}cqw`,
                                            background: ruleColor,
                                            margin: `${t.pad * 0.7}cqw 0`,
                                        }}
                                    />
                                )}
                                <div style={{ width: `${t.infoWidth}cqw` }}>
                                    {venueLine && (
                                        <div style={{ fontSize: `${t.venue}cqw`, color: ink, lineHeight: 1.45 }}>
                                            {venueLine},
                                        </div>
                                    )}
                                    {locationLine && (
                                        <div style={{ fontSize: `${t.venue}cqw`, color: ink, lineHeight: 1.45 }}>
                                            {locationLine}
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            (venueLine || locationLine) && (
                                <>
                                    <div
                                        style={{
                                            width: `${t.ruleThickness}cqw`,
                                            alignSelf: 'stretch',
                                            background: ruleColor,
                                        }}
                                    />
                                    <div>
                                        {venueLine && (
                                            <div style={{ fontSize: `${t.venue}cqw`, color: ink, lineHeight: 1.4 }}>
                                                {venueLine},
                                            </div>
                                        )}
                                        {locationLine && (
                                            <div style={{ fontSize: `${t.venue}cqw`, color: ink, lineHeight: 1.4 }}>
                                                {locationLine}
                                            </div>
                                        )}
                                    </div>
                                </>
                            )
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div
                    className={`absolute bottom-0 flex items-center ${hasBar ? 'justify-center' : ''}`}
                    style={{
                        left: 0,
                        right: 0,
                        height: hasBar ? `${t.barHeight}cqw` : undefined,
                        background: hasBar ? barColor : undefined,
                        padding: hasBar ? `0 ${t.pad}cqw` : `0 ${t.pad}cqw ${t.footerBottom}cqw`,
                        color: footerInk,
                        gap: `${t.pad * 0.6}cqw`,
                    }}
                >
                    <Logo
                        variant={logoVariant}
                        className="w-auto shrink-0"
                        style={{ height: `${t.logo}cqw` }}
                        width="auto"
                    />
                    {partnerList.map((partner) => (
                        <React.Fragment key={partner.name}>
                            <span
                                className="font-rounded font-medium"
                                style={{ fontSize: `${t.logo * 0.7}cqw`, opacity: 0.4 }}
                            >
                                /
                            </span>
                            {partner.logoUrl ? (
                                <img
                                    src={partner.logoUrl}
                                    alt={partner.name}
                                    crossOrigin="anonymous"
                                    className="w-auto shrink-0 object-contain"
                                    style={{ height: `${t.logo}cqw` }}
                                />
                            ) : (
                                <span
                                    className="whitespace-nowrap font-squeak font-bold uppercase"
                                    style={{ fontSize: `${t.logo * 0.78}cqw`, lineHeight: 1 }}
                                >
                                    {partner.name}
                                </span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    )
})

export default EventGraphic

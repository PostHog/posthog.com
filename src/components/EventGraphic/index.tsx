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
    eventGraphicHogIndex,
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
    /**
     * Organizer nudge on the title size, on top of the per-format auto-fit and its base scale. 1 = the
     * format's default; the landscape stepper in the form steps it up and down. Always width-clamped, so
     * no value can push a word off the edge or break it mid-word.
     */
    titleScale?: number
    className?: string
}

/**
 * The fallback hogs used when an event has no speaker photo, picked independently of the hue — hog/color
 * pairings are no longer part of the brand system. Edit this list to change which hogs are in rotation;
 * the names come from `@posthog/brand`, which is generated from the Hoggies brand file.
 */
const FALLBACK_HOGS = [
    HedgehogRoboHog,
    HedgehogMountie,
    HedgehogSailorHog,
    HedgehogChef,
    HedgehogConstruction,
    HedgehogCardHog,
    HedgehogIpad,
    HedgehogSpeakerHog,
    HedgehogHogpatch,
    HedgehogBallHog,
    HedgehogBeaker,
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
        // Narrower than the title so it stays clear of the artwork — display type can run over a hog and
        // still read, but a smaller subtitle crossing it just looks like a mistake.
        subtitleScale: 0.36,
        subtitleWidth: 58,
        // The square has the height to carry a subtitle without shrinking the title.
        subtitleStepDown: 0,
        titleWidth: 76,
        // A speaker portrait is much wider than the hog art, so the title column narrows to clear the
        // face — and the title steps down with it, or long words break mid-word in the narrower column.
        titleWidthSpeaker: 49,
        speakerStepDown: 1,
        titleGap: 2.6,
        // Abbreviated, as the reference speaker frames are ("Saturday, Jan 31"). The shorter line keeps
        // the date clear of the portrait, which is what lets the portrait sit as large as it does.
        dateFormat: 'dddd, MMM D',
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
        // The portrait is drawn much larger than the hog art so the face reads at a distance.
        //
        // It sits flush to the right edge with NO bleed, unlike the reference frames. Those were drawn
        // around one illustration whose subject is head-left with the shoulder trailing off-canvas, so a
        // bleed there clips only jacket. Measuring the 101 speaker avatars actually in Strapi, the head
        // reaches 0.82–0.99 of the source frame — several touch the right edge outright — so the same
        // bleed cuts faces in half. Flush right puts the head at x 0.50–0.96 of the canvas, which is
        // within a couple of percent of where the reference frame puts it, and no face is ever clipped.
        speakerWidth: 80,
        speakerRight: 0,
        barHeight: 13.95,
        // The square already fills its height, so its auto-fit size is the baseline (1).
        titleBaseScale: 1,
        // High enough that the square title (which is well within its tall canvas) never hits it — the
        // height clamp only exists to protect the short landscape canvas.
        titleHeightBudget: 60,
    },
    landscape: {
        aspect: '52.5%',
        pad: 2.33,
        // The landscape canvas is short, so long titles have to step down harder than the square's
        // to keep the date block clear of the footer.
        titleSizes: [12.5, 10.5, 8.6, 6.9, 6],
        subtitleScale: 0.36,
        subtitleWidth: 62,
        // Only 630px tall, so a subtitle has to buy its space back out of the title.
        subtitleStepDown: 2,
        titleWidth: 84,
        titleWidthSpeaker: 58,
        speakerStepDown: 2,
        titleGap: 2,
        // The OpenGraph canvas abbreviates the month — "Wednesday, Sep 23" rather than
        // "Wednesday, September 23". The full string was the widest thing in this layout and the reason
        // the date column had to be so wide; shortening it buys the space back for the artwork.
        dateFormat: 'dddd, MMM D',
        infoWidth: 26,
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
        // Grown to use the space the abbreviated date frees up.
        artWidth: 34,
        artRight: -2,
        artBottom: 5.5,
        // No landscape speaker frame exists in the references, so these hold the square's proportions
        // against the short edge. Flush right for the same reason as the square — see above.
        speakerWidth: 46,
        speakerRight: 0,
        barHeight: 7.3,
        // The landscape canvas is short and wide, so the title tiers step down hard to protect the
        // footer — which left the type floating in empty space (the brand team's feedback). The auto-fit
        // size is scaled up by default so a graphic looks right with no manual input, which matters
        // because most of these are generated for events that never uploaded a photo, with nobody at the
        // size control. The width clamp still applies afterwards, so this can't push a word off the edge.
        titleBaseScale: 1.3,
        // The title must clear the info block and the footer on the 52.5cqw-tall canvas. This caps its
        // height so a multi-line title (or a large manual size) stops growing instead of colliding — the
        // key guard for auto-generated graphics, where nobody is watching to fix an overlap.
        titleHeightBudget: 30,
    },
} as const

/**
 * Long event names are usually already two parts — "AI Demo Night: Building for Model Volatility" — so
 * the leading clause becomes the display title and the remainder a subtitle. That keeps the title short
 * and large, which is what the reference frames all do, without needing a separate field on the event.
 *
 * Only long names split: a short name already sets at the largest size, and breaking it would shrink it.
 */
const splitTitle = (title: string): { title: string; subtitle?: string } => {
    if (title.length <= 28) return { title }
    const at = title.indexOf(': ')
    if (at < 4 || at > 40) return { title }
    return { title: title.slice(0, at), subtitle: title.slice(at + 2) }
}

/**
 * Advance width of each Squeak uppercase glyph, in ems, measured from the rendered font.
 *
 * A character count is not good enough here: Squeak's 'W' is 0.87em and its 'I' is 0.44em, so "WORKFLOWS"
 * is nearly twice the width of "VOLATILITY" at the same length. Summing real advances is what keeps a
 * long word inside its column — otherwise `break-words` splits it mid-word and it reads as a typo
 * ("WORKFLOW / S"). Kerning makes the sum run ~2% wide, which errs towards a smaller, safer size.
 */
const SQUEAK_ADVANCE: Record<string, number> = {
    A: 0.5609,
    B: 0.5821,
    C: 0.6233,
    D: 0.5804,
    E: 0.5378,
    F: 0.5068,
    G: 0.6327,
    H: 0.579,
    I: 0.4408,
    J: 0.5335,
    K: 0.6124,
    L: 0.4292,
    M: 0.8488,
    N: 0.6479,
    O: 0.6504,
    P: 0.5549,
    Q: 0.6553,
    R: 0.5865,
    S: 0.5788,
    T: 0.439,
    U: 0.5778,
    V: 0.657,
    W: 0.866,
    X: 0.6473,
    Y: 0.6177,
    Z: 0.576,
    '0': 0.5826,
    '1': 0.4144,
    '2': 0.542,
    '3': 0.5719,
    '4': 0.5738,
    '5': 0.5499,
    '6': 0.554,
    '7': 0.5275,
    '8': 0.5577,
    '9': 0.5659,
    ' ': 0.2275,
    '&': 0.7285,
    "'": 0.2019,
    '"': 0.4025,
    '!': 0.2256,
    '?': 0.4966,
    '.': 0.1989,
    ',': 0.1979,
    ':': 0.2329,
    ';': 0.2339,
    '-': 0.5427,
    '–': 0.4768,
    '—': 0.7061,
    '/': 0.3794,
    '(': 0.3418,
    ')': 0.3408,
    '+': 0.5405,
    '@': 0.9575,
    '#': 0.6968,
    '%': 0.7549,
}
const SQUEAK_FALLBACK_ADVANCE = 0.6

const squeakWidth = (word: string): number =>
    word
        .toUpperCase()
        .split('')
        .reduce((sum, char) => sum + (SQUEAK_ADVANCE[char] ?? SQUEAK_FALLBACK_ADVANCE), 0)

/** Largest font size, in cqw, at which every word in `text` still fits inside a `columnWidth` column. */
const fitToLongestWord = (text: string, columnWidth: number): number => {
    const widest = text.split(/\s+/).reduce((max, word) => Math.max(max, squeakWidth(word)), 0)
    return widest > 0 ? columnWidth / widest : Infinity
}

/**
 * How many lines `text` greedily wraps onto in a `columnWidth`-wide column at `size` cqw — the same
 * greedy fill the browser does with `break-words`. Used to hold the title inside a vertical budget so a
 * long title can't grow down into the info block and footer (see `titleSizeFor`).
 */
const wrapLineCount = (text: string, columnWidth: number, size: number): number => {
    const space = SQUEAK_ADVANCE[' '] * size
    let lines = 1
    let width = 0
    for (const word of text.split(/\s+/).filter(Boolean)) {
        const wordWidth = squeakWidth(word) * size
        if (width === 0) {
            width = wordWidth
        } else if (width + space + wordWidth <= columnWidth) {
            width += space + wordWidth
        } else {
            lines += 1
            width = wordWidth
        }
    }
    return lines
}

const titleSizeFor = (
    title: string,
    sizes: readonly number[],
    columnWidth: number,
    stepDown = 0,
    scale = 1,
    heightBudget = Infinity
): number => {
    const tier = title.length <= 20 ? 0 : title.length <= 32 ? 1 : title.length <= 48 ? 2 : title.length <= 64 ? 3 : 4
    // The auto-fit tier is the default; `scale` lets the organizer nudge it. Two clamps then keep the
    // result inside the canvas no matter the scale: the width fit stops a word running off the edge or
    // breaking mid-word, and the height fit stops a multi-line title growing down into the info block and
    // footer. The height clamp counts lines at the *desired* size, which can only over- (never under-)
    // estimate them as the size shrinks, so the result is always conservative — it never collides.
    const autoSize = sizes[Math.min(tier + stepDown, sizes.length - 1)]
    const desired = Math.min(autoSize * scale, fitToLongestWord(title, columnWidth))
    const lines = wrapLineCount(title, columnWidth, desired)
    // Line pitch is 0.9em (the title's line-height), and the last line adds its own cap height on top.
    const maxByHeight = heightBudget / (0.9 * lines + 0.1)
    return Math.min(desired, maxByHeight)
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
        titleScale = 1,
        className = '',
    },
    ref
) {
    const t = FORMATS[format]
    const resolvedIndex = styleIndex ?? eventGraphicStyleIndex(title)
    const { hue, variant } = eventGraphicStyle(resolvedIndex)
    const Hog = FALLBACK_HOGS[eventGraphicHogIndex(title, FALLBACK_HOGS.length)]
    const { title: displayTitle, subtitle } = splitTitle(title)

    const light = variant === 'light'
    const onDarkIsWhite = hue.titleOnDark === '#FFFFFF'

    const background = light
        ? `linear-gradient(180deg, ${EVENT_GRAPHIC_CREAM_FROM} 0%, ${EVENT_GRAPHIC_CREAM_TO} 100%)`
        : `linear-gradient(180deg, ${hue.from} 0%, ${hue.to} 100%)`
    const titleColor = light ? hue.titleOnLight : hue.titleOnDark
    const titleWidth = speaker?.avatarUrl ? t.titleWidthSpeaker : t.titleWidth
    const titleSize = titleSizeFor(
        displayTitle,
        t.titleSizes,
        titleWidth,
        (subtitle ? t.subtitleStepDown : 0) + (speaker?.avatarUrl ? t.speakerStepDown : 0),
        t.titleBaseScale * titleScale,
        // A subtitle sits under the title and eats into the same vertical space, so hand the title a
        // smaller height budget when one is present.
        subtitle ? t.titleHeightBudget * 0.66 : t.titleHeightBudget
    )
    const subtitleWidth = Math.min(t.subtitleWidth, titleWidth)
    const subtitleSize = subtitle ? Math.min(titleSize * t.subtitleScale, fitToLongestWord(subtitle, subtitleWidth)) : 0
    const titleGlow = `0 0 ${t.pad * 0.28}cqw ${light ? `${hue.titleOnLight}47` : `${hue.to}66`}`
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
    // Per the brand team the mark is mono everywhere except on white or cream, where it goes full color.
    // That's cream with no bar, or the white bar drawn over an accent background.
    const logoOnPaper = light !== hasBar
    const logoVariant = logoOnPaper ? 'gradient' : 'mono'

    return (
        <div className={`@container overflow-hidden ${className}`}>
            <div ref={ref} className="relative w-full overflow-hidden" style={{ paddingBottom: t.aspect, background }}>
                {/* Artwork sits behind the copy so long titles can run over it, as the designs do. */}
                <div
                    className="absolute"
                    style={{
                        width: `${speaker?.avatarUrl ? t.speakerWidth : t.artWidth}cqw`,
                        right: `${speaker?.avatarUrl ? t.speakerRight : t.artRight}cqw`,
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
                            width: `${titleWidth}cqw`,
                            fontSize: `${titleSize}cqw`,
                            lineHeight: 0.9,
                            color: titleColor,
                            // Soft same-hue bloom behind the type, as the designs have it
                            textShadow: titleGlow,
                        }}
                    >
                        {displayTitle}
                    </h3>
                    {subtitle && (
                        <div
                            className="break-words font-squeak font-bold uppercase"
                            style={{
                                width: `${subtitleWidth}cqw`,
                                fontSize: `${subtitleSize}cqw`,
                                lineHeight: 1,
                                marginTop: `${t.pad * 0.32}cqw`,
                                color: titleColor,
                                textShadow: titleGlow,
                            }}
                        >
                            {subtitle}
                        </div>
                    )}

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
                            like "Wednesday, Sep 23" onto a second line and into the footer. */}
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
                                    {parsedDate?.format(t.dateFormat)}
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

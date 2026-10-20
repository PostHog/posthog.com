import { EVENT_ORDER } from './eventKinds'
import { SPOTLIGHT_SOURCES } from './sources'

export interface Point {
    x: number
    y: number
}

export interface Track {
    points: Point[]
    carries: boolean[]
}

export interface Box {
    left: number
    top: number
    width: number
    height: number
}

export interface Section {
    label: Box
    rows: Box[]
    footer: Box
}

export interface RunLayout {
    width: number
    height: number
    compactRows: boolean
    store: Pick<Box, 'left' | 'width'>
    events: Section
    sources: Section
    tracks: Track[]
    profile: Box
    intake: Box
}

export const RAIL_THICKNESS = 8
export const PIECE_SIZE = 20

const WIDE_MIN_WIDTH = 640
const STORE_SHARE = 0.42
const STORE_MIN = 320
const STORE_MAX = 470
const COLUMN_GUTTER = 20
const COMPACT_SIDE_WIDTH = 190
const SECTION_LABEL_HEIGHT = 24
const ROW_GAP = 2
const ROW_INSET = 6
const FOOTER_HEIGHT = 18
const NARROW_ROW_HEIGHT = 34
const NARROW_SECTION_GAP = 20
const NARROW_COLUMN_GUTTER = 16
const NARROW_DROP_GAP = 36
const HOPPER_DROP = 34
const HOPPER_HALF_SHARE = 0.11
const PROFILE_WIDTH = 380
const PROFILE_HEIGHT = 312
const PROFILE_GAP = 70
const INTAKE_DEPTH = 18
const BACKSTOP_HEIGHT = 22
const ICON_CENTER_INSET = 20
const RAIL_OVERHANG = 36
const ROW_COUNT = Math.max(EVENT_ORDER.length, SPOTLIGHT_SOURCES.length)

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value))

const stackedSection = (left: number, top: number, width: number, height: number): Section => {
    const rowsTop = top + SECTION_LABEL_HEIGHT + ROW_INSET
    const rowsHeight = height - SECTION_LABEL_HEIGHT - FOOTER_HEIGHT - ROW_INSET * 2
    const rowHeight = (rowsHeight - ROW_GAP * (ROW_COUNT - 1)) / ROW_COUNT
    return {
        label: { left, top, width, height: SECTION_LABEL_HEIGHT },
        rows: Array.from({ length: ROW_COUNT }, (_, row) => ({
            left: left + ROW_INSET,
            top: rowsTop + row * (rowHeight + ROW_GAP),
            width: width - ROW_INSET * 2,
            height: rowHeight,
        })),
        footer: { left, top: rowsTop + rowsHeight + ROW_INSET, width, height: FOOTER_HEIGHT },
    }
}

const railsUnder = (events: Section, sources: Section, railY: number, lipHalf: number, width: number): Track[] => {
    const eventIconX = events.rows[0].left + events.rows[0].width - ICON_CENTER_INSET
    const sourceIconX = sources.rows[0].left + ICON_CENTER_INSET
    const rail = (startX: number, endX: number): Track => ({
        points: [
            { x: startX, y: railY - BACKSTOP_HEIGHT },
            { x: startX, y: railY },
            { x: endX, y: railY },
        ],
        carries: [false, true],
    })
    return [
        rail(eventIconX - RAIL_OVERHANG, width / 2 - lipHalf),
        rail(sourceIconX + RAIL_OVERHANG, width / 2 + lipHalf),
    ]
}

const wideTop = (width: number, storeHeight: number) => {
    const storeWidth = clamp(width * STORE_SHARE, STORE_MIN, STORE_MAX)
    const sideWidth = (width - storeWidth - COLUMN_GUTTER * 2) / 2
    const events = stackedSection(0, 0, sideWidth, storeHeight)
    const sources = stackedSection(width - sideWidth, 0, sideWidth, storeHeight)
    const railY = storeHeight + HOPPER_DROP
    return {
        compactRows: sideWidth < COMPACT_SIDE_WIDTH,
        store: { left: sideWidth + COLUMN_GUTTER, width: storeWidth },
        events,
        sources,
        dropY: railY,
        tracks: railsUnder(events, sources, railY, width * HOPPER_HALF_SHARE, width),
    }
}

const narrowTop = (width: number, storeHeight: number) => {
    const columnsTop = storeHeight + NARROW_SECTION_GAP
    const columnWidth = (width - NARROW_COLUMN_GUTTER) / 2
    const columnHeight =
        SECTION_LABEL_HEIGHT + ROW_INSET * 2 + NARROW_ROW_HEIGHT * ROW_COUNT + ROW_GAP * (ROW_COUNT - 1) + FOOTER_HEIGHT
    return {
        compactRows: true,
        store: { left: 0, width },
        events: stackedSection(0, columnsTop, columnWidth, columnHeight),
        sources: stackedSection(width - columnWidth, columnsTop, columnWidth, columnHeight),
        dropY: columnsTop + columnHeight - NARROW_DROP_GAP,
        tracks: [],
    }
}

const profileBelow = (width: number, dropY: number) => {
    const profileWidth = Math.min(PROFILE_WIDTH, width - 24)
    const profile = {
        left: (width - profileWidth) / 2,
        top: dropY + PROFILE_GAP,
        width: profileWidth,
        height: PROFILE_HEIGHT,
    }
    return {
        profile,
        intake: { left: profile.left, top: profile.top - 4, width: profile.width, height: INTAKE_DEPTH },
        height: profile.top + PROFILE_HEIGHT + 12,
    }
}

export function runLayout(width: number, storeHeight: number): RunLayout {
    const { dropY, ...top } = width >= WIDE_MIN_WIDTH ? wideTop(width, storeHeight) : narrowTop(width, storeHeight)
    return { width, ...top, ...profileBelow(width, dropY) }
}

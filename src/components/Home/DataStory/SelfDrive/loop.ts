import { IngestionCrest, McpAnalyticsCrest, ProductAnalyticsCrest, SelfDrivingCrest } from '@posthog/brand/crests'

export interface Stage {
    name: string
    metric: string
    values: string[]
    Crest: typeof IngestionCrest
}

export const LAPS = 8
export const START_ANGLE = -30
export const STAGE_SPACING = 90

export const STAGES: Stage[] = [
    {
        name: 'Get the data in',
        metric: 'Events tracked',
        values: ['48', '55', '63', '72', '82', '93', '105', '118', '132'],
        Crest: IngestionCrest,
    },
    {
        name: 'Query it',
        metric: 'Questions answered',
        values: ['120', '190', '280', '390', '520', '680', '870', '1,090', '1,340'],
        Crest: ProductAnalyticsCrest,
    },
    {
        name: 'Act on it',
        metric: 'Reports worth acting on',
        values: ['64%', '71%', '77%', '82%', '86%', '89%', '92%', '94%', '95%'],
        Crest: McpAnalyticsCrest,
    },
    {
        name: 'Self-drive',
        metric: 'Fixes merged',
        values: ['0', '2', '5', '9', '15', '23', '33', '46', '62'],
        Crest: SelfDrivingCrest,
    },
]

export const TIME_TO_FIX = ['9 days', '5 days', '3 days', '2 days', '26 h', '16 h', '10 h', '6 h', '4 h']

const INITIAL_DEGREES_PER_SECOND = 360 / 6.5
const TOP_DEGREES_PER_SECOND = 360 / 1.6
const SPIN_UP_SECONDS = 12

export const angleAt = (seconds: number): number =>
    START_ANGLE +
    TOP_DEGREES_PER_SECOND * seconds -
    (TOP_DEGREES_PER_SECOND - INITIAL_DEGREES_PER_SECOND) * SPIN_UP_SECONDS * (1 - Math.exp(-seconds / SPIN_UP_SECONDS))

export const nodesPassed = (angle: number): number => (angle < 0 ? 0 : Math.floor(angle / STAGE_SPACING) + 1)

export const passesOf = (stage: number, passed: number): number =>
    passed > stage ? Math.floor((passed - 1 - stage) / STAGES.length) + 1 : 0

export const lapsDone = (passed: number): number => Math.max(0, passesOf(0, passed) - 1)

export const valueAt = (values: string[], index: number): string => values[Math.min(index, values.length - 1)]

export const FINAL_ANGLE = LAPS * 360

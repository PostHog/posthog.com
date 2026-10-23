import { IconCheckCircle, IconInfo, IconSparkles, IconWarning } from '@posthog/icons'
import type { Tone } from './styles'

export const toneIcons: Record<Tone, typeof IconInfo> = {
    neutral: IconInfo,
    info: IconInfo,
    success: IconCheckCircle,
    warning: IconWarning,
    error: IconWarning,
    brand: IconSparkles,
}

export const isTone = (value: unknown): value is Tone =>
    typeof value === 'string' && Object.prototype.hasOwnProperty.call(toneIcons, value)

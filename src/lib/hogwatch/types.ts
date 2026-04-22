export type CPMTier = 'yes' | 'yes-but' | 'maybe' | 'no'

export type RedFlag = 'dead_audience' | 'long_gap' | 'spiky_views' | 'comment_anomaly'

export interface ChannelResult {
    channelId: string
    title: string
    thumbnailUrl: string
    subscriberCount: number
    videoCount: number
    medianViews: number
    medianLikes: number
    medianComments: number
    engagementRatePct: number
    viewTrend: 'up' | 'down' | 'flat'
    uploadsPerMonth: number
    avgGapDays: number
    subToViewPct: number
    viewCV: number
    commentToLikeRatio: number
    maxGapDays: number
    redFlags: RedFlag[]
    rateUsed: number
    cpm: number
    cpv: number
    tier: CPMTier
    error?: string
}

export interface EvaluateRequest {
    channels: string[]
    defaultRate: number
    rateOverrides?: Record<string, number>
}

export interface EvaluateResponse {
    results: ChannelResult[]
}

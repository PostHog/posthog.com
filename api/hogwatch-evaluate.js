/**
 * HogWatch 3000 – evaluate YouTube channels (CPM, stats, red flags).
 * POST body: { channels: string[], defaultRate: number, rateOverrides?: Record<string, number> }
 * Requires YOUTUBE_API_KEY_HW3000 in env.
 */
const YT_BASE = 'https://www.googleapis.com/youtube/v3'
const VIDEOS_TO_FETCH = 20

function getApiKey() {
    const key = process.env.YOUTUBE_API_KEY_HW3000
    if (!key) throw new Error('YOUTUBE_API_KEY_HW3000 is not set')
    return key
}

async function ytFetch(path, params = {}) {
    const key = getApiKey()
    const clean = { key }
    for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== '') clean[k] = String(v)
    }
    const search = new URLSearchParams(clean)
    const url = `${YT_BASE}${path}?${search}`
    const res = await fetch(url)
    if (!res.ok) {
        const err = await res.text()
        throw new Error(`YouTube API: ${res.status} ${err}`)
    }
    return res.json()
}

function parseChannelInput(input) {
    const trimmed = input.trim()
    if (!trimmed) return ''
    const channelMatch = trimmed.match(/youtube\.com\/channel\/([a-zA-Z0-9_-]+)/)
    if (channelMatch) return channelMatch[1]
    const handleMatch = trimmed.match(/youtube\.com\/(@[a-zA-Z0-9_-]+)/)
    if (handleMatch) return handleMatch[1]
    const userMatch = trimmed.match(/youtube\.com\/user\/([a-zA-Z0-9_-]+)/)
    if (userMatch) return userMatch[1]
    if (trimmed.startsWith('@')) return trimmed
    if (/^[a-zA-Z0-9_-]+$/.test(trimmed)) return trimmed
    return trimmed
}

async function resolveChannelId(identifier) {
    if (/^UC[\w-]{22}$/.test(identifier)) {
        const data = await ytFetch('/channels', { part: 'snippet,statistics', id: identifier })
        const item = data.items?.[0]
        if (!item) return null
        return {
            channelId: item.id,
            title: item.snippet.title,
            thumbnailUrl: item.snippet.thumbnails?.default?.url ?? '',
            subscriberCount: parseInt(item.statistics.subscriberCount, 10) || 0,
            videoCount: parseInt(item.statistics.videoCount, 10) || 0,
        }
    }
    const handle = identifier.startsWith('@') ? identifier.slice(1) : identifier
    const listData = await ytFetch('/channels', { part: 'snippet,statistics', forHandle: handle })
    const item = listData.items?.[0]
    if (!item) return null
    return {
        channelId: item.id,
        title: item.snippet.title,
        thumbnailUrl: item.snippet.thumbnails?.default?.url ?? '',
        subscriberCount: parseInt(item.statistics.subscriberCount, 10) || 0,
        videoCount: parseInt(item.statistics.videoCount, 10) || 0,
    }
}

async function getRecentVideoStats(channelId) {
    const videos = []
    let pageToken
    do {
        const searchData = await ytFetch('/search', {
            part: 'snippet',
            channelId,
            type: 'video',
            order: 'date',
            maxResults: Math.min(50, VIDEOS_TO_FETCH - videos.length),
            pageToken: pageToken ?? undefined,
        })
        const ids = (searchData.items ?? []).map((i) => i.id?.videoId).filter(Boolean)
        if (ids.length === 0) break
        const listData = await ytFetch('/videos', { part: 'snippet,statistics', id: ids.join(',') })
        for (const item of listData.items ?? []) {
            videos.push({
                viewCount: parseInt(item.statistics.viewCount, 10) || 0,
                likeCount: parseInt(item.statistics.likeCount, 10) || 0,
                commentCount: parseInt(item.statistics.commentCount, 10) || 0,
                publishedAt: item.snippet?.publishedAt,
            })
        }
        pageToken = searchData.nextPageToken
    } while (videos.length < VIDEOS_TO_FETCH && pageToken)

    const sliced = videos.slice(0, VIDEOS_TO_FETCH)
    sliced.sort((a, b) => {
        const tA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
        const tB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
        return tB - tA
    })
    return sliced
}

function median(arr) {
    if (arr.length === 0) return 0
    const sorted = [...arr].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

function stdDev(arr) {
    if (arr.length < 2) return 0
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length
    const variance = arr.reduce((sum, x) => sum + (x - mean) ** 2, 0) / arr.length
    return Math.sqrt(variance)
}

function computeStats(videoStats) {
    if (videoStats.length === 0) {
        return {
            medianViews: 0,
            medianLikes: 0,
            medianComments: 0,
            engagementRatePct: 0,
            viewTrend: 'flat',
            uploadsPerMonth: 0,
            avgGapDays: 0,
            viewCV: 0,
            commentToLikeRatio: 0,
            maxGapDays: 0,
        }
    }
    const views = videoStats.map((v) => v.viewCount)
    const likes = videoStats.map((v) => v.likeCount)
    const comments = videoStats.map((v) => v.commentCount)
    const medianViews = median(views)
    const medianLikes = median(likes)
    const medianComments = median(comments)
    const engagementRatePct = medianViews > 0 ? ((medianLikes + medianComments) / medianViews) * 100 : 0
    const meanViews = views.reduce((a, b) => a + b, 0) / views.length
    const viewStdDev = stdDev(views)
    const viewCV = meanViews > 0 ? (viewStdDev / meanViews) * 100 : 0
    const commentToLikeRatio = medianLikes > 0 ? medianComments / medianLikes : 0
    const half = Math.floor(views.length / 2)
    const recentAvg = half > 0 ? views.slice(0, half).reduce((a, b) => a + b, 0) / half : 0
    const olderAvg = views.length - half > 0 ? views.slice(half).reduce((a, b) => a + b, 0) / (views.length - half) : 0
    const trendDiff = recentAvg - olderAvg
    const viewTrend = trendDiff > olderAvg * 0.1 ? 'up' : trendDiff < -olderAvg * 0.1 ? 'down' : 'flat'
    const dates = videoStats
        .map((v) => (v.publishedAt ? new Date(v.publishedAt).getTime() : NaN))
        .filter((t) => !Number.isNaN(t))
        .sort((a, b) => a - b)
    let uploadsPerMonth = videoStats.length / 6
    let avgGapDays = 0
    let maxGapDays = 0
    if (dates.length >= 2) {
        const gaps = []
        for (let i = 1; i < dates.length; i++) {
            const gapDays = (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24)
            gaps.push(gapDays)
            if (gapDays > maxGapDays) maxGapDays = gapDays
        }
        avgGapDays = gaps.reduce((a, b) => a + b, 0) / gaps.length
        const daysSpan = (dates[dates.length - 1] - dates[0]) / (1000 * 60 * 60 * 24)
        if (daysSpan > 0) {
            const monthsSpan = daysSpan / 30.44
            uploadsPerMonth = videoStats.length / monthsSpan
        }
    }
    return {
        medianViews,
        medianLikes,
        medianComments,
        engagementRatePct,
        viewTrend,
        uploadsPerMonth,
        avgGapDays,
        viewCV,
        commentToLikeRatio,
        maxGapDays,
    }
}

function getCPMTier(cpm) {
    if (cpm <= 50) return 'yes'
    if (cpm <= 70) return 'yes-but'
    if (cpm <= 100) return 'maybe'
    return 'no'
}

function computeCPM(rate, medianViews) {
    if (medianViews <= 0) return 0
    return (rate / medianViews) * 1000
}

function computeCPV(rate, medianViews) {
    if (medianViews <= 0) return 0
    return rate / medianViews
}

function computeRedFlags(subToViewPct, maxGapDays, viewCV, commentToLikeRatio, medianLikes) {
    const flags = []
    if (subToViewPct > 0 && subToViewPct < 5) flags.push('dead_audience')
    if (maxGapDays > 30) flags.push('long_gap')
    if (viewCV > 150) flags.push('spiky_views')
    if (medianLikes > 100) {
        if (commentToLikeRatio < 0.02) flags.push('comment_anomaly')
        if (commentToLikeRatio > 5) flags.push('comment_anomaly')
    }
    return flags
}

function emptyResult(input, defaultRate, errorMsg) {
    return {
        channelId: input,
        title: input,
        thumbnailUrl: '',
        subscriberCount: 0,
        videoCount: 0,
        medianViews: 0,
        medianLikes: 0,
        medianComments: 0,
        engagementRatePct: 0,
        viewTrend: 'flat',
        uploadsPerMonth: 0,
        avgGapDays: 0,
        subToViewPct: 0,
        viewCV: 0,
        commentToLikeRatio: 0,
        maxGapDays: 0,
        redFlags: [],
        rateUsed: defaultRate,
        cpm: 0,
        cpv: 0,
        tier: 'no',
        error: errorMsg,
    }
}

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        res.setHeader('Allow', 'POST')
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
        const { channels, defaultRate, rateOverrides = {} } = body

        if (!Array.isArray(channels) || channels.length === 0) {
            return res.status(400).json({ error: 'channels array required' })
        }
        if (typeof defaultRate !== 'number' || defaultRate <= 0) {
            return res.status(400).json({ error: 'defaultRate must be a positive number' })
        }

        const uniqueInputs = [...new Set(channels.map((c) => parseChannelInput(c)).filter(Boolean))]
        const results = []

        for (const input of uniqueInputs) {
            try {
                const channel = await resolveChannelId(input)
                if (!channel) {
                    results.push(emptyResult(input, defaultRate, 'Channel not found'))
                    continue
                }

                const videoStats = await getRecentVideoStats(channel.channelId)
                const stats = computeStats(videoStats)
                const rateUsed = rateOverrides[channel.channelId] ?? rateOverrides[channel.title] ?? defaultRate
                const cpm = computeCPM(rateUsed, stats.medianViews)
                const cpv = computeCPV(rateUsed, stats.medianViews)
                const tier = getCPMTier(cpm)
                const subToViewPct =
                    channel.subscriberCount > 0 ? (stats.medianViews / channel.subscriberCount) * 100 : 0
                const redFlags = computeRedFlags(
                    subToViewPct,
                    stats.maxGapDays,
                    stats.viewCV,
                    stats.commentToLikeRatio,
                    stats.medianLikes
                )

                results.push({
                    channelId: channel.channelId,
                    title: channel.title,
                    thumbnailUrl: channel.thumbnailUrl,
                    subscriberCount: channel.subscriberCount,
                    videoCount: channel.videoCount,
                    medianViews: stats.medianViews,
                    medianLikes: stats.medianLikes,
                    medianComments: stats.medianComments,
                    engagementRatePct: stats.engagementRatePct,
                    viewTrend: stats.viewTrend,
                    uploadsPerMonth: stats.uploadsPerMonth,
                    avgGapDays: stats.avgGapDays,
                    subToViewPct,
                    viewCV: stats.viewCV,
                    commentToLikeRatio: stats.commentToLikeRatio,
                    maxGapDays: stats.maxGapDays,
                    redFlags,
                    rateUsed,
                    cpm,
                    cpv,
                    tier,
                })
            } catch (err) {
                const message = err instanceof Error ? err.message : 'Unknown error'
                results.push(emptyResult(input, defaultRate, message))
            }
        }

        return res.status(200).json({ results })
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Request failed'
        return res.status(500).json({ error: message })
    }
}

export default handler

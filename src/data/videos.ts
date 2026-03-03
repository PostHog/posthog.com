export interface Video {
    source: 'youtube' | 'wistia'
    videoId: string
    title: string
    folder: string
    tags?: string[]
    thumbnail?: string
}

export const videos: Video[] = [
    {
        source: 'youtube',
        videoId: '2jQco8hEvTI',
        folder: 'products',
        title: 'Demo video',
        tags: ['demo', 'overview'],
    },
    {
        source: 'wistia',
        videoId: 'tg7d3aw5af',
        folder: 'products',
        title: 'How PostHog uses Experiments',
        tags: ['experiments'],
    },
    {
        source: 'wistia',
        videoId: 'x8m2u14slo',
        folder: 'products',
        title: 'How PostHog uses Feature Flags',
        tags: ['feature flags'],
    },
    {
        source: 'wistia',
        videoId: 'klphfrgiq3',
        title: 'Changelog 001',
        folder: 'changelog',
    },
]

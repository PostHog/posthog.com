/** A Learn video. The video and its English captions are hosted on Wistia. */
export interface LearnVideo {
    slug: string
    title: string
    /** `handle` from `src/hooks/productData/*`. Groups videos by product, with the product's icon. */
    productHandle: string
    /** The series label on the card and the player, e.g. "AI Observability". */
    series: string
    description: string
    /** The Wistia media ID. `MediaPlayer` plays it, and the transcript reads its English captions. */
    wistiaId: string
    /** The card image: the Wistia thumbnail. */
    poster: string
    /** The next video in the series. Without `url`, it shows as coming soon. */
    next?: { title: string; url?: string }
}

export const LEARN_VIDEOS: LearnVideo[] = [
    {
        slug: 'aio-traces',
        title: 'Traces and generations',
        productHandle: 'ai_observability',
        series: 'AI Observability',
        description:
            'Use a trace to see inside one AI request, work back from a bad answer to the bug, then check that the fix works.',
        wistiaId: 'p092lqjim8',
        poster: 'https://embed-ssl.wistia.com/deliveries/cf26633370616daabf457e1c682336ed1e51ac43.jpg?image_crop_resized=1920x1080',
        next: { title: 'Evals' },
    },
]

export const learnVideoUrl = (video: LearnVideo): string => `/learn/videos/${video.slug}`

export const learnVideoBySlug = (slug: string): LearnVideo | undefined =>
    LEARN_VIDEOS.find((video) => video.slug === slug)

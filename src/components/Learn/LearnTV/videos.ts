/** A Learn video. The MP4 lives on Cloudinary; the caption files live in `static/learn/videos/`. */
export interface LearnVideo {
    slug: string
    title: string
    /** `handle` from `src/hooks/productData/*`. Groups videos by product, with the product's icon. */
    productHandle: string
    /** The series label on the card and the player, e.g. "AI Observability". */
    series: string
    description: string
    /** Cloudinary MP4. Never commit the video file. */
    src: string
    poster: string
    /** Same-origin WebVTT file. The captions and the transcript both read it. */
    captions: string
    /** The next video in the series. Without `url`, it shows as coming soon. */
    next?: { title: string; url?: string }
}

const CLOUDINARY = 'https://res.cloudinary.com/dmukukwp6/video/upload'

export const LEARN_VIDEOS: LearnVideo[] = [
    {
        slug: 'aio-traces',
        title: 'Traces and generations',
        productHandle: 'ai_observability',
        series: 'AI Observability',
        description:
            'Use a trace to see inside one AI request, work back from a bad answer to the bug, then check that the fix works.',
        src: `${CLOUDINARY}/AIO_TRACES_FINAL_CUT_compressed3_f95c55454b.mp4`,
        poster: `${CLOUDINARY}/so_2,f_jpg/AIO_TRACES_FINAL_CUT_compressed3_f95c55454b.jpg`,
        captions: '/learn/videos/aio-traces.en.vtt',
        next: { title: 'Evals' },
    },
]

export const learnVideoUrl = (video: LearnVideo): string => `/learn/videos/${video.slug}`

export const learnVideoBySlug = (slug: string): LearnVideo | undefined =>
    LEARN_VIDEOS.find((video) => video.slug === slug)

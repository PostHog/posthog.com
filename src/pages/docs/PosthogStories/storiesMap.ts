export interface story {
    id: string
    title: string
    thumbnailUrl: string
    description?: string
    mediaUrl: string
    type: 'image' | 'video'
    durationMs?: number
    link?: string
    order: number
}

export interface storyGroup {
    id: string
    title: string
    stories: story[]
    order: number
}

export const storiesMap: storyGroup[] = [
    {
        id: 'product-analytics',
        title: 'Changelog',
        stories: [
            {
                id: 'changelog_save_filters_replay_1',
                title: 'Save filters for session replay',
                thumbnailUrl: 'https://res.cloudinary.com/dmukukwp6/image/upload/save_filters_thumbnail_a585c4dfe2.png',
                mediaUrl:
                    'https://res.cloudinary.com/dmukukwp6/video/upload/changelog_save_filters_replay_1_9aabb9799c.mp4',
                type: 'video',
                link: 'https://picsum.photos/id/1011/400/600',
                durationMs: 29000,
                order: 1,
            },
            {
                id: 'changelog_linear_share_1',
                title: 'Linear share',
                thumbnailUrl: 'https://res.cloudinary.com/dmukukwp6/image/upload/share_linear_thumbnail_1_1b0e014f43.png',
                mediaUrl: 'https://res.cloudinary.com/dmukukwp6/video/upload/changelog_linear_share_1_11fdaee4cd.mp4',
                type: 'video',
                link: 'https://picsum.photos/id/1012/400/600',
                durationMs: 44000,
                order: 2,
            },
            {
                id: 'toolbar_overview_1',
                title: 'Toolbar overview',
                thumbnailUrl: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumbnail_16a69202cc.png',
                mediaUrl: 'https://res.cloudinary.com/dmukukwp6/video/upload/toolbar_2_0a34e62550.mp4',
                type: 'video',
                durationMs: 41000,
                link: 'https://picsum.photos/id/1025/400/600',
                order: 3,
            },
            {
                id: 'toolbar_actions_1',
                title: 'Toolbar actions',
                thumbnailUrl: 'https://res.cloudinary.com/dmukukwp6/image/upload/toolbar_actions_thumbnail_fc04b490ca.png',
                mediaUrl: 'https://res.cloudinary.com/dmukukwp6/video/upload/toolbar_actions_07e751a76a.mp4',
                type: 'video',
                durationMs: 45000,
                link: 'https://picsum.photos/id/1035/400/600',
                order: 4,
            },
            {
                id: 'tulum_2024_1',
                title: 'Tulum 2024',
                thumbnailUrl: 'https://res.cloudinary.com/dmukukwp6/image/upload/tulum_2025_6d591ab225.png',
                description: 'Amzing experience with the team in Tulum',
                mediaUrl: 'https://res.cloudinary.com/dmukukwp6/video/upload/0515_85f1cca991.mov',
                type: 'video',
                order: 5,
                durationMs: 66000,
            },
        ],
        order: 1,
    },
]

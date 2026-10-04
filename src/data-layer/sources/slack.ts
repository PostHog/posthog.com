// SlackEmoji: the custom emojis of PostHog's Slack, shown on team pages. Images are not downloaded:
// `localFile.publicURL` is the Slack URL itself, and components read it from there. Aliases ("alias:other") have no image and no localFile.
import type { Source } from '../index'
import { env } from '../env'
import { fetchJson } from '../http'
import type { SlackEmojiNode } from '../types'

/* Slack API */

export interface EmojiListResponse {
    ok: boolean
    error?: string
    /** Emoji name to image URL, or to "alias:<name>". */
    emoji?: Record<string, string>
}

const isUrl = (url: string) => /^https?:\/\//.test(url)

const emojiNode = (name: string, url: string): SlackEmojiNode => ({
    id: `slack-emoji-${name}`,
    name,
    url,
    localFile: isUrl(url) ? { publicURL: url } : null,
})

export const slackEmojiSource: Source = {
    name: 'slack-emoji',
    types: ['SlackEmoji'],
    requires: ['SLACK_API_KEY'],
    async fetch() {
        const { ok, emoji, error } = await fetchJson<EmojiListResponse>('https://slack.com/api/emoji.list', {
            headers: { Authorization: `Bearer ${env('SLACK_API_KEY')}` },
        })
        if (!ok || !emoji) throw new Error(`Slack: ${error}`)
        return { SlackEmoji: Object.entries(emoji).map(([name, url]) => emojiNode(name, url)) }
    },
    fake: () => ({
        SlackEmoji: [
            emojiNode(
                'sleeping-hog',
                'https://res.cloudinary.com/dmukukwp6/image/upload/v1724378609/hogs/sleeping.png'
            ),
            emojiNode('business-hog', 'https://res.cloudinary.com/dmukukwp6/image/upload/business_hog_adb9cf3c35.png'),
        ],
    }),
}

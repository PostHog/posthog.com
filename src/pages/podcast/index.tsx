import React, { useState, useEffect } from 'react'
import Explorer from 'components/Explorer'
import MediaPlayer from 'components/MediaPlayer'

import SEO from 'components/seo'

export type PodcastFeedItem = {
    title: string
    description: string
    url: string
    guid: string
    pubDate: string
    enclosure: {
        url: string
    }
}

export const usePodcastFeed = () => {
    const [feed, setFeed] = useState<PodcastFeedItem[]>([])
    useEffect(() => {
        fetch('https://feed.podbean.com/posthog/feed.xml')
            .then((res) => res.text())
            .then((text) => {
                const parser = new DOMParser()
                const doc = parser.parseFromString(text, 'text/xml')
                const items = doc.querySelectorAll('item')
                setFeed(
                    Array.from(items).map((item) => {
                        return {
                            title: item.querySelector('title')?.textContent || '',
                            description: item.querySelector('description')?.textContent || '',
                            url: item.querySelector('enclosure')?.getAttribute('url') || '',
                            guid: item.querySelector('guid')?.textContent || '',
                            pubDate: item.querySelector('pubDate')?.textContent || '',
                            enclosure: {
                                url: item.querySelector('enclosure')?.getAttribute('url') || '',
                            },
                        }
                    })
                )
            })
            .catch((err) => {
                console.error(err)
            })
    }, [])
    return feed
}

export default function Podcast(): JSX.Element {
    const feed = usePodcastFeed()
    const [episodeSelected, setEpisodeSelected] = useState<PodcastFeedItem | null>(null)
    const mediaUrl = episodeSelected ? episodeSelected.enclosure.url : null

    return (
        <>
            <SEO
                title="Podcast - PostHog"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <div>
                {feed.map((item) => (
                    <div
                        key={item.guid}
                        className="bg-primary border-b border-primary p-2 hover:bg-accent cursor-pointer"
                        onClick={() => {
                            setEpisodeSelected(item)
                        }}
                    >
                        <div className="text-lg font-semibold">{item.title}</div>
                        <div className="text-sm text-muted" dangerouslySetInnerHTML={{ __html: item.description }} />
                    </div>
                ))}
                <MediaPlayer key={mediaUrl} mp3={mediaUrl || 'undefined'} />
            </div>
        </>
    )
}

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

    return (
        <>
            <SEO
                title="Podcast - PostHog"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <div>
                {feed.map((item) => (
                    <div key={item.guid}>
                        <div className="bg-accent">
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                        </div>
                    </div>
                ))}
                <MediaPlayer mp3="https://res.cloudinary.com/dmukukwp6/video/upload/values_26850deb2a.mp3" />
            </div>
        </>
    )
}

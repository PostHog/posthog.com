import Explorer from 'components/Explorer'
import HeaderBar from 'components/OSChrome/HeaderBar'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useState, useMemo } from 'react'
import Link from 'components/Link'
import Fuse from 'fuse.js'
import { IconBookmark, IconEllipsis } from '@posthog/icons'
import { Popover } from 'components/RadixUI/Popover'
import OSButton from 'components/OSButton'
import MenuBar from 'components/RadixUI/MenuBar'

const EditButton = ({ url, title, description }: { url: string; title: string; description: string }) => {
    const { removeBookmark } = useUser()

    return (
        <MenuBar
            menus={[
                {
                    trigger: (
                        <button className="flex justify-center items-center size-4 py-1 rotate-90 h-full">
                            <IconEllipsis />
                        </button>
                    ),
                    items: [
                        {
                            type: 'item',
                            label: 'Remove bookmark',
                            onClick: () => {
                                removeBookmark({ url, title, description })
                            },
                        },
                    ],
                },
            ]}
        />
    )
}

const Bookmark = ({ title, description, url }: { title: string; description: string; url: string }) => {
    const [image, setImage] = useState<string | null>(null)

    useEffect(() => {
        const img = new Image()
        const src = `https://d36j3rcgc2qfsv.cloudfront.net/${url
            .replace('https://posthog.com/', '')
            .replace(/\//g, '')}.jpeg`
        img.src = src
        img.onload = () => {
            setImage(img.src)
        }
    }, [url])

    return (
        <div data-scheme="primary" className="flex flex-col gap-1 border border-primary bg-primary rounded p-2">
            {image ? (
                <div className="relative">
                    <Link state={{ newWindow: true }} to={url.replace('https://posthog.com', '')}>
                        <img src={image} alt={title} className="rounded border border-primary" />
                    </Link>
                    <div className="flex items-center justify-between pt-1">
                        <h3 className="m-0 px-1">
                            <Link state={{ newWindow: true }} to={url.replace('https://posthog.com', '')}>
                                {title}
                            </Link>
                        </h3>
                        <EditButton url={url} title={title} description={description} />
                    </div>
                </div>
            ) : (
                <div className="pl-2">
                    <div className="flex items-center justify-between">
                        <Link
                            state={{ newWindow: true }}
                            to={url.replace('https://posthog.com', '')}
                            className="text-red dark:text-yellow font-bold"
                        >
                            <h3 className="m-0">{title}</h3>
                        </Link>
                        <EditButton url={url} title={title} description={description} />
                    </div>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            )}
        </div>
    )
}

export default function Bookmarks() {
    const { user } = useUser()
    const [search, setSearch] = useState('')
    const [filteredBookmarks, setFilteredBookmarks] = useState(user?.profile?.bookmarks || [])

    const fuse = useMemo(
        () =>
            new Fuse(user?.profile?.bookmarks || [], {
                keys: ['title', 'description', 'url'],
                includeMatches: true,
                threshold: 0.3,
            }),
        [user?.profile?.bookmarks]
    )

    useEffect(() => {
        if (!user?.profile?.bookmarks) return

        if (search.trim() === '') {
            setFilteredBookmarks(user.profile.bookmarks)
        } else {
            const results = fuse.search(search).map((result) => result.item)
            setFilteredBookmarks(results)
        }
    }, [search, user?.profile?.bookmarks])

    return (
        <div data-scheme="primary" className="@container bg-primary text-primary h-full">
            <HeaderBar showSearch onSearch={setSearch} />
            <div className="p-4 border-t border-primary">
                {user?.profile?.bookmarks && user.profile.bookmarks.length > 0 ? (
                    filteredBookmarks.length > 0 ? (
                        <ul className="list-none m-0 grid grid-cols-1 gap-5 @md:grid-cols-2 @xl:grid-cols-3 @2xl:grid-cols-4">
                            {filteredBookmarks?.map((bookmark) => (
                                <li key={bookmark.url}>
                                    <Bookmark {...bookmark} />
                                </li>
                            ))}
                        </ul>
                    ) : null
                ) : (
                    <div className="text-center py-12">
                        <IconBookmark className="size-12 mx-auto mb-2 text-muted" />
                        <h3 className="text-lg font-semibold m-0">No bookmarks ...yet!</h3>
                        <p className="text-muted m-0">Start exploring and bookmark your favorite pages.</p>
                    </div>
                )}
            </div>
        </div>
    )
}

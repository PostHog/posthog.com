import { IconBookmarkSolid, IconBookmark } from '@posthog/icons'
import OSButton from 'components/OSButton'
import Tooltip from 'components/RadixUI/Tooltip'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../context/App'
import React, { useMemo } from 'react'
import { useWindow } from '../../context/Window'

interface Bookmark {
    title: string
    description: string
}

export default function BookmarkButton({ bookmark }: { bookmark: Bookmark }) {
    const { user, addBookmark, removeBookmark } = useUser()
    const { openSignIn } = useApp()
    const { appWindow } = useWindow()

    const isBookmarked = useMemo(
        () => typeof window !== 'undefined' && user?.profile?.bookmarks?.some((b) => b.url === appWindow?.path),
        [user, appWindow?.path]
    )

    const handleBookmark = async (add: boolean) => {
        if (!user) {
            openSignIn()
            return
        }

        if (bookmark && appWindow?.path) {
            if (add) {
                await addBookmark({ ...bookmark, url: appWindow.path })
            } else {
                await removeBookmark({ ...bookmark, url: appWindow.path })
            }
        }
    }

    return (
        <Tooltip
            trigger={
                <OSButton
                    size="md"
                    icon={isBookmarked ? <IconBookmarkSolid /> : <IconBookmark />}
                    onClick={() => handleBookmark(!isBookmarked)}
                />
            }
        >
            {isBookmarked ? 'Remove from bookmarks' : 'Bookmark this page'}
        </Tooltip>
    )
}

import { Close } from 'components/Icons/Icons'
import { Link } from 'gatsby'
import { useValues } from 'kea'
import React, { useEffect, useState } from 'react'
import { unsafeHash } from '../../lib/utils'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'

export const PosthogAnnouncement = () => {
    const [showAnnouncement, setShowAnnouncement] = useState(false)
    const [announcementText, setAnnouncementText] = useState('')
    const [announcementLink, setAnnouncementLink] = useState('')

    const { posthog, featureFlags } = useValues(posthogAnalyticsLogic)

    useEffect(() => {
        if (window && posthog) {
            const announcements = (Object.keys(featureFlags) || []).filter((flag: string) =>
                flag.includes('Announcement:')
            )
            if (announcements.length > 0) {
                const announcement = announcements[0].split('Announcement: ')[1].split(' Link: ')
                if (!window.localStorage.getItem(`hide-announcement-${unsafeHash(announcement[0])}`)) {
                    setAnnouncementText(announcement[0])
                    setAnnouncementLink(announcement[1])
                    setShowAnnouncement(true)
                }
            }
        }
    }, [])

    const stopAnnouncement = (e: React.MouseEvent, source: string) => {
        if (source === 'close') {
            e.preventDefault()
            e.stopPropagation()
        }
        setShowAnnouncement(false)
        if (window) {
            window.localStorage.setItem(`hide-announcement-${unsafeHash(announcementText)}`, '1')
        }
        if (posthog) {
            posthog.capture(source === 'link' ? 'clicked_announcement' : 'closed_announcement', {
                announcement: announcementText,
            })
        }
    }

    const AnnouncementContent = ({ text }: { text: string }) => (
        <div className="announcement-banner">
            <p className="centered announcement-text">
                {text}
                <Close className="announcement-banner-close" onClick={(e) => stopAnnouncement(e, 'close')} />
            </p>
        </div>
    )
    return (
        <>
            {showAnnouncement ? (
                announcementLink.includes('.') ? (
                    <a
                        href={announcementLink}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => stopAnnouncement(e, 'link')}
                    >
                        <AnnouncementContent text={announcementText} />
                    </a>
                ) : (
                    <Link to={announcementLink} onClick={(e) => stopAnnouncement(e, 'link')}>
                        <AnnouncementContent text={announcementText} />
                    </Link>
                )
            ) : null}
        </>
    )
}

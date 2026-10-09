import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Tooltip from 'components/RadixUI/Tooltip'
dayjs.extend(relativeTime)
import Avatar from './Avatar'
import getAvatarURL from '../util/getAvatar'
import Link from 'components/Link'

const Edit = ({ image, color, name, date, profileID, text }) => {
    return (
        <li
            data-scheme="primary"
            className="border-b-half border-input last:border-b-0 mb-2 pb-2 last:pb-0 last:mb-0 text-primary"
        >
            <span className="flex items-center space-x-1 text-sm">
                <Avatar image={image} color={color} className="size-6" />
                <span>
                    {profileID ? (
                        <Link
                            to={`/community/profiles/${profileID}`}
                            className="font-semibold hover:underline"
                            state={{ newWindow: true }}
                        >
                            {name}
                        </Link>
                    ) : (
                        <span className="font-semibold">{name}</span>
                    )}{' '}
                    <span className="text-secondary">{text}</span> <span>{dayjs(date).fromNow()}</span>
                </span>
            </span>
        </li>
    )
}

export const Days = ({ created, edits, profile }: { created: string | undefined; edits?: any; profile?: any }) => {
    const hasEdits = edits?.length > 0
    if (!created) {
        return null
    }

    return (
        <Tooltip
            trigger={
                <div className="max-h-[160px] overflow-y-auto">
                    <span className="text-sm text-muted relative cursor-default">
                        {hasEdits ? 'Edited ' : ''}
                        {dayjs(hasEdits ? edits[0].date : created).fromNow()}
                    </span>
                </div>
            }
            delay={0}
            sideOffset={-5}
        >
            {hasEdits ? (
                <ul className="m-0 p-0 list-none">
                    {edits.map((edit) => {
                        // A deleted profile leaves edit.by.data null. Destructuring it threw, and
                        // because this tooltip is built while Days renders rather than on hover,
                        // the whole thread failed to render instead of just this row.
                        const author = edit.by?.data
                        const { firstName, lastName, color } = author?.attributes ?? {}
                        const name = [firstName, lastName].filter(Boolean).join(' ') || 'Deleted user'
                        return (
                            <Edit
                                key={edit.id}
                                image={getAvatarURL(author)}
                                color={color}
                                name={name}
                                date={edit.date}
                                profileID={author?.id}
                                text="edited"
                            />
                        )
                    })}
                    <Edit
                        image={getAvatarURL(profile)}
                        color={profile?.attributes?.color}
                        name={
                            [profile?.attributes?.firstName, profile?.attributes?.lastName].filter(Boolean).join(' ') ||
                            'Deleted user'
                        }
                        date={created}
                        profileID={profile?.id}
                        text="posted"
                    />
                </ul>
            ) : (
                dayjs(created).format('MM/DD/YYYY - h:mm A')
            )}
        </Tooltip>
    )
}

export default Days

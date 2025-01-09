import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Tooltip from 'components/Tooltip'
dayjs.extend(relativeTime)
import Avatar from './Avatar'
import getAvatarURL from '../util/getAvatar'
import Link from 'components/Link'

const Edit = ({ image, color, name, date, profileID, text }) => {
    return (
        <li className="border-b-half border-border dark:border-dark last:border-b-0 mb-2 pb-2 last:pb-0 last:mb-0">
            <span className="flex items-center space-x-1 text-sm">
                <Avatar image={image} color={color} className="size-4" />
                <span>
                    <Link to={`/community/profiles/${profileID}`} className="font-bold text-red dark:text-yellow">
                        {name}
                    </Link>{' '}
                    <span className="opacity-60">{text}</span>{' '}
                    <span className="font-bold">{dayjs(date).fromNow()}</span>
                </span>
            </span>
        </li>
    )
}

export const Days = ({ created, edits, profile }: { created: string | undefined; edits?: any; profile?: any }) => {
    const hasEdits = edits?.length > 0
    console.log(edits)
    if (!created) {
        return null
    }

    return (
        <Tooltip
            contentContainerClassName="max-h-[160px] overflow-y-auto"
            content={
                hasEdits
                    ? () => (
                          <ul className="m-0 p-0 list-none">
                              {edits.map((edit) => {
                                  const {
                                      id: profileID,
                                      attributes: { firstName, lastName, color },
                                  } = edit.by.data
                                  const name = [firstName, lastName].filter(Boolean).join(' ')
                                  return (
                                      <Edit
                                          key={edit.id}
                                          image={getAvatarURL(edit.by.data.attributes)}
                                          color={color}
                                          name={name}
                                          date={edit.date}
                                          profileID={profileID}
                                          text="edited"
                                      />
                                  )
                              })}
                              <Edit
                                  image={getAvatarURL(profile.attributes)}
                                  color={profile.attributes.color}
                                  name={[profile.attributes.firstName, profile.attributes.lastName]
                                      .filter(Boolean)
                                      .join(' ')}
                                  date={created}
                                  profileID={profile.id}
                                  text="posted"
                              />
                          </ul>
                      )
                    : dayjs(created).format('MM/DD/YYYY - h:mm A')
            }
            placement="right"
        >
            <span className="text-sm opacity-50 relative cursor-default">
                {hasEdits ? 'Edited ' : ''}
                {dayjs(hasEdits ? edits[0].date : created).fromNow()}
            </span>
        </Tooltip>
    )
}

export default Days

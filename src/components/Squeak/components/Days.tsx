import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export const Days = ({ created }: { created: string | undefined }) => {
    if (!created) {
        return null
    }

    return <span className="text-sm opacity-50">{dayjs(created).fromNow()}</span>
}

export default Days

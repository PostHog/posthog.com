import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Tooltip from 'components/Tooltip'
dayjs.extend(relativeTime)

export const Days = ({ created }: { created: string | undefined }) => {
    if (!created) {
        return null
    }

    return (
        <Tooltip content={dayjs(created).format('MM/DD/YYYY - h:mm A')} placement="top">
            <span className="text-sm opacity-50 relative cursor-default">{dayjs(created).fromNow()}</span>
        </Tooltip>
    )
}

export default Days

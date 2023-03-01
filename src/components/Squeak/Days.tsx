import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

type DaysProps = {
    createdAt: string
}

export const Days: React.FC<DaysProps> = ({ createdAt }) => {
    const days = dayjs().to(dayjs(createdAt))

    return <span className="text-gray-accent-light text-sm">{days}</span>
}

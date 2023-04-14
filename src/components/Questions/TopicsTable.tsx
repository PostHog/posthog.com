import React from 'react'

import Link from 'components/Link'
import { dateToDays, dayFormat } from '../../utils'

export const TopicsTable = ({ topics, topicGroup, className = '' }) => {
    return (
        <ul className="m-0 p-0 list-none">
            <li className="grid grid-cols-12 pb-1 items-center text-primary/75 dark:text-primary-dark/75 text-sm">
                <div className="col-span-8">{topicGroup}</div>
                <div className="col-span-2 text-center">Unresolved</div>
                <div className="col-span-2 text-center">Activity</div>
            </li>
            <li className="divide-y divide-gray-accent-light divide-dashed dark:divide-gray-accent-dark list-none">
                {topics?.data?.length > 0 &&
                    topics.data.filter(Boolean).map((topic) => {
                        const {
                            id,
                            attributes: { label, slug, questions },
                        } = topic

                        const [latestQuestion] = questions?.data || []

                        return (
                            <Link
                                to={`/questions/topics/${slug}`}
                                key={id}
                                className={`${className} block py-2 -ml-4 -mr-4 pl-4 pr-4 mt-[1px] rounded-md hover:bg-gray-accent-light dark:bg-gray-accent-dark relative hover:scale-[1.01] active:scale-[1] hover:top-[-.5px] active:top-[0px]`}
                            >
                                <div className="grid grid-cols-12 items-center">
                                    <div className="col-span-8 flex items-center space-x-4">
                                        <span className="text-red line-clamp-1">{label}</span>
                                    </div>
                                    <div className="col-span-2 text-center text-sm font-normal text-primary/60 dark:text-primary-dark/60">
                                        {questions?.data?.length}
                                    </div>
                                    <div className="col-span-2 text-center text-sm font-normal text-primary/60 dark:text-primary-dark/60">
                                        {latestQuestion?.attributes?.createdAt &&
                                            dayFormat(dateToDays(latestQuestion?.attributes?.createdAt))}
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
            </li>
        </ul>
    )
}

export default TopicsTable

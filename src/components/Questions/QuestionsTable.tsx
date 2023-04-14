import React from 'react'

import Link from 'components/Link'
import { QuestionData, StrapiResult } from 'lib/strapi'
import getAvatarURL from '../Squeak/util/getAvatar'
import { dateToDays, dayFormat } from '../../utils'
import { Check2 } from 'components/Icons'
import Tooltip from 'components/Tooltip'

type QuestionsTableProps = {
    questions: Omit<StrapiResult<QuestionData[]>, 'meta'>
    isLoading: boolean
    fetchMore: () => void
    hideLoadMore?: boolean
    className?: string
    currentPage?: {
        url: string
        title: string
    }
}

export const QuestionsTable = ({
    questions,
    isLoading,
    fetchMore,
    hideLoadMore,
    className = '',
    currentPage,
}: QuestionsTableProps) => {
    return (
        <ul className="m-0 p-0 list-none">
            <li className="grid grid-cols-12 pb-1 items-center text-primary/75 dark:text-primary-dark/75 text-sm">
                <div className="col-span-8">Topic / Author</div>
                <div className="col-span-2 text-center">Replies</div>
                <div className="col-span-2 text-center">Activity</div>
            </li>
            <li className="divide-y divide-gray-accent-light divide-dashed dark:divide-gray-accent-dark list-none">
                {questions.data.length > 0
                    ? questions.data.filter(Boolean).map((question) => {
                          const {
                              attributes: { profile, subject, permalink, body, replies, createdAt, resolved },
                          } = question

                          const numReplies = replies?.data?.length || 0

                          const avatar = getAvatarURL(profile?.data?.attributes)

                          return profile ? (
                              <Link
                                  state={currentPage && { previous: currentPage }}
                                  to={`/questions/${permalink}`}
                                  key={question.id}
                                  className={`${className} block py-2 -ml-4 -mr-4 pl-4 pr-4 mt-[1px] rounded-md hover:bg-gray-accent-light dark:bg-gray-accent-dark relative hover:scale-[1.01] active:scale-[1] hover:top-[-.5px] active:top-[0px]`}
                              >
                                  <div className="grid grid-cols-12 items-center">
                                      <div className="col-span-8 flex items-center space-x-4">
                                          <div className="w-4 text-green">
                                              {resolved && (
                                                  <Tooltip content="Resolved">
                                                      <span className="relative">
                                                          <Check2 />
                                                      </span>
                                                  </Tooltip>
                                              )}
                                          </div>

                                          <div>
                                              <span className="text-red line-clamp-1">{subject}</span>
                                              <div className="flex items-center text-sm mt-0.5 space-x-1 text-primary group">
                                                  <div className={`w-5 h-5 overflow-hidden rounded-full flex-shrink-0`}>
                                                      {avatar ? (
                                                          <img className="w-full h-full" alt="" src={avatar} />
                                                      ) : (
                                                          <svg
                                                              viewBox="0 0 40 40"
                                                              fill="none"
                                                              xmlns="http://www.w3.org/2000/svg"
                                                              className="bg-gray-accent-light"
                                                          >
                                                              <path
                                                                  d="M20.0782 41.0392H5.42978C4.03134 41.0392 3.1173 40.1642 3.09386 38.7736C3.07823 37.7814 3.07042 36.797 3.10948 35.8048C3.15636 34.6329 3.72668 33.7345 4.74228 33.1798C8.0782 31.3595 11.4299 29.5783 14.7659 27.7658C15.0081 27.633 15.1565 27.758 15.3362 27.8517C18.1878 29.3439 21.0942 29.4689 24.0626 28.2267C24.1485 28.1955 24.2423 28.1721 24.3126 28.1096C24.9298 27.5861 25.4845 27.7971 26.1251 28.1486C29.1173 29.7971 32.1331 31.4143 35.1487 33.0238C36.4534 33.7191 37.094 34.766 37.0706 36.2426C37.0549 37.0785 37.0706 37.9067 37.0706 38.7426C37.0628 40.1254 36.1409 41.0395 34.7659 41.0395H20.0783L20.0782 41.0392Z"
                                                                  fill="#BFBFBC"
                                                              ></path>
                                                              <path
                                                                  d="M19.8359 27.0625C17.0859 26.9687 14.8047 25.6094 13.1251 23.1953C10.3751 19.2344 10.7032 13.6093 13.8516 10.0001C17.2735 6.08599 22.9452 6.10943 26.336 10.0469C29.9376 14.2345 29.711 20.8437 25.8126 24.6405C24.2188 26.1952 22.3126 27.0312 19.8362 27.0624L19.8359 27.0625Z"
                                                                  fill="#BFBFBC"
                                                              ></path>
                                                          </svg>
                                                      )}
                                                  </div>
                                                  <div className="text-primary dark:text-primary-dark font-medium opacity-60 group-hover:opacity-100 line-clamp-1 my-1">
                                                      {profile.data.attributes.firstName}{' '}
                                                      {profile.data.attributes.lastName}
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-span-2 text-center text-sm font-normal text-primary/60 dark:text-primary-dark/60">
                                          {numReplies}
                                      </div>
                                      <div className="col-span-2 text-center text-sm font-normal text-primary/60 dark:text-primary-dark/60">
                                          {dayFormat(dateToDays(createdAt))}
                                      </div>
                                  </div>
                              </Link>
                          ) : null
                      })
                    : new Array(10).fill(0).map((_, i) => (
                          <li key={i} className="">
                              <div className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 space-y-2">
                                  <div className="w-96 w-3/4 h-4 bg-gray-accent-light dark:bg-gray-accent-dark rounded-sm animate-pulse"></div>
                                  <div className="w-60 w-3/4 h-4 bg-gray-accent-light dark:bg-gray-accent-dark rounded-sm animate-pulse"></div>
                                  <div className="w-36 w-3/4 h-4 bg-gray-accent-light dark:bg-gray-accent-dark rounded-sm animate-pulse"></div>
                              </div>

                              <div className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 font-semibold animate-pulse">
                                  <div className="w-3/4 h-4 bg-gray-accent-light dark:bg-gray-accent-dark rounded-sm animate-pulse"></div>
                              </div>
                              <div className="whitespace-nowrap p-4 text-sm text-gray-500 text-gray font-semibold animate-pulse">
                                  <div className="w-3/4 h-4 bg-gray-accent-light dark:bg-gray-accent-dark rounded-sm animate-pulse"></div>
                              </div>
                          </li>
                      ))}
            </li>

            {!hideLoadMore && (
                <li className="py-2 list-none">
                    <button
                        className="p-3 block w-full hover:bg-gray-accent-light text-primary/75 dark:text-primary-dark/75 hover:text-red rounded text-[15px] font-bold bg-gray-accent-light dark:bg-gray-accent-dark relative active:top-[0.5px] active:scale-[.99]"
                        onClick={fetchMore}
                        disabled={isLoading}
                    >
                        Load more
                    </button>
                </li>
            )}
        </ul>
    )
}

export default QuestionsTable

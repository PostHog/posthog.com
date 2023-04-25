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
    hasMore?: boolean
    showAuthor?: boolean
    showTopic?: boolean
}

export const QuestionsTable = ({
    questions,
    isLoading,
    fetchMore,
    hideLoadMore,
    className = '',
    currentPage,
    hasMore,
    showTopic,
    showAuthor = true,
}: QuestionsTableProps) => {
    return (
        <ul className="m-0 p-0 list-none">
            <li className="grid grid-cols-12 pl-2 pr-4 pb-1 items-center text-primary/75 dark:text-primary-dark/75 text-sm">
                <div className="col-span-12 xl:col-span-7 2xl:col-span-8 pl-8">Question / Topic</div>
                <div className="hidden xl:block xl:col-span-2 2xl:col-span-1 text-center">Replies</div>
                <div className="hidden xl:block xl:col-span-3">Created</div>
            </li>
            <li className="divide-y divide-gray-accent-light divide-dashed dark:divide-gray-accent-dark list-none">
                {questions.data.length > 0
                    ? questions.data.filter(Boolean).map((question) => {
                          const {
                              attributes: { profile, subject, permalink, replies, createdAt, resolved, topics },
                          } = question

                          const latestAuthor = replies?.data?.[0]?.attributes?.profile || profile
                          const numReplies = replies?.data?.length || 0

                          return profile ? (
                              <div key={question.id}>
                                  <Link
                                      state={currentPage && { previous: currentPage }}
                                      to={`/questions/${permalink}`}
                                      className={`${className} block py-2 pl-2 pr-4 mt-[1px] rounded-md hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark relative hover:scale-[1.01] active:scale-[1] hover:top-[-.5px] active:top-[0px]`}
                                  >
                                      <div className="grid grid-cols-12 items-center">
                                          <div className="col-span-12 xl:col-span-7 2xl:col-span-8 flex items-center space-x-4">
                                              <div className="w-4 text-green">
                                                  {resolved && (
                                                      <Tooltip content="Resolved">
                                                          <span className="relative">
                                                              <Check2 />
                                                          </span>
                                                      </Tooltip>
                                                  )}
                                              </div>

                                              <div className="w-full">
                                                  <span className="text-red line-clamp-1">{subject}</span>
                                                  {showTopic && (
                                                      <div className="flex justify-between items-center">
                                                          <div className="flex items-center text-sm space-x-1 text-primary group">
                                                              <div className="text-primary dark:text-primary-dark font-medium opacity-60 group-hover:opacity-100 line-clamp-1">
                                                                  {topics?.data?.[0].attributes.label ||
                                                                      'Uncategorized'}
                                                              </div>
                                                          </div>

                                                          <div className="xl:hidden text-primary dark:text-primary-dark text-sm font-medium opacity-60 line-clamp-2">
                                                              {dayFormat(dateToDays(createdAt))}
                                                          </div>
                                                      </div>
                                                  )}
                                              </div>
                                          </div>
                                          <div className="hidden xl:block xl:col-span-2 2xl:col-span-1 text-center text-sm font-normal text-primary/60 dark:text-primary-dark/60">
                                              {numReplies}
                                          </div>
                                          <div className="hidden xl:block xl:col-span-3 text-sm font-normal text-primary/60 dark:text-primary-dark/60">
                                              <div className="text-primary dark:text-primary-dark font-medium opacity-60 line-clamp-2">
                                                  {dayFormat(dateToDays(createdAt))} by{' '}
                                                  {profile.data?.attributes?.firstName}{' '}
                                                  {profile.data?.attributes?.lastName} {}
                                              </div>
                                          </div>
                                      </div>
                                  </Link>
                              </div>
                          ) : null
                      })
                    : new Array(10).fill(0).map((_, i) => (
                          <div key={i} className="">
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
                          </div>
                      ))}
            </li>

            {!hideLoadMore && hasMore && (
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

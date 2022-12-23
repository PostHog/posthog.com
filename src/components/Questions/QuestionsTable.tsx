import React from 'react'

import { dayFormat, dateToDays } from '../../utils'
import slugify from 'slugify'

import Link from 'components/Link'
import { Question } from './index'

type QuestionsTableProps = {
    questions: Question[]
    isLoading: boolean
    size: number
    setSize: (size: number | ((_size: number) => number)) => any
    hideLoadMore?: boolean
    className?: string
}

export const QuestionsTable = ({
    questions,
    isLoading,
    setSize,
    hideLoadMore,
    className = '',
}: QuestionsTableProps) => {
    return (
        <ul className="m-0 -my-4 p-0">
            <li className="divide-y divide-gray-accent-light divide-dashed dark:divide-gray-accent-dark list-none">
                {questions.length > 0
                    ? questions.map((question) => {
                          const latestReply = question.replies[question.replies.length - 1]

                          return (
                              <div key={question.id} className={`grid xl:grid-cols-4 sm:gap-2 py-4 ${className}`}>
                                  <div className="hidden sm:block">
                                      <a
                                          href={`/community/profiles/${question.profile.id}`}
                                          className="flex items-center text-sm mt-0.5 space-x-1 text-primary group"
                                      >
                                          <div className={`w-5 h-5 overflow-hidden rounded-full flex-shrink-0`}>
                                              {question.profile.avatar ? (
                                                  <img className="w-full h-full" alt="" src={question.profile.avatar} />
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
                                          <span className="text-primary dark:text-primary-dark font-medium opacity-60 group-hover:opacity-100 line-clamp-1">
                                              {question.profile.first_name} {question.profile.last_name}
                                          </span>
                                      </a>
                                  </div>
                                  <div className="sm:col-span-3">
                                      <Link
                                          to={`/questions/${question.permalink}`}
                                          className="block font-bold whitespace-normal leading-snug"
                                      >
                                          {question.subject}
                                      </Link>
                                      <a
                                          href={`/community/profiles/${question.profile.id}`}
                                          className="flex items-center text-sm mt-0.5 space-x-1 text-primary group sm:hidden"
                                      >
                                          <div className={`w-5 h-5 overflow-hidden rounded-full flex-shrink-0`}>
                                              {question.profile.avatar ? (
                                                  <img className="w-full h-full" alt="" src={question.profile.avatar} />
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
                                              {question.profile.first_name} {question.profile.last_name}
                                          </div>
                                      </a>
                                      {/*
                                            Last activity: 
                                            <span className="whitespace-nowrap p-4 text-sm font-semibold">
                                                {dayFormat(dateToDays(latestReply.created_at))}
                                            </span>
                                        */}
                                      {question.topics.map(({ topic }: { topic: { id: string; label: string } }) => {
                                          return (
                                              <Link
                                                  key={topic.id}
                                                  to={`/questions/topics/${slugify(topic.label, {
                                                      lower: true,
                                                  })}`}
                                                  className="bg-gray-accent-light rounded-sm"
                                              >
                                                  {topic.label}
                                              </Link>
                                          )
                                      })}
                                      <p className="break-words whitespace-normal line-clamp-2 text-sm m-0 mt-1">
                                          {question.replies[0].body}
                                      </p>
                                      <Link
                                          to={`/questions/${question.permalink}`}
                                          className="whitespace-nowrap text-sm font-semibold"
                                      >
                                          {question.replies.length === 1 ? (
                                              <>{question.replies.length - 1} replies</>
                                          ) : (
                                              <>{question.replies.length - 1} reply</>
                                          )}
                                      </Link>
                                  </div>
                              </div>
                          )
                      })
                    : new Array(10).fill(0).map((_, i) => (
                          <tr key={i} className="">
                              <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 space-y-2">
                                  <div className="w-96 w-3/4 h-4 bg-gray-accent-light dark:bg-gray-accent-dark rounded-sm animate-pulse"></div>
                                  <div className="w-60 w-3/4 h-4 bg-gray-accent-light dark:bg-gray-accent-dark rounded-sm animate-pulse"></div>
                                  <div className="w-36 w-3/4 h-4 bg-gray-accent-light dark:bg-gray-accent-dark rounded-sm animate-pulse"></div>
                              </td>

                              <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 font-semibold animate-pulse">
                                  <div className="w-3/4 h-4 bg-gray-accent-light dark:bg-gray-accent-dark rounded-sm animate-pulse"></div>
                              </td>
                              <td className="whitespace-nowrap p-4 text-sm text-gray-500 text-gray font-semibold animate-pulse">
                                  <div className="w-3/4 h-4 bg-gray-accent-light dark:bg-gray-accent-dark rounded-sm animate-pulse"></div>
                              </td>
                          </tr>
                      ))}
            </li>

            {!hideLoadMore && (
                <li className="py-2 border-l border-b border-r border-gray-accent-light dark:border-gray-accent-dark border-dashed flex justify-center item-center">
                    <button
                        className="py-2 px-4 hover:bg-gray-accent-light text-gray font-semibold rounded"
                        onClick={() => setSize((size) => size + 1)}
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

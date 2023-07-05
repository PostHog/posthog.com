import React, { useState } from 'react'
import { mergeClassList } from '../../lib/utils'
import envelope from '../Blog/images/envelope.svg'
import Logo from 'components/Logo'
import SubstackForm from 'components/SubstackForm'

export const NewsletterForm = ({
    sidebar = false,
    compact = false,
    subcompact = false,
    bgColor = '#08042f',
    className = '',
}: {
    sidebar?: boolean
    compact?: boolean
    subcompact?: boolean
    bgColor?: string
    className?: string
}): JSX.Element => {
    const [email, setEmail] = useState('')
    const classList = mergeClassList('w-full p-4 relative z-10 text-center', className)

    return sidebar ? (
        <div>
            <div className="flex items-end space-x-2">
                <div>
                    <img className="w-full max-w-[47px]" src={envelope} />
                </div>
                <p className="leading-tight text-sm font-bold m-0 flex-shrink-0">
                    <span className="flex space-x-2 items-center">
                        <span>The best of</span> <Logo className="w-[80px]" />
                    </span>{' '}
                    <span className="text-xs -mt-1 block">
                        Delivered <span className="text-red">twice</span> a month.
                    </span>
                </p>
            </div>
            <div className="mt-4 md:mt-2">
                <SubstackForm />
            </div>
        </div>
    ) : compact ? (
        <div className="w-full mx-auto my-12 text-center">
            <div className="flex justify-center w-full h-full p-1">
                <div className={classList}>
                    <div className="flex flex-col md:flex-row md:space-x-4 items-center">
                        <figure className="shrink-0 grow-0 basis-12 m-0 text-black dark:text-white">
                            <svg
                                className="block h-12 mb-0 fill-current"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 50 50"
                            >
                                <path
                                    d="M41.5 7.5c-3.86 0-7 3.14-7 7s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7Z"
                                    fill="#F54E00"
                                />
                                <path d="M41.5 23.5c.34 0 .67-.02 1-.06V36.5c0 1.654-1.346 3-3 3h-32c-1.654 0-3-1.346-3-3v-20c0-1.654 1.346-3 3-3h25.06c-.04.33-.06.66-.06 1 0 2.125.74 4.074 1.97 5.615l-8.849 8.85a3.005 3.005 0 0 1-4.244 0l-11.172-11.17a1 1 0 1 0-1.414 1.414l11.17 11.17a4.984 4.984 0 0 0 3.535 1.46c1.28 0 2.56-.484 3.535-1.46l8.85-8.85A8.987 8.987 0 0 0 41.5 23.5Z" />
                            </svg>
                        </figure>

                        <span className="flex flex-col md:space-x-2 md:flex-row flex-grow font-bold md:justify-start md:text-left">
                            <span className="text-lg">The best of PostHog.</span>{' '}
                            <span className="text-sm md:text-lg">Delivered twice a month.</span>
                        </span>
                    </div>
                    <div className="md:ml-16 mt-2 md:mt-0">
                        <SubstackForm />
                    </div>
                </div>
            </div>
        </div>
    ) : subcompact ? (
        <div className={classList}>
            <SubstackForm />
        </div>
    ) : (
        <div className="flex w-full h-full p-1 bg-white dark:bg-gray-accent-dark rounded-md mb-6 shadow-xl">
            <div className="w-full p-4 relative z-10 flex md:flex-row flex-col md:space-x-12 md:space-y-0 space-y-2 items-center">
                <div className="flex space-x-2 items-center">
                    <img className="w-[75px] mx-auto" src={envelope} />
                    <p className="leading-tight font-bold m-0">
                        The best of PostHog. <br />
                        Delivered <span className="text-red">twice</span> a month.
                    </p>
                </div>
                <div className="flex-grow w-full md:w-auto">
                    <SubstackForm />
                </div>
            </div>
        </div>
    )
}

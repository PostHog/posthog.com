import React, { useState } from 'react'
import { CallToAction } from '../CallToAction'
import { mergeClassList } from '../../lib/utils'
import envelope from '../Blog/images/envelope.svg'
import Logo from 'components/Logo'

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
                <form
                    action="https://posthog.us19.list-manage.com/subscribe/post?u=292207b434c26e77b45153b96&id=97194afa0a"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    className="validate w-full mb-0 space-y-2"
                    target="_blank"
                    noValidate
                >
                    <div className="relative">
                        <input
                            type="email"
                            name="EMAIL"
                            className="block w-full px-2 py-2 flex-1 bg-white border-gray-accent-light rounded-sm font-semibold text-sm outline-none pr-7"
                            id="mce-EMAIL"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@address.com"
                            value={email}
                            required
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <svg
                                width="18"
                                height="19"
                                viewBox="0 0 18 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill="#000"
                                    d="M12.55 4.25a.62.62 0 0 0-.619.62v4.045a.826.826 0 0 1-.825.826H6.613l1.214-1.213a.62.62 0 0 0-.876-.877l-2.27 2.271a.62.62 0 0 0 0 .876l2.27 2.27a.62.62 0 0 0 .876-.875l-1.214-1.214h4.491a2.062 2.062 0 0 0 2.065-2.064V4.87a.62.62 0 0 0-.62-.619Z"
                                    opacity=".3"
                                />
                                <g filter="url(#a)">
                                    <path
                                        fill="#BFBFBC"
                                        fillRule="evenodd"
                                        d="M3 0a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3Zm0 1a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H3Z"
                                        clipRule="evenodd"
                                    />
                                </g>
                                <defs>
                                    <filter
                                        id="a"
                                        width="18"
                                        height="19"
                                        x="0"
                                        y="0"
                                        colorInterpolationFilters="sRGB"
                                        filterUnits="userSpaceOnUse"
                                    >
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            result="hardAlpha"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                        />
                                        <feOffset dy="1" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix values="0 0 0 0 0.74902 0 0 0 0 0.74902 0 0 0 0 0.737255 0 0 0 0.25 0" />
                                        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_7590_77741" />
                                        <feBlend
                                            in="SourceGraphic"
                                            in2="effect1_dropShadow_7590_77741"
                                            result="shape"
                                        />
                                    </filter>
                                </defs>
                            </svg>
                        </button>
                    </div>
                    {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                    <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                        <input type="text" name="b_292207b434c26e77b45153b96_97194afa0a" tabIndex={-1} defaultValue />
                    </div>
                </form>
            </div>
        </div>
    ) : compact ? (
        <div className="w-full mx-auto my-12 text-center">
            <div className="flex justify-center w-full h-full p-1 border-t border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark">
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
                        <form
                            action="https://posthog.us19.list-manage.com/subscribe/post?u=292207b434c26e77b45153b96&id=97194afa0a"
                            method="post"
                            id="mc-embedded-subscribe-form"
                            name="mc-embedded-subscribe-form"
                            className="validate w-full flex flex-col md:flex-row items-center mb-0 space-y-2 md:space-y-0 md:space-x-2"
                            target="_blank"
                            noValidate
                        >
                            <input
                                type="email"
                                name="EMAIL"
                                className="block w-full px-4 py-2 flex-1 bg-white dark:bg-gray-accent-dark rounded-md border-0 text-lg font-bold md:text-[18px] md:text-left outline-none text-center max-w-sm"
                                id="mce-EMAIL"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@address.com"
                                value={email}
                                required
                            />
                            {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                            <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                                <input
                                    type="text"
                                    name="b_292207b434c26e77b45153b96_97194afa0a"
                                    tabIndex={-1}
                                    defaultValue
                                />
                            </div>
                            <input
                                type="submit"
                                className="bg-red dark:bg-white text-white dark:text-black text-lg shrink-0 grow-0 basis-auto font-bold lg:mt-0 border-none cursor-pointer px-5 py-3 md:py-2 w-full rounded-sm md:w-auto"
                                value="Sign me up!"
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    ) : subcompact ? (
        <div className={classList}>
            <form
                action="https://posthog.us19.list-manage.com/subscribe/post?u=292207b434c26e77b45153b96&id=97194afa0a"
                method="post"
                id="mc-embedded-subscribe-form"
                name="mc-embedded-subscribe-form"
                className="validate w-full flex flex-col md:flex-row items-center mb-0 space-y-2 md:space-y-0 md:space-x-2"
                target="_blank"
                noValidate
            >
                <input
                    type="email"
                    name="EMAIL"
                    className="block w-full px-4 py-2 flex-1 bg-tan dark:bg-gray-accent-dark rounded-md border-0 text-base font-semibold md:text-left outline-none text-center max-w-sm"
                    id="mce-EMAIL"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@address.com"
                    value={email}
                    required
                />
                {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                    <input type="text" name="b_292207b434c26e77b45153b96_97194afa0a" tabIndex={-1} defaultValue />
                </div>
                <input
                    type="submit"
                    className="bg-red dark:bg-white text-white dark:text-black shrink-0 grow-0 basis-auto font-bold lg:mt-0 border-none cursor-pointer px-5 py-3 md:py-2 w-full rounded-sm md:w-auto"
                    value="Sign me up!"
                />
            </form>
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
                <div className="flex-grow">
                    <form
                        action="https://posthog.us19.list-manage.com/subscribe/post?u=292207b434c26e77b45153b96&id=97194afa0a"
                        method="post"
                        id="mc-embedded-subscribe-form"
                        name="mc-embedded-subscribe-form"
                        className="validate w-full mb-0 flex md:flex-row flex-col items-center"
                        target="_blank"
                        noValidate
                    >
                        <input
                            type="email"
                            name="EMAIL"
                            className="block w-full px-2 py-2 md:mr-2 md:mb-0 mb-2 flex-grow bg-white border-gray-accent-light rounded-sm font-semibold text-base outline-none max-w-sm"
                            id="mce-EMAIL"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@address.com"
                            value={email}
                            required
                        />
                        {/* real people should not fill this in and expect good things - do not remove this or risk form bot signups*/}
                        <div style={{ position: 'absolute', left: '-5000px' }} aria-hidden="true">
                            <input
                                type="text"
                                name="b_292207b434c26e77b45153b96_97194afa0a"
                                tabIndex={-1}
                                defaultValue
                            />
                        </div>
                        <input
                            type="submit"
                            className="bg-red text-white h-full grow-0 basis-auto font-bold m-0 text-base border-none cursor-pointer px-5 py-3 md:py-2 w-full max-w-[250px] rounded-sm relative active:top-[1px] active:scale-[.99] flex-shrink"
                            value="Sign me up!"
                        />
                    </form>
                </div>
            </div>
        </div>
    )
}

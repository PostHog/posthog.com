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
                                width="19"
                                height="19"
                                viewBox="0 0 19 19"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g filter="url(#filter0_d_7283_78862)">
                                    <path
                                        opacity="0.3"
                                        d="M13.0504 4C12.7083 4 12.4311 4.27712 12.4311 4.61926V8.66507C12.4311 8.88387 12.3439 9.09391 12.1891 9.24872C12.0343 9.40354 11.8243 9.49075 11.6055 9.49075H7.11431L8.32806 8.27752C8.56956 8.0355 8.56956 7.64329 8.32806 7.40127C8.08603 7.15977 7.69383 7.15977 7.45181 7.40127L5.18113 9.67195C5.06502 9.78806 5 9.94597 5 10.1101C5 10.2742 5.06502 10.4321 5.18113 10.5482L7.45181 12.8189C7.69383 13.0604 8.08603 13.0604 8.32806 12.8189C8.56956 12.5768 8.56956 12.1846 8.32806 11.9426L7.11431 10.7294H11.6055C12.153 10.7294 12.6778 10.5121 13.0649 10.1246C13.4524 9.73755 13.6697 9.21274 13.6697 8.66519V4.61938C13.6697 4.27724 13.3925 4 13.0504 4Z"
                                        fill="black"
                                    />
                                    <path
                                        d="M0 3C0 1.34315 1.34315 0 3 0H15.6697C17.3265 0 18.6697 1.34315 18.6697 3H16.6697C16.6697 2.44772 16.222 2 15.6697 2H3C2.44772 2 2 2.44772 2 3H0ZM18.6697 15C18.6697 16.6569 17.3265 18 15.6697 18H3C1.34315 18 0 16.6569 0 15L2 14C2 14 2.44772 14 3 14H15.6697C16.222 14 16.6697 14 16.6697 14L18.6697 15ZM3 18C1.34315 18 0 16.6569 0 15V3C0 1.34315 1.34315 0 3 0V2C2.44772 2 2 2.44772 2 3V14C2 14 2.44772 14 3 14V18ZM15.6697 0C17.3265 0 18.6697 1.34315 18.6697 3V15C18.6697 16.6569 17.3265 18 15.6697 18V14C16.222 14 16.6697 14 16.6697 14V3C16.6697 2.44772 16.222 2 15.6697 2V0Z"
                                        fill="#BFBFBC"
                                        mask="url(#path-1-outside-1_7283_78862)"
                                    />
                                </g>
                                <defs>
                                    <filter
                                        id="filter0_d_7283_78862"
                                        x="0"
                                        y="0"
                                        width="18.6699"
                                        height="19"
                                        filterUnits="userSpaceOnUse"
                                        colorInterpolationFilters="sRGB"
                                    >
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix
                                            in="SourceAlpha"
                                            type="matrix"
                                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                                            result="hardAlpha"
                                        />
                                        <feOffset dy="1" />
                                        <feComposite in2="hardAlpha" operator="out" />
                                        <feColorMatrix
                                            type="matrix"
                                            values="0 0 0 0 0.74902 0 0 0 0 0.74902 0 0 0 0 0.737255 0 0 0 0.25 0"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in2="BackgroundImageFix"
                                            result="effect1_dropShadow_7283_78862"
                                        />
                                        <feBlend
                                            mode="normal"
                                            in="SourceGraphic"
                                            in2="effect1_dropShadow_7283_78862"
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

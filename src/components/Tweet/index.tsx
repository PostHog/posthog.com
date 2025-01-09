import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Link from 'components/Link'

const DontClickButton = ({ alertMessage, children, ...props }) => (
    <button
        className="dont-click flex items-center space-x-1 opacity-60"
        onClick={(e) => {
            e.preventDefault()
            alert(alertMessage)
        }}
        {...props}
    >
        {children}
    </button>
)
export const Tweet = ({ children, className = '', alertMessage }) => {
    return (
        <div
            className={`tw-tweet max-w-xl bg-white dark:bg-accent-dark border border-transparent dark:border-dark rounded-md shadow-md p-4 mb-8 relative ${className}`}
        >
            <div className="flex items-center space-x-3">
                <div className="rounded-full border border-light dark:border-dark hover:border-red dark:hover:border-yellow bg-white dark:bg-dark">
                    <Link
                        href="https://x.com/james406"
                        externalNoIcon
                        className="bg-accent rounded-full overflow-hidden block aspect-square m-px"
                    >
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/v1683655764/james_b841adce96.png"
                            alt='James ("Veg"/"JC") Hawkins'
                            className="size-12"
                        />
                    </Link>
                </div>
                <div>
                    <div className="text-lg font-semibold leading-tight">James Hawkins</div>
                    <div className="text-gray-500 text-sm">
                        <Link
                            href="https://x.com/james406"
                            externalNoIcon
                            className="text-primary/70 dark:text-primary-dark/70 hover:text-red dark:hover:text-yellow"
                        >
                            @james406
                        </Link>
                    </div>
                </div>
            </div>
            <div className="mt-3 [&_*]:!leading-normal">
                {children}
            </div>
            <div className="mt-3 flex justify-between items-center text-gray-500">
                <div className="flex space-x-4">
                    <DontClickButton alertMessage={alertMessage}>
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 9l-5 5m0 0l5 5m-5-5h12"
                            ></path>
                        </svg>
                        <span>Reply</span>
                    </DontClickButton>
                    <DontClickButton alertMessage={alertMessage}>
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                        </svg>
                        <span>Repost</span>
                    </DontClickButton>
                    <DontClickButton alertMessage={alertMessage}>
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 4v16m8-8H4"
                            ></path>
                        </svg>
                        <span>Like</span>
                    </DontClickButton>
                </div>
            </div>
        </div>
    )
}

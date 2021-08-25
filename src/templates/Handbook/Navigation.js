import React from 'react'
import Link from 'components/Link'
import { DarkModeToggle } from 'components/DarkModeToggle'

export default function Navigation({ breadcrumb, breadcrumbBase, filePath, title }) {
    return (
        <div className="flex mt-4 items-center border-2 border-gray-accent-light border-dashed border-l-0 border-r-0 max-w-screen-2xl mx-auto">
            <ul className="list-none p-0 m-0 flex">
                <li className="py-2 px-5 border-r-2 border-gray-accent-light border-dashed">
                    <Link className="text-yellow hover:text-yellow font-bold " to={breadcrumbBase.url}>
                        {breadcrumbBase.name}
                    </Link>
                </li>
                {breadcrumb.map((crumb, index) => {
                    return (
                        <li key={index} className="py-2 px-5 border-r-2 border-gray-accent-light border-dashed">
                            <Link className="text-yellow hover:text-yellow font-bold" to={crumb.url}>
                                {crumb.name}
                            </Link>
                        </li>
                    )
                })}
                <li className="py-2 px-5 text-almost-black font-bold">{title}</li>
            </ul>
            <ul className="list-none p-0 m-0 flex ml-auto">
                <li className="py-2 px-5">
                    <a
                        className="text-gray hover:text-almost-black hidden lg:flex items-center space-x-1"
                        href={`https://github.com/PostHog/posthog.com/tree/master/contents${filePath}`}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M11.086 4.06683L13.8881 6.8689L14.5567 6.20022L11.7547 3.39816L11.086 4.06683Z"
                                fill="currentColor"
                            />
                            <path
                                d="M3.62558 11.5357L6.42725 14.3381L13.4016 7.3658L10.5999 4.56334L3.62558 11.5357Z"
                                fill="currentColor"
                            />
                            <path
                                d="M15.6623 5.12968C16.1126 4.67936 16.1126 3.95886 15.6623 3.50855L14.4914 2.33773C14.0411 1.88742 13.2756 1.88742 12.8703 2.33773L12.2849 2.92314L15.1219 5.76012L15.6623 5.12968Z"
                                fill="currentColor"
                            />
                            <path
                                d="M2.01767 15.487C1.97263 15.6221 2.01767 15.7572 2.10773 15.8472C2.15276 15.8923 2.24282 15.9373 2.33289 15.9373C2.37792 15.9373 2.42295 15.9373 2.46798 15.9373L5.84533 14.7214L3.23351 12.1096L2.01767 15.487Z"
                                fill="currentColor"
                            />
                        </svg>
                        <span>Edit this page</span>
                    </a>
                </li>
                <li className="py-2 px-5">
                    <a
                        className="text-gray hover:text-almost-black hidden sm:flex items-center space-x-2"
                        href={`https://github.com/PostHog/posthog.com/issues/new?title=Docs feedback on: ${title}&body=**Issue with: ${filePath}**\n\n`}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.34524 13.071C8.53769 13.071 7.88086 13.7281 7.88086 14.5356C7.88086 15.3432 8.53769 16 9.34524 16C10.1528 16 10.8098 15.3432 10.8098 14.5356C10.8098 13.7281 10.1528 13.071 9.34524 13.071Z"
                                fill="currentColor"
                            />
                            <path
                                d="M8.60145 12.5085H10.0893C10.1872 12.5085 10.272 12.4405 10.2929 12.3447L12.1858 3.75563C12.2001 3.69087 12.1828 3.62324 12.139 3.57335L10.8206 2.0711C10.7809 2.02588 10.7239 2 10.6638 2H8.0269C7.96681 2 7.90979 2.02588 7.87007 2.0711L6.55174 3.57335C6.50794 3.62324 6.49063 3.69087 6.50489 3.75563L8.39778 12.3447C8.41876 12.4405 8.50349 12.5085 8.60145 12.5085Z"
                                fill="currentColor"
                            />
                        </svg>

                        <span>Raise an issue</span>
                    </a>
                </li>
            </ul>
            <div className="py-2 px-5 border-l-2 border-gray-accent-light border-dashed">
                <DarkModeToggle className="m-0" />
            </div>
        </div>
    )
}

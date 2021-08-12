import React from 'react'
import { DarkModeToggle } from '../../components/DarkModeToggle'

export default function SearchBar({ filePath, title, handleMobileMenuClick }) {
    return (
        <div className="max-w-[800px] mx-auto handbook-search relative z-10">
            <div className="w-full flex space-x-2 md:space-x-0 text-[#c4b7d1] ">
                <button
                    onClick={handleMobileMenuClick}
                    className="bg-[#e4e0e9] dark:bg-[#371A51] rounded px-4 flex-shrink-0 block md:hidden shadow-xl dark:shadow-2xl"
                >
                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g opacity="0.5">
                            <path
                                d="M8.99992 0C9.70943 0 10.2878 0.578406 10.2878 1.28792C10.2878 1.99743 9.70943 2.57583 8.99992 2.57583H1.28784C0.578331 2.57583 -7.62939e-05 1.99743 -7.62939e-05 1.28792C-7.62939e-05 0.578406 0.578331 0 1.28784 0H8.99992Z"
                                fill="currentColor"
                            />
                            <path
                                d="M17.7841 7.00257C17.8072 7.03342 17.8149 7.07969 17.8303 7.11825C17.8689 7.18766 17.8997 7.26478 17.9229 7.3419C17.9383 7.38817 17.9614 7.42673 17.9769 7.473C17.9846 7.51928 17.9769 7.55784 17.9769 7.60411C17.9769 7.64267 18 7.68123 18 7.71979C18 7.75835 17.9769 7.79691 17.9769 7.83547C17.9692 7.88175 17.9846 7.92031 17.9769 7.96658C17.9692 8.01285 17.9383 8.05141 17.9229 8.09768C17.8997 8.1748 17.8689 8.25192 17.8303 8.32133C17.8072 8.35989 17.8072 8.39845 17.7841 8.43701L15.2159 12.2931C14.9691 12.6632 14.5604 12.8637 14.144 12.8637C13.8972 12.8637 13.6504 12.7943 13.4344 12.6478C12.8406 12.2545 12.6864 11.4524 13.0797 10.8663L14.3213 9.00771H1.28792C0.578405 9.00771 0 8.4293 0 7.71979C0 7.01028 0.578405 6.43187 1.28792 6.43187H14.3136L13.072 4.57326C12.6787 3.97943 12.8406 3.18509 13.4267 2.79177C14.0206 2.39846 14.8149 2.56041 15.2082 3.14653L17.7841 7.00257Z"
                                fill="currentColor"
                            />
                            <path
                                d="M1.28784 12.856H8.99992C9.70943 12.856 10.2878 13.4344 10.2878 14.1439C10.2878 14.8535 9.70943 15.4242 8.99992 15.4242H1.28784C0.578331 15.4242 -7.62939e-05 14.8457 -7.62939e-05 14.1362C-7.62939e-05 13.4267 0.578331 12.856 1.28784 12.856Z"
                                fill="currentColor"
                            />
                        </g>
                    </svg>
                </button>

                <div className="flex space-x-3 text-[14px] items-center  py-3 rounded px-4 bg-[#e4e0e9] dark:bg-[#371A51] shadow-xl dark:shadow-2xl flex-grow">
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </span>

                    <input
                        className="bg-[#e4e0e9] w-full dark:bg-[#371A51] outline-none"
                        placeholder="Search handbook"
                    />
                    <div className="flex space-x-3 flex-shrink-0">
                        <a
                            className="text-[#c4b7d1] hover:text-[#c4b7d1] hidden sm:flex items-center space-x-1"
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
                        <a
                            className="text-[#c4b7d1] hover:text-[#c4b7d1] hidden sm:flex items-center space-x-2"
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
                        <DarkModeToggle />
                    </div>
                </div>
            </div>
        </div>
    )
}

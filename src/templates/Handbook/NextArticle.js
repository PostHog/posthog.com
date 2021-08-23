import React from 'react'
import { Link } from 'gatsby'

export default function NextArticle({ hideAnchor, breakpoints, next }) {
    return (
        <>
            <hr
                style={{
                    width: hideAnchor || breakpoints.lg ? '100%' : `calc(100% + ${breakpoints.xl ? '4rem' : '8rem'})`,
                }}
                className="bg-[#765494] my-9"
            />
            <section className="">
                <p className="dark:text-white opacity-70 font-bold m-0 text-base mb-1">NEXT UP</p>

                <Link
                    className="text-yellow hover:text-yellow flex items-center space-x-1 text-base font-bold"
                    to={next.url}
                >
                    <span>{next.name}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                    </svg>
                </Link>
            </section>
        </>
    )
}

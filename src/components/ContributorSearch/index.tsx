import React from 'react'
import { useActions } from 'kea'
import { contributorsLogic } from 'logic/contributorsLogic'

export const ContributorSearch = () => {
    const { processSearchInput } = useActions(contributorsLogic)

    return (
        <div className="flex flex-col justify-center relative mx-auto mb-0 w-full max-w-lg">
            <div className="absolute left-4 w-4 h-4">
                <svg className="opacity-50" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                    <g opacity="1" clipPath="url(#a)">
                        <path
                            d="m18 15.964-4.794-4.793A7.2 7.2 0 1 0 .001 7.2a7.2 7.2 0 0 0 11.17 6.006L15.963 18 18 15.964ZM2.04 7.2A5.16 5.16 0 0 1 7.2 2.043 5.16 5.16 0 1 1 2.04 7.2Z"
                            fill="#90794B"
                        />
                    </g>
                    <defs>
                        <clipPath id="a">
                            <path fill="#fff" d="M0 0h18v18H0z" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <input
                onChange={(e) => processSearchInput(e.target.value)}
                name="contributor-search"
                placeholder="Search contributors..."
                autoFocus={true}
                className="pl-10 py-3 text-lg bg-white  rounded-full w-full ring-red shadow-lg shadow-[0_100px_80px_0_rgba(0,0,0,0.07),0px_14.5036px_24.1177px_rgba(0,0,0,0.0395839),0_6.68266px_10.0172px_rgba(0,0,0,0.0291065),0_4.88627px_3.62304px_rgba(0,0,0,0.0214061)]"
            />

            <button className="hidden px-6 py-3 bg-red text-lg shadow-md rounded-sm text-white font-bold">
                Search
            </button>
        </div>
    )
}

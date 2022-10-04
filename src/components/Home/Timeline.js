import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import groupBy from 'lodash.groupby'
import React from 'react'

// Until this gets refactored...
//
// Month: Only set for first result that month (so we don't repeat )
// Types: feature   | something new in the product
//        news      | company announcements
//        milestone | github star count, fundraising round, hosted event, etc
// Name: Short description
//
// - Leave (at least) one entry for each month
// - For multiple events in a month, leave off the month after the first result (so it doesn't look like multiple months) - until someone build this correctly =]
//

const Closed = () => {
    return (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_6103_20817)">
                <path
                    d="M11.3013 7.00031C11.4338 6.85813 11.5059 6.67008 11.5025 6.47578C11.4991 6.28148 11.4204 6.0961 11.283 5.95868C11.1455 5.82127 10.9602 5.74256 10.7659 5.73913C10.5716 5.7357 10.3835 5.80783 10.2413 5.94031L7.27133 8.91031L5.80133 7.44031C5.65916 7.30783 5.47111 7.2357 5.27681 7.23913C5.08251 7.24256 4.89712 7.32127 4.75971 7.45868C4.6223 7.5961 4.54358 7.78148 4.54016 7.97578C4.53673 8.17008 4.60885 8.35813 4.74133 8.50031L6.74133 10.5003C6.88196 10.6408 7.07258 10.7196 7.27133 10.7196C7.47008 10.7196 7.66071 10.6408 7.80133 10.5003L11.3013 7.00031Z"
                    fill="#A371F7"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.0215 8.22034C16.0215 10.3421 15.1786 12.3769 13.6783 13.8772C12.178 15.3775 10.1432 16.2203 8.02148 16.2203C5.89975 16.2203 3.86492 15.3775 2.36463 13.8772C0.864339 12.3769 0.0214844 10.3421 0.0214844 8.22034C0.0214844 6.09861 0.864339 4.06377 2.36463 2.56348C3.86492 1.06319 5.89975 0.220337 8.02148 0.220337C10.1432 0.220337 12.178 1.06319 13.6783 2.56348C15.1786 4.06377 16.0215 6.09861 16.0215 8.22034ZM14.5215 8.22034C14.5215 9.94424 13.8367 11.5975 12.6177 12.8165C11.3987 14.0355 9.74539 14.7203 8.02148 14.7203C6.29758 14.7203 4.64428 14.0355 3.42529 12.8165C2.2063 11.5975 1.52148 9.94424 1.52148 8.22034C1.52148 6.49643 2.2063 4.84313 3.42529 3.62414C4.64428 2.40516 6.29758 1.72034 8.02148 1.72034C9.74539 1.72034 11.3987 2.40516 12.6177 3.62414C13.8367 4.84313 14.5215 6.49643 14.5215 8.22034Z"
                    fill="#A371F7"
                />
            </g>
            <defs>
                <clipPath id="clip0_6103_20817">
                    <rect width="16" height="16" fill="white" transform="translate(0.0214844 0.220337)" />
                </clipPath>
            </defs>
        </svg>
    )
}

const Open = () => {
    return (
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_6103_31895)">
                <path
                    d="M8.02148 9.72034C8.41931 9.72034 8.80084 9.5623 9.08214 9.281C9.36345 8.99969 9.52148 8.61816 9.52148 8.22034C9.52148 7.82251 9.36345 7.44098 9.08214 7.15968C8.80084 6.87837 8.41931 6.72034 8.02148 6.72034C7.62366 6.72034 7.24213 6.87837 6.96082 7.15968C6.67952 7.44098 6.52148 7.82251 6.52148 8.22034C6.52148 8.61816 6.67952 8.99969 6.96082 9.281C7.24213 9.5623 7.62366 9.72034 8.02148 9.72034Z"
                    fill="#3FB950"
                    fillOpacity="0.9"
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.02148 0.220337C5.89975 0.220337 3.86492 1.06319 2.36463 2.56348C0.864339 4.06377 0.0214844 6.09861 0.0214844 8.22034C0.0214844 10.3421 0.864339 12.3769 2.36463 13.8772C3.86492 15.3775 5.89975 16.2203 8.02148 16.2203C10.1432 16.2203 12.178 15.3775 13.6783 13.8772C15.1786 12.3769 16.0215 10.3421 16.0215 8.22034C16.0215 6.09861 15.1786 4.06377 13.6783 2.56348C12.178 1.06319 10.1432 0.220337 8.02148 0.220337V0.220337ZM1.52148 8.22034C1.52148 6.49643 2.2063 4.84313 3.42529 3.62414C4.64428 2.40516 6.29758 1.72034 8.02148 1.72034C9.74539 1.72034 11.3987 2.40516 12.6177 3.62414C13.8367 4.84313 14.5215 6.49643 14.5215 8.22034C14.5215 9.94424 13.8367 11.5975 12.6177 12.8165C11.3987 14.0355 9.74539 14.7203 8.02148 14.7203C6.29758 14.7203 4.64428 14.0355 3.42529 12.8165C2.2063 11.5975 1.52148 9.94424 1.52148 8.22034Z"
                    fill="#3FB950"
                    fillOpacity="0.9"
                />
            </g>
            <defs>
                <clipPath id="clip0_6103_31895">
                    <rect width="16" height="16" fill="white" transform="translate(0.0214844 0.220337)" />
                </clipPath>
            </defs>
        </svg>
    )
}

const Card = ({ title, githubPages, complete }) => {
    const completedIssues = githubPages.filter((page) => page.closed_at)
    const percentageComplete = Math.round((completedIssues.length / githubPages.length) * 100)

    return (
        <div className="flex space-x-4">
            <div className="flex-shrink-0">
                <StaticImage width={200} src="./images/recording-hog.png" />
            </div>
            <div className="flex-grow">
                <div className="flex items-center space-x-2">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_6094_49151)">
                            <path
                                d="M10.9678 12.1875C11.4651 12.1875 11.942 11.99 12.2936 11.6383C12.6452 11.2867 12.8428 10.8098 12.8428 10.3125C12.8428 9.81522 12.6452 9.33831 12.2936 8.98667C11.942 8.63504 11.4651 8.4375 10.9678 8.4375C10.4705 8.4375 9.99358 8.63504 9.64195 8.98667C9.29032 9.33831 9.09277 9.81522 9.09277 10.3125C9.09277 10.8098 9.29032 11.2867 9.64195 11.6383C9.99358 11.99 10.4705 12.1875 10.9678 12.1875Z"
                                fill="#3FB950"
                                fillOpacity="0.9"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M10.9678 0.3125C8.31561 0.3125 5.77207 1.36607 3.89671 3.24143C2.02134 5.1168 0.967773 7.66034 0.967773 10.3125C0.967773 12.9647 2.02134 15.5082 3.89671 17.3836C5.77207 19.2589 8.31561 20.3125 10.9678 20.3125C13.6199 20.3125 16.1635 19.2589 18.0388 17.3836C19.9142 15.5082 20.9678 12.9647 20.9678 10.3125C20.9678 7.66034 19.9142 5.1168 18.0388 3.24143C16.1635 1.36607 13.6199 0.3125 10.9678 0.3125V0.3125ZM2.84277 10.3125C2.84277 8.15762 3.6988 6.09099 5.22253 4.56726C6.74626 3.04352 8.81289 2.1875 10.9678 2.1875C13.1227 2.1875 15.1893 3.04352 16.713 4.56726C18.2367 6.09099 19.0928 8.15762 19.0928 10.3125C19.0928 12.4674 18.2367 14.534 16.713 16.0577C15.1893 17.5815 13.1227 18.4375 10.9678 18.4375C8.81289 18.4375 6.74626 17.5815 5.22253 16.0577C3.6988 14.534 2.84277 12.4674 2.84277 10.3125Z"
                                fill="#3FB950"
                                fillOpacity="0.9"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_6094_49151">
                                <rect width="20" height="20" fill="white" transform="translate(0.967773 0.3125)" />
                            </clipPath>
                        </defs>
                    </svg>
                    <h3 className="text-lg m-0">{title}</h3>
                </div>
                <div className="flex space-x-2 items-center mt-2 mb-4">
                    <div className="h-2 flex-grow bg-gray-accent-light rounded-md relative overflow-hidden">
                        <div
                            style={{ width: `${percentageComplete}%` }}
                            className={`bg-[#3FB950] absolute inset-0 h-full`}
                        />
                    </div>
                    <p className="m-0 text-[14px]">{percentageComplete}%</p>
                </div>
                <ul className="list-none m-0 p-0 md:grid grid-rows-3 grid-cols-2 grid-flow-col gap-y-2 gap-x-4">
                    {githubPages.map((page) => {
                        return (
                            <li key={page.title} className="text-[14px] flex items-center font-semibold space-x-1">
                                <span>{page.closed_at ? <Closed /> : <Open />}</span>
                                <span className="whitespace-nowrap text-ellipsis overflow-hidden">{page.title}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default function Timeline() {
    const { sessionRecording } = useStaticQuery(graphql`
        query {
            sessionRecording: squeakRoadmap(title: { eq: "Session Recording 3.0" }) {
                title
                complete
                githubPages {
                    title
                    closed_at
                }
            }
        }
    `)

    console.log(sessionRecording)

    return (
        <section className="px-4 max-w-screen-2xl mx-auto">
            <h2 className="m-0 text-5xl md:text-7xl text-primary">
                What we're building <span className="text-yellow">next</span>
            </h2>
            <p className="my-6 text-lg md:text-xl font-semibold mt-2 lg:mt-4 text-primary opacity-75">
                Based on community feedback and the goals set by our small teams, here's what we're building.
            </p>
            <div className="max-w-[740px] bg-white p-4 rounded-md shadow-md">
                <Card {...sessionRecording} />
            </div>
        </section>
    )
}

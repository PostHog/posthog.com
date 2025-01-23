import { useStaticQuery } from 'gatsby'
import { graphql } from 'gatsby'
import React, { useEffect, useMemo, useState } from 'react'
import moment from 'moment'
import Markdown from 'components/Squeak/components/Markdown'
import { CallToAction } from 'components/CallToAction'
import { IconArrowLeft, IconArrowRight } from '@posthog/icons'
import { heading } from '../classes'
import Slider from 'components/Slider'

const getFirstYear = (roadmaps: any) => Object.keys(roadmaps)[0]
const getFirstMonth = (roadmaps: any, year: string) => Object.keys(roadmaps[year])[0]
const getFirstRoadmap = (roadmaps: any, year: string, month: string) => roadmaps[year][month][0]
const groupRoadmaps = (roadmaps: any) =>
    roadmaps.reduce((acc, node) => {
        const [year, month] = node.dateCompleted.split('-')
        const monthName = moment(month, 'MM').format('MMMM')
        if (!acc[year]) {
            acc[year] = {}
        }
        if (!acc[year][monthName]) {
            acc[year][monthName] = []
        }
        acc[year][monthName].push(node)
        return acc
    }, {})
const filters = ['All highlights', 'Launched a product', 'Major new feature', 'Something cool happened']

export default function TimelineNew() {
    const {
        allSqueakRoadmap: { nodes },
    } = useStaticQuery(graphql`
        query {
            allSqueakRoadmap(filter: { milestone: { eq: true } }, sort: { fields: dateCompleted }) {
                nodes {
                    squeakId
                    dateCompleted(formatString: "YYYY-MM-DD")
                    title
                    projectedCompletion(formatString: "YYYY-MM-DD")
                    category
                    cta {
                        url
                    }
                    description
                }
            }
        }
    `)

    const [allRoadmaps, setAllRoadmaps] = useState(nodes)
    const [roadmapsGrouped, setRoadmapsGrouped] = useState(groupRoadmaps(nodes))
    const firstYear = useMemo(() => getFirstYear(roadmapsGrouped), [])
    const firstMonth = useMemo(() => getFirstMonth(roadmapsGrouped, firstYear), [])
    const firstRoadmap = useMemo(() => getFirstRoadmap(roadmapsGrouped, firstYear, firstMonth), [])
    const [activeYear, setActiveYear] = useState(firstYear)
    const [activeMonth, setActiveMonth] = useState(firstMonth)
    const [activeRoadmap, setActiveRoadmap] = useState(firstRoadmap)
    const [activeFilter, setActiveFilter] = useState('All highlights')
    const hasPrevious = useMemo(() => {
        return allRoadmaps.findIndex((node) => node.squeakId === activeRoadmap.squeakId) > 0
    }, [allRoadmaps, activeRoadmap])
    const hasNext = useMemo(() => {
        return allRoadmaps.findIndex((node) => node.squeakId === activeRoadmap.squeakId) < allRoadmaps.length - 1
    }, [allRoadmaps, activeRoadmap])

    useEffect(() => {
        const [year, month] = activeRoadmap.dateCompleted.split('-')
        const monthName = moment(month, 'MM').format('MMMM')
        setActiveYear(year)
        setActiveMonth(monthName)
    }, [activeRoadmap])

    useEffect(() => {
        let newRoadmaps = nodes
        switch (activeFilter) {
            case 'Launched a product':
                newRoadmaps = nodes.filter((node) => node.category === 'Beta' || node.category === 'Launched a product')
                break
            case 'Major new feature':
                newRoadmaps = nodes.filter((node) => node.category === 'Major new feature')
                break
            case 'Something cool happened':
                newRoadmaps = nodes.filter((node) => node.category === 'Something cool happened')
                break
        }
        const newRoadmapsGrouped = groupRoadmaps(newRoadmaps)
        const firstYear = getFirstYear(newRoadmapsGrouped)
        const firstMonth = getFirstMonth(newRoadmapsGrouped, firstYear)
        const firstRoadmap = getFirstRoadmap(newRoadmapsGrouped, firstYear, firstMonth)
        setAllRoadmaps(newRoadmaps)
        setActiveYear(firstYear)
        setActiveMonth(firstMonth)
        setActiveRoadmap(firstRoadmap)
        setRoadmapsGrouped(newRoadmapsGrouped)
    }, [activeFilter])

    useEffect(() => {
        const firstYear = getFirstYear(roadmapsGrouped)
        const firstMonth = getFirstMonth(roadmapsGrouped, firstYear)
        const firstRoadmap = getFirstRoadmap(roadmapsGrouped, firstYear, firstMonth)
        setActiveYear(firstYear)
        setActiveMonth(firstMonth)
        setActiveRoadmap(firstRoadmap)
    }, [roadmapsGrouped])

    return (
        <div className="max-w-screen-xl mx-auto my-12 px-5">
            <h1 className={`${heading()} !text-left`}>We ship fast</h1>
            <p className={`${heading('sm')} !text-left mb-4`}>
                We started with product analytics and now have shipped 8 products in the last 5 years.
            </p>
            {/* <div className="mt-10">
                <Slider
                    className="border-b border-border dark:border-border-dark mb-8 space-x-4"
                    activeIndex={filters.indexOf(activeFilter)}
                >
                    {filters.map((label) => {
                        const active = label === activeFilter
                        return (
                            <button
                                key={label}
                                className={`text-base pb-2 whitespace-nowrap relative ${active ? 'font-bold' : ''}`}
                                onClick={() => setActiveFilter(label)}
                            >
                                {label}
                                {active && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red dark:bg-yellow" />
                                )}
                            </button>
                        )
                    })}
                </Slider>
            </div> */}
            <div className="items-start md:space-x-4 md:space-y-0 space-y-4 flex md:flex-row flex-col mt-12">
                <div className="flex space-x-8 max-w-1/3 w-full">
                    <ul className="m-0 p-0 list-none space-y-1 flex-shrink-0">
                        {Object.entries(roadmapsGrouped).map(([year]) => (
                            <li key={year}>
                                <button
                                    className={`text-base hover:bg-accent/60 dark:hover:bg-accent-dark px-2 py-1 rounded-md ${
                                        year === activeYear ? 'bg-accent dark:bg-accent-dark font-bold' : ''
                                    }`}
                                    onClick={() => {
                                        setActiveYear(year)
                                        setActiveMonth(Object.keys(roadmapsGrouped[year])[0])
                                        setActiveRoadmap(
                                            roadmapsGrouped[year][Object.keys(roadmapsGrouped[year])[0]][0]
                                        )
                                    }}
                                >
                                    {year}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <ul className="m-0 p-0 list-none space-y-1 flex-shrink-0">
                        {Object.entries(roadmapsGrouped[activeYear]).map(([month, roadmaps], index) => {
                            const isLastMonth = index === Object.keys(roadmapsGrouped[activeYear]).length - 1
                            const nextYear = `${Number(activeYear) + 1}`
                            return (
                                <>
                                    <li className="`text-base px-2 py-1 rounded-md`" key={month}>
                                        {month}
                                    </li>
                                    {isLastMonth && roadmapsGrouped[nextYear] && (
                                        <CallToAction
                                            size="sm"
                                            type="secondary"
                                            onClick={() => {
                                                setActiveYear(nextYear)
                                                setActiveMonth(Object.keys(roadmapsGrouped[nextYear])[0])
                                                setActiveRoadmap(
                                                    roadmapsGrouped[nextYear][
                                                        Object.keys(roadmapsGrouped[nextYear])[0]
                                                    ][0]
                                                )
                                            }}
                                        >
                                            See {nextYear}
                                        </CallToAction>
                                    )}
                                    {!isLastMonth &&
                                        new Array(roadmaps.length - 1).fill(null).map((_, index) => (
                                            <li className="py-1" key={index}>
                                                <br />
                                            </li>
                                        ))}
                                </>
                            )
                        })}
                    </ul>
                    <ul className="m-0 p-0 list-none space-y-1">
                        {Object.entries(roadmapsGrouped[activeYear]).map(([month, roadmaps]) =>
                            roadmaps.map((node) => (
                                <li key={node.squeakId}>
                                    <button
                                        className={`text-left text-base hover:bg-accent/60 dark:hover:bg-accent-dark px-2 py-1 rounded-md text-ellipsis overflow-hidden ${
                                            node.squeakId === activeRoadmap.squeakId
                                                ? 'bg-accent dark:bg-accent-dark font-bold'
                                                : ''
                                        }`}
                                        onClick={() => {
                                            setActiveRoadmap(node)
                                        }}
                                    >
                                        {node.title}
                                    </button>
                                </li>
                            ))
                        )}
                    </ul>
                </div>

                <div className="border border-border dark:border-border-dark flex-grow w-full">
                    <div className="flex justify-between items-center p-4 border-b border-border dark:border-border-dark">
                        <CallToAction
                            size="sm"
                            type="outline"
                            disabled={!hasPrevious}
                            onClick={() => {
                                const previousRoadmap =
                                    allRoadmaps[
                                        allRoadmaps.findIndex((node) => node.squeakId === activeRoadmap.squeakId) - 1
                                    ]
                                setActiveRoadmap(previousRoadmap)
                            }}
                        >
                            <span className="flex items-center space-x-1">
                                <IconArrowLeft className="size-4 rotate-90" />
                                <span>Previous</span>
                            </span>
                        </CallToAction>
                        <h3 className="m-0 text-base">
                            {activeMonth} {activeYear}
                        </h3>
                        <CallToAction
                            size="sm"
                            type="outline"
                            disabled={!hasNext}
                            onClick={() => {
                                const nextRoadmap =
                                    allRoadmaps[
                                        allRoadmaps.findIndex((node) => node.squeakId === activeRoadmap.squeakId) + 1
                                    ]
                                setActiveRoadmap(nextRoadmap)
                            }}
                        >
                            <span className="flex items-center space-x-1">
                                <span>Next</span>
                                <IconArrowRight className="size-4 rotate-90" />
                            </span>
                        </CallToAction>
                    </div>
                    <div className="p-4">
                        <h1>{activeRoadmap.title}</h1>
                        <Markdown>{activeRoadmap.description}</Markdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

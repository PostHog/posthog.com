import Link from 'components/Link'
import React from 'react'
import Header from '../Header'
import { graphql, useStaticQuery } from 'gatsby'
import Blog from './Blog'
import SearchIconButton from 'components/Search/SearchIconButton'
import CallToAction from '../CallToAction'
import { TwoCol, Wrapper } from '../Wrapper'
import handbookSidebar from 'sidebars/handbook.json'

interface HandbookNav {
    title: string
    url: string
}

const Handbook = ({ menu }: { menu: HandbookNav[] }) => {
    return (
        <div className="md:py-7 py-6 border-t md:border-b-0 border-b md:mb-0 mb-4 border-gray-accent-light border-dashed">
            <div className="max-w-3xl mx-auto xl:max-w-auto md:px-6">
                <div className="flex items-center w-full justify-between opacity-70">
                    <h3 className="text-[18px] font-bold m-0 text-black ">Handbook</h3>
                    <SearchIconButton location="handbook-dropdown" initialFilter="handbook" />
                </div>
                <p className="text-[14px] m-0 mt-2 dark:text-white">
                    We're open source and operate in public as much as we can.
                </p>
                <ol className="list-none m-0 p-0 md:grid grid-rows-6 grid-cols-2 grid-flow-col mt-5">
                    {menu.map(({ title, url }: HandbookNav, index) => {
                        return (
                            <li key={title} className="first:hidden">
                                <Link
                                    className="rounded px-2 py-2.5 h-full hover:bg-tan/50 flex items-center space-x-2 relative active:top-[1px] active:scale-[.99]"
                                    to={url}
                                >
                                    <span className="text-[14px] text-black/30 text-center leading-none font-semibold dark:text-white w-4 flex items-center">
                                        {index}.
                                    </span>
                                    <h3 className="text-base m-0 opacity-70 leading-none">{title}</h3>
                                </Link>
                            </li>
                        )
                    })}
                </ol>
                <CallToAction to="/handbook" className="mt-4 !w-full">
                    Browse handbook
                </CallToAction>
            </div>
        </div>
    )
}

export default function Docs({ referenceElement }: { referenceElement: HTMLDivElement }) {
    const { teamMembers, jobs } = useStaticQuery(query)

    const handbookMenu = handbookSidebar.slice(1, handbookSidebar.length - 1).map(({ name, url, children }) => {
        return {
            title: name,
            url: url || children?.filter(({ url }) => url)[0].url,
        }
    })

    return (
        <Wrapper
            placement="bottom-end"
            referenceElement={referenceElement}
            className="w-full xl:max-w-4xl 2xl:max-w-5xl"
        >
            <section className="flex md:flex-col flex-col-reverse">
                <Header title="Company" />
                <div className="md:flex md:p-0 p-4">
                    <div className="md:border-r border-gray-accent-light border-dashed flex-grow">
                        <div className="md:px-6 pt-0 md:pt-6 pb-6 text-center mx-auto">
                            <h2 className="text-[15px] font-semibold text-black/40 m-0">About PostHog</h2>
                            <h3 className="text-2xl xl:text-3xl font-bold mt-3 mb-0 !leading-tight">
                                Our mission is to{' '}
                                <span className="text-red">increase the number of successful products</span> in the
                                world.
                            </h3>
                            <CallToAction to="/about" className="mt-3 !px-12">
                                Learn about us
                            </CallToAction>
                        </div>
                        <TwoCol
                            left={{
                                title: 'Team',
                                cta: {
                                    url: '/handbook/company/team',
                                    label: 'Meet the team',
                                },
                                children: (
                                    <p className="m-0 text-[14px] dark:text-white">
                                        Our <strong>{teamMembers.totalCount} team members</strong> work from{' '}
                                        <strong>{teamMembers.group.length - 1} countries</strong>. Some travel
                                        full-time.
                                    </p>
                                ),
                            }}
                            right={{
                                title: 'Careers',
                                cta: { url: '/careers', label: 'Explore careers' },
                                children: (
                                    <p className="m-0 text-[14px] dark:text-white">
                                        We're currently hiring for{' '}
                                        <strong>
                                            {jobs.totalCount} role{jobs.totalCount > 1 && 's'}
                                        </strong>
                                        . We're unlike any company you've ever worked for.
                                    </p>
                                ),
                            }}
                        />

                        <Handbook menu={handbookMenu} />
                    </div>
                    <Blog />
                </div>
            </section>
        </Wrapper>
    )
}

const query = graphql`
    {
        teamMembers: allMdx(filter: { fields: { slug: { regex: "/^/team/" } } }) {
            totalCount
            group(field: frontmatter___country) {
                fieldValue
            }
        }
        jobs: allAshbyJobPosting(filter: { isListed: { eq: true } }) {
            totalCount
        }
    }
`

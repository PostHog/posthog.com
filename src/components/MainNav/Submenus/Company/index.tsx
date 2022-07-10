import { Search } from 'components/Icons/Icons'
import Link from 'components/Link'
import React from 'react'
import { Squeak } from 'squeak-react'
import Header from '../Header'
import RightCol from '../RightCol'
import { graphql, useStaticQuery } from 'gatsby'
import Blog from './Blog'
import SearchBar from '../../../../templates/Handbook/SearchBar'
import CallToAction from '../CallToAction'

interface HandbookNav {
    title: string
    url: string
}

const Block = ({
    title,
    children,
    cta,
}: {
    title: string
    children: React.ReactNode
    cta: { url: string; label: string }
}) => {
    return (
        <div className="sm:px-4 py-4">
            <h3 className="text-[18px] font-bold mt-0 mb-2 text-black opacity-70">{title}</h3>
            <>{children}</>
            <CallToAction to={cta.url} className="mt-4">
                {cta.label}
            </CallToAction>
        </div>
    )
}

const Handbook = () => {
    const nav: HandbookNav[] = [
        {
            title: 'Getting started',
            url: '',
        },
        {
            title: 'Company',
            url: '',
        },
        {
            title: 'Strategy',
            url: '',
        },
        {
            title: 'How we work',
            url: '',
        },
        {
            title: 'People',
            url: '',
        },
        {
            title: 'Engineering',
            url: '',
        },
        {
            title: 'Product',
            url: '',
        },
        {
            title: 'Design',
            url: '',
        },
        {
            title: 'Marketing',
            url: '',
        },
        {
            title: 'Customer success',
            url: '',
        },
        {
            title: 'Developer relations',
            url: '',
        },
    ]

    return (
        <div className="md:py-7 py-4 md:px-4 border-t md:border-b-0 border-b md:mb-0 mb-4 border-gray-accent-light border-dashed">
            <div className="flex items-center w-full justify-between opacity-70">
                <h3 className="text-[18px] font-bold m-0 text-black ">Handbook</h3>
                <SearchBar className="flex-grow-0 !p-0 w-auto" base={'handbook'} />
            </div>
            <p className="text-[14px] m-0 mt-2">We’re open source and operate in public as much as we can.</p>
            <ol className="list-none m-0 p-0 grid grid-rows-6 grid-cols-2 grid-flow-col mt-5">
                {nav.map(({ title, url }: HandbookNav, index) => {
                    return (
                        <li key={title}>
                            <Link
                                className="rounded-md px-2 py-2 hover:bg-tan hover:bg-opacity-50 flex items-center space-x-2"
                                to={url}
                            >
                                <span className="text-[14px] text-black opacity-20 leading-none font-semibold">
                                    {index + 1}.
                                </span>
                                <h3 className="text-base m-0 opacity-70 leading-none">{title}</h3>
                            </Link>
                        </li>
                    )
                })}
            </ol>
            <CallToAction to="/handbook" className="mt-4">
                Browse handbook
            </CallToAction>
        </div>
    )
}

export default function Docs() {
    const { teamMembers, jobs } = useStaticQuery(query)

    return (
        <section>
            <Header title="Company" />
            <div className="md:flex md:p-0 p-4">
                <div className="md:border-r border-gray-accent-light border-dashed md:w-[500px]">
                    <div className="md:px-4 py-4 text-center">
                        <h2 className="text-[15px] font-semibold text-black opacity-75 m-0">About PostHog</h2>
                        <h3 className="text-xl font-bold mt-2 mb-0">
                            Our mission is to{' '}
                            <span className="text-red">increase the number of successful products</span> in the world.
                        </h3>
                        <CallToAction to="/company" className="mt-4">
                            Read our story
                        </CallToAction>
                    </div>
                    <div className="grid sm:grid-cols-2 sm:divide-x sm:divide-y-0 divide-y divide-dashed divide-gray-accent-light border-t border-gray-accent-light border-dashed">
                        <Block title="Team" cta={{ url: '/handbook/company/team', label: 'Meet the team' }}>
                            <p className="m-0 text-[14px]">
                                Our <strong>{teamMembers.totalCount} team members</strong> work from{' '}
                                <strong>{teamMembers.group.length - 1} countries</strong>. Some travel full-time.
                            </p>
                        </Block>
                        <Block title="Careers" cta={{ url: '/careers', label: 'Explore careers' }}>
                            <p className="m-0 text-[14px]">
                                We’re currently hiring for <strong>{jobs.totalCount} roles</strong>. We’re unlike any
                                company you’ve ever worked for.
                            </p>
                        </Block>
                    </div>
                    <Handbook />
                </div>
                <Blog />
            </div>
        </section>
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
        jobs: allJobs {
            totalCount
        }
    }
`

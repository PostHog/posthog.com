import Link from 'components/Link'
import React from 'react'
import Header from '../Header'
import { graphql, useStaticQuery } from 'gatsby'
import Blog from './Blog'
import SearchBar from 'components/Docs/SearchBar'
import CallToAction from '../CallToAction'
import { Wrapper } from '../Wrapper'

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
        <div className="py-6 md:px-6 xl:px-12">
            <h3 className="text-[18px] font-bold mt-0 mb-2 text-black/70">{title}</h3>
            <>{children}</>
            <CallToAction to={cta.url} className="mt-4 !w-full">
                {cta.label}
            </CallToAction>
        </div>
    )
}

const Handbook = ({ menu }: { menu: HandbookNav[] }) => {
    return (
        <div className="md:py-7 py-6 border-t md:border-b-0 border-b md:mb-0 mb-4 border-gray-accent-light border-dashed">
            <div className="max-w-2xl mx-auto xl:max-w-auto md:px-6">
                <div className="flex items-center w-full justify-between opacity-70">
                    <h3 className="text-[18px] font-bold m-0 text-black ">Handbook</h3>
                    <SearchBar label={false} className="flex-grow-0 !p-0 w-auto dark:text-white" base={'handbook'} />
                </div>
                <p className="text-[14px] m-0 mt-2 dark:text-white">
                    We're open source and operate in public as much as we can.
                </p>
                <ol className="list-none m-0 p-0 md:grid grid-rows-6 grid-cols-2 grid-flow-col mt-5">
                    {menu.map(({ title, url }: HandbookNav, index) => {
                        return (
                            <li key={title}>
                                <Link
                                    className="rounded px-2 py-2.5 h-full hover:bg-tan/50 flex items-center space-x-2 relative active:top-[1px] active:scale-[.99]"
                                    to={url}
                                >
                                    <span className="text-[14px] text-black/30 text-center leading-none font-semibold dark:text-white w-4 flex items-center">
                                        {index + 1}.
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
    const { teamMembers, jobs, sidebars } = useStaticQuery(query)

    const handbookMenu = sidebars.childSidebarsJson.handbook
        .slice(1, sidebars.childSidebarsJson.handbook.length)
        .map(({ name, url, children }: { name: string; url: string; children: { name: string; url: string }[] }) => {
            return {
                title: name,
                url: url || children.filter(({ url }) => url)[0].url,
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
                            <CallToAction to="/handbook/company/story" className="mt-3 !px-12">
                                Read our story
                            </CallToAction>
                        </div>
                        <div className="border-t border-gray-accent-light border-dashed">
                            <div className="grid sm:grid-cols-2 sm:divide-x sm:divide-y-0 divide-y divide-dashed divide-gray-accent-light max-w-3xl mx-auto xl:max-w-auto">
                                <Block title="Team" cta={{ url: '/handbook/company/team', label: 'Meet the team' }}>
                                    <p className="m-0 text-[14px] dark:text-white">
                                        Our <strong>{teamMembers.totalCount} team members</strong> work from{' '}
                                        <strong>{teamMembers.group.length - 1} countries</strong>. Some travel
                                        full-time.
                                    </p>
                                </Block>
                                <Block title="Careers" cta={{ url: '/careers', label: 'Explore careers' }}>
                                    <p className="m-0 text-[14px] dark:text-white">
                                        We're currently hiring for <strong>{jobs.totalCount} roles</strong>. We're
                                        unlike any company you've ever worked for.
                                    </p>
                                </Block>
                            </div>
                        </div>
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
        jobs: allJobs {
            totalCount
        }
        sidebars: file(absolutePath: { regex: "//sidebars/sidebars.json$/" }) {
            childSidebarsJson {
                handbook {
                    children {
                        name
                        url
                    }
                    name
                    url
                }
            }
        }
    }
`

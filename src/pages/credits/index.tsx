import React, { Fragment, useRef, useState } from 'react'
import SEO from 'components/seo'
import Wizard from 'components/Wizard'
import { CallToAction } from 'components/CallToAction'
import { productMenu } from '../../navs'
import * as Icons from '@posthog/icons'
import Link from 'components/Link'
import { IconBold, IconLink } from 'components/OSIcons'
import TeamMember from 'components/TeamMember'
import { useApp } from '../../context/App'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { graphql, useStaticQuery } from 'gatsby'
import CloudinaryImage from 'components/CloudinaryImage'
import { CUSTOMER_COUNT } from '../../constants'

type FieldsetItem = {
    label: string
    value: string | number | React.ReactNode
    url?: string
}

type Fieldset = {
    legend: string
    items: FieldsetItem[]
    showInCondensed: boolean
    layoutStyle: 'simple' | 'table'
}

export default function Credits({ pageContext }: { pageContext?: { buildTime?: string } }): JSX.Element {
    const { focusedWindow, updateWindow, getDesktopCenterPosition } = useApp()
    const [isExpanded, setIsExpanded] = useState(false)

    const {
        team: { totalCount },
        allTeams,
    } = useStaticQuery(teamQuery)

    const [activeProfile, setActiveProfile] = useState<any>(null)

    const teamSize = totalCount - 1

    const handleMoreInfo = () => {
        if (focusedWindow) {
            const currentWidth = focusedWindow.size.width
            const currentHeight = focusedWindow.size.height

            // Calculate new dimensions
            const newWidth = currentWidth * 2
            const newHeight = currentHeight + 200

            // Check bounds - ensure window doesn't exceed screen limits
            const maxWidth = Math.min(newWidth, window.innerWidth * 0.9)
            const maxHeight = Math.min(newHeight, window.innerHeight * 0.9)

            // Update the window size and expand the view
            updateWindow(focusedWindow, {
                size: {
                    width: maxWidth,
                    height: maxHeight,
                },
                position: getDesktopCenterPosition({ width: maxWidth, height: maxHeight }),
            })

            setIsExpanded(true)
        }
    }

    const allSections: Fieldset[] = [
        {
            legend: 'Company',
            showInCondensed: false,
            layoutStyle: 'table',
            items: [
                { label: 'Established', value: 'January 2020' },
                { label: 'Employees', value: teamSize },
                { label: 'Small teams', value: allTeams.nodes.length },
                { label: 'Customers', value: CUSTOMER_COUNT.toLocaleString() },
                { label: 'Revenue', value: 'Lots' },
                { label: 'Funding', value: '$107,000,000' },
                {
                    label: 'Locations',
                    value: (
                        <>
                            London, UK
                            <br />
                            San Francisco, CA
                        </>
                    ),
                },
            ],
        },
        {
            legend: 'Website',
            showInCondensed: false,
            layoutStyle: 'table',
            items: [
                { label: 'Framework', value: 'Gatsby', url: 'https://gatsbyjs.com' },
                { label: 'Hosting', value: 'Vercel', url: 'https://vercel.com' },
                { label: 'Assets', value: 'Cloudinary', url: 'https://cloudinary.com' },
                { label: 'Search', value: 'Algolia', url: 'https://algolia.com' },
                { label: 'AI', value: 'Inkeep', url: 'https://inkeep.com' },
                { label: 'CMS', value: 'Strapi', url: 'https://strapi.io' },
                { label: 'Web analytics', value: 'PostHog', url: '/web-analytics' },
                { label: 'Product analytics', value: 'PostHog', url: '/product-analytics' },
                { label: 'Feature flags', value: 'PostHog', url: '/feature-flags' },
                { label: 'Surveys', value: 'PostHog', url: '/surveys' },
            ],
        },
        {
            legend: 'Credits',
            showInCondensed: true,
            layoutStyle: isExpanded ? 'table' : 'simple',
            items: [
                {
                    label: 'Design',
                    value: <TeamMember name="Cory Watilo" />,
                },
                {
                    label: 'Graphics',
                    value: <TeamMember name="Lottie Coxon" />,
                },
                {
                    label: 'Development',
                    value: (
                        <>
                            <TeamMember name="Eli Kinsey" />
                            <br />
                            <TeamMember name="Cory Watilo" />
                        </>
                    ),
                },
                {
                    label: 'Inspiration',
                    value: (
                        <>
                            Apple, Inc.
                            <br />
                            Microsoft, Inc.
                            <br />
                            1995-1998
                        </>
                    ),
                },
            ],
        },
    ]

    const sectionsToShow = isExpanded ? allSections : allSections.filter((section) => section.showInCondensed)

    const renderFieldset = (fieldset: Fieldset, index: number) => {
        if (fieldset.layoutStyle === 'simple') {
            return (
                <fieldset className="border-none w-full max-w-sm mx-0 mt-4 mb-6 p-0" key={index}>
                    <legend className="text-center bg-transparent font-medium text-secondary pb-1">
                        {fieldset.legend}
                    </legend>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm pt-2">
                        {fieldset.items.map((item, itemIndex) => (
                            <Fragment key={itemIndex}>
                                <dt>{item.label}</dt>
                                <dd className="font-medium">{item.value}</dd>
                            </Fragment>
                        ))}
                    </dl>
                </fieldset>
            )
        } else {
            return (
                <fieldset className="border-none mb-2 w-full max-w-md mx-0 py-2 p-0" key={index}>
                    <legend className="bg-transparent font-bold text-secondary">{fieldset.legend}</legend>
                    <dl className="grid grid-cols-2 text-sm border border-primary bg-primary rounded">
                        {fieldset.items.map((item, itemIndex) => (
                            <Fragment key={itemIndex}>
                                <dt className="p-2 border-t border-primary first:border-t-0">{item.label}</dt>
                                <dd className="p-2 border-t border-primary text-right [&:nth-child(2)]:border-t-0 font-medium">
                                    {item.url ? <Link to={item.url}>{item.value}</Link> : item.value}
                                </dd>
                            </Fragment>
                        ))}
                    </dl>
                </fieldset>
            )
        }
    }

    return (
        <>
            <SEO
                title="About this website"
                description="PostHog is the only product analytics platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/product-analytics.jpg`}
            />
            <Wizard>
                <div className="bg-accent h-full">
                    <ScrollArea>
                        <div className="flex flex-col items-center p-6">
                            <div className="flex flex-col items-center w-full">
                                <figure
                                    data-skin="secondary"
                                    className="aspect-[600/315] bg-primary w-full border border-primary flex justify-center items-center mb-4 rounded max-w-md"
                                >
                                    <CloudinaryImage
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/default_a3b46f408e.png"
                                        className="w-full"
                                    />
                                </figure>
                                <h1 className="text-lg mb-1">PostHog.com</h1>
                                <p className="text-sm text-secondary">Updated {pageContext?.buildTime || 'just now'}</p>
                            </div>

                            {sectionsToShow.map((fieldset, index) => renderFieldset(fieldset, index))}

                            {!isExpanded && (
                                <div className="mb-4">
                                    <CallToAction type="secondary" size="xs" onClick={handleMoreInfo}>
                                        More info
                                    </CallToAction>
                                </div>
                            )}

                            <p className="text-sm text-secondary">
                                <Link
                                    to="https://github.com/posthog/posthog.com"
                                    state={{ newWindow: true }}
                                    className="underline"
                                >
                                    Source code
                                </Link>
                            </p>

                            <p className="text-xs text-secondary">
                                &copy;{new Date().getFullYear()} PostHog Incorporated
                            </p>
                        </div>
                    </ScrollArea>
                </div>
            </Wizard>
        </>
    )
}

const teamQuery = graphql`
    query CreditsTeamQuery {
        team: allSqueakProfile(
            filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }
            sort: { fields: startDate, order: ASC }
        ) {
            totalCount
        }
        allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) {
            nodes {
                id
                name
                miniCrest {
                    gatsbyImageData(width: 20, height: 20)
                }
            }
        }
    }
`

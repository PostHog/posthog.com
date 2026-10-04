import React from 'react'
import Link from 'components/Link'
import slugify from 'slugify'
import CloudinaryImage from 'components/CloudinaryImage'
import OSButton from 'components/OSButton'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import { ResponsiveImage } from 'components/Image'
import careersSmallTeamsJson from '@data/people-careers-small-teams.json'
import type { CareersSmallTeams } from '~/data-layer/queries/people'

const { teams, memberCount: profilesTotalCount } = careersSmallTeamsJson as CareersSmallTeams

export const SmallTeams = () => {
    // NOTE: Eventually we should round to the hundreds, but this is fine for now, we're not there yet :)
    const roundedProfilesTotalCount = Math.floor(profilesTotalCount / 10) * 10

    return (
        <section className="@container mt-12">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mt-0 mb-4">
                    Join a startup <em className="text-red dark:text-yellow">within a startup</em>
                </h2>
                <div className="@2xl:columns-2 gap-8 [orphans:3]">
                    <p className="mt-0">
                        Starting a job at a company of {roundedProfilesTotalCount}+ people can be intimidating!
                    </p>
                    <p>
                        With our <Link to="/handbook/company/small-teams">small teams</Link> structure, it's like
                        working at a startup <em>within</em> a startup. This allows each team to operate as autonomously
                        as possible.
                    </p>

                    <p>
                        Many of our team members are former founders. Here they can focus on building great products
                        without the distraction of running payroll, fundraising, etc - while still enjoying huge upside
                        potential.
                    </p>
                </div>
            </div>

            <fieldset className="rounded [&_legend]:!bg-transparent">
                <legend>Our small teams</legend>
                <div className="@xl:columns-2 @3xl:columns-3 text-center -mx-4 md:mx-0 md:gap-x-8">
                    {teams
                        .sort((a, b) => a.name.localeCompare(b.name))
                        .map(({ id, name, slug, miniCrest }) => {
                            const gatsbyImageMiniCrest = miniCrest ?? undefined
                            return (
                                <OSButton
                                    asLink
                                    to={`/teams/${slug}`}
                                    key={id}
                                    align="left"
                                    width="full"
                                    zoomHover="md"
                                    size="md"
                                    state={{ newWindow: true }}
                                >
                                    <div className="size-8">
                                        {gatsbyImageMiniCrest ? (
                                            <ResponsiveImage
                                                image={gatsbyImageMiniCrest}
                                                alt={`${name} Team`}
                                                className="size-8"
                                            />
                                        ) : (
                                            <CloudinaryImage
                                                alt={`${name} Team`}
                                                className="size-8"
                                                src="https://res.cloudinary.com/dmukukwp6/image/upload/crest_mini_default_def12aa14a.png"
                                            />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm md:text-[15px] my-0 pt-1.5 md:pt-0 leading-snug text-primary dark:text-primary-dark font-semibold">
                                            {name} Team
                                        </h3>
                                    </div>
                                </OSButton>
                            )
                        })}
                </div>
            </fieldset>
        </section>
    )
}

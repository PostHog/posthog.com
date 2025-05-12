import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import slugify from 'slugify'
import CloudinaryImage from 'components/CloudinaryImage'
import { slugifyTeamName } from 'lib/utils'
import OSButton from 'components/OSButton'

export const SmallTeams = () => {
    const {
        allTeams,
        profiles: { totalCount: profilesTotalCount },
    } = useStaticQuery(graphql`
        {
            allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) {
                nodes {
                    id
                    name

                    miniCrest {
                        gatsbyImageData(width: 64, height: 64)
                    }
                }
            }
            profiles: allSqueakProfile(filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }) {
                totalCount
            }
        }
    `)

    // NOTE: Eventually we should round to the hundreds, but this is fine for now, we're not there yet :)
    const roundedProfilesTotalCount = Math.floor(profilesTotalCount / 10) * 10

    return (
        <div className="@container">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">
                        Join a startup <em className="text-red dark:text-yellow">within a startup</em>
                    </h2>
                    <div className="max-w-xl">
                        <p>Starting a job at a company of {roundedProfilesTotalCount}+ people can be intimidating!</p>
                        <p>
                            With our <Link to="/handbook/company/small-teams">small teams</Link> structure, it's like
                            working at a startup <em>within</em> a startup. This allows each team to operate as
                            autonomously as possible.
                        </p>

                        <p>
                            Many of our team members are former founders. Here they can focus on building great products
                            without the distraction of running payroll, fundraising, etc - while still enjoying huge
                            upside potential.
                        </p>
                    </div>
                </div>

                <fieldset>
                    <legend>Our small teams</legend>
                    <div className="grid @xl:grid-cols-2 @3xl:grid-cols-3 text-center -mx-4 md:mx-0 md:gap-x-8">
                        {allTeams.nodes.map(({ id, name, miniCrest }) => {
                            const gatsbyImageMiniCrest = getImage(miniCrest)
                            return (
                                <OSButton
                                    to={`/teams/${slugifyTeamName(name)}`}
                                    key={id}
                                    variant="ghost"
                                    align="left"
                                    width="full"
                                    zoomHover="md"
                                >
                                    <div className="size-8">
                                        {gatsbyImageMiniCrest ? (
                                            <GatsbyImage
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
        </div>
    )
}

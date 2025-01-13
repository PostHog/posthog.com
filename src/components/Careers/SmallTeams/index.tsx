import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import slugify from 'slugify'
import CloudinaryImage from 'components/CloudinaryImage'

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
        <div className="px-4 max-w-7xl mx-auto mb-6 md:mb-12 flex justify-center 2xl:px-8">
            <div className="flex flex-col md:flex-row md:gap-8 w-full">
                <div className="flex-1">
                    <h2 className="text-5xl font-bold mb-4">
                        Join a startup <em className="text-red dark:text-yellow block">within a startup</em>
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

                <div>
                    <h3 className="text-base font-bold mb-2 md:ml-4 pt-1">Our small teams</h3>
                    <div className="grid grid-cols-2 text-center max-w-xl -mx-4 md:mx-0 md:gap-x-8">
                        {allTeams.nodes.map(({ id, name, miniCrest }) => {
                            const gatsbyImageMiniCrest = getImage(miniCrest)
                            return (
                                <Link
                                    to={`/teams/${slugify(name.toLowerCase().replace('ops', ''), {
                                        remove: /and/,
                                    })}`}
                                    key={id}
                                    className="items-start md:items-center text-left flex gap-2 w-full px-2 py-1 rounded-md border border-b-3 hover:bg-white/50 hover:dark:bg-accent-dark border-transparent md:hover:border-light dark:md:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
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
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

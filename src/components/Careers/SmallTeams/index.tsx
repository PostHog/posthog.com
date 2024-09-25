import React from 'react'
import InterviewProcess from 'components/Job/InterviewProcess'
import { StaticImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import slugify from 'slugify'

export const SmallTeams = () => {
  const { allTeams } = useStaticQuery(graphql`
    {
        allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, crest: { publicId: { ne: null } } }) {
            nodes {
                id
                name
                leadProfiles {
                    data {
                        id
                    }
                }
                crest {
                    gatsbyImageData(width: 200, height: 200, placeholder: BLURRED)
                }
            }
        }
    }
`)

  return (
    <div className="px-4 max-w-7xl mx-auto my-12">

      <div className="grid md:grid-cols-2 gap-8">

        <div>
          <div className="opacity-60 mb-2">Small teams</div>
          <h2 className="text-3xl xl:text-4xl font-bold mb-2">Join a startup <em className="text-red dark:text-yellow">within a startup</em></h2>
          <div className="max-w-md">
            <p>Joining a company of 50+ people can be intimidating! With our <Link to="/handbook/company/small-teams">small teams structure</Link>, it's like operating a startup <em>within</em> a startup.</p>

            <p>Many of our team members are former founders. At PostHog, they enjoy huge upside potential without the distraction of running payroll, fundraising, and all the other stuff that comes with running a startup <em>outside</em> of building a product.</p>

            <p>We adjust our small teams periodically based on the products we're building.</p>
          </div>
        </div>

        <div>
          <h3 className="md:hidden text-base font-bold mb-2">Small teams</h3>
          <div className="grid grid-cols-2 text-center max-w-xl">
            {allTeams.nodes.map(({ id, name, profiles, crest, leadProfiles }) => (
              <Link
                to={`/teams/${slugify(name.toLowerCase().replace('ops', ''), {
                  remove: /and/,
                })}`}
                key={id}
                className="items-center text-left flex gap-2 w-full px-2 py-1 rounded-md border border-b-3 hover:bg-white/50 hover:dark:bg-accent-dark border-transparent md:hover:border-light dark:md:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
              >
                <GatsbyImage image={getImage(crest)} alt={`${name} Team`} className="w-16" />
                <div>
                  <h3 className="text-[15px] my-0 leading-snug text-primary dark:text-primary-dark font-semibold">{name} Team</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>


    </div >
  )
}

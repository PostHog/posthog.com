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

      <div className="grid grid-cols-3 gap-8">

        <div>
          <div className="opacity-60 mb-2">Small teams</div>
          <h2 className="text-3xl xl:text-4xl font-bold mb-2">Join a startup <em className="text-red dark:text-yellow">within a startup</em></h2>
          <div className="max-w-md">
            <p>Joining a company of 50+ people can be intimidating! With our <Link to="/handbook/company/small-teams">small teams structure</Link>, it's like operating a startup <em>within</em> a startup.</p>

            <p>Many of our team members are former founders. At PostHog, they enjoy huge upside potential without the distraction of running payroll, fundraising, and all the other stuff that comes with running a startup <em>outside</em> of building a product.</p>

            <p>We adjust our small teams periodically based on the products we're building.</p>
          </div>
        </div>

        <div className="col-span-2 grid grid-cols-2 text-center border border-light dark:border-dark bg-accent dark:bg-accent-dark rounded divide-x divide-y divide-border dark:divide-border-dark">
          {allTeams.nodes.map(({ id, name, profiles, crest, leadProfiles }) => (
            <Link
              to={`/teams/${slugify(name.toLowerCase().replace('ops', ''), {
                remove: /and/,
              })}`}
              key={id}
              className="px-2 py-1 items-center text-left hover:scale-[1.01] active:scale-[1] relative hover:top-[-.5px] active:top-px flex gap-2"
            >
              <GatsbyImage image={getImage(crest)} alt={`${name} Team`} className="w-16" />
              <div>
                <h3 className="text-base my-2 leading-snug">{name} Team</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>


    </div >
  )
}

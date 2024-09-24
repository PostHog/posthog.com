import React from 'react'
import Tooltip from 'components/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import ReactCountryFlag from 'react-country-flag'
import Stickers from 'components/ProfileStickers'
import useTeam from 'hooks/useTeam'

const TeamMemberLink = (person) => {
  const { firstName, lastName, country, companyRole, pineappleOnPizza, id, squeakId, avatar, teams } = person ?? {}
  const { team } = useTeam({ teamName: name })

  const leadProfiles = team?.attributes?.leadProfiles

  const teamName = teams?.data?.[0]?.attributes?.name
  function isTeamLead(id) {
    return leadProfiles?.data?.some(({ id: leadID }) => leadID === id)
  }

  return (
    <div className="relative inline-block">
      <a href={person && `/community/profiles/${squeakId}`} className="flex flex-col gap-2 items-center">
        <div className="border-2 border-light dark:border-dark p-0.5 bg-white dark:bg-dark rounded-full">
          <div className="size-36 rounded-full overflow-hidden mx-auto">
            {person ? (
              <img src={avatar?.formats?.thumbnail?.url} alt={`${firstName} ${lastName}`} className="size-36 bg-orange" />
            ) : (
              <StaticImage
                alt=""
                width={36}
                src="../../pages-content/images/hog-9.png"
                className="size-36 bg-orange"
              />
            )}
          </div>
        </div>
        <span>{person ? [firstName, lastName].filter(Boolean).join(' ') : name}</span>
      </a>

      <div className="text-sm">
        <div>
          {person.companyRole && `${person.companyRole}`}
        </div>
        <div className="text-[13px] opacity-75">
          {isTeamLead ? "Team lead, " : ""}
          {teamName} Team
        </div>
      </div>


      <div className="mt-2 flex space-x-1 justify-center">
        <Stickers
          country={country}
          location={person.location}
          isTeamLead={isTeamLead}
          pineappleOnPizza={pineappleOnPizza}
        />
      </div>
    </div>
  )
}

const TeamMember: React.FC<{ name: string }> = ({ name }) => {
  const {
    profiles: { nodes },
  } = useStaticQuery(graphql`
      {
          profiles: allSqueakProfile {
              nodes {
                  avatar {
                      formats {
                          thumbnail {
                              url
                          }
                      }
                  }
                  firstName
                  lastName
                  squeakId
                  companyRole
                  location
                  country
                  teams {
                      data {
                          attributes {
                              name
                          }
                      }
                  }
              }
          }
      }
  `)

  const person = nodes.find(
    ({ firstName, lastName }) => `${firstName} ${lastName}`.toLowerCase() === name.toLowerCase()
  )

  return person ? <TeamMemberLink {...person} /> : null
}

const MegaQuote: React.FC = () => {
  return (
    <div className="px-4">
      <div className="max-w-7xl mx-auto p-4 lg:p-8 rounded-md bg-accent dark:bg-accent-dark flex flex-col-reverse gap-4 items-center lg:items-start lg:flex-row">
        <aside className="min-w-64 max-w-full text-center">
          <TeamMember name="Raquel Smith" />
        </aside>
        <div className="flex-1 p-6 lg:p-8 bg-white dark:bg-dark rounded-lg flex-col-reverse lg:flex-col [&_p]:text-lg [&_p]:mb-3 [&_p:last-child]:mb-0">
          <p>At PostHog I'm given the trust to work on things that I think matter for the business and our customers.</p>
          <p>There are <strong>no politics, no micromanaging,</strong> and <strong>pretty extreme amounts of autonomy</strong> for every employee.</p>
          <p>I've never worked at a company that can ship so well and so fast. The people here are of incredible caliber, and management just gets out of the way (while also being helpful) so everyone can just can do their job in the best way possible.</p>
          <p><strong>Basically everything you hate</strong> about your job <strong>is the exact opposite here at PostHog. It's the weirdest, coolest place I've ever worked.</strong></p>
        </div>
      </div>
    </div>
  )
}

export default MegaQuote
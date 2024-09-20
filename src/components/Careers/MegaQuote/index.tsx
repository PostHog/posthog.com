import React from 'react'
import Tooltip from 'components/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import ReactCountryFlag from 'react-country-flag'
import Stickers from 'components/ProfileStickers'

const TeamMemberLink = (person) => {
  const { firstName, lastName, country, companyRole, pineappleOnPizza, isTeamLead, id, squeakId, avatar } = person ?? {}
  return (
    <span className="relative inline-block">
      <a href={person && `/community/profiles/${squeakId}`}>

        <div className="size-48 rounded-full overflow-hidden flex justify-end items-end mx-auto">
          {person ? (
            <img src={avatar?.formats?.thumbnail?.url} alt={`${firstName} ${lastName}`} className="size-48 bg-orange" />
          ) : (
            <StaticImage
              alt=""
              width={40}
              src="../../pages-content/images/hog-9.png"
              className="size-48 bg-orange"
            />
          )}
        </div>
        {person ? [firstName, lastName].filter(Boolean).join(' ') : name}
      </a>

      {person && (
        <>
          <div className="text-sm">
            <div>
              {person.companyRole && `${person.companyRole}`}
            </div>
            <div>
              {person.isTeamLead ? "Team lead, " : ""}
              TEAM NAME {/* pull first value if they're assigned to multiple teams */}
            </div>
          </div>

          <div>
            <Stickers
              pineappleOnPizza={pineappleOnPizza}
            />

            pineapple on pizza preference text

          </div>

        </>
      )}

      {person && person.location && (
        <div>
          <Stickers
            country={country}
          />
          {person.location}
        </div>
      )}


      ---



      <Stickers
        isTeamLead={isTeamLead}
        pineappleOnPizza={pineappleOnPizza}
      />
    </span>
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
    <div className="max-w-7xl mx-auto p-4 lg:p-8 rounded-lg bg-accent dark:bg-accent-dark flex flex-col-reverse gap-4 items-center lg:items-start lg:flex-row">
      <aside className="min-w-80 max-w-full text-center">
        <TeamMember name="Raquel Smith" />
      </aside>
      <div className="flex-1 p-6 lg:p-8 bg-white dark:bg-dark rounded-lg flex-col-reverse lg:flex-col [&_p]:text-lg [&_p:last-child]:mb-0">
        <p>At PostHog I'm given the trust to work on things that I think matter for the business and our customers.</p>
        <p>There are <strong>no politics, no micromanaging,</strong> and <strong>pretty extreme amounts of autonomy</strong> for every employee.</p>
        <p>I've never worked at a company that can ship so well and so fast. The people here are of incredible caliber, and management just gets out of the way (while also being helpful) so everyone can just can do their job in the best way possible.</p>
        <p><strong>Basically everything you hate</strong> about your job <strong>is the exact opposite here at PostHog. It's the weirdest, coolest place I've ever worked.</strong></p>
      </div>
    </div>
  )
}

export default MegaQuote
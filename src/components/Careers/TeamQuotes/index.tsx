import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Stickers from 'components/ProfileStickers'
import slugify from 'slugify'
import Link from 'components/Link'
import Masonry from 'react-masonry-css'

const TeamMemberLink = (person) => {
  const { firstName, lastName, country, startDate, pineappleOnPizza, squeakId, avatar, teams, leadTeams, quotes, color } =
    person ?? {}

  const teamName = teams?.data?.[0]?.attributes?.name
  const isTeamLead = leadTeams.data.length > 0
  const teamURL = `/teams/${slugify(teamName, { lower: true })}`

  return (
    <div className="flex flex-col items-center mb-8 xl:mb-12">
      <div className="bg-white dark:bg-accent-dark dark:border dark:border-dark rounded-md px-6 py-4 mb-4 shadow-lg">
        {quotes.map((quote) => (
          <div key={quote.id}>
            <p dangerouslySetInnerHTML={{ __html: quote.quote }} className="mb-0 text-center" />
          </div>
        ))}
      </div>

      <div className={`p-0.5 leading-[0] bg-white dark:bg-accent-dark rounded-full border-2 border-light relative dark:border-dark hover:border-${color ? color : 'red'} dark:hover:border-${color ? color : 'yellow'} scale-100 hover:scale-[1.03] active:scale-[.99] active:top-[2px] transition-transform duration-200`}>
        <Link href={`/community/profiles/${squeakId}`} className="bg-red inline-block size-20 rounded-full overflow-hidden">
          {person ? (
            <img
              src={avatar?.formats?.thumbnail?.url}
              alt={`${firstName} ${lastName}`}
              className={`size-20 ${color ? `bg-${color}` : 'bg-orange'}`}
            />
          ) : (
            <CloudinaryImage
              alt=""
              width={20}
              src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages-content/images/hog-9.png"
              className="size-20 bg-orange"
            />
          )}
        </Link>
      </div>

      <div className="leading-tight text-center mt-1">
        <Link href={`/community/profiles/${squeakId}`} className="text-red dark:text-yellow font-semibold inline-block">{person ? [firstName, lastName].filter(Boolean).join(' ') : name}</Link><br />
        <span className="text-sm opacity-75">{person.companyRole && `${person.companyRole}`}</span>
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
                  startDate
                  leadTeams {
                      data {
                          id
                      }
                  }
                  teams {
                      data {
                          attributes {
                              name
                          }
                      }
                  }
                  quotes {
                          id
                          quote
                  }
                  color
              }
          }
      }
  `)

  const person = nodes.find(
    ({ firstName, lastName }) => `${firstName} ${lastName}`.toLowerCase() === name.toLowerCase()
  )

  return person ? <TeamMemberLink {...person} /> : null
}

const TeamQuotes: React.FC = () => {
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-center text-4xl xl:text-5xl mb-8">Nice things we didn't coerce anyone into saying</h2>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-8 xl:-ml-12 w-auto"
        columnClassName="pl-8 xl:pl-12 bg-clip-padding"
      >
        <TeamMember name="Lottie Coxon" />
        <TeamMember name="Paul D'Ambra" />
        <TeamMember name="Raquel Smith" />
        <TeamMember name="Charles Cook" />
        <TeamMember name="Cory Watilo" />
        <TeamMember name="Ian Vanagas" />
      </Masonry>
    </section>
  )
}

export default TeamQuotes

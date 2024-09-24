import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import Stickers from 'components/ProfileStickers'
import slugify from 'slugify'
import Link from 'components/Link'

const TeamMemberLink = (person) => {
  const { firstName, lastName, country, startDate, pineappleOnPizza, squeakId, avatar, teams, leadTeams, quotes } =
    person ?? {}

  const teamName = teams?.data?.[0]?.attributes?.name
  const isTeamLead = leadTeams.data.length > 0
  const teamURL = `/teams/${slugify(teamName, { lower: true })}`

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white dark:bg-accent-dark rounded px-6 py-4 mb-4 shadow-lg">
        {quotes.map((quote) => (
          <div key={quote.id}>
            <p dangerouslySetInnerHTML={{ __html: quote.quote }} className="mb-0 text-center" />
          </div>
        ))}
      </div>

      <div className="p-0.5 bg-white dark:bg-accent-dark rounded-full border-2 border-light dark:border-dark">
        <div className="bg-red size-20 rounded-full overflow-hidden">
          {person ? (
            <img
              src={avatar?.formats?.thumbnail?.url}
              alt={`${firstName} ${lastName}`}
              className="size-20 bg-orange"
            />
          ) : (
            <StaticImage
              alt=""
              width={20}
              src="../../pages-content/images/hog-9.png"
              className="size-20 bg-orange"
            />
          )}
        </div>
      </div>

      <div className="leading-tight text-center mt-1">
        <Link href={person.url} className="text-red dark:text-yellow font-semibold inline-block">{person ? [firstName, lastName].filter(Boolean).join(' ') : name}</Link><br />
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
              }
          }
      }
  `)

  const person = nodes.find(
    ({ firstName, lastName }) => `${firstName} ${lastName}`.toLowerCase() === name.toLowerCase()
  )

  return person ? <TeamMemberLink {...person} /> : null
}

const teamQuotesData = [
  {
    image: (
      <StaticImage
        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1688575125/paul_64ee2de98e.png"
        alt="Paul"
        width={80}
        height={80}
        className=""
      />
    ),
    name: "Paul",
    role: "Product Manager",
    url: "/handbook/team/paul",
    quote: "I wake up so excited to get to work that sometimes I pinch myself to make sure I'm not dreaming. The combination of high expectations, high trust, high autonomy, and high reward is so unique and drives me to improve every day.",
  },
  {
    image: (
      <StaticImage
        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1688575125/paul_64ee2de98e.png"
        alt="Paul"
        width={80}
        height={80}
        className=""
      />
    ),
    name: "Paul",
    role: "Product Manager",
    url: "/handbook/team/paul",
    quote: "I wake up so excited to get to work that sometimes I pinch myself to make sure I'm not dreaming. The combination of high expectations, high trust, high autonomy, and high reward is so unique and drives me to improve every day.",
  },
  {
    image: (
      <StaticImage
        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1688575125/paul_64ee2de98e.png"
        alt="Paul"
        width={80}
        height={80}
        className=""
      />
    ),
    name: "Paul",
    role: "Product Manager",
    url: "/handbook/team/paul",
    quote: "I wake up so excited to get to work that sometimes I pinch myself to make sure I'm not dreaming. The combination of high expectations, high trust, high autonomy, and high reward is so unique and drives me to improve every day.",
  },
  {
    image: (
      <StaticImage
        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1688575125/paul_64ee2de98e.png"
        alt="Paul"
        width={80}
        height={80}
        className=""
      />
    ),
    name: "Paul",
    role: "Product Manager",
    url: "/handbook/team/paul",
    quote: "I wake up so excited to get to work that sometimes I pinch myself to make sure I'm not dreaming. The combination of high expectations, high trust, high autonomy, and high reward is so unique and drives me to improve every day.",
  },
]

const TeamQuotes: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 pt-8 pb-12 grid gap-12 xl:gap-16">
      <h2 className="text-center text-4xl mb-2">Things we definitely didn't coerce anyone into saying...</h2>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        <TeamMember name="Lottie Coxon" />
        <TeamMember name="Paul D'Ambra" />
        <TeamMember name="Raquel Smith" />
        <TeamMember name="Charles Cook" />
        <TeamMember name="Cory Watilo" />
        <TeamMember name="Ian Vanagas" />
      </div>
    </section>
  )
}

export default TeamQuotes

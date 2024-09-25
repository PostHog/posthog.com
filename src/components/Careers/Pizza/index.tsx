import React from 'react'
import InterviewProcess from 'components/Job/InterviewProcess'
import { StaticImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import Tooltip from 'components/Tooltip'
import slugify from 'slugify'
import CloudinaryImage from 'components/CloudinaryImage'

export const Pizza = () => {
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
                    miniCrest {
                        gatsbyImageData(width: 64, height: 64, placeholder: BLURRED)
                    }
                }
            }
        }
    `)

  return (
    <div className="px-4 max-w-7xl mx-auto mb-12 flex justify-center">
      <div className="inline-flex flex-col md:flex-row md:gap-8">
        <div>
          <div className="text-lg opacity-70 mb-2">Speaking of small teams...</div>
          <h2 className="text-4xl font-bold mb-2">
            PostHog small teams 🤝 pizza
          </h2>
          <div className="max-w-md">
            <p>
              Our small teams meet up in various places around the world. Pizza is often involved.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-2">Breakdown of small teams and their pineapple on pizza preference</h3>

        </div>


      </div>
    </div>
  )
}

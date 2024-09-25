import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import slugify from 'slugify'
import { Link } from 'gatsby'
import { StickerPineapple, StickerPineappleYes, StickerPineappleNo } from 'components/Stickers/Index'
import Masonry from 'react-masonry-css'
import { StaticImage } from 'gatsby-plugin-image'

const PizzaBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white dark:bg-black border-8 border-white dark:border-dark rounded-md shadow-md overflow-hidden mb-2 xl:mb-6">
      {children}
    </div>
  )
}

export const Pizza = () => {
  const { allTeams } = useStaticQuery(graphql`
    {
      allTeams: allSqueakTeam(filter: { name: { ne: "Hedgehogs" }, miniCrest: { publicId: { ne: null } } }) {
        nodes {
          id
          name
          miniCrest {
            gatsbyImageData(width: 40, height: 40)
          }
          profiles {
            data {
              attributes {
                pineappleOnPizza
              }
            }
          }
        }
      }
    }
  `)

  const teamsWithPineapplePercentage = allTeams.nodes.map(team => {
    const teamLength = team.profiles?.data?.length || 0
    const pineappleLovers = team.profiles?.data?.filter(
      ({ attributes }) => attributes.pineappleOnPizza
    ).length || 0
    const percentage = teamLength > 0 ? (pineappleLovers / teamLength) * 100 : 0

    return {
      name: team.name,
      pineapplePercentage: percentage.toFixed(1)
    }
  })

  const groupedTeams = {
    moreThan50: [],
    exactly50: [],
    lessThan50: []
  }

  teamsWithPineapplePercentage.forEach(team => {
    const percentage = parseFloat(team.pineapplePercentage)
    if (percentage > 50) {
      groupedTeams.moreThan50.push(team)
    } else if (percentage === 50) {
      groupedTeams.exactly50.push(team)
    } else {
      groupedTeams.lessThan50.push(team)
    }
  })

  // Sort teams within each group by percentage (highest to lowest)
  Object.keys(groupedTeams).forEach(key => {
    groupedTeams[key].sort((a, b) => parseFloat(b.pineapplePercentage) - parseFloat(a.pineapplePercentage))
  })

  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1
  };

  const pizzaImages = [
    <StaticImage src="https://res.cloudinary.com/dmukukwp6/image/upload/20220926_204026_a1ca58e1cc.jpg" alt="Pizza 4" />,
    <StaticImage src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20230627_171655584_PORTRAIT_364f944289.jpg" alt="Pizza 2" />,
    <StaticImage src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20210929_183537661_PORTRAIT_750e977998.jpg" alt="Pizza 4" />,
    <StaticImage src="https://res.cloudinary.com/dmukukwp6/image/upload/20210902_203941_4af46118e2.jpg" alt="Pizza 4" />,
    <StaticImage src="https://res.cloudinary.com/dmukukwp6/image/upload/20220926_204026_a1ca58e1cc.jpg" alt="Pizza 4" />,
    <StaticImage src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20230627_171655584_PORTRAIT_364f944289.jpg" alt="Pizza 2" />,
    <StaticImage src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20210929_183537661_PORTRAIT_750e977998.jpg" alt="Pizza 4" />,
    <StaticImage src="https://res.cloudinary.com/dmukukwp6/image/upload/20210902_203941_4af46118e2.jpg" alt="Pizza 4" />,
    <StaticImage src="https://res.cloudinary.com/dmukukwp6/image/upload/20220926_204026_a1ca58e1cc.jpg" alt="Pizza 4" />,
    <StaticImage src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20230627_171655584_PORTRAIT_364f944289.jpg" alt="Pizza 2" />,
    <StaticImage src="https://res.cloudinary.com/dmukukwp6/image/upload/PXL_20210929_183537661_PORTRAIT_750e977998.jpg" alt="Pizza 4" />,
    <StaticImage src="https://res.cloudinary.com/dmukukwp6/image/upload/20210902_203941_4af46118e2.jpg" alt="Pizza 4" />,
  ];

  return (
    <div className="px-4 max-w-7xl mx-auto py-12">
      <div className="text-center">
        <div className="text-lg opacity-70 mb-2">Speaking of small teams...</div>
        <h2 className="text-4xl font-bold mb-2 flex items-center gap-2 justify-center flex-col md:flex-row leading-none">
          <StickerPineapple className="inline-block size-10" />
          Pineapple on pizza: <span className="whitespace-nowrap">a house <em className="text-red dark:text-yellow">divided</em></span>
        </h2>
        <div className="max-w-2xl mx-auto">
          <p>
            Our small teams meet up in various places around the world. Pizza is often involved. Pineapple on the pizza is <strike>optional</strike> contentious. Choose your team wisely.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 md:gap-12 pt-6 pb-12">
        <div>
          <div className="font-bold mb-4 border-b border-light dark:border-light-dark pb-2 flex gap-2">
            <StickerPineappleYes className="inline-block size-10" />
            <h3 className="text-[19px] leading-tight m-0 pt-2">Small teams who <span className="text-green">correctly agree</span> pineapple belongs on pizza</h3>
          </div>

          <ul className="list-none p-0 space-y-3">
            {groupedTeams.moreThan50.map(team => {
              const teamData = allTeams.nodes.find(node => node.name === team.name)
              const teamMiniCrest = getImage(teamData.miniCrest)
              return (
                <li key={team.name} className="">
                  <div className="flex gap-2">
                    {teamMiniCrest && (
                      <GatsbyImage
                        image={teamMiniCrest}
                        alt={`${team.name} mini crest`}
                        className="mr-2"
                      />
                    )}
                    <div className="flex-1">
                      <Link to={`/teams/${slugify(team.name.toLowerCase(), { remove: /and/ })}`} className="text-[15px] font-semibold text-primary dark:text-primary-dark hover:text-red dark:hover:text-yellow">{team.name}</Link>
                      <div className="flex gap-2 items-center -mt-1">
                        <div className="flex-1 relative h-2 w-full bg-accent dark:bg-accent-dark rounded-full">
                          <div className="absolute left-0 top-0 h-full bg-green rounded-full" style={{ width: `${team.pineapplePercentage}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{Math.round(team.pineapplePercentage)}%</span>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <div className="font-bold mb-4 border-b border-light dark:border-light-dark pb-2 flex gap-2">
            <StickerPineappleNo className="inline-block size-10" />
            <h3 className="text-[19px] leading-tight m-0 pt-2">Small teams who <span className="text-red">don't believe</span> pineapple on pizza</h3>
          </div>

          <ul className="list-none p-0 space-y-3">
            {groupedTeams.lessThan50.map(team => {
              const teamData = allTeams.nodes.find(node => node.name === team.name)
              const teamMiniCrest = getImage(teamData.miniCrest)
              return (
                <li key={team.name} className="">
                  <div className="flex gap-2">
                    {teamMiniCrest && (
                      <GatsbyImage
                        image={teamMiniCrest}
                        alt={`${team.name} mini crest`}
                        className="mr-2"
                      />
                    )}
                    <div className="flex-1">
                      <Link to={`/teams/${slugify(team.name.toLowerCase(), { remove: /and/ })}`} className="text-[15px] font-semibold text-primary dark:text-primary-dark hover:text-red dark:hover:text-yellow">{team.name}</Link>
                      <div className="flex gap-2 items-center -mt-1">
                        <div className="flex-1 relative h-2 w-full bg-accent dark:bg-accent-dark rounded-full">
                          <div className="absolute left-0 top-0 h-full bg-green rounded-full" style={{ width: `${team.pineapplePercentage}%` }}></div>
                        </div>
                        <span className="text-sm font-medium">{Math.round(team.pineapplePercentage)}%</span>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="mt-8">
            <div className="font-bold mb-4 border-b border-light dark:border-light-dark pb-2 flex gap-2">
              <StickerPineapple className="inline-block size-10" />
              <h3 className="text-[19px] leading-tight m-0 pt-2">Small teams who are <span className="text-yellow">split</span> on pineapple on pizza</h3>
            </div>

            <ul className="list-none p-0 space-y-3">
              {groupedTeams.exactly50.map(team => {
                const teamData = allTeams.nodes.find(node => node.name === team.name)
                const teamMiniCrest = getImage(teamData.miniCrest)
                return (
                  <li key={team.name} className="">
                    <div className="flex gap-2">
                      {teamMiniCrest && (
                        <GatsbyImage
                          image={teamMiniCrest}
                          alt={`${team.name} mini crest`}
                          className="mr-2"
                        />
                      )}
                      <div className="flex-1">
                        <Link to={`/teams/${slugify(team.name.toLowerCase(), { remove: /and/ })}`} className="text-[15px] font-semibold text-primary dark:text-primary-dark hover:text-red dark:hover:text-yellow">{team.name}</Link>
                        <div className="flex gap-2 items-center -mt-1">
                          <div className="flex-1 relative h-2 w-full bg-accent dark:bg-accent-dark rounded-full">
                            <div className="absolute left-0 top-0 h-full bg-yellow rounded-full" style={{ width: `${team.pineapplePercentage}%` }}></div>
                          </div>
                          <span className="text-sm font-medium">{Math.round(team.pineapplePercentage)}%</span>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
            <p className="text-sm mt-2 italic pl-14 font-medium">(You could break the tie!)</p>
          </div>
        </div>
      </div>

      <h3 className="text-3xl mb-0 text-center">Speaking of pizza...</h3>
      <div className="text-lg opacity-70 mb-6 text-center">Here are some of our creations.</div>

      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-2 xl:-ml-6 w-auto"
        columnClassName="pl-2 xl:pl-6 bg-clip-padding"
      >
        {pizzaImages.map((image, index) => (
          <PizzaBox key={index}>
            {image}
          </PizzaBox>
        ))}
      </Masonry>
    </div>
  )
}

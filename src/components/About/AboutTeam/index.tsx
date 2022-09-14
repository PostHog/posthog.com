import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { CallToAction } from 'components/CallToAction'
import { Avatar } from './Avatar'
import { graphql, useStaticQuery } from 'gatsby'
import Map from './Map'

interface DotProps {
    classes: string
}

const Dot = ({ classes }: DotProps) => {
    return (
        <div className={`absolute ${classes}`}>
            <span className="inline-flex h-4 w-4 mx-auto bg-red rounded-full relative border-[2.5px] border-solid border-white">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red opacity-75"></span>
            </span>
        </div>
    )
}

const avatarStyles = [
    { color: '#DCB1E3', className: 'right-[-22rem] top-[-2rem]', size: 'lg' },

    { color: '#FDEDC9', className: 'right-[-20rem] top-[-12rem]', size: 'md' },
    { color: '#E19D9D', className: 'right-[-11rem] bottom-[-12rem]', size: 'xl' },
    { color: '#A2B0D4', className: 'right-[-10rem] top-[-18rem]', size: 'lg' },
    { color: '#9DE1D9', className: 'left-[-26rem] top-[-18rem]', size: 'xl' },
    { color: '#B3E19D', className: 'left-[-8rem] top-[-16rem]', size: 'md' },
    { color: '#9DA4E1', className: 'left-[-20rem] bottom-[-12rem]', size: 'xl' },
    { color: '#FBBC05', className: 'left-[-24rem] bottom-[-2rem]', size: 'md' },
    { color: '#E6A9E8', className: 'left-[-6rem] bottom-[-10rem]', size: 'md' },
]

export const AboutTeam = () => {
    const { teamMembers } = useStaticQuery(query)

    return (
        <section id="team" className="py-12 px-4">
            <h3 className="text-5xl mb-4 lg:mb-1 text-center">
                We're a team of <span className="text-blue">30</span> from all over the world.
            </h3>
            <h4 className="font-semibold opacity-70 text-center">
                Many of us move around a lot. Here's where we're currently shipping code.
            </h4>

            <div className="text-center">
                <CallToAction to="/handbook/company/team" type="secondary">
                    Meet the team
                </CallToAction>
            </div>

            <div className="relative text-center pt-16 pb-24">
                <div className="absolute inset-1/2 md:scale-100 sm:scale-[.6] scale-[.4]">
                    {teamMembers.nodes.map(({ frontmatter: { name, country, headshot } }, index) => {
                        const styles = avatarStyles[index]
                        return (
                            <Avatar
                                key={name}
                                size={styles.size}
                                className={styles.className}
                                color={styles.color}
                                image={headshot}
                                name={name}
                                country={country}
                            />
                        )
                    })}
                </div>
                <div className="md:max-w-[700px] sm:max-w-[400px] max-w-[300px] w-full mx-auto">
                    <Map />
                </div>
            </div>
        </section>
    )
}

const query = graphql`
    {
        teamMembers: allMdx(
            filter: {
                fields: { slug: { regex: "/^/team/" } }
                frontmatter: {
                    name: {
                        in: [
                            "Li Yi Yu"
                            "Neil Kakkar"
                            "Yakko Majuri"
                            "Eric Duong"
                            "Marius Andra"
                            "Lottie Coxon"
                            "Coua Phang"
                            "Guido Iaquinti"
                            "Cameron DeLeone"
                        ]
                    }
                }
            }
            sort: { fields: frontmatter___startDate }
        ) {
            nodes {
                frontmatter {
                    country
                    name
                    headshot {
                        childImageSharp {
                            gatsbyImageData(placeholder: NONE)
                        }
                    }
                }
            }
        }
    }
`

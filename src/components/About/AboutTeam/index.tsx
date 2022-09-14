import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { CallToAction } from 'components/CallToAction'
import { Avatar } from './Avatar'
import { graphql, useStaticQuery } from 'gatsby'

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
    { color: '#9DE1D9', className: 'left-[-26rem] top-[-18rem]', size: 'xl' },
    { color: '#B3E19D', className: 'left-[-8rem] top-[-16rem]', size: 'md' },
    { color: '#A2B0D4', className: 'right-[-10rem] top-[-18rem]', size: 'lg' },
    { color: '#FDEDC9', className: 'right-[-20rem] top-[-12rem]', size: 'md' },
    { color: '#DCB1E3', className: 'right-[-22rem] top-[-2rem]', size: 'lg' },
    { color: '#E19D9D', className: 'right-[-11rem] bottom-[-12rem]', size: 'xl' },
    { color: '#E6A9E8', className: 'left-[-6rem] bottom-[-10rem]', size: 'md' },
    { color: '#9DA4E1', className: 'left-[-20rem] bottom-[-12rem]', size: 'xl' },
    { color: '#FBBC05', className: 'left-[-24rem] bottom-[-2rem]', size: 'md' },
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

            <div className="relative text-center pt-16 pb-24 ml-12">
                <StaticImage
                    src="./images/map.png"
                    width={795}
                    height={485}
                    placeholder="blurred"
                    alt="Map of the PostHoggers"
                />
                <div className="absolute inset-1/2 border">
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
                    <Dot classes="top-[-7.25rem] left-[-16rem]" />
                    <Dot classes="top-[-6.85rem] left-[-15.5rem]" />
                    <Dot classes="top-[-6rem] left-[-16rem]" />
                    <Dot classes="top-[-4.9rem] left-[-12.3rem]" />
                    <Dot classes="top-[-7.5rem] left-[-10.5rem]" />
                    <Dot classes="top-[-7.75rem] left-[-10rem]" />
                    <Dot classes="top-[-8rem] left-[-9.8rem]" />
                    <Dot classes="top-[-8.5rem] left-[-8.75rem]" />
                    <Dot classes="top-[-9.8rem] left-[-4.5rem]" />
                    <Dot classes="top-[-9.1rem] left-[-3.8rem]" />
                    <Dot classes="top-[-9.4rem] left-[-3.5rem]" />
                    <Dot classes="top-[-9.2rem] left-[-3.3rem]" />
                    <Dot classes="top-[-9rem] left-[-3rem]" />
                    <Dot classes="top-[-8.75rem] left-[-2.8rem]" />
                    <Dot classes="top-[-8rem] left-[-2.5rem]" />
                    <Dot classes="top-[-7.75rem] left-[-2rem]" />
                    <Dot classes="top-[-7.25rem] left-[-1.6rem]" />
                    <Dot classes="top-[-8rem] left-[-1.25rem]" />
                    <Dot classes="top-[-8.75rem] left-[-.25rem]" />
                    <Dot classes="top-[-.9rem] left-[-.1rem]" />
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

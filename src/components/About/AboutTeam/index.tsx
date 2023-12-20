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
    { color: '#DCB1E3', className: 'right-[-30.5rem] top-[-2.5rem]', size: 'lg' },
    { color: '#FDEDC9', className: 'right-[-26rem] top-[-12rem]', size: 'md' },
    { color: '#E19D9D', className: 'right-[-14.5rem] bottom-[-16rem]', size: 'xl' },
    { color: '#A2B0D4', className: 'right-[-14rem] top-[-22.5rem]', size: 'lg' },
    { color: '#9DE1D9', className: 'left-[-30.5rem] top-[-18.5rem]', size: 'xl' },
    { color: '#B3E19D', className: 'left-[-10rem] top-[-19rem]', size: 'md' },
    { color: '#9DA4E1', className: 'left-[-23rem] bottom-[-14rem]', size: 'xl' },
    { color: '#FBBC05', className: 'left-[-25rem] bottom-[-1.5rem]', size: 'md' },
    { color: '#E6A9E8', className: 'left-[-6rem] bottom-[-12rem]', size: 'md' },
]

export const AboutTeam = () => {
    const { teamMembers, allTeamMembers } = useStaticQuery(query)
    const maxTheHedgehog = 1

    return (
        <section id="team" className="pt-16 pb-12 px-4">
            <h3 className="text-5xl mb-4 lg:mb-1 text-center">
                We're a team of <span className="text-blue">{allTeamMembers.count - maxTheHedgehog}</span> from all over
                the world.
            </h3>
            <h4 className="font-semibold opacity-70 text-center">
                Many of us move around a lot. Here's where we're currently shipping code.
            </h4>

            <div className="text-center mb-4">
                <CallToAction to="/team" type="secondary">
                    Meet the team
                </CallToAction>
            </div>

            <div className="relative text-center py-14 md:py-28">
                <div className="absolute inset-1/2 scale-[.4] sm:scale-[.6] md:scale-100">
                    {teamMembers.nodes.map(({ firstName, lastName, country, avatar }, index) => {
                        const styles = avatarStyles[index]
                        const name = [firstName, lastName].filter(Boolean).join(' ')
                        return (
                            <Avatar
                                key={name}
                                size={styles.size}
                                className={styles.className}
                                color={styles.color}
                                image={avatar?.url}
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
        teamMembers: allSqueakProfile(
            filter: {
                lastName: {
                    in: ["Yi Yu", "Kakkar", "Majuri", "Duong", "Andra", "Coxon", "Phang", "Obermüller", "DeLeone"]
                }
                teams: { data: { elemMatch: { attributes: { name: { ne: null } } } } }
            }
            sort: { fields: startDate }
        ) {
            nodes {
                country
                firstName
                lastName
                avatar {
                    url
                }
            }
        }
        allTeamMembers: allSqueakProfile(filter: { teams: { data: { elemMatch: { id: { ne: null } } } } }) {
            count: totalCount
        }
    }
`

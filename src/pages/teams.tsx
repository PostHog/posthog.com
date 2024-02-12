import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'

import placeholderImage from '../images/teams/crest-placeholder.png'
import Tooltip from 'components/Tooltip'

const teams = [
    {
        name: 'Product Analytics',
        url: '/handbook/small-teams/product-analytics',
        image: '../images/teams/crest-placeholder.png',
        people: [
            {
                name: 'Marius',
                teamLead: true,
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688579570/marius_6a241a6fdc.png',
            },
            {
                name: 'Michael',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688575052/michael_8f53233c21.png',
            },
        ],
    },
    {
        name: 'Product Analytics',
        url: '/handbook/small-teams/product-analytics',
        image: placeholderImage,
        people: [
            {
                name: 'Marius',
                teamLead: true,
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688579570/marius_6a241a6fdc.png',
            },
            {
                name: 'Michael',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688575052/michael_8f53233c21.png',
            },
        ],
    },
    {
        name: 'Product Analytics',
        url: '/handbook/small-teams/product-analytics',
        image: placeholderImage,
        people: [
            {
                name: 'Marius',
                teamLead: true,
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688579570/marius_6a241a6fdc.png',
            },
            {
                name: 'Michael',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688575052/michael_8f53233c21.png',
            },
        ],
    },
    {
        name: 'Product Analytics',
        url: '/handbook/small-teams/product-analytics',
        image: placeholderImage,
        people: [
            {
                name: 'Marius',
                teamLead: true,
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688579570/marius_6a241a6fdc.png',
            },
            {
                name: 'Michael',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688575052/michael_8f53233c21.png',
            },
        ],
    },
    {
        name: 'Product Analytics',
        url: '/handbook/small-teams/product-analytics',
        image: placeholderImage,
        people: [
            {
                name: 'Marius',
                teamLead: true,
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688579570/marius_6a241a6fdc.png',
            },
            {
                name: 'Michael',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688575052/michael_8f53233c21.png',
            },
        ],
    },
    {
        name: 'Product Analytics',
        url: '/handbook/small-teams/product-analytics',
        image: placeholderImage,
        people: [
            {
                name: 'Marius',
                teamLead: true,
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688579570/marius_6a241a6fdc.png',
            },
            {
                name: 'Michael',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688575052/michael_8f53233c21.png',
            },
        ],
    },
    {
        name: 'Product Analytics',
        url: '/handbook/small-teams/product-analytics',
        image: placeholderImage,
        people: [
            {
                name: 'Marius',
                teamLead: true,
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688579570/marius_6a241a6fdc.png',
            },
            {
                name: 'Michael',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688575052/michael_8f53233c21.png',
            },
        ],
    },
    {
        name: 'Product Analytics',
        url: '/handbook/small-teams/product-analytics',
        image: placeholderImage,
        people: [
            {
                name: 'Marius',
                teamLead: true,
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688579570/marius_6a241a6fdc.png',
            },
            {
                name: 'Michael',
                image: 'https://res.cloudinary.com/dmukukwp6/image/upload/v1688575052/michael_8f53233c21.png',
            },
        ],
    },
]

export const Handbook: React.FC = () => {
    return (
        <Layout>
            <SEO image="/images/handbook.png" title="Handbook - PostHog" />

            <PostLayout article={false} title={'Handbook'} hideSidebar hideSurvey>
                <section className="mx-auto">
                    <div className="flex flex-col md:items-center md:justify-end md:flex-row-reverse gap-8 md:gap-2">
                        <div className="md:flex-1">
                            <h1 className="font-bold text-5xl mb-6">Small teams</h1>
                            <p className="opacity-60 ">
                                We've organized the team into small teams that are multi-disciplinary and as
                                self-sufficient as possible.
                            </p>
                            <p className="">
                                <Link to="/handbook/company/small-teams">Learn more about why we have small teams</Link>
                            </p>

                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6 text-center">
                                {teams.map((team, index) => (
                                    <Link
                                        to={team.url}
                                        key={index}
                                        className="border border-light dark:border-dark bg-accent dark:bg-accent-dark rounded p-2 md:p-4 hover:scale-[1.01] active:scale-[1] relative hover:top-[-.5px] active:top-px"
                                    >
                                        {/* <StaticImage src={team.image} alt={team.name} className="mix-blend-multiply" /> */}
                                        <StaticImage
                                            src="../images/teams/crest-placeholder.png"
                                            alt={team.name}
                                            className="mix-blend-multiply mb-2"
                                        />
                                        <h3 className="text-base md:text-lg">{team.name}</h3>
                                        <div className="flex justify-center">
                                            {team.people.map((person, personIndex) => (
                                                <div
                                                    key={personIndex}
                                                    className="-ml-3 relative hover:z-10 cursor-default"
                                                >
                                                    <Tooltip
                                                        content={`${person.name} ${
                                                            person.teamLead ? '(Team lead)' : ''
                                                        }`}
                                                        placement="top"
                                                    >
                                                        <img
                                                            src={person.image}
                                                            className="w-12 h-12 rounded-full bg-white border border-light dark:border-dark"
                                                            alt={person.name}
                                                        />
                                                    </Tooltip>
                                                </div>
                                            ))}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="space-y-8"></section>
            </PostLayout>
        </Layout>
    )
}

export default Handbook

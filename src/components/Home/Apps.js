import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import AppsList from '../AppsList'
import { CallToAction } from '../CallToAction'
import { heading, section } from './classes'

const Listing = ({ name, image, url }) => {
    return (
        <li className="border-t border-l border-dashed border-gray-accent-light">
            <a href={url} className="flex flex-col items-center text-center px-2 py-6 hover:bg-gray-accent-light">
                <img className="icon w-8 h-8 mb-2" src={image} />
                <span className="text-primary">{name}</span>
            </a>
        </li>
    )
}

export default function Apps() {
    const { apps } = useStaticQuery(query)
    return (
        <section className={section('mt-4 md:mt-8')}>
            <h2 className={heading('lg')}>
                The PostHog app library helps you <br className="hidden lg:block" />
                <span className="text-blue">do more with your data</span>
            </h2>
            <p className="my-6 mx-auto text-center text-lg md:text-lg font-semibold mt-2 lg:mt-4 text-primary max-w-2xl opacity-75">
                Or <a href="/docs/apps">build your own app</a>
            </p>
            <div className="mt-8 md:mt-12">
                <AppsList hideBuildYourOwn apps={apps.nodes} />

                <footer className="text-center">
                    <CallToAction to="/apps" type="outline" className="mt-8">
                        Browse 50ish apps
                    </CallToAction>
                </footer>
            </div>
        </section>
    )
}

const query = graphql`
    query {
        apps: allMdx(filter: { fields: { slug: { regex: "/^/apps/(?!.*/docs).*/" } } }, limit: 16) {
            nodes {
                id
                fields {
                    slug
                }
                frontmatter {
                    thumbnail {
                        id
                        publicURL
                    }
                    title
                    badge
                    price
                    filters {
                        type
                        maintainer
                    }
                }
            }
        }
    }
`

import Layout from 'components/Layout'
import React from 'react'
import { heading, section } from 'components/Home/classes'
import { Segment, Zapier, Sentry, Check } from 'components/Icons/Icons'
import Card from 'components/Card'
import { motion } from 'framer-motion'
import { SEO } from 'components/seo'

const logos = {
    Segment,
    Zapier,
    Sentry,
}

const maintainerIcons = {
    official: (
        <span title="Officially maintained">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        </span>
    ),
    community: (
        <span title="Community maintained">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
        </span>
    ),
}

export default function Integrations({
    data: {
        allIntegrations: { integrations },
    },
}) {
    return (
        <Layout>
            <SEO title="Integrate PostHog" description="Keep your entire product stack in sync with PostHog" />
            <section>
                <div className={section()}>
                    <h1 className={heading()}>Integrations</h1>
                    <h2 className={heading('sm')}>Keep your entire product stack in sync with PostHog</h2>
                </div>
                <div className={section()}>
                    <motion.ul
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.05,
                                },
                            },
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 list-none p-0 m-0"
                    >
                        {integrations.map((integration) => {
                            const { id, name, description, url, maintainer, verified } = integration
                            const Logo = logos[name]
                            const MaintainerIcon = maintainerIcons[maintainer]
                            return (
                                <motion.li
                                    className="list-none"
                                    variants={{
                                        hidden: { translateY: '-20%', opacity: 0 },
                                        show: { translateY: 0, opacity: 1 },
                                    }}
                                    key={id}
                                >
                                    <Card
                                        url={url}
                                        className="text-primary hover:text-primary p-6 relative block w-full h-full"
                                    >
                                        <h3 className="flex items-center">
                                            {Logo && (
                                                <span>
                                                    <Logo className="mr-2" />
                                                </span>
                                            )}
                                            <span>{name}</span>
                                        </h3>
                                        <p>{description}</p>
                                        <span className="absolute right-3 top-3 flex space-x-1">
                                            {verified && (
                                                <span title="Verified">
                                                    <Check className="text-[green] h-5 w-5" />
                                                </span>
                                            )}
                                            {MaintainerIcon && MaintainerIcon}
                                        </span>
                                    </Card>
                                </motion.li>
                            )
                        })}
                    </motion.ul>
                </div>
            </section>
        </Layout>
    )
}

export const query = graphql`
    query IntegrationsQuery {
        allIntegrations {
            integrations: nodes {
                id
                name
                description
                url
                maintainer
                verified
            }
        }
    }
`

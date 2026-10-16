import Layout from 'components/Layout'
import { graphql } from 'gatsby'
import React from 'react'
import SEO from 'components/seo'
import { companyMenu } from '../navs'
import Team from 'components/Team'

export default function TeamPage({
    data: {
        mdx: { body },
        team: { name, roadmaps, ...other },
        objectives,
    },
    pageContext: { slug },
}) {
    return (
        <Layout
            parent={companyMenu}
            activeInternalMenu={companyMenu.children.find((menu) => menu.name.toLowerCase() === 'teams')}
        >
            <SEO
                title={`${name} - PostHog`}
                description="We're organized into multi-disciplinary small teams."
                image={`/images/small-teams.png`}
            />
            <Team
                body={body}
                name={name}
                slug={slug.split('/').pop()}
                roadmaps={roadmaps}
                objectives={objectives}
                emojis={other.emojis}
            />
        </Layout>
    )
}

export const query = null

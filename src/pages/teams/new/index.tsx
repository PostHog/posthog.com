import Layout from 'components/Layout'
import SEO from 'components/seo'
import Team from 'components/Team'
import { companyMenu } from '../../../navs'
import React from 'react'

export default function NewTeam() {
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
            <Team newTeam />
        </Layout>
    )
}

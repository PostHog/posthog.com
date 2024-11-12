import Layout from 'components/Layout'
import SEO from 'components/seo'
import Team from 'components/Team'
import { companyMenu } from '../../../navs'
import React, { useEffect, useState } from 'react'
import { useUser } from 'hooks/useUser'
import { navigate } from 'gatsby'

export default function NewTeam() {
    const { isModerator, isValidating } = useUser()
    useEffect(() => {
        if (!isValidating && !isModerator) {
            navigate('/teams')
        }
    }, [isModerator, isValidating])
    return (
        isModerator && (
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
    )
}

import React from 'react'
import Layout from 'components/Layout'
import Breadcrumbs from 'components/Breadcrumbs'

export default function SignUp() {
    return (
        <Layout>
            <Breadcrumbs
                crumbs={[
                    {
                        title: 'Get started',
                    },
                ]}
            />
        </Layout>
    )
}

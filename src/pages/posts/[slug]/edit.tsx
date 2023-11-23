import React, { useEffect, useState } from 'react'
import NewPost from 'components/Edition/NewPost'
import Layout from 'components/Layout'
import SEO from 'components/seo'
import { communityMenu } from '../../../navs'
import { navigate } from 'gatsby'
import { useUser } from 'hooks/useUser'

export default function Edit({ location: { state } }) {
    const { fetchUser } = useUser()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        fetchUser()
            .then((user) => {
                if (user?.role?.type !== 'moderator' || !state?.id || !state?.initialValues) {
                    return navigate('/posts')
                }
                setLoading(false)
            })
            .catch(() => navigate('/posts'))
    }, [])
    return (
        !loading && (
            <Layout parent={communityMenu} activeInternalMenu={communityMenu.children[0]}>
                <SEO title="Edit post - PostHog" noindex />
                <section className="px-5">
                    <NewPost initialValues={state.initialValues} id={state.id} />
                </section>
            </Layout>
        )
    )
}

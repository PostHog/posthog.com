import Link from 'components/Link'
import React, { useContext } from 'react'
import { PostsContext } from './Posts'

const Founders = () => {
    return (
        <div className="bg-accent dark:bg-accent-dark p-8 rounded border border-light dark:border-border-dark">
            <h2 className="text-xl mb-2">Welcome to our founder's hub</h2>
            <p>
                Here's a collection of resources geared for founders. It combines lessons we've learned along the way -
                both articles we've written ourselves, as well as links to other resource that we used while building
                PostHog.
            </p>
            <p className="mb-0">
                Missing a topic you'd like to learn more about?{' '}
                <Link to="https://x.com/posthog" external>
                    Mention us on X
                </Link>{' '}
                and we'll add it to our list!
            </p>
        </div>
    )
}

const Intros = {
    Founders,
}

export default function Intro() {
    const { activeMenu } = useContext(PostsContext)
    const Intro = Intros[activeMenu?.name]
    return Intro ? <Intro /> : null
}

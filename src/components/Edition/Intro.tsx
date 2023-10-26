import Link from 'components/Link'
import React, { useContext } from 'react'
import { PostsContext } from './Posts'

const Founders = () => {
    return (
        <div className="bg-accent dark:bg-accent-dark px-6 py-4 mt-8 md:mt-0 rounded border border-light dark:border-border-dark">
            <h2 className="text-lg mb-2">Welcome to our founder's hub</h2>
            <p className="text-sm">
                These are the best pieces of content we can find on the internet for all the major disciplines you need
                to build a successful company around your product – and what we've learned from each link along the way.
            </p>
            <p className="text-sm mb-0">
                Long term, we want{' '}
                <Link to="https://github.com/PostHog/posthog.com/issues/7011">
                    anyone to be able to post stuff here
                </Link>
                . In the meantime, if we are missing a topic you’d like to learn more about –
                <Link to="https://x.com/posthog" external>
                    tell us on X
                </Link>
                !
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

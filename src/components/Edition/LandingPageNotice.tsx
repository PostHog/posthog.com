import Link from 'components/Link'
import React from 'react'

export default function LandingPageNotice({ title }) {
    return (
        <div className="m-4 text-center">
            <p className="m-0 py-1 text-xs text-opacity-60">
                This is just a portion of everything we post. Visit the{' '}
                <Link to="/posts" className="text-red font-semibold">
                    posts hub
                </Link>{' '}
                to see more.
            </p>
        </div>
    )
}

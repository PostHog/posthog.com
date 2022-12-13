import React from 'react'
import { Link } from 'gatsby'

export default function Banner() {
    return (
        <div>
            <p className="text-center py-4 bg-gray-accent-light dark:bg-gray-accent-dark flex sm:flex-row flex-col justify-center sm:space-x-1 font-semibold m-0">
                <span>🎄 Available now: </span>
                <Link to="https://app.posthog.com/year_in_posthog/2022" className="text-red">
                    Your Year in PostHog!
                </Link>
            </p>
        </div>
    )
}

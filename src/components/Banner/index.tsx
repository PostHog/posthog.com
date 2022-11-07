import React from 'react'
import { Link } from 'gatsby'

export default function Banner() {
    return (
        <div>
            <p className="text-center py-4 bg-gray-accent-light dark:bg-gray-accent-dark flex sm:flex-row flex-col justify-center sm:space-x-1 font-semibold m-0">
                <span>🚀 PostHog's EU Cloud has arrived!</span>
                <Link to="/eu" className="text-red">
                    Learn more
                </Link>
            </p>
        </div>
    )
}

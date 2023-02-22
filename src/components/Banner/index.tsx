import React from 'react'
import { Link } from 'gatsby'

export default function Banner() {
    return (
        <div>
            <p className="text-center py-4 bg-gray-accent-light dark:bg-gray-accent-dark flex sm:flex-row flex-col justify-center sm:space-x-1 font-semibold m-0">
                <span> 🚧 PostHog is currently undergoing </span>
                <Link to="/service-message" className="text-red">
                    scheduled maintenence
                </Link>
            </p>
        </div>
    )
}

import React from 'react'
import Link from 'components/Link'

export const PairsWithItem = ({ icon, product, description, url }) => {
    return (
        <>
            <Link
                to={url}
                className="bg-accent dark:bg-accent-dark rounded-md p-6 relative hover:top-[-1px] hover:scale-[1.01] active:top-[1px] active:scale-[1] transition-all"
            >
                <span className="inline-block w-8 opacity-50 text-primary dark:text-primary-dark">{icon}</span>
                <h4 className="mt-2 mb-0">{product}</h4>
                <p className="text-primary dark:text-primary-dark mb-0 text-[15px] opacity-75">{description}</p>
            </Link>
        </>
    )
}

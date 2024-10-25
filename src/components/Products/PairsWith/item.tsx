import React from 'react'
import Link from 'components/Link'

export const PairsWithItem = ({ icon, product, description, url, color }) => {
    return (
        <>
            <Link
                to={url}
                className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded-md p-6 relative hover:top-[-1px] hover:scale-[1.01] active:top-[1px] active:scale-[1] transition-all"
            >
                <div className="flex gap-2 items-center -mt-1">
                    <span className={`inline-block size-7 ${color ? 'text-' + color : 'text-primary dark:text-primary-dark opacity-50'}`}>{icon}</span>
                    <h4 className="mt-2 mb-0.5 text-primary dark:text-primary-dark text-lg">{product}</h4>
                </div>
                <p className="text-primary dark:text-primary-dark pl-9 mb-0 text-[15px] text-opacity-75">{description}</p>
            </Link>
        </>
    )
}

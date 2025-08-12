import React from 'react'
import { Chevron } from 'components/Icons'

const Accordion = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <details className="rounded bg-accent dark:bg-accent-dark mb-2 border border-light dark:border-dark group">
            <summary className="cursor-pointer text-primary dark:text-primary-dark hover:text-primary/80 dark:hover:text-primary-dark/80 font-medium list-none p-4 flex items-center justify-between transition-colors">
                <span className="text-gray-600 dark:text-gray-300">{title}</span>
                <Chevron className="w-4 h-4 transition-transform opacity-60 group-hover:opacity-80 group-open:rotate-180" />
            </summary>
            <div className="px-4 pb-4 text-gray-600 dark:text-gray-300">{children}</div>
        </details>
    )
}

export default Accordion

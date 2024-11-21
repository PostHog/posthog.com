import React from 'react'

interface Job {
    title: string
    location: string
    department: string
    link: string
}

interface JobCardProps {
    job: Job
}

export default function JobCard({ job }: JobCardProps): JSX.Element {
    return (
        <a
            href={job.link}
            className="block bg-white rounded-lg border border-light hover:-translate-y-0.5 transition-all duration-200 hover:shadow-xl p-6"
            target="_blank"
            rel="noopener noreferrer"
        >
            <h3 className="text-lg font-semibold mb-3">{job.title}</h3>
            <div>
                <div className="text-sm text-gray-600 mb-1">{job.location}</div>
                <div className="text-sm text-gray-500">{job.department}</div>
            </div>
        </a>
    )
}

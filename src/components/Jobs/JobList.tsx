import React from 'react'
import JobCard from './JobCard'

interface Job {
    id: string
    title: string
    location: string
    department: string
    link: string
    company: string
}

interface JobListProps {
    jobs: Job[]
}

export default function JobList({ jobs }: JobListProps): JSX.Element {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
            {jobs.map((job) => (
                <JobCard key={`${job.company}-${job.id}`} job={job} />
            ))}
        </div>
    )
}

import React from 'react'

interface Job {
    title: string
    location: string
    department: string
    link: string
    company: string
    updatedAt: string
    logo: string
    employmentType: string
    remote: boolean
}

interface JobCardProps {
    job: Job
}

export default function JobCard({ job }: JobCardProps): JSX.Element {
    // Format the date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
            Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
            'day'
        )
    }

    return (
        <a
            href={job.link}
            className="block bg-white rounded-lg border border-light hover:-translate-y-0.5 transition-all duration-200 hover:shadow-xl"
            target="_blank"
            rel="noopener noreferrer"
        >
            {/* Company banner with logo */}
            <div className="px-6 py-3 border-b border-light bg-gray-50 rounded-t-lg flex items-center justify-between">
                <div className="flex items-center">
                    {job.logo && (
                        <img
                            src={job.logo}
                            alt={`${job.company} logo`}
                            className="w-6 h-6 mr-2 rounded-full object-contain bg-white"
                        />
                    )}
                    <span className="font-semibold text-primary">{job.company}</span>
                </div>
                <span className="text-sm text-gray-500">{formatDate(job.updatedAt)}</span>
            </div>

            <div className="p-6">
                {/* Title */}
                <h3 className="text-lg font-semibold text-primary mb-4">{job.title}</h3>

                {/* Key details grid */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                    {/* Location */}
                    <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                        </svg>
                        {job.remote ? 'Remote' : job.location}
                    </div>

                    {/* Employment Type */}
                    <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        {job.employmentType}
                    </div>

                    {/* Department */}
                    <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                        </svg>
                        {job.department}
                    </div>
                </div>

                {/* Apply button */}
                <div className="mt-6 pt-4 border-t border-light">
                    <span className="inline-flex items-center text-sm font-medium text-primary hover:text-primary-dark">
                        View Role
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                        </svg>
                    </span>
                </div>
            </div>
        </a>
    )
}

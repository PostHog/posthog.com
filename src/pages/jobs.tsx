import React, { useEffect, useState } from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'

type Job = {
    title: string
    department: string
    location: string
    link: string
}

export default function JobsPage(): JSX.Element {
    const [jobs, setJobs] = useState<Job[]>([]) // Initialize with empty array
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchJobs() {
            try {
                const response = await fetch('/api/scrape')
                const data = await response.json()

                if (data.success && Array.isArray(data.jobs)) {
                    setJobs(
                        data.jobs.map((job) => ({
                            title: job.title,
                            department: job.departmentName,
                            location: job.locationName,
                            link: `https://jobs.ashbyhq.com/supabase/${job.id}`,
                        }))
                    )
                } else {
                    console.log('Invalid data structure:', data)
                    setError('No job listings found')
                }
            } catch (error) {
                console.error('Error fetching jobs:', error)
                setError('Failed to load jobs')
            } finally {
                setIsLoading(false)
            }
        }

        fetchJobs()
    }, [])

    return (
        <Layout>
            <SEO title="Jobs at PostHog" />
            <div className="max-w-screen-2xl px-5 md:px-10 mx-auto">
                <h1 className="text-4xl">Jobs at PostHog</h1>
                <div className="mt-4">
                    {isLoading ? (
                        <p>Loading jobs...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : jobs && jobs.length > 0 ? (
                        <div className="space-y-4">
                            {jobs.map((job, index) => (
                                <div key={index} className="p-4 border rounded-md hover:bg-gray-50">
                                    <a href={job.link} className="block" target="_blank" rel="noopener noreferrer">
                                        <h3 className="text-lg font-medium text-blue-500 hover:text-blue-700">
                                            {job.title}
                                        </h3>
                                        <div className="mt-1 text-sm text-gray-600">
                                            {job.department} • {job.location}
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No job listings found</p>
                    )}
                </div>
            </div>
        </Layout>
    )
}

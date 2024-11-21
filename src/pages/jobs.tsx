import React, { useEffect, useState } from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import JobList from '../components/Jobs/JobList'

type Job = {
    id: string
    title: string
    department: string
    location: string
    link: string
}

export default function JobsPage(): JSX.Element {
    const [jobs, setJobs] = useState<Job[]>([])
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
                            id: job.id,
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
            <SEO title="Product Engineer Jobs" />
            <div className="max-w-screen-2xl px-5 md:px-10 mx-auto">
                <h1 className="text-4xl">Product Engineer Jobs</h1>
                <div className="mt-4">
                    {isLoading ? (
                        <p>Loading jobs...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : jobs && jobs.length > 0 ? (
                        <JobList jobs={jobs} />
                    ) : (
                        <p>No job listings found</p>
                    )}
                </div>
            </div>
        </Layout>
    )
}

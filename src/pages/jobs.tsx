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
    company: string
}

// Define companies that use Ashby ATS
const COMPANIES = [
    { name: 'Supabase', ashbyUrl: 'supabase' },
    { name: 'PostHog', ashbyUrl: 'posthog' },
    // Add more companies that use Ashby here
]

export default function JobsPage(): JSX.Element {
    const [jobs, setJobs] = useState<Job[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function fetchJobs() {
            try {
                const jobPromises = COMPANIES.map((company) =>
                    fetch(`/api/scrape?company=${company.ashbyUrl}`)
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(`Raw jobs from ${company.name}:`, data.jobs)

                            if (data.success && Array.isArray(data.jobs)) {
                                // Filter engineering jobs for each company
                                const engineeringJobs = data.jobs.filter((job) => {
                                    const engineeringTerms = ['engineering', 'engineer', 'developer', 'software']
                                    const titleLower = job.title.toLowerCase()

                                    // Only check the title, not the department
                                    const isEngineeringRole = engineeringTerms.some((term) => titleLower.includes(term))

                                    console.log(`${company.name} - ${job.title}:`, {
                                        title: titleLower,
                                        isEngineeringRole,
                                    })

                                    return isEngineeringRole
                                })

                                console.log(`Filtered engineering jobs from ${company.name}:`, engineeringJobs)

                                return engineeringJobs.map((job) => ({
                                    id: job.id,
                                    title: job.title,
                                    department: job.departmentName,
                                    location: job.locationName,
                                    link: `https://jobs.ashbyhq.com/${company.ashbyUrl}/${job.id}`,
                                    company: company.name,
                                }))
                            }
                            console.log(`No jobs found for ${company.name}`)
                            return []
                        })
                        .catch((error) => {
                            console.error(`Error fetching ${company.name} jobs:`, error)
                            return []
                        })
                )

                const allJobs = await Promise.all(jobPromises)
                const flattenedJobs = allJobs.flat()

                console.log('Final filtered jobs:', flattenedJobs)

                if (flattenedJobs.length === 0) {
                    setError('No engineering jobs found')
                } else {
                    setJobs(flattenedJobs)
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
            <SEO title="Engineering Jobs" />
            <div className="max-w-screen-2xl px-5 md:px-10 mx-auto">
                <h1 className="text-4xl">Engineering Jobs</h1>
                <div className="mt-4">
                    {isLoading ? (
                        <p>Loading jobs...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : jobs && jobs.length > 0 ? (
                        <JobList jobs={jobs} />
                    ) : (
                        <p>No engineering jobs found</p>
                    )}
                </div>
            </div>
        </Layout>
    )
}

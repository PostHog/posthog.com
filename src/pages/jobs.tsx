import React, { useEffect, useState } from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import JobList from '../components/Jobs/JobList'
import { COMPANIES, CompanyMetadata } from '../data/companies'

type Job = {
    id: string
    title: string
    location: string
    department: string
    link: string
    company: string
    logo: string | null
    updatedAt: string
    employmentType: string
    remote: boolean
}

type FilterValue = EngineerDecision | 'All'

export default function JobsPage(): JSX.Element {
    const [jobs, setJobs] = useState<Job[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [engineerDecisionFilter, setEngineerDecisionFilter] = useState<FilterValue>('All')

    useEffect(() => {
        async function fetchJobs() {
            try {
                const jobPromises = COMPANIES.map((company) =>
                    fetch(`/api/scrape?company=${company.ashbyUrl}`)
                        .then((res) => res.json())
                        .then((data) => {
                            if (data.success && Array.isArray(data.jobs)) {
                                const engineeringJobs = data.jobs
                                    .filter((job) => {
                                        const engineeringTerms = ['engineering', 'engineer', 'developer', 'software']
                                        const titleLower = job.title?.toLowerCase() || ''
                                        return engineeringTerms.some((term) => titleLower.includes(term))
                                    })
                                    .map((job) => ({
                                        id: job.id || '',
                                        title: job.title || '',
                                        department: job.departmentName || '',
                                        location: job.locationName || '',
                                        link: `https://jobs.ashbyhq.com/${company.ashbyUrl}/${job.id}`,
                                        company: company.name,
                                        logo: job.logo || null,
                                        updatedAt: job.updatedAt || new Date().toISOString(),
                                        employmentType: job.employmentType || 'Full-time',
                                        remote: job.isRemote || false,
                                    }))
                                return engineeringJobs
                            }
                            return []
                        })
                        .catch((error) => {
                            console.error(`Error fetching ${company.name} jobs:`, error)
                            return []
                        })
                )

                const allJobs = await Promise.all(jobPromises)
                const flattenedJobs = allJobs.flat()

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

    // Filter jobs based on company metadata
    const filteredJobs = jobs.filter((job) => {
        if (engineerDecisionFilter === 'All') return true

        const companyData = COMPANIES.find((c) => c.name === job.company)
        console.log('Filtering:', {
            company: job.company,
            companyData,
            filter: engineerDecisionFilter,
            matches: companyData?.engineersDecideWhatToBuild === engineerDecisionFilter,
        })
        return companyData?.engineersDecideWhatToBuild === engineerDecisionFilter
    })

    return (
        <Layout>
            <SEO title="Engineering Jobs" />
            <div className="max-w-screen-2xl px-5 md:px-10 mx-auto">
                <h1 className="text-4xl mb-6">Engineering Jobs</h1>

                {/* Filters Section */}
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                    <h2 className="text-lg font-semibold mb-4">Filters</h2>
                    <div className="flex items-center gap-4">
                        <label className="text-sm text-gray-600">Do engineers decide what to build?</label>
                        <select
                            value={engineerDecisionFilter}
                            onChange={(e) => setEngineerDecisionFilter(e.target.value as FilterValue)}
                            className="rounded border-gray-300 text-sm"
                        >
                            <option value="All">All</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="To some extent">To some extent</option>
                            <option value="Unclear">Unclear</option>
                        </select>
                    </div>
                </div>

                {/* Results Section */}
                <div className="mt-4">
                    {isLoading ? (
                        <p>Loading jobs...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : filteredJobs.length > 0 ? (
                        <>
                            <p className="text-sm text-gray-600 mb-4">
                                Showing {filteredJobs.length} of {jobs.length} jobs
                            </p>
                            <JobList jobs={filteredJobs} />
                        </>
                    ) : (
                        <p>No jobs match your filters</p>
                    )}
                </div>
            </div>
        </Layout>
    )
}

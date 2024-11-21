import React, { useEffect, useState } from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import JobList from '../components/Jobs/JobList'
import { COMPANIES, CompanyMetadata, EngineerDecision, BooleanFilter } from '../data/companies'

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

type FilterState = {
    engineerDecision: EngineerDecision | 'All'
    remoteOnly: BooleanFilter | 'All'
    exoticOffsites: BooleanFilter | 'All'
    meetingFreeDays: BooleanFilter | 'All'
    noProductRequirementDocs: BooleanFilter | 'All'
    highEngineerRatio: BooleanFilter | 'All'
    posthogCustomer: BooleanFilter | 'All'
    hasDeadlines: BooleanFilter | 'All'
}

// Helper function to get company metadata with defaults
const getCompanyValue = (
    company: CompanyMetadata | undefined,
    field: keyof CompanyMetadata
): EngineerDecision | BooleanFilter => {
    if (!company || !company[field]) return 'Unclear'
    return company[field] as EngineerDecision | BooleanFilter
}

export default function JobsPage(): JSX.Element {
    const [jobs, setJobs] = useState<Job[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [filters, setFilters] = useState<FilterState>({
        engineerDecision: 'All',
        remoteOnly: 'All',
        exoticOffsites: 'All',
        meetingFreeDays: 'All',
        noProductRequirementDocs: 'All',
        highEngineerRatio: 'All',
        posthogCustomer: 'All',
        hasDeadlines: 'All',
    })

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

    // Filter jobs based on all selected filters
    const filteredJobs = jobs.filter((job) => {
        const companyData = COMPANIES.find((c) => c.name === job.company)

        return (
            (filters.engineerDecision === 'All' ||
                getCompanyValue(companyData, 'engineersDecideWhatToBuild') === filters.engineerDecision) &&
            (filters.remoteOnly === 'All' || getCompanyValue(companyData, 'remoteOnly') === filters.remoteOnly) &&
            (filters.exoticOffsites === 'All' ||
                getCompanyValue(companyData, 'exoticOffsites') === filters.exoticOffsites) &&
            (filters.meetingFreeDays === 'All' ||
                getCompanyValue(companyData, 'meetingFreeDays') === filters.meetingFreeDays) &&
            (filters.noProductRequirementDocs === 'All' ||
                getCompanyValue(companyData, 'noProductRequirementDocs') === filters.noProductRequirementDocs) &&
            (filters.highEngineerRatio === 'All' ||
                getCompanyValue(companyData, 'highEngineerRatio') === filters.highEngineerRatio) &&
            (filters.posthogCustomer === 'All' ||
                getCompanyValue(companyData, 'posthogCustomer') === filters.posthogCustomer) &&
            (filters.hasDeadlines === 'All' || getCompanyValue(companyData, 'hasDeadlines') === filters.hasDeadlines)
        )
    })

    const handleFilterChange = (name: keyof FilterState, value: string) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value as FilterState[keyof FilterState],
        }))
    }

    const FilterSelect = ({ label, name }: { label: string; name: keyof FilterState }) => (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800">{label}</label>
            <div className="relative">
                <select
                    value={filters[name]}
                    onChange={(e) => handleFilterChange(name, e.target.value)}
                    className={`w-full rounded-md border px-3 py-2 pr-8 font-medium shadow-sm appearance-none sm:text-sm
                        ${
                            filters[name] === 'All'
                                ? 'border-gray-300 bg-gray-50 text-gray-900'
                                : 'border-primary bg-primary/10 text-primary-dark font-semibold'
                        }
                        hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary`}
                >
                    <option value="All">All</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    {name === 'engineerDecision' && <option value="To some extent">To some extent</option>}
                    <option value="Unclear">Unclear</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                </div>
            </div>
            {filters[name] !== 'All' && (
                <div className="text-xs font-medium text-primary mt-1">Selected: {filters[name]}</div>
            )}
        </div>
    )

    return (
        <Layout>
            <SEO title="Engineering Jobs" />
            <div className="max-w-screen-2xl px-5 md:px-10 mx-auto">
                <h1 className="text-4xl mb-6">Engineering Jobs</h1>

                <div className="mb-8 p-6 bg-gray-100 rounded-lg shadow-sm border border-gray-200">
                    <h2 className="text-lg font-semibold mb-4 text-gray-900">Filters</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        <FilterSelect label="Do engineers decide what to build?" name="engineerDecision" />
                        <FilterSelect label="Remote only?" name="remoteOnly" />
                        <FilterSelect label="Exotic offsites?" name="exoticOffsites" />
                        <FilterSelect label="Meeting-free days each week?" name="meetingFreeDays" />
                        <FilterSelect label="No product requirements docs?" name="noProductRequirementDocs" />
                        <FilterSelect label="50%+ engineer ratio?" name="highEngineerRatio" />
                        <FilterSelect label="PostHog customer?" name="posthogCustomer" />
                        <FilterSelect label="Has deadlines?" name="hasDeadlines" />
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                            {Object.entries(filters).filter(([_, value]) => value !== 'All').length} active filters
                        </div>
                    </div>
                </div>

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

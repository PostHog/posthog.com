import React, { useState } from 'react'
import useJobs, { Job } from '../hooks/useJobs'
import groupBy from 'lodash.groupby'
import useCompanies, { Company } from 'hooks/useCompanies'
import Layout from 'components/Layout'
import { layoutLogic } from 'logic/layoutLogic'
import { useValues } from 'kea'
import { IconCheck } from '@posthog/icons'
import Link from 'components/Link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const Perks = ({ company }: { company: Company }) => {
    const { engineersDecideWhatToBuild, remoteOnly, exoticOffsites, meetingFreeDays, highEngineerRatio } =
        company.attributes
    const perks = [
        engineersDecideWhatToBuild && 'Engineers decide what to build',
        remoteOnly && 'Remote only',
        exoticOffsites && 'Exotic offsites',
        meetingFreeDays && 'Meeting-free days',
        highEngineerRatio && 'High engineer ratio',
    ]
    return (
        <ul className="list-none p-0 m-0 flex space-x-2">
            {perks.filter(Boolean).map((perk) => (
                <li key={`${company.id}-${perk}`} className="flex items-center space-x-1">
                    <IconCheck className="size-4 text-green" />
                    <span className="text-sm font-semibold">{perk}</span>
                </li>
            ))}
        </ul>
    )
}

const JobList = ({ jobs }: { jobs: Job[] }) => {
    const jobsGroupedByDepartment = groupBy(jobs, 'attributes.department')

    return (
        <ul className="list-none p-0 m-0 space-y-6 mt-4">
            {Object.entries(jobsGroupedByDepartment).map(([department, jobs]) => (
                <li key={department}>
                    <h3 className="m-0 opacity-60 text-base font-normal border-b border-light dark:border-dark pb-2 mb-2">
                        {department}
                    </h3>
                    <ul className="list-none p-0 m-0 space-y-2">
                        {jobs.map((job) => (
                            <li key={job.id} className="flex justify-between">
                                <Link externalNoIcon className="!text-inherit underline" to={job.attributes.url}>
                                    {job.attributes.title}
                                </Link>
                                <p className="m-0 opacity-60 text-sm">{dayjs(job.attributes.postedDate).fromNow()}</p>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    )
}

const Companies = () => {
    const { websiteTheme } = useValues(layoutLogic)
    const { companies, isLoading } = useCompanies()

    return isLoading ? (
        <ul className="list-none p-0 m-0 space-y-4 my-12">
            {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="h-12 w-full bg-accent dark:bg-accent-dark rounded-md" />
            ))}
        </ul>
    ) : (
        <ul className="list-none p-0 m-0 space-y-12 my-12">
            {companies.map((company) => {
                const { name } = company.attributes
                const logoLight = company.attributes.logoLight.data.attributes.url
                const logoDark = company.attributes.logoDark.data.attributes.url
                return (
                    <li key={company.id}>
                        <img
                            className="max-w-40 mb-2"
                            src={websiteTheme === 'dark' ? logoDark : logoLight}
                            alt={name}
                        />
                        <Perks company={company} />
                        <JobList jobs={company.attributes.jobs.data} />
                    </li>
                )
            })}
        </ul>
    )
}

const Jobs = () => {
    const { jobs, isLoading, error } = useJobs()
    return <div>Jobs</div>
}

export default function JobsPage() {
    const [sortBy, setSortBy] = useState<'company' | 'job'>('company')

    return (
        <Layout>
            <section className="px-5 my-12">
                <header>
                    <h1 className="text-4xl font-bold m-0">Cool tech jobs</h1>
                    <p className="m-0 mt-1">
                        Open roles for product engineers and other jobs from companies with unique perks and great
                        culture.
                    </p>
                </header>
                {sortBy === 'company' ? <Companies /> : <Jobs />}
            </section>
        </Layout>
    )
}

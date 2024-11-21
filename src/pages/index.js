import React from 'react'
import JobList from 'components/Jobs/JobList'

export default function Home({ jobs }) {
    return (
        <main>
            <h1>Open Positions</h1>
            <JobList jobs={jobs} />
        </main>
    )
}

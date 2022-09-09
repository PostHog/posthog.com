import { useStaticQuery, graphql } from 'gatsby'
import React from 'react'

export default function Jobs() {
    const data = useStaticQuery(query)
    const totalCount = data?.allJobs?.pageInfo?.totalCount
    // In order to show job count, a valid Ashby API key
    // must be added as an environment variable ASHBY_API_KEY.
    // If no Ashby API key is found, the job count is 0
    return (
        <div className="text-primary dark:text-white">
            <p>
                We're currently hiring for <strong>{totalCount} roles</strong>.
            </p>
            <p>Being open source, we're incredibly asynchronous and unlike any company you've ever worked for.</p>
        </div>
    )
}

const query = graphql`
    query Job {
        allAshbyJobPosting(filter: { isListed: { eq: true } }) {
            pageInfo {
                totalCount
            }
        }
    }
`

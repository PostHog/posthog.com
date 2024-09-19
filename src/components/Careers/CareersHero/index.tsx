import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Link from 'components/Link'

const query = graphql`
    query CareersHero {
        allAshbyJobPosting(filter: { isListed: { eq: true } }) {
            jobs: nodes {
                fields {
                    title
                    slug
                    html
                }
                parent {
                    ... on AshbyJob {
                        customFields {
                            value
                            title
                        }
                    }
                }
                externalLink
                departmentName
                info {
                    descriptionHtml
                }
            }
            departments: group(field: departmentName) {
                title: fieldValue
            }
        }
    }
`
export const CareersHero = () => {
    const {
        allAshbyJobPosting: { departments, jobs },
    } = useStaticQuery(query)

    const [selectedJob, setSelectedJob] = useState(jobs[0])
    const [processedHtml, setProcessedHtml] = useState('')

    useEffect(() => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(selectedJob.fields.html, 'text/html')

        const whoWereLookingFor = doc.querySelector('details:has(h2[id="who-we\'re-looking-for"])')
        const whatYoullBeDoing = doc.querySelector('details:has(h2[id="what-you\'ll-be-doing"])')

        let content = ''
        if (whoWereLookingFor) {
            content = whoWereLookingFor.outerHTML
        } else if (whatYoullBeDoing) {
            content = whatYoullBeDoing.outerHTML
        }

        setProcessedHtml(content)
    }, [selectedJob])

    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/4">
                <ul className="list-none p-0 m-0">
                    {jobs.map((job) => (
                        <li key={job.fields.title} className="mb-2">
                            <button
                                className={`w-full text-left p-4 ${selectedJob.fields.title === job.fields.title ? 'bg-gray-200' : 'bg-white'}`}
                                onClick={() => setSelectedJob(job)}
                            >
                                {job.fields.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-full md:w-3/4 p-4">
                <h2 className="text-2xl font-bold">{selectedJob.fields.title}</h2>
                <p className="text-gray-600">{selectedJob.departmentName}</p>
                <div className="mt-4">
                    <div dangerouslySetInnerHTML={{ __html: processedHtml }} />
                    <Link to={selectedJob.fields.slug} className="mt-4 inline-block bg-yellow-500 text-white px-4 py-2 rounded">
                        Read more
                    </Link>
                </div>
            </div>
        </div>
    )
}

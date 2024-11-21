import React from 'react'
import Card from '../Card'
import styles from './JobList.module.css'

console.log('Styles object:', styles)

export default function JobList({ jobs }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {jobs.map((job) => (
                <Card
                    key={job.id}
                    url={job.link}
                    className="bg-white"
                >
                    <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                        <div>
                            <div className="text-gray-600 mb-1">{job.location}</div>
                            <div className="text-gray-500">{job.department}</div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
} 
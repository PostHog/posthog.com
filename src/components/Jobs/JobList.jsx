import styles from './JobList.module.css'

export default function JobList({ jobs }) {
  console.log('JobList received jobs:', jobs)
  
  if (!jobs?.length) {
    console.log('No jobs condition met because:', {
      jobsIsDefined: !!jobs,
      jobsLength: jobs?.length
    })
    return <div>No jobs found</div>
  }

  return (
    <div className={styles.container}>
      {jobs.map(job => (
        <div key={job.id} className={styles.jobCard}>
          <h2 className={styles.title}>{job.title}</h2>
          
          <div className={styles.details}>
            <span className={styles.badge}>{job.departmentName}</span>
            <span className={styles.badge}>{job.locationName}</span>
            <span className={styles.badge}>{formatEmploymentType(job.employmentType)}</span>
          </div>

          <div className={styles.meta}>
            <span>Posted: {formatDate(job.publishedDate)}</span>
          </div>

          <a 
            href={`https://jobs.ashbyhq.com/supabase/${job.id}`}
            target="_blank"
            rel="noopener noreferrer" 
            className={styles.applyButton}
          >
            Apply Now
          </a>
        </div>
      ))}
    </div>
  )
}

function formatEmploymentType(type) {
  return type.replace(/([A-Z])/g, ' $1').trim()
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
} 
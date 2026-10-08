import React from 'react'
import StudentProgram from 'components/Students/StudentProgram'

// Canonical, prerendered /students page. Like /startups, this must be a real static page
// with a crawlable text H1 so search engines can index it.
export default function Students(): JSX.Element {
    return <StudentProgram />
}

import React from 'react'
import { AuthorsData } from 'types'

interface AuthorDetails {
    authorDetails?: [AuthorsData]
    date?: string
    classes?: string
}

function Byline({ authorDetails, date, classes }: AuthorDetails): JSX.Element {
    const authorNames = (authorDetails && ` by ${authorDetails?.map((author) => author.name).join(', ')}`) || ''
    // TODO: Add "N minute read" when reading length plugin is installed
    return <div className={`${classes} mt-1 mb-0 opacity-50`}>{`${date}${authorNames}`}</div>
}

export default Byline

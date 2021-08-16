import moment from 'moment'
import React from 'react'
import { AuthorsData } from 'types'

interface AuthorDetails {
    authorDetails?: AuthorsData
    date?: string
}

function Byline({ authorDetails, date }: AuthorDetails): JSX.Element {
    const { name, handle } = authorDetails || {}
    const fragments: string[] = []
    if (name && handle) {
        fragments.push(`by ${name}`)
    }
    if (date && moment(date).isValid()) {
        fragments.push(moment(date).format('MMM D, YYYY'))
    }
    // TODO: Add "N minute read" when reading length plugin is installed
    const bylineText = fragments.join(' • ')
    return <div className="mt-2 mb-0 opacity-50">{bylineText}</div>
}

export default Byline

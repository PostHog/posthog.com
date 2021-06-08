import React from 'react'
import { AuthorsData } from 'types'

interface AuthorDetails {
    authorDetails?: AuthorsData
}

function AuthorIndexView({ authorDetails }: AuthorDetails) {
    if (authorDetails?.handle) {
        const { name } = authorDetails
        return <div className="mt-1 mb-0">by {name}</div>
    }
    return null
}

export default AuthorIndexView

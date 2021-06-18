import React from 'react'
import { AuthorsData } from 'types'

interface AuthorDetails {
    authorDetails?: AuthorsData
}

function AuthorIndexView({ authorDetails }: AuthorDetails) {
    if (authorDetails?.handle) {
        const { name } = authorDetails
        return <div className="mt-2 mb-0 opacity-50">by {name}</div>
    }
    return null
}

export default AuthorIndexView

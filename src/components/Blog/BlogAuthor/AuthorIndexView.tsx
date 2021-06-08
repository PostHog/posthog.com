import React from 'react'
import { AuthorsData } from 'types'

interface AuthorDetails {
    authorDetails?: AuthorsData
}

function AuthorIndexView({ authorDetails }: AuthorDetails) {
    if (authorDetails?.handle) {
        const { name } = authorDetails
        return <h5 className="mt-2 mb-0">{name}</h5>
    }
    return null
}

export default AuthorIndexView

import React from 'react'
import NotFoundPage from 'components/NotFoundPage'

export default function NotFound() {
    return typeof window !== 'undefined' && window && <NotFoundPage />
}

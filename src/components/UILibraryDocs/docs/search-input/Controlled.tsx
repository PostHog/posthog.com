import React from 'react'
import { SearchInput } from 'components/UI/SearchInput'

const events = ['$pageview', '$autocapture', 'feature_flag_called', 'signup_completed']

export default function Controlled(): JSX.Element {
    const [query, setQuery] = React.useState('')
    const matches = events.filter((name) => name.includes(query.toLowerCase()))
    return (
        <div className="w-full max-w-md space-y-3">
            <SearchInput
                aria-label="Filter event names"
                placeholder="Filter event names"
                value={query}
                onValueChange={setQuery}
            />
            <div aria-live="polite" className="text-sm text-secondary">
                {matches.length ? matches.join(', ') : 'No events match this search.'}
            </div>
        </div>
    )
}

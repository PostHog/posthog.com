import React from 'react'
import Link from 'components/Link'

export const DifferentHighlights = (): JSX.Element => {
    return (
        <div className="bg-red/10 rounded text-base p-4">
            <strong>Warning:</strong> If you like the way most companies treat you, you might not like us.{' '}
            <Link to="/vibe-check" state={{ newWindow: true }}>
                See 15 <em>wrong</em> for you.
            </Link>
        </div>
    )
}

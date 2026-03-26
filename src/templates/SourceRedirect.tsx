import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

export default function SourceRedirect({ pageContext }: { pageContext: { redirectTo: string } }): JSX.Element {
    useEffect(() => {
        navigate(pageContext.redirectTo, { replace: true })
    }, [])

    return (
        <div className="p-8">
            <p>
                Redirecting to <a href={pageContext.redirectTo}>{pageContext.redirectTo}</a>...
            </p>
        </div>
    )
}

import React from 'react'

export default function PageViews({ pageViews }: { pageViews: string | number }) {
    return <p className="m-0 opacity-50 font-semibold">{pageViews} views</p>
}

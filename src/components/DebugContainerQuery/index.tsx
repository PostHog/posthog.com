import React from 'react'

export const DebugContainerQuery = () => {
    return (
        <div data-scheme="primary" className="bg-white text-xs border border-red text-center rounded">
            <div className="@xs:hidden @sm:hidden bg-red/10 p-2">Size: &lt;@xs (&lt;320px)</div>
            <div className="hidden @xs:block @sm:hidden bg-red/10 p-2">Size: @xs (320px+)</div>
            <div className="hidden @sm:block @md:hidden bg-red/10 p-2">Size: @sm (384px+)</div>
            <div className="hidden @md:block @lg:hidden bg-red/10 p-2">Size: @md (448px+)</div>
            <div className="hidden @lg:block @xl:hidden bg-red/10 p-2">Size: @lg (512px+)</div>
            <div className="hidden @xl:block @2xl:hidden bg-red/10 p-2">Size: @xl (576px+)</div>
            <div className="hidden @2xl:block @3xl:hidden bg-red/10 p-2">Size: @2xl (672px+)</div>
            <div className="hidden @3xl:block @4xl:hidden bg-red/10 p-2">Size: @3xl (768px+)</div>
            <div className="hidden @4xl:block @5xl:hidden bg-red/10 p-2">Size: @4xl (896px+)</div>
            <div className="hidden @5xl:block @6xl:hidden bg-red/10 p-2">Size: @5xl (1024px+)</div>
            <div className="hidden @6xl:block @7xl:hidden bg-red/10 p-2">Size: @6xl (1152px+)</div>
            <div className="hidden @7xl:block bg-red/10 p-2">Size: @7xl (1280px+)</div>
        </div>
    )
}

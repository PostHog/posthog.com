import React from 'react'

export const DebugContainerQuery = () => {
    return (
        <div className="mb-4 text-xs border border-red bg-red/10 text-center p-2 rounded">
            <div className="hidden @xs:block @sm:hidden">Size: @xs (320px+)</div>
            <div className="hidden @sm:block @md:hidden">Size: @sm (384px+)</div>
            <div className="hidden @md:block @lg:hidden">Size: @md (448px+)</div>
            <div className="hidden @lg:block @xl:hidden">Size: @lg (512px+)</div>
            <div className="hidden @xl:block @2xl:hidden">Size: @xl (576px+)</div>
            <div className="hidden @2xl:block @3xl:hidden">Size: @2xl (672px+)</div>
            <div className="hidden @3xl:block @4xl:hidden">Size: @3xl (768px+)</div>
            <div className="hidden @4xl:block @5xl:hidden">Size: @4xl (896px+)</div>
            <div className="hidden @5xl:block @6xl:hidden">Size: @5xl (1024px+)</div>
            <div className="hidden @6xl:block @7xl:hidden">Size: @6xl (1152px+)</div>
            <div className="hidden @7xl:block">Size: @7xl (1280px+)</div>
        </div>
    )
}

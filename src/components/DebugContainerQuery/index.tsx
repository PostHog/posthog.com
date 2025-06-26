import React from 'react'

// how this works:
// add <DebugContainerQuery /> to check the breakpoint of the closest parent container
// add <DebugContainerQuery name="my-container" /> to check the breakpoint of the container with the name "my-container" - just add the instance inside the container where you want to check the breakpoint
// note: because these classNames are assembled on-the-fly, add new container names to the end of safelist.txt

export const DebugContainerQuery = ({ name = '' }: { name?: string }) => {
    return (
        <div data-scheme="primary" className="bg-white text-xs border border-red text-center rounded">
            <div className={`@xs${name && '/' + name}:hidden bg-red/10 p-2`}>
                Size: &lt;@xs{name && '/' + name} (&lt;320px)
            </div>
            <div className={`hidden @xs${name && '/' + name}:block @sm${name && '/' + name}:hidden bg-red/10 p-2`}>
                Size: @xs{name && '/' + name} (320px+)
            </div>
            <div className={`hidden @sm${name && '/' + name}:block @md${name && '/' + name}:hidden bg-red/10 p-2`}>
                Size: @sm{name && '/' + name} (384px+)
            </div>
            <div className={`hidden @md${name && '/' + name}:block @lg${name && '/' + name}:hidden bg-red/10 p-2`}>
                Size: @md{name && '/' + name} (448px+)
            </div>
            <div className={`hidden @lg${name && '/' + name}:block @xl${name && '/' + name}:hidden bg-red/10 p-2`}>
                Size: @lg{name && '/' + name} (512px+)
            </div>
            <div className={`hidden @xl${name && '/' + name}:block @2xl${name && '/' + name}:hidden bg-red/10 p-2`}>
                Size: @xl{name && '/' + name} (576px+)
            </div>
            <div className={`hidden @2xl${name && '/' + name}:block @3xl${name && '/' + name}:hidden bg-red/10 p-2`}>
                Size: @2xl{name && '/' + name} (672px+)
            </div>
            <div className={`hidden @3xl${name && '/' + name}:block @4xl${name && '/' + name}:hidden bg-red/10 p-2`}>
                Size: @3xl{name && '/' + name} (768px+)
            </div>
            <div className={`hidden @4xl${name && '/' + name}:block @5xl${name && '/' + name}:hidden bg-red/10 p-2`}>
                Size: @4xl{name && '/' + name} (896px+)
            </div>
            <div className={`hidden @5xl${name && '/' + name}:block @6xl${name && '/' + name}:hidden bg-red/10 p-2`}>
                Size: @5xl{name && '/' + name} (1024px+)
            </div>
            <div className={`hidden @6xl${name && '/' + name}:block @7xl${name && '/' + name}:hidden bg-red/10 p-2`}>
                Size: @6xl{name && '/' + name} (1152px+)
            </div>
            <div className={`hidden @7xl${name && '/' + name}:block bg-red/10 p-2`}>
                Size: @7xl{name && '/' + name} (1280px+)
            </div>
        </div>
    )
}

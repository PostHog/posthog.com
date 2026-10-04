import React from 'react'

/** A tab button that switches between views (for example "Article" and "Video"). */
export const ViewButton = ({
    title,
    view,
    setView,
}: {
    title: string
    view: string
    setView: (view: string) => void
}): JSX.Element => {
    return (
        <button
            onClick={() => setView(title)}
            className={`py-2 px-4 text-sm transition-colors border-b-2 font-medium relative after:absolute after:top-[100%] after:left-0 after:right-0 after:rounded-full after:h-[2px] ${
                view === title
                    ? 'font-bold after:bg-red'
                    : 'font-semibold border-transparent opacity-50 hover:opacity-75 hover:after:bg-accent'
            }`}
        >
            {title}
        </button>
    )
}

export default ViewButton

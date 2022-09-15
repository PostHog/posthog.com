import React from 'react'

export default function RightColWide({ title, children }: { title?: string; children: React.ReactNode }) {
    return (
        <div className="bg-gray-accent-light/10 py-6 px-6 2xl:px-10">
            {title && <h2 className="text-[18px] font-bold m-0 mb-2 pl-3 text-black/70">{title}</h2>}
            <div className="max-w-250px 2xl:max-w-[350px] h-full">{children}</div>
        </div>
    )
}

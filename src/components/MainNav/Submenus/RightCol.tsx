import React from 'react'

export default function RightCol({ title, children }: { title?: string; children: React.ReactNode }) {
    return (
        <div className="bg-gray-accent-light bg-opacity-10 pt-6 px-3 pb-3">
            {title && <h2 className="text-[18px] font-bold m-0 mb-2 pl-3 text-black/70">{title}</h2>}
            <div className="md:max-w-[250px] h-full">{children}</div>
        </div>
    )
}

import React from 'react'

export default function RightCol({ title, children }: { title?: string; children: React.ReactNode }) {
    return (
        <div className="bg-gray-accent-light bg-opacity-10 md:p-4">
            {title && <h2 className="text-[18px] opacity-70 font-bold m-0 mb-2 text-black">{title}</h2>}
            <div className="md:max-w-[225px] h-full">{children}</div>
        </div>
    )
}

import React from 'react'

export default function Text({ children }: { children: React.ReactNode }) {
    return <p className="m-0 opacity-50 font-semibold flex items-center space-x-2 text-[14px]">{children}</p>
}

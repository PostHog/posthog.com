import React from 'react'

const Highlight = ({ children, red }: { children: React.ReactNode; red?: boolean }) => (
    <span className={`whitespace-nowrap p-0.5 font-bold ${red ? 'bg-red/10 text-red' : 'bg-blue/10 text-blue'}`}>
        {children}
    </span>
)

export default Highlight

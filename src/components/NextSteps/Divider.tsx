import React from 'react'

export default function Divider({ className = '' }: { className: string }) {
    return <hr className={`bg-transparent border-t border-b-0 border-primary border-dashed ${className}`} />
}

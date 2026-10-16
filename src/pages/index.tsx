import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

export default function Home() {
    useEffect(() => {
        navigate('/blog', { replace: true })
    }, [])

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#F4F4F0] dark:bg-[#151515] text-[#1E1E1E] dark:text-[#EAEAEA]">
            <div className="text-center">
                <div className="inline-block animate-spin text-2xl mb-2">&#9696;</div>
                <p className="text-sm font-medium opacity-70">Redirecting to Blog...</p>
            </div>
        </div>
    )
}

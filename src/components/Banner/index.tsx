import React from 'react'

export default function Banner() {
    return (
        <div>
            <p className="text-center py-4 bg-gray-accent-light dark:bg-gray-accent-dark flex sm:flex-row flex-col justify-center sm:space-x-1 font-semibold m-0">
                <span>🔴 Live now: </span>
                <a href="https://www.youtube.com/watch?v=SD7B2teuLXk" className="text-red">
                    Thanking every one of our 10,000 GitHub stars!
                </a>
            </p>
        </div>
    )
}

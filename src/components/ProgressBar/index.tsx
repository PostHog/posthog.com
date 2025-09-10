import React, { useState, useEffect } from 'react'

export default function ProgressBar({ title, chrome = true }: { title?: string; chrome?: boolean }) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        let interval: NodeJS.Timeout
        let timeoutId: NodeJS.Timeout

        const simulateProgress = () => {
            interval = setInterval(() => {
                setProgress((prevProgress) => {
                    // Start slowing down at 70%
                    if (prevProgress < 70) {
                        return prevProgress + 2
                    } else if (prevProgress < 85) {
                        return prevProgress + 0.8
                    } else if (prevProgress < 95) {
                        return prevProgress + 0.2
                    } else {
                        return prevProgress
                    }
                })
            }, 100)

            // Set a timeout to stop at 95% if taking too long
            timeoutId = setTimeout(() => {
                clearInterval(interval)
            }, 10000)
        }

        simulateProgress()

        return () => {
            clearInterval(interval)
            clearTimeout(timeoutId)
        }
    }, [])

    return (
        <div data-scheme="secondary" className="@container min-w-64">
            <div
                className={`${
                    chrome ? 'border border-primary bg-primary text-primary rounded-md p-8 mb-12' : ''
                } max-w-xl mx-auto`}
            >
                <div className="flex flex-col @md:flex-row justify-between mb-2 text-sm">
                    <span className="font-semibold">Loading {title} data...</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div data-scheme="primary" className="h-4 w-full border border-primary bg-primary overflow-hidden">
                    <div
                        className="h-full bg-red dark:bg-yellow transition-all duration-100 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

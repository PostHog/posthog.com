import React, { useState, useEffect } from 'react'

export default function ProgressBar() {
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
        <div data-scheme="primary" className="border border-primary bg-accent rounded-md p-8 mb-12">
            <div className="max-w-xl mx-auto">
                <div className="flex justify-between mb-2 text-sm">
                    <span className="font-semibold">Loading roadmap data...</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-4 w-full border border-primary bg-primary overflow-hidden">
                    <div
                        className="h-full bg-red dark:bg-yellow transition-all duration-100 ease-out"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

import React, { useState, useEffect } from 'react'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import { navigate } from 'gatsby'

type MaxQuestionInputProps = {
    className?: string
    placeholder?: string
}

const placeholderQuestions = ['What do hedgehogs eat?', 'What is my bounce rate?', 'Where are my users located?']

export const MaxQuestionInput = ({
    className = '',
    placeholder = 'Ask Max anything about your product data...',
}: MaxQuestionInputProps): JSX.Element => {
    const [question, setQuestion] = useState('')
    const [currentPlaceholder, setCurrentPlaceholder] = useState(0)
    const encodedQuestion = encodeURIComponent(question)
    const maxUrl = `https://app.posthog.com/#panel=max:${encodedQuestion}`

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPlaceholder((prev) => (prev + 1) % placeholderQuestions.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [])

    const handleSubmit = () => {
        if (question.trim()) {
            window.location.href = maxUrl
        }
    }

    return (
        <div
            className={`bg-gradient-to-br from-[#e5e7e0] to-[#f0f2ed] dark:from-[#242529] dark:to-[#2a2c31] border border-border dark:border-border-dark text-[15px] rounded-lg p-8 my-8 ${className}`}
        >
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3 flex-shrink-0 flex items-center justify-center">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/robot_f2dfddda15.png"
                        alt="Max AI Robot"
                        className="w-full max-w-[180px]"
                        placeholder="none"
                    />
                </div>
                <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-primary dark:text-primary-dark">
                            Already got data in PostHog?
                        </h3>
                        <p className="text-muted dark:text-muted-dark">
                            Then it's easiest to just show you Max AI in action. You can ask him anything, including:
                        </p>
                        <ul className="list-disc list-inside text-muted dark:text-muted-dark space-y-1">
                            <li>"What's our most popular feature?"</li>
                            <li>"Show me user retention by country"</li>
                            <li>"What's my churn rate?"</li>
                        </ul>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSubmit()
                                    }
                                }}
                                placeholder={placeholderQuestions[currentPlaceholder]}
                                className="flex-1 px-4 py-3 rounded-lg border border-border dark:border-border-dark bg-white dark:bg-gray-900 text-primary dark:text-primary-dark text-base focus:ring-2 focus:ring-red dark:focus:ring-yellow focus:border-transparent transition-all"
                            />
                            <CallToAction
                                href={maxUrl}
                                type="primary"
                                size="lg"
                                disabled={!question.trim()}
                                onClick={handleSubmit}
                            >
                                Ask Max
                            </CallToAction>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

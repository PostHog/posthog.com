import React from 'react'

const badgeClasses =
    'bg-gray-accent/50 text-primary/75 dark:text-primary-dark/60 dark:bg-gray-accent-dark text-xs m-[-2px] font-medium rounded-sm px-1 py-0.5 inline-block'
const requiredBadgeClasses =
    '!bg-orange/10 !text-orange !dark:text-white !dark:bg-orange/50 text-xs m-[-2px] font-medium rounded-sm px-1 py-0.5 inline-block'

const requiredBadgeMap: Record<string, { text: string; className: string }> = {
    required: { text: 'Required', className: requiredBadgeClasses },
    optional: { text: 'Optional', className: badgeClasses },
}

export interface StepDef {
    title: string
    goal?: string
    required?: 'required' | 'optional'
    content: React.ReactNode
}

export function StepList({ steps }: { steps: StepDef[] }) {
    return (
        <section className="max-w-2xl mx-auto">
            <ol className="ml-0">
                {steps.map((step, i) => (
                    <li key={i} className="mb-10 flex w-full">
                        <span className="flex flex-col items-center mr-6 relative">
                            <span className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-accent-light dark:bg-gray-accent-dark text-primary dark:text-primary-dark font-bold text-base z-10 border border-light dark:border-dark border-b-4 border-b-gray-accent dark:border-b-gray-accent-dark">
                                {i + 1}
                            </span>
                            {i < steps.length - 1 && (
                                <span className="absolute top-8 left-1/2 -translate-x-1/2 w-[3px] bg-gray-accent dark:bg-gray-accent-dark h-[calc(100%_-_2rem)]"></span>
                            )}
                        </span>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 font-semibold text-base text-primary dark:text-primary-dark">
                                <h2 className="!my-0 !text-2xl truncate">{step.title}</h2>
                                {step.required && requiredBadgeMap[step.required] && (
                                    <span className={`${requiredBadgeMap[step.required].className} shrink-0`}>
                                        {requiredBadgeMap[step.required].text}
                                    </span>
                                )}
                            </div>
                            {step.goal && step.goal.trim() && (
                                <div className="text-xs text-primary/60 dark:text-primary-dark/60 mt-1 mb-2">
                                    Your goal in this step: {step.goal}
                                </div>
                            )}
                            <div className="mt-4 mb-4 overflow-x-auto overflow-y-hidden">{step.content}</div>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    )
}

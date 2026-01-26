import React, { useState, useEffect } from 'react'
import { IconCheck, IconArrowLeft, IconArrowRight, IconRevert } from '@posthog/icons'
import OSButton from 'components/OSButton'

export interface DecisionTreeOption {
    value: string
    label: string
}

export interface DecisionTreeQuestion {
    id: string
    question: string
    description?: string
    condition?: (answers: Record<string, string>) => boolean
    options: DecisionTreeOption[]
}

export interface DecisionTreeRecommendation {
    title: string
    path: string
    reason: string
}

export interface DecisionTreeProps {
    questions: DecisionTreeQuestion[]
    getRecommendation: (answers: Record<string, string>) => DecisionTreeRecommendation
    buttonText?: string
}

export const DecisionTree: React.FC<DecisionTreeProps> = ({
    questions,
    getRecommendation,
    buttonText = 'Follow the guide',
}) => {
    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [recommendation, setRecommendation] = useState<DecisionTreeRecommendation | null>(null)

    const currentQuestion = questions[step]

    const handleAnswer = (questionId: string, value: string) => {
        const newAnswers = { ...answers, [questionId]: value }
        setAnswers(newAnswers)

        const nextQuestions = questions.slice(step + 1)
        const hasMoreQuestions = nextQuestions.some((q) => !q.condition || q.condition(newAnswers))

        if (hasMoreQuestions) {
            setStep(step + 1)
        } else {
            const rec = getRecommendation(newAnswers)
            setRecommendation(rec)
        }
    }

    const reset = () => {
        setStep(0)
        setAnswers({})
        setRecommendation(null)
    }

    const handleBack = () => {
        let prevStep = step - 1
        while (prevStep >= 0) {
            const prevQuestion = questions[prevStep]
            if (!prevQuestion.condition || prevQuestion.condition(answers)) {
                break
            }
            prevStep--
        }
        const prevQuestion = questions[prevStep]
        if (prevQuestion) {
            const newAnswers = { ...answers }
            delete newAnswers[prevQuestion.id]
            questions.slice(prevStep + 1).forEach((q) => {
                delete newAnswers[q.id]
            })
            setAnswers(newAnswers)
        }
        setStep(prevStep)
    }

    useEffect(() => {
        if (currentQuestion && currentQuestion.condition && !currentQuestion.condition(answers)) {
            const nextStep = questions.findIndex((q, i) => i > step && (!q.condition || q.condition(answers)))
            if (nextStep !== -1) {
                setStep(nextStep)
            } else {
                const rec = getRecommendation(answers)
                setRecommendation(rec)
            }
        }
    }, [step, answers])

    if (recommendation) {
        return (
            <div className="border border-primary rounded-md p-5 bg-accent my-4">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-green flex items-center justify-center flex-shrink-0">
                        <IconCheck className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <h4 className="text-lg font-bold m-0 mb-2">{recommendation.title}</h4>
                        <p className="text-[15px] opacity-75 m-0 mb-4">{recommendation.reason}</p>

                        <div className="flex flex-wrap gap-2">
                            {buttonText && recommendation.path && (
                                <OSButton
                                    asLink
                                    to={recommendation.path}
                                    variant="primary"
                                    size="md"
                                    icon={<IconArrowRight className="w-4 h-4" />}
                                    iconPosition="right"
                                >
                                    {buttonText}
                                </OSButton>
                            )}
                            <OSButton
                                onClick={reset}
                                variant="secondary"
                                size="md"
                                icon={<IconRevert className="w-4 h-4" />}
                            >
                                Start over
                            </OSButton>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (!currentQuestion) return null

    return (
        <div className="border border-primary rounded-md p-5 bg-accent my-4">
            {step > 0 && (
                <OSButton
                    onClick={handleBack}
                    variant="default"
                    size="sm"
                    icon={<IconArrowLeft className="size-4" />}
                    className="mb-3 opacity-60 hover:opacity-100"
                >
                    Back
                </OSButton>
            )}

            <div className="mb-4">
                <h4 className="text-lg font-bold m-0">{currentQuestion.question}</h4>
                {currentQuestion.description && (
                    <p className="text-[15px] opacity-75 m-0 mt-1">{currentQuestion.description}</p>
                )}
            </div>

            <div className="grid sm:grid-cols-2 gap-2">
                {currentQuestion.options.map((option) => (
                    <OSButton
                        key={option.value}
                        onClick={() => handleAnswer(currentQuestion.id, option.value)}
                        variant="secondary"
                        size="md"
                        width="full"
                        align="left"
                    >
                        {option.label}
                    </OSButton>
                ))}
            </div>
        </div>
    )
}

export default DecisionTree

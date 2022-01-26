import React from 'react'
import AskAQuestion from './AskAQuestion'
import Question from './Question'

export default function CommunityQuestions({ questions }) {
    return (
        <>
            {questions.length > 0 && (
                <div className="my-10">
                    <h3 className="mb-4">Community questions</h3>
                    <div className="w-full max-w-[405px] grid gap-5">
                        {questions.map((question, index) => {
                            return <Question key={index} question={question} />
                        })}
                    </div>
                </div>
            )}
            <AskAQuestion />
        </>
    )
}

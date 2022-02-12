import React from 'react'
import AskAQuestion from './AskAQuestion'
import Question from './Question'

export default function CommunityQuestions({ questions }) {
    return (
        <>
            {questions.length > 0 && (
                <div className="my-10">
                    <h3 className="mb-4">Community questions</h3>
                    <div className="w-full grid gap-5">
                        {questions.map((question, index) => {
                            return (
                                question.childrenReply &&
                                question.childrenReply.length > 0 && (
                                    <Question key={index} question={question.childrenReply} />
                                )
                            )
                        })}
                    </div>
                </div>
            )}
            <AskAQuestion />
        </>
    )
}

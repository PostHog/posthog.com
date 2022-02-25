import { useLocation } from '@reach/router'
import { supabase } from 'lib/supabase'
import React, { useEffect, useState } from 'react'
import AskAQuestion from './AskAQuestion'
import Question from './Question'

export default function CommunityQuestions() {
    const [questions, setQuestions] = useState([])
    const { pathname } = useLocation()

    const getMessages = async () => {
        // Get all messages
        const messages = await supabase.from('messages').select('subject, id').contains('slug', [pathname])
        Promise.all(
            messages.data.map((message) => {
                return supabase
                    .from('replies')
                    .select(
                        `
                id,
                created_at,
                body,
                user (
                    first_name, last_name
                )
                `
                    )
                    .eq('message_id', message.id)
                    .then((data) => ({
                        message: message,
                        replies: data.data,
                    }))
            })
        ).then((messages) => setQuestions(messages))
    }

    useEffect(() => {
        if (pathname) {
            getMessages()
        }
    }, [pathname])
    return (
        <>
            {questions.length > 0 && (
                <div className="my-10">
                    <h3 className="mb-4">Community questions</h3>
                    <div className="w-full grid gap-5">
                        {questions.map((question, index) => {
                            const { id, subject } = question.message
                            return <Question subject={subject} id={id} key={id} replies={question.replies} />
                        })}
                    </div>
                </div>
            )}
            <AskAQuestion />
        </>
    )
}

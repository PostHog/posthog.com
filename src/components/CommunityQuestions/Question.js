import { Auth } from '@supabase/ui'
import { Blockquote } from 'components/BlockQuote'
import { CodeBlock } from 'components/CodeBlock'
import { InlineCode } from 'components/InlineCode'
import Link from 'components/Link'
import { ZoomImage } from 'components/ZoomImage'
import moment from 'moment'
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import AskAQuestion from './AskAQuestion'
import Avatar from './Avatar'

export const Days = ({ created, url, className = '' }) => {
    const now = moment()
    const days = now.diff(created, 'days')
    return (
        <Link
            to={url}
            className={`font-normal ml-2 text-black hover:text-black dark:text-white dark:hover:text-white opacity-30 ${className}`}
        >
            {days <= 0 ? 'Today' : `${days} day${days === 1 ? '' : 's'} ago`}
        </Link>
    )
}

export const Reply = ({ user, body, teamMember, created_at, parentId, id, className = '' }) => {
    const components = {
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: CodeBlock,
        img: ZoomImage,
    }
    return (
        <div id={id} className={`pt-4 rounded-md w-full mt-3 ${className}`}>
            <div className="flex space-x-4 items-start">
                <Avatar image={user?.avatar} />
                <div className="min-w-0">
                    <p className="m-0 text-[14px] font-semibold text-black dark:text-white">
                        <span>{user?.first_name || 'Anonymous'}</span>
                        <span className="opacity-50">, {teamMember?.frontmatter?.jobTitle || 'Contributor'}</span>
                        <Days created={created_at} url={`/questions/${parentId}`} />
                    </p>
                    <div className="my-3">
                        <ReactMarkdown>{body}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Question({ replies, subject, id }) {
    const components = {
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: CodeBlock,
        img: ZoomImage,
    }
    const { body, user, created_at } = replies[0]
    const [showReply, setShowReply] = useState(false)
    const auth = Auth.useUser()

    const handleSubmit = (body) => {
        const replyBody = {
            ...body,
            messageID: id,
        }
        return fetch('/.netlify/functions/reply-to-question', {
            method: 'POST',
            body: JSON.stringify(replyBody),
        }).then((res) => res.json())
    }
    return (
        <div className="flex items-start space-x-4 w-full">
            <Avatar image={user?.avatar} />
            <div className="flex-grow max-w-[405px]">
                {subject && <h3 className="m-0 mb-1 text-[15px]">{subject}</h3>}
                <div>
                    <ReactMarkdown>{body}</ReactMarkdown>
                </div>
                <p className="text-[14px] mb-3 text-black dark:text-white">
                    <span className="font-semibold opacity-50">by {user?.first_name || 'Contributor'}</span>{' '}
                    <Days created={created_at} url={`/questions/${id}`} />
                </p>
                {replies.length > 1 &&
                    replies.slice(1).map((reply, index) => {
                        return <Reply key={reply.id} {...reply} />
                    })}
                {auth.user &&
                    (!showReply ? (
                        <button onClick={() => setShowReply(true)} className="text-red font-semibold rounded-md">
                            Reply
                        </button>
                    ) : (
                        <div>
                            <AskAQuestion onSubmit={handleSubmit} subject={false} buttonText="Submit reply" />
                        </div>
                    ))}
            </div>
        </div>
    )
}

import React, { createContext, useEffect, useState } from 'react'
import { useOrg } from '../hooks/useOrg'
import { useUser } from '../hooks/useUser'
import { doDelete, patch, post } from '../lib/api'

type QuestionContextValue = {
  [key: string]: any
}

export const Context = createContext<QuestionContextValue>({})

type QuestionProviderProps = {
  children: React.ReactNode
  question: Record<string, any> // TODO: Real question type
  onResolve: (resolved: boolean, replyId: string | null) => void
  onSubmit: React.FormEventHandler
  [key: string]: any
}

export const Provider: React.FC<QuestionProviderProps> = ({
  children,
  question,
  onResolve,
  onSubmit,
  ...other
}) => {
  const { organizationId, apiHost } = useOrg()
  const { user } = useUser()
  const [replies, setReplies] = useState<any[]>([])
  const [resolvedBy, setResolvedBy] = useState(question?.resolved_reply_id)
  const [resolved, setResolved] = useState<boolean>(question?.resolved)
  const [firstReply] = replies
  const questionAuthorId = firstReply?.profile?.id || null

  const handleResolve = async (
    resolved: boolean,
    replyId: string | null = null
  ) => {
    await post(apiHost, '/api/question/resolve', {
      messageId: question?.id,
      replyId,
      organizationId,
      resolved
    })
    setResolved(resolved)
    setResolvedBy(replyId)
    if (onResolve) {
      onResolve(resolved, replyId)
    }
  }

  const handleReply = async (reply: Record<string, any>) => {
    setReplies((replies) => [...replies, reply])
  }

  const handleReplyDelete = async (id: string) => {
    await doDelete(apiHost, `/api/replies/${id}`, { organizationId })
    setReplies(replies.filter((reply) => id !== reply.id))
  }

  const handlePublish = async (id: string, published: boolean) => {
    await patch(apiHost, `/api/replies/${id}`, {
      organizationId: organizationId,
      published
    })
    const newReplies = [...replies]
    newReplies.some((reply) => {
      if (reply.id === id) {
        reply.published = published
        return true
      }
    })
    setReplies(newReplies)
  }

  useEffect(() => {
    setReplies(
      other.replies.filter(
        (reply: any) =>
          reply.published || (!reply.published && user?.isModerator)
      )
    )
  }, [other.replies, user?.id])

  useEffect(() => {
    setResolved(question.resolved)
  }, [question.resolved])

  useEffect(() => {
    setResolvedBy(question.resolved_reply_id)
  }, [question.resolved_reply_id])

  const value = {
    replies,
    resolvedBy,
    resolved,
    questionAuthorId,
    question,
    onSubmit,
    handleReply,
    handleResolve,
    handleReplyDelete,
    handlePublish
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

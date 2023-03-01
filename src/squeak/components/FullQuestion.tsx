import { Provider as QuestionProvider } from '../context/question'
import { useQuestion } from '../hooks/useQuestion'
import { Provider as OrgProvider } from "../context/org"
import { Provider as UserProvider } from "../context/user"
import root from 'react-shadow/styled-components'
import { Theme } from './Theme'

import ErrorBoundary from './ErrorBoundary'
import QuestionForm from './QuestionForm'
import Reply from './Reply'
import {useRef} from 'react'

const getBadge = (
  questionAuthorId: string,
  replyAuthorId: string,
  replyAuthorRole: string
) => {
  if (replyAuthorRole === 'admin' || replyAuthorRole === 'moderator') {
    return 'Moderator'
  }

  if (!questionAuthorId || !replyAuthorId) {
    return null
  }

  return questionAuthorId === replyAuthorId ? 'Author' : null
}

type RepliesProps = {
  question: Question
}

const Replies = ({ question }: RepliesProps) => {
  const { resolved, onSubmit } = useQuestion()
  const { replies } = question

  return (
    <>
      {replies && replies.length - 1 > 0 && (
        <ul
          className={`squeak-replies`}
        >
          {replies.slice(1).map((reply) => {
            const replyAuthorMetadata =
              reply?.profile?.profiles_readonly?.[0] ||
              reply?.profile?.metadata?.[0]

            const badgeText = getBadge(
              replies[0].profile?.id,
              reply?.profile?.id,
              replyAuthorMetadata?.role
            )

            return (
              <li
                key={reply.id}
                className={`${false ? 'squeak-solution' : ''} ${
                  !reply.published ? 'squeak-reply-unpublished' : ''
                }`}
              >
                <Reply
                  className='squeak-post-reply'
                  {...reply}
                  badgeText={badgeText}
                />
              </li>
            )
          })}
        </ul>
      )}
      {resolved ? (
        <div className='squeak-locked-message'>
         <p>This thread has been closed</p>
        </div>
      ) : (
        <div className='squeak-reply-form-container'>
          {/* @ts-ignore */}
          <QuestionForm
            onSubmit={onSubmit}
            messageID={question.id}
            formType='reply'
          />
        </div>
      )}
    </>
  )
}

type Reply = {
  id: string
  profile: Record<string, any>
  created_at: string
  body: string
  published: boolean
}

type Question = {
  id: string
  subject: string
  permalink: string | null
  published: boolean
  replies: Reply[]
}

export type QuestionProps = {
  onSubmit: (question: any) => void
  onResolve: (resolved: boolean, replyId: string | null) => void
  apiHost: string
  organizationId: string
  question: Question
}

export const FullQuestion = ({
  onSubmit,
  onResolve,
  apiHost,
  organizationId,
  question,
}: QuestionProps) => {
  const [firstReply] = question?.replies || []

  /*const getQuestion = async () => {
    const permalink = window.location.pathname
    // @ts-ignore
    const { response, data: question } =
      (await get(apiHost, '/api/question', {
        organizationId,
        permalink
      })) || {}

    if (response?.status !== 200) return null

    return question
  }

  useEffect(() => {
    if (!question && permalink_base) {
      getQuestion().then((question) => {
        setQuestion(question?.question)
        setReplies(question?.replies || [])
      })
    }
  }, [organizationId, question, permalink_base])

  useEffect(() => {
    setQuestion(other?.question)
  }, [other?.question])*/

  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <ErrorBoundary>
      {/* @ts-ignore */}
      <root.div ref={containerRef}>
        <OrgProvider value={{ organizationId, apiHost }}>
          <Theme containerRef={containerRef} />
          <UserProvider>
            <div className='squeak'>
              <div className='squeak-question-container'>
                <Reply
                  className='squeak-post'
                  subject={question.subject}
                  {...firstReply}
                />
                <QuestionProvider
                  onSubmit={onSubmit}
                  question={question}
                  replies={question.replies}
                  onResolve={onResolve}
                >
                  <Replies question={question} />
                </QuestionProvider>
              </div>
            </div>
          </UserProvider>
        </OrgProvider>
      </root.div>
    </ErrorBoundary>
  )
}

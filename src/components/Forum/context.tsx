import { createContext, useContext } from 'react'
import { ForumTopic } from './hooks'

// Actions that open the forum's modals. The Forum app owns the modal state; the sidebar and headers call these.
export type ForumActions = {
    editTopic: (topic?: ForumTopic) => void
    deleteTopic: (topic: ForumTopic) => void
    manageTags: () => void
    manageSubscriptions: () => void
}

export const ForumActionsContext = createContext<ForumActions>({
    editTopic: () => undefined,
    deleteTopic: () => undefined,
    manageTags: () => undefined,
    manageSubscriptions: () => undefined,
})

export const useForumActions = () => useContext(ForumActionsContext)

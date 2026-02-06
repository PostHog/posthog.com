import { kea, actions, reducers } from 'kea'

import type { codeBlockLogicType } from './codeBlockLogicType'

/**
 * Manages code block language/tab preferences that persist across page refreshes
 * and sync in real-time across all code blocks with the same syncKey.
 *
 * Usage: Add syncKey="install" or syncKey="sdk" to a MultiLanguage code block
 * to enable preference synchronization for that group.
 */
export const codeBlockLogic = kea<codeBlockLogicType>([
    // Path is required for localStorage persistence
    { path: ['components', 'CodeBlock', 'codeBlockLogic'] },

    actions({
        setPreference: (syncKey: string, value: string) => ({ syncKey, value }),
    }),

    reducers({
        preferences: [
            {} as Record<string, string>,
            { persist: true },
            {
                setPreference: (state, { syncKey, value }) => ({
                    ...state,
                    [syncKey]: value,
                }),
            },
        ],
    }),
])

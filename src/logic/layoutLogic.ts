import { kea, actions, reducers } from 'kea'

import type { layoutLogicType } from './layoutLogicType'

export const layoutLogic = kea<layoutLogicType>([
    actions({
        setAnchorOpen: (open: boolean) => ({ open }),
        setAnchorHide: (hide: boolean) => ({ hide }),

        setSidebarOpen: (open: boolean) => ({ open }),
        setSidebarHide: (hide: boolean) => ({ hide }),

        setSidebarDocked: (docked: boolean) => ({ docked }),
        setSidebarContentEntry: (entry) => ({ entry }),
        setWebsiteTheme: (theme: 'dark' | 'light') => ({ theme }),
        setSidebarContentStructure: (entry, tree, dir) => ({ entry, tree, dir }),
        onSidebarContentExpanded: (expandedKeys) => ({ expandedKeys }),
        onSidebarContentSelected: (selectedKey) => ({ selectedKey }),
        onChangeMenuState: (nItem) => ({ nItem }),
        setIsGetStartedModalOpen: (open) => ({ open }),
    }),

    reducers({
        anchorOpen: [
            false,
            {
                setAnchorOpen: (_, { open }) => open,
            },
        ],
        anchorHide: [
            false,
            {
                setAnchorHide: (_, { hide }) => hide,
            },
        ],
        sidebarOpen: [
            false,
            {
                setSidebarOpen: (_, { open }) => open,
                setSidebarHide: () => false,
                setSidebarDocked: () => false,
            },
        ],
        sidebarHide: [
            false,
            {
                setSidebarHide: (_, { hide }) => hide,
            },
        ],
        sidebarDocked: [
            false,
            {
                setSidebarDocked: (_, { docked }) => docked,
            },
        ],
        websiteTheme: [
            'light',
            {
                setWebsiteTheme: (_, { theme }) => theme,
            },
        ],
        sidebarExpandedKeys: [
            [],
            {
                onSidebarContentExpanded: (_, { expandedKeys }) => expandedKeys,
            },
        ],
        sidebarSelectedKey: [
            '',
            {
                onSidebarContentSelected: (_, { selectedKey }) => selectedKey,
            },
        ],
        sidebarEntry: [
            null,
            {
                setSidebarContentEntry: (_, { entry }) => entry,
            },
        ],
        sidebarSelectedEntry: [
            null,
            {
                setSidebarContentStructure: (_, { entry }) => entry,
            },
        ],
        sidebarContentTree: [
            null,
            {
                setSidebarContentStructure: (_, { tree }) => tree,
            },
        ],
        sidebarContentDir: [
            [],
            {
                setSidebarContentStructure: (_, { dir }) => dir,
            },
        ],
        menuOpen: [
            false,
            {
                onChangeMenuState: (state) => !state,
            },
        ],
        menuNItem: [
            null,
            {
                onChangeMenuState: (_, { nItem }) => nItem,
            },
        ],
        isGetStartedModalOpen: [
            false,
            {
                setIsGetStartedModalOpen: (_, { open }) => open,
            },
        ],
    }),
])

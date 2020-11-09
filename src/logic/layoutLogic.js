import { kea } from 'kea'

export const layoutLogic = kea({
    actions: {
        setAnchorOpen: (open) => ({ open }),
        setAnchorHide: (hide) => ({ hide }),

        setSidebarOpen: (open) => ({ open }),
        setSidebarHide: (hide) => ({ hide }),

        setSidebarDocked: (docked) => ({ docked }),
        setSidebarContentEntry: (entry) => ({ entry }),
        setWebsiteTheme: (theme) => ({ theme }),
        setSidebarContentStructure: (entry, tree, dir) => ({ entry, tree, dir }),
        onSidebarContentExpanded: (expandedKeys) => ({ expandedKeys }),
        onSidebarContentSelected: (selectedKey) => ({ selectedKey }),
        onChangeMenuState: (nItem) => ({ nItem }),
    },

    reducers: {
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
                onChangeMenuState: (state, { nItem }) => nItem,
            },
        ],
    },
})

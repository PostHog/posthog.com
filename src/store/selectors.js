// anchor
export const getAnchorState = store => store.layout.anchor;
export const isAnchorHide = store => store.layout.anchor.hide;

// sidebar
export const getSidebarState = store => store.layout.sidebar;
export const getSidebarDockedState = store => store.layout.sidebar.docked;
export const getSidebarExpandedKeys = store => store.layout.sidebar.expandedKeys;
export const getSidebarSelectedKey = store => store.layout.sidebar.selectedKey;
export const getSidebarEntry = store => store.layout.sidebar.entry;
export const getSidebarSelectedEntry = store => store.layout.sidebar.selectedEntry;
export const isSidebarHide = store => store.layout.sidebar.hide;

// menu
export const getMenuState = store => store.layout.menu;
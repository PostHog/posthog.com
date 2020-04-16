import { 
  SET_ANCHOR_OPEN,
  SET_SIDEBAR_OPEN, 
  SET_SIDEBAR_DOCKED, 
  SET_SIDEBAR_CONTENT_ENTRY,
  ON_SIDEBAR_CONTENT_EXPANDED, 
  ON_SIDEBAR_CONTENT_SELECTED,
  ON_CHANGE_MENU_STATE,
  SET_SIDEBAR_CONTENT_STRUCTURE,
  SET_ANCHOR_HIDE,
  SET_SIDEBAR_HIDE,
} from "./actionTypes";

// anchor
export const onSetAnchorOpen = (open) => ({
  type: SET_ANCHOR_OPEN,
  payload: {
    anchorOpen: open
  }
})

export const onSetAnchorHide = (hide) => ({
  type: SET_ANCHOR_HIDE,
  payload: { anchorHide: hide }
})

// sidebar
export const onSetSidebarOpen = (open) => ({
  type: SET_SIDEBAR_OPEN,
  payload: { sidebarOpen: open }
})

export const onSetSidebarDocked = (docked) => ({
  type: SET_SIDEBAR_DOCKED,
  payload: { sidebarDocked: docked }
})

export const onSetSidebarHide = (hide) => ({
  type: SET_SIDEBAR_HIDE,
  payload: { sidebarHide: hide }
})

export const onSetSidebarContentEntry = (entry) => ({
  type: SET_SIDEBAR_CONTENT_ENTRY,
  payload: { sidebarEntry: entry }
})

export const onSetSidebarContentStructure = (entry, tree, dir) => ({
  type: SET_SIDEBAR_CONTENT_STRUCTURE,
  payload: {
    sidebarTree: tree,
    sidebarDir: dir,
    selectedEntry: entry
  }
})

export const onSidebarContentExpanded = (keys) => ({
  type: ON_SIDEBAR_CONTENT_EXPANDED,
  payload: { expandedKeys: keys }
})

export const onSidebarContentSelected = (key) => ({
  type: ON_SIDEBAR_CONTENT_SELECTED,
  payload: { selectedKey: key }
})

// menu
export const onChangeMenuState = (nItem) => ({
  type: ON_CHANGE_MENU_STATE,
  payload: {
    nItem: nItem,
  }
})
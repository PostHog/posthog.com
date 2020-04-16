import { 
  SET_ANCHOR_OPEN,
  SET_SIDEBAR_OPEN, 
  SET_SIDEBAR_DOCKED,
  SET_SIDEBAR_CONTENT_ENTRY,
  SET_SIDEBAR_CONTENT_STRUCTURE,
  ON_SIDEBAR_CONTENT_EXPANDED,
  ON_CHANGE_MENU_STATE,
  ON_SIDEBAR_CONTENT_SELECTED,
  SET_ANCHOR_HIDE,
  SET_SIDEBAR_HIDE,
} from "../actions/actionTypes";

const initialState = {
  anchor: {
    open: false,
    hide: false
  },
  sidebar: {
    docked: false,
    open: false,
    hide: false,
    expandedKeys: [],
    selectedKey: '',
    entry: null,
    selectedEntry: null,
    contentTree: null,
    contentDir: []
  },
  menu : { open : false },
}

export default function(state=initialState, action) {
  switch (action.type) {

    // anchor
    case SET_ANCHOR_OPEN: {
      return {
        ...state,
        anchor: { 
          ...state.anchor,
          open: action.payload.anchorOpen 
        }
      }
    }
    case SET_ANCHOR_HIDE: {
      return {
        ...state,
        anchor: {
          ...state.anchor,
          hide: action.payload.anchorHide,
          open: false
        }
      }
    }
    // sidebar
    case SET_SIDEBAR_OPEN: {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          open: action.payload.sidebarOpen
        }
      }
    }
    case SET_SIDEBAR_DOCKED: {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          docked: action.payload.sidebarDocked,
          open: action.payload.sidebarOpen
        }
      }
    }
    case SET_SIDEBAR_HIDE: {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          hide: action.payload.sidebarHide,
          open: false
        }
      }
    }
    case SET_SIDEBAR_CONTENT_ENTRY: {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          entry: action.payload.sidebarEntry
        }
      }
    }
    case SET_SIDEBAR_CONTENT_STRUCTURE: {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          selectedEntry: action.payload.selectedEntry,
          contentTree: action.payload.sidebarTree,
          contentDir: action.payload.sidebarDir
        }
      }
    }
    case ON_SIDEBAR_CONTENT_EXPANDED: {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          expandedKeys: action.payload.expandedKeys,
        }
      }
    }
    case ON_SIDEBAR_CONTENT_SELECTED: {
      return {
        ...state,
        sidebar: {
          ...state.sidebar,
          selectedKey: action.payload.selectedKey,
        }
      }
    }
    //menu
    case ON_CHANGE_MENU_STATE: {
      return {
        ...state,
        menu: {
          open: !state.menu.open,
          nItem: action.payload.nItem,
        }
      }
    }
    default: return state
  }
}
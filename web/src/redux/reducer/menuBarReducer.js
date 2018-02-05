const defaultState = () => {
    return {collapsed: true};
};

export default (state = defaultState(), action) => {
    switch (action.type) {
        case MENU_BAR_COLLAPSED:
            return {...state, collapsed: action.payload};
    }
    return state;
};

export const MENU_BAR_COLLAPSED = "MENU_BAR_COLLAPSED";

export const setMenuBarCollapsed = (bool) => {
    return {
        type: MENU_BAR_COLLAPSED,
        payload: bool
    };
};
const defaultState = () => {
    return {recipe: null, editing: false};
};

export default (state = defaultState(), action) => {
    switch (action.type) {
        case SET_RECIPE:
            return {...state, recipe: action.payload};
        case EDIT_RECIPE:
            return {...state, editing: action.payload};
    }
    return state;
}

export const SET_RECIPE = "VIEWING_RECIPE";
export const EDIT_RECIPE = "EDITING_RECIPE";

export const setRecipe = (recipe) => {
    return {
        type: SET_RECIPE,
        payload: recipe
    };
};

export const editRecipe = (bool) => {
    return {
        type: EDIT_RECIPE,
        payload: bool
    };
};
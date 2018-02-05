const defaultState = () => {
    return {
        items: []
    };
};

export default (state = defaultState(), action) => {
    switch (action.type) {
        case SET_RECIPE_LIST_ITEMS:
            return {...state, items: action.payload};
    }
    return state;
};

export const SET_RECIPE_LIST_ITEMS = "SET_RECIPE_LIST_ITEMS";

export const setRecipeListItems = (recipeViewArray) => {
    return {
        type: SET_RECIPE_LIST_ITEMS,
        payload: recipeViewArray
    };
};
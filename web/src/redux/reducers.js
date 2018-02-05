import {combineReducers} from 'redux';
import recipeReducer from './reducer/recipeReducer';
import menuBarReducer from './reducer/menuBarReducer';
import recipeListViewReducer from './reducer/recipeListViewReducer';

export default combineReducers({
    recipe: recipeReducer,
    menuBar: menuBarReducer,
    recipeListView: recipeListViewReducer
});
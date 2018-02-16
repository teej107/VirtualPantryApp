import {combineReducers} from 'redux';
import recipeReducer from './reducer/recipeReducer';
import menuBarReducer from './reducer/menuBarReducer';
import recipeListViewReducer from './reducer/recipeListViewReducer';
import measurementReducer from './reducer/measurementReducer';

export default combineReducers({
    recipe: recipeReducer,
    menuBar: menuBarReducer,
    recipeListView: recipeListViewReducer,
    measurement: measurementReducer
});
import React, {Component} from 'react';
import RecipePage from "../component/RecipePage";
import MenuBar from '../component/MenuBar';
import RecipeList from '../component/RecipeList';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import {setRecipe} from "../redux/reducer/recipeReducer";
import {setRecipeListItems} from "../redux/reducer/recipeListViewReducer";
import axios from 'axios';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const CONFIG = {
    baseURL: 'http://localhost:8080/api/',
    transformResponse: [(data) => JSON.parse(data)]
};

const REQUEST = axios.create(CONFIG);
const TRANSFORM_RESPONSE = (...callbacks) => {
    return {
        transformResponse: CONFIG.transformResponse.concat(callbacks)
    };
};

const mapStateToProps = (store, props) => {
    return {
        recipe: store.recipe.recipe,
        ...props
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        setRecipe: (recipe) => dispatch(setRecipe(recipe)),
        setRecipeListView: (recipeListItems) => dispatch(setRecipeListItems(recipeListItems))
    };
};

class App extends Component {

    constructor(props) {
        super(props);
        this.recipeListItems = [];
    }

    componentDidMount() {
        REQUEST.get('recipelist', {
            headers: {'Content-Type': 'application/hal+json;charset=UTF-8'}
        }).then(response => response.data).then(recipeViewArr => {
            const recipeListItems = recipeViewArr.map(recipeView => {
                return {
                    recipeView,
                    onClick: this.recipeViewOnClick(recipeView)
                };
            });
            this.recipeListItems = recipeListItems;
            this.props.setRecipeListView(recipeListItems);
        });
    }

    recipeViewOnClick(recipeView) {
        return () => {
            REQUEST.get(recipeView.href).then(response => {
                const ingredientHref = response.data.ingredients.map(
                    ingredient => REQUEST.get(ingredient._links.measurement.href));

                axios.all(ingredientHref).then(responseArr => {
                    responseArr.forEach(response2 => {
                        response.data.ingredients.forEach(ingredient => {
                            ingredient.measurement = response2.data.abbreviation;
                        });
                    });
                    this.menuBar.getWrappedInstance().clearSearch();
                    this.props.setRecipe(response.data);
                });
            });
        };
    }

    onSearchInput = (event) => {
        const filter = event.currentTarget.value;
        const filteredList = this.recipeListItems
            .filter(item => item.recipeView.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1);

        this.props.setRecipeListView(filteredList);
    };

    render() {
        const showingRecipe = (bool) => bool ? "" : "d-none";
        return (
            <div>
                <MenuBar ref={input => this.menuBar = input}
                         onInput={this.onSearchInput}/>
                <Container>
                    <RecipeList ref={input => this.recipeViewList = input}
                                className={showingRecipe(Boolean(!this.props.recipe))}/>
                    <RecipePage ref={input => this.recipePage = input}
                                className={showingRecipe(Boolean(this.props.recipe))}/>
                </Container>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

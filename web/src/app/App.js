import React, {Component} from 'react';
import RecipePage from "../component/RecipePage";
import MenuBar from '../component/MenuBar';
import RecipeList from '../component/RecipeList';
import RecipeListItem from "../component/RecipeListItem";
import {Container} from 'reactstrap';
import axios from 'axios';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const CONFIG = {
    transformResponse: [(data) => JSON.parse(data)]
};

const REQUEST = axios.create(CONFIG);
const TRANSFORM_RESPONSE = (...callbacks) => {
    return {
        transformResponse: CONFIG.transformResponse.concat(callbacks)
    }
};

const EMPTY_FUNCTION = () => {
};

export default class App extends Component {

    constructor() {
        super();
        this.state = {showingRecipe: false};
        this.recipeViewData = [];
    }

    loadRecipes(callback = EMPTY_FUNCTION) {
        REQUEST.get('recipelist', {
            baseURL: 'http://localhost:8080/api/',
            headers: {'Content-Type': 'application/hal+json;charset=UTF-8'}
        }).then(response => callback(response.data));
    }

    componentDidMount() {
        this.loadRecipes((recipeViewArr) => {
            const recipeListItems = recipeViewArr.map(recipeView => this.recipeViewToComponent(recipeView));
            this.recipeViewData = recipeViewArr;
            this.recipeViewList.setItems(recipeListItems);
        });
    }

    recipeViewToComponent(recipeView) {
        const handleClick = () => {
            REQUEST.get(recipeView.href).then(response => {
                this.recipePage.setRecipe(response.data);
                this.menuBar.clearSearch();
                this.setState({showingRecipe: true});
            });
        };
        return <RecipeListItem key={recipeView.href} view={recipeView} onClick={handleClick}/>
    }

    onSearchInput = (event) => {
        const filter = event.currentTarget.value;
        const filteredList = this.recipeViewData.filter(view => view.title.toLowerCase().indexOf(filter.toLowerCase()) !== -1);

        this.recipeViewList.setItems(filteredList.map(recipeView => this.recipeViewToComponent(recipeView)));
    };

    render() {
        const showingRecipe = (bool) => bool ? "" : "d-none";

        return (
            <div>
                <MenuBar ref={input => this.menuBar = input}
                         onInput={this.onSearchInput}/>
                <Container>
                    <RecipeList ref={input => this.recipeViewList = input}
                                className={showingRecipe(!this.state.showingRecipe)}/>
                    <RecipePage ref={input => this.recipePage = input}
                                className={showingRecipe(this.state.showingRecipe)}/>
                </Container>
            </div>
        );
    }
}

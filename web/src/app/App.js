import React, {Component} from 'react';
import RecipePage from "../component/RecipePage";
import MenuBar from '../component/MenuBar';
import RecipeListItem from "../component/RecipeListItem";
import {Container} from 'reactstrap';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';

import './App.css';

const CONFIG = {
    baseURL: 'http://localhost:8080/api/',
    headers: {'Content-Type': 'application/hal+json;charset=UTF-8'},
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
        this.state = {
            currentView: null
        };
        this.recipePage = <RecipePage/>;
    }

    loadRecipeList(callback = EMPTY_FUNCTION) {
        REQUEST.get('recipelist').then(response => callback(response.data));
    }

    componentDidMount() {
        this.loadRecipeList((recipeList) => {
            const recipeListItems = recipeList.map(recipeView => {
                const handleClick = () => {

                };
                return <RecipeListItem key={recipeView.href} view={recipeView} onClick={handleClick()}/>
            });

            this.setState({currentView: recipeListItems})
        });
    }


    render() {

        return (
            <div>
                <MenuBar/>
                <Container>
                    {this.state.currentView}
                </Container>
            </div>
        );
    }
}

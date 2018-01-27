import React, {Component} from 'react';
import RecipePage from "../component/RecipePage";
import axios from 'axios';

import 'normalize.css';
import './App.css';

const config = {
    baseURL: 'http://localhost:8080/api/',
    headers: {'Content-Type': 'application/hal+json;charset=UTF-8'},
    transformResponse: [(data) => JSON.parse(data)]
};

const request = axios.create(config);

const transformResponse = (...callbacks) => {
    return {
        transformResponse: config.transformResponse.concat(callbacks)
    }
};

export default class App extends Component {

    componentDidMount() {
        if (!this.page.hasRecipe()) {
            request.get("recipes", transformResponse((data) => data._embedded.recipes))
                .then(response => {
                    this.page.setRecipe(response.data[0])
                });
        }
    }

    render() {
        return (
            <div>
                <RecipePage ref={input => this.page = input}/>
            </div>
        );
    }
}

import React, {Component} from 'react';
import {withRouter, Route, Switch} from 'react-router-dom';
import RecipePage from "../component/recipe/RecipePage";
import MenuBar from '../component/MenuBar';
import RecipeList from '../component/RecipeList';
import {Container} from 'reactstrap';
import {connect} from 'react-redux';
import {setRecipe, editRecipe} from "../redux/reducer/recipeReducer";
import {home, recipes, newRecipe} from '../data/History';
import {setRecipeListItems} from "../redux/reducer/recipeListViewReducer";
import {setMeasurements} from "../redux/reducer/measurementReducer";
import axios from 'axios';
import EditRecipePage from "../component/recipe/EditableRecipePage";
import MeasurementObject from '../data/recipe/MeasurementObject';
import IngredientObject from '../data/recipe/IngredientObject';
import InstructionObject from '../data/recipe/InstructionObject';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.min.css';
import './App.css';

const CONFIG = {
    baseURL: 'http://localhost:8080/api/',
    transformResponse: [(data) => JSON.parse(data)]
};

const REQUEST = axios.create(CONFIG);

const mapStateToProps = (store, props) => {
    return {
        recipe: store.recipe.recipe,
        measurements: store.measurement.measurements,
        ...props
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        setRecipe: (recipe) => dispatch(setRecipe(recipe)),
        setRecipeListView: (recipeListItems) => dispatch(setRecipeListItems(recipeListItems)),
        setEditingRecipe: (bool) => dispatch(editRecipe(bool)),
        initMeasurements: (measurements) => dispatch(setMeasurements(measurements))
    };
};

class App extends Component {

    constructor(props) {
        super(props);
        this.recipeListItems = null;
    }

    historyRouter = (location) => {
        this.props.setEditingRecipe(false);
        switch (location.pathname) {
            case home.pathname: {
                this.props.setRecipe(null);
                document.title = home.title();
                if (this.recipeListItems === null)
                    this.fetchRecipeList(this.viewRecipeList);
                break;
            }
            case newRecipe.pathname: {
                this.props.setEditingRecipe(true);
            }
        }
    };

    componentDidMount() {
        this.unlisten = this.props.history.listen(this.historyRouter);

        const initStack = [];
        const initMeasurements = (measurements) => {
            this.props.initMeasurements(measurements);
            initStack.forEach(fn => fn());
        };

        if (this.props.history.location.pathname === home.pathname)
            initStack.push(this.fetchRecipeList.bind(this, this.viewRecipeList));
        else if (this.props.history.location.pathname.match(recipes.regex))
            initStack.push(this.fetchRecipe.bind(this, this.props.history.location.pathname, this.viewRecipe));

        this.fetchMeasurements(initMeasurements);
    }

    componentWillUnmount() {
        this.unlisten();
    }

    fetchMeasurements(callback) {
        REQUEST.get('measurements')
            .then(response => response.data._embedded.measurements)
            .then(measurements => {
                const measurementTable = measurements.reduce((measurementTable, measurement) => {
                    const href = measurement._links.self.href;
                    measurementTable[href] = new MeasurementObject(measurement);
                    return measurementTable;
                }, {});
                callback(measurementTable);
            });
    }

    fetchRecipeList(callback) {
        REQUEST.get('recipelist', {
            headers: {'Content-Type': 'application/hal+json;charset=UTF-8'}
        }).then(response => response.data).then(recipeViewArr => {
            const recipeListItems = recipeViewArr.map(recipeView => {
                return {
                    recipeView,
                    onClick: this.fetchRecipe.bind(this, recipeView.href, this.viewRecipe)
                };
            });
            callback(recipeListItems);
        });
    }

    viewRecipeList = (recipeListItems) => {
        this.recipeListItems = recipeListItems;
        this.props.setRecipeListView(recipeListItems);
    };

    fetchRecipe(href, callback) {
        REQUEST.get(href).then(response => response.data).then(recipe => {

            recipe.ingredients = recipe.ingredients.map(ingredient => {
                return new IngredientObject(ingredient, this.props.measurements[ingredient._links.measurement.href]);
            });
            recipe.instructions = recipe.instructions.map((instruction, index) => {
                return new InstructionObject(index, instruction.description, instruction.images);
            });
            callback(recipe);
        });
    }

    viewRecipe = (recipe) => {
        this.props.setRecipe(recipe);
        const href = recipe._links.self.href;
        const match = href.match(/\d+$/) || ['null'];
        recipes.push(this.props.history, match[0]);
        document.title = recipes.title(recipe);
        window.scrollTo(0, 0);
    };

    onSearchValueChange = (string) => {
        if (this.recipeListItems instanceof Array) {
            const filteredList = this.recipeListItems
                .filter(item => item.recipeView.title.toLowerCase().indexOf(string.toLowerCase()) !== -1);

            this.props.setRecipeListView(filteredList);
        }
    };

    render() {
        return (
            <div>
                <MenuBar onChange={this.onSearchValueChange}/>
                <Container>
                    <Switch>
                        <Route exact path={home.pathname} component={RecipeList}/>
                        <Route exact path={newRecipe.pathname} component={EditRecipePage}/>
                        <Route path={recipes.pathname} component={RecipePage}/>
                    </Switch>
                </Container>
            </div>
        );
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(App));

import React, {Component} from 'react';
import {copyFromObject} from '../Utilities';
import Ingredient from "./Ingredient";
import Instruction from "./Instruction";

const keys = Object.freeze([
    "title",
    "image",
    "video",
    "description",
    "ingredients",
    "instructions"]);

export default class RecipePage extends Component {

    constructor(props) {
        super(props);
        this.state = copyFromObject(keys, props);
    }

    setRecipe(obj) {
        this.setState(copyFromObject(keys, obj));
    }

    hasRecipe() {
        return this.state.title && this.state.description;
    }

    render() {
        const ingredients = (this.state.ingredients || []).map(obj =>
            <Ingredient key={obj} amount={obj.amount} measurement={obj.measurement}/>
        );

        const instructions = (this.state.instructions || []).map((obj) =>
            <Instruction key={obj} description={obj.description}/>
        );

        return (
            <div className="recipe-page">
                <h1>{this.state.title}</h1>
                <img src={this.state.image} alt={this.state.title}/>
                <div className="iframe-container">
                    <iframe src={this.state.video} allowFullScreen/>
                </div>
                <h2>Description</h2>
                <p>{this.state.description}</p>
                <h2>Ingredients</h2>
                <ul>
                    {ingredients}
                </ul>
                <h2>Instructions</h2>
                <ol>
                    {instructions}
                </ol>
            </div>
        );
    }
}
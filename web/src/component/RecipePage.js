import React, {Component} from 'react';
import {copyFromObject} from '../app/Utilities';
import Ingredient from "./Ingredient";
import Instruction from "./Instruction";
import {str} from '../app/Utilities';

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
        const ingredients = (this.state.ingredients || []).map(obj => (
            <li key={Math.random()} className="list-group-item">
                <Ingredient amount={obj.amount}
                            measurement={obj.measurement}/>
            </li>
        ));

        const instructions = (this.state.instructions || []).map((obj) => (
            <li key={obj.description} className="list-group-item">
                <Instruction description={obj.description}/>
            </li>
        ));

        return (
            <div className={str(this.props.className, "recipe-page")}>
                <h1>{this.state.title}</h1>
                <img src={this.state.image} alt={this.state.title}/>
                <div className="iframe-container">
                    <iframe src={this.state.video} allowFullScreen/>
                </div>
                <h2>Description</h2>
                <p>{this.state.description}</p>
                <h2>Ingredients</h2>
                <ul className="list-group">
                    {ingredients}
                </ul>
                <h2>Instructions</h2>
                <ol className="list-group">
                    {instructions}
                </ol>
            </div>
        );
    }
}
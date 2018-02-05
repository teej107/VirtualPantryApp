import React, {Component} from 'react';
import {copyFromObject} from '../app/Utilities';
import Ingredient from "./Ingredient";
import Instruction from "./Instruction";
import EditableComponent from './EditableComponent';
import {toClassName} from '../app/Utilities';
import {Row, Col, InputGroup, InputGroupAddon, Input} from 'reactstrap';
import {connect} from 'react-redux';

const keys = Object.freeze([
    "title",
    "image",
    "video",
    "description",
    "ingredients",
    "instructions"]);

const mapStateToProps = (store, props) => {
    return {
        ...store.recipe.recipe,
        ...store.recipe.editing,
        ...props
    };
};

class RecipePage extends Component {

    hasRecipe() {
        return this.props.title && this.props.description;
    }

    render() {

        const ingredients = (this.props.ingredients || []).map(obj => (
            <li key={Math.random()} className="list-group-item">
                <Ingredient amount={obj.amount}
                            measurement={obj.measurement}
                            name={obj.name}/>
            </li>
        ));

        const instructions = (this.props.instructions || []).map((obj, i) => (
            <li key={obj.description} className="list-group-item">
                <Instruction description={obj.description} index={i}/>
            </li>
        ));

        return (
            <div ref={ref => this.parent = ref} className={toClassName(this.props.className, "recipe-page mx-auto")}>
                <EditableComponent className="pb-2">
                    <h1 className="text-center">{this.props.title}</h1>
                    <Row editor>
                        <Col className="col-6 mx-auto">
                            <InputGroup size="lg">
                                <InputGroupAddon className="input-group-prepend">
                                    <span className="input-group-text">Title</span>
                                </InputGroupAddon>
                                <Input/>
                            </InputGroup>
                        </Col>
                    </Row>
                </EditableComponent>
                <Row>
                    <Col className="col-lg-8 col-md-10 col-sm-12 mx-auto">
                        <img src={this.props.image} alt={this.props.title}/>
                        <div className="iframe-container mt-1">
                            <iframe src={this.props.video} allowFullScreen/>
                        </div>
                    </Col>
                </Row>
                <div className="mt-2 mt-sm-4">
                    <h2>Description</h2>
                    <p>{this.props.description}</p>
                    <h2>Ingredients</h2>
                    <ul className="list-group">
                        {ingredients}
                    </ul>
                    <h2>Instructions</h2>
                    <ol className="list-group">
                        {instructions}
                    </ol>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps
)(RecipePage);
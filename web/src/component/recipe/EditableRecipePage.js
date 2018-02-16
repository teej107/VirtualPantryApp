import React, {Component} from 'react';
import {Col, Input, InputGroup, InputGroupAddon, Row, Button} from "reactstrap";
import {connect} from 'react-redux';
import IngredientObject from "../../data/recipe/IngredientObject";
import EditableInstruction from "./EditableInstruction";
import EditableIngredient from "./EditableIngredient";
import InstructionObject from "../../data/recipe/InstructionObject";
import DraggableList from 'react-draggable-list';
import ListHeader from '../ListHeader';

const COL_CLASS_NAME = "col-lg-8 col-md-10 col-sm-12 mx-auto";

const mapStateToProps = (store, props) => {
    return {
        recipe: store.recipe.recipe,
        ...props
    };
};

class EditRecipePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ingredients: this.props.recipe ? this.props.recipe.ingredients : [],
            instructions: this.props.recipe ? this.props.recipe.instructions : []
        };
    }

    onInstructionsClick = () => {
        this.state.instructions.push(new InstructionObject());
        this.setState(this.state);
    };

    onIngredientsClick = () => {
        this.state.ingredients.push(new IngredientObject());
        this.setState(this.state);
    };

    onIngredientsMoveEnd = (newList) => {
        this.state.ingredients = newList;
    };

    onInstructionsMoveEnd = (newList) => {
        this.state.instructions = newList;
    };

    render() {

        return (
            <div>
                <Row className="pb-2">
                    <Col className={COL_CLASS_NAME}>
                        <InputGroup size="lg">
                            <InputGroupAddon className="input-group-prepend">
                                <span className="input-group-text text-center">Title</span>
                            </InputGroupAddon>
                            <Input/>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="pb-2">
                    <Col className={COL_CLASS_NAME}>
                        <InputGroup size="lg">
                            <InputGroupAddon className="input-group-prepend">
                                <span className="input-group-text text-center">Image</span>
                            </InputGroupAddon>
                            <Input placeholder="URL"/>
                        </InputGroup>
                    </Col>
                </Row>
                <Row className="pb-2">
                    <Col className={COL_CLASS_NAME}>
                        <InputGroup size="lg">
                            <InputGroupAddon className="input-group-prepend">
                                <span className="input-group-text text-center">Video</span>
                            </InputGroupAddon>
                            <Input placeholder="Embed URL"/>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Description</h2>
                        <textarea className="form-control"/>
                        <ListHeader title="Ingredients" onClick={this.onIngredientsClick}/>
                        <DraggableList ref={input => this.ingredientsList = input}
                                       list={this.state.ingredients}
                                       itemKey="key"
                                       template={EditableIngredient}
                                       onMoveEnd={this.onIngredientsMoveEnd}/>
                        <hr className={this.state.ingredients.length === 0 ? "" : "d-none"}/>
                        <ListHeader title="Instructions" onClick={this.onInstructionsClick}/>
                        <DraggableList list={this.state.instructions}
                                       itemKey="key"
                                       template={EditableInstruction}
                                       onMoveEnd={this.onInstructionsMoveEnd}/>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <Button color="success" outline>Save</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(
    mapStateToProps
)(EditRecipePage);
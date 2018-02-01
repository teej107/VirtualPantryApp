import React, {Component} from 'react';
import {toArray, toClassName} from '../app/Utilities';

const cssClass = "editable-component";

export default class EditableComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false
        };
    }

    static getEditableComponents(parentNode) {
        let editableArr = [];
        toArray(parentNode.children).forEach(child => {
            const classNames = child.props.className.split(' ');
            if (classNames.includes(cssClass))
                editableArr.push(child);
        });
        return editableArr;
    }

    setEditing(bool) {
        this.setState({editing: bool});
    }

    render() {
        const display = toArray(this.props.children).filter(child => Boolean(child.props.editor) === this.state.editing);

        return (
            <div className={toClassName(this.props.className, cssClass)} onClick={this.props.onClick}>
                {display}
            </div>
        );
    }
}
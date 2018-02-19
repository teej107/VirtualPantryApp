import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Input, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Form} from 'reactstrap';
import {connect} from 'react-redux';
import MeasurementObject from "../../data/recipe/MeasurementObject";

const AMOUNT_REGEX = /^(\d+( \d+\/\d+)?)$|^(\d+\/\d+)$/;

const mapStateToProps = (store, props) => {
    return {
        measurements: store.measurement.measurements,
        ...props
    };
};

class EditableIngredient extends Component {

    constructor(props) {
        super(props);
        this.timeout = null;
        this.animation = "animated slideInRight";
        this.state = {
            amount: props.item.amount,
            amountClassName: "",
            name: props.item.name,
            dropdownOpen: false,
            selectedMeasurement: props.item.measurement
        };
    }

    componentDidMount() {
        this.animation = "";
    }

    toggleDropdown = () => {
        const parent = ReactDOM.findDOMNode(this.li).parentElement;
        parent.style.zIndex = this.state.dropdownOpen ? '0' : '1000';

        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    };

    onNameChange = (event) => {
        this.setState({
            name: event.currentTarget.value
        });
    };

    onAmountChange = (event) => {
        const value = event.currentTarget.value;
        this.setState({
            amount: value,
            amountClassName: AMOUNT_REGEX.test(value) ? "" : "border border-danger shadow-danger"
        });
    };

    onMeasurementSelected = (measurement) => {
        this.setState({
            selectedMeasurement: measurement
        });
    };

    getMeasurementString = () => {
        if (this.state.selectedMeasurement instanceof MeasurementObject) {
            return this.state.selectedMeasurement.abbreviation;
        }
        return "Unit";
    };

    render() {
        const dropdownMeasurements = [];
        for (const key in this.props.measurements) {
            if (this.props.measurements.hasOwnProperty(key)) {
                dropdownMeasurements.push(
                    <DropdownItem key={key}
                                  onClick={this.onMeasurementSelected.bind(this, this.props.measurements[key])}>
                        {this.props.measurements[key].abbreviation}
                    </DropdownItem>
                );
            }
        }


        return (
            <li ref={input => this.li = input}
                className={`list-group-item mb-2 ${this.animation}`}>
                <span>
                    {this.props.dragHandle(<span className="fa fa-bars pr-3 touch-action-none">&nbsp;</span>)}
                    <Form className="d-inline" inline>
                        <Input className={`max-width-90px mr-md-1 ${this.state.amountClassName}`}
                               value={this.state.amount}
                               onChange={this.onAmountChange}/>
                        <ButtonDropdown className="mr-md-1"
                                        isOpen={this.state.dropdownOpen}
                                        toggle={this.toggleDropdown}>
                            <DropdownToggle className="min-width-70px"
                                            caret>{this.getMeasurementString()}</DropdownToggle>
                            <DropdownMenu>
                                {dropdownMeasurements}
                            </DropdownMenu>
                        </ButtonDropdown>
                        <Input value={this.state.name} onChange={this.onNameChange}/>
                    </Form>
                </span>
            </li>
        );
    }
}

export default connect(
    mapStateToProps
)(EditableIngredient);
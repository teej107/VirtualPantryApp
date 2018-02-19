import React, {Component} from 'react';
import {Row, Col, InputGroup, InputGroupAddon, Input} from 'reactstrap';

export default class InputRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value || ""
        };
    }

    get value() {
        return this.state.value;
    }

    onChange = (event) => {
        this.setState({
            value: event.currentTarget.value
        });
    };

    render() {
        return (
            <Row className="pb-2">
                <Col className="col-lg-8 col-md-10 col-sm-12 mx-auto">
                    <InputGroup size="lg">
                        <InputGroupAddon className="input-group-prepend">
                            <span className="input-group-text text-center">{this.props.title}</span>
                        </InputGroupAddon>
                        <Input placeholder={this.props.placeholder} value={this.state.value} onChange={this.onChange}/>
                    </InputGroup>
                </Col>
            </Row>
        );
    }
}
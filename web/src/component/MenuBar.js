import React, {Component} from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    NavItem,
    NavLink,
    Nav,
    Form,
    FormGroup,
    Button,
    Input,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';

export default class MenuBar extends Component {

    constructor() {
        super();
        this.state = {collapsed: true};
    }

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    render() {
        return (
            <Navbar color="light" expand="md" light>
                <NavbarBrand href="/">Virtual Pantry</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar}/>
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink href="#">Recipes</NavLink>
                        </NavItem>
                    </Nav>
                    <Nav navbar className="ml-auto">
                        <Form inline className="navbar-right">
                            <InputGroup>
                                <Input placeholder='Search'/>
                                {/* className used due to react error:
                                    https://github.com/reactstrap/reactstrap/issues/770#issuecomment-356472250 */}
                                <InputGroupAddon className='input-group-append'>
                                    <Button color="primary">@</Button>
                                </InputGroupAddon>
                            </InputGroup>
                        </Form>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}
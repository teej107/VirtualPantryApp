import React, {Component} from 'react';
import {Navbar, Nav, NavItem, Form, FormGroup, Button, FormControl} from 'react-bootstrap/lib';

export default class MenuBar extends Component {

    render() {
        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href='/'>Virtual Pantry</a>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem>
                            Recipes
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem>
                            <Form inline>
                                <FormGroup>
                                    <FormControl type="text" placeholder="Search"/>
                                    <Button color="primary">@</Button>
                                </FormGroup>
                            </Form>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}
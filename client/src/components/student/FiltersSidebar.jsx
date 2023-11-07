import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../componentsStyle.css'
import {
    Navbar,
    Container,
    Row, Col, Form,
    Image,
    Button,
    Collapse,
    ListGroup,
    ListGroupItem,
    Card,
    CardHeader, CardBody
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {ModalOfProposal} from "./StudentSearch";

const Sidebar = () => {
    return (
        <Col className="ms-0" sm={3} style={{backgroundColor:"#e0e0e0"}}>
            <Form style={{marginTop:"80px"}}>
                <h3>Filters</h3>
                <Form.Group controlId="">
                    <Form.Label>Filter 1</Form.Label>
                    <Form.Control type="" placeholder="" />
                </Form.Group>

                <Form.Group controlId="">
                    <Form.Label>Filter 2</Form.Label>
                    <Form.Control type="" placeholder="" />
                </Form.Group>

                <Button className="mt-3" variant="primary" type="submit">
                    Apply Filters
                </Button>
            </Form>
        </Col>
    );
};

export { Sidebar };
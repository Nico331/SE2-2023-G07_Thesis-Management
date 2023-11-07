import React, { useState } from 'react';
import dayjs from "dayjs";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../componentsStyle.css';
import Select from 'react-select';
import {Container, Col, Form, Button,} from 'react-bootstrap';

function extractUniqueOptions(array, attr) {
    let unique = [];
    let existent = {};

    array.forEach((e) => {
        var val = e[attr];
        if (!existent[val]) {
            unique.push({value: val, label: val});
            existent[val] = true;
        }
    });

    return unique;
}

function Sidebar(props) {
    const [supervisors, setSupervisors] = useState();
    const [types, setTypes] = useState();
    const [groups, setGroups] = useState();
    const [courses, setCourses] = useState();
    const [expiration, setExpiration] = useState(dayjs());
    const [level, setLevel] = useState();

    return (
        <Col className="ms-0 px-4" sm={3} style={{backgroundColor:"#e0e0e0"}}>
            <Form style={{marginTop:"80px"}}>
                <h3>Filters</h3>
                <Form.Group className="mt-2" controlId="">
                    <Form.Label>Search</Form.Label>
                    <Form.Control type="" placeholder="Search" />
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Supervisor</Form.Label>
                    <Select options={extractUniqueOptions(props.proposals, "supervisor")} isMulti value={supervisors} onChange={(selectedOptions) => setSupervisors(selectedOptions)}/>
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Type</Form.Label>
                    <Select options={extractUniqueOptions(props.proposals, "type")} isMulti value={types} onChange={(selectedOptions) => setTypes(selectedOptions)}/>
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Group</Form.Label>
                    <Select options={extractUniqueOptions(props.proposals, "group")} isMulti value={groups} onChange={(selectedOptions) => setGroups(selectedOptions)}/>
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Expiration Date</Form.Label>
                    <Form.Control type="date" value={expiration}/>
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Level</Form.Label>
                    <Select options={[{value:"bachelor", label:"bachelor"},{value:"master", label:"master"}]} isMulti value={level} onChange={(selectedOptions) => setLevel(selectedOptions)}/>
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Course Of Study</Form.Label>
                    <Select options={extractUniqueOptions(props.proposals, "cds")} isMulti value={courses} onChange={(selectedOptions) => setCourses(selectedOptions)}/>
                </Form.Group>

                <Container className="d-flex p-0">
                    <Button className="mt-3" variant="primary" type="submit">Apply Filters</Button>
                    <Button className="mt-3 ms-4" variant="danger" type="submit">Cancel Filters</Button>
                </Container>

            </Form>
        </Col>
    );
}

export { Sidebar };
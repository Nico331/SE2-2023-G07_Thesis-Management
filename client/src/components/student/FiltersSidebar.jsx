import React, { useState, useEffect } from 'react';
import dayjs from "dayjs";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../componentsStyle.css';
import Select from 'react-select';
import {Container, Col, Form, Button, Row} from 'react-bootstrap';

function Sidebar(props) {
    const [flag, setFlag] = useState(true);
    const [supervisors, setSupervisors] = useState([]);
    const [types, setTypes] = useState([]);
    const [groups, setGroups] = useState([]);
    const [courses, setCourses] = useState([]);
    const [expiration, setExpiration] = useState(dayjs());
    const [levels, setLevels] = useState([]);

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

    useEffect(() => {
        if(flag) setFlag(false);
        else {
            let proposals = props.proposals;
            console.log(supervisors);
            if(supervisors.length > 0) proposals = proposals.filter((p) => supervisors.find((s) => s.value === p.supervisor));
            if(types.length > 0) proposals = proposals.filter((p) => types.find((s) => s.value === p.type));
            if(groups.length > 0) proposals = proposals.filter((p) => groups.find((s) => s.value === p.group));
            if(courses.length > 0) proposals = proposals.filter((p) => courses.find((s) => s.value === p.cds));
            if(levels.length > 0) proposals = proposals.filter((p) => levels.find((s) => s.value === p.level));
            props.setPropsOnScreen(proposals);
        }
    }, [supervisors, types, groups, courses, levels]);

    return (
        <Col className="ms-0 px-4" sm={4} style={{backgroundColor:"#e0e0e0"}}>
            <Form style={{marginTop:"80px"}}>
                <Container><h3>Filters</h3></Container>
                <Container style={{maxHeight:"82vh", overflowY:"auto"}}>
                    <Form.Group className="mt-2" controlId="">
                        <Form.Label>Search</Form.Label>
                        <Form.Control type="" placeholder="Search" />
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Form.Label>Supervisor</Form.Label>
                        <Select options={extractUniqueOptions(props.proposals, "supervisor")} isMulti value={supervisors} onChange={(selectedOptions) => setSupervisors(selectedOptions)}/>
                    </Form.Group>

                    <Row className="mt-2 p-0">
                        <Col sm={6}>
                            <Form.Group className="">
                                <Form.Label>Type</Form.Label>
                                <Select options={extractUniqueOptions(props.proposals, "type")} isMulti value={types} onChange={(selectedOptions) => setTypes(selectedOptions)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="">
                                <Form.Label>Group</Form.Label>
                                <Select options={extractUniqueOptions(props.proposals, "group")} isMulti value={groups} onChange={(selectedOptions) => setGroups(selectedOptions)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row clasName="mt-2 p-0">
                        <Col sm={6}>
                            <Form.Group className="mt-2">
                                <Form.Label>Level</Form.Label>
                                <Select options={[{value:"bachelor", label:"bachelor"},{value:"master", label:"master"}]} isMulti value={levels} onChange={(selectedOptions) => setLevels(selectedOptions)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mt-2">
                                <Form.Label>Course Of Study</Form.Label>
                                <Select options={extractUniqueOptions(props.proposals, "cds")} isMulti value={courses} onChange={(selectedOptions) => setCourses(selectedOptions)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mt-2">
                        <Form.Label>Expiration Date</Form.Label>
                        <Form.Control type="date" value={expiration}/>
                    </Form.Group>

                    <Button className="mt-4" variant="danger" onClick={()  => {
                        setSupervisors([]);
                        setCourses([]);
                        setGroups([]);
                        setLevels([]);
                        setTypes([]);
                    }}>Cancel Filters</Button>
                </Container>
            </Form>
        </Col>
    );
}

export { Sidebar };
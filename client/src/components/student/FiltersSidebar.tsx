import React, { useState, useEffect } from 'react';
import dayjs from "dayjs";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../componentsStyle.css';
import axios from 'axios';
import Select from 'react-select';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';
import {handleInputChange} from "react-select/dist/declarations/src/utils";


function Sidebar(props) {
    const [flag, setFlag] = useState(true);
    const [search, setSearch] = useState("");
    const [makeSearch, setMakeSearch] = useState(true);
    const [keyWord, setKeyWord] = useState([]);
    const [supervisors, setSupervisors] = useState([]);
    const [types, setTypes] = useState([]);
    const [groups, setGroups] = useState([]);
    const [courses, setCourses] = useState([]);
    const [expiration, setExpiration] = useState("");
    const [levels, setLevels] = useState([]);
    const [professors, setProfessors] = useState(() => {
        const profList = [];
        props.professors.map((p) => profList.push({value: p.id, label: p.name + " " + p.surname}));
        console.log(profList);
        return profList;
    });
    const sendRequestToBackend = () => {
        let filters = [];
        if (search !== "") {
            filters.push("search="+search);
        }
        if (keyWord.length > 0) {
            filters.push("keyWord="+keyWord.map(s => s.value).join(','));
        }
        if (supervisors.length > 0) {
            filters.push("supervisor=" +supervisors.map(s => s.value).join(','));
        }
        if(types.length>0) {
            filters.push("type="+types.map(s=> s.value).join(','));
        }
        if(groups.length>0){
            filters.push("groups="+groups.map(s=>s.value).join(','));
        }
        if(expiration){
            filters.push("expiration="+expiration);
        }
        if(levels.length>0){
            filters.push("level="+levels.map(s=>s.value).join(','));
        }

        axios.get('http://localhost:8081/API/proposals/filters?'+filters.join('&'), {

        })
            .then(response => {
                props.setPropsOnScreen(response.data);
            })
            .catch(error => {
                console.error('Errore nella richiesta al back-end:', error);
            });
    };

    function extractUniqueOptions(array, attr) {
        let unique = [];
        let existent = {};

        if(attr === "supervisor" || attr === "type") {
            array.forEach((e) => {
                let val = e[attr];
                if (!existent[val]) {
                    unique.push({value: val, label: val});
                    existent[val] = true;
                }
            });
        }
        else {
            array.forEach((a) => {
                a[attr].forEach((e) => {
                    if (!existent[e]) {
                        unique.push({value: e, label: e});
                        existent[e] = true;
                    }
                })
            });
        }

        return unique;
    }

    useEffect(() => {
        if(flag) setFlag(false);
        else {
            sendRequestToBackend()
            /*
            let proposals = props.proposals;
            if(keyWord !== "") proposals = proposals.filter((p) => p.keywords.find((k) => k === keyWord));
            if(supervisors.length > 0) proposals = proposals.filter((p) => supervisors.find((s) => s.value === p.supervisor));
            if(types.length > 0) proposals = proposals.filter((p) => types.find((s) => s.value === p.type));
            if(groups.length > 0) proposals = proposals.filter((p) => groups.find((s) => p.groups.find((g) => g === s.value)));
            if(courses.length > 0) proposals = proposals.filter((p) => courses.find((s) => p.cdS.find((c) => c === s.value)));
            if(levels.length > 0) proposals = proposals.filter((p) => levels.find((s) => s.value === p.level));
            if(expiration !== "") proposals = proposals.filter((p) => {
                const itemDate = dayjs(dayjs(p.expiration).format('YYYY-MM-DD'));
                const filterDateObj = dayjs(dayjs(expiration).format('YYYY-MM-DD'));
                const diff = filterDateObj.diff(itemDate);
                return diff >= 0;
            });
            props.setPropsOnScreen(proposals);

             */
        }
    }, [makeSearch, keyWord, supervisors, types, groups, courses, levels, expiration]);

    return (
        <Col className="ms-0 px-4" sm={4} style={{height:"90vh", backgroundColor:"#e0e0e0"}}>
            <Form className="mt-4">
                <Container><h3>Filters</h3></Container>
                <Container style={{height:"82vh", overflowY:"auto"}}>
                    <Form.Group className="mt-2">
                        <Form.Label>Search</Form.Label>
                        <Row className="mt-2">
                            <Col sm={9}>
                                <Form.Control type="text" placeholder="Search" value={search} onChange={kw => setSearch(kw.target.value)}/>
                            </Col>
                            <Col sm={3}>
                                <Button variant="primary" onClick={() => setMakeSearch(!makeSearch)}>Search</Button>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Form.Group className="">
                                <Form.Label>Keywords</Form.Label>
                                <Select options={extractUniqueOptions(props.proposals, "keywords")} isMulti value={keyWord} onChange={(selectedOptions) => setKeyWord(selectedOptions)}/>
                            </Form.Group>
                        </Row>
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Form.Label>Supervisor</Form.Label>
                        <Select options={professors}
                        isMulti value={supervisors} onChange={(selectedOptions) => setSupervisors(selectedOptions)}/>
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
                                <Select options={extractUniqueOptions(props.proposals, "groups")} isMulti value={groups} onChange={(selectedOptions) => setGroups(selectedOptions)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-2 p-0">
                        <Col sm={6}>
                            <Form.Group className="mt-2">
                                <Form.Label>Level</Form.Label>
                                <Select options={[{value:"PhD", label:"PhD"},{value:"Masters", label:"Masters"},{value:"Bachelor", label:"Bachelor"}]} isMulti value={levels} onChange={(selectedOptions) => setLevels(selectedOptions)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group className="mt-2">
                                <Form.Label>Course Of Study</Form.Label>
                                <Select options={extractUniqueOptions(props.proposals, "cdS")} isMulti value={courses} onChange={(selectedOptions) => setCourses(selectedOptions)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mt-2">
                        <Form.Label>Expiration Date</Form.Label>
                        <Form.Control type="date" value={expiration} onChange={d => setExpiration(d.target.value)}/>
                    </Form.Group>

                    <Button className="mt-4" variant="danger" onClick={()  => {
                        setSearch("");
                        setKeyWord([]);
                        setSupervisors([]);
                        setCourses([]);
                        setGroups([]);
                        setLevels([]);
                        setTypes([]);
                        setExpiration("");
                    }}>Cancel Filters</Button>
                </Container>
            </Form>
        </Col>
    );
}
export default Sidebar;



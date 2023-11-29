import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../componentsStyle.css';
import axios from 'axios';
import Select from 'react-select';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';

type prop = {
    title: string,
    supervisor: string,
    coSupervisors: Array<string>,
    keywords: Array<string>,
    type: string,
    groups: Array<string>,
    description: string,
    requiredKnowledge: string,
    notes: string,
    expiration: Date,
    level: string,
    cdS: Array<string>,
    archived: boolean
}

type prof = {
    id: string,
    name: string,
    surname: string,
    email: string,
    codGroup: string,
    codDepartment: string,
    passwordHash: string
}

type FiltersSidebarProps = {
    proposals: Array<prop>;
    setPropsOnScreen: Dispatch<SetStateAction<Array<prop> | null>>;
    professors: Array<prof>;
    resetFilters: boolean;
    setResetFilters: Dispatch<SetStateAction<boolean>>;
    date: Date;
};

const Sidebar: React.FC<FiltersSidebarProps> = ({proposals, setPropsOnScreen, professors, resetFilters, setResetFilters, date}) => {
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

    const sendRequestToBackend = () => {
        let filters = [];

        if (keyWord.length > 0) {
            filters.push("keywords="+keyWord.map(s => s.value).join(','));
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
        let searchParameter = ""
        if(search!=""){
            searchParameter+="search="+search
        }
        axios.get('http://localhost:8081/API/proposals/filters?'+filters.join('&') + searchParameter, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        })
            .then(response => {
                setPropsOnScreen(response.data.sort((a,b) => {return a.title.localeCompare(b.title)}));
            })
            .catch(error => {
                console.error('Errore nella richiesta al back-end:', error);
            });
    };

    function extractUniqueOptions(array: string[][]) {
        let set: Set<string> = new Set();
        array.forEach((a: string[]) => a.forEach((e) => set.add(e)))
        return Array.from(set).map((e) => {return {value: e, label: e}}).sort((a,b) => {return a.value.localeCompare(b.value)});
    }

    useEffect(() => {
        if(flag) setFlag(false);
        else {
            sendRequestToBackend();
        }
    }, [makeSearch, keyWord, supervisors, types, groups, courses, levels, expiration]);

    useEffect(() => {
        setSearch("");
        setKeyWord([]);
        setSupervisors([]);
        setCourses([]);
        setGroups([]);
        setLevels([]);
        setTypes([]);
        setExpiration("");
    }, [resetFilters])

    return (
        <Col className="ms-0 px-4" sm={5} style={{backgroundColor:"#e0e0e0"}}>
            <Form className="text-start" style={{marginTop:"80px"}}>
                <Container>
                    <h3><i className="bi bi-funnel-fill me-2"></i>Filters</h3>
                </Container>
                <Container style={{height:"82vh", overflowY:"auto"}}>
                    <Form.Group className="mt-2">
                        <Form.Label>Search</Form.Label>
                        <Row className="mt-2">
                            <Col sm={9}>
                                <Form.Control type="text" placeholder="Search" value={search} onChange={kw => setSearch(kw.target.value)}/>
                            </Col>
                            <Col sm={3}>
                                <Button variant="primary" onClick={() => setMakeSearch(!makeSearch)}><i className="bi bi-search"></i></Button>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Form.Group className="">
                                <Form.Label>Keywords</Form.Label>
                                <Select options={extractUniqueOptions(proposals.map((p: prop) => p.keywords))} isMulti value={keyWord} onChange={(selectedOptions) => setKeyWord(selectedOptions)}/>
                            </Form.Group>
                        </Row>
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Form.Label>Supervisor</Form.Label>
                        <Select options={professors.map((p: prof) => {return { value: p.id,  label: p.name + " " + p.surname}}).sort((a,b) => {return a.label.localeCompare(b.label)})} isMulti value={supervisors} onChange={(selectedOptions) => {setSupervisors(selectedOptions)}}/>
                    </Form.Group>

                    <Row className="mt-2 p-0">
                        <Col sm={6}>
                            <Form.Group>
                                <Form.Label>Type</Form.Label>
                                <Select options={extractUniqueOptions(proposals.map((p: prop) => [p.type]))} isMulti value={types} onChange={(selectedOptions) => setTypes(selectedOptions)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group>
                                <Form.Label>Group</Form.Label>
                                <Select options={extractUniqueOptions(proposals.map((p: prop) => p.groups))} isMulti value={groups} onChange={(selectedOptions) => setGroups(selectedOptions)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-2 p-0">
                        <Col sm={6}>
                            <Form.Group>
                                <Form.Label>Level</Form.Label>
                                <Select options={[{value:"PhD", label:"PhD"},{value:"Masters", label:"Masters"},{value:"Bachelor", label:"Bachelor"}]} isMulti value={levels} onChange={(selectedOptions) => setLevels(selectedOptions)}/>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group>
                                <Form.Label>Course Of Study</Form.Label>
                                <Select options={extractUniqueOptions(proposals.map((p: prop) => p.cdS))} isMulti value={courses} onChange={(selectedOptions) => setCourses(selectedOptions)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mt-2">
                        <Form.Label>Expiration Date</Form.Label>
                        <Form.Control type="date" min={date.toISOString().slice(0, 10)} value={expiration} onChange={d => setExpiration(d.target.value)}/>
                    </Form.Group>

                    <Button className="mt-4" variant="danger" onClick={()  => setResetFilters(!resetFilters)}>Cancel Filters</Button>
                </Container>
            </Form>
        </Col>
    );
}
export default Sidebar;



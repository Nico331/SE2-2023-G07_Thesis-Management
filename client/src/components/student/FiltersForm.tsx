import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Select from "react-select";
import Proposal from "../../types/Proposal";
import Professor from "../../types/Professor";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import ProposalService from "../../services/ProposalService";

type FiltersFormProps = {
    proposals: Array<Proposal>;
    setPropsOnScreen: Dispatch<SetStateAction<Array<Proposal> | null>>;
    professors: Array<Professor>;
    resetFilters: boolean;
    setResetFilters: Dispatch<SetStateAction<boolean>>;
    refresh: boolean;
    setRefresh: Dispatch<SetStateAction<boolean>>;
    isScreenSmall: boolean;
    setShowFilterModal: Dispatch<SetStateAction<boolean>>;
};

const FilterForm: React.FC<FiltersFormProps> = ({proposals, setPropsOnScreen, professors, resetFilters, setResetFilters, refresh, setRefresh, isScreenSmall, setShowFilterModal}) => {
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

    const sendRequestToBackend = async () => {
        let filters = [];

        if (keyWord.length > 0) {
            filters.push("keywords=" + keyWord.map(s => s.value).join(','));
        }
        if (supervisors.length > 0) {
            filters.push("supervisor=" + supervisors.map(s => s.value).join(','));
        }
        if (types.length > 0) {
            filters.push("type=" + types.map(s => s.value).join(','));
        }
        if (groups.length > 0) {
            filters.push("groups=" + groups.map(s => s.value).join(','));
        }
        if (courses.length > 0) {
            filters.push("cdS=" + courses.map(s => s.value).join(','));
        }
        if (expiration) {
            filters.push("expiration=" + expiration);
        }
        if (levels.length > 0) {
            filters.push("level=" + levels.map(s => s.value).join(','));
        }
        let searchParameter = ""
        if (search != "") {
            searchParameter += "search=" + search
        }

        const response = await ProposalService.fetchAllProposalsFiltered(filters.join('&') + searchParameter);
        setPropsOnScreen(response.data.sort((a, b) => {return a.title.localeCompare(b.title)}));
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
        setRefresh(!refresh);
    }, [resetFilters])

    return (
        <Col className={isScreenSmall ? "m-0 p-0 w-100" : "ms-0 px-4"} sm={5} style={isScreenSmall ? {} : {backgroundColor:"#e0e0e0"}}>
            <Form className="text-start" style={isScreenSmall ? {} : {marginTop:"100px"}}>
                {isScreenSmall ? <></> :
                    <Container>
                        <h3><i className="bi bi-funnel-fill me-2"></i>Filters</h3>
                    </Container>
                }
                <Container className={isScreenSmall ? "p-3" : ""} style={isScreenSmall ? {} : {height:"82vh", overflowY:"auto"}}>
                    <Form.Group className={isScreenSmall ? "" : "mt-2"}>
                        <Form.Label>Search</Form.Label>
                        <Row className="mt-2">
                            <Col className="pe-0" sm={isScreenSmall ? 0 : 7} style={isScreenSmall ? {width:"200px"} : {}}>
                                <Form.Control style={isScreenSmall ? {width:"200px"} : {}} type="text" placeholder="Search" value={search} onChange={kw => setSearch(kw.target.value)} id="search-box"/>
                            </Col>
                            <Col className="d-flex ms-2">
                                <Button variant="primary" onClick={() => {
                                    setMakeSearch(!makeSearch);
                                    if(isScreenSmall) setShowFilterModal(false);
                                }} id="search-btn">
                                    <i className="bi bi-search"></i>
                                </Button>
                                <Button className="ms-2" variant="danger" onClick={() => {
                                    setSearch("");
                                    setMakeSearch(!makeSearch);
                                }} id="cancel-search-btn">
                                    <i className="bi bi-x-lg"></i>
                                </Button>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Form.Group className="">
                                <Form.Label>Keywords</Form.Label>
                                <Select id="keywords" options={extractUniqueOptions(proposals.map((p: Proposal) => p.keywords))} isMulti value={keyWord} onChange={(selectedOptions) => setKeyWord(selectedOptions)}/>
                            </Form.Group>
                        </Row>
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Form.Label>Supervisor</Form.Label>
                        <Select options={professors.map((p: Professor) => {return { value: p.id,  label: p.name + " " + p.surname}}).sort((a,b) => {return a.label.localeCompare(b.label)})}
                                isMulti
                                value={supervisors}
                                onChange={(selectedOptions) => {setSupervisors(selectedOptions)}}
                                id="supervisor"
                        />
                    </Form.Group>

                    <Row className="mt-2 p-0">
                        <Col sm={6}>
                            <Form.Group>
                                <Form.Label>Type</Form.Label>
                                <Select options={extractUniqueOptions(proposals.map((p: Proposal) => [p.type]))} isMulti value={types} onChange={(selectedOptions) => setTypes(selectedOptions)} id="type"/>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group>
                                <Form.Label>Group</Form.Label>
                                <Select options={extractUniqueOptions(proposals.map((p: Proposal) => p.groups))} isMulti value={groups} onChange={(selectedOptions) => setGroups(selectedOptions)} id="group"/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-2 p-0">
                        <Col sm={6}>
                            <Form.Group>
                                <Form.Label>Level</Form.Label>
                                <Select options={[{value:"PhD", label:"PhD"},{value:"Masters", label:"Masters"},{value:"Bachelor", label:"Bachelor"}]} isMulti value={levels} onChange={(selectedOptions) => setLevels(selectedOptions)} id="level"/>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group>
                                <Form.Label>Course Of Study</Form.Label>
                                <Select options={extractUniqueOptions(proposals.map((p: Proposal) => p.cdS))} isMulti value={courses} onChange={(selectedOptions) => setCourses(selectedOptions)} id="courseOfStudy"/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group className="mt-2">
                        <Form.Label>Expiration Date</Form.Label>
                        <Form.Control type="date" value={expiration} onChange={d => setExpiration(d.target.value)} id="expiration-date"/>
                    </Form.Group>

                    <Container className="d-flex p-0">
                        {isScreenSmall ? <Button className="mt-4" onClick={() => setShowFilterModal(false)}>Accept</Button> : <></>}
                        <Button className={isScreenSmall ? "ms-2 mt-4" : "mt-4"} variant="danger"
                                onClick={()  => {
                                    setResetFilters(!resetFilters);
                                    if(isScreenSmall) setShowFilterModal(false);
                                }} id="cancel-filters">
                            Cancel Filters
                        </Button>
                    </Container>

                </Container>
            </Form>
        </Col>
    )
}

export default FilterForm;
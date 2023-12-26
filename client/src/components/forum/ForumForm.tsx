// ForumForm.tsx
import React, {useEffect, useState} from 'react';
import {createTopic, getTheses} from "../../services/ForumService";
import {Button, Container, Form, Row} from "react-bootstrap";
import Select from "react-select";
import {ForumVisibility, newTopic} from "../../types/Forum";
import {Thesis} from "../../types/Thesis";

const ForumForm: React.FC = () => {
    const [topic, setTopic] = useState<newTopic>({
        name: '',
        description: '',
        thesis: '',
        visibility: ForumVisibility.PROTECTED // Imposta un valore predefinito
    });
    const [theses, setTheses] = useState<Array<Thesis>>([]);
    const [selectedThesis, setSelectedThesis] = useState(null);
    const [error, setError] = useState("");
    useEffect(()=>{
       const res = getTheses();
       res.then(r=>{
           setTheses(r);
       })
           .catch(e=>{console.log(e)});
    },[])
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (topic.description && topic.name && topic.visibility && selectedThesis?.value){
            // @ts-ignore
            createTopic({...topic, thesis: selectedThesis.value} )
                .then(r => console.log(r))
                .catch(e => console.log(e));
        } else {
            setError("All required fields should be compiled!");
        }
    };
        useEffect(()=>{console.log(selectedThesis)},[selectedThesis])

    return (
        <>
            <Container>
                <h1 style={{ marginTop: "110px" }}>New Topic</h1>
                {error!=="" && <h4 style={{color: "red"}}>{error}</h4>}
                <Form noValidate className="mt-5" onSubmit={handleSubmit}>
                    <Row>
                        <div className="col-lg-6 col-md-12">
                            <Form.Group controlId="name">
                                <Form.Label className="h3">Name*</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter topic name"
                                    value={topic.name}
                                    onChange={(e) => setTopic({ ...topic, name: e.target.value })}
                                />
                            </Form.Group>
                        </div>
                        <div className="col-lg-6 col-md-12">
                            <Form.Group controlId="thesis">
                                <Form.Label className="h3">Thesis*</Form.Label>
                                <Select
                                    options={ theses.map((thesis) => {return { value: thesis.id, label: thesis.title }})}
                                    value={theses.find(thesis => thesis.id === topic.thesis)?.title}
                                    onChange={(newValue) => setSelectedThesis(newValue)}
                                />
                            </Form.Group>
                        </div>
                    </Row>
                    <Row className={"mt-3"}>
                        <div className="col-lg-12 col-md-12">
                            <Form.Group controlId="description">
                                <Form.Label className="h3">Description*</Form.Label>
                                <Form.Control
                                    required
                                    as="textarea"
                                    rows={4}
                                    placeholder="Enter description"
                                    value={topic.description}
                                    onChange={(e) => setTopic({ ...topic, description: e.target.value })}
                                />
                            </Form.Group>
                        </div>
                    </Row>
                    <Row>
                        <div className="col-lg-6 col-md-12">
                            <Form.Group controlId="visibility">
                                <Form.Label className="h3">Visibility*</Form.Label>
                                <Form.Control as="select" value={topic.visibility}
                                              onChange={(e) => setTopic({ ...topic, visibility: e.target.value})}>
                                    <option value="PUBLIC">Public</option>
                                    <option value="PROTECTED">Protected</option>
                                    <option value="PRIVATE">Private</option>
                                </Form.Control>
                            </Form.Group>
                        </div>
                    </Row>
                    <br />
                    <Button variant="primary" type="submit">
                        Create Topic
                    </Button>
                    <br /><br />
                </Form>
            </Container>
        </>

    );
};

export default ForumForm;

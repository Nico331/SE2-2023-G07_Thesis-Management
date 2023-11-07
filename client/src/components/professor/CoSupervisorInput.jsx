import React, { useState } from 'react';
import { Form, Button, Accordion, Card, Row } from 'react-bootstrap';

const CoSupervisorInput = ({ onAddCoSupervisor }) => {
    const [coSupervisor, setCoSupervisor] = useState({
        name: '',
        surname: '',
        email: '',
    });

    const addCoSupervisor = () => {
        if (coSupervisor.name && coSupervisor.surname && coSupervisor.email) {
            onAddCoSupervisor({ ...coSupervisor });
            setCoSupervisor({ name: '', surname: '', email: '' });
        }
    };

    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Select Co-Supervisors</Accordion.Header>
                <Accordion.Body><Form.Group controlId="coSupervisorName">
                    <Row>
                        <div className="col-md-4">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter co-supervisor name"
                                value={coSupervisor.name}
                                onChange={(e) => setCoSupervisor({ ...coSupervisor, name: e.target.value })}
                            />
                        </div>
                        <div className="col-md-4">
                            <Form.Label>Surname</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter co-supervisor surname"
                                value={coSupervisor.surname}
                                onChange={(e) => setCoSupervisor({ ...coSupervisor, surname: e.target.value })}
                            />
                        </div>
                        <div className="col-md-4">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter co-supervisor email"
                                value={coSupervisor.email}
                                onChange={(e) => setCoSupervisor({ ...coSupervisor, email: e.target.value })}
                            />
                        </div>
                    </Row>
                </Form.Group>

                    <Button className="mt-3" variant="primary" onClick={addCoSupervisor}>
                        Add Co-Supervisor
                    </Button>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default CoSupervisorInput;

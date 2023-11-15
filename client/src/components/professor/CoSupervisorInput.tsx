import React, { useState } from 'react';
import { Form, Button, Accordion, Card, Row } from 'react-bootstrap';

const CoSupervisorInput = ({ onAddCoSupervisor }) => {
    const [coSupervisor, setCoSupervisor] = useState("");

    const addCoSupervisor = () => {
        if (coSupervisor) {
            onAddCoSupervisor(coSupervisor);
            setCoSupervisor("");
        }
    };

    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Select Co-Supervisors</Accordion.Header>

                <Accordion.Body>
                    <Form.Group controlId="cosupervisor">
                        <Form.Label>Co-supervisor</Form.Label>
                        <Form.Control as="select" custom value={coSupervisor}
                                      onChange={(e) => setCoSupervisor(e.target.value)}>
                            <option value="">Select the supervisor</option>
                            <option value="1">Marco Torchiano</option>
                            <option value="2">Riccardo Sisto</option>
                        </Form.Control>
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

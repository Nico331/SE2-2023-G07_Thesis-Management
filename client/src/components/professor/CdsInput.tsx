import React, {useState} from 'react';
import {Form, Button, Accordion, Card, Row} from 'react-bootstrap';

const CdsInput = ({onAddCds}) => {
    const [cds, setCds] = useState("");

    const addCds = () => {
        if (cds) {
            onAddCds(cds);
            setCds("");
        }
    };

    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Select Cds</Accordion.Header>
                <Accordion.Body>
                    <Form.Group controlId="cdsName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter cds name"
                            value={cds}
                            onChange={(e) => setCds( e.target.value)}
                        />
                    </Form.Group>

                    <Button className="mt-3" variant="primary" onClick={addCds}>
                        Add Cds
                    </Button>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default CdsInput;

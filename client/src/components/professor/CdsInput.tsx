import React, { useState } from 'react';
import { Form, Button, Accordion } from 'react-bootstrap';

interface CdsInputProps {
    onAddCds: (cds: string) => void;
}

const CdsInput: React.FC<CdsInputProps> = ({ onAddCds }) => {
    const [cds, setCds] = useState<string>("");

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
                            onChange={(e) => setCds(e.target.value)}
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

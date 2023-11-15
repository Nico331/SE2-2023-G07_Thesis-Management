import React, {useState} from 'react';
import {Form, Button, Accordion, Card, Row} from 'react-bootstrap';

const GroupInput = ({onAddGroup}) => {
    const [group, setGroup] = useState("");

    const addGroup = () => {
        if (group) {
            onAddGroup(group);
            setGroup("");
        }
    };

    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Select Group</Accordion.Header>
                <Accordion.Body>
                    <Form.Group controlId="groupName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter group name"
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                        />
                    </Form.Group>

                    <Button className="mt-3" variant="primary" onClick={addGroup}>
                        Add Group
                    </Button>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default GroupInput;

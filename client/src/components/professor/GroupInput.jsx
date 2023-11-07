import React, {useState} from 'react';
import {Form, Button, Accordion, Card, Row} from 'react-bootstrap';

const GroupInput = ({onAddGroup}) => {
    const [group, setGroup] = useState({
        name: '',
    });

    const addGroup = () => {
        if (group.name) {
            onAddGroup({...group});
            setGroup({name: ''});
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
                            value={group.name}
                            onChange={(e) => setGroup({...group, name: e.target.value})}
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

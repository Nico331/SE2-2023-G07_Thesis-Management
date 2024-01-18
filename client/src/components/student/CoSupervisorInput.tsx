import React, { useState, useContext } from 'react';
import { Form, Button, Accordion, Alert } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContexts';
import Professor from "../../types/Professor";

interface CoSupervisorInputProps {
    onAddCoSupervisor: (coSupervisor: string | { name: string; surname: string; email: string }) => void;
    professors: Professor[]; // Assuming Professor is a type for your data structure
    coalert: {
        show: boolean;
        type: string; // You might want to replace this with a more specific type
        message: string;
    };
    setCoAlert: (show: boolean) => void;
    updatedprop?: {
        coSupervisors: string[]; // Assuming this is the structure of your updatedprop
    };
}

const CoSupervisorInput: React.FC<CoSupervisorInputProps> = ({
                                                                 onAddCoSupervisor,
                                                                 professors,
                                                                 coalert,
                                                                 setCoAlert,
                                                                 updatedprop,
                                                             }) => {
    const [coSupervisor, setCoSupervisor] = useState('');

    const { user } = useContext(UserContext);

    const addCoSupervisor = () => {
      if (coSupervisor) {
            onAddCoSupervisor(coSupervisor, null);
            setCoSupervisor('');
        }
    };

    return (
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Select Co-Supervisors</Accordion.Header>
                <Accordion.Body>
                    <Form.Group id="cosupervisor">

                        <br/>

                            <Form.Control
                                as="select"
                                value={coSupervisor}
                                onChange={(e) => setCoSupervisor(e.target.value)}
                                id="cosupervisor-input"
                            >
                                <option value="">Select the supervisor</option>
                                {updatedprop
                                    ? professors
                                        .filter(
                                            (professor) =>
                                                professor.id !== JSON.parse(user).id &&
                                                !updatedprop.coSupervisors.includes(professor.id)
                                        )
                                        .map((professor) => (
                                            <option value={professor.id} key={professor.id}>
                                                {professor.name} {professor.surname}
                                            </option>
                                        ))
                                    : professors
                                        .filter((professor) => professor.id !== JSON.parse(user).id)
                                        .map((professor) => (
                                            <option value={professor.id} key={professor.id}>
                                                {professor.name} {professor.surname}
                                            </option>
                                        ))}
                            </Form.Control>

                    </Form.Group>
                    <Button className="mt-3" variant="primary" onClick={addCoSupervisor} id="add-cosup-btn">
                        Add Co-Supervisor
                    </Button>
                    {coalert && coalert.show ? (
                        <Alert
                            className="mt-3"
                            variant={coalert.type}
                            show={coalert.show}
                            onClose={() => setCoAlert(false)}
                            dismissible
                        >
                            {coalert.message}
                        </Alert>
                    ) : null}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default CoSupervisorInput;

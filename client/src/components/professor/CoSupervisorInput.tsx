import React, { useContext, useState } from 'react';
import { Form, Button, Accordion, Card, Row, Alert } from 'react-bootstrap';
import { UserContext } from "../../contexts/UserContexts";

interface CoSupervisorInputProps {
    onAddCoSupervisor: (coSupervisor: string) => void;
    professors: any[]; // Assuming the type of professors, please replace 'any' with the correct type
    coalert: {
        show: boolean;
        type: string;
        message: string;
    };
    setCoAlert: React.Dispatch<React.SetStateAction<boolean>>;
    updatedprop: any; // Assuming the type of updatedprop, please replace 'any' with the correct type
}

const CoSupervisorInput: React.FC<CoSupervisorInputProps> = ({ onAddCoSupervisor, professors, coalert, setCoAlert, updatedprop }) => {
    const [coSupervisor, setCoSupervisor] = useState("");
    const { user, setUser } = useContext(UserContext);

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
                        <Form.Control
                            as="select"
                            value={coSupervisor}
                            onChange={(e) => setCoSupervisor(e.target.value)}
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
                    <Button className="mt-3" variant="primary" onClick={addCoSupervisor}>
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

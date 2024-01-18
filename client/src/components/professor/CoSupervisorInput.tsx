import React, { useState, useContext } from 'react';
import { Form, Button, Accordion, Row, Alert, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContexts';
import Professor from "../../types/Professor";
import SupervisorSelect from "../FormControllCoSupervisors";

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
    const [externalCoSupervisor, setExternalCoSupervisor] = useState({
        name: '',
        surname: '',
        email: '',
    });
    const [isExternal, setIsExternal] = useState(false);
    const { user } = useContext(UserContext);

    const addCoSupervisor = () => {
        if (isExternal && externalCoSupervisor.name && externalCoSupervisor.surname && externalCoSupervisor.email) {
            onAddCoSupervisor(null, externalCoSupervisor);
            setExternalCoSupervisor({ name: '', surname: '', email: '' });
        } else if (coSupervisor) {
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
                        <Form.Label>
                            <ToggleButtonGroup type="checkbox">
                                <ToggleButton
                                    variant={!isExternal ? 'primary' : 'secondary'}
                                    value={false}
                                    onClick={() => setIsExternal(false)}
                                    id="internal"
                                >
                                    Internal
                                </ToggleButton>
                                <ToggleButton
                                    variant={isExternal ? 'primary' : 'secondary'}
                                    value={true}
                                    onClick={() => setIsExternal(true)}
                                    id="external"
                                >
                                    External
                                </ToggleButton>
                            </ToggleButtonGroup>
                            {/*&nbsp; Co-supervisor*/}
                        </Form.Label>
                        <br/>
                        {isExternal ? (
                            <Row>
                                <div className={"col-4 text-start"}>
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        value={externalCoSupervisor.name}
                                        onChange={(e) =>
                                            setExternalCoSupervisor({ ...externalCoSupervisor, name: e.target.value })
                                        }
                                        id="name-input"
                                    />
                                </div>

                                <div className={"col-4 text-start"}>
                                    <Form.Label>Surname:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter surname"
                                        value={externalCoSupervisor.surname}
                                        onChange={(e) =>
                                            setExternalCoSupervisor({ ...externalCoSupervisor, surname: e.target.value })
                                        }
                                        id='surname-input'
                                    />
                                </div>

                                <div className={"col-4 text-start"}>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={externalCoSupervisor.email}
                                        onChange={(e) =>
                                            setExternalCoSupervisor({ ...externalCoSupervisor, email: e.target.value })
                                        }
                                        id='email-input'
                                    />
                                </div>
                            </Row>
                        ) : (
                            <SupervisorSelect
                                coSupervisor={coSupervisor}
                                setCoSupervisor={setCoSupervisor}
                                user={user}
                                updatedprop={updatedprop}
                                professors={professors}
                            />
                            // <Form.Control
                            //     as="select"
                            //     value={coSupervisor}
                            //     onChange={(e) => setCoSupervisor(e.target.value)}
                            //     id="cosupervisor-input"
                            // >
                            //     <option value="">Select the supervisor</option>
                            //     {updatedprop
                            //         ? professors
                            //             .filter(
                            //                 (professor) =>
                            //                     professor.id !== JSON.parse(user).id &&
                            //                     !updatedprop.coSupervisors.includes(professor.id)
                            //             )
                            //             .map((professor) => (
                            //                 <option value={professor.id} key={professor.id}>
                            //                     {professor.name} {professor.surname}
                            //                 </option>
                            //             ))
                            //         : professors
                            //             .filter((professor) => professor.id !== JSON.parse(user).id)
                            //             .map((professor) => (
                            //                 <option value={professor.id} key={professor.id}>
                            //                     {professor.name} {professor.surname}
                            //                 </option>
                            //             ))}
                            // </Form.Control>
                        )}
                    </Form.Group>
                    <Button id="add-cosup-button" className="mt-3" variant="primary" onClick={addCoSupervisor}>
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

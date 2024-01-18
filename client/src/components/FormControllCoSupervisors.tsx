import React from 'react';
import { Form } from 'react-bootstrap';

interface SupervisorSelectProps {
    coSupervisor: string;
    setCoSupervisor: (value: string) => void;
    user: string;
    updatedprop: any;
    professors: Array<any>;
}

const SupervisorSelect: React.FC<SupervisorSelectProps> = ({
                                                               coSupervisor,
                                                               setCoSupervisor,
                                                               user,
                                                               updatedprop,
                                                               professors,
                                                           }) => {
    return (
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
    );
};

export default SupervisorSelect;

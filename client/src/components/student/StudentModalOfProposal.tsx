import {Button, Modal, Row, Col} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {useState} from "react";

function StudentModalOfProposal(props: { professorData: { [x: string]: any; }; propsalData: { [x: string]: any; }; proposalID: string | number; showModal: boolean; setShowModal: (arg0: boolean) => void; }) {
    const supervisor = props.professorData[props.propsalData[props.proposalID].supervisor];
    const proposal = props.propsalData[props.proposalID];

    return (
        <>
            <Modal
                show={props.showModal}
                onHide={() => props.setShowModal(false)}
                size={'xl'}
                aria-labelledby = 'contained-modal-title-vcenter'
                centered
                scrollable={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title> Details of Proposal </Modal.Title>
                </Modal.Header>

                <Modal.Body style={{wordWrap: 'break-word'}} id={'Stu-Modal-Details'}>
                    <Row>
                        <Col md={6}>
                            <b>Thesis Title:</b> {proposal.title}
                        </Col>
                        <Col md={6}>
                            <b>Supervisor:</b> {supervisor.name+" "+supervisor.surname}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <b>Co-Supervisor:</b> {proposal.coSupervisors.map((cs) => {return cs}).join(', ')}
                        </Col>
                        <Col md={6}>
                            <b>Type:</b> {proposal.type}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <b>Required Knowledge:</b> {proposal.requiredKnowledge}
                        </Col>
                        <Col md={6}>
                            <b>Level:</b> {proposal.level}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <b>Corso Di Studi:</b> {proposal.cdS}
                        </Col>
                        <Col md={6}>
                            <b>Groups:</b> {proposal.groups.map((g) => {return g}).join(', ')}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-1">
                            <b>Description:</b> {proposal.description}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Notes:</b> {proposal.notes}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <b>Expiration Date:</b> {new Date(proposal.expiration).toDateString()}
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant={'secondary'} onClick={() => props.setShowModal(false)}> Close </Button>
                    <LinkContainer to={`/apply/${props.proposalID}`}>
                        <Button variant={'primary'}> Apply </Button>
                    </LinkContainer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default StudentModalOfProposal;
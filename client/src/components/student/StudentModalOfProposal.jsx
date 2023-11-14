import {Button, Modal, Row, Col} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {useState} from "react";


function StudentModalOfProposal(props) {
    const supervisor = props.professorData[props.propsalData[props.proposalID].supervisor];

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
                            <b>Thesis Title:</b> {props.propsalData[props.proposalID].title}
                        </Col>
                        <Col md={6}>
                            <b>Supervisor:</b> {supervisor.name+" "+supervisor.surname}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <b>Co-Supervisor:</b> list of co-supervisors
                        </Col>
                        <Col md={6}>
                            <b>Type:</b> {props.propsalData[props.proposalID].type}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <b>Required Knowledge:</b> {props.propsalData[props.proposalID].requiredKnowledge}
                        </Col>
                        <Col md={6}>
                            <b>Level:</b> {props.propsalData[props.proposalID].level}
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <b>Corso Di Studi:</b> {props.propsalData[props.proposalID].cdS}
                        </Col>
                        <Col md={6}>
                            <b>Expiration Date:</b> {props.propsalData[props.proposalID].expiration.toDateString()}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-1">
                            <b>Description:</b> {props.propsalData[props.proposalID].description}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <b>Notes:</b> {props.propsalData[props.proposalID].notes}
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant={'secondary'} onClick={() => props.setShowModal(false)}> Close </Button>
                    <LinkContainer to={'/apply'}>
                        <Button variant={'primary'}> Apply </Button>
                    </LinkContainer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export {StudentModalOfProposal};